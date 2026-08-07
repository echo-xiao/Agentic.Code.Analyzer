// Step 2: turn routed subsections into chains. Hit subsections are grouped by page; each page's
// pool is the symbols defined in its hit subsections' source files; a plain lexical score picks
// the seed. No weights, no admission scoring, no budget -- every judgement of "which of these
// matters" is deferred to the answer call, which sees all the trees at once.
import { GLOBAL_INDEX } from '../indexer/state.js';
import { relPath } from '../engine/common.js';
import type { WikiSubsection } from '../deepwiki/sections.js';
import type { RoutedSection, Chain } from './types.js';

// Ties are built rather than broken, so this only bounds the blast radius of a pool where many
// symbols share the top score.
export const MAX_TIED = 3;
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
        const files = [...new Set(secs.flatMap(s => s.sources))];
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
// wastes the whole chain (measured: seeding at decryptMessage vs encryptMessage produces two
// trees that cannot reach each other). Ties are therefore built, not broken.
export function pickSeeds(pool: Pool, question: string, maxTied = MAX_TIED): Seed[] {
    const qTokens = questionTokens(question);
    const qLower = question.toLowerCase();
    const scored = pool.symbols
        .map(s => ({ symbol: s.symbol, file: chooseFile(s.files), score: lexicalScore(s.symbol, qTokens, qLower) }))
        .filter(s => s.score > 0);                    // a zero score is not a candidate
    if (scored.length === 0) return [];               // whole pool scores zero -> no chain for this page

    const best = Math.max(...scored.map(s => s.score));
    const top = scored.filter(s => s.score === best).sort((a, b) => a.symbol.localeCompare(b.symbol));
    return top.slice(0, maxTied).map(s => ({ ...s, tied: top.length > 1 }));
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
