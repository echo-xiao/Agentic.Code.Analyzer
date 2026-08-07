// Step 2: turn routed subsections into chains. Hit subsections are grouped by page; each page's
// pool is the symbols defined in its hit subsections' source files; a plain lexical score picks
// the seed. No weights, no admission scoring, no budget -- every judgement of "which of these
// matters" is deferred to the answer call, which sees all the trees at once.
import { GLOBAL_INDEX } from '../indexer/state.js';
import { relPath } from '../engine/common.js';
import type { WikiSubsection } from '../deepwiki/sections.js';
import type { RoutedSection, Chain } from './types.js';

// A page often carries several sides of the same question, so the pool contributes its top few
// symbols rather than only its champion. Ties at the cut-off are never sliced -- equal scores mean
// the rule cannot tell them apart, and cutting by name would be arbitrary.
export const SEEDS_PER_POOL = 3;
export const MAX_SEEDS_PER_POOL = 9;
export const MAX_CHAINS = 12;

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
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .replace(/([A-Za-z])(\d)/g, '$1_$2')
        .replace(/(\d)([A-Za-z])/g, '$1_$2');
    return [...new Set(withBoundaries.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean))];
}

const stemToken = (t: string): string => t.replace(/(ing|ed|s)$/, '');

// Irregular verbs that show up in "how is X done" phrasing and never reduce to their base form by
// suffix stripping ('sent' -> 'send'), so they would silently miss their symbol's token.
const IRREGULAR_VERBS: Record<string, string> = {
    sent: 'send', built: 'build', ran: 'run', made: 'make', wrote: 'write',
    read: 'read', kept: 'keep', found: 'find', got: 'get', held: 'hold', handled: 'handle',
};

export function questionTokens(question: string): Set<string> {
    const out = new Set<string>();
    for (const t of tokenizeQuestion(question)) {
        out.add(t);
        const base = IRREGULAR_VERBS[t];
        if (base) out.add(base);
    }
    return out;
}

// Squared numerator so matching two question words is worth more than twice matching one.
// Deliberately NOT IDF-weighted: IDF measures how rare a word is in the codebase, not what role
// it plays in the question, and under "build every tie" a wrong tiebreak costs a whole chain
// while an unbroken tie only costs an extra tree.
export function lexicalScore(symbol: string, qTokens: Set<string>, questionLower: string): number {
    const symToks = new Set(symbolTokens(symbol));
    if (symToks.size === 0) return 0;
    let matched = 0;
    for (const qt of qTokens) {
        if (symToks.has(qt)) { matched++; continue; }
        const stemmed = stemToken(qt);
        if (stemmed !== qt && symToks.has(stemmed)) matched++;
    }
    // A symbol spelled out verbatim in the question never token-matches its own sub-words
    // individually, but it is the strongest lexical signal there is.
    if (matched < symToks.size && symbol.length >= 6 && questionLower.includes(symbol.toLowerCase())) {
        matched = symToks.size;
    }
    return matched === 0 ? 0 : (matched * matched) / symToks.size;
}

const TEST_MARKERS = ['.test.', '.spec.', '/tests/', '/test/', '/__tests__/', '.mocks.'];
export const isTestPath = (p: string): boolean => {
    const s = p.toLowerCase();
    return TEST_MARKERS.some(m => s.includes(m));
};

// Only 0.3% of subsections have their lexical winner defined in more than one of that
// subsection's own files (measured over 294 subsections), so this exists for reproducibility --
// not to pick "the better one". Never fall back to the index's Set iteration order.
export function chooseFile(files: string[]): string {
    if (files.length <= 1) return files[0] ?? '';
    const production = files.filter(f => !isTestPath(f));
    return (production.length > 0 ? production : files).slice().sort()[0];
}

export interface Pool {
    pageId: string;
    sections: WikiSubsection[];
    files: string[];
    symbols: Array<{ symbol: string; files: string[] }>;
}

// Chains are per page: subsections of one page routinely cite the same files, so a chain per
// subsection would produce near-identical trees.
export function buildPools(routed: RoutedSection[], sections: WikiSubsection[]): Pool[] {
    const byPage = new Map<string, WikiSubsection[]>();
    for (const r of routed) {
        const sec = sections.find(s => s.path === r.path);
        if (!sec) continue;
        if (!byPage.has(sec.pageId)) byPage.set(sec.pageId, []);
        byPage.get(sec.pageId)!.push(sec);
    }

    const pools: Pool[] = [];
    for (const [pageId, secs] of byPage) {
        // The wiki cites test files too (3.1-omnichannel points a subsection at
        // tests/data/livechat/rooms.ts), and a symbol defined ONLY there passes chooseFile's test
        // filter because it has no rival definition. Measured: closeOmnichannelRoom then became a
        // seed from a test utility, and the answer had to note the real handler was missing.
        const files = [...new Set(secs.flatMap(s => s.sources))].filter(f => !isTestPath(f));
        const fileSet = new Set(files);
        const symbols: Array<{ symbol: string; files: string[] }> = [];
        for (const [symbol, absFiles] of GLOBAL_INDEX.symbols) {
            const hits: string[] = [];
            for (const abs of absFiles) {
                const rel = relPath(abs);
                if (fileSet.has(rel) && !hits.includes(rel)) hits.push(rel);
            }
            if (hits.length > 0) symbols.push({ symbol, files: hits });
        }
        pools.push({ pageId, sections: secs, files, symbols });
    }
    return pools;
}

export interface Seed { symbol: string; file: string; score: number; tied: boolean }

// Seed selection is zero-tolerance: expansion is a one-way walk from the seed, so a wrong seed
// wastes the whole chain (measured: seeding at decryptMessage vs encryptMessage produces two trees
// that cannot reach each other). Hence a few seeds per pool, and ties are never cut mid-group.
//
// Taking only the champion measurably loses answers: for "how does the Omnichannel queue process
// AND close a conversation", closeOmnichannelRoom sat second at 1.33 and never became a chain, so
// the answer covered process only.
export function pickSeeds(pool: Pool, question: string, n = SEEDS_PER_POOL, cap = MAX_SEEDS_PER_POOL): Seed[] {
    const qTokens = questionTokens(question);
    const qLower = question.toLowerCase();
    const scored = pool.symbols
        .map(s => ({ symbol: s.symbol, file: chooseFile(s.files), score: lexicalScore(s.symbol, qTokens, qLower) }))
        .filter(s => s.score > 0)                     // a zero score is not a candidate
        .sort((a, b) => b.score - a.score || a.symbol.localeCompare(b.symbol));
    if (scored.length === 0) return [];               // whole pool scores zero -> no chain for this page

    // Take every symbol whose score is one of the top N scores -- a tie is a statement that the
    // rule cannot separate those candidates, so no tie group is ever split.
    const topScores = [...new Set(scored.map(s => s.score))].slice(0, n);
    const picked = scored.filter(s => topScores.includes(s.score)).slice(0, cap);
    const counts = new Map<number, number>();
    for (const s of picked) counts.set(s.score, (counts.get(s.score) ?? 0) + 1);
    return picked.map(s => ({ ...s, tied: (counts.get(s.score) ?? 0) > 1 }));
}

export function buildChains(
    routed: RoutedSection[],
    sections: WikiSubsection[],
    question: string,
    maxChains = MAX_CHAINS,
): Chain[] {
    const chains: Chain[] = [];
    for (const pool of buildPools(routed, sections)) {
        for (const seed of pickSeeds(pool, question)) {
            if (chains.length >= maxChains) return chains;          // runaway backstop only
            chains.push({
                id: chains.length + 1,
                pageId: pool.pageId,
                sections: pool.sections.map(s => s.path),
                label: `${pool.sections[0].path} · ${seed.symbol}`,
                seed: { symbol: seed.symbol, file: seed.file },
                tied: seed.tied,
                prose: pool.sections.map(s => s.prose).join('\n\n'),
            });
        }
    }
    return chains;
}
