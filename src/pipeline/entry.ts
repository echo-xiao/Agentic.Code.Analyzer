// Entry retrieval: dual-channel recall (section source files + full-repo lexical) fused
// by RRF over exactly three signals (lexical / provenance / graph fan-in), then chain
// grouping. No structural priors in v1 (spec: deferred).
import { GLOBAL_INDEX } from '../indexer/state.js';
import { lexicalSeeds } from '../engine/seeds.js';
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

export function retrieveSeeds(question: string, routed: RoutedSection[], outline: WikiOutline, topK = 12): RankedSeed[] {
    // Channel A (provenance): symbols defined in routed sections' source files, ordered by section rank.
    const secOfFile = new Map<string, { sectionId: string; rank: number }>();
    for (const r of routed) {
        const sec = outline.sections.find(s => s.id === r.sectionId);
        for (const src of sec?.sources ?? [])
            if (!secOfFile.has(src.file)) secOfFile.set(src.file, { sectionId: r.sectionId, rank: r.rank });
    }
    const provRank = new Map<string, number>();
    const sectionOf = new Map<string, string>();
    const fileOf = new Map<string, string>();
    let p = 0;
    for (const [sym, files] of GLOBAL_INDEX.symbols) {
        for (const abs of files) {
            const rel = relPath(abs);
            const hit = secOfFile.get(rel);
            if (hit) { provRank.set(sym, ++p); sectionOf.set(sym, hit.sectionId); fileOf.set(sym, rel); break; }
            if (!fileOf.has(sym)) fileOf.set(sym, rel);
        }
    }
    // Channel B (lexical, full repo — the safety net; never restricted to wiki-listed files).
    const lex = lexicalSeeds(question);
    const lexRank = new Map<string, number>();
    [...lex.lexical.entries()].sort((a, b) => b[1] - a[1]).forEach(([sym], i) => lexRank.set(sym, i + 1));
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
