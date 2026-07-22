// Lexical seeding — the entry half of graph-aware retrieval. Turns a query string into BFS seed
// symbols plus per-symbol lexical scores. fuzzysort is ONLY used here (seeding); ranking of the
// expanded neighbourhood is pure graph arithmetic in expand.ts.
import fuzzysort from 'fuzzysort';
import { GLOBAL_INDEX } from '../../indexer/state.js';
import { LAYER_SEGMENTS } from './common.js';

const PATH_HINTS: Array<{ keywords: string[]; segment: string }> = [
    { keywords: ['client', 'ui', 'component', 'react'], segment: 'client' },
    { keywords: ['server', 'backend', 'method'],        segment: 'server' },
    { keywords: ['api', 'rest', 'endpoint', 'route'],   segment: 'api/server' },
    { keywords: ['package', 'shared', 'model'],         segment: 'packages' },
    { keywords: ['enterprise', 'ee', 'premium'],        segment: 'ee/' },
];

export interface SeedResult {
    seeds: string[];
    lexical: Map<string, number>;
    layerSegment: string | null;      // explicit layer restriction (path segment)
    inferredSegments: string[];       // soft path hints inferred from query wording
}

export function lexicalSeeds(query: string, layer?: string): SeedResult {
    const q = query.toLowerCase();
    const layerSegment = layer ? (LAYER_SEGMENTS[layer] ?? `/${layer}/`) : null;
    const inferredSegments = PATH_HINTS
        .filter(h => h.keywords.some(k => q.includes(k)))
        .map(h => h.segment);

    // Lexical name match (exact + fuzzy). lexical ∈ 0..1 per symbol.
    const symbolList = Array.from(GLOBAL_INDEX.symbols.keys());
    const fuzzyResults = fuzzysort.go(query, symbolList, { threshold: -3000, limit: 50 });
    const lexical = new Map<string, number>();
    for (const res of fuzzyResults) {
        const rawScore = Math.max(0, 1 + res.score / 3000);
        const lengthRatio = query.length / res.target.length;
        const base = lengthRatio < 0.4 ? rawScore * (lengthRatio / 0.4) : rawScore;
        lexical.set(res.target, Math.max(lexical.get(res.target) ?? 0, base));
    }
    if (GLOBAL_INDEX.symbols.has(query)) lexical.set(query, 1);

    // Strong name matches become BFS seeds. Fall back to the best few if none clear the bar.
    let seeds = Array.from(lexical.entries()).filter(([, s]) => s >= 0.5).map(([s]) => s);
    if (seeds.length === 0) {
        seeds = Array.from(lexical.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s]) => s);
    }
    seeds = seeds.slice(0, 10);

    return { seeds, lexical, layerSegment, inferredSegments };
}
