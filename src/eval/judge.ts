/**
 * judge — SEMANTIC report → logs/reports/verdicts.md.
 *
 * Pure semantic comparison: for each testcase, compare the AGENT answer
 * (logs/answers-gemini-mcp-selfloop/<id>.md → "## Gemini Answer") against the
 * GOLD answer (logs/answers-claude/<id>.md → "## Answer"), and emit
 * PASS / PARTIAL / FAIL + mode (where it diverges) + one-line reason.
 *
 * Gold standard = answers-claude (NOT testcases.json's core spine — the old
 * manual basis — and NOT DeepWiki: DeepWiki is the agent's OWN wiki tool, so
 * judging against it would be circular). No rubric, no frozen criteria; the
 * three labels are only the semantic-match scale.
 *
 * Model: claude-sonnet-4-6 (cost-saving judge). Needs ANTHROPIC_API_KEY in .env.
 * Run: npm run judge   (regenerates verdicts.md — overwrite is recoverable via git).
 */
import "./utils/load-env.js";
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { loadTestcases } from './utils/load-testcases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const GOLD_DIR = path.join(PROJECT_ROOT, 'logs', 'answers-claude');
const CAND_DIR = path.join(PROJECT_ROOT, 'logs', 'answers-gemini-mcp-selfloop');
const OUT = path.join(PROJECT_ROOT, 'logs', 'reports', 'verdicts.md');
const MODEL = 'claude-sonnet-4-6';
const CONCURRENCY = 5;

type Verdict = { verdict: 'PASS' | 'PARTIAL' | 'FAIL'; mode: string; reason: string };
export type Row = { id: string } & Verdict;

/** Grab the body of one `## Heading` section, up to the next same-level heading or EOF. */
export function extractSection(md: string, heading: string): string {
    const lines = md.split('\n');
    const start = lines.findIndex(l => l.trim() === heading);
    if (start === -1) return md.trim(); // heading absent → fall back to whole file
    const rest = lines.slice(start + 1);
    const end = rest.findIndex(l => /^##\s/.test(l));
    return (end === -1 ? rest : rest.slice(0, end)).join('\n').trim();
}

const SYSTEM = `You are a code-architecture answer judge for the Rocket.Chat codebase.
You are given a GOLD answer (the standard — it is THOROUGH and traces every layer) and a CANDIDATE
answer (from an agent on a tight tool budget) to the same question. Do a PURE SEMANTIC comparison,
judging MEANING not wording. Different-but-correct file paths still count as a match; citation style
and path exactness do NOT matter.

Grade GENEROUSLY on the CORE MECHANISM. The gold typically enumerates every entry-point variant, the
full post-save / notification fan-out, and exhaustive per-step detail; the candidate is NOT expected to
match that breadth. Reward getting the central pipeline right; do NOT drop to PARTIAL just for missing
peripheral completeness.

Return one of three labels:
- PASS: the candidate gets the CORE mechanism right — the primary entry point, the central function /
  dispatch boundary, and the essential steps that make the mechanism work. Omitting peripheral detail
  (extra entry-point variants, the full post-save/notification fan-out, secondary layers, or exhaustive
  step-by-step enumeration) STILL PASSES, as long as the core is correct and not misleading.
- PARTIAL: the CORE itself is incomplete or partly wrong — a step WITHOUT WHICH THE CENTRAL MECHANISM
  DOES NOT WORK is missing, or the right subsystem but the wrong central function/pipeline. Missing only
  peripheral layers is NOT PARTIAL — that is PASS.
- FAIL: wrong mechanism, wrong subsystem, hallucinated paths, or an empty/error answer.

Also return "mode": a short phrase for WHERE the candidate diverges (empty string for PASS) — e.g.
"wrong central function", "core step missing", "wrong subsystem", "gave up", "hallucinated path".
And "reason": one terse sentence justifying the verdict.`;

const SCHEMA = {
    type: 'object',
    properties: {
        verdict: { type: 'string', enum: ['PASS', 'PARTIAL', 'FAIL'] },
        mode: { type: 'string' },
        reason: { type: 'string' },
    },
    required: ['verdict', 'mode', 'reason'],
    additionalProperties: false,
} as const;

export async function judgeOne(client: Anthropic, question: string, gold: string, cand: string): Promise<Verdict> {
    const resp = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM,
        messages: [{
            role: 'user',
            content: `QUESTION:\n${question}\n\n===== GOLD ANSWER (standard) =====\n${gold}\n\n===== CANDIDATE ANSWER (agent) =====\n${cand}`,
        }],
        // effort medium = cost/quality balance for a bounded comparison; format = schema-locked JSON.
        output_config: { effort: 'medium', format: { type: 'json_schema', schema: SCHEMA } },
    } as any);
    const block = (resp.content as any[]).find(b => b.type === 'text');
    if (!block) throw new Error('no text block in response');
    return JSON.parse(block.text) as Verdict;
}

/** Bounded-concurrency map — keeps us under rate limits without going fully sequential. */
async function mapPool<T, R>(items: T[], n: number, fn: (item: T, i: number) => Promise<R>): Promise<R[]> {
    const out: R[] = new Array(items.length);
    let idx = 0;
    const worker = async () => {
        while (idx < items.length) {
            const i = idx++;
            out[i] = await fn(items[i], i);
        }
    };
    await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker));
    return out;
}

/** Judge every testcase in `candDir` (section `candSection`) against the answers-claude gold. Reusable
 * across candidate configs (combined / wiki-only / nav-only) — always gold = Claude, never DeepWiki. */
export async function judgeAnswers(client: Anthropic, testcases: { id: string; question: string }[], candDir: string, candSection: string): Promise<Row[]> {
    const jobs = testcases.filter(tc =>
        fs.existsSync(path.join(GOLD_DIR, `${tc.id}.md`)) && fs.existsSync(path.join(candDir, `${tc.id}.md`)));
    const results = await mapPool<typeof jobs[number], Row | null>(jobs, CONCURRENCY, async (tc) => {
        const gold = extractSection(fs.readFileSync(path.join(GOLD_DIR, `${tc.id}.md`), 'utf-8'), '## Answer');
        const cand = extractSection(fs.readFileSync(path.join(candDir, `${tc.id}.md`), 'utf-8'), candSection);
        try {
            const v = await judgeOne(client, tc.question, gold, cand);
            console.error(`  ${tc.id}: ${v.verdict}`);
            return { id: tc.id, ...v };
        } catch (e) {
            console.error(`  ${tc.id}: ERROR — ${(e as Error).message}`);
            return null;
        }
    });
    return results.filter((r): r is Row => r !== null);
}

async function main() {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    if (!apiKey) { console.error('ANTHROPIC_API_KEY (or CLAUDE_API_KEY) not set in .env. Add it and retry.'); process.exit(1); }
    const client = new Anthropic({ apiKey });

    const { flat: testcases } = loadTestcases(path.join(__dirname, 'utils', 'testcases.json'));

    console.error(`Judging combined answers with ${MODEL} (semantic compare vs answers-claude)...`);
    const rows = await judgeAnswers(client, testcases, CAND_DIR, '## Gemini Answer');
    const skipped = testcases.length - rows.length;

    const n = { PASS: 0, PARTIAL: 0, FAIL: 0 };
    for (const r of rows) n[r.verdict]++;

    const esc = (s: string) => (s ?? '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();
    const L: string[] = [];
    L.push(`# agents — semantic verdicts (generated by judge.ts · model: ${MODEL})\n`);
    L.push(`**Judged: ${new Date().toLocaleString('en-US')}** · pure semantic compare of \`logs/answers-gemini-mcp-selfloop/\` (agent) against \`logs/answers-claude/\` (**standard answer**). No rubric / no frozen criteria — the three labels are only the semantic-match scale. Regenerate with \`npm run judge\` after every \`gen:mcp\`.\n`);
    L.push(`> **PASS** = same core mechanism as the gold answer (different-but-correct files still PASS). **PARTIAL** = main direction right, a load-bearing step missing or a local part wrong. **FAIL** = wrong mechanism, hallucinated paths, or empty/error answer.\n`);
    L.push(`| id | verdict | mode | reason |`);
    L.push(`|---|---|---|---|`);
    for (const r of rows) L.push(`| ${r.id} | ${r.verdict} | ${esc(r.mode) || '—'} | ${esc(r.reason)} |`);
    L.push(`\n> **Summary: PASS ${n.PASS} / PARTIAL ${n.PARTIAL} / FAIL ${n.FAIL}** (of ${rows.length}${skipped ? `; ${skipped} skipped/errored` : ''}).\n`);

    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, L.join('\n'), 'utf-8');
    console.error(`Wrote logs/reports/verdicts.md — PASS ${n.PASS} / PARTIAL ${n.PARTIAL} / FAIL ${n.FAIL}${skipped ? ` (${skipped} skipped)` : ''}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main();
}
