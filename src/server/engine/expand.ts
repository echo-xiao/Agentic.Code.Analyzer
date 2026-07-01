// Neighbourhood expansion + ranking — the ONLY place retrieval ordering happens.
//
// A subsystem's files are related by dependency edges, not by having names similar to one query
// word. So name-fuzzy ranking over definition sites can only ever surface the seed's own file
// (recall ceiling ≈ 1/N). We instead treat search as navigation: seed lexically (seeds.ts), EXPAND
// along the call graph to gather the neighborhood, then RANK that neighborhood by a graph-aware score.
import { GLOBAL_INDEX } from '../../indexer/state.js';
import { isTestPath } from './common.js';
import type { SeedResult } from './seeds.js';

// Undirected symbol adjacency, derived once from callGraph (callee↔caller). Cached because it is a
// pure function of the (immutable-per-process) index; rebuilding per query would be wasteful.
let NEIGHBORS: Map<string, Set<string>> | null = null;
function getNeighbors(): Map<string, Set<string>> {
    if (NEIGHBORS) return NEIGHBORS;
    const n = new Map<string, Set<string>>();
    const link = (a: string, b: string) => {
        if (a === b) return;
        let s = n.get(a); if (!s) { s = new Set(); n.set(a, s); } s.add(b);
    };
    for (const [callee, callers] of GLOBAL_INDEX.callGraph) {
        for (const { caller } of callers) { link(callee, caller); link(caller, callee); }
    }
    NEIGHBORS = n;
    return n;
}

// Same adjacency but keeping the edge type per link, for edge-type-weighted proximity.
let TYPED_NEIGHBORS: Map<string, Array<{ nb: string; et: string }>> | null = null;
function getTypedNeighbors(): Map<string, Array<{ nb: string; et: string }>> {
    if (TYPED_NEIGHBORS) return TYPED_NEIGHBORS;
    const n = new Map<string, Array<{ nb: string; et: string }>>();
    const link = (a: string, b: string, et: string) => {
        if (a === b) return;
        let s = n.get(a); if (!s) { s = []; n.set(a, s); } s.push({ nb: b, et });
    };
    for (const [callee, callers] of GLOBAL_INDEX.callGraph as Map<string, Array<{ caller: string; edgeType: string }>>) {
        for (const { caller, edgeType } of callers) { link(callee, caller, edgeType); link(caller, callee, edgeType); }
    }
    TYPED_NEIGHBORS = n;
    return n;
}

// Edge-type cost: strong structural edges keep a symbol "close"; weak `type` refs push it far;
// dynamic-dispatch edges sit in between. Used to weight proximity so that, among equidistant graph
// neighbours, the ones wired by real calls outrank type-only references.
const EDGE_COST: Record<string, number> = {
    call: 1, new: 1, jsx: 1,
    event_emit: 1.3, event_listen: 1.3, pubsub_publish: 1.3, pubsub_subscribe: 1.3,
    rest_call: 1.3, rest_route: 1.3, stream_def: 1.3, stream_sub: 1.3,
    type: 2.5,
};

// Fan-in centrality of a file, log-normalized to ~0..1. Real subsystem hubs are imported widely;
// peripheral/test files are not — this lifts the central definitions of the neighborhood.
function centralityOf(filePath: string): number {
    const c = GLOBAL_INDEX.fileDependents.get(filePath)?.size ?? 0;
    return Math.log1p(c) / Math.log1p(300);
}

export interface RankedSymbol { symbolName: string; paths: string[]; score: number; finalScore: number; hop: number; }

export function expandNeighborhood(seed: SeedResult, opts: { maxHop?: number; limit?: number } = {}): RankedSymbol[] {
    const { seeds, lexical, layerSegment, inferredSegments } = seed;
    const maxHop = opts.maxHop ?? 2;
    const limit = opts.limit ?? 15;
    if (seeds.length === 0) return [];

    // 1. EXPAND — BFS to maxHop over the call graph. hop = min distance from any seed.
    const neighbors = getNeighbors();
    const hop = new Map<string, number>();
    for (const s of seeds) hop.set(s, 0);
    let frontier = [...seeds];
    for (let d = 1; d <= maxHop && frontier.length > 0; d++) {
        const next: string[] = [];
        for (const s of frontier) {
            for (const nb of neighbors.get(s) ?? []) {
                if (!hop.has(nb)) { hop.set(nb, d); next.push(nb); }
            }
        }
        frontier = next;
        if (hop.size > 6000) break; // safety on hub explosions
    }

    // Weighted distance (edge-type-aware) over the SAME neighbourhood — refines proximity only,
    // recall unchanged. Bellman-Ford-lite: ≤maxHop-edge paths converge in a few passes.
    const typed = getTypedNeighbors();
    const wdist = new Map<string, number>();
    for (const s of seeds) wdist.set(s, 0);
    for (let pass = 0; pass < 3; pass++) {
        for (const node of hop.keys()) {
            let best = wdist.get(node) ?? Infinity;
            for (const { nb, et } of typed.get(node) ?? []) {
                const dnb = wdist.get(nb);
                if (dnb === undefined) continue;
                const cand = dnb + (EDGE_COST[et] ?? 1);
                if (cand < best) best = cand;
            }
            if (best < (wdist.get(node) ?? Infinity)) wdist.set(node, best);
        }
    }

    // 2. RANK — proximity to seed dominates (subsystem membership); lexical pins the seed at the
    // top; a mild centrality reward favours real definitions; an IDF-style hub penalty suppresses
    // generic utilities that neighbour everything but belong to no single subsystem.
    const scored: RankedSymbol[] = [];
    for (const [sym, h] of hop) {
        let paths = Array.from(GLOBAL_INDEX.symbols.get(sym) ?? []);
        if (paths.length === 0) continue;
        if (layerSegment) {
            const f = paths.filter(p => p.includes(layerSegment));
            if (f.length > 0) paths = f;
        }
        // Within a symbol, prefer non-test + higher-centrality definition first.
        paths.sort((a, b) =>
            (isTestPath(a) ? 1 : 0) - (isTestPath(b) ? 1 : 0) ||
            centralityOf(b) - centralityOf(a));

        const lex = lexical.get(sym) ?? 0;
        const proximity = 1 / (1 + (wdist.get(sym) ?? h));
        const cent = centralityOf(paths[0]);
        const nbrs = neighbors.get(sym);
        const degree = nbrs?.size ?? 0;
        const hubPenalty = Math.log1p(degree) / Math.log1p(2000); // generic glue → ~1, subsystem node → small
        // Cohesion: how many of this symbol's neighbours also fell inside the discovered
        // neighbourhood. A real subsystem member references several siblings; an incidental
        // neighbour links mostly outward. Pulls true core files up (and MRR with them).
        let inSet = 0;
        if (nbrs) for (const nb of nbrs) if (hop.has(nb)) inSet++;
        const cohesion = Math.min(1, inSet / 4);
        let prior = 0;
        if (layerSegment && paths.some(p => p.includes(layerSegment))) prior = 0.5;
        else if (inferredSegments.length > 0 && paths.some(p => inferredSegments.some(s => p.includes(s)))) prior = 0.3;

        const testPenalty = isTestPath(paths[0]) ? 0.5 : 0;
        const finalScore =
            2.0 * proximity +   // hop-1 ≫ hop-2: subsystem files sit next to the seed
            1.5 * lex +         // exact/strong name match (the seed) pinned to the top
            0.6 * cohesion +    // densely wired into the rest of the neighbourhood
            0.2 * cent +        // real definitions get imported; mild reward
            prior -
            0.6 * hubPenalty -  // demote everything-touches utilities
            testPenalty;
        scored.push({ symbolName: sym, paths, score: lex, finalScore, hop: h });
    }

    return scored.sort((a, b) => b.finalScore - a.finalScore).slice(0, limit);
}
