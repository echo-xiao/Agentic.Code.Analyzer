#!/usr/bin/env npx tsx
/**
 * gen:mcp — run Gemini + MCP tools (self-loop) over the testcases, save answers to
 * logs/answers-gemini-mcp-selfloop/. GENERATOR ONLY — comparison reports are produced
 * by eval-reports.ts (eval-1 / eval-3) from the saved answers.
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI, type FunctionDeclaration, type Part, SchemaType } from '@google/generative-ai';
import { OUTPUT_DIR } from '../config.js';
import { ensureIndex } from '../indexer/index.js';
import { handleToolCall } from '../server/registry.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { loadTestcases, type TestCase } from './utils/load-testcases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const ANSWERS_DIR = path.join(PROJECT_ROOT, 'logs', 'answers-gemini-mcp-selfloop');

interface ToolCallRecord { step: number; tool: string; args: Record<string, any>; responseTokensEst: number; }
interface AnswerRecord {
    id: string; question: string; questionType: string; subsystem: string;
    llmAnswer: string; toolCalls: ToolCallRecord[]; tokens: number;
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
                file: { type: SchemaType.STRING, description: 'Pin the traversal root when the symbol has multiple definitions (collisions). Exact file path from search; omit to auto-pick the most-imported one.' },
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

function extractToolResultText(result: any): string { return result?.content?.[0]?.text ?? ''; }

async function runTestCase(model: any, tc: TestCase): Promise<AnswerRecord> {
    const toolCalls: ToolCallRecord[] = [];
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
            const toolResult = await handleToolCall(fc.name, fc.args ?? {});
            const resultText = extractToolResultText(toolResult);
            toolCalls.push({ step, tool: fc.name, args: fc.args ?? {}, responseTokensEst: Math.ceil(resultText.length / 4) });
            fnResponses.push({ functionResponse: { name: fc.name, response: { content: resultText } } } as any);
        }
        response = await chat.sendMessage(fnResponses);
        if (response.response.usageMetadata) totalTokens += response.response.usageMetadata.totalTokenCount ?? 0;
        turns++;
    }

    const llmAnswer = response.response.candidates?.[0]?.content?.parts
        ?.filter((p: any) => p.text)?.map((p: any) => p.text)?.join('\n') ?? '';
    return { id: tc.id, question: tc.question, questionType: tc.questionType, subsystem: tc.subsystem, llmAnswer, toolCalls, tokens: totalTokens };
}

function saveAnswers(records: AnswerRecord[]) {
    fs.mkdirSync(ANSWERS_DIR, { recursive: true });
    for (const r of records) {
        const trace = r.toolCalls.map(t =>
            `**Step ${t.step}:** \`${t.tool}(${JSON.stringify(t.args).substring(0, 100)})\` → ${t.responseTokensEst} tokens`).join('\n');
        const content = `# ${r.question}\n\n## Gemini Answer\n\n${r.llmAnswer}\n\n## Tool Calls (${r.toolCalls.length} calls, ${r.tokens.toLocaleString()} tokens)\n\n${trace}\n`;
        fs.writeFileSync(path.join(ANSWERS_DIR, `${r.id}.md`), content, 'utf-8');
    }
}

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) { console.error('GEMINI_API_KEY not set. Export it and retry.'); process.exit(1); }

    console.error('Loading index...');
    await ensureIndex();
    console.error(`Index ready: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files.\n`);

    const agentsMd = fs.readFileSync(path.join(PROJECT_ROOT, 'AGENTS.md'), 'utf-8');
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.argv.find(a => a.startsWith('--model='))?.split('=')[1] ?? 'gemini-2.5-flash';
    const model = genAI.getGenerativeModel({
        model: modelName,
        tools: [{ functionDeclarations: GEMINI_FUNCTIONS }],
        systemInstruction: { role: 'user', parts: [{ text: agentsMd }] },
    });

    const { flat: testcases } = loadTestcases(path.join(__dirname, 'utils', 'testcases.json'));
    const filterVal = process.argv.find(a => a.startsWith('--filter='))?.split('=')[1]?.toLowerCase();
    const selected = filterVal
        ? testcases.filter(t => t.id.toLowerCase().includes(filterVal) || t.subsystem.toLowerCase().includes(filterVal))
        : testcases;

    console.error(`Running ${selected.length} test cases with ${modelName}...\n`);
    const records: AnswerRecord[] = [];
    for (let i = 0; i < selected.length; i++) {
        const tc = selected[i];
        process.stderr.write(`  [${i + 1}/${selected.length}] ${tc.id}... `);
        try {
            const rec = await runTestCase(model, tc);
            console.error(`${rec.toolCalls.length} calls, ${rec.tokens} tokens`);
            records.push(rec);
            const isPro = modelName.includes('pro');
            if (i < selected.length - 1) await new Promise(r => setTimeout(r, isPro ? 13000 : 4500));
        } catch (e: any) {
            console.error(`ERROR: ${e?.message?.slice(0, 100)}`);
            records.push({ id: tc.id, question: tc.question, questionType: tc.questionType, subsystem: tc.subsystem, llmAnswer: `ERROR: ${e?.message}`, toolCalls: [], tokens: 0 });
            await new Promise(r => setTimeout(r, 5000));
        }
    }

    saveAnswers(records);
    console.error(`Answers saved to logs/answers-gemini-mcp-selfloop/`);
    console.log(`\n${records.length} answers | ${records.reduce((s, r) => s + r.tokens, 0).toLocaleString()} total tokens`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(2); });
