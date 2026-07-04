#!/usr/bin/env npx tsx
/**
 * gen — generate agent answers over the testcases. GENERATOR ONLY; scoring lives in
 * tools.ts / token.ts / report.ts, semantic verdicts in verdicts.md.
 *
 *   --mode=nomcp   Gemini with no tools → logs/answers-gemini-nomcp/
 *   --mode=mcp     Gemini + plan/search/graph/details self-loop → logs/answers-gemini-mcp-selfloop/
 *   --oracle       (mcp only) force SESSION intent from the testcase's questionType — measures the
 *                  routing ceiling; the gap vs a normal run = the cost of plan's misclassification.
 *   --model=...    default gemini-2.5-flash
 *   --filter=...   run a subset by id/subsystem substring
 */
import "./utils/load-env.js";
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { GoogleGenerativeAI, type FunctionDeclaration, type Part, SchemaType } from '@google/generative-ai';
import { ensureIndex } from '../indexer/index.js';
import { handleToolCall } from '../server/registry.js';
import { SESSION } from '../server/session.js';
import { isIntent } from '../server/intent.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { loadTestcases, type TestCase } from './utils/load-testcases.js';
import { extractCitedFiles } from './utils/eval-util.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

// Workflow + answer-format prompt. Deliberately domain-free: codebase knowledge lives in the
// index, architecture.json hints, and tool navHints — not in prose (no constitution).
export const SYSTEM_PROMPT = `You are answering questions about the Rocket.Chat codebase using code-navigation tools.

Workflow: call plan(question) FIRST — it returns the strategy and the default graph move for this question type. Then search for the entry symbol, graph from the best seed, and details on at most 1-2 key symbols. Never answer from memory alone: your training data has outdated file paths; every path you cite must come from a tool result.

Answer format: include the specific file path for every key file (e.g. path/to/relevant/file.ts) with its role. When the question involves a flow, list the chain explicitly: Entry → Step 1 → … → Final. Write every core file the tools surfaced that belongs to the answer — do not drop files you saw.`;

const GEMINI_FUNCTIONS: FunctionDeclaration[] = [
    {
        name: 'plan',
        description: 'Declare what kind of question this is. Returns the strategy and default graph move/depth. Call once, first.',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                question: { type: SchemaType.STRING, description: "The user's question, verbatim" },
                intent: { type: SchemaType.STRING, description: 'Optional override: architecture, call-chain, locate, pattern, routing, or impact' },
            },
            required: ['question'],
        },
    },
    {
        name: 'search',
        description: 'Find entry-point seeds by name: exact symbol lookup + full-text grep for call patterns. Pass layer when the question specifies client/server/packages/ee.',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                query: { type: SchemaType.STRING, description: 'Symbol name or call pattern' },
                layer: { type: SchemaType.STRING, description: 'client, server, packages, or ee' },
            },
            required: ['query'],
        },
    },
    {
        name: 'graph',
        description: 'Traverse the dependency graph from a seed. move=expand: ranked subsystem neighborhood (architecture/routing/locate/pattern). move=down: ordered callee tree (call chains). move=up: layered dependents / blast radius (impact). Omit move to use the plan default.',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                query: { type: SchemaType.STRING, description: 'Symbol or event name to start from' },
                move: { type: SchemaType.STRING, description: 'expand, down, or up' },
                depth: { type: SchemaType.NUMBER, description: 'Max hops (expand 1-3, down/up 4-6)' },
                layer: { type: SchemaType.STRING, description: 'Restrict to this layer' },
                file: { type: SchemaType.STRING, description: 'Pin the traversal root for colliding symbols; exact path from search' },
            },
            required: ['query'],
        },
    },
    {
        name: 'details',
        description: 'Read the full source of one located symbol. Expensive — use on 1-2 key symbols only. filename is REQUIRED.',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                symbolName: { type: SchemaType.STRING, description: 'Symbol name or ClassName.methodName' },
                filename: { type: SchemaType.STRING, description: 'Exact file path from search/graph results' },
            },
            required: ['symbolName', 'filename'],
        },
    },
];

interface ToolCallRecord { step: number; tool: string; args: Record<string, any>; responseTokensEst: number; }
interface AnswerRecord {
    id: string; question: string; questionType: string; subsystem: string;
    llmAnswer: string; toolCalls: ToolCallRecord[]; tokens: number;
    // File paths that appeared in ANY tool result during the run. Lets report.ts split a missed core
    // file into "never retrieved" vs "retrieved but not written" — retrieval vs synthesis failure.
    seenFiles: string[];
    // Resolved plan intent (SESSION.intent after the loop) — untruncated, for report.ts routing accuracy.
    resolvedIntent: string | null;
}

function extractToolResultText(result: any): string { return result?.content?.[0]?.text ?? ''; }

async function runMcpCase(model: any, tc: TestCase, oracle: boolean): Promise<AnswerRecord> {
    // Reset per-testcase control state (one process runs all cases).
    SESSION.intent = null;
    SESSION.forceIntent = oracle && isIntent(tc.questionType) ? tc.questionType : null;

    const toolCalls: ToolCallRecord[] = [];
    const seenFiles = new Set<string>();
    let totalTokens = 0;
    let step = 0;
    const chat = model.startChat({ history: [] });

    let response = await chat.sendMessage(tc.question);
    if (response.response.usageMetadata) totalTokens += response.response.usageMetadata.totalTokenCount ?? 0;

    const MAX_TURNS = 12, MAX_TOOL_CALLS = 8;
    let turns = 0;
    while (turns < MAX_TURNS) {
        const candidate = response.response.candidates?.[0];
        if (!candidate) break;
        const fnCalls = candidate.content?.parts?.filter((p: any) => p.functionCall) ?? [];
        if (fnCalls.length === 0) break;
        if (step >= MAX_TOOL_CALLS) {
            response = await chat.sendMessage('You have used all available tool calls. Please provide your final answer now based on the information you have gathered.');
            if (response.response.usageMetadata) totalTokens += response.response.usageMetadata.totalTokenCount ?? 0;
            break;
        }
        const fnResponses: Part[] = [];
        for (const part of fnCalls) {
            const fc = part.functionCall!;
            step++;
            const resultText = extractToolResultText(await handleToolCall(fc.name, fc.args ?? {}));
            for (const f of extractCitedFiles(resultText)) seenFiles.add(f);
            toolCalls.push({ step, tool: fc.name, args: fc.args ?? {}, responseTokensEst: Math.ceil(resultText.length / 4) });
            fnResponses.push({ functionResponse: { name: fc.name, response: { content: resultText } } } as any);
        }
        response = await chat.sendMessage(fnResponses);
        if (response.response.usageMetadata) totalTokens += response.response.usageMetadata.totalTokenCount ?? 0;
        turns++;
    }

    const llmAnswer = response.response.candidates?.[0]?.content?.parts
        ?.filter((p: any) => p.text)?.map((p: any) => p.text)?.join('\n') ?? '';
    return { id: tc.id, question: tc.question, questionType: tc.questionType, subsystem: tc.subsystem, llmAnswer, toolCalls, tokens: totalTokens, seenFiles: Array.from(seenFiles), resolvedIntent: SESSION.intent ?? null };
}

function saveMcpAnswers(dir: string, records: AnswerRecord[]) {
    fs.mkdirSync(dir, { recursive: true });
    for (const r of records) {
        // Basename-ify path args (file/filename) so the meaningful tail survives the length cap —
        // otherwise a long absolute path pushes the basename (the useful bit) past the cutoff.
        const prettyArgs = (a: Record<string, any>) => {
            const o: Record<string, any> = {};
            for (const [k, v] of Object.entries(a ?? {}))
                o[k] = (k === 'file' || k === 'filename') && typeof v === 'string' ? v.split('/').pop() : v;
            return JSON.stringify(o);
        };
        const trace = r.toolCalls.map(t =>
            `**Step ${t.step}:** \`${t.tool}(${prettyArgs(t.args).substring(0, 120)})\` → ${t.responseTokensEst} tokens`).join('\n');
        const seen = r.seenFiles.length ? r.seenFiles.map(f => `- \`${f}\``).join('\n') : '_(none)_';
        const content = `# ${r.question}\n\n## Plan\n\nintent: ${r.resolvedIntent ?? 'unknown'}\n\n## Gemini Answer\n\n${r.llmAnswer}\n\n## Tool Calls (${r.toolCalls.length} calls, ${r.tokens.toLocaleString()} tokens)\n\n${trace}\n\n## Files Seen In Tool Results (${r.seenFiles.length})\n\n${seen}\n`;
        fs.writeFileSync(path.join(dir, `${r.id}.md`), content, 'utf-8');
    }
}

async function main() {
    const mode = process.argv.find(a => a.startsWith('--mode='))?.split('=')[1];
    if (mode !== 'nomcp' && mode !== 'mcp') {
        console.error('Usage: gen.ts --mode=nomcp|mcp [--oracle] [--model=...] [--filter=...]');
        process.exit(1);
    }
    const oracle = process.argv.includes('--oracle');

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) { console.error('GEMINI_API_KEY not set. Export it and retry.'); process.exit(1); }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.argv.find(a => a.startsWith('--model='))?.split('=')[1] ?? 'gemini-2.5-flash';

    const { flat: testcases } = loadTestcases(path.join(__dirname, 'utils', 'testcases.json'));
    const filterVal = process.argv.find(a => a.startsWith('--filter='))?.split('=')[1]?.toLowerCase();
    const filterParts = filterVal ? filterVal.split(',').map(s => s.trim()).filter(Boolean) : [];
    const selected = filterParts.length
        ? testcases.filter(t => filterParts.some(fv => t.id.toLowerCase().includes(fv) || t.subsystem.toLowerCase().includes(fv)))
        : testcases;

    const isPro = modelName.includes('pro');
    const pause = (ms: number) => new Promise(r => setTimeout(r, ms));

    if (mode === 'nomcp') {
        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: {
                role: 'user',
                parts: [{ text: 'You are a software architect expert on the Rocket.Chat open-source codebase (https://github.com/RocketChat/Rocket.Chat). Answer questions about its architecture, code structure, and implementation details. Always include specific file paths when possible.' }],
            },
            // Determinism: greedy decode so re-runs are reproducible (single-run comparisons need it).
            generationConfig: { temperature: 0, topK: 1, topP: 1, candidateCount: 1 },
        });
        const dir = path.join(PROJECT_ROOT, 'logs', 'answers-gemini-nomcp');
        fs.mkdirSync(dir, { recursive: true });
        console.error(`Running ${selected.length} baseline questions with ${modelName} (NO tools)...\n`);
        let totalTokens = 0;
        for (let i = 0; i < selected.length; i++) {
            const tc = selected[i];
            process.stderr.write(`  [${i + 1}/${selected.length}] ${tc.id}... `);
            try {
                const result = await model.generateContent(tc.question);
                const answer = result.response.text();
                const tokens = result.response.usageMetadata?.totalTokenCount ?? 0;
                totalTokens += tokens;
                const md = `# ${tc.question}\n\n## Baseline Answer (no tools)\n\n${answer}\n\n## Metrics\n\n| Metric | Value |\n|--------|-------|\n| Tokens | ${tokens.toLocaleString()} |\n| Model | ${modelName} |\n| Tools | NONE |\n`;
                fs.writeFileSync(path.join(dir, `${tc.id}.md`), md, 'utf-8');
                console.error(`OK (${tokens} tokens)`);
                if (i < selected.length - 1) await pause(isPro ? 13000 : 4500);
            } catch (e: any) {
                console.error(`ERROR: ${e?.message ?? e}`);
                await pause(5000);
            }
        }
        console.error(`Answers: logs/answers-gemini-nomcp/`);
        console.log(`\n${selected.length} answers | ${totalTokens.toLocaleString()} total tokens`);
        return;
    }

    // mcp mode
    console.error('Loading index...');
    await ensureIndex();
    console.error(`Index ready: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files.\n`);

    const WIKI_FUNCTION: FunctionDeclaration = {
        name: 'wiki',
        description: "Ask the DeepWiki architecture wiki how a subsystem works. Returns a grounded architecture summary (prose + file paths verified against this codebase's index; a footer flags any stale/hallucinated paths). Call it early for a high-level map, then confirm exact symbols with search/graph/details.",
        parameters: { type: SchemaType.OBJECT, properties: { question: { type: SchemaType.STRING, description: 'A natural-language architecture question' } }, required: ['question'] },
    };
    const functions = [...GEMINI_FUNCTIONS, WIKI_FUNCTION];
    const sysText = SYSTEM_PROMPT + '\n\nYou also have wiki(question): a grounded architecture-overview tool. Call it first for a high-level map of the relevant subsystem, then verify exact symbols/files with search/graph/details. Trust only paths the grounding footer confirms are in the codebase.';
    const model = genAI.getGenerativeModel({
        model: modelName,
        tools: [{ functionDeclarations: functions }],
        systemInstruction: { role: 'user', parts: [{ text: sysText }] },
        // Determinism: greedy decode (temperature 0, top-k 1, single candidate) so re-runs over an
        // unchanged index produce the same answers. Without this the agent samples at temp ~1.0 and
        // PASS counts drift ±3 between runs, making single-run before/after comparisons meaningless.
        generationConfig: { temperature: 0, topK: 1, topP: 1, candidateCount: 1 },
    });

    console.error(`Running ${selected.length} test cases with ${modelName}${oracle ? ' (ORACLE intent)' : ''}...\n`);
    const records: AnswerRecord[] = [];
    for (let i = 0; i < selected.length; i++) {
        const tc = selected[i];
        process.stderr.write(`  [${i + 1}/${selected.length}] ${tc.id}... `);
        try {
            const rec = await runMcpCase(model, tc, oracle);
            console.error(`${rec.toolCalls.length} calls, ${rec.tokens} tokens`);
            records.push(rec);
            if (i < selected.length - 1) await pause(isPro ? 13000 : 4500);
        } catch (e: any) {
            console.error(`ERROR: ${e?.message?.slice(0, 100)}`);
            records.push({ id: tc.id, question: tc.question, questionType: tc.questionType, subsystem: tc.subsystem, llmAnswer: `ERROR: ${e?.message}`, toolCalls: [], tokens: 0, seenFiles: [], resolvedIntent: null });
            await pause(5000);
        }
    }

    saveMcpAnswers(path.join(PROJECT_ROOT, 'logs', 'answers-gemini-mcp-selfloop'), records);
    console.error(`Answers saved to logs/answers-gemini-mcp-selfloop/`);
    console.log(`\n${records.length} answers | ${records.reduce((s, r) => s + r.tokens, 0).toLocaleString()} total tokens`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    // Force exit after main resolves — the DeepWiki MCP client keeps an open connection that would
    // otherwise prevent Node from exiting once all answers are saved.
    main().then(() => process.exit(0)).catch(e => { console.error('Fatal:', e); process.exit(2); });
}
