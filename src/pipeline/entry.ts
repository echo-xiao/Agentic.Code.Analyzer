// Entry retrieval: dual-channel recall (section source files + full-repo lexical) fused
// by RRF over exactly three signals (lexical / provenance / graph fan-in), then chain
// grouping. No structural priors in v1 (spec: deferred).
import { GLOBAL_INDEX } from '../indexer/state.js';
import { relPath } from '../engine/common.js';
import type { WikiOutline } from '../deepwiki/types.js';
import type { RoutedSection, RankedSeed, Chain } from './types.js';

const RRF_K = 60;

export function rrfFuse(rankings: Array<Map<string, number>>, k = RRF_K): Map<string, number> {
    const out = new Map<string, number>();
    for (const ranking of rankings)
        for (const [item, rank] of ranking)
            out.set(item, (out.get(item) ?? 0) + 1 / (k + rank));
    return out;
}

const rankOf = (m: Map<string, number>, key: string): number | null => (m.has(key) ? m.get(key)! : null);

// --- NL-aware lexical scoring -------------------------------------------------------------
// fuzzysort's lexicalSeeds() (src/engine/seeds.ts) assumes a short query against long targets
// (searching filenames). Feeding it a full natural-language question — long query, short
// symbol-name targets — returns an EMPTY match set, so the lexical signal was silently dead in
// every live run. This replaces it, for entry retrieval only, with a keyword-overlap scorer:
// split the question into content words, split symbol names into sub-words (camelCase /
// snake_case / digit boundaries), score by token overlap normalized by symbol length.
const STOPWORDS = new Set([
    'how', 'is', 'a', 'the', 'an', 'on', 'in', 'of', 'to', 'for', 'does', 'do', 'what', 'when',
    'where', 'which', 'are', 'and', 'or', 'with', 'side', 'rocket', 'chat',
]);

export function tokenizeQuestion(q: string): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const raw of q.toLowerCase().split(/[^a-z0-9]+/)) {
        if (raw.length < 3 || STOPWORDS.has(raw) || seen.has(raw)) continue;
        seen.add(raw);
        out.push(raw);
    }
    return out;
}

export function symbolTokens(name: string): string[] {
    const withBoundaries = name
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')        // camelCase: fooBar -> foo_Bar
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')      // acronym+word: HTTPServer -> HTTP_Server
        .replace(/([A-Za-z])(\d)/g, '$1_$2')            // letter->digit boundary
        .replace(/(\d)([A-Za-z])/g, '$1_$2');           // digit->letter boundary
    const parts = withBoundaries.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    return [...new Set(parts)];
}

// Trivial suffix stemming for the (common) regular case — irregular verbs (sent/built/ran/...)
// don't reduce to their base form this way, so they're covered separately below.
const stemToken = (t: string): string => t.replace(/(ing|ed|s)$/, '');

// Small closed set of irregular verbs that show up in "how is X done" style questions and would
// otherwise never match their symbol's regular-form token (e.g. 'sent' never reduces to 'send'
// via suffix stripping). Each question token contributes both itself and its irregular base form
// (if any) to the token set used for matching — see tokenizeQuestion's caller below.
const IRREGULAR_VERBS: Record<string, string> = {
    sent: 'send', built: 'build', ran: 'run', made: 'make', wrote: 'write',
    read: 'read', kept: 'keep', found: 'find', got: 'get', held: 'hold', handled: 'handle',
};

function expandIrregulars(tokens: string[]): string[] {
    const out: string[] = [];
    for (const t of tokens) {
        out.push(t);
        const base = IRREGULAR_VERBS[t];
        if (base) out.push(base);
    }
    return out;
}

function lexicalScores(question: string): Map<string, number> {
    const qTokens = expandIrregulars(tokenizeQuestion(question));
    const qLower = question.toLowerCase();
    const scores = new Map<string, number>();
    for (const sym of GLOBAL_INDEX.symbols.keys()) {
        const symTokens = new Set(symbolTokens(sym));
        if (symTokens.size === 0) continue;
        let matched = 0;
        for (const qt of qTokens) {
            if (symTokens.has(qt)) { matched++; continue; }
            const stemmed = stemToken(qt);
            if (stemmed !== qt && symTokens.has(stemmed)) matched++;
        }
        // A symbol spelled out verbatim in the question (e.g. a camelCase identifier written as
        // one un-split word in a natural sentence, like "...executeSendMessage work...") never
        // token-matches its own sub-words individually, but it's the strongest lexical signal
        // there is — treat it as a full match so it actually enters the candidate set below
        // (this mirrors the verbatim exception applied again at the fallback-survival gate).
        if (matched < symTokens.size && sym.length >= 6 && qLower.includes(sym.toLowerCase())) matched = symTokens.size;
        if (matched === 0) continue;
        scores.set(sym, (matched * matched) / symTokens.size);
    }
    return scores;
}

// Path-token split for file disambiguation: lowercase, split on '/', '.', '-'.
const pathTokens = (p: string): string[] => p.toLowerCase().split(/[/.-]+/).filter(Boolean);

export function retrieveSeeds(question: string, routed: RoutedSection[], outline: WikiOutline, topK = 12): RankedSeed[] {
    // Channel B (lexical, full repo — the safety net; never restricted to wiki-listed files).
    // Computed first so provenance ranking (below) can break ties by lexical relevance instead
    // of by GLOBAL_INDEX.symbols Map-iteration order (which let generic hubs like `close`/`update`
    // outrank the actually-relevant symbol whenever both live in the same routed section file).
    const lexScores = lexicalScores(question);
    const lexRank = new Map<string, number>();
    [...lexScores.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).forEach(([sym], i) => lexRank.set(sym, i + 1));
    // Same expanded token set drives file disambiguation below — a symbol with multiple defining
    // files (e.g. sendMessage exists both client- and server-side) picks the one whose path best
    // matches the question, instead of whichever the Set happened to iterate first.
    const qTokensForFile = new Set(expandIrregulars(tokenizeQuestion(question)));

    // Chooses one file among a symbol's multiple defining files: prefer files that are one of a
    // routed section's sources (then rank by path-token overlap, then section rank, then name);
    // otherwise rank all candidates by path-token overlap, then name.
    const chooseFile = (files: string[], secOfFile: Map<string, { sectionId: string; rank: number }>) => {
        const scored = files.map(abs => {
            const rel = relPath(abs);
            const pTokens = new Set(pathTokens(rel));
            let overlap = 0;
            for (const t of qTokensForFile) if (pTokens.has(t)) overlap++;
            return { rel, overlap, hit: secOfFile.get(rel) ?? null };
        });
        const pick = (list: typeof scored) => list.slice().sort((a, b) =>
            b.overlap - a.overlap || (a.hit && b.hit ? a.hit.rank - b.hit.rank : 0) || a.rel.localeCompare(b.rel))[0];
        const inSection = scored.filter(s => s.hit);
        return inSection.length > 0 ? pick(inSection) : pick(scored);
    };

    // Channel A (provenance): symbols defined in routed sections' source files, ordered by
    // (section rank asc, lexical score desc, symbol name asc) — not by Map insertion order.
    const secOfFile = new Map<string, { sectionId: string; rank: number }>();
    for (const r of routed) {
        const sec = outline.sections.find(s => s.id === r.sectionId);
        for (const src of sec?.sources ?? [])
            if (!secOfFile.has(src.file)) secOfFile.set(src.file, { sectionId: r.sectionId, rank: r.rank });
    }
    const fileOf = new Map<string, string>();
    const provCandidates: Array<{ sym: string; sectionId: string; sectionRank: number; file: string; lexScore: number }> = [];
    for (const [sym, files] of GLOBAL_INDEX.symbols) {
        if (files.size > 1) {
            const chosen = chooseFile([...files], secOfFile);
            if (chosen.hit) provCandidates.push({ sym, sectionId: chosen.hit.sectionId, sectionRank: chosen.hit.rank, file: chosen.rel, lexScore: lexScores.get(sym) ?? -Infinity });
            else fileOf.set(sym, chosen.rel);
            continue;
        }
        for (const abs of files) {
            const rel = relPath(abs);
            const hit = secOfFile.get(rel);
            if (hit) { provCandidates.push({ sym, sectionId: hit.sectionId, sectionRank: hit.rank, file: rel, lexScore: lexScores.get(sym) ?? -Infinity }); break; }
            if (!fileOf.has(sym)) fileOf.set(sym, rel);
        }
    }
    provCandidates.sort((a, b) => a.sectionRank - b.sectionRank || b.lexScore - a.lexScore || a.sym.localeCompare(b.sym));
    const provRank = new Map<string, number>();
    const sectionOf = new Map<string, string>();
    provCandidates.forEach((c, i) => {
        provRank.set(c.sym, i + 1);
        sectionOf.set(c.sym, c.sectionId);
        fileOf.set(c.sym, c.file);
    });
    // Signal C (graph fan-in) over the union of candidates.
    const candidates = new Set([...provRank.keys(), ...lexRank.keys()]);
    const graphRank = new Map<string, number>();
    [...candidates].map(s => [s, GLOBAL_INDEX.callGraph.get(s)?.length ?? 0] as const)
        .sort((a, b) => b[1] - a[1]).forEach(([sym], i) => graphRank.set(sym, i + 1));

    const fused = rrfFuse([lexRank, provRank, graphRank]);
    const ranked: RankedSeed[] = [...fused.entries()].sort((a, b) => b[1] - a[1]).slice(0, topK).map(([symbol, rrf]) => ({
        symbol, rrf,
        file: fileOf.get(symbol) ?? relPath([...(GLOBAL_INDEX.symbols.get(symbol) ?? [])][0] ?? ''),
        signals: { lexicalRank: rankOf(lexRank, symbol), provenanceRank: rankOf(provRank, symbol), graphRank: rankOf(graphRank, symbol) },
        sectionId: sectionOf.get(symbol) ?? null,
    }));

    // The lexical/grep channel is a SAFETY NET, not a peer signal: a seed with no section
    // provenance only earns its place if the lexical match is near-exact (full symbol-token
    // coverage by the question, or the symbol name spelled out verbatim in the question) —
    // otherwise it's noise from the full-repo scan and gets dropped before chain grouping ever
    // sees it (chain grouping decides what a *surviving* fallback seed attaches to).
    const survivesAsFallback = (symbol: string): boolean => {
        const symToks = symbolTokens(symbol);
        const fullyCovered = symToks.length >= 2 && symToks.every(st => qTokensForFile.has(st));
        const verbatim = symbol.length >= 6 && question.toLowerCase().includes(symbol.toLowerCase());
        return fullyCovered || verbatim;
    };
    return ranked.filter(s => s.signals.provenanceRank !== null || survivesAsFallback(s.symbol));
}

// Undirected neighbor lookup over the (directed, callee->callers) call graph — used to test
// whether a surviving fallback seed sits near an existing section chain before letting it form
// a chain of its own.
function buildUndirectedAdjacency(): Map<string, Set<string>> {
    const adj = new Map<string, Set<string>>();
    const link = (a: string, b: string) => {
        if (!adj.has(a)) adj.set(a, new Set());
        adj.get(a)!.add(b);
    };
    for (const [callee, callers] of GLOBAL_INDEX.callGraph)
        for (const { caller } of callers) { link(callee, caller); link(caller, callee); }
    return adj;
}

// Symbols reachable from `start` within `maxHops` hops (start itself excluded).
function withinHops(start: string, adj: Map<string, Set<string>>, maxHops: number): Set<string> {
    const visited = new Set<string>([start]);
    let frontier = new Set<string>([start]);
    for (let hop = 0; hop < maxHops; hop++) {
        const next = new Set<string>();
        for (const node of frontier)
            for (const nb of adj.get(node) ?? []) if (!visited.has(nb)) { visited.add(nb); next.add(nb); }
        frontier = next;
    }
    visited.delete(start);
    return visited;
}

const MAX_SECTION_CHAINS = 4;
const DEFAULT_SEEDS_PER_SECTION = 4;
// Dwarfs any lexical score (bounded, small — matched^2/tokenCount) so a symbol the wiki's own
// prose names verbatim outranks everything else in its section regardless of question overlap.
const PROSE_MENTION_BONUS = 1000;

// A symbol name (>=4 chars) counts as "mentioned in the prose" if it appears verbatim,
// case-sensitively (camelCase/PascalCase names like RoomBody are distinctive enough that a
// case-sensitive substring match is reliable), or — case-insensitively — inside markdown
// backticks (an explicit "this is code" marker, safe even for names that read as plain English).
function proseMentioned(sym: string, content: string): boolean {
    if (sym.length < 4) return false;
    if (content.includes(sym)) return true;
    const escaped = sym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('`' + escaped + '`', 'i').test(content);
}

// Symbols defined in one of `files` (repo-relative paths), paired with which file they're in.
function symbolsInFiles(files: Set<string>): Array<{ symbol: string; file: string }> {
    const out: Array<{ symbol: string; file: string }> = [];
    for (const [sym, absFiles] of GLOBAL_INDEX.symbols) {
        for (const abs of absFiles) {
            const rel = relPath(abs);
            if (files.has(rel)) { out.push({ symbol: sym, file: rel }); break; }
        }
    }
    return out;
}

// Chains are BORN from routed sections, not aggregated from seeds after the fact: each routed
// section (in rank order, capped at MAX_SECTION_CHAINS) becomes one chain, whose candidate seeds
// are the symbols actually defined in that section's own source files — ranked by lexical
// relevance to the question plus the prose-mention bonus above. The lexical/grep channel (the
// `seeds` RRF list from retrieveSeeds) stays a pure safety net: a surviving fallback seed merges
// into a graph-adjacent section chain if one exists within 2 hops, and everything left over
// collapses into at most ONE extra chain (never one chain per leftover seed) — total chains are
// therefore capped at MAX_SECTION_CHAINS + 1.
export function groupChains(
    seeds: RankedSeed[],
    routed: RoutedSection[],
    outline: WikiOutline,
    question: string,
    sectionContent: Map<string, string | null> = new Map(),
    seedsPerSection = DEFAULT_SEEDS_PER_SECTION,
): Chain[] {
    const lexScores = lexicalScores(question);
    const byExistingSeed = new Map(seeds.map(s => [s.symbol, s]));

    const sectionChains: Chain[] = [];
    for (const r of routed.slice(0, MAX_SECTION_CHAINS)) {
        const sec = outline.sections.find(s => s.id === r.sectionId);
        if (!sec) continue;
        const files = new Set(sec.sources.map(s => s.file));
        const content = sectionContent.get(r.sectionId) ?? null;
        const scored = symbolsInFiles(files).map(({ symbol, file }) => {
            const lex = lexScores.get(symbol) ?? 0;
            const bonus = content && proseMentioned(symbol, content) ? PROSE_MENTION_BONUS : 0;
            return { symbol, file, score: lex + bonus };
        });
        scored.sort((a, b) => b.score - a.score || a.symbol.localeCompare(b.symbol));
        const top = scored.slice(0, seedsPerSection);
        if (top.length === 0) continue;
        // Reuse the real RRF-computed seed (with its real signals) when this symbol also made the
        // overall `seeds` list; otherwise synthesize one carrying just the section-chain score.
        const chainSeeds: RankedSeed[] = top.map(t => byExistingSeed.get(t.symbol) ?? {
            symbol: t.symbol, file: t.file, rrf: t.score,
            signals: { lexicalRank: null, provenanceRank: 1, graphRank: null },
            sectionId: r.sectionId,
        });
        sectionChains.push({
            id: sectionChains.length + 1, label: r.sectionId, seeds: chainSeeds,
            rrfMass: top.reduce((a, t) => a + t.score, 0),
        });
    }

    // Fallback (grep-safety-net) seeds: merge graph-adjacent survivors into their nearest section
    // chain; everything unreachable collapses into at most one extra chain.
    const fallbackSeeds = seeds.filter(s => s.sectionId === null);
    const adj = buildUndirectedAdjacency();
    const unreached: RankedSeed[] = [];
    for (const s of fallbackSeeds) {
        const reached = withinHops(s.symbol, adj, 2);
        const candidates = sectionChains.filter(c => c.seeds.some(cs => reached.has(cs.symbol)));
        if (candidates.length > 0) {
            candidates.sort((a, b) => b.rrfMass - a.rrfMass);          // highest-mass match wins ties
            const target = candidates[0];
            target.seeds.push(s);
            target.rrfMass += s.rrf;
        } else {
            unreached.push(s);
        }
    }
    const chains = [...sectionChains];
    if (unreached.length > 0) {
        const label = unreached[0].file.split('/').slice(0, 4).join('/');
        chains.push({ id: chains.length + 1, label, seeds: unreached, rrfMass: unreached.reduce((a, s) => a + s.rrf, 0) });
    }

    // Lone-weak-seed prune stays: a single-seed chain far below the median score of everything
    // considered (section-chain seed scores + fallback seed rrfs) is retrieval noise, not signal.
    const allScores = [...sectionChains.flatMap(c => c.seeds.map(s => s.rrf)), ...fallbackSeeds.map(s => s.rrf)].sort((a, b) => a - b);
    const median = allScores[Math.floor(allScores.length / 2)] ?? 0;
    const pruned = chains.filter(c => !(c.seeds.length === 1 && c.seeds[0].rrf < median / 2));

    pruned.sort((a, b) => b.rrfMass - a.rrfMass);
    pruned.forEach((c, i) => (c.id = i + 1));
    return pruned;
}
