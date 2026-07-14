// 决策点 1（选入口页面）+ 决策点 2（每页选 seed）+ lexical fallback。
// 全部依赖注入（allFiles/symbolsOfFile 由编排器传入），不直接碰 GLOBAL_INDEX——可单测。
import { scoreString } from './affinity.js';
import { lexicalSeeds } from '../seeds.js';
import { isTestPath } from '../common.js';
import type { WikiMap, WikiPage } from '../../../wikimap/schema.js';

export interface PageOption { page: string; score: number; hitOn: string[] }
export interface PageStep { options: PageOption[]; chosen: string[]; reason: string }
export interface SeedOption { symbol: string; file: string; score: number }
export interface SeedStep { page: string; options: SeedOption[]; chosen: string | null; reason: string }
export interface SelectOpts { semScores?: Map<string, number>; expandedTokens?: string[]; candidateModules?: string[]; }

const PAGE_THRESHOLD = 0.3;
const SEM_THRESHOLD = 0.35;
const RRF_K = 60;
// 结构部位权重：标题最可信，章节/节点次之，文件路径 token 最弱。
const W_TITLE = 1.0, W_SECTION = 0.9, W_NODE = 0.9, W_FILE = 0.7;

// 语料级泛词过滤（IDF-lite，从 wiki-map 自身派生、零硬编码词表）：一个 token 若能匹配超过
// 半数页面（如产品名 rocket/chat 命中几乎所有页的节点 label/路径），它对选页没有区分度，
// 反而让 CI/CD Pipeline 这类泛 token 密集页霸榜。df/N > 0.5 即剔除；全剔光时回退原 tokens。
export function informativeTokens(
    tokens: string[], map: WikiMap, threshold = PAGE_THRESHOLD,
): { kept: string[]; dropped: Array<{ token: string; df: number; pages: number }> } {
    const n = map.pages.length;
    if (n === 0) return { kept: tokens, dropped: [] };
    const pageParts = map.pages.map(p => [
        p.page, ...p.sections,
        ...p.diagrams.flatMap(d => Object.values(d.nodes)),
        ...Object.keys(p.source_files),
    ]);
    const kept: string[] = [];
    const dropped: Array<{ token: string; df: number; pages: number }> = [];
    for (const t of tokens) {
        let df = 0;
        for (const parts of pageParts) {
            if (parts.some(s => scoreString([t], s) >= threshold)) df++;
        }
        // 0.4：'rocket' df 恰好 16/32=0.5 曾从 >0.5 边界漏网（trace 实证 2026-07-08），收紧到 0.4
        if (df / n >= 0.4) dropped.push({ token: t, df, pages: n }); else kept.push(t);
    }
    if (kept.length === 0) return { kept: tokens, dropped: [] };   // 全是泛词→不过滤，别把问题剃光头
    return { kept, dropped };
}

export function selectPages(tokens: string[], map: WikiMap, threshold = PAGE_THRESHOLD, opts: SelectOpts = {}): PageStep | null {
    // 扩词并入：expandedTokens 去重合并到 tokens 再用于打分。
    const allTokens = opts.expandedTokens?.length ? [...new Set([...tokens, ...opts.expandedTokens])] : tokens;
    // 候选模块集：命中 page.modules 中任一模块 id 的页面视为候选。
    const modSet = new Set(opts.candidateModules ?? []);
    const isCand = (p: any) => Array.isArray(p.modules) && p.modules.some((m: string) => modSet.has(m));
    const isCandByPage = new Map(map.pages.map(p => [p.page, isCand(p)]));
    const SEM_TOPK = 5;

    const options: PageOption[] = [];
    // 多 token 佐证：页面分 = top-K 个不同 token 各自最佳命中的均值（K=min(2,token数)，÷K）。
    // 单最佳部位打分是"单证人定罪"——同形异义孤证（git push 撞 'Push to develop'）能独占高分；
    // 佐证制下孤证被摊薄一半，同时命中 push+notifications 的页面胜出（trace 实证 2026-07-08）。
    const K = Math.min(2, Math.max(1, allTokens.length));
    for (const p of map.pages) {
        const parts: Array<{ name: string; w: number; text: string }> = [
            { name: 'title', w: W_TITLE, text: p.page },
            ...p.sections.map(s => ({ name: `section:${s}`, w: W_SECTION, text: s })),
            ...p.diagrams.flatMap(d => Object.values(d.nodes).map(label => ({ name: `node:${label.slice(0, 40)}`, w: W_NODE, text: label }))),
            ...Object.keys(p.source_files).map(f => ({ name: `file:${f}`, w: W_FILE, text: f })),
        ];
        const perToken = allTokens.map(t => {
            let best = { score: 0, name: '' };
            for (const part of parts) {
                const s = part.w * scoreString([t], part.text);
                if (s > best.score) best = { score: s, name: part.name };
            }
            return { token: t, score: best.score, name: best.name };
        }).sort((a, b) => b.score - a.score || a.token.localeCompare(b.token));
        const topK = perToken.slice(0, K);
        const score = topK.reduce((s, x) => s + x.score, 0) / K;
        const hitOn = topK.filter(x => x.score >= threshold).map(x => `${x.token}→${x.name}`);
        options.push({ page: p.page, score: Number(score.toFixed(3)), hitOn });
    }
    options.sort((a, b) => b.score - a.score || a.page.localeCompare(b.page));

    const lexChosen = options.filter(o => o.score >= threshold);
    const modPages = options.filter(o => isCandByPage.get(o.page));   // candidate-module pages

    if (lexChosen.length > 0) {
        // 词面有信号 → 词面排序为主(现状),仅把候选模块页并入前排;语义不介入(避免噪声回退)
        const seen = new Set<string>();
        const merged = [...modPages, ...lexChosen].filter(o => (seen.has(o.page) ? false : (seen.add(o.page), true))).slice(0, 3);
        return { options: options.slice(0, 10), chosen: merged.map(c => c.page),
            reason: `top-${merged.length} 词面 ${merged.map(c => `${c.page}:${c.score}`).join('/')}` };
    }

    // 词面空 → 救场:候选模块 + 语义 top-K,按 semScore 排
    const sem = opts.semScores;
    const semTop = sem && sem.size
        ? [...options].sort((a, b) => (sem.get(b.page) ?? -Infinity) - (sem.get(a.page) ?? -Infinity)).slice(0, SEM_TOPK)
        : [];
    const seen = new Set<string>();
    const rescue = [...modPages, ...semTop].filter(o => (seen.has(o.page) ? false : (seen.add(o.page), true))).slice(0, 3);
    if (rescue.length === 0) return null;
    return { options: rescue.slice(0, 10), chosen: rescue.map(c => c.page),
        reason: `救场 top-${rescue.length}(词面空→语义/候选模块) ${rescue.map(c => `${c.page}:${(sem?.get(c.page) ?? 0).toFixed(2)}`).join('/')}` };
}

export function resolveWikiFiles(wikiFiles: string[], allFiles: readonly string[]): { resolved: Map<string, string>; missing: string[] } {
    const norm = allFiles.map(f => ({ raw: f, n: f.replace(/\\/g, '/') }));
    const resolved = new Map<string, string>();
    const missing: string[] = [];
    for (const w of wikiFiles) {
        const hit = norm.find(f => f.n === w || f.n.endsWith('/' + w));
        if (hit) resolved.set(w, hit.raw); else missing.push(w);
    }
    return { resolved, missing };
}

export function selectSeedForPage(
    tokens: string[], page: WikiPage,
    resolved: Map<string, string>,
    symbolsOfFile: (realPath: string) => string[],
): SeedStep {
    const options: SeedOption[] = [];
    for (const [wikiPath, realPath] of resolved) {
        // resolved 可能由调用方跨页共享，这里按本页 source_files 过滤
        if (!(wikiPath in page.source_files)) continue;
        if (isTestPath(realPath)) continue;   // 测试文件不出 seed（spec §2.3 优先非测试路径）
        const syms = symbolsOfFile(realPath).slice(0, 2); // 每文件 ≤2 个符号
        for (const s of syms) options.push({ symbol: s, file: wikiPath, score: Number(scoreString(tokens, s).toFixed(3)) });
    }
    options.sort((a, b) => b.score - a.score || a.symbol.localeCompare(b.symbol));
    const top = options[0] ?? null;
    return {
        page: page.page,
        options: options.slice(0, 10),
        chosen: top?.symbol ?? null,
        reason: top
            ? `页内 ${resolved.size} 文件 ${options.length} 候选符号中词面分最高 (${top.score})`
            : '页内无可解析文件/符号',
    };
}

export function fallbackSeeds(tokens: string[]): { chosen: string[]; reason: string } {
    const seed = lexicalSeeds(tokens.join(' '));
    const chosen = [...seed.lexical.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3).map(([s]) => s);
    return { chosen, reason: 'fallback: 入口图无命中，lexicalSeeds top-3' };
}
