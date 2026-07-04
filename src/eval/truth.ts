/**
 * truth — extract deterministic ground truth from the Claude gold answers → src/eval/utils/claude-truth.json.
 *
 * One Claude (sonnet-4-6) structured pass per answers-claude/<id>.md pulls out the answer spine:
 *   core        — load-bearing files (recall@k denominator)
 *   supporting  — files mentioned but not essential (precision pool)
 *   chain       — ordered [{file, symbol}] call/execution steps (primaryQuery + graph reachability + chain-LCS)
 *   keySymbols  — key function/class names
 * tools.ts / report.ts then score search/graph against THIS, not the hand-authored testcases spine.
 *
 * Model: claude-sonnet-4-6. Needs ANTHROPIC_API_KEY or CLAUDE_API_KEY in .env.
 * Run: npm run truth   (one-time; rerun only when answers-claude changes — paid API, ~34 calls <$1).
 */
import './utils/load-env.js';
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { loadTestcases } from './utils/load-testcases.js';
import {
    writeClaudeTruth, CLAUDE_TRUTH_PATH, TESTCASES_PATH, extractAnswerSection,
    type ClaudeTruth, type ClaudeTruthMap,
} from './utils/truth-io.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const GOLD_DIR = path.join(PROJECT_ROOT, 'logs', 'answers-claude');
const MODEL = 'claude-sonnet-4-6';
const CONCURRENCY = 5;

const SYSTEM = `You extract structured ground truth from a REFERENCE ANSWER about the Rocket.Chat codebase.
Return four fields, judging strictly:
- core: the LOAD-BEARING files — the ones without which the mechanism/answer would be wrong. Be strict; this is the spine, not everything mentioned.
- supporting: files the answer mentions but that are not essential to the core mechanism.
- chain: the ordered call/execution sequence as [{file, symbol}] steps, in causal order (entry first). symbol = the function/method/class at that step.
- keySymbols: the key function/class/method names the answer relies on.
Use repo-relative paths EXACTLY as written in the answer (e.g. apps/meteor/app/lib/server/functions/sendMessage.ts). Do not invent files or symbols not present in the answer.`;

const SCHEMA = {
    type: 'object',
    properties: {
        core: { type: 'array', items: { type: 'string' } },
        supporting: { type: 'array', items: { type: 'string' } },
        chain: {
            type: 'array',
            items: {
                type: 'object',
                properties: { file: { type: 'string' }, symbol: { type: 'string' } },
                required: ['file', 'symbol'], additionalProperties: false,
            },
        },
        keySymbols: { type: 'array', items: { type: 'string' } },
    },
    required: ['core', 'supporting', 'chain', 'keySymbols'],
    additionalProperties: false,
} as const;

async function extractOne(client: Anthropic, question: string, answer: string): Promise<ClaudeTruth> {
    const resp = await client.messages.create({
        model: MODEL,
        max_tokens: 1500,
        system: SYSTEM,
        messages: [{ role: 'user', content: `QUESTION:\n${question}\n\n===== REFERENCE ANSWER =====\n${answer}` }],
        output_config: { effort: 'medium', format: { type: 'json_schema', schema: SCHEMA } },
    } as any);
    const block = (resp.content as any[]).find(b => b.type === 'text');
    if (!block) throw new Error('no text block in response');
    return JSON.parse(block.text) as ClaudeTruth;
}

async function mapPool<T, R>(items: T[], n: number, fn: (item: T, i: number) => Promise<R>): Promise<R[]> {
    const out: R[] = new Array(items.length);
    let idx = 0;
    const worker = async () => { while (idx < items.length) { const i = idx++; out[i] = await fn(items[i], i); } };
    await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker));
    return out;
}

async function main() {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    if (!apiKey) { console.error('ANTHROPIC_API_KEY (or CLAUDE_API_KEY) not set in .env. Add it and retry.'); process.exit(1); }
    const client = new Anthropic({ apiKey });

    const { flat: testcases } = loadTestcases(TESTCASES_PATH);
    const filter = process.argv.find(a => a.startsWith('--filter='))?.split('=')[1]?.toLowerCase();
    const jobs = testcases.filter(tc => {
        if (filter && !tc.id.toLowerCase().includes(filter)) return false;
        if (!fs.existsSync(path.join(GOLD_DIR, `${tc.id}.md`))) { console.error(`skip ${tc.id} (no answers-claude file)`); return false; }
        return true;
    });

    console.error(`Extracting truth from ${jobs.length} gold answers with ${MODEL}...`);
    let done = 0;
    const entries = await mapPool<typeof jobs[number], [string, ClaudeTruth] | null>(jobs, CONCURRENCY, async (tc) => {
        const answer = extractAnswerSection(fs.readFileSync(path.join(GOLD_DIR, `${tc.id}.md`), 'utf-8'));
        try {
            const truth = await extractOne(client, tc.question, answer);
            console.error(`  [${++done}/${jobs.length}] ${tc.id}: core ${truth.core.length}, chain ${truth.chain.length}`);
            return [tc.id, truth];
        } catch (e) {
            console.error(`  [${++done}/${jobs.length}] ${tc.id}: ERROR — ${(e as Error).message}`);
            return null;
        }
    });

    // Merge onto any existing map so a --filter run updates just those ids instead of wiping the rest.
    const existing: ClaudeTruthMap = fs.existsSync(CLAUDE_TRUTH_PATH)
        ? JSON.parse(fs.readFileSync(CLAUDE_TRUTH_PATH, 'utf-8')) : {};
    for (const e of entries) if (e) existing[e[0]] = e[1];
    writeClaudeTruth(existing, CLAUDE_TRUTH_PATH);
    console.error(`Wrote src/eval/utils/claude-truth.json (${Object.keys(existing).length} ids).`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main().then(() => process.exit(0)).catch(e => { console.error('Fatal:', e); process.exit(2); });
}
