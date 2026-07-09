// 候选地图：plan 调用时对问题跑一次离线游走（入口图选页 → 页内选 seed → 亲和度引导游走），
// 把候选文件列表交给 agent 当开局地图——agent 的 8 次调用预算从"盲猜找路"变成"验证深挖"。
// 依据：metrics §2 实测游走器找到 85/144 答案文件 vs agent 自己只见过 46/144。
// 索引已在内存，秒级、零 LLM、零网络。ACA_ENTRY_MAP=0 关闭。
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { GLOBAL_INDEX } from '../../indexer/state.js';
import { relPath, isTestPath } from './common.js';
import { questionTokens, scoreString } from './walker/affinity.js';
import { informativeTokens, selectPages, resolveWikiFiles, selectSeedForPage } from './walker/entry.js';
import { buildDirectedAdjacency, walkFromSeed, type WalkCtx } from './walker/walk.js';
import type { WikiMap } from '../../wikimap/parse.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIKI_MAP_PATH = path.resolve(__dirname, '..', '..', '..', 'data', 'wiki-map.json');
const SUMMARIES_PATH = path.resolve(__dirname, '..', '..', '..', 'data', 'file-summaries.json');
const MAX_CANDIDATES = 25;

// 文件一句话摘要（summaries:gen 生成，哈希缓存）——排序语义项 + 候选地图标注。缺文件时为 null（照旧跑）。
let summariesCache: Record<string, { hash: string; summary: string }> | null | undefined;
export function loadSummaries(): Record<string, { hash: string; summary: string }> | null {
    if (summariesCache !== undefined) return summariesCache;
    try { summariesCache = JSON.parse(fs.readFileSync(SUMMARIES_PATH, 'utf-8')); }
    catch { summariesCache = null; }
    return summariesCache;
}

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

interface Analysis {
    tokens: string[];
    chosenPages: import('../../wikimap/parse.js').WikiPage[];
    seeds: string[];
    ranked: string[];
    pageOf: (f: string) => string;
}

/**
 * 候选混合排序（生产与测量共用的唯一实现）：图邻近度加倍主导 + 词面辅助。
 * 权重 2:1 的依据（用户判断，与 expand.ts 的 2.0×proximity+1.5×lex 同哲学）：答案文件是
 * 围绕 seed 连成的一条逻辑链，图距离是第一信号；纯词面排序会把 apn.ts/fcm.ts 这类
 * "名字无信号、只有结构信号"的核心文件埋进大网深处（2026-07-08 精度实测：前 25 平均只剩
 * 0.9 个答案相关文件）。发现轮次越早 = 离 seed 越近：主项 2/(1+轮次)（seed 自身文件=2.0，
 * 第1轮=1.0，第2轮=0.67…），词面分（0..~0.9）作辅助项。测试文件不进候选。
 */
export function rankCandidates(
    items: Array<{ f: string; round: number }>, tokens: string[],
    summaries?: Record<string, { summary: string }> | null,
): string[] {
    return items
        .filter(x => !isTestPath(x.f))
        .map(x => {
            // 词面项取 max(文件名, 摘要)：apn.ts 文件名对 "push notification" 零分，
            // 但摘要 "Apple push notification delivery" 能命中（方案2 的语义排序项）
            const nameFace = scoreString(tokens, x.f);
            const sumFace = summaries?.[x.f] ? scoreString(tokens, summaries[x.f].summary) : 0;
            return { f: x.f, s: 2 / (1 + x.round) + Math.max(nameFace, sumFace) };
        })
        .sort((a, b) => b.s - a.s || a.f.localeCompare(b.f))
        .map(x => x.f);
}

// 共享分析核：选页 → 每页选 seed → 游走 → 候选排序。candidateMap 与 offlineWikiAnswer 共用。
function analyze(question: string): Analysis | null {
    if (process.env.ACA_ENTRY_MAP === '0' || !question) return null;
    const { wikiMap, ctx, allFiles, symbolsOfFile } = deps();
    if (!wikiMap || GLOBAL_INDEX.symbols.size === 0) return null;

    const { kept: tokens } = informativeTokens(questionTokens(question), wikiMap);
    const pageStep = selectPages(tokens, wikiMap);
    if (!pageStep) return null;

    const chosenPages = pageStep.chosen
        .map(name => wikiMap.pages.find(p => p.page === name))
        .filter((p): p is NonNullable<typeof p> => !!p);
    const seeds: string[] = [];
    for (const page of chosenPages) {
        const { resolved } = resolveWikiFiles(Object.keys(page.source_files), allFiles);
        const step = selectSeedForPage(tokens, page, resolved, symbolsOfFile);
        if (step.chosen) seeds.push(step.chosen);
    }
    if (seeds.length === 0) return null;

    // 记录每个文件首次被发现的轮次（seed 自身文件=第 0 轮）——排序的图邻近信号
    const firstRound = new Map<string, number>();
    for (const seed of new Set(seeds)) {
        for (const f of ctx.filesOf(seed)) if (!firstRound.has(f)) firstRound.set(f, 0);
        for (const w of walkFromSeed(seed, ctx, tokens)) {
            for (const f of (w.result?.newFiles ?? [])) {
                if (!firstRound.has(f) || firstRound.get(f)! > w.round) firstRound.set(f, w.round);
            }
        }
    }
    const ranked = rankCandidates([...firstRound].map(([f, round]) => ({ f, round })), tokens, loadSummaries())
        .slice(0, MAX_CANDIDATES);
    if (ranked.length === 0) return null;

    const pageOf = (f: string) => {
        const k = Object.keys(wikiMap.file_to_pages).find(w => f.endsWith(w) || f === w);
        return k ? `  (page: ${wikiMap.file_to_pages[k][0]})` : '';
    };
    return { tokens, chosenPages, seeds, ranked, pageOf };
}

function candidateLines(a: Analysis): string[] {
    return [
        `Entry pages: ${a.chosenPages.map(p => p.page).join(' / ')}`,
        `Suggested seed symbols: ${[...new Set(a.seeds)].join(', ')}`,
        `Candidate files, ranked by graph proximity to the seeds + relevance (top ${a.ranked.length}):`,
        ...a.ranked.map(f => {
            const sum = loadSummaries()?.[f]?.summary;
            return `- ${f}${a.pageOf(f)}${sum ? ` — ${sum}` : ''}`;
        }),
        `⚠️ These are CANDIDATES, not the answer: you MUST confirm every file you cite via search/graph/details — citing unverified paths is an error. Files not listed here may still matter.`,
    ];
}

/** 只做"问题→命中页面"的轻量匹配（wiki 工具的散文检索用）；不触散文、不游走结果。 */
export function matchPages(question: string): { pages: string[]; tokens: string[] } | null {
    const a = analyze(question);
    return a ? { pages: a.chosenPages.map(p => p.page), tokens: a.tokens } : null;
}

/** 对问题跑离线游走，返回附给 agent 的候选地图文本；关闭/无入口图/无命中时返回 null（plan 照旧）。 */
export function candidateMap(question: string): string | null {
    const a = analyze(question);
    if (!a) return null;
    return [
        `\n## 📍 Candidate map (derived offline from the architecture wiki-map + a graph walk — NOT LLM-generated)`,
        ...candidateLines(a),
    ].join('\n');
}

// mermaid 边渲染：node id → label（截断），只渲染两端 label 都存在的边
const trimLabel = (s: string) => (s.length > 48 ? s.slice(0, 45) + '…' : s);

/** 离线版 wiki 回答（替代运行期 DeepWiki MCP）：入口页结构（章节 + 关系边）+ 候选文件。纯结构，无散文。 */
export function offlineWikiAnswer(question: string): string | null {
    const a = analyze(question);
    if (!a) return null;
    const L: string[] = [
        `## 🗺 Architecture map (offline, derived from the DeepWiki wiki-map — structure only, no prose)`,
    ];
    for (const p of a.chosenPages) {
        L.push(`\n### ${p.page}`);
        if (p.sections.length) L.push(`Sections: ${p.sections.join(' · ')}`);
    }
    // 关系边按与问题的相关度全局排序取 top——不按页序灌预算，防止一张噪声页（如 CI/CD 的
    // git 流水线边）吃光预算、把真正相关页的边挤出去（2026-07-08 冒烟实证）。
    const scoredEdges: Array<{ line: string; s: number }> = [];
    for (const p of a.chosenPages) {
        for (const d of p.diagrams) {
            for (const e of d.edges) {
                const from = d.nodes[e[0]], to = d.nodes[e[1]];
                if (!from || !to) continue;
                const s = Math.max(scoreString(a.tokens, from), scoreString(a.tokens, to));
                scoredEdges.push({ line: `- ${trimLabel(from)} → ${trimLabel(to)}${e[2] ? `  (${e[2]})` : ''}  [${p.page}]`, s });
            }
        }
    }
    const topEdges = scoredEdges.sort((x, y) => y.s - x.s || x.line.localeCompare(y.line)).slice(0, 16).filter(e => e.s > 0);
    if (topEdges.length) {
        L.push(`\nComponent relations most relevant to the question:`);
        L.push(...topEdges.map(e => e.line));
    }
    L.push('');
    L.push(...candidateLines(a));
    return L.join('\n');
}
