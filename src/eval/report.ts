#!/usr/bin/env npx tsx
/**
 * report — trace 报告 → logs/reports/metrics.md。Deterministic, NO semantic info.
 *   1. Trace       — 确定性游走器逐题决策概览（聚合自 logs/data/retrieval-trace/，金页/触金两列由报告端 × claude-truth 算）
 *   2. Agent 调用   — 真 agent 每题的实际工具调用序列（解析自 answers md 的 ## Tool Calls）
 * Semantic analysis lives SEPARATELY in logs/reports/verdicts.md. This file never reads it.
 * Inputs: logs/data/retrieval-trace/ (eval:retrieval) · logs/answers-gemini-mcp-selfloop/ · data/wiki-map.json。
 * （funnel/auto-triage/probe-rank 各节按用户要求退役 2026-07-08 — 只留 trace；report 不再读 tools-data.json。）
 * Run: npm run report   (after eval:retrieval / gen:mcp)
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { loadTestcasesWithTruth, TESTCASES_PATH, CLAUDE_TRUTH_PATH } from './utils/truth-io.js';
import { classifyIntent, INTENTS, RECIPES } from '../server/intent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS = path.resolve(__dirname, '..', '..', 'logs');
const D_MCP = path.join(LOGS, 'answers-gemini-mcp-selfloop');
const TRACE_DIR = path.join(LOGS, 'data', 'retrieval-trace');
const WIKI_MAP_PATH = path.resolve(__dirname, '..', '..', 'data', 'wiki-map.json');
const OUT = path.join(LOGS, 'reports', 'metrics.md');

// 路径宽松相等：真值 core 与 wiki-map 键/trace 文件都是仓库相对路径，允许后缀包含
const pathEq = (a: string, b: string): boolean => {
    const x = a.replace(/\\/g, '/'), y = b.replace(/\\/g, '/');
    return x === y || x.endsWith('/' + y) || y.endsWith('/' + x);
};

// ── retrieval-trace loader: per-question decision log written by eval:retrieval ──
function loadTraceFile(id: string): any | null {
    const p = path.join(TRACE_DIR, `${id}.json`);
    if (!fs.existsSync(p)) return null;
    try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return null; }
}
// stop reason → 短标签（与 walk.ts 的 reason 文案对应）
function stopLabel(reason: string): string {
    if (reason.includes('边际枯竭')) return '枯竭';
    if (reason.includes('相关性衰减')) return '衰减';
    if (reason.includes('预算')) return '预算';
    if (reason.includes('节点阀')) return '节点';
    if (reason.includes('无可继续')) return '无继续';
    return 'stop';
}

// Resolve the plan intent recorded in the answer md (## Plan line → truncated args → offline classifier).
function resolveIntent(mcpFile: string, question: string): string | null {
    let txt = ''; try { txt = fs.readFileSync(mcpFile, 'utf-8'); } catch { /* */ }
    const planLine = txt.match(/##\s*Plan[\s\S]*?intent:\s*([\w-]+)/i);
    if (planLine && (INTENTS as string[]).includes(planLine[1])) return planLine[1];
    const prefix = txt.match(/"intent"\s*:\s*"([a-z-]+)/i);
    if (prefix && prefix[1]) { const hit = (INTENTS as string[]).find(i => i.startsWith(prefix[1])); if (hit) return hit; }
    return classifyIntent(question);
}

// Parse the saved answer's "## Tool Calls" trace into a HUMAN-READABLE summary: one line per call,
// in order — plan's intent, search's query(·layer), graph's target + move (↓ down / ↑ up / expand),
// details' file. Adjacent identical lines collapse ×N. Clipped file args are un-truncated via the
// answer's "## Files Seen In Tool Results" list.
function parseTrace(mcpFile: string, resolvedIntent: string | null): { calls: number; summary: string; hitBudget: boolean } {
    let txt = ''; try { txt = fs.readFileSync(mcpFile, 'utf-8'); } catch { /* */ }
    const header = txt.match(/## Tool Calls \((\d+) calls/);
    const calls = header ? +header[1] : 0;
    const seen = [...txt.matchAll(/^- `([^`]+)`/gm)].map(m => m[1]);   // full relative paths (seen-log)
    const planIntent = resolvedIntent ?? '';
    const recipeMove = (RECIPES as Record<string, { move: string }>)[planIntent]?.move ?? 'expand';
    const arg = (raw: string, re: RegExp) => { const m = raw.match(re); return m ? m[1] : ''; };
    const relOf = (p: string) => { const m = p.match(/(?:^|\/)((?:apps|packages|ee)\/.+)$/); return m ? m[1] : (p.split('/').pop() || p); };
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
    return { calls, summary: ordered, hitBudget };
}

async function main() {
    const wikiMap: any = fs.existsSync(WIKI_MAP_PATH) ? JSON.parse(fs.readFileSync(WIKI_MAP_PATH, 'utf-8')) : null;
    const { flat: testcases } = loadTestcasesWithTruth(TESTCASES_PATH, CLAUDE_TRUTH_PATH);

    const rows: any[] = [];
    for (const tc of testcases) {
        const mcpFile = path.join(D_MCP, `${tc.id}.md`);
        const core = (tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? [];

        // trace（eval:retrieval 的决策日志）— trace 本体无金指标；金指标在这里(报告端)算
        const tr = loadTraceFile(tc.id);
        const trPages: string[] = tr?.pageStep?.chosen ?? [];
        const trFallback = tr ? (trPages.length === 0 || (tr.seedStep ?? []).some((s: any) => s.page === '(fallback)')) : false;
        const trWalk: any[] = tr?.walk ?? [];
        const trMoves = trWalk.filter(w => w.chosen != null).length;
        const trStops = trWalk.filter(w => w.chosen == null).map(w => stopLabel(w.reason ?? ''));
        const trSeeds = new Set(trWalk.map(w => w.anchor)).size;
        // 金指标①入口页命中（金文件不在入口图 → '—' 天花板）②邻域触金
        const goldPages = new Set<string>();
        if (wikiMap) for (const c of core) {
            for (const [wk, pages] of Object.entries(wikiMap.file_to_pages as Record<string, string[]>)) {
                if (pathEq(wk, c)) for (const p of pages) goldPages.add(p);
            }
        }
        const entryHit = goldPages.size > 0 ? trPages.some(p => goldPages.has(p)) : null;
        const reachedFiles = new Set<string>();
        for (const w of trWalk) for (const f of (w.result?.newFiles ?? [])) reachedFiles.add(f);
        for (const s of (tr?.seedStep ?? [])) {
            const opt = (s.options ?? []).find((o: any) => o.symbol === s.chosen);
            if (opt?.file) reachedFiles.add(opt.file);
        }
        const reachGoldN = core.filter((c: string) => [...reachedFiles].some(f => pathEq(f, c))).length;

        const resolved = resolveIntent(mcpFile, tc.question ?? '');
        rows.push({
            id: tc.id, type: tc.questionType ?? '?', coreN: core.length,
            trHas: !!tr, trPages, trFallback, trMoves, trStops, trSeeds,
            goldPagesN: goldPages.size, entryHit, reachGoldN,
            agent: parseTrace(mcpFile, resolved),
        });
    }

    const n = rows.length;
    const mean = (xs: number[]) => xs.length ? xs.reduce((s, v) => s + v, 0) / xs.length : 0;
    const pct = (x: number) => `${(x * 100).toFixed(0)}%`;
    const short: Record<string, string> = { architecture: 'arch', 'call-chain': 'chain', locate: 'loc', pattern: 'patt', routing: 'rout', impact: 'imp' };

    const L: string[] = [];
    L.push(`# metrics — trace 报告（游走器决策 + agent 实际调用；无语义判定，语义在 verdicts.md）\n`);
    L.push(`${new Date().toLocaleString('en-US')} | ${n} testcases | deterministic (retrieval-trace + answers + wiki-map + claude-truth)\n`);

    // 1 — 游走器决策概览
    const trRows = rows.filter(r => r.trHas);
    L.push(`## 1. Trace — 确定性游走器逐题决策概览\n`);
    if (trRows.length === 0) {
        L.push(`> 无 trace 数据 — 先跑 \`npm run eval:retrieval\`（产物在 logs/data/retrieval-trace/）。\n`);
    } else {
        const fbCount = trRows.filter(r => r.trFallback).length;
        const stopDist = new Map<string, number>();
        for (const r of trRows) for (const s of r.trStops) stopDist.set(s, (stopDist.get(s) ?? 0) + 1);
        const pageFreq = new Map<string, number>();
        for (const r of trRows) for (const p of r.trPages) pageFreq.set(p, (pageFreq.get(p) ?? 0) + 1);
        const topPages = [...pageFreq].sort((a, b) => b[1] - a[1]).slice(0, 6);
        const withGold = trRows.filter(r => r.entryHit !== null);
        const entryHits = withGold.filter(r => r.entryHit).length;
        const reachRows = trRows.filter(r => r.coreN > 0);
        const reachVals = reachRows.map(r => r.reachGoldN / r.coreN);
        const reachZero = reachVals.filter(v => v === 0).length;
        L.push(`> ${trRows.length}/${n} 题有 trace（\`logs/data/retrieval-trace/<id>.json\` 是全量决策日志：每步 options/chosen/reason/result；trace 本体无金指标，**金页/触金两列是报告端从 trace × claude-truth 算的**）。\n`);
        L.push(`**入口**：fallback ${fbCount}/${trRows.length}（入口图无命中→lexicalSeeds）· 页槽占用 top：${topPages.map(([p, c]) => `${p}×${c}`).join(' · ')}`);
        L.push(`**游走**：平均 ${mean(trRows.map(r => r.trMoves)).toFixed(1)} 步/题 · stop 分布：${[...stopDist].sort((a, b) => b[1] - a[1]).map(([s, c]) => `${s} ${c}`).join(' · ')}`);
        L.push(`**金指标**：入口页命中 **${entryHits}/${withGold.length}**（分母=金文件所在页存在于入口图的题；另 ${trRows.length - withGold.length} 题金页不存在=天花板，记 —）· 邻域触金召回 均值 **${pct(mean(reachVals))}**（游走到达文件∩core÷core）· 触金=0 的题 ${reachZero}/${reachRows.length}\n`);
        L.push(`| # | id | 入口页 (top-3) | 金页 | 触金 | seeds | 步数 | stops |`);
        L.push(`|---|---|---|:-:|---:|---:|---:|---|`);
        trRows.forEach((r, i) => {
            const pages = r.trFallback ? '(fallback)' : r.trPages.join('<br>');
            const gold = r.entryHit === null ? '—' : r.entryHit ? '✓' : '✗';
            L.push(`| ${i + 1} | ${r.id} | ${pages} | ${gold} | ${r.reachGoldN}/${r.coreN} | ${r.trSeeds} | ${r.trMoves} | ${r.trStops.join('/')} |`);
        });
        L.push('');
    }

    // 2 — agent 实际调用
    L.push(`## 2. Agent 实际调用 — 每题的真实工具调用序列\n`);
    L.push(`> 解析自 \`logs/answers-gemini-mcp-selfloop/<id>.md\` 的 ## Tool Calls 段。\`plan:\` intent · \`search:\` query(·layer) · \`graph:\`/\`graph↓\`(down)/\`graph↑\`(up) target · \`details:\` file · \`wiki\`。⛔ = 用满 8 次调用预算。\n`);
    L.push(`| # | id | type | calls | trace (agent 实际调用) |`);
    L.push(`|---|---|---|---:|---|`);
    rows.forEach((r, i) => {
        L.push(`| ${i + 1} | ${r.id} | ${short[r.type] ?? r.type} | ${r.agent.calls}${r.agent.hitBudget ? ' ⛔' : ''} | ${r.agent.summary} |`);
    });
    L.push('');

    fs.mkdirSync(path.join(LOGS, 'reports'), { recursive: true });
    fs.writeFileSync(OUT, L.join('\n'), 'utf-8');
    console.error(`Wrote logs/reports/metrics.md`);
    const trN = rows.filter(r => r.trHas).length;
    const budget = rows.filter(r => r.agent.hitBudget).length;
    console.log(`metrics: trace ${trN}/${n} | agent avg ${mean(rows.map(r => r.agent.calls)).toFixed(1)} calls/题, 用满预算 ${budget}/${n}`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(2); });
