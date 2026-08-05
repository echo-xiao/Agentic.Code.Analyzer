// Downstream traversal — callees of a symbol, as an ordered call tree. This is the move for
// call-chain questions: the indentation IS the causal order.
import * as path from 'path';
import { GLOBAL_INDEX } from '../indexer/state.js';
import type { EdgeType } from '../indexer/state.js';
import { edgeLabel, filterByLayer, isTestFile, pickRootFile, relPath, resolveEdgeFilter } from './common.js';

export interface DownOpts { depth: number; layer?: string; edgeTypes?: string[]; file?: string; }

export type Callee = { callee: string; edgeType: EdgeType };

// Ranking helpers — hoisted + exported so a diagnostic can compute the EXACT rank the engine uses
// (never reproduce this ranking in a side script; call rankCallees).
const centralityOf = (sym: string): number => {
    const cp = GLOBAL_INDEX.symbols.get(sym);
    if (!cp) return 0;
    return Math.max(0, ...Array.from(cp).map(p => GLOBAL_INDEX.fileDependents.get(p)?.size ?? 0));
};
const isTestSym = (sym: string): boolean => {
    const cp = GLOBAL_INDEX.symbols.get(sym);
    return cp ? Array.from(cp).every(p => isTestFile(p)) : false;
};
const isRealSym = (sym: string): boolean => GLOBAL_INDEX.symbols.has(sym);   // RC symbol vs built-in/external
const effCent = (sym: string): number => { const c = centralityOf(sym); return c > 40 ? 0 : c; };

// Build the caller→callee index once (same as graphDown uses internally).
export function buildCalleesOf(edgeTypes?: string[]): Map<string, Callee[]> {
    const edgeAllowed = resolveEdgeFilter(edgeTypes);
    const calleesOf = new Map<string, Callee[]>();
    for (const [callee, callersList] of GLOBAL_INDEX.callGraph.entries()) {
        for (const { caller, edgeType } of callersList as Array<{ caller: string; edgeType: string }>) {
            if (!edgeAllowed(edgeType as EdgeType)) continue;
            if (!calleesOf.has(caller)) calleesOf.set(caller, []);
            const arr = calleesOf.get(caller)!;
            if (!arr.some(x => x.callee === callee)) arr.push({ callee, edgeType: edgeType as EdgeType });
        }
    }
    return calleesOf;
}

// Rank a symbol's callees exactly the way graphDown does before it truncates to the shown top-6:
// test last · type-refs last · real RC symbols before built-ins · then effective-centrality DESC
// (extreme glue, fan-in>40, flattened to 0 and demoted; the chain-SPECIFIC low-fan-in step ranks above it).
export function rankCallees(entries: Callee[]): Callee[] {
    return [...entries].sort((a, b) =>
        (isTestSym(a.callee) ? 1 : 0) - (isTestSym(b.callee) ? 1 : 0) ||
        (a.edgeType === 'type' ? 1 : 0) - (b.edgeType === 'type' ? 1 : 0) ||
        (isRealSym(b.callee) ? 1 : 0) - (isRealSym(a.callee) ? 1 : 0) ||
        effCent(b.callee) - effCent(a.callee));
}

export function graphDown(query: string, opts: DownOpts): string {
    const { depth: maxDepth, layer, edgeTypes, file: preferredFile } = opts;
    const calleesOf = buildCalleesOf(edgeTypes);

    const symbolFiles = GLOBAL_INDEX.symbols.get(query);
    if (!symbolFiles || symbolFiles.size === 0) {
        return `Symbol "${query}" not found. Use search first.`;
    }
    let startFiles = Array.from(symbolFiles);
    if (layer) { const f = filterByLayer(startFiles, layer); if (f.length) startFiles = f; }
    const rootDown = pickRootFile(startFiles, preferredFile);

    const out: string[] = [
        `## Call Graph ↓ downstream of \`${query}\` (depth=${maxDepth})\n`,
        `📍 \`${query}\` · ${relPath(rootDown)}`,
    ];
    const visited = new Set<string>();

    const traverseDown = (sym: string, indent: number, d: number) => {
        if (d <= 0) return;
        const entries = calleesOf.get(sym) ?? [];
        const filtered = layer
            ? entries.filter(e => {
                const files = GLOBAL_INDEX.symbols.get(e.callee);
                return !files || filterByLayer(Array.from(files), layer, true).length > 0;
            })
            : entries;

        // Rank children exactly as rankCallees (extracted to module scope so a diagnostic reproduces the
        // EXACT engine ranking): test last · type-refs last · real before built-ins · effective-centrality DESC.
        const ranked = rankCallees(filtered);
        const shown = ranked.slice(0, 6);
        for (const { callee, edgeType } of shown) {
            const key = `${sym}→${callee}`;
            const pad = '  '.repeat(indent);
            const label = edgeLabel[edgeType] ?? '';
            if (visited.has(key)) { out.push(`${pad}→ \`${callee}\`${label} ↩`); continue; }
            visited.add(key);
            const cp = GLOBAL_INDEX.symbols.get(callee);
            const rf = cp ? path.basename(Array.from(cp)[0]) : '';
            out.push(`${pad}→ \`${callee}\`${label}${rf ? ` · ${rf}` : ''}`);
            traverseDown(callee, indent + 1, d - 1);
        }
        if (filtered.length > 6) out.push(`${'  '.repeat(indent)}… +${filtered.length - 6} more`);
    };

    traverseDown(query, 1, maxDepth);
    if (out.length <= 2) out.push('  (no callees found in index)');
    return out.join('\n');
}
