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

// 从答案 md 的 "## Files Seen In Tool Results" 段取 agent 实际在工具结果里见过的文件列表
function seenFilesOf(mcpFile: string): string[] {
    let txt = ''; try { txt = fs.readFileSync(mcpFile, 'utf-8'); } catch { return []; }
    const sec = txt.split('## Files Seen In Tool Results')[1] ?? '';
    return [...sec.matchAll(/^- `([^`]+)`/gm)].map(m => m[1]);
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
        // seed 自身文件（游走的第 0 步）与逐轮到达文件
        const seedFiles = new Set<string>();
        for (const s of (tr?.seedStep ?? [])) {
            const opt = (s.options ?? []).find((o: any) => o.symbol === s.chosen);
            if (opt?.file) seedFiles.add(opt.file);
        }
        const reachedFiles = new Set<string>(seedFiles);
        for (const w of trWalk) for (const f of (w.result?.newFiles ?? [])) reachedFiles.add(f);
        const walkerGold = core.filter((c: string) => [...reachedFiles].some(f => pathEq(f, c)));

        // ① 第几步第一次找到答案文件：seed 自身算第 0 步，之后按游走的先后顺序数"走了几步"
        let firstGoldStep: number | null = core.some((c: string) => [...seedFiles].some(f => pathEq(f, c))) ? 0 : null;
        // ② 按轮次统计每轮新找到的答案文件数（轮次 = 每个 seed 自己的第 1..8 轮）
        const goldByRound = new Map<number, number>();
        {
            const found = new Set<string>();
            for (const c of core) if ([...seedFiles].some(f => pathEq(f, c))) found.add(c);
            let stepNo = 0;
            for (const w of trWalk) {
                if (w.chosen == null) continue;
                stepNo++;
                for (const c of core) {
                    if (found.has(c)) continue;
                    if ((w.result?.newFiles ?? []).some((f: string) => pathEq(f, c))) {
                        found.add(c);
                        if (firstGoldStep === null) firstGoldStep = stepNo;
                        goldByRound.set(w.round, (goldByRound.get(w.round) ?? 0) + 1);
                    }
                }
            }
        }
        // ③ 停止评价：停的那一轮，三个方向的预览文件（各前 3 个）里是否还有没拿到的答案文件 → "停早了"
        //    （预览只有每方向 3 个样本，这是近似判断）；预算用尽且最后两步都没新答案文件 → "停晚了"
        let stopVerdict = '正常';
        {
            const stopRounds = trWalk.filter(w => w.chosen == null);
            const previewFiles = stopRounds.flatMap(w => ['expand', 'down', 'up'].flatMap(m => w.options?.[m]?.topFiles ?? []));
            const missed = core.filter((c: string) => !walkerGold.includes(c) && previewFiles.some(f => pathEq(f, c)));
            if (missed.length > 0) stopVerdict = `停早了(预览里还有 ${missed.length} 个答案文件)`;
            else if (trWalk.some(w => w.chosen == null && (w.reason ?? '').includes('预算'))) {
                const moves = trWalk.filter(w => w.chosen != null);
                const lastTwoGold = moves.slice(-2).some(w => core.some((c: string) => (w.result?.newFiles ?? []).some((f: string) => pathEq(f, c))));
                if (!lastTwoGold) stopVerdict = '停晚了(最后两步已无新答案文件)';
            }
        }
        // ④ 真 agent 在工具结果里见过的答案文件（对照：自动游走多找到了多少）
        const seen = seenFilesOf(mcpFile);
        const agentGold = core.filter((c: string) => seen.some(f => pathEq(f, c)));
        const walkerOnly = walkerGold.filter((c: string) => !agentGold.includes(c));

        const resolved = resolveIntent(mcpFile, tc.question ?? '');
        rows.push({
            id: tc.id, type: tc.questionType ?? '?', coreN: core.length,
            trHas: !!tr, trPages, trFallback, trMoves, trStops, trSeeds,
            goldPagesN: goldPages.size, entryHit, reachGoldN: walkerGold.length,
            firstGoldStep, goldByRound, stopVerdict,
            agentGoldN: agentGold.length, walkerOnlyN: walkerOnly.length,
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
        L.push(`> "答案文件" = Claude 标准答案里列出的关键文件（claude-truth.json 的 core），下同。trace 文件本身不含任何答案信息，本节的对照是报告生成时算的。\n`);
        L.push(`**入口**：${fbCount}/${trRows.length} 题在入口图里找不到页面、退回了普通符号搜索 · 被选最多的页面：${topPages.map(([p, c]) => `${p}×${c}`).join(' · ')}`);
        L.push(`**游走**：平均每题走 ${mean(trRows.map(r => r.trMoves)).toFixed(1)} 步 · 停下来的原因：${[...stopDist].sort((a, b) => b[1] - a[1]).map(([s, c]) => `${s} ${c}`).join(' · ')}`);
        L.push(`**对照标准答案**：入口页选对 **${entryHits}/${withGold.length}** 题（只算答案文件所在页面存在于入口图的题；另 ${trRows.length - withGold.length} 题答案文件根本不在任何 wiki 页面里，怎么选都选不到，记 —）· 平均找到 **${pct(mean(reachVals))}** 的答案文件 · 一个答案文件都没找到的题 ${reachZero}/${reachRows.length}\n`);
        L.push(`| # | id | 选中的入口页 (top-3) | 入口页对吗 | 找到答案文件 | seeds | 走了几步 | 停止原因 |`);
        L.push(`|---|---|---|:-:|---:|---:|---:|---|`);
        trRows.forEach((r, i) => {
            const pages = r.trFallback ? '(退回符号搜索)' : r.trPages.join('<br>');
            const gold = r.entryHit === null ? '—' : r.entryHit ? '✓' : '✗';
            L.push(`| ${i + 1} | ${r.id} | ${pages} | ${gold} | ${r.reachGoldN}/${r.coreN} | ${r.trSeeds} | ${r.trMoves} | ${r.trStops.join('/')} |`);
        });
        L.push('');

        // 2 — 游走诊断（四个白话指标）
        L.push(`## 2. 游走诊断 — 效率、停止时机、和真 agent 的对比\n`);
        const stepDist = new Map<string, number>();
        for (const r of trRows) {
            const k = r.firstGoldStep === null ? '没找到' : r.firstGoldStep === 0 ? '第0步(seed自身就是)' : `第${r.firstGoldStep}步`;
            stepDist.set(k, (stepDist.get(k) ?? 0) + 1);
        }
        L.push(`**多快找到第一个答案文件**：${[...stepDist].sort().map(([k, c]) => `${k}×${c}`).join(' · ')}`);
        const roundGold = new Map<number, number>();
        for (const r of trRows) for (const [rd, cnt] of r.goldByRound) roundGold.set(rd, (roundGold.get(rd) ?? 0) + cnt);
        L.push(`**每一轮新找到几个答案文件**（全部题目加总；轮次按每个 seed 自己数）：${[...roundGold].sort((a, b) => a[0] - b[0]).map(([rd, c]) => `第${rd}轮 ${c}个`).join(' · ') || '（无）'}`);
        const stopBad = trRows.filter(r => r.stopVerdict !== '正常');
        L.push(`**停止时机**：${trRows.length - stopBad.length}/${trRows.length} 题正常${stopBad.length ? `；有问题的：${stopBad.map(r => `${r.id}(${r.stopVerdict})`).join('、')}` : ''}`);
        const sumWalker = trRows.reduce((s, r) => s + r.reachGoldN, 0);
        const sumAgent = trRows.reduce((s, r) => s + r.agentGoldN, 0);
        const sumOnly = trRows.reduce((s, r) => s + r.walkerOnlyN, 0);
        L.push(`**和真 agent 对比**（同一批答案文件，共 ${trRows.reduce((s, r) => s + r.coreN, 0)} 个）：自动游走找到 ${sumWalker} 个，真 agent 在工具结果里见过 ${sumAgent} 个，**其中 ${sumOnly} 个是自动游走找到、agent 没见过的**——这就是把游走结果喂给 agent 能带来的增量上限。\n`);
        L.push(`| # | id | 游走找到 | agent 见过 | 游走多找 | 第几步首次找到 | 停止评价 |`);
        L.push(`|---|---|---:|---:|---:|---:|---|`);
        trRows.forEach((r, i) => {
            const first = r.firstGoldStep === null ? '没找到' : r.firstGoldStep === 0 ? 'seed 即是' : `第${r.firstGoldStep}步`;
            L.push(`| ${i + 1} | ${r.id} | ${r.reachGoldN}/${r.coreN} | ${r.agentGoldN}/${r.coreN} | +${r.walkerOnlyN} | ${first} | ${r.stopVerdict} |`);
        });
        L.push('');
    }

    // 2 — agent 实际调用
    L.push(`## 3. Agent 实际调用 — 每题的真实工具调用序列\n`);
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
