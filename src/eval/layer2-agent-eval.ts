#!/usr/bin/env npx tsx
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI, type FunctionDeclaration, type Part, SchemaType } from '@google/generative-ai';
import { OUTPUT_DIR } from '../config.js';
import { preWarmCache, initializeGlobalIndex, LocalDatabase } from '../indexer/index.js';
import { handleToolCall } from '../server/registry.js';
import { GLOBAL_INDEX } from '../indexer/state.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

interface TestCase {
    id: string;
    question: string;
    questionType: string;
    subsystem: string;
    difficulty: string;
    groundTruthFiles: string[];
    groundTruthPath?: Array<{ file: string; symbol: string }>;
    keySymbols?: string[];
}

interface ToolCallRecord {
    step: number;
    tool: string;
    args: Record<string, any>;
    responseText: string;
    responseTokensEst: number;
}

interface FileHit {
    file: string;
    found: boolean;
    foundVia: string | null;
}

interface SymbolHit {
    symbol: string;
    inToolResults: boolean;
    inLLMAnswer: boolean;
}

interface JudgeScore {
    correctness: number;
    completeness: number;
    keyFiles: number;
    overall: number;
    strengths: string;
    weaknesses: string;
}

interface TestResult {
    id: string;
    question: string;
    questionType: string;
    subsystem: string;
    difficulty: string;
    toolCalls: ToolCallRecord[];
    llmAnswer: string;
    fileHits: FileHit[];
    symbolHits: SymbolHit[];
    tokens: { prompt: number; candidates: number; total: number };
    fileHitRate: number;
    symbolCoverageRate: number;
    judge: JudgeScore | null;
    pass: boolean;
}

const GEMINI_FUNCTIONS: FunctionDeclaration[] = [
    {
        name: 'search',
        description: 'Find symbols and files by name. Searches the symbol index and file paths simultaneously. Pass layer when the question specifies client/server/packages/ee. Start every investigation here.',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                query: { type: SchemaType.STRING, description: 'Symbol name, filename, path fragment, or call pattern' },
                layer: { type: SchemaType.STRING, description: 'Restrict results to this layer: client, server, packages, or ee' },
            },
            required: ['query'],
        },
    },
    {
        name: 'graph',
        description: 'Traverse the full call graph. direction=up follows callers upstream, direction=down follows callees downstream. mode=impact shows blast radius layer-by-layer.',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                query: { type: SchemaType.STRING, description: 'Symbol name or event name to start traversal from' },
                direction: { type: SchemaType.STRING, description: 'up or down' },
                depth: { type: SchemaType.NUMBER, description: 'Max traversal depth (default 4, max 6)' },
                layer: { type: SchemaType.STRING, description: 'Restrict to this layer' },
                mode: { type: SchemaType.STRING, description: 'tree or impact' },
            },
            required: ['query'],
        },
    },
    {
        name: 'implement',
        description: 'Read the full source implementation of a specific symbol, plus callee skeletons. filename is REQUIRED.',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                symbolName: { type: SchemaType.STRING, description: 'Symbol name' },
                filename: { type: SchemaType.STRING, description: 'Exact file path from search/graph results' },
            },
            required: ['symbolName', 'filename'],
        },
    },
];

function extractToolResultText(result: any): string {
    return result?.content?.[0]?.text ?? '';
}

function fileMatches(text: string, gtFile: string): boolean {
    if (text.includes(gtFile)) return true;
    const basename = path.basename(gtFile);
    const dir = path.basename(path.dirname(gtFile));
    if (text.includes(`${dir}/${basename}`)) return true;
    const noExt = basename.replace(/\.(tsx?|js)$/, '');
    if (text.includes(`${dir}/${noExt}`)) return true;
    return false;
}

function symbolMatches(text: string, symbol: string): boolean {
    const escaped = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`).test(text);
}

async function runTestCase(
    model: any,
    tc: TestCase,
): Promise<TestResult> {
    const toolCalls: ToolCallRecord[] = [];
    let totalPrompt = 0;
    let totalCandidates = 0;
    let totalTokens = 0;
    let step = 0;

    const chat = model.startChat({
        history: [],
    });

    let response = await chat.sendMessage(tc.question);
    if (response.response.usageMetadata) {
        totalPrompt += response.response.usageMetadata.promptTokenCount ?? 0;
        totalCandidates += response.response.usageMetadata.candidatesTokenCount ?? 0;
        totalTokens += response.response.usageMetadata.totalTokenCount ?? 0;
    }

    const MAX_TURNS = 12;
    const MAX_TOOL_CALLS = 8;
    let turns = 0;

    while (turns < MAX_TURNS) {
        const candidate = response.response.candidates?.[0];
        if (!candidate) break;

        const fnCalls = candidate.content?.parts?.filter((p: any) => p.functionCall) ?? [];
        if (fnCalls.length === 0) break;

        if (step >= MAX_TOOL_CALLS) {
            response = await chat.sendMessage('You have used all available tool calls. Please provide your final answer now based on the information you have gathered.');
            if (response.response.usageMetadata) {
                totalPrompt += response.response.usageMetadata.promptTokenCount ?? 0;
                totalCandidates += response.response.usageMetadata.candidatesTokenCount ?? 0;
                totalTokens += response.response.usageMetadata.totalTokenCount ?? 0;
            }
            break;
        }

        const fnResponses: Part[] = [];
        for (const part of fnCalls) {
            const fc = part.functionCall!;
            step++;

            const toolResult = await handleToolCall(fc.name, fc.args ?? {});
            const resultText = extractToolResultText(toolResult);

            toolCalls.push({
                step,
                tool: fc.name,
                args: fc.args ?? {},
                responseText: resultText,
                responseTokensEst: Math.ceil(resultText.length / 4),
            });

            fnResponses.push({
                functionResponse: {
                    name: fc.name,
                    response: { content: resultText },
                },
            } as any);
        }

        response = await chat.sendMessage(fnResponses);
        if (response.response.usageMetadata) {
            totalPrompt += response.response.usageMetadata.promptTokenCount ?? 0;
            totalCandidates += response.response.usageMetadata.candidatesTokenCount ?? 0;
            totalTokens += response.response.usageMetadata.totalTokenCount ?? 0;
        }
        turns++;
    }

    const llmAnswer = response.response.candidates?.[0]?.content?.parts
        ?.filter((p: any) => p.text)
        ?.map((p: any) => p.text)
        ?.join('\n') ?? '';

    const allToolText = toolCalls.map(t => t.responseText).join('\n');
    const allText = allToolText + '\n' + llmAnswer;

    const fileHits: FileHit[] = tc.groundTruthFiles.map(f => {
        let foundVia: string | null = null;
        for (const tc2 of toolCalls) {
            if (fileMatches(tc2.responseText, f) || fileMatches(JSON.stringify(tc2.args), f)) {
                foundVia = `${tc2.tool} (step ${tc2.step})`;
                break;
            }
        }
        if (!foundVia && fileMatches(llmAnswer, f)) {
            foundVia = 'LLM answer';
        }
        return { file: f, found: foundVia !== null, foundVia };
    });

    const symbolHits: SymbolHit[] = (tc.keySymbols ?? []).map(sym => ({
        symbol: sym,
        inToolResults: symbolMatches(allToolText, sym),
        inLLMAnswer: symbolMatches(llmAnswer, sym),
    }));

    const fileHitRate = tc.groundTruthFiles.length > 0
        ? fileHits.filter(f => f.found).length / tc.groundTruthFiles.length : 1;
    const symTotal = symbolHits.length;
    const symFound = symbolHits.filter(s => s.inToolResults || s.inLLMAnswer).length;
    const symbolCoverageRate = symTotal > 0 ? symFound / symTotal : 1;

    return {
        id: tc.id,
        question: tc.question,
        questionType: tc.questionType,
        subsystem: tc.subsystem,
        difficulty: tc.difficulty,
        toolCalls,
        llmAnswer,
        fileHits,
        symbolHits,
        tokens: { prompt: totalPrompt, candidates: totalCandidates, total: totalTokens },
        fileHitRate,
        symbolCoverageRate,
        judge: null,
        pass: fileHitRate >= 0.8 && symbolCoverageRate >= 0.8,
    };
}

function saveGeminiAnswers(results: TestResult[]) {
    const dir = path.join(PROJECT_ROOT, 'logs', 'gemini-answers');
    fs.mkdirSync(dir, { recursive: true });

    for (const r of results) {
        const toolTrace = r.toolCalls.map(tc =>
            `**Step ${tc.step}:** \`${tc.tool}(${JSON.stringify(tc.args).substring(0, 100)})\` → ${tc.responseTokensEst} tokens`
        ).join('\n');

        const content = `# ${r.question}

## Gemini Answer

${r.llmAnswer}

## Tool Calls (${r.toolCalls.length} calls, ${r.tokens.total.toLocaleString()} tokens)

${toolTrace}

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | ${r.fileHits.filter(f => f.found).length}/${r.fileHits.length} |
| Symbols hit | ${r.symbolHits.filter(s => s.inToolResults || s.inLLMAnswer).length}/${r.symbolHits.length} |
| Tool calls | ${r.toolCalls.length} |
| Total tokens | ${r.tokens.total.toLocaleString()} |
| Pass | ${r.pass ? 'YES' : 'NO'} |
`;
        fs.writeFileSync(path.join(dir, `${r.id}.md`), content, 'utf-8');
    }
}

function loadLayer1Results(): Map<string, boolean> | null {
    const l1Path = path.join(PROJECT_ROOT, 'logs', 'layer1-tool-eval.md');
    if (!fs.existsSync(l1Path)) return null;
    const content = fs.readFileSync(l1Path, 'utf-8');
    const map = new Map<string, boolean>();
    for (const line of content.split('\n')) {
        const m = line.match(/\|\s*\d+\s*\|\s*(\S+)\s*\|.*\|\s*(PASS|\*\*FAIL\*\*)\s*\|/);
        if (m) map.set(m[1], m[2] === 'PASS');
    }
    return map.size > 0 ? map : null;
}

function formatReport(results: TestResult[], l1: Map<string, boolean> | null, modelNameForReport = 'gemini-2.5-flash'): string {
    const L: string[] = [];
    const passed = results.filter(r => r.pass).length;
    const total = results.length;

    L.push(`# Layer 2 — Agent Eval Report\n`);
    L.push(`${new Date().toLocaleString('en-US')} | Model: ${modelNameForReport} | Testcases: ${total}\n`);
    L.push(`---\n`);

    // Section 1: Overall Summary
    L.push(`## 1. Overall Summary\n`);
    const avgFileHit = results.reduce((s, r) => s + r.fileHitRate, 0) / total;
    const avgSymCov = results.reduce((s, r) => s + r.symbolCoverageRate, 0) / total;
    const avgTools = results.reduce((s, r) => s + r.toolCalls.length, 0) / total;
    const avgTokens = results.reduce((s, r) => s + r.tokens.total, 0) / total;
    const totalTokens = results.reduce((s, r) => s + r.tokens.total, 0);

    const emptyAnswers = results.filter(r => r.llmAnswer.trim().split(/\s+/).length < 10).length;
    const goodAnswers = results.filter(r => {
        const words = r.llmAnswer.trim().split(/\s+/).length;
        const paths = (r.llmAnswer.match(/apps\/meteor\/|packages\/|ee\//g) || []).length;
        return words >= 10 && paths >= 3;
    }).length;
    const weakAnswers = total - emptyAnswers - goodAnswers;

    L.push(`| Metric | Value |`);
    L.push(`|--------|-------|`);
    L.push(`| **Good answers (3+ file paths)** | **${goodAnswers}/${total} (${(goodAnswers / total * 100).toFixed(1)}%)** |`);
    L.push(`| Weak answers (has content, <3 paths) | ${weakAnswers}/${total} |`);
    L.push(`| Empty answers | ${emptyAnswers}/${total} |`);
    L.push(`| File hit rate (avg, string match) | ${(avgFileHit * 100).toFixed(1)}% |`);
    L.push(`| Symbol coverage (avg, string match) | ${(avgSymCov * 100).toFixed(1)}% |`);
    L.push(`| Avg tool calls / question | ${avgTools.toFixed(1)} |`);
    L.push(`| Avg tokens / question | ${Math.round(avgTokens).toLocaleString()} |`);
    L.push(`| Total tokens (all ${total}) | ${totalTokens.toLocaleString()} |`);
    L.push(`| Free tier limit | 1,000,000 TPM |`);
    L.push(`| Within free tier? | ${totalTokens < 1_000_000 ? 'YES' : 'NO'} (${(totalTokens / 1_000_000 * 100).toFixed(1)}% used) |`);
    L.push('');

    // Section 2: Accuracy by Dimension
    L.push(`## 2. Accuracy by Dimension\n`);

    L.push(`### By Question Type`);
    L.push(`| Type | Count | Passed | Rate |`);
    L.push(`|------|-------|--------|------|`);
    const byType = new Map<string, { total: number; passed: number }>();
    for (const r of results) {
        const e = byType.get(r.questionType) ?? { total: 0, passed: 0 };
        e.total++; if (r.pass) e.passed++;
        byType.set(r.questionType, e);
    }
    for (const [type, { total: t, passed: p }] of byType) {
        L.push(`| ${type} | ${t} | ${p} | ${(p / t * 100).toFixed(1)}% |`);
    }
    L.push('');

    L.push(`### By Subsystem`);
    L.push(`| Subsystem | Count | Passed | Rate |`);
    L.push(`|-----------|-------|--------|------|`);
    const bySub = new Map<string, { total: number; passed: number }>();
    for (const r of results) {
        const e = bySub.get(r.subsystem) ?? { total: 0, passed: 0 };
        e.total++; if (r.pass) e.passed++;
        bySub.set(r.subsystem, e);
    }
    for (const [sub, { total: t, passed: p }] of bySub) {
        L.push(`| ${sub} | ${t} | ${p} | ${(p / t * 100).toFixed(1)}% |`);
    }
    L.push('');

    L.push(`### By Difficulty`);
    L.push(`| Difficulty | Count | Passed | Rate |`);
    L.push(`|------------|-------|--------|------|`);
    const byDiff = new Map<string, { total: number; passed: number }>();
    for (const r of results) {
        const e = byDiff.get(r.difficulty) ?? { total: 0, passed: 0 };
        e.total++; if (r.pass) e.passed++;
        byDiff.set(r.difficulty, e);
    }
    for (const [diff, { total: t, passed: p }] of byDiff) {
        L.push(`| ${diff} | ${t} | ${p} | ${(p / t * 100).toFixed(1)}% |`);
    }
    L.push('');

    // Section 3: Token Analysis
    L.push(`## 3. Token Analysis\n`);
    L.push(`### Per-Question Token Distribution`);
    L.push(`| # | ID | Input | Output | Total | Tool Calls |`);
    L.push(`|---|---|------:|-------:|------:|-----------:|`);
    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        L.push(`| ${i + 1} | ${r.id} | ${r.tokens.prompt.toLocaleString()} | ${r.tokens.candidates.toLocaleString()} | ${r.tokens.total.toLocaleString()} | ${r.toolCalls.length} |`);
    }
    L.push('');

    L.push(`### Token Breakdown by Tool`);
    const toolStats = new Map<string, { count: number; totalTokens: number }>();
    for (const r of results) {
        for (const tc of r.toolCalls) {
            const e = toolStats.get(tc.tool) ?? { count: 0, totalTokens: 0 };
            e.count++; e.totalTokens += tc.responseTokensEst;
            toolStats.set(tc.tool, e);
        }
    }
    L.push(`| Tool | Times Called | Avg Response Tokens | Total |`);
    L.push(`|------|------------:|--------------------:|------:|`);
    for (const [tool, { count, totalTokens: tt }] of toolStats) {
        L.push(`| ${tool} | ${count} | ${Math.round(tt / count).toLocaleString()} | ${tt.toLocaleString()} |`);
    }
    L.push('');

    const mostExpensive = results.reduce((a, b) => a.tokens.total > b.tokens.total ? a : b);
    const cheapest = results.reduce((a, b) => a.tokens.total < b.tokens.total ? a : b);
    const implTokens = Array.from(toolStats.entries()).find(([k]) => k === 'implement')?.[1]?.totalTokens ?? 0;
    const allToolTokens = Array.from(toolStats.values()).reduce((s, v) => s + v.totalTokens, 0);
    const implShare = allToolTokens > 0 ? implTokens / allToolTokens * 100 : 0;
    const over10 = results.filter(r => r.toolCalls.length > 10).length;

    L.push(`### Token Efficiency`);
    L.push(`| Metric | Value |`);
    L.push(`|--------|-------|`);
    L.push(`| Most expensive question | ${mostExpensive.id} (${mostExpensive.tokens.total.toLocaleString()} tokens, ${mostExpensive.toolCalls.length} tool calls) |`);
    L.push(`| Cheapest question | ${cheapest.id} (${cheapest.tokens.total.toLocaleString()} tokens, ${cheapest.toolCalls.length} tool calls) |`);
    L.push(`| implement share of tool tokens | ${implShare.toFixed(1)}% ${implShare > 30 ? '(above 30% threshold)' : ''} |`);
    L.push(`| Questions exceeding 10 tool calls | ${over10} |`);
    L.push('');

    // Section 4: Per-Testcase Details
    L.push(`## 4. Per-Testcase Results\n`);
    L.push(`| # | ID | Subsystem | Files | Symbols | Tools | Tokens | Pass |`);
    L.push(`|---|---|---|---|---|---|---|---|`);
    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const fh = `${r.fileHits.filter(f => f.found).length}/${r.fileHits.length}`;
        const sh = `${r.symbolHits.filter(s => s.inToolResults || s.inLLMAnswer).length}/${r.symbolHits.length}`;
        const status = r.pass ? 'PASS' : '**FAIL**';
        L.push(`| ${i + 1} | ${r.id} | ${r.subsystem} | ${fh} | ${sh} | ${r.toolCalls.length} | ${r.tokens.total.toLocaleString()} | ${status} |`);
    }
    L.push('');

    // Section 5: Detailed per-testcase
    L.push(`## 5. Per-Testcase Details\n`);
    for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const status = r.pass ? 'PASS' : 'FAIL';
        L.push(`### #${i + 1} ${r.id} — ${status}\n`);
        L.push(`**Q:** ${r.question}`);
        L.push(`**Type:** ${r.questionType} | **Subsystem:** ${r.subsystem} | **Difficulty:** ${r.difficulty}\n`);

        L.push(`**Tool Call Trace:**\n`);
        L.push(`| Step | Tool | Args | Tokens |`);
        L.push(`|------|------|------|-------:|`);
        for (const tc of r.toolCalls) {
            const argsStr = JSON.stringify(tc.args).substring(0, 80);
            L.push(`| ${tc.step} | ${tc.tool} | \`${argsStr}\` | ${tc.responseTokensEst} |`);
        }
        L.push('');

        L.push(`**File Hits:**\n`);
        L.push(`| Expected File | Found? | Found Via |`);
        L.push(`|---------------|--------|-----------|`);
        for (const f of r.fileHits) {
            L.push(`| \`${f.file}\` | ${f.found ? 'YES' : '**NO**'} | ${f.foundVia ?? '-'} |`);
        }
        L.push('');

        if (r.symbolHits.length > 0) {
            L.push(`**Symbol Coverage:**\n`);
            L.push(`| Symbol | In Tool Results? | In LLM Answer? |`);
            L.push(`|--------|-----------------|----------------|`);
            for (const s of r.symbolHits) {
                L.push(`| \`${s.symbol}\` | ${s.inToolResults ? 'YES' : '**NO**'} | ${s.inLLMAnswer ? 'YES' : '**NO**'} |`);
            }
            L.push('');
        }

        const answerTrunc = r.llmAnswer;
        L.push(`**LLM Answer (truncated):**\n`);
        L.push(`> ${answerTrunc.replace(/\n/g, '\n> ')}\n`);

        if (!r.pass) {
            L.push(`**Root Cause Analysis:**\n`);
            const missedFiles = r.fileHits.filter(f => !f.found);
            const missedSymbols = r.symbolHits.filter(s => !s.inToolResults && !s.inLLMAnswer);

            if (missedFiles.length > 0) {
                L.push(`| Problem | Category | Detail |`);
                L.push(`|---------|----------|--------|`);
                for (const f of missedFiles) {
                    const basename = path.basename(f.file);
                    const inIndex = GLOBAL_INDEX.allFiles.has(f.file) ||
                        Array.from(GLOBAL_INDEX.allFiles).some(p => p.endsWith(f.file));
                    if (!inIndex) {
                        L.push(`| \`${basename}\` not found | **Not in index** | File is not a .ts/.tsx or was excluded from scanning |`);
                    } else {
                        L.push(`| \`${basename}\` not found | **Search/LLM gap** | File is in index but search didn't surface it, or LLM didn't look for it |`);
                    }
                }
                for (const s of missedSymbols) {
                    const inSymbols = GLOBAL_INDEX.symbols.has(s.symbol);
                    if (!inSymbols) {
                        L.push(`| \`${s.symbol}\` missing | **Not in symbol index** | Symbol not extracted by skeleton.ts |`);
                    } else {
                        L.push(`| \`${s.symbol}\` missing | **LLM didn't mention** | Symbol exists in index but LLM never searched for it or mentioned it |`);
                    }
                }
                L.push('');
            }
        }

        L.push(`---\n`);
    }

    // Section 6: Fault Isolation
    if (l1) {
        L.push(`## 6. Fault Isolation (Layer 1 vs Layer 2)\n`);
        L.push(`| # | ID | Subsystem | L1 | L2 | Diagnosis |`);
        L.push(`|---|---|---|---|---|---|`);

        let bothPass = 0, indexBug = 0, llmBug = 0, altRoute = 0, gtBroad = 0;
        for (let i = 0; i < results.length; i++) {
            const r = results[i];
            const l1pass = l1.get(r.id);
            if (l1pass === undefined) continue;
            const l2pass = r.pass;
            let diagnosis: string;
            if (l1pass && l2pass) { diagnosis = 'OK'; bothPass++; }
            else if (!l1pass && !l2pass) { diagnosis = '**Index/graph bug**'; indexBug++; }
            else if (l1pass && !l2pass) { diagnosis = '**LLM navigation bug** — fix AGENTS.md'; llmBug++; }
            else { diagnosis = 'LLM found alt route'; altRoute++; }
            L.push(`| ${i + 1} | ${r.id} | ${r.subsystem} | ${l1pass ? 'PASS' : 'FAIL'} | ${l2pass ? 'PASS' : '**FAIL**'} | ${diagnosis} |`);
        }
        L.push('');

        L.push(`### Diagnosis Summary`);
        L.push(`| Diagnosis | Count |`);
        L.push(`|-----------|------:|`);
        L.push(`| Both pass | ${bothPass} |`);
        L.push(`| Index/graph bug (L1+L2 fail) | ${indexBug} |`);
        L.push(`| LLM navigation bug (L1 pass, L2 fail) | ${llmBug} |`);
        L.push(`| LLM found alt route (L1 fail, L2 pass) | ${altRoute} |`);
        L.push('');
    }

    return L.join('\n');
}

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('GEMINI_API_KEY not set. Export it and retry.');
        process.exit(1);
    }

    console.error('Loading index...');
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const { updatedCount } = preWarmCache();
    const db = new LocalDatabase(OUTPUT_DIR);
    if (updatedCount > 0 || !db.loadIndex(GLOBAL_INDEX)) {
        initializeGlobalIndex();
        db.saveIndex(GLOBAL_INDEX);
    }
    console.error(`Index ready: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files.\n`);

    const agentsMd = fs.readFileSync(path.join(PROJECT_ROOT, 'AGENTS.md'), 'utf-8');

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.argv.find(a => a.startsWith('--model='))?.split('=')[1] ?? 'gemini-2.5-flash';
    const model = genAI.getGenerativeModel({
        model: modelName,
        tools: [{ functionDeclarations: GEMINI_FUNCTIONS }],
        systemInstruction: { role: 'user', parts: [{ text: agentsMd }] },
    });

    const testcases: TestCase[] = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'testcases.json'), 'utf-8')
    );
    const filter = process.argv.find(a => a.startsWith('--filter='));
    const filterVal = filter?.split('=')[1]?.toLowerCase();
    const selected = filterVal
        ? testcases.filter(t => t.id.toLowerCase().includes(filterVal) || t.subsystem.toLowerCase().includes(filterVal))
        : testcases;

    console.error(`Running ${selected.length} test cases with ${modelName}...\n`);

    const results: TestResult[] = [];
    for (let i = 0; i < selected.length; i++) {
        const tc = selected[i];
        process.stderr.write(`  [${i + 1}/${selected.length}] ${tc.id}... `);
        try {
            const result = await runTestCase(model, tc);
            console.error(`${result.pass ? 'PASS' : 'FAIL'} (${result.toolCalls.length} calls, ${result.tokens.total} tokens)`);
            results.push(result);

            // rate limit: free tier is 15 RPM for flash, 5 RPM for pro
            const isPro = modelName.includes('pro');
            if (i < selected.length - 1) {
                await new Promise(r => setTimeout(r, isPro ? 13000 : 4500));
            }
        } catch (e: any) {
            console.error(`ERROR: ${e?.message?.slice(0, 100)}`);
            results.push({
                id: tc.id, question: tc.question, questionType: tc.questionType,
                subsystem: tc.subsystem, difficulty: tc.difficulty,
                toolCalls: [], llmAnswer: `ERROR: ${e?.message}`,
                fileHits: tc.groundTruthFiles.map(f => ({ file: f, found: false, foundVia: null })),
                symbolHits: (tc.keySymbols ?? []).map(s => ({ symbol: s, inToolResults: false, inLLMAnswer: false })),
                tokens: { prompt: 0, candidates: 0, total: 0 },
                fileHitRate: 0, symbolCoverageRate: 0, judge: null, pass: false,
            });
            await new Promise(r => setTimeout(r, 5000));
        }
    }

    saveGeminiAnswers(results);
    console.error(`Gemini answers saved to logs/gemini-answers/`);

    const l1 = loadLayer1Results();
    const report = formatReport(results, l1, modelName);

    const logsDir = path.join(PROJECT_ROOT, 'logs');
    fs.mkdirSync(logsDir, { recursive: true });
    const reportPath = path.join(logsDir, 'layer2-agent-eval.md');
    fs.writeFileSync(reportPath, report, 'utf-8');

    console.error(`Report: ${reportPath}`);
    const passed = results.filter(r => r.pass).length;
    const totalTokens = results.reduce((s, r) => s + r.tokens.total, 0);
    console.log(`\n${passed}/${results.length} passed | ${totalTokens.toLocaleString()} total tokens`);
    if (passed < results.length) process.exitCode = 1;
}

main().catch(e => { console.error('Fatal:', e); process.exit(2); });
