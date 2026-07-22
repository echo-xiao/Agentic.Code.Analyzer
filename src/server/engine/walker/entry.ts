// Decision point 1 (select entry pages) + decision point 2 (select a seed per page) + lexical fallback.
// Everything is dependency-injected (allFiles/symbolsOfFile passed in by the orchestrator), never touching GLOBAL_INDEX directly — unit-testable.
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
// Structural-part weights: the title is most trustworthy, sections/nodes next, file-path tokens weakest.
const W_TITLE = 1.0, W_SECTION = 0.9, W_NODE = 0.9, W_FILE = 0.7;

// Corpus-level generic-word filtering (IDF-lite, derived from the wiki-map itself, zero hardcoded word list): if a token matches
// more than half the pages (e.g. the product name rocket/chat hits node labels/paths on almost every page), it has no discriminating
// power for page selection and instead lets generic-token-dense pages like CI/CD Pipeline dominate. Drop when df/N > 0.5; fall back to the original tokens if all are dropped.
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
        // 0.4: 'rocket' with df exactly 16/32=0.5 once leaked through the >0.5 boundary (trace evidence 2026-07-08), tightened to 0.4
        if (df / n >= 0.4) dropped.push({ token: t, df, pages: n }); else kept.push(t);
    }
    if (kept.length === 0) return { kept: tokens, dropped: [] };   // all generic words → don't filter, don't shave the question bald
    return { kept, dropped };
}

export function selectPages(tokens: string[], map: WikiMap, threshold = PAGE_THRESHOLD, opts: SelectOpts = {}): PageStep | null {
    // Merge in query expansion: dedupe expandedTokens into tokens before scoring.
    const allTokens = opts.expandedTokens?.length ? [...new Set([...tokens, ...opts.expandedTokens])] : tokens;
    // Candidate module set: a page that hits any module id in page.modules is treated as a candidate.
    const modSet = new Set(opts.candidateModules ?? []);
    const isCand = (p: any) => Array.isArray(p.modules) && p.modules.some((m: string) => modSet.has(m));
    const isCandByPage = new Map(map.pages.map(p => [p.page, isCand(p)]));
    const SEM_TOPK = 5;

    const options: PageOption[] = [];
    // Multi-token corroboration: page score = mean of the top-K distinct tokens' individual best hits (K=min(2, token count), ÷K).
    // Single-best-part scoring is "conviction on one witness" — a homograph lone hit (git push colliding with 'Push to develop') can
    // monopolize a high score; under corroboration a lone hit is halved, and a page hitting both push+notifications wins (trace evidence 2026-07-08).
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
        // Lexical has signal → lexical ranking leads (status quo), merging only the candidate-module pages into the front rows; semantics stays out (avoids noisy fallback)
        const seen = new Set<string>();
        const merged = [...modPages, ...lexChosen].filter(o => (seen.has(o.page) ? false : (seen.add(o.page), true))).slice(0, 3);
        return { options: options.slice(0, 10), chosen: merged.map(c => c.page),
            reason: `top-${merged.length} lexical ${merged.map(c => `${c.page}:${c.score}`).join('/')}` };
    }

    // Lexical empty → rescue: candidate modules + semantic top-K, ranked by semScore
    const sem = opts.semScores;
    const semTop = sem && sem.size
        ? [...options].sort((a, b) => (sem.get(b.page) ?? -Infinity) - (sem.get(a.page) ?? -Infinity)).slice(0, SEM_TOPK)
        : [];
    const seen = new Set<string>();
    const rescue = [...modPages, ...semTop].filter(o => (seen.has(o.page) ? false : (seen.add(o.page), true))).slice(0, 3);
    if (rescue.length === 0) return null;
    return { options: rescue.slice(0, 10), chosen: rescue.map(c => c.page),
        reason: `rescue top-${rescue.length}(lexical empty→semantic/candidate-module) ${rescue.map(c => `${c.page}:${(sem?.get(c.page) ?? 0).toFixed(2)}`).join('/')}` };
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
        // resolved may be shared by the caller across pages, so filter by this page's source_files here
        if (!(wikiPath in page.source_files)) continue;
        if (isTestPath(realPath)) continue;   // test files never become seeds (spec §2.3 prefers non-test paths)
        const syms = symbolsOfFile(realPath).slice(0, 2); // ≤2 symbols per file
        for (const s of syms) options.push({ symbol: s, file: wikiPath, score: Number(scoreString(tokens, s).toFixed(3)) });
    }
    options.sort((a, b) => b.score - a.score || a.symbol.localeCompare(b.symbol));
    const top = options[0] ?? null;
    return {
        page: page.page,
        options: options.slice(0, 10),
        chosen: top?.symbol ?? null,
        reason: top
            ? `top lexical score among ${options.length} candidate symbols in ${resolved.size} files (${top.score})`
            : 'no resolvable files/symbols in page',
    };
}

export function fallbackSeeds(tokens: string[]): { chosen: string[]; reason: string } {
    const seed = lexicalSeeds(tokens.join(' '));
    const chosen = [...seed.lexical.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3).map(([s]) => s);
    return { chosen, reason: 'fallback: no entry-graph hit, lexicalSeeds top-3' };
}
