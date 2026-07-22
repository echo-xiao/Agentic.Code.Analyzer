#!/usr/bin/env npx tsx
/**
 * gen — generate agent answers over the testcases. GENERATOR ONLY; scoring lives in
 * tools.ts / report.ts, semantic verdicts in verdicts.md (judge.ts).
 * (the nomcp / wiki-only / nav-only comparison modes were retired 2026-07-08 — conclusions live in division.md and git history.)
 *
 *   --mode=mcp     Gemini + plan/search/graph/details/wiki self-loop → logs/answers-gemini-mcp-selfloop/
 *   --oracle       force SESSION intent from the testcase's questionType — measures the
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
import { makeBar, fmtSec } from './utils/progress.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

// Workflow + answer-format prompt. Deliberately domain-free: codebase knowledge lives in the
// index, the self-generated architecture wiki tool, and tool navHints — not in prose (no constitution).
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

// The free-tier Gemini API returns spurious transient errors (~10% of calls): 404 "model no longer
// available", 401, 429, 5xx — the SAME request succeeds on retry. Without this, a single flaky call
// anywhere in a case's multi-turn loop throws and marks the whole case ERROR (observed: 34/34 wiped
// in one bad-token window). Retry does NOT touch determinism — a retried greedy call returns the
// same result. Genuine auth death (persistent 401/403) still fails after the retries are exhausted.
const RETRYABLE_STATUS = new Set([401, 404, 408, 409, 429, 500, 502, 503, 504]);
function transientStatus(e: any): number | null {
    if (typeof e?.status === 'number') return e.status;              // GoogleGenerativeAIFetchError.status
    const m = /\[(\d{3})\s/.exec(String(e?.message ?? ''));          // fallback: parse "[404 Not Found]"
    return m ? Number(m[1]) : null;
}
function isTransient(e: any): boolean {
    const status = transientStatus(e);
    if (status !== null) return RETRYABLE_STATUS.has(status);
    // No HTTP status parsed — retry SDK fetch/network blips, but let real bugs (TypeError, etc.) fail fast.
    return /GoogleGenerativeAI|fetch failed|network|ECONN|ETIMEDOUT|socket hang|timeout/i.test(String(e?.message ?? ''));
}
// Hard quota exhaustion (free-tier daily cap: ~20 req/day/model). Retrying within a run is futile —
// the budget won't refill for hours — so fail FAST with a clear signal instead of burning ~31s of
// backoff per case. This is a KEY/PLAN limit, not a code fault: a 34-case run needs ~136 requests.
function isHardQuota(e: any): boolean {
    return /RESOURCE_EXHAUSTED|exceeded your current quota|free_tier_requests/i.test(String(e?.message ?? ''));
}
async function sendWithRetry(chat: any, message: any, label: string): Promise<any> {
    const MAX_RETRIES = 5;
    for (let attempt = 0; ; attempt++) {
        try {
            return await chat.sendMessage(message);
        } catch (e: any) {
            if (isHardQuota(e) || attempt >= MAX_RETRIES || !isTransient(e)) throw e;
            const delay = Math.min(1000 * 2 ** attempt, 16000);     // 1s,2s,4s,8s,16s
            console.error(`[RETRY] ${label} attempt ${attempt + 1}/${MAX_RETRIES} after ${transientStatus(e) ?? 'network'} — waiting ${delay}ms`);
            await new Promise(r => setTimeout(r, delay));
        }
    }
}

async function runMcpCase(model: any, tc: TestCase, oracle: boolean): Promise<AnswerRecord> {
    // Reset per-testcase control state (one process runs all cases).
    SESSION.intent = null;
    SESSION.forceIntent = oracle && isIntent(tc.questionType) ? tc.questionType : null;

    const toolCalls: ToolCallRecord[] = [];
    const seenFiles = new Set<string>();
    let totalTokens = 0;
    let step = 0;
    const chat = model.startChat({ history: [] });

    let response = await sendWithRetry(chat, tc.question, `${tc.id}:initial`);
    if (response.response.usageMetadata) totalTokens += response.response.usageMetadata.totalTokenCount ?? 0;

    const MAX_TURNS = 12, MAX_TOOL_CALLS = 8;
    let turns = 0;
    while (turns < MAX_TURNS) {
        const candidate = response.response.candidates?.[0];
        if (!candidate) break;
        const fnCalls = candidate.content?.parts?.filter((p: any) => p.functionCall) ?? [];
        if (fnCalls.length === 0) break;
        if (step >= MAX_TOOL_CALLS) {
            response = await sendWithRetry(chat, 'You have used all available tool calls. Please provide your final answer now based on the information you have gathered.', `${tc.id}:final`);
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
        response = await sendWithRetry(chat, fnResponses, `${tc.id}:turn${turns + 1}`);
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
    if (mode !== 'mcp') {
        console.error('Usage: gen.ts --mode=mcp [--oracle] [--model=...] [--filter=...]');
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

    console.error('Loading index...');
    await ensureIndex();
    console.error(`Index ready: ${GLOBAL_INDEX.symbols.size} symbols, ${GLOBAL_INDEX.allFiles.size} files.\n`);

    const WIKI_FUNCTION: FunctionDeclaration = {
        name: 'wiki',
        description: "Ask the offline architecture map how a subsystem is structured. Returns the matching wiki pages' structure (sections + component relations) plus candidate files ranked by relevance — all paths verified against this codebase's index. Call it early for a map, then confirm exact symbols with search/graph/details.",
        parameters: { type: SchemaType.OBJECT, properties: { question: { type: SchemaType.STRING, description: 'A natural-language architecture question' } }, required: ['question'] },
    };
    const WIKI_SYS = '\n\nYou also have wiki(question): an offline architecture map (page structure + component relations + ranked candidate files, all index-verified). Call it early for a map of the relevant subsystem, then verify exact symbols/files with search/graph/details before citing them.';

    const cfg = { functions: [...GEMINI_FUNCTIONS, WIKI_FUNCTION], sysText: SYSTEM_PROMPT + WIKI_SYS, dir: 'answers-gemini-mcp-selfloop' };

    const model = genAI.getGenerativeModel({
        model: modelName,
        tools: [{ functionDeclarations: cfg.functions }],
        systemInstruction: { role: 'user', parts: [{ text: cfg.sysText }] },
        // Determinism: greedy decode (temperature 0, top-k 1, single candidate) so re-runs over an
        // unchanged index produce the same answers. Without this the agent samples at temp ~1.0 and
        // PASS counts drift ±3 between runs, making single-run before/after comparisons meaningless.
        generationConfig: { temperature: 0, topK: 1, topP: 1, candidateCount: 1 },
    });

    console.error(`Running ${selected.length} cases · mode=${mode}${oracle ? ' (ORACLE intent)' : ''} with ${modelName}...`);
    const records: AnswerRecord[] = [];
    const bar = makeBar('gen:mcp answering');
    const t0 = Date.now();
    bar.start(selected.length, 0, { elapsed: '0s', eta_fmt: '?', status: '' });
    for (let i = 0; i < selected.length; i++) {
        const tc = selected[i];
        try {
            const rec = await runMcpCase(model, tc, oracle);
            records.push(rec);
            bar.update(i + 1, { status: `${tc.id}: ${rec.toolCalls.length} calls` });
            if (i < selected.length - 1) await pause(isPro ? 13000 : 4500);
        } catch (e: any) {
            records.push({ id: tc.id, question: tc.question, questionType: tc.questionType, subsystem: tc.subsystem, llmAnswer: `ERROR: ${e?.message}`, toolCalls: [], tokens: 0, seenFiles: [], resolvedIntent: null });
            bar.update(i + 1, { status: `${tc.id}: ERROR` });
            await pause(5000);
        }
        const elapsed = (Date.now() - t0) / 1000;
        bar.update(i + 1, { elapsed: fmtSec(elapsed), eta_fmt: fmtSec(i > 0 ? (elapsed / (i + 1)) * (selected.length - i - 1) : 0) });
    }
    bar.stop();

    saveMcpAnswers(path.join(PROJECT_ROOT, 'logs', cfg.dir), records);
    console.error(`Answers saved to logs/${cfg.dir}/`);
    console.log(`\n${records.length} answers | ${records.reduce((s, r) => s + r.tokens, 0).toLocaleString()} total tokens`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    // Force exit after main resolves — legacy guard (leftover from an old MCP client connection issue; the client is gone but this is harmless to keep)
    // otherwise prevent Node from exiting once all answers are saved.
    main().then(() => process.exit(0)).catch(e => { console.error('Fatal:', e); process.exit(2); });
}
