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
        if (matched === 0) continue;
        scores.set(sym, (matched * matched) / symTokens.size);
    }
    return scores;
}

export function retrieveSeeds(question: string, routed: RoutedSection[], outline: WikiOutline, topK = 12): RankedSeed[] {
    // Channel B (lexical, full repo — the safety net; never restricted to wiki-listed files).
    // Computed first so provenance ranking (below) can break ties by lexical relevance instead
    // of by GLOBAL_INDEX.symbols Map-iteration order (which let generic hubs like `close`/`update`
    // outrank the actually-relevant symbol whenever both live in the same routed section file).
    const lexScores = lexicalScores(question);
    const lexRank = new Map<string, number>();
    [...lexScores.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).forEach(([sym], i) => lexRank.set(sym, i + 1));

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
    return [...fused.entries()].sort((a, b) => b[1] - a[1]).slice(0, topK).map(([symbol, rrf]) => ({
        symbol, rrf,
        file: fileOf.get(symbol) ?? relPath([...(GLOBAL_INDEX.symbols.get(symbol) ?? [])][0] ?? ''),
        signals: { lexicalRank: rankOf(lexRank, symbol), provenanceRank: rankOf(provRank, symbol), graphRank: rankOf(graphRank, symbol) },
        sectionId: sectionOf.get(symbol) ?? null,
    }));
}

export function groupChains(seeds: RankedSeed[]): Chain[] {
    const byKey = new Map<string, RankedSeed[]>();
    for (const s of seeds) {
        const key = s.sectionId ?? s.file.split('/').slice(0, 4).join('/');
        (byKey.get(key) ?? byKey.set(key, []).get(key)!).push(s);
    }
    const rrfs = seeds.map(s => s.rrf).sort((a, b) => a - b);
    const median = rrfs[Math.floor(rrfs.length / 2)] ?? 0;
    const chains: Chain[] = [];
    for (const [label, group] of byKey) {
        if (group.length === 1 && group[0].rrf < median / 2) continue;   // lone weak seed = retrieval noise (spec)
        chains.push({ id: chains.length + 1, label, seeds: group, rrfMass: group.reduce((a, s) => a + s.rrf, 0) });
    }
    chains.sort((a, b) => b.rrfMass - a.rrfMass).forEach((c, i) => (c.id = i + 1));
    return chains;
}
