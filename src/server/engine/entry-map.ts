// 候选地图：plan 调用时对问题跑一次离线游走（入口图选页 → 页内选 seed → 亲和度引导游走），
// 把候选文件列表交给 agent 当开局地图——agent 的 8 次调用预算从"盲猜找路"变成"验证深挖"。
// 依据：metrics §2 实测游走器找到 85/144 答案文件 vs agent 自己只见过 46/144。
// 索引已在内存，秒级、零 LLM、零网络。ACA_ENTRY_MAP=0 关闭。
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { GLOBAL_INDEX } from '../../indexer/state.js';
import { relPath } from './common.js';
import { questionTokens, scoreString } from './walker/affinity.js';
import { informativeTokens, selectPages, resolveWikiFiles, selectSeedForPage } from './walker/entry.js';
import { buildDirectedAdjacency, walkFromSeed, type WalkCtx } from './walker/walk.js';
import type { WikiMap } from '../../wikimap/parse.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIKI_MAP_PATH = path.resolve(__dirname, '..', '..', '..', 'data', 'wiki-map.json');
const MAX_CANDIDATES = 25;

// 惰性单例：wiki-map + 有向邻接 + 文件→符号反查表都只建一次（索引每进程不可变）。
let cached: {
    wikiMap: WikiMap | null;
    ctx: WalkCtx;
    allFiles: string[];
    symbolsOfFile: (realPath: string) => string[];
} | null = null;

function deps() {
    if (cached) return cached;
    let wikiMap: WikiMap | null = null;
    try { wikiMap = JSON.parse(fs.readFileSync(WIKI_MAP_PATH, 'utf-8')); }
    catch { console.error('[entry-map] data/wiki-map.json missing/unreadable — candidate map disabled (rebuild: npm run wiki:map)'); }
    const byFile = new Map<string, string[]>();
    for (const [sym, paths] of GLOBAL_INDEX.symbols) {
        for (const p of paths) {
            let arr = byFile.get(p); if (!arr) { arr = []; byFile.set(p, arr); } arr.push(sym);
        }
    }
    for (const arr of byFile.values()) arr.sort();
    const symbolsOfFile = (f: string) => byFile.get(f) ?? [];
    const allFiles = [...GLOBAL_INDEX.allFiles];
    const realByRel = new Map(allFiles.map(f => [relPath(f), f]));
    const ctx: WalkCtx = {
        adj: buildDirectedAdjacency(GLOBAL_INDEX.callGraph),
        filesOf: (sym) => [...(GLOBAL_INDEX.symbols.get(sym) ?? [])].sort().map(relPath),
        symbolsOfFile: (relF) => { const real = realByRel.get(relF); return real ? symbolsOfFile(real) : []; },
    };
    cached = { wikiMap, ctx, allFiles, symbolsOfFile };
    return cached;
}

/** 对问题跑离线游走，返回附给 agent 的候选地图文本；关闭/无入口图/无命中时返回 null（plan 照旧）。 */
export function candidateMap(question: string): string | null {
    if (process.env.ACA_ENTRY_MAP === '0' || !question) return null;
    const { wikiMap, ctx, allFiles, symbolsOfFile } = deps();
    if (!wikiMap || GLOBAL_INDEX.symbols.size === 0) return null;

    const { kept: tokens } = informativeTokens(questionTokens(question), wikiMap);
    const pageStep = selectPages(tokens, wikiMap);
    if (!pageStep) return null;

    const seeds: string[] = [];
    for (const pageName of pageStep.chosen) {
        const page = wikiMap.pages.find(p => p.page === pageName);
        if (!page) continue;
        const { resolved } = resolveWikiFiles(Object.keys(page.source_files), allFiles);
        const step = selectSeedForPage(tokens, page, resolved, symbolsOfFile);
        if (step.chosen) seeds.push(step.chosen);
    }
    if (seeds.length === 0) return null;

    const reached = new Set<string>();
    for (const seed of new Set(seeds)) {
        for (const f of ctx.filesOf(seed)) reached.add(f);
        for (const w of walkFromSeed(seed, ctx, tokens)) {
            for (const f of (w.result?.newFiles ?? [])) reached.add(f);
        }
    }
    const ranked = [...reached]
        .map(f => ({ f, s: scoreString(tokens, f) }))
        .sort((a, b) => b.s - a.s || a.f.localeCompare(b.f))
        .slice(0, MAX_CANDIDATES);
    if (ranked.length === 0) return null;

    const pageOf = (f: string) => {
        const k = Object.keys(wikiMap.file_to_pages).find(w => f.endsWith(w) || f === w);
        return k ? `  (page: ${wikiMap.file_to_pages[k][0]})` : '';
    };
    return [
        `\n## 📍 Candidate map (derived offline from the architecture wiki-map + a graph walk — NOT LLM-generated)`,
        `Entry pages: ${pageStep.chosen.join(' / ')}`,
        `Suggested seed symbols: ${[...new Set(seeds)].join(', ')}`,
        `Candidate files, ranked by relevance to the question (top ${ranked.length}):`,
        ...ranked.map(({ f }) => `- ${f}${pageOf(f)}`),
        `⚠️ These are CANDIDATES, not the answer: confirm every file you cite via search/graph/details. Files not listed here may still matter.`,
    ].join('\n');
}
