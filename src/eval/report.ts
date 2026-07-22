#!/usr/bin/env npx tsx
/**
 * report — per-question trace + gold check → logs/reports/report.md
 *
 * Two layers, both zero-API:
 *   1) trace (pure observation): scope / seed / walk / agent actual calls, read from logs/data/retrieval-trace/<id>.json.
 *   2) gold check (gold comparison, zero-API): trace × claude-truth.json × wiki-map.json —— per question,
 *      whether scope was picked correctly (did the answer file's page enter the entry scope) + how many answer files were recalled (did seed∪walk reach core).
 *   Not done this round: R@k top-K breakdown / chain-LCS, the citation true/false gate, the semantic section (judge, paid). —— Phase 2+.
 *
 * Invariant: do not import wiki-prose (prose stays out of the measurement gate); report.md is a human-read artifact, never fed to the agent; gold reads only claude-truth (local).
 * Run: npm run report   (first run `npm run trace` to produce retrieval-trace/)
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import Anthropic from '@anthropic-ai/sdk';

import { loadTestcasesWithTruth, TESTCASES_PATH, CLAUDE_TRUTH_PATH } from './utils/truth-io.js';
import { judgeAnswers, type Row } from './judge.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS = path.resolve(__dirname, '..', '..', 'logs');
const TRACE_DIR = path.join(LOGS, 'data', 'retrieval-trace');
const WIKI_MAP_PATH = path.resolve(__dirname, '..', '..', 'data', 'wiki-map.json');
const CAND_DIR = path.join(LOGS, 'answers-gemini-mcp-selfloop');
const VERDICTS_CACHE = path.join(LOGS, 'reports', 'verdicts-latest.json');
const OUT = path.join(LOGS, 'reports', 'report.md');

// ── retrieval-trace loader: per-question decision log written by `npm run trace` ──
function loadTraceFile(id: string): any | null {
    const p = path.join(TRACE_DIR, `${id}.json`);
    if (!fs.existsSync(p)) return null;
    try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return null; }
}

// stop reason → short label (corresponds to walk.ts's reason wording)
export function stopLabel(reason: string): string {
    if (reason.includes('marginal exhaustion')) return 'exhausted';
    if (reason.includes('relevance decay')) return 'decayed';
    if (reason.includes('budget')) return 'budget';
    if (reason.includes('node cap')) return 'node-cap';
    if (reason.includes('no more')) return 'no-more';
    return 'stop';
}

const base = (p: string): string => (p || '').split('/').pop() || p;
// Short path: the last two segments, to distinguish same-named files (functions/sendMessage.ts vs methods/sendMessage.ts).
const shortPath = (p: string): string => (p || '').split('/').slice(-2).join('/') || p;

// Loose path equality: gold core, wiki-map keys, and trace files are all repo-relative paths, so allow suffix containment.
export function pathEq(a: string, b: string): boolean {
    const x = (a || '').replace(/\\/g, '/'), y = (b || '').replace(/\\/g, '/');
    return x === y || x.endsWith('/' + y) || y.endsWith('/' + x);
}

// gold check (zero-API gold comparison): trace × claude-truth core × wiki-map.
//   entryHit  = did the answer file's page enter the entry scope (pageStep.chosen); if core belongs to no page → null (—, ceiling).
//   reachGoldN = how many core answer files were hit across seed's own files ∪ each walk round's newFiles.
export function computeGold(
    tr: any,
    core: string[],
    wikiMap: any,
): { entryHit: boolean | null; reachGoldN: number; coreN: number } {
    const trPages: string[] = tr?.pageStep?.chosen ?? [];

    // pageStep.chosen uses page names (page.page/title); file_to_pages values are page ids —— normalize id to page name before comparing, otherwise it never hits.
    const idToName = new Map<string, string>();
    if (wikiMap) for (const p of (wikiMap.pages ?? [])) idToName.set(p.id, p.page ?? p.title ?? p.id);

    const goldPages = new Set<string>();
    if (wikiMap) for (const c of core) {
        for (const [wk, ids] of Object.entries((wikiMap.file_to_pages ?? {}) as Record<string, string[]>)) {
            if (pathEq(wk, c)) for (const id of ids) goldPages.add(idToName.get(id) ?? id);
        }
    }
    const entryHit = goldPages.size > 0 ? trPages.some(p => goldPages.has(p)) : null;

    const seedFiles = new Set<string>();
    for (const s of (tr?.seedStep ?? [])) {
        const opt = (s.options ?? []).find((o: any) => o.symbol === s.chosen);
        if (opt?.file) seedFiles.add(opt.file);
    }
    const reached = new Set<string>(seedFiles);
    for (const w of (tr?.walk ?? [])) for (const f of (w.result?.newFiles ?? [])) reached.add(f);
    const reachGoldN = core.filter(c => [...reached].some(f => pathEq(f, c))).length;

    return { entryHit, reachGoldN, coreN: core.length };
}

// Files reached in a single walk round + the core (answer files) hit —— push the gold check down to each walk step.
export function roundCoreHits(w: any, core: string[]): { reached: number; coreHits: string[] } {
    const nf: string[] = w?.result?.newFiles ?? [];
    const coreHits = core.filter(c => nf.some(f => pathEq(f, c)));
    return { reached: nf.length, coreHits };
}

// At which step core is first hit: hit at seed (step 0) = routing + seed both right; step R = seed fell short, dredged up by walk; null = never hit.
export function firstCoreStep(tr: any, core: string[]): { seedHit: boolean; firstStep: number | null } {
    const seedFiles = new Set<string>();
    for (const s of (tr?.seedStep ?? [])) {
        const opt = (s.options ?? []).find((o: any) => o.symbol === s.chosen);
        if (opt?.file) seedFiles.add(opt.file);
    }
    if (core.some(c => [...seedFiles].some(f => pathEq(f, c)))) return { seedHit: true, firstStep: 0 };
    let step = 0;
    for (const w of (tr?.walk ?? [])) {
        if (w.chosen == null) continue;
        step++;
        const nf: string[] = w.result?.newFiles ?? [];
        if (core.some(c => nf.some(f => pathEq(f, c)))) return { seedHit: false, firstStep: step };
    }
    return { seedHit: false, firstStep: null };
}

// Semantic section rendering (Phase 2): a judge Row → one line. Missing → not run. Pure function, zero-API testable.
export function semanticLabel(row?: { verdict?: string; mode?: string; reason?: string }): string {
    if (!row?.verdict) return `**Semantic**: not run`;
    const icon = row.verdict === 'PASS' ? '✓' : row.verdict === 'PARTIAL' ? '◐' : '✗';
    const tail = [row.mode, row.reason].filter(Boolean).join(' — ');
    return `**Semantic**: ${icon} ${row.verdict}${tail ? ` — ${tail}` : ''}`;
}

// agent actual calls: directly render the agentCalls.sequence already captured in the trace (structured, no gold).
export function fmtAgentCalls(ac: any): { calls: number; sequence: string; hitBudget: boolean } {
    const seq: any[] = Array.isArray(ac?.sequence) ? ac.sequence : [];
    const parse = (s: string) => { try { return JSON.parse(s); } catch { return {}; } };
    const lines = seq.map((c: any) => {
        const a = parse(c.args ?? '{}');
        switch (c.tool) {
            case 'plan': return `plan:${a.intent ?? '?'}`;
            case 'search': return `search:"${a.query ?? ''}"${a.layer ? '·' + a.layer : ''}`;
            case 'graph': {
                const mv = ({ expand: '', down: '↓', up: '↑' } as Record<string, string>)[a.move] ?? (a.move ?? '');
                return `graph${mv}:${a.query || base(a.file || '') || '?'}`;
            }
            case 'details': return `details:${base(a.filename || a.file || '')}`;
            default: return String(c.tool ?? '?');
        }
    });
    const out: { b: string; n: number }[] = [];   // collapse ADJACENT identical entries
    for (const ln of lines) { const last = out[out.length - 1]; if (last && last.b === ln) last.n++; else out.push({ b: ln, n: 1 }); }
    const sequence = out.map(s => s.n > 1 ? `${s.b} ×${s.n}` : s.b).join('  →  ') || '(nothing)';
    return { calls: ac?.totalCalls ?? seq.length, sequence, hitBudget: !!ac?.hitBudget };
}

// Drift guard: a trace was run against some wiki-map; if pageStep.chosen page names largely fail to match
// the current wiki-map, the trace is stale (run against an old wiki-map), which distorts the gold check —— warn to re-run trace.
export function traceDrift(
    traces: Array<{ pageStep?: { chosen?: string[] } } | null>,
    wikiMap: any,
): { total: number; matched: number; stale: boolean } {
    const names = new Set<string>((wikiMap?.pages ?? []).map((p: any) => p.page ?? p.title));
    let total = 0, matched = 0;
    for (const tr of traces) for (const p of (tr?.pageStep?.chosen ?? [])) { total++; if (names.has(p)) matched++; }
    return { total, matched, stale: total > 0 && matched / total < 0.5 };
}

// ── section renderers (one block per question: scope / seed / walk / agent, each returns several lines) ──────
// scope: chosen pages + each one's score (score taken from pageStep.options; no longer lists the duplicated reason string separately).
export function renderScope(tr: any): string[] {
    const opts: any[] = tr.pageStep?.options ?? [];
    const chosen: string[] = tr.pageStep?.chosen ?? [];
    if (!chosen.length) return [`**scope entry pages** (${opts.length} scored → 0 chosen): (fell back to symbol search)`];
    const scoreOf = new Map<string, number>(opts.map((o: any) => [o.page, o.score]));
    return [
        `**scope entry pages** (${opts.length} scored → ${chosen.length} chosen)`,
        ...chosen.map(p => `- ${p}${scoreOf.has(p) ? ` \`${scoreOf.get(p)}\`` : ''}`),
    ];
}

export function renderSeed(tr: any): string[] {
    const seedSteps: any[] = tr.seedStep ?? [];
    if (!seedSteps.length) return [];
    const out = [`**per-page seeds**:`];
    for (const s of seedSteps) {
        const optN = (s.options ?? []).length;
        out.push(`- \`${s.page}\`: ${s.chosen ? `→ \`${s.chosen}\`` : '(none)'} · ${optN} candidates${s.reason ? ` — ${s.reason}` : ''}`);
    }
    return out;
}

// walk: grouped by seed — one block per seed (name · steps · stop reason), rounds nested under it.
// The top line has only seed/steps (no longer piling up the duplicated "stop X/X/X"); each seed's STOP is folded into that group's header.
export function renderWalk(tr: any, core: string[]): string[] {
    const walk: any[] = tr.walk ?? [];
    const seedsN = new Set(walk.map(w => w.anchor)).size;
    const moves = walk.filter(w => w.chosen != null).length;
    const out = [`**walk** (${seedsN} seeds · ${moves} steps)`];

    // Group consecutive rounds with the same anchor (walk is already ordered by seed)
    const groups: { anchor: string; rounds: any[] }[] = [];
    for (const w of walk) {
        const last = groups[groups.length - 1];
        if (last && last.anchor === w.anchor) last.rounds.push(w);
        else groups.push({ anchor: w.anchor, rounds: [w] });
    }

    // Nested bullets: seed one level, rounds another (R + reached + hits folded into one line; show core⭐ only on a real hit)
    for (const g of groups) {
        const moveRounds = g.rounds.filter(w => w.chosen != null);
        const stopRound = g.rounds.find(w => w.chosen == null);
        const stopTxt = stopRound ? ` · ⏹ ${stopLabel(stopRound.reason ?? '')}` : '';
        out.push(`- **${base(g.anchor)}** · ${moveRounds.length} steps${stopTxt}`);
        for (const w of moveRounds) {
            // R line: move + affinity detail
            out.push(`    - R${w.round} → \`${w.chosen}\`${w.reason ? ` · ${w.reason}` : ''}`);
            // ↳ sub-item: reached + core hits (including 0, keeping the previous level of detail); core files carry a short path to distinguish same-named ones
            const { reached, coreHits } = roundCoreHits(w, core);
            if (reached > 0) {
                const hit = coreHits.length
                    ? ` · **core hit ${coreHits.length}⭐**: ${coreHits.map(c => '`' + shortPath(c) + '`').join(' ')}`
                    : ' · core hit 0';
                out.push(`        - ↳ reached ${reached} files${hit}`);
            }
        }
    }
    return out;
}

export function renderAgent(tr: any): string {
    const a = fmtAgentCalls(tr.agentCalls);
    return `**agent calls**: ${a.calls} calls${a.hitBudget ? ' ⛔budget full' : ''} — ${a.sequence}`;
}

async function main() {
    const { flat: testcases } = loadTestcasesWithTruth(TESTCASES_PATH, CLAUDE_TRUTH_PATH);
    const wikiMap: any = fs.existsSync(WIKI_MAP_PATH) ? JSON.parse(fs.readFileSync(WIKI_MAP_PATH, 'utf-8')) : null;

    // pass 1: load trace + compute gold verdict per question
    const items = testcases.map((tc: any) => {
        const tr = loadTraceFile(tc.id);
        const core: string[] = ((tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? []) as string[];
        return { tc, tr, core, gold: tr ? computeGold(tr, core, wikiMap) : null, fcs: tr ? firstCoreStep(tr, core) : null };
    });

    // aggregate (gold-check summary)
    const traced = items.filter(x => x.tr).length;
    const withGold = items.filter(x => x.gold && x.gold.entryHit !== null);
    const scopeHit = withGold.filter(x => x.gold!.entryHit).length;
    const recallRows = items.filter(x => x.gold && x.gold.coreN > 0);
    const meanRecall = recallRows.length ? recallRows.reduce((s, x) => s + x.gold!.reachGoldN / x.gold!.coreN, 0) / recallRows.length : 0;
    const zeroRecall = recallRows.filter(x => x.gold!.reachGoldN === 0).length;
    const seedHitN = items.filter(x => x.fcs?.seedHit).length;
    const lateN = items.filter(x => x.fcs && !x.fcs.seedHit && x.fcs.firstStep != null).length;
    const missN = items.filter(x => x.fcs && x.fcs.firstStep == null && x.gold && x.gold.coreN > 0).length;

    const drift = traceDrift(items.map(x => x.tr), wikiMap);

    // Semantic section (Phase 2): --semantic actually runs the paid judge (agent answers vs claude gold); otherwise read the cache (zero-API, marked stale).
    const wantSemantic = process.argv.includes('--semantic');
    let semRows: Row[] = [];
    let semCached = false;
    if (wantSemantic) {
        const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
        if (!apiKey) { console.error('[report] --semantic needs ANTHROPIC_API_KEY'); process.exit(1); }
        console.error('[report] --semantic: running paid judge (agent answers vs claude gold)…');
        semRows = await judgeAnswers(new Anthropic({ apiKey }), testcases.map((tc: any) => ({ id: tc.id, question: tc.question ?? '' })), CAND_DIR, '## Gemini Answer');
        fs.writeFileSync(VERDICTS_CACHE, JSON.stringify(semRows, null, 2), 'utf-8');
    } else if (fs.existsSync(VERDICTS_CACHE)) {
        try { semRows = JSON.parse(fs.readFileSync(VERDICTS_CACHE, 'utf-8')); semCached = true; } catch { /* empty/corrupt cache → treat as not run */ }
    }
    const semMap = new Map(semRows.map(r => [r.id, r]));
    const semN: Record<string, number> = { PASS: 0, PARTIAL: 0, FAIL: 0 };
    for (const r of semRows) if (r.verdict in semN) semN[r.verdict]++;

    const L: string[] = [];
    L.push(`# report — per-question trace + gold check\n`);
    L.push(`${new Date().toLocaleString('en-US')} | ${testcases.length} testcases | deterministic (retrieval-trace × claude-truth × wiki-map)\n`);
    if (drift.stale) {
        L.push(`> ⚠️ **trace looks stale**: only ${drift.matched}/${drift.total} of pageStep.chosen match current wiki-map page names — the gold check below is likely off; re-run \`npm run trace\` first.\n`);
        console.error(`[report] ⚠️ trace drift: ${drift.matched}/${drift.total} page names match current wiki-map — consider re-running npm run trace`);
    }
    L.push(`## Gold-check summary (zero-API)`);
    L.push(`- **scope correct**: ${scopeHit}/${withGold.length} (the answer file's page entered the entry scope; another ${traced - withGold.length} have answer files on no wiki page, marked —)`);
    L.push(`- **recall**: found **${(meanRecall * 100).toFixed(0)}%** of answer files on average · none-found ${zeroRecall}/${recallRows.length}`);
    L.push(`- **seed hits core**: seed-hit **${seedHitN}** · walk-caught ${lateN} · never ${missN} — seed-hit = routing + seed both right; walk-caught = dredged up by the walk (scope/seed fell short)`);
    if (semRows.length) L.push(`- **Semantic** (agent answers vs claude gold${semCached ? ', cached verdicts-latest.json' : ', this --semantic run, paid'}): PASS ${semN.PASS} / PARTIAL ${semN.PARTIAL} / FAIL ${semN.FAIL}`);
    else L.push(`- **Semantic**: not run — \`npm run report -- --semantic\` enables it (paid; agent answers vs claude gold)`);
    L.push(`> "answer file" = the core of claude-truth.json (Claude's gold key files). The trace carries no gold itself; this section is the report-side trace × gold check, zero-API.\n`);

    // pass 2: per question — gold check + trace (scope/seed/walk/agent actual calls)
    for (const { tc, tr, core, gold, fcs } of items) {
        L.push(`## ${tc.id} — ${tc.question ?? ''}  _[${tc.questionType ?? '?'}]_`, '');
        if (!tr) { L.push(`> no trace (run \`npm run trace\` first).`, ''); continue; }

        // ── gold check ──
        const sc = gold!.entryHit === null ? '—(answer file on no wiki page)' : gold!.entryHit ? '✓ correct' : '✗ wrong';
        const fcsLabel = !gold!.coreN ? ''
            : fcs!.seedHit ? ' · **seed hits core⭐**'
            : fcs!.firstStep != null ? ` · first core hit at step ${fcs!.firstStep} (seed fell short, walk caught it)`
            : ' · ✗ core never hit';
        L.push(`**Gold check**: scope ${sc} · recall ${gold!.reachGoldN}/${gold!.coreN} answer files${fcsLabel}`, '');
        if (semMap.size) L.push(semanticLabel(semMap.get(tc.id)), '');

        // ── scope / seed / walk / agent —— blank line between sections (rendered as separate blocks) ──
        L.push(...renderScope(tr), '');
        L.push(...renderSeed(tr), '');
        L.push(...renderWalk(tr, core), '');
        L.push(renderAgent(tr), '');
    }

    fs.mkdirSync(path.join(LOGS, 'reports'), { recursive: true });
    fs.writeFileSync(OUT, L.join('\n'), 'utf-8');
    console.error(`Wrote logs/reports/report.md`);
    console.log(`report: ${traced}/${testcases.length} traced · scope ${scopeHit}/${withGold.length} · mean recall ${(meanRecall * 100).toFixed(0)}% → logs/reports/report.md`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
