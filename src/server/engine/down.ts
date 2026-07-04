// Downstream traversal — callees of a symbol, as an ordered call tree. This is the move for
// call-chain questions: the indentation IS the causal order.
import * as path from 'path';
import { GLOBAL_INDEX } from '../../indexer/state.js';
import type { EdgeType } from '../../indexer/state.js';
import { edgeLabel, filterByLayer, isTestFile, pickRootFile, relPath, resolveEdgeFilter } from './common.js';

export interface DownOpts { depth: number; layer?: string; edgeTypes?: string[]; file?: string; }

export function graphDown(query: string, opts: DownOpts): string {
    const { depth: maxDepth, layer, edgeTypes, file: preferredFile } = opts;
    const edgeAllowed = resolveEdgeFilter(edgeTypes);

    // Reverse the caller→callee index once per call: callGraph stores "who references X".
    const calleesOf = new Map<string, Array<{ callee: string; edgeType: EdgeType }>>();
    for (const [callee, callersList] of GLOBAL_INDEX.callGraph.entries()) {
        for (const { caller, edgeType } of callersList) {
            if (!edgeAllowed(edgeType as EdgeType)) continue;
            if (!calleesOf.has(caller)) calleesOf.set(caller, []);
            const arr = calleesOf.get(caller)!;
            if (!arr.some(x => x.callee === callee)) arr.push({ callee, edgeType: edgeType as EdgeType });
        }
    }

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

        // Rank children by relevance before truncating. For a call CHAIN the meaningful callee is the
        // chain-SPECIFIC function, NOT the most-reused utility — so demote, in order: (a) test symbols,
        // (b) `type` references (they are type deps, not call-chain steps), (c) high-fan-in generic glue
        // (Date/findOneById/model accessors called everywhere) via a hub penalty. Ranking by centrality
        // DESC (the old behavior) surfaced exactly this glue and buried the real next step
        // (e.g. executeSendMessage→canSendMessageAsync was pushed out of the shown top-6). Lower fan-in
        // ⇒ more specific ⇒ ranked first.
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
        // Effective centrality: cap it so only EXTREME glue (findOneById/model accessors, fan-in ≫40)
        // is flattened to 0 and demoted; ordinary chain callees keep their (moderate) centrality so a
        // meaningful step (sendMessage, canSendMessageAsync) ranks above an obscure fan-in-1 collision.
        const effCent = (sym: string): number => { const c = centralityOf(sym); return c > 40 ? 0 : c; };
        const ranked = [...filtered].sort((a, b) =>
            (isTestSym(a.callee) ? 1 : 0) - (isTestSym(b.callee) ? 1 : 0) ||          // test last
            (a.edgeType === 'type' ? 1 : 0) - (b.edgeType === 'type' ? 1 : 0) ||      // type refs last
            (isRealSym(b.callee) ? 1 : 0) - (isRealSym(a.callee) ? 1 : 0) ||          // real RC symbols before built-ins (Date/Boolean/…)
            effCent(b.callee) - effCent(a.callee));                                    // among real: moderate-centrality chain steps first, extreme glue demoted
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
