// Upstream traversal — who depends on this symbol, layered hop by hop (blast radius). One
// implementation serves both "who calls X" and "what breaks if I change X": the answer shape is
// the same, a hop×edge-type layered list of dependents.
//
// Scoping: static edges (call/new/jsx/type) are pruned to files that actually import the source
// file — symbol-name collisions otherwise pull in unrelated callers. Dynamic string-dispatch edges
// (event/pubsub/rest/stream) carry no import relationship and are kept unconditionally.
import { GLOBAL_INDEX } from '../indexer/state.js';
import type { EdgeType } from '../indexer/state.js';
import {
    computeImportDistances, edgeLabel, filterByLayer,
    isDynamicEdge, isTestFile, pickRootFile, relPath, resolveEdgeFilter,
} from './common.js';

export interface UpOpts { depth: number; layer?: string; edgeTypes?: string[]; file?: string; }

export function graphUp(query: string, opts: UpOpts): string {
    const { depth: maxDepth, layer, edgeTypes, file: preferredFile } = opts;
    const edgeAllowed = resolveEdgeFilter(edgeTypes);

    const symbolFiles = GLOBAL_INDEX.symbols.get(query);
    if (!symbolFiles && !GLOBAL_INDEX.callGraph.has(query)) {
        return `Symbol "${query}" not found. Use search first.`;
    }

    let relStart = '(unknown file)';
    let startFile = '';
    if (symbolFiles) {
        let files = Array.from(symbolFiles);
        if (layer) { const f = filterByLayer(files, layer); if (f.length) files = f; }
        startFile = pickRootFile(files, preferredFile);
        relStart = relPath(startFile);
    }
    const importDist = startFile ? computeImportDistances(startFile) : new Map<string, number>();

    const scopeCallers = (
        callers: Array<{ caller: string; file: string; edgeType: EdgeType }>,
        fromFile: string | null
    ) => {
        if (!fromFile) return callers;
        const importers = GLOBAL_INDEX.fileDependents.get(fromFile);
        if (!importers || importers.size === 0) return callers;
        const scoped = callers.filter(c => importers.has(c.file) || c.file === fromFile);
        return scoped.length > 0 ? scoped : callers;
    };

    const out: string[] = [
        `## Callers ↑ of \`${query}\` — blast radius (depth=${maxDepth})\n`,
        `📍 \`${query}\` · ${relStart}\n`,
    ];

    const visited = new Set<string>();
    let frontier: Array<{ sym: string; file: string }> = [{ sym: query, file: startFile }];
    visited.add(`${query}@${startFile}`);

    for (let hop = 1; hop <= maxDepth && frontier.length > 0; hop++) {
        const nextFrontier: Array<{ sym: string; file: string }> = [];
        const layerEntries: Array<{ sym: string; file: string; edgeType: EdgeType }> = [];

        for (const { sym, file: fromFile } of frontier) {
            const allCallers = (GLOBAL_INDEX.callGraph.get(sym) ?? []) as Array<{ caller: string; file: string; edgeType: EdgeType }>;
            // Scope only static edges by import relationship; keep dynamic (event/pubsub) deps unconditionally.
            const staticScoped = scopeCallers(allCallers.filter(c => !isDynamicEdge(c.edgeType as EdgeType)), fromFile);
            const dynamic = allCallers.filter(c => isDynamicEdge(c.edgeType as EdgeType));
            const callers = [...staticScoped, ...dynamic];
            for (const { caller, file, edgeType } of callers) {
                if (!edgeAllowed(edgeType as EdgeType)) continue;
                if (layer && filterByLayer([file], layer, true).length === 0) continue;
                if (isTestFile(file)) continue;
                const key = `${caller}@${file}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    nextFrontier.push({ sym: caller, file });
                    layerEntries.push({ sym: caller, file, edgeType: edgeType as EdgeType });
                }
            }
        }

        if (layerEntries.length === 0) break;

        const byType = new Map<EdgeType, typeof layerEntries>();
        for (const e of layerEntries) {
            if (!byType.has(e.edgeType)) byType.set(e.edgeType, []);
            byType.get(e.edgeType)!.push(e);
        }

        const hopLabel = hop === 1 ? 'Direct callers' : hop === 2 ? 'Indirect dependents' : `${hop}-hop dependents`;
        out.push(`### ${hopLabel} (${layerEntries.length} symbols)\n`);

        for (const [et, entries] of byType.entries()) {
            const label = edgeLabel[et] || '[call]';
            out.push(`**${label.trim() || 'call'}** (${entries.length}):`);
            // Import distance from the traversal root ranks true dependents above coincidental
            // name-sharers pulled in through unscoped dynamic edges.
            const sorted = [...entries].sort((a, b) =>
                (importDist.get(a.file) ?? Infinity) - (importDist.get(b.file) ?? Infinity));
            const shown = sorted.slice(0, 15);
            for (const { sym, file } of shown) {
                out.push(`  · \`${sym}\` — ${relPath(file)}`);
            }
            if (entries.length > 15) out.push(`  … +${entries.length - 15} more`);
        }
        out.push('');

        frontier = nextFrontier;
    }

    if (out.length <= 3) out.push('  (no dependents found — symbol may be a leaf node, or try without layer filter)');
    return out.join('\n');
}
