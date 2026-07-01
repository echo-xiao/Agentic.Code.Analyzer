#!/usr/bin/env npx tsx
/**
 * report — the unified retrieval-funnel view.
 *
 * Pure JOIN, no measurement: reads the three sidecar JSONs that eval-1/2/3 emit
 * (logs/eval-{1,2,3}-data.json) and joins them by testcase id into one report:
 *
 *   1. Token efficiency (eval-1)  — is the graph worth its tokens? (orthogonal to the funnel)
 *   2. The funnel (eval-2 + 3)    — where quality leaks: index → retrieve/rank → order → gather → synth
 *   3. Detail table               — per-testcase × per-gate, with the binding gate auto-classified
 *   4. Summary table              — per question-type: weak gate + targeted fix (playbook)
 *
 * No index load, no model call, deterministic. Runs at the end of `npm run refresh`.
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS = path.resolve(__dirname, '..', '..', 'logs');
const OUT = path.join(LOGS, 'report.md');

// ── load sidecars ────────────────────────────────────────────────────────────────────────────
function load(name: string): any {
    const p = path.join(LOGS, 'data', name);
    if (!fs.existsSync(p)) {
        console.error(`Missing ${name} — run \`npm run refresh\` (it runs eval-1/2/3 which emit the sidecars) first.`);
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
}
const e1 = load('eval-1-data.json');            // { avgCov0, avgCovN, avgCov2, avgTok0, avgTok2, improved, graphGain, rows }
const e2: any[] = load('eval-2-data.json');     // per-tc retrieval/order/sanity
const e3: any[] = load('eval-3-data.json');     // per-tc retrieval/synth/coreCov/verdict

const by2 = new Map(e2.map(r => [r.id, r]));
const by3 = new Map(e3.map(r => [r.id, r]));
const ids = e3.map(r => r.id); // eval-3 drives row order

// ── joined rows ──────────────────────────────────────────────────────────────────────────────
interface J {
    id: string; type: string;
    fileRecall: number; symRecall: number; graphReach: number | null;   // G0
    recallAt5: number; recallAt10: number; recallAt20: number; recallAt50: number; diagnosis: string; // G1 (ranking depth)
    orderApplicable: boolean; orderScore: number; orderPass: boolean;   // G1.5
    retrievalRecall: number; coreN: number; coreWritten: number; seen: boolean; // G2
    synthRecall: number; coreCov: number; dropped: number;             // G3
    errored: boolean;
}
const rows: J[] = ids.map(id => {
    const a = by2.get(id) ?? {};
    const b = by3.get(id) ?? {};
    return {
        id, type: b.type ?? a.subsystem ?? '?',
        fileRecall: a.fileRecall ?? 0, symRecall: a.symRecall ?? 0, graphReach: a.graphReach ?? null,
        recallAt5: a.recallAt5 ?? 0, recallAt10: a.recallAt10 ?? 0, recallAt20: a.recallAt20 ?? 0,
        recallAt50: a.recallAt50 ?? a.recallAt20 ?? 0, diagnosis: a.diagnosis ?? 'n/a',
        orderApplicable: !!a.orderApplicable, orderScore: a.orderScore ?? 1, orderPass: a.orderPass ?? true,
        retrievalRecall: b.retrievalRecall ?? 0, coreN: b.coreN ?? 0, coreWritten: b.coreWritten ?? 0, seen: !!b.seen,
        synthRecall: b.synthRecall ?? 0, coreCov: b.coreCov ?? 0, dropped: b.dropped ?? 0,
        errored: !!b.errored,
    };
});

// ── bottleneck classifier (front → back: the first gate that leaks is the binding one) ──────────
// Heuristic and deliberately transparent — the rules are printed in the report so a tag can be audited.
function bottleneck(j: J): { tag: string; note: string } {
    if (j.errored) return { tag: 'ERR', note: 'infra (503 / empty answer) — excluded from capability averages' };
    if (j.coreCov >= 0.5) return { tag: 'OK', note: '' };
    if (j.recallAt10 < 0.3) {
        const t = j.diagnosis === 'recall-miss' ? 'G1-recall'
            : j.diagnosis === 'ranked-low' ? 'G1-rank'
            : 'G1-mix';
        return { tag: t, note: 'search cannot rank core into top-10' };
    }
    if (j.retrievalRecall < 0.5) return { tag: 'G2', note: "search could, but the agent's loop didn't gather it" };
    if (j.synthRecall < 0.7) return { tag: 'G3', note: 'gathered but not written into the answer' };
    return { tag: 'G1-mix', note: 'residual' };
}
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
const g1 = mean(rows.map(r => r.recallAt10));            // eval-2 is deterministic, no infra failures
const g15rows = rows.filter(r => r.orderApplicable);
const g15 = mean(g15rows.map(r => r.orderScore));
const g2rows = live.filter(r => r.seen && r.coreN > 0);
const g2 = mean(g2rows.map(r => r.retrievalRecall));
const g3rows = g2rows.filter(r => r.retrievalRecall > 0);
const g3 = mean(g3rows.map(r => r.synthRecall));
const end = mean(live.filter(r => r.coreN > 0).map(r => r.coreCov));
const totalDropped = rows.reduce((s, r) => s + r.dropped, 0);

const diagDist = new Map<string, number>();
for (const r of rows) diagDist.set(r.diagnosis, (diagDist.get(r.diagnosis) ?? 0) + 1);

// ── render ───────────────────────────────────────────────────────────────────────────────────
const short: Record<string, string> = { architecture: 'arch', 'call-chain': 'chain', locate: 'loc', pattern: 'patt', routing: 'rout', impact: 'imp' };
const L: string[] = [];
L.push(`# Retrieval funnel — unified report\n`);
L.push(`${new Date().toLocaleString('en-US')} | ${rows.length} testcases | joined from eval-1/2/3 sidecars (deterministic)\n`);
if (erroredIds.length) L.push(`> ⚠ ${erroredIds.length} infra failure(s) excluded from capability averages: ${erroredIds.join(', ')} (empty / 503).\n`);

// 1 — token efficiency (eval-1, orthogonal axis)
L.push(`## 1. Token efficiency — is the graph worth its tokens? (eval-1)\n`);
L.push(`| | no-MCP | naive @ same answer size | with MCP |`);
L.push(`|---|---:|---:|---:|`);
L.push(`| Avg coverage | ${pct(e1.avgCov0)} | ${pct(e1.avgCovN)} | ${pct(e1.avgCov2)} |`);
L.push(`| Avg tokens / question | ${Math.round(e1.avgTok0).toLocaleString()} | ~${Math.round(e1.avgTok2).toLocaleString()} | ${Math.round(e1.avgTok2).toLocaleString()} |`);
L.push('');

// 2 — the funnel (TRUE cumulative funnel: share of ALL core files still alive at each stage).
// SAME DENOMINATOR for every stage: sumCore over the same liveCore row-set. Pooled file counts, not
// averages-of-ratios, so 100% → X% → Y% is monotonic. A file passes through only two stages: the agent
// surfaces it (retrieval), then writes it (synthesis). R@10 / chain-order are DIAGNOSTICS that explain
// the retrieval leak — not sequential stages, so they sit below the funnel (mixing them in, on a
// different denominator, is exactly what made the old version jump back up and stop being a funnel).
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
L.push(`## 2. The funnel — one path, every stage ÷ the same ${sumCore} core files\n`);
L.push(`> Per-FILE pooled fractions (of all ${sumCore} core files, how many survive each stage) — NOT eval-2's per-testcase mean R@k. Absolute numbers differ: the funnel weights bigger-spine testcases more.\n`);
L.push('```');
L.push(`INDEX (floor)`);
L.push(row('  indexed & graph-reachable', 1));
L.push(`RETRIEVAL — how deep core ranks in one search query`);
L.push(row('  ranked in top-5', r5));
L.push(row('  ranked in top-10', r10));
L.push(row('  ranked in top-20', r20));
const gatherRate = r50 ? Math.min(1, fRetr / r50) : 0;   // of the single-query top-50 ceiling, how much the agent pulls in
L.push(row('  ranked in top-50 (ceiling)', r50, `<- ceiling; ${pct(1 - r50)} never rank (recall-miss)`));
L.push(`AGENT`);
L.push(row("  surfaced by agent's loop", fRetr, `<- gather ${pct(gatherRate)} of ceiling`));
L.push(row('  written into the answer', fWrit, `<- synth ${pct(synthRate)} of surfaced, drops ${totalDropped}`));
L.push('```');
L.push(`\n**Three stages, sized** (all ÷ ${sumCore}):`);
L.push(`- **never rank (recall-miss): ${pct(1 - r50)}** — ${cnt(1 - r50)} core files absent even from top-50.`);
L.push(`- **ranked-but-not-gathered: ${pct(Math.max(0, r50 - fRetr))}** — ${cnt(Math.max(0, r50 - fRetr))} files rank in top-50 but the agent never surfaces them.`);
L.push(`- **surfaced-but-not-written (synthesis): ${pct(Math.max(0, fRetr - fWrit))}** — ${totalDropped} files.\n`);
L.push(`> Index: file ${pct(g0file)} / sym ${pct(g0sym)} / graph ${pct(g0graph)}. Chain-order LCS ${pct(g15)} (${g15rows.length} ordered Qs) · diag ${[...diagDist].map(([d, c]) => `${d} ${c}`).join('/')}. Seen-log under-counts retrieval on \`*\` rows → ${pct(fRetr)} surfaced is a lower bound.\n`);

// 3 — detail table
L.push(`## 3. Detail — every testcase × every gate\n`);
L.push(`Diag: rm=recall-miss · rl=ranked-low · mx=mixed · ok. \`*\` on G2 = seen-log under-counts (agent wrote more than it logged). Bottleneck = binding gate (rules in §5).\n`);
L.push(`| # | id | type | G1 R@10·diag | G1.5 order | G2 gather | G3 synth | end cov | bottleneck |`);
L.push(`|---|---|---|---|---:|---:|---:|---:|---|`);
rows.forEach((r, i) => {
    const b = bottleneck(r);
    const diagAbbr: Record<string, string> = { 'recall-miss': 'rm', 'ranked-low': 'rl', 'mixed': 'mx', 'ok': 'ok', 'n/a': '—' };
    const g1c = r.errored ? '—' : `${pct(r.recallAt10)} ${diagAbbr[r.diagnosis] ?? r.diagnosis}`;
    const g15c = r.orderApplicable ? pct(r.orderScore) + (r.orderPass ? '' : '✗') : '—';
    const g2c = r.errored ? '—' : pct(r.retrievalRecall) + (undercounts(r) ? '*' : '');
    const g3c = r.errored ? '—' : pct(r.synthRecall);
    const endc = r.errored ? '—' : `${r.coreWritten}/${r.coreN} ${pct(r.coreCov)}`;
    L.push(`| ${i + 1} | ${r.id} | ${short[r.type] ?? r.type} | ${g1c} | ${g15c} | ${g2c} | ${g3c} | ${endc} | ${b.tag} |`);
});
L.push('');
// bottleneck distribution
const dist = new Map<string, number>();
for (const r of rows) dist.set(bottleneck(r).tag, (dist.get(bottleneck(r).tag) ?? 0) + 1);
L.push(`**Bottleneck distribution:** ${[...dist].sort((a, b) => b[1] - a[1]).map(([t, c]) => `${t} ${c}`).join(' · ')}.\n`);

// 4 — summary by type
L.push(`## 4. Summary — by question type\n`);
L.push(`| type | n | avg R@10 | end cov | bottlenecks |`);
L.push(`|---|---:|---:|---:|---|`);
const typeOrder = ['architecture', 'call-chain', 'locate', 'pattern', 'routing', 'impact'];
const types = [...new Set(rows.map(r => r.type))].sort((a, b) => (typeOrder.indexOf(a) + 1 || 99) - (typeOrder.indexOf(b) + 1 || 99));
for (const t of types) {
    const g = rows.filter(r => r.type === t);
    const gl = g.filter(r => !r.errored);
    const avgR = mean(g.map(r => r.recallAt10));
    const avgEnd = mean(gl.filter(r => r.coreN > 0).map(r => r.coreCov));
    const bd = new Map<string, number>();
    for (const r of g) bd.set(bottleneck(r).tag, (bd.get(bottleneck(r).tag) ?? 0) + 1);
    const bdStr = [...bd].sort((a, b) => b[1] - a[1]).map(([k, c]) => `${k}${c > 1 ? '×' + c : ''}`).join(', ');
    L.push(`| ${t} | ${g.length} | ${pct(avgR)} | ${pct(avgEnd)} | ${bdStr} |`);
}
L.push('');

// 5 — classifier rules (transparency)
L.push(`## 5. How the bottleneck is classified\n`);
L.push(`Front → back; the first leaking gate is the binding one:\n`);
L.push('```');
L.push(`ERR   answer empty / "ERROR …"  (infra, e.g. Gemini 503)`);
L.push(`OK    end core coverage ≥ 50%`);
L.push(`G1-*  R@10 < 30%   → recall (rm) / rank (rl) / mixed (mx) by eval-2 diagnosis`);
L.push(`G2    R@10 ok but retrieval-recall < 50%  (search could, agent didn't gather)`);
L.push(`G3    gathered but synthesis-recall < 70%  (surfaced, not written)`);
L.push('```');
L.push('');

fs.writeFileSync(OUT, L.join('\n'), 'utf-8');
console.error(`Wrote logs/report.md`);
console.log(`report: token +${e1.graphGain.toFixed(0)}pts | funnel (n=${sumCore}) indexed 100% → top50 ${pct(r50)} → surfaced ${pct(fRetr)} → written ${pct(fWrit)}${erroredIds.length ? ` | ${erroredIds.length} infra excluded` : ''}`);
