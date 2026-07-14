/**
 * judge — SEMANTIC comparison library (no standalone output).
 *
 * Pure semantic compare: for each testcase, the AGENT answer (candDir/<id>.md → candSection)
 * vs the GOLD answer (logs/answers-claude/<id>.md → "## Answer") → PASS / PARTIAL / FAIL + mode + reason.
 * Gold standard = answers-claude (never the self-generated wiki — that would be circular).
 *
 * Consumed by `report.ts --semantic`（付费）via `judgeAnswers`. The old standalone CLI that wrote
 * logs/reports/verdicts.md is retired — report 收编了语义段，verdicts 不再单独产。
 * Model: claude-sonnet-4-6 (cost-saving judge). Needs ANTHROPIC_API_KEY in .env.
 */
import "./utils/load-env.js";
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { makeBar, fmtSec } from './utils/progress.js';
import { mapPool } from './utils/pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const GOLD_DIR = path.join(PROJECT_ROOT, 'logs', 'answers-claude');
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

/** Judge every testcase in `candDir` (section `candSection`) against the answers-claude gold. Reusable
 * across candidate configs (combined / wiki-only / nav-only) — always gold = Claude, never the self-generated wiki. */
export async function judgeAnswers(client: Anthropic, testcases: { id: string; question: string }[], candDir: string, candSection: string): Promise<Row[]> {
    const jobs = testcases.filter(tc =>
        fs.existsSync(path.join(GOLD_DIR, `${tc.id}.md`)) && fs.existsSync(path.join(candDir, `${tc.id}.md`)));
    const bar = makeBar('judge 判定');
    const t0 = Date.now();
    let n = 0;
    bar.start(jobs.length, 0, { elapsed: '0秒', eta_fmt: '?', status: '' });
    const results = await mapPool<typeof jobs[number], Row | null>(jobs, CONCURRENCY, async (tc) => {
        const gold = extractSection(fs.readFileSync(path.join(GOLD_DIR, `${tc.id}.md`), 'utf-8'), '## Answer');
        const cand = extractSection(fs.readFileSync(path.join(candDir, `${tc.id}.md`), 'utf-8'), candSection);
        const tick = (status: string) => {
            n++;
            const elapsed = (Date.now() - t0) / 1000;
            bar.update(n, { elapsed: fmtSec(elapsed), eta_fmt: fmtSec(n > 0 ? (elapsed / n) * (jobs.length - n) : 0), status });
        };
        try {
            const v = await judgeOne(client, tc.question, gold, cand);
            tick(`${tc.id}: ${v.verdict}`);
            return { id: tc.id, ...v };
        } catch (e) {
            tick(`${tc.id}: ERROR`);
            return null;
        }
    });
    bar.stop();
    return results.filter((r): r is Row => r !== null);
}
