#!/usr/bin/env npx tsx
/**
 * report — the QUANTITATIVE report → logs/reports/metrics.md. Deterministic, NO semantic info.
 *   1. Value       — coverage no-MCP / naive / MCP + lift + token cost (naive control folded in from the old token eval)
 *   2. Funnel      — index → agent-surfaced → written (pooled per core file) + single-query R@k / reachability / chain-order probes
 *   3. Auto-triage — per-testcase mechanical "suspected stage" (route→search→graph→synth), NO verdicts / reason / mode
 * Semantic analysis lives SEPARATELY in logs/reports/verdicts.md (hand-judged). This file never reads it.
 * Inputs: logs/data/tools-data.json (eval:tools) · logs/answers-gemini-{mcp-selfloop,nomcp}/ · the code index (naive control).
 * Run: npm run report   (after gen:mcp / gen:nomcp / eval:tools)
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ensureIndex } from '../indexer/index.js';
import { handleToolCall } from '../server/registry.js';
import { loadTestcasesWithTruth, TESTCASES_PATH, CLAUDE_TRUTH_PATH } from './utils/truth-io.js';
import { coverage, extractCitedFiles, fileMatches, readSection, tokensOf } from './utils/eval-util.js';
import { classifyIntent, INTENTS, RECIPES } from '../server/intent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS = path.resolve(__dirname, '..', '..', 'logs');
const D_MCP = path.join(LOGS, 'answers-gemini-mcp-selfloop');
const D_NOMCP = path.join(LOGS, 'answers-gemini-nomcp');
const OUT = path.join(LOGS, 'reports', 'metrics.md');

// ── naive baseline: dumb keyword retrieval capped to MCP's answer length (folded in from token.ts) ──
// The control: if MCP beats naive at the SAME answer size, the lift comes from the AGENT choosing moves,
// not from spending more tokens. Deterministic (no LLM); needs the code index.
const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'how', 'what', 'where', 'does', 'do', 'in', 'on', 'of', 'to', 'and', 'from', 'for', 'with', 'rocket', 'chat', 'rocketchat', 'side', 'work', 'works', 'new', 'get', 'use', 'used', 'using']);
function queryTerms(question: string): string[] {
    const camel = question.match(/\b[a-z]+[A-Z][A-Za-z]+\b|\b[A-Z][a-z]+[A-Z][A-Za-z]+\b/g) ?? [];
    const words = (question.toLowerCase().match(/[a-z][a-z0-9]{3,}/g) ?? []).filter(w => !STOP.has(w));
    return Array.from(new Set([...camel, ...words.sort((a, b) => b.length - a.length)])).slice(0, 12);
}
async function naiveCoverage(question: string, answerChars: number, core: string[], syms: string[]): Promise<number> {
    const charBudget = Math.max(1, answerChars);
    const parts: string[] = [];
    let chars = 0;
    for (const q of queryTerms(question)) {
        if (chars >= charBudget) break;
        for (const call of [
            () => handleToolCall('search', { query: q }),
            () => handleToolCall('graph', { query: q, move: 'expand', depth: 2 }),
        ]) {
            if (chars >= charBudget) break;
            const res = await call();
            const txt = res?.content?.[0]?.text ?? '';
            if (!txt) continue;
            parts.push(txt);
            chars += txt.length;
        }
    }
    return coverage(parts.join('\n').slice(0, charBudget), core, syms);
}

// Resolve each testcase's plan intent for the routing triage (mechanical): ## Plan line → truncated
// plan({..."intent":"arc}) args prefix → offline classifier fallback.
function resolveIntent(mcpFile: string, question: string): string | null {
    let txt = ''; try { txt = fs.readFileSync(mcpFile, 'utf-8'); } catch { /* */ }
    const planLine = txt.match(/##\s*Plan[\s\S]*?intent:\s*([\w-]+)/i);
    if (planLine && (INTENTS as string[]).includes(planLine[1])) return planLine[1];
    const prefix = txt.match(/"intent"\s*:\s*"([a-z-]+)/i);
    if (prefix && prefix[1]) { const hit = (INTENTS as string[]).find(i => i.startsWith(prefix[1])); if (hit) return hit; }
    return classifyIntent(question);
}

// Parse the saved answer's "## Tool Calls" trace into a HUMAN-READABLE summary: one line per call,
// in order, showing WHAT each call did — plan's intent, search's query(·layer), graph's target + move
// (↓=down chain / ↑=up impact / default expand), details' file. Adjacent identical lines collapse ×N.
// Args are recorded truncated (~100 chars), so a graph/details file path is often clipped mid-basename;
// we UN-TRUNCATE it by prefix-matching the clipped path against the full paths in the same answer's
// "## Files Seen In Tool Results" list. Fields are regexed out (the JSON is truncated, can't parse).
function parseTrace(mcpFile: string, resolvedIntent: string | null): { calls: number; summary: string; hitBudget: boolean } {
    let txt = ''; try { txt = fs.readFileSync(mcpFile, 'utf-8'); } catch { /* */ }
    const header = txt.match(/## Tool Calls \((\d+) calls/);
    const calls = header ? +header[1] : 0;
    const seen = [...txt.matchAll(/^- `([^`]+)`/gm)].map(m => m[1]);   // full relative paths (seen-log)
    // Resolved intent (same value the route column uses: ## Plan line → plan() args prefix → offline
    // classifier). It also determines the default graph move (impact→up / call-chain→down / else expand)
    // that the tool applies when a graph call OMITS `move` — so a clipped/omitted move still shows right.
    const planIntent = resolvedIntent ?? '';
    const recipeMove = (RECIPES as Record<string, { move: string }>)[planIntent]?.move ?? 'expand';
    const arg = (raw: string, re: RegExp) => { const m = raw.match(re); return m ? m[1] : ''; };
    const relOf = (p: string) => { const m = p.match(/(?:^|\/)((?:apps|packages|ee)\/.+)$/); return m ? m[1] : (p.split('/').pop() || p); };
    // resolve a (possibly clipped, possibly absolute) file arg → full basename via the seen-log
    const resolveFile = (rawPath: string): string => {
        if (!rawPath) return '?';
        const rel = relOf(rawPath);
        const full = seen.find(s => s.startsWith(rel)) ?? seen.find(s => s.includes(rel)) ?? rel;
        return full.split('/').pop() || full;
    };
    const lines: string[] = [];
    for (const m of txt.matchAll(/\*\*Step \d+:\*\*\s*`(\w+)\((.*?)\)`/g)) {
        const tool = m[1], raw = m[2];
        if (tool === 'plan') lines.push(`plan: ${planIntent || arg(raw, /"intent"\s*:\s*"([^"]+)"/) || '?'}`);
        else if (tool === 'search') {
            const q = arg(raw, /"query"\s*:\s*"([^"]+)"/), layer = arg(raw, /"layer"\s*:\s*"([^"]+)"/);
            lines.push(`search: "${q}"${layer ? ' ·' + layer : ''}`);
        } else if (tool === 'graph') {
            const move = arg(raw, /"move"\s*:\s*"([^"]+)"/) || recipeMove;   // omitted move → intent's default
            const q = arg(raw, /"query"\s*:\s*"([^"]+)"/), f = arg(raw, /"file"\s*:\s*"([^"]*)"?/);
            const mv = ({ expand: '', down: '↓', up: '↑' } as Record<string, string>)[move] ?? move;
            lines.push(`graph${mv}: ${q || resolveFile(f)}`);
        } else if (tool === 'details') {
            lines.push(`details: ${resolveFile(arg(raw, /"filename"\s*:\s*"([^"]*)"?/))}`);
        } else lines.push(tool);
    }
    const seq: { base: string; n: number }[] = [];   // collapse ADJACENT identical lines
    for (const ln of lines) {
        const last = seq[seq.length - 1];
        if (last && last.base === ln) last.n++; else seq.push({ base: ln, n: 1 });
    }
    const ordered = seq.map(s => s.n > 1 ? `${s.base} ×${s.n}` : s.base).join('<br>') || '(nothing)';
    const hitBudget = calls >= 8;
    return { calls, summary: `${calls} calls${hitBudget ? ' ⛔' : ''}<br>${ordered}`, hitBudget };
}

function load(name: string): any {
    const p = path.join(LOGS, 'data', name);
    if (!fs.existsSync(p)) { console.error(`Missing ${name} — run \`npm run eval:tools\` first.`); process.exit(1); }
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

async function main() {
    await ensureIndex();   // for the naive control (handleToolCall)
    const tools: any[] = load('tools-data.json');
    const byTools = new Map(tools.map(r => [r.id, r]));
    const { flat: testcases } = loadTestcasesWithTruth(TESTCASES_PATH, CLAUDE_TRUTH_PATH);
    const SEEN_MARKER = '## Files Seen In Tool Results';

    const rows: any[] = [];
    for (const tc of testcases) {
        const mcpFile = path.join(D_MCP, `${tc.id}.md`);
        const nomcpFile = path.join(D_NOMCP, `${tc.id}.md`);
        const core = (tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? [];
        const syms = tc.keySymbols ?? [];
        const a2 = readSection(mcpFile, '## Gemini Answer', ['## Tool Calls']);
        const a0 = readSection(nomcpFile, '## Baseline Answer (no tools)', ['## Metrics']);
        const hasSeen = (() => { try { return fs.readFileSync(mcpFile, 'utf-8').includes(SEEN_MARKER); } catch { return false; } })();
        const seenText = hasSeen ? readSection(mcpFile, SEEN_MARKER, []) : '';
        const seenFiles = extractCitedFiles(seenText);

        const retrieved = core.filter((f: string) => seenFiles.some((s: string) => fileMatches(s, f)) || fileMatches(seenText, f));
        const written = core.filter((f: string) => fileMatches(a2, f));
        const retrievalRecall = core.length ? retrieved.length / core.length : 1;   // surfaced
        const synthRecall = retrieved.length ? retrieved.filter((f: string) => fileMatches(a2, f)).length / retrieved.length : 1;
        const dropped = retrieved.filter((f: string) => !fileMatches(a2, f)).length;
        const coreCov = core.length ? written.length / core.length : 0;
        const errored = !a2.trim() || /^ERROR\b/.test(a2.trim());

        const cov0 = coverage(a0, core, syms), cov2 = coverage(a2, core, syms);
        const covN = await naiveCoverage(tc.question, a2.length, core, syms);
        const tok0 = tokensOf(nomcpFile, /\| Tokens \| ([\d,]+) \|/);
        const tok2 = tokensOf(mcpFile, /## Tool Calls \(\d+ calls, ([\d,]+) tokens\)/);

        const a = byTools.get(tc.id) ?? {};
        const type = tc.questionType ?? a.subsystem ?? '?';
        const r50 = a.recallAt50 ?? a.recallAt20 ?? 0;
        const resolved = resolveIntent(mcpFile, tc.question ?? '');
        const routeOk = resolved === type;
        // Auto-triage: mechanical, front→back, first trip wins. NO semantic judgment.
        // route is DELIBERATELY not a gate: intent≠type is a labeling disagreement (~0 precision as a
        // failure cause — 0/12 semantic failures are misrouted), it only sets a default move the agent
        // can override. The route✓/✗ column stays as a fact; it just no longer drives the stage.
        const stage = errored ? 'err'
            : coreCov >= 0.5 ? 'ok'
                : r50 < 0.3 ? 'search'
                    : retrievalRecall < 0.5 ? 'graph'
                        : synthRecall < 0.7 ? 'synth' : 'ok';

        rows.push({
            id: tc.id, type,
            recallAt5: a.recallAt5 ?? 0, recallAt10: a.recallAt10 ?? 0, recallAt20: a.recallAt20 ?? 0, recallAt50: r50,
            coreRanks: a.coreRanks ?? null,
            diagnosis: a.diagnosis ?? 'n/a', orderApplicable: !!a.orderApplicable, orderScore: a.orderScore ?? 1,
            fileRecall: a.fileRecall ?? 0, symRecall: a.symRecall ?? 0, graphReach: a.graphReach ?? null,
            coreN: core.length, coreWritten: written.length, coreCov, retrievalRecall, synthRecall, dropped, errored,
            cov0, covN, cov2, tok0, tok2, routeOk, stage, trace: parseTrace(mcpFile, resolved),
        });
    }

    const n = rows.length;
    const mean = (xs: number[]) => xs.length ? xs.reduce((s, v) => s + v, 0) / xs.length : 0;
    const sum = (xs: number[]) => xs.reduce((s, v) => s + v, 0);
    const pct = (x: number) => `${(x * 100).toFixed(0)}%`;
    const live = rows.filter(r => !r.errored);
    const erroredIds = rows.filter(r => r.errored).map(r => r.id);

    const avgCov0 = mean(rows.map(r => r.cov0)), avgCovN = mean(rows.map(r => r.covN)), avgCov2 = mean(rows.map(r => r.cov2));
    const avgTok0 = mean(rows.map(r => r.tok0)), avgTok2 = mean(rows.map(r => r.tok2));

    const liveCore = live.filter(r => r.coreN > 0);
    const sumCore = sum(liveCore.map(r => r.coreN));
    const sumRetr = sum(liveCore.map(r => Math.min(r.coreN, Math.round(r.retrievalRecall * r.coreN))));
    const sumWrit = sum(liveCore.map(r => r.coreWritten));
    const fRetr = sumCore ? sumRetr / sumCore : 0, fWrit = sumCore ? sumWrit / sumCore : 0;
    const synthRate = sumRetr ? Math.min(1, sumWrit / sumRetr) : 0;
    const totalDropped = rows.reduce((s, r) => s + r.dropped, 0);
    const poolR = (get: (r: any) => number) => sumCore ? sum(liveCore.map(r => get(r) * r.coreN)) / sumCore : 0;
    const r5 = poolR(r => r.recallAt5), r10 = poolR(r => r.recallAt10), r20 = poolR(r => r.recallAt20), r50 = poolR(r => r.recallAt50);
    const cnt = (f: number) => Math.round(f * sumCore);
    const g0file = mean(rows.map(r => r.fileRecall)), g0sym = mean(rows.map(r => r.symRecall));
    const g15rows = rows.filter(r => r.orderApplicable);
    const g15 = mean(g15rows.map(r => r.orderScore));

    const short: Record<string, string> = { architecture: 'arch', 'call-chain': 'chain', locate: 'loc', pattern: 'patt', routing: 'rout', impact: 'imp' };
    const bar = (x: number) => '█'.repeat(Math.round(x * 30)).padEnd(30, '░');
    const rowbar = (label: string, f: number, tail = '') => `${label.padEnd(30)} ${pct(f).padStart(4)}  ${bar(f)} ${tail}`;
    const L: string[] = [];
    L.push(`# metrics — quantitative pipeline report (no semantic analysis)\n`);
    L.push(`${new Date().toLocaleString('en-US')} | ${n} testcases | deterministic (index + answers + tools-data), NO verdicts. Semantic analysis lives in logs/reports/verdicts.md.\n`);
    if (erroredIds.length) L.push(`> ⚠ ${erroredIds.length} infra failure(s) excluded from averages: ${erroredIds.join(', ')} (empty / 503).\n`);

    // 1 — value
    L.push(`## 1. Value — do the tools help?\n`);
    L.push(`| | no-MCP | naive @ same answer size | with MCP |`);
    L.push(`|---|---:|---:|---:|`);
    L.push(`| Avg coverage | ${pct(avgCov0)} | ${pct(avgCovN)} | ${pct(avgCov2)} |`);
    L.push(`| Avg tokens / question | ${Math.round(avgTok0).toLocaleString()} | ~${Math.round(avgTok2).toLocaleString()} | ${Math.round(avgTok2).toLocaleString()} |`);
    L.push('');
    L.push(`**The agent's navigation adds +${((avgCov2 - avgCov0) * 100).toFixed(0)} pts over pure LLM, +${((avgCov2 - avgCovN) * 100).toFixed(0)} over same-budget keyword dump** — the lift is choosing moves, not just spending tokens.\n`);

    // 2 — funnel
    L.push(`## 2. The agent funnel — of the same ${sumCore} core files, how many the agent surfaces then writes\n`);
    L.push(`> Pooled per-file fractions from the ACTUAL multi-turn run (seen-log → written). R@k below is a single-query PROBE (tool ceiling), NOT a stage the agent flows through.\n`);
    L.push('```');
    L.push(rowbar('INDEX  indexed & reachable', 1));
    L.push(rowbar('AGENT  surfaced (seen-log)', fRetr, `<- ${pct(1 - fRetr)} never surfaced`));
    L.push(rowbar('AGENT  written (answer)', fWrit, `<- synth ${pct(synthRate)} of surfaced, drops ${totalDropped}`));
    L.push('```');
    L.push(`\n**Two agent stages** (÷ ${sumCore}): not-surfaced ${pct(1 - fRetr)} (${cnt(1 - fRetr)} files) · surfaced-but-not-written ${pct(Math.max(0, fRetr - fWrit))} (${totalDropped} files).`);
    L.push(`> Single-query probe (tool capability, NOT the agent path): R@5/10/20/50 = ${pct(r5)}/${pct(r10)}/${pct(r20)}/${pct(r50)}. Of "never surfaced": ~${pct(1 - r50)} never rank in top-50 (engine) vs ~${pct(Math.max(0, r50 - fRetr))} rank-but-skipped (agent loop).`);
    L.push(`> Floor: substring recall file ${pct(g0file)} / sym ${pct(g0sym)} · chain-order LCS ${pct(g15)} (${g15rows.length} ordered Qs). (graph-reachability dropped — it was tautological, see tools.ts.)\n`);

    // 3 — auto-triage
    L.push(`## 3. Auto-triage — mechanical "suspected stage" per testcase (no semantic judgment)\n`);
    L.push(`> Front→back, first trip wins, numbers only: search (R@50<30%) → graph (surfaced<50%) → synth (synth<70%); ok if end coverage ≥50%. Flags WHICH question + stage to inspect — the WHY is in verdicts.md. **route (intent≠type) is shown as a column but is NOT a gate** — it's a labeling disagreement with ~0 precision as a failure cause (0/12 semantic failures are misrouted), so it no longer drives the stage.\n`);
    const dist = new Map<string, number>();
    for (const r of rows) dist.set(r.stage, (dist.get(r.stage) ?? 0) + 1);
    L.push(`**Suspected-stage distribution:** ${[...dist].sort((a, b) => b[1] - a[1]).map(([t, c]) => `${t} ${c}`).join(' · ')}.\n`);
    L.push(`> Column key: **R@10·diag** = single-query probe recall@10 + diagnosis (rm=recall-miss / rl=ranked-low / mx=mixed / ok). **core ranks** = each core file's rank in that probe; \`#2 · 5 miss\` = one file ranks #2, the other five never appear at all (engine can't reach them by ranking). Full per-file breakdown in §4. **trace** = the agent's ACTUAL calls in order, one per line, showing what each did: \`plan:\` intent · \`search:\` query(·layer) · \`graph:\`/\`graph↓\`(down chain)/\`graph↑\`(up impact) target · \`details:\` file. **surfaced/synth** = the agent's actual run, not the probe.\n`);
    L.push(`| # | id | type | route | R@10·diag | core ranks | surfaced | synth | end cov | trace (agent 实际调用) | suspected stage |`);
    L.push(`|---|---|---|:-:|---|---|---:|---:|---:|---|---|`);
    const diagAbbr: Record<string, string> = { 'recall-miss': 'rm', 'ranked-low': 'rl', 'mixed': 'mx', 'ok': 'ok', 'n/a': '—' };
    const coreRankStr = (cr: { file: string; rank: number | null }[] | null): string => {
        if (!cr || !cr.length) return '—';
        const ranked = cr.filter(c => c.rank != null).map(c => c.rank as number).sort((a, b) => a - b);
        const missed = cr.length - ranked.length;
        const parts = ranked.map(r => `#${r}`);
        if (missed) parts.push(`${missed} miss`);
        return parts.join(' · ');
    };
    rows.forEach((r, i) => {
        const routec = r.routeOk == null ? '—' : r.routeOk ? '✓' : '✗';
        const rkc = `${pct(r.recallAt10)} ${diagAbbr[r.diagnosis] ?? r.diagnosis}`;
        const ranksc = coreRankStr(r.coreRanks);
        const surf = r.errored ? '—' : pct(r.retrievalRecall);
        const syn = r.errored ? '—' : pct(r.synthRecall);
        const endc = r.errored ? '—' : `${r.coreWritten}/${r.coreN} ${pct(r.coreCov)}`;
        L.push(`| ${i + 1} | ${r.id} | ${short[r.type] ?? r.type} | ${routec} | ${rkc} | ${ranksc} | ${surf} | ${syn} | ${endc} | ${r.trace.summary} | ${r.stage} |`);
    });
    L.push('');

    // 4 — per-core-file probe rank (every core file listed, MISS marked). §3's core@probe expanded.
    L.push(`## 4. Per-core-file probe rank — every core file, its rank or MISS\n`);
    L.push(`> §3's \`core@probe\` expanded: the single-query graph(expand) rank of EACH core file, best-rank first. \`MISS\` = never appears in the ranked neighborhood at all (engine can't reach it by ranking). A deep rank (#100+) is effectively unreachable — the agent won't page that far.\n`);
    rows.forEach(r => {
        const cr: { file: string; rank: number | null }[] = r.coreRanks ?? [];
        const ranked = cr.filter(c => c.rank != null).length;
        L.push(`**${r.id}** · ${short[r.type] ?? r.type} · ${ranked}/${cr.length} ranked · surfaced ${r.errored ? '—' : pct(r.retrievalRecall)}`);
        [...cr].sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity))
            .forEach(c => L.push(`- \`${c.rank == null ? 'MISS' : '#' + c.rank}\` ${c.file}`));
        L.push('');
    });

    fs.mkdirSync(path.join(LOGS, 'reports'), { recursive: true });
    fs.writeFileSync(OUT, L.join('\n'), 'utf-8');
    console.error(`Wrote logs/reports/metrics.md`);
    console.log(`metrics: coverage no-MCP ${pct(avgCov0)} / naive ${pct(avgCovN)} / MCP ${pct(avgCov2)} | funnel surfaced ${pct(fRetr)} → written ${pct(fWrit)} | triage ${[...dist].sort((a, b) => b[1] - a[1]).map(([t, c]) => `${t}:${c}`).join(' ')}`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(2); });
