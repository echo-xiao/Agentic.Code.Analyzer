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
// 短路径：末两段，区分同名文件（functions/sendMessage.ts vs methods/sendMessage.ts）。
const shortPath = (p: string): string => (p || '').split('/').slice(-2).join('/') || p;

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

// 首次命中 core 在哪一步：seed 即命中(第0步)=路由+种子都对；第R步=seed 没够到、靠 walk 硬捞；null=全程没命中。
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

// 语义段渲染（Phase 2）：judge 的 Row → 一行。缺→未跑。纯函数，零-API 可测。
export function semanticLabel(row?: { verdict?: string; mode?: string; reason?: string }): string {
    if (!row?.verdict) return `**语义**：未跑`;
    const icon = row.verdict === 'PASS' ? '✓' : row.verdict === 'PARTIAL' ? '◐' : '✗';
    const tail = [row.mode, row.reason].filter(Boolean).join(' — ');
    return `**语义**：${icon} ${row.verdict}${tail ? ` — ${tail}` : ''}`;
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

// ── section renderers（每题一段：scope / seed / walk / agent，各返回若干行）──────
// scope：选中页 + 各自打分（分数取自 pageStep.options，不再单列重复的 reason 串）。
export function renderScope(tr: any): string[] {
    const opts: any[] = tr.pageStep?.options ?? [];
    const chosen: string[] = tr.pageStep?.chosen ?? [];
    if (!chosen.length) return [`**scope 入口页**（${opts.length} 页打分 → 选 0）：（退回符号搜索）`];
    const scoreOf = new Map<string, number>(opts.map((o: any) => [o.page, o.score]));
    return [
        `**scope 入口页**（${opts.length} 页打分 → 选 ${chosen.length}）`,
        ...chosen.map(p => `- ${p}${scoreOf.has(p) ? ` \`${scoreOf.get(p)}\`` : ''}`),
    ];
}

export function renderSeed(tr: any): string[] {
    const seedSteps: any[] = tr.seedStep ?? [];
    if (!seedSteps.length) return [];
    const out = [`**seed 逐页种子**：`];
    for (const s of seedSteps) {
        const optN = (s.options ?? []).length;
        out.push(`- \`${s.page}\`：${s.chosen ? `→ \`${s.chosen}\`` : '（无）'} · ${optN} 候选${s.reason ? ` — ${s.reason}` : ''}`);
    }
    return out;
}

// walk：按种子分组——每个种子一块（名字 · 步数 · 停因），轮次挂其下。
// 顶行只 seed/步数（不再堆重复的"停因 X/X/X"）；per-seed 的 STOP 并进该组头。
export function renderWalk(tr: any, core: string[]): string[] {
    const walk: any[] = tr.walk ?? [];
    const seedsN = new Set(walk.map(w => w.anchor)).size;
    const moves = walk.filter(w => w.chosen != null).length;
    const out = [`**walk 游走**（${seedsN} seed · ${moves} 步）`];

    // 把连续同 anchor 的轮次归为一组（walk 本就按种子顺序排）
    const groups: { anchor: string; rounds: any[] }[] = [];
    for (const w of walk) {
        const last = groups[groups.length - 1];
        if (last && last.anchor === w.anchor) last.rounds.push(w);
        else groups.push({ anchor: w.anchor, rounds: [w] });
    }

    // 嵌套 bullet：种子一层，轮次一层（R+触达+命中 折成一条；只在真命中时显 core⭐）
    for (const g of groups) {
        const moveRounds = g.rounds.filter(w => w.chosen != null);
        const stopRound = g.rounds.find(w => w.chosen == null);
        const stopTxt = stopRound ? ` · ⏹ ${stopLabel(stopRound.reason ?? '')}` : '';
        out.push(`- **${base(g.anchor)}** · ${moveRounds.length} 步${stopTxt}`);
        for (const w of moveRounds) {
            const { reached, coreHits } = roundCoreHits(w, core);
            const hit = coreHits.length
                ? ` · **core 命中 ${coreHits.length}⭐**: ${coreHits.map(c => '`' + shortPath(c) + '`').join(' ')}`
                : '';
            const aff = w.reason ? ` · ${w.reason}` : '';   // affinity 明细（保留细节）
            out.push(`    - R${w.round} → \`${w.chosen}\` · 触达 ${reached}${hit}${aff}`);
        }
    }
    return out;
}

export function renderAgent(tr: any): string {
    const a = fmtAgentCalls(tr.agentCalls);
    return `**agent 实调**：${a.calls} calls${a.hitBudget ? ' ⛔预算满' : ''} — ${a.sequence}`;
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

    // aggregate（对不对汇总）
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

    // 语义段（Phase 2）：--semantic 付费真跑 judge（agent 答案 vs claude gold）；否则读缓存（零-API，标 stale）。
    const wantSemantic = process.argv.includes('--semantic');
    let semRows: Row[] = [];
    let semCached = false;
    if (wantSemantic) {
        const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
        if (!apiKey) { console.error('[report] --semantic 需要 ANTHROPIC_API_KEY'); process.exit(1); }
        console.error('[report] --semantic：付费跑 judge（agent 答案 vs claude gold）…');
        semRows = await judgeAnswers(new Anthropic({ apiKey }), testcases.map((tc: any) => ({ id: tc.id, question: tc.question ?? '' })), CAND_DIR, '## Gemini Answer');
        fs.writeFileSync(VERDICTS_CACHE, JSON.stringify(semRows, null, 2), 'utf-8');
    } else if (fs.existsSync(VERDICTS_CACHE)) {
        try { semRows = JSON.parse(fs.readFileSync(VERDICTS_CACHE, 'utf-8')); semCached = true; } catch { /* 空/坏缓存→当未跑 */ }
    }
    const semMap = new Map(semRows.map(r => [r.id, r]));
    const semN: Record<string, number> = { PASS: 0, PARTIAL: 0, FAIL: 0 };
    for (const r of semRows) if (r.verdict in semN) semN[r.verdict]++;

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
    L.push(`- **seed 命中 core**：seed 即命中 **${seedHitN}** 题 · walk 才捞到 ${lateN} · 全程没命中 ${missN} —— seed 即命中 = 路由+种子都对；walk 才捞到 = 靠游走硬捞（scope/seed 没够到）`);
    if (semRows.length) L.push(`- **语义**（agent 答案 vs claude gold${semCached ? '，缓存 verdicts-latest.json' : '，本次 --semantic 付费'}）：PASS ${semN.PASS} / PARTIAL ${semN.PARTIAL} / FAIL ${semN.FAIL}`);
    else L.push(`- **语义**：未跑 —— \`npm run report -- --semantic\` 付费开启（agent 答案 vs claude gold）`);
    L.push(`> "答案文件" = claude-truth.json 的 core（Claude 金答案关键文件）。trace 本体不含 gold；本节是报告端拿 trace × gold 算的对照，零-API。\n`);

    // pass 2: per question — 对不对 + trace（scope/seed/walk/agent 实调）
    for (const { tc, tr, core, gold, fcs } of items) {
        L.push(`## ${tc.id} — ${tc.question ?? ''}  _[${tc.questionType ?? '?'}]_`, '');
        if (!tr) { L.push(`> 无 trace（先跑 \`npm run trace\`）。`, ''); continue; }

        // ── 对不对 ──
        const sc = gold!.entryHit === null ? '—（答案文件不在任何 wiki 页）' : gold!.entryHit ? '✓ 选对' : '✗ 选错';
        const fcsLabel = !gold!.coreN ? ''
            : fcs!.seedHit ? ' · **seed 即命中 core⭐**'
            : fcs!.firstStep != null ? ` · 首次命中 core 第 ${fcs!.firstStep} 步（seed 没够到，靠 walk）`
            : ' · ✗ core 全程没命中';
        L.push(`**对不对**：scope ${sc} · 召回 ${gold!.reachGoldN}/${gold!.coreN} 答案文件${fcsLabel}`, '');
        if (semMap.size) L.push(semanticLabel(semMap.get(tc.id)), '');

        // ── scope / seed / walk / agent —— 各段之间空行分隔（渲染成独立块）──
        L.push(...renderScope(tr), '');
        L.push(...renderSeed(tr), '');
        L.push(...renderWalk(tr, core), '');
        L.push(renderAgent(tr), '');
    }

    fs.mkdirSync(path.join(LOGS, 'reports'), { recursive: true });
    fs.writeFileSync(OUT, L.join('\n'), 'utf-8');
    console.error(`Wrote logs/reports/report.md`);
    console.log(`report: ${traced}/${testcases.length} traced · scope 选对 ${scopeHit}/${withGold.length} · 平均召回 ${(meanRecall * 100).toFixed(0)}% → logs/reports/report.md`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
