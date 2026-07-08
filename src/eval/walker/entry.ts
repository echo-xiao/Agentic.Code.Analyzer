// 决策点 1（选入口页面）+ 决策点 2（每页选 seed）+ lexical fallback。
// 全部依赖注入（allFiles/symbolsOfFile 由编排器传入），不直接碰 GLOBAL_INDEX——可单测。
import { scoreString } from './affinity.js';
import { lexicalSeeds } from '../../server/engine/seeds.js';
import { isTestPath } from '../../server/engine/common.js';
import type { WikiMap, WikiPage } from '../../wikimap/parse.js';

export interface PageOption { page: string; score: number; hitOn: string[] }
export interface PageStep { options: PageOption[]; chosen: string[]; reason: string }
export interface SeedOption { symbol: string; file: string; score: number }
export interface SeedStep { page: string; options: SeedOption[]; chosen: string | null; reason: string }

const PAGE_THRESHOLD = 0.3;
// 结构部位权重：标题最可信，章节/节点次之，文件路径 token 最弱。
const W_TITLE = 1.0, W_SECTION = 0.9, W_NODE = 0.9, W_FILE = 0.7;

export function selectPages(tokens: string[], map: WikiMap, threshold = PAGE_THRESHOLD): PageStep | null {
    const options: PageOption[] = [];
    for (const p of map.pages) {
        const parts: Array<{ name: string; score: number }> = [];
        parts.push({ name: 'title', score: W_TITLE * scoreString(tokens, p.page) });
        for (const s of p.sections) parts.push({ name: `section:${s}`, score: W_SECTION * scoreString(tokens, s) });
        for (const d of p.diagrams) for (const label of Object.values(d.nodes))
            parts.push({ name: `node:${label.slice(0, 40)}`, score: W_NODE * scoreString(tokens, label) });
        for (const f of Object.keys(p.source_files)) parts.push({ name: `file:${f}`, score: W_FILE * scoreString(tokens, f) });

        const best = parts.reduce((a, b) => (b.score > a.score ? b : a), { name: '', score: 0 });
        const hitOn = parts.filter(x => x.score >= threshold).sort((a, b) => b.score - a.score).slice(0, 3).map(x => x.name);
        options.push({ page: p.page, score: Number(best.score.toFixed(3)), hitOn });
    }
    options.sort((a, b) => b.score - a.score);
    const top10 = options.slice(0, 10);
    const chosen = top10.filter(o => o.score >= threshold).slice(0, 3);
    if (chosen.length === 0) return null;
    return {
        options: top10,
        chosen: chosen.map(c => c.page),
        reason: `top-${chosen.length} by 结构匹配分 ${chosen.map(c => `${c.page}:${c.score}`).join('/')}，阈值 ${threshold}`,
    };
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
        if (!(wikiPath in page.source_files)) continue;
        if (isTestPath(realPath)) continue;   // 测试文件不出 seed（spec §2.3 优先非测试路径）
        const syms = symbolsOfFile(realPath).slice(0, 2); // 每文件 ≤2 个符号
        for (const s of syms) options.push({ symbol: s, file: wikiPath, score: Number(scoreString(tokens, s).toFixed(3)) });
    }
    options.sort((a, b) => b.score - a.score);
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
    const chosen = [...seed.lexical.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s]) => s);
    return { chosen, reason: 'fallback: 入口图无命中，lexicalSeeds top-3' };
}
