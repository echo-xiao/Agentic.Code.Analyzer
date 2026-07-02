#!/usr/bin/env npx tsx
/**
 * report — the unified attribution view. Deterministic join + derive, no model call:
 *
 *   1. Headline        — manual semantic verdicts (verdicts.md; "pending" until judged)
 *   2. Token efficiency— token-data.json (is the graph worth its tokens?)
 *   3. The funnel      — where quality leaks: index → retrieve/rank → order → gather → synth
 *   4. Detail table    — per-testcase × per-gate, binding bottleneck auto-classified
 *   5. Classifier rules
 *
 * Inputs: logs/data/tools-data.json (eval:tools) · logs/data/token-data.json (eval:token) ·
 * logs/answers-gemini-mcp-selfloop/ (gen --mode=mcp; gather/synth derived here) ·
 * src/eval/verdicts.md (manual).
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { loadTestcases } from './utils/load-testcases.js';
import { extractCitedFiles, fileMatches, readSection } from './utils/eval-util.js';
import { classifyIntent, INTENTS } from '../server/intent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS = path.resolve(__dirname, '..', '..', 'logs');
const D_MCP = path.join(LOGS, 'answers-gemini-mcp-selfloop');
const OUT = path.join(LOGS, 'report.md');

// ── load sidecars ────────────────────────────────────────────────────────────────────────────
function load(name: string): any {
    const p = path.join(LOGS, 'data', name);
    if (!fs.existsSync(p)) {
        console.error(`Missing ${name} — run \`npm run eval:tools\` / \`npm run eval:token\` first.`);
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
}
const tools: any[] = load('tools-data.json');   // per-tc retrieval/order/sanity
const token = load('token-data.json');          // { avgCov0, avgCovN, avgCov2, avgTok0, avgTok2, … }

// ── derive agent gather/synth metrics from the saved answers (was eval-3's mechanical block) ───
interface AgentRow {
    id: string; type: string; question: string;
    coreN: number; coreWritten: number; coreCov: number; seen: boolean; errored: boolean;
    retrievalRecall: number; synthRecall: number; dropped: number;
}
const { flat: testcases } = loadTestcases(path.join(__dirname, 'utils', 'testcases.json'));
const agent: AgentRow[] = testcases.map(tc => {
    const mcpFile = path.join(D_MCP, `${tc.id}.md`);
    const a2 = readSection(mcpFile, '## Gemini Answer', ['## Tool Calls']);
    // Guard: readSection falls back to the whole file when the marker is absent. Answers generated
    // before seen-files tracking lack this section → treat as "no seen data".
    const SEEN_MARKER = '## Files Seen In Tool Results';
    const hasSeen = (() => { try { return fs.readFileSync(mcpFile, 'utf-8').includes(SEEN_MARKER); } catch { return false; } })();
    const seenText = hasSeen ? readSection(mcpFile, SEEN_MARKER, []) : '';
    const seenFiles = extractCitedFiles(seenText);

    const core = (tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? [];
    const retrieved = core.filter(f => seenFiles.some(s => fileMatches(s, f)) || fileMatches(seenText, f));
    const written = core.filter(f => fileMatches(a2, f));
    const writtenOfRetrieved = retrieved.filter(f => fileMatches(a2, f));
    const retrievalRecall = core.length ? retrieved.length / core.length : 1;       // tools surfaced it
    const synthRecall = retrieved.length ? writtenOfRetrieved.length / retrieved.length : 1; // …and agent wrote it
    const dropped = retrieved.filter(f => !fileMatches(a2, f)).length; // retrieved but not written
    const coreCov = core.length ? written.length / core.length : 0;
    // Infra failures (empty / "ERROR …" e.g. Gemini 503) are excluded from capability averages.
    const errored = !a2.trim() || /^ERROR\b/.test(a2.trim());

    return {
        id: tc.id, type: tc.questionType, question: tc.question,
        coreN: core.length, coreWritten: written.length, coreCov, seen: hasSeen, errored,
        retrievalRecall, synthRecall, dropped,
    };
});

// ── manual verdicts (src/eval/verdicts.md) ─────────────────────────────────────────────────────
const verdicts = new Map<string, { verdict: string; mode: string; reason: string }>();
try {
    const md = fs.readFileSync(path.join(__dirname, 'verdicts.md'), 'utf-8');
    for (const line of md.split('\n')) {
        const m = line.match(/^\|\s*([\w-]+)\s*\|\s*(PASS|PARTIAL|FAIL)\s*\|\s*([\w—-]+)\s*\|\s*(.*?)\s*\|/i);
        if (m && m[1] !== 'id') verdicts.set(m[1], { verdict: m[2].toUpperCase(), mode: m[3], reason: m[4] });
    }
} catch { /* verdicts pending */ }

// Resolve each testcase's plan intent for routing accuracy: prefer the untruncated `## Plan` line
// (new answers), else recover from the truncated plan({..."intent":"arc}) args, else classify offline.
function resolveIntent(mcpFile: string, question: string): { intent: string | null; source: 'plan' | 'prefix' | 'classifier' } {
    let txt = ''; try { txt = fs.readFileSync(mcpFile, 'utf-8'); } catch { /* */ }
    const planLine = txt.match(/##\s*Plan[\s\S]*?intent:\s*([\w-]+)/i);
    if (planLine && (INTENTS as string[]).includes(planLine[1])) return { intent: planLine[1], source: 'plan' };
    const prefix = txt.match(/"intent"\s*:\s*"([a-z-]+)/i);
    if (prefix && prefix[1]) {
        const hit = (INTENTS as string[]).find(i => i.startsWith(prefix[1]));
        if (hit) return { intent: hit, source: 'prefix' };
    }
    return { intent: classifyIntent(question), source: 'classifier' };
}

// ── joined rows ──────────────────────────────────────────────────────────────────────────────
interface J {
    id: string; type: string;
    fileRecall: number; symRecall: number; graphReach: number | null;   // G0
    recallAt5: number; recallAt10: number; recallAt20: number; recallAt50: number; diagnosis: string; // G1 (ranking depth)
    orderApplicable: boolean; orderScore: number; orderPass: boolean;   // G1.5
    retrievalRecall: number; coreN: number; coreWritten: number; seen: boolean; // G2
    synthRecall: number; coreCov: number; dropped: number;             // G3
    errored: boolean;
    verdict: string | null;
    resolvedIntent: string | null; intentSource: string; routeOk: boolean | null;
    failureMode: string | null; fault: 'agent' | 'engine' | null; bindingTool: string;
}
// map each failure mode to the pipeline stage it belongs to, so `binding` stays consistent with `mode`.
const MODE_TO_STAGE: Record<string, string> = {
    misrouted: 'route', 'weak-query': 'search', 'engine-unrankable': 'search',
    'no-pivot': 'graph', 'gave-up': 'graph', 'wrong-subsystem': 'graph',
    'dropped-synth': 'synth', 'sloppy-source': 'synth',
};
const byTools = new Map(tools.map(r => [r.id, r]));
const rows: J[] = agent.map(b => {
    const a = byTools.get(b.id) ?? {};
    const v = verdicts.get(b.id);
    const type = b.type ?? a.subsystem ?? '?';
    const r50 = a.recallAt50 ?? a.recallAt20 ?? 0;
    const { intent, source } = resolveIntent(path.join(D_MCP, `${b.id}.md`), b.question);
    const routeOk = v ? (intent === type) : null;
    // failure mode: semantic label from verdicts.md wins; else mechanical fallback from R@50/gather/synth.
    const mode: string | null = (v && v.mode && v.mode !== '—') ? v.mode
        : !v ? null
        : v.verdict === 'PASS' ? null
        : routeOk === false ? 'misrouted'
        : r50 < 0.3 ? 'engine-unrankable'
        : b.retrievalRecall < 0.5 ? 'no-pivot'
        : b.synthRecall < 0.7 ? 'dropped-synth' : 'no-pivot';
    const fault: 'agent' | 'engine' | null = mode ? (mode === 'engine-unrankable' ? 'engine' : 'agent') : null;
    // binding = the pipeline stage of the (authoritative) semantic failure mode; PASS → ok.
    const bindingTool = (!v || v.verdict === 'PASS') ? 'ok' : (mode ? (MODE_TO_STAGE[mode] ?? 'graph') : 'graph');
    return {
        id: b.id, type,
        fileRecall: a.fileRecall ?? 0, symRecall: a.symRecall ?? 0, graphReach: a.graphReach ?? null,
        recallAt5: a.recallAt5 ?? 0, recallAt10: a.recallAt10 ?? 0, recallAt20: a.recallAt20 ?? 0,
        recallAt50: r50, diagnosis: a.diagnosis ?? 'n/a',
        orderApplicable: !!a.orderApplicable, orderScore: a.orderScore ?? 1, orderPass: a.orderPass ?? true,
        retrievalRecall: b.retrievalRecall, coreN: b.coreN, coreWritten: b.coreWritten, seen: b.seen,
        synthRecall: b.synthRecall, coreCov: b.coreCov, dropped: b.dropped,
        errored: b.errored,
        verdict: v?.verdict ?? null,
        resolvedIntent: intent, intentSource: source, routeOk,
        failureMode: mode, fault, bindingTool,
    };
});

// Binding stage per row is computed inline as `bindingTool` (route→search→graph→synth); see the
// rows.map above. The old G1/G2/G3 bottleneck() classifier was retired in the pipeline redesign.
// Log artifact: agent WROTE more core than the seen-log recorded as retrieved (G2 under-counts).
const undercounts = (j: J) => j.coreN > 0 && j.retrievalRecall * j.coreN + 1e-9 < j.coreWritten;

// ── aggregates ─────────────────────────────────────────────────────────────────────────────────
const pct = (x: number) => `${(x * 100).toFixed(0)}%`;
const mean = (xs: number[]) => (xs.length ? xs.reduce((s, v) => s + v, 0) / xs.length : 0);
const live = rows.filter(r => !r.errored);              // capability rows (drop infra failures)
const erroredIds = rows.filter(r => r.errored).map(r => r.id);

const g0file = mean(rows.map(r => r.fileRecall));
const g0sym = mean(rows.map(r => r.symRecall));
const g0graph = mean(rows.filter(r => r.graphReach != null).map(r => r.graphReach as number));
const g15rows = rows.filter(r => r.orderApplicable);
const g15 = mean(g15rows.map(r => r.orderScore));
const totalDropped = rows.reduce((s, r) => s + r.dropped, 0);

const diagDist = new Map<string, number>();
for (const r of rows) diagDist.set(r.diagnosis, (diagDist.get(r.diagnosis) ?? 0) + 1);

// ── render ───────────────────────────────────────────────────────────────────────────────────
const short: Record<string, string> = { architecture: 'arch', 'call-chain': 'chain', locate: 'loc', pattern: 'patt', routing: 'rout', impact: 'imp' };
const L: string[] = [];
L.push(`# Unified report — verdicts · token · funnel · attribution\n`);
L.push(`${new Date().toLocaleString('en-US')} | ${rows.length} testcases | joined from tools/token sidecars + answers + verdicts.md (deterministic)\n`);
if (erroredIds.length) L.push(`> ⚠ ${erroredIds.length} infra failure(s) excluded from capability averages: ${erroredIds.join(', ')} (empty / 503).\n`);

// 1 — headline: manual semantic verdicts
L.push(`## 1. Headline — semantic verdicts (manual, verdicts.md)\n`);
if (verdicts.size > 0) {
    const counts = { PASS: 0, PARTIAL: 0, FAIL: 0 } as Record<string, number>;
    for (const r of rows) if (r.verdict) counts[r.verdict] = (counts[r.verdict] ?? 0) + 1;
    const judged = rows.filter(r => r.verdict).length;
    L.push(`**PASS ${counts.PASS} / PARTIAL ${counts.PARTIAL} / FAIL ${counts.FAIL}** (${judged}/${rows.length} judged)\n`);
    if (judged < rows.length) L.push(`> ⚠ ${rows.length - judged} answers not yet judged — refresh verdicts.md.\n`);
} else {
    L.push(`_Pending — no verdicts in src/eval/verdicts.md yet. Judge each answer in logs/answers-gemini-mcp-selfloop/ after gen --mode=mcp; single-run PASS counts are noisy, judge trends._\n`);
}

// 2 — token efficiency (orthogonal axis)
L.push(`## 2. Token efficiency — is the graph worth its tokens? (token)\n`);
L.push(`| | no-MCP | naive @ same answer size | with MCP |`);
L.push(`|---|---:|---:|---:|`);
L.push(`| Avg coverage | ${pct(token.avgCov0)} | ${pct(token.avgCovN)} | ${pct(token.avgCov2)} |`);
L.push(`| Avg tokens / question | ${Math.round(token.avgTok0).toLocaleString()} | ~${Math.round(token.avgTok2).toLocaleString()} | ${Math.round(token.avgTok2).toLocaleString()} |`);
L.push('');

// 3 — agent behavior diagnosis: what did the agent do wrong, agent-fault vs engine-fault?
L.push(`## 3. Agent behavior diagnosis — agent-fault vs engine-fault\n`);
const passN = rows.filter(r => r.verdict === 'PASS').length;
const nonPass = rows.filter(r => r.verdict && r.verdict !== 'PASS');
const agentFaultN = nonPass.filter(r => r.fault === 'agent').length;
const engineFaultN = nonPass.filter(r => r.fault === 'engine').length;
L.push(`**${passN}/${rows.length} PASS · of the ${nonPass.length} non-PASS: ${agentFaultN} agent-fault (fix prompt/plan/loop) · ${engineFaultN} engine-fault (fix ranking).**\n`);
const MODE_LEVER: Record<string, string> = {
    'misrouted': 'plan / intent.ts keyword table',
    'weak-query': 'search query terms / seeds',
    'no-pivot': 'graph expand/down/up depth+direction',
    'gave-up': "gen prompt (don't stop early)",
    'wrong-subsystem': 'plan strategy / architecture.json hint',
    'dropped-synth': 'gen prompt (write what you saw)',
    'sloppy-source': 'gen prompt (cite real load-bearing files)',
    'engine-unrankable': 'ENGINE: retrieval ranking (not agent)',
};
const byMode = new Map<string, string[]>();
for (const r of nonPass) { const k = r.failureMode ?? 'unclassified'; if (!byMode.has(k)) byMode.set(k, []); byMode.get(k)!.push(r.id); }
L.push(`| failure mode | fault | # | testcases | fix-lever |`);
L.push(`|---|---|---:|---|---|`);
for (const [m, ids] of [...byMode].sort((a, b) => b[1].length - a[1].length)) {
    const f = m === 'engine-unrankable' ? 'engine' : 'agent';
    L.push(`| ${m} | ${f} | ${ids.length} | ${ids.join(', ')} | ${MODE_LEVER[m] ?? '—'} |`);
}
L.push('');

// 4 — the funnel (TRUE cumulative funnel: share of ALL core files still alive at each stage).
// SAME DENOMINATOR for every stage: sumCore over the same liveCore row-set. Pooled file counts, not
// averages-of-ratios, so 100% → X% → Y% is monotonic. A file passes through only two stages: the agent
// surfaces it (retrieval), then writes it (synthesis). R@10 / chain-order are DIAGNOSTICS that explain
// the retrieval leak — not sequential stages, so they sit below the funnel.
const sum = (xs: number[]) => xs.reduce((s, v) => s + v, 0);
const liveCore = live.filter(r => r.coreN > 0);
const sumCore = sum(liveCore.map(r => r.coreN));                                                   // the ONE denominator
const sumRetr = sum(liveCore.map(r => Math.min(r.coreN, Math.round(r.retrievalRecall * r.coreN))));
const sumWrit = sum(liveCore.map(r => r.coreWritten));
const fRetr = sumCore ? sumRetr / sumCore : 0;
const fWrit = sumCore ? sumWrit / sumCore : 0;
const synthRate = sumRetr ? Math.min(1, sumWrit / sumRetr) : 0;
// pooled single-query recall at each ranking depth (nested subsets of the same sumCore → monotonic)
const poolR = (get: (r: J) => number) => sumCore ? sum(liveCore.map(r => get(r) * r.coreN)) / sumCore : 0;
const r5 = poolR(r => r.recallAt5), r10 = poolR(r => r.recallAt10), r20 = poolR(r => r.recallAt20), r50 = poolR(r => r.recallAt50);
const cnt = (f: number) => Math.round(f * sumCore);
const bar = (x: number) => '█'.repeat(Math.round(x * 30)).padEnd(30, '░');
const row = (label: string, f: number, tail = '') => `${label.padEnd(30)} ${pct(f).padStart(4)}  ${bar(f)} ${tail}`;
L.push(`## 4. The funnel — one path, every stage ÷ the same ${sumCore} core files\n`);
L.push(`> Per-FILE pooled fractions (of all ${sumCore} core files, how many survive each stage) — NOT tools' per-testcase mean R@k. Absolute numbers differ: the funnel weights bigger-spine testcases more.\n`);
L.push('```');
L.push(`INDEX (floor)`);
L.push(row('  indexed & graph-reachable', 1));
L.push(`SEARCH+GRAPH rank — how deep core ranks in one query`);
L.push(row('  ranked in top-5', r5));
L.push(row('  ranked in top-10', r10));
L.push(row('  ranked in top-20', r20));
const gatherRate = r50 ? Math.min(1, fRetr / r50) : 0;   // of the single-query top-50 ceiling, how much the agent pulls in
L.push(row('  ranked in top-50 (ceiling)', r50, `<- ${pct(1 - r50)} never rank = ENGINE-fault (recall-miss)`));
L.push(`GRAPH loop — agent multi-turn gather`);
L.push(row('  surfaced by agent loop', fRetr, `<- gather ${pct(gatherRate)} of ceiling`));
L.push(`SYNTH — agent writes what it surfaced`);
L.push(row('  written into the answer', fWrit, `<- synth ${pct(synthRate)} of surfaced, drops ${totalDropped}`));
L.push('```');
L.push(`\n**Three stages, sized** (all ÷ ${sumCore}):`);
L.push(`- **never rank (recall-miss): ${pct(1 - r50)}** — ${cnt(1 - r50)} core files absent even from top-50 (**ENGINE-fault**).`);
L.push(`- **ranked-but-not-gathered: ${pct(Math.max(0, r50 - fRetr))}** — ${cnt(Math.max(0, r50 - fRetr))} files rank in top-50 but the agent never surfaces them (**agent-fault**).`);
L.push(`- **surfaced-but-not-written (synthesis): ${pct(Math.max(0, fRetr - fWrit))}** — ${totalDropped} files (**agent-fault**).\n`);
L.push(`> Index: file ${pct(g0file)} / sym ${pct(g0sym)} / graph ${pct(g0graph)}. Chain-order LCS ${pct(g15)} (${g15rows.length} ordered Qs) · diag ${[...diagDist].map(([d, c]) => `${d} ${c}`).join('/')}. Seen-log under-counts retrieval on \`*\` rows → ${pct(fRetr)} surfaced is a lower bound.\n`);

// 5 — per-tool scorecards
L.push(`## 5. Per-tool scorecards — is each tool pulling its weight?\n`);
const routeKnown = rows.filter(r => r.verdict).length;
const routeHit = rows.filter(r => r.routeOk === true).length;
const bindN = (t: string) => rows.filter(r => r.bindingTool === t).length;
L.push(`| tool | metric | leak | binds # | fix-lever |`);
L.push(`|---|---|---|---:|---|`);
L.push(`| plan (route) | intent accuracy | ${routeHit}/${routeKnown} correct | ${bindN('route')} | intent.ts table / architecture.json |`);
L.push(`| search (seed) | R@10 ${pct(r10)} · R@50 ${pct(r50)} | ${pct(1 - r50)} never rank | ${bindN('search')} | seeds / engine ranking |`);
L.push(`| graph (traverse) | gather ${pct(gatherRate)} of ceiling · order ${pct(g15)} | ${pct(Math.max(0, r50 - fRetr))} ranked-not-gathered | ${bindN('graph')} | engine expand/down/up |`);
L.push(`| details | fetch step | — (not a binding stage) | ${bindN('details')} | — |`);
L.push(`| synth (write) | synth ${pct(synthRate)} of surfaced | drops ${totalDropped} files | ${bindN('synth')} | gen prompt / plan strategy |`);
L.push('');

// 6 — detail table
L.push(`## 6. Detail — every testcase × every stage\n`);
L.push(`Diag: rm=recall-miss · rl=ranked-low · mx=mixed · ok. route ✓/✗ = plan intent vs question type. \`*\` on gather = seen-log under-counts. binding = first leaking stage (route→search→graph→synth).\n`);
L.push(`| # | id | type | route | R@10·diag | gather | synth | end cov | mode | verdict | binding |`);
L.push(`|---|---|---|:-:|---|---:|---:|---:|---|---|---|`);
rows.forEach((r, i) => {
    const diagAbbr: Record<string, string> = { 'recall-miss': 'rm', 'ranked-low': 'rl', 'mixed': 'mx', 'ok': 'ok', 'n/a': '—' };
    const routec = r.routeOk == null ? '—' : r.routeOk ? '✓' : '✗';
    const g1c = `${pct(r.recallAt10)} ${diagAbbr[r.diagnosis] ?? r.diagnosis}`;
    const g2c = r.errored ? '—' : pct(r.retrievalRecall) + (undercounts(r) ? '*' : '');
    const g3c = r.errored ? '—' : pct(r.synthRecall);
    const endc = r.errored ? '—' : `${r.coreWritten}/${r.coreN} ${pct(r.coreCov)}`;
    L.push(`| ${i + 1} | ${r.id} | ${short[r.type] ?? r.type} | ${routec} | ${g1c} | ${g2c} | ${g3c} | ${endc} | ${r.failureMode ?? '—'} | ${r.verdict ?? '—'} | ${r.bindingTool} |`);
});
L.push('');
// binding-tool distribution
const dist = new Map<string, number>();
for (const r of rows) dist.set(r.bindingTool, (dist.get(r.bindingTool) ?? 0) + 1);
L.push(`**Binding-tool distribution:** ${[...dist].sort((a, b) => b[1] - a[1]).map(([t, c]) => `${t} ${c}`).join(' · ')}.\n`);

// summary by type
L.push(`### By question type\n`);
L.push(`| type | n | avg R@10 | end cov | binding |`);
L.push(`|---|---:|---:|---:|---|`);
const typeOrder = ['architecture', 'call-chain', 'locate', 'pattern', 'routing', 'impact'];
const types = [...new Set(rows.map(r => r.type))].sort((a, b) => (typeOrder.indexOf(a) + 1 || 99) - (typeOrder.indexOf(b) + 1 || 99));
for (const t of types) {
    const g = rows.filter(r => r.type === t);
    const gl = g.filter(r => !r.errored);
    const avgR = mean(g.map(r => r.recallAt10));
    const avgEnd = mean(gl.filter(r => r.coreN > 0).map(r => r.coreCov));
    const bd = new Map<string, number>();
    for (const r of g) bd.set(r.bindingTool, (bd.get(r.bindingTool) ?? 0) + 1);
    const bdStr = [...bd].sort((a, b) => b[1] - a[1]).map(([k, c]) => `${k}${c > 1 ? '×' + c : ''}`).join(', ');
    L.push(`| ${t} | ${g.length} | ${pct(avgR)} | ${pct(avgEnd)} | ${bdStr} |`);
}
L.push('');

fs.writeFileSync(OUT, L.join('\n'), 'utf-8');
console.error(`Wrote logs/report.md`);
const vStr = verdicts.size ? `verdicts ${rows.filter(r => r.verdict === 'PASS').length}P/${rows.filter(r => r.verdict === 'PARTIAL').length}p/${rows.filter(r => r.verdict === 'FAIL').length}F` : 'verdicts pending';
console.log(`report: ${vStr} | funnel (n=${sumCore}) indexed 100% → top50 ${pct(r50)} → surfaced ${pct(fRetr)} → written ${pct(fWrit)}${erroredIds.length ? ` | ${erroredIds.length} infra excluded` : ''}`);
