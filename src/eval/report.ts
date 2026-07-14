#!/usr/bin/env npx tsx
/**
 * report — 逐题 trace + 对不对 → logs/reports/report.md
 *
 * 两层，都零-API：
 *   ① trace（纯观察）：scope / seed / walk / agent 实调，读 logs/data/retrieval-trace/<id>.json。
 *   ② 对不对（gold 对照，零-API）：trace × claude-truth.json × wiki-map.json —— 每题
 *      scope 选对没（答案文件所在页是否进入口 scope）+ 召回几个答案文件（seed∪walk 是否触达 core）。
 *   ⛔ 本轮仍不做：R@k top-K 细分 / chain-LCS、citation true/false 门、语义段（judge，付费）。—— Phase 2+。
 *
 * 红线：不 import wiki-prose（散文不进测量门）；report.md 为人读产物，不喂 agent；gold 只读 claude-truth（本地）。
 * Run: npm run report   （先 `npm run trace` 产 retrieval-trace/）
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { loadTestcasesWithTruth, TESTCASES_PATH, CLAUDE_TRUTH_PATH } from './utils/truth-io.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGS = path.resolve(__dirname, '..', '..', 'logs');
const TRACE_DIR = path.join(LOGS, 'data', 'retrieval-trace');
const WIKI_MAP_PATH = path.resolve(__dirname, '..', '..', 'data', 'wiki-map.json');
const OUT = path.join(LOGS, 'reports', 'report.md');

// ── retrieval-trace loader: per-question decision log written by `npm run trace` ──
function loadTraceFile(id: string): any | null {
    const p = path.join(TRACE_DIR, `${id}.json`);
    if (!fs.existsSync(p)) return null;
    try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return null; }
}

// stop reason → 短标签（与 walk.ts 的 reason 文案对应）
export function stopLabel(reason: string): string {
    if (reason.includes('边际枯竭')) return '枯竭';
    if (reason.includes('相关性衰减')) return '衰减';
    if (reason.includes('预算')) return '预算';
    if (reason.includes('节点阀')) return '节点';
    if (reason.includes('无可继续')) return '无继续';
    return 'stop';
}

const base = (p: string): string => (p || '').split('/').pop() || p;

// 路径宽松相等：gold core 与 wiki-map 键 / trace 文件都是仓库相对路径，允许后缀包含。
export function pathEq(a: string, b: string): boolean {
    const x = (a || '').replace(/\\/g, '/'), y = (b || '').replace(/\\/g, '/');
    return x === y || x.endsWith('/' + y) || y.endsWith('/' + x);
}

// 对不对（零-API gold 对照）：trace × claude-truth core × wiki-map。
//   entryHit  = 答案文件所在页是否进了入口 scope（pageStep.chosen）；核心不属任何页 → null（—，天花板）。
//   reachGoldN = seed 自身文件 ∪ walk 各轮 newFiles 里，命中了几个 core 答案文件。
export function computeGold(
    tr: any,
    core: string[],
    wikiMap: any,
): { entryHit: boolean | null; reachGoldN: number; coreN: number } {
    const trPages: string[] = tr?.pageStep?.chosen ?? [];

    // pageStep.chosen 用页名(page.page/title)；file_to_pages 值是页 id —— 先把 id 归一到页名再比,否则永不命中。
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

// 单轮游走触达的文件 + 命中的 core（答案文件）—— 把"对不对"下沉到 walk 每一步。
export function roundCoreHits(w: any, core: string[]): { reached: number; coreHits: string[] } {
    const nf: string[] = w?.result?.newFiles ?? [];
    const coreHits = core.filter(c => nf.some(f => pathEq(f, c)));
    return { reached: nf.length, coreHits };
}

// agent 实调：直接渲染 trace 里已捕获的 agentCalls.sequence（结构化，无 gold）。
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

// 漂移守卫：trace 是对某个 wiki-map 跑的；若 pageStep.chosen 页名大面积对不上当前 wiki-map，
// 说明 trace 过时（对旧 wiki-map 跑的），此时"对不对"会失真 —— 报警提示重跑 trace。
export function traceDrift(
    traces: Array<{ pageStep?: { chosen?: string[] } } | null>,
    wikiMap: any,
): { total: number; matched: number; stale: boolean } {
    const names = new Set<string>((wikiMap?.pages ?? []).map((p: any) => p.page ?? p.title));
    let total = 0, matched = 0;
    for (const tr of traces) for (const p of (tr?.pageStep?.chosen ?? [])) { total++; if (names.has(p)) matched++; }
    return { total, matched, stale: total > 0 && matched / total < 0.5 };
}

async function main() {
    const { flat: testcases } = loadTestcasesWithTruth(TESTCASES_PATH, CLAUDE_TRUTH_PATH);
    const wikiMap: any = fs.existsSync(WIKI_MAP_PATH) ? JSON.parse(fs.readFileSync(WIKI_MAP_PATH, 'utf-8')) : null;

    // pass 1: load trace + compute gold verdict per question
    const items = testcases.map((tc: any) => {
        const tr = loadTraceFile(tc.id);
        const core: string[] = ((tc.core && tc.core.length ? tc.core : tc.groundTruthFiles) ?? []) as string[];
        return { tc, tr, core, gold: tr ? computeGold(tr, core, wikiMap) : null };
    });

    // aggregate（对不对汇总）
    const traced = items.filter(x => x.tr).length;
    const withGold = items.filter(x => x.gold && x.gold.entryHit !== null);
    const scopeHit = withGold.filter(x => x.gold!.entryHit).length;
    const recallRows = items.filter(x => x.gold && x.gold.coreN > 0);
    const meanRecall = recallRows.length ? recallRows.reduce((s, x) => s + x.gold!.reachGoldN / x.gold!.coreN, 0) / recallRows.length : 0;
    const zeroRecall = recallRows.filter(x => x.gold!.reachGoldN === 0).length;

    const drift = traceDrift(items.map(x => x.tr), wikiMap);

    const L: string[] = [];
    L.push(`# report — 逐题 trace + 对不对\n`);
    L.push(`${new Date().toLocaleString('en-US')} | ${testcases.length} testcases | deterministic (retrieval-trace × claude-truth × wiki-map)\n`);
    if (drift.stale) {
        L.push(`> ⚠️ **trace 疑似过时**：pageStep.chosen 仅 ${drift.matched}/${drift.total} 命中当前 wiki-map 页名 —— 下面"对不对"多半失真，请先 \`npm run trace\` 重生成 trace 再跑 report。\n`);
        console.error(`[report] ⚠️ trace 漂移：${drift.matched}/${drift.total} 页名命中当前 wiki-map —— 建议重跑 npm run trace`);
    }
    L.push(`## 对不对汇总（零-API gold 对照）`);
    L.push(`- **scope 选对**：${scopeHit}/${withGold.length} 题（答案文件所在页进了入口 scope；另 ${traced - withGold.length} 题答案文件不在任何 wiki 页，记 —）`);
    L.push(`- **召回**：平均找到 **${(meanRecall * 100).toFixed(0)}%** 答案文件 · 一个都没找到的题 ${zeroRecall}/${recallRows.length}`);
    L.push(`> "答案文件" = claude-truth.json 的 core（Claude 金答案关键文件）。trace 本体不含 gold；本节是报告端拿 trace × gold 算的对照，零-API。\n`);

    // pass 2: per question — 对不对 + trace（scope/seed/walk/agent 实调）
    for (const { tc, tr, core, gold } of items) {
        L.push(`## ${tc.id} — ${tc.question ?? ''}  _[${tc.questionType ?? '?'}]_\n`);
        if (!tr) { L.push(`> 无 trace（先跑 \`npm run trace\`）。\n`); continue; }

        // ── 对不对 ──
        const sc = gold!.entryHit === null ? '—（答案文件不在任何 wiki 页）' : gold!.entryHit ? '✓ 选对' : '✗ 选错';
        L.push(`**对不对**：scope ${sc} · 召回 ${gold!.reachGoldN}/${gold!.coreN} 答案文件`);

        // ── scope：入口页路由（selectPages） ──
        const pages: string[] = tr.pageStep?.chosen ?? [];
        const pageReason: string = tr.pageStep?.reason ?? '';
        const pageOptN = (tr.pageStep?.options ?? []).length;
        L.push(`**scope 入口页**（${pageOptN} 页打分 → 选 ${pages.length}）：${pages.length ? pages.join(' · ') : '（退回符号搜索）'}${pageReason ? `\n> ${pageReason}` : ''}`);

        // ── seed：逐页种子挑选 ──
        const seedSteps: any[] = tr.seedStep ?? [];
        if (seedSteps.length) {
            L.push(`**seed 逐页种子**：`);
            for (const s of seedSteps) {
                const optN = (s.options ?? []).length;
                L.push(`- \`${s.page}\`：${s.chosen ? `→ \`${s.chosen}\`` : '（无）'} · ${optN} 候选${s.reason ? ` — ${s.reason}` : ''}`);
            }
        }

        // ── walk：游走步 ──
        const walk: any[] = tr.walk ?? [];
        const moves = walk.filter(w => w.chosen != null).length;
        const stops = walk.filter(w => w.chosen == null).map(w => stopLabel(w.reason ?? ''));
        const seedsN = new Set(walk.map(w => w.anchor)).size;
        L.push(`**walk 游走**：${seedsN} seed · ${moves} 步${stops.length ? ` · 停因 ${stops.join('/')}` : ''}`);
        for (const w of walk) {
            const head = `R${w.round} @${base(w.anchor)}`;
            if (w.chosen != null) {
                L.push(`  - ${head} → \`${w.chosen}\`${w.reason ? ` — ${w.reason}` : ''}`);
                const { reached, coreHits } = roundCoreHits(w, core);
                if (reached > 0) {
                    const hit = coreHits.length
                        ? ` · **core 命中 ${coreHits.length}⭐**: ${coreHits.map(c => '`' + base(c) + '`').join(' ')}`
                        : ' · core 命中 0';
                    L.push(`    ↳ 触达 ${reached} 文件${hit}`);
                }
            } else L.push(`  - ${head} ⏹ STOP（${stopLabel(w.reason ?? '')}）`);
        }

        // ── agent 实际调用序列（取自 trace.agentCalls） ──
        const agent = fmtAgentCalls(tr.agentCalls);
        L.push(`**agent 实调**：${agent.calls} calls${agent.hitBudget ? ' ⛔预算满' : ''} — ${agent.sequence}\n`);
    }

    fs.mkdirSync(path.join(LOGS, 'reports'), { recursive: true });
    fs.writeFileSync(OUT, L.join('\n'), 'utf-8');
    console.error(`Wrote logs/reports/report.md`);
    console.log(`report: ${traced}/${testcases.length} traced · scope 选对 ${scopeHit}/${withGold.length} · 平均召回 ${(meanRecall * 100).toFixed(0)}% → logs/reports/report.md`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
