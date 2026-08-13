// state.ts — the in-memory index the pipeline reads.
//
// Keyed by defId (`<repo-relative file>#<qualified name>`), not by bare name. That single change
// is what makes fanIn count one definition instead of every same-named thing in the repo, lets two
// `encrypt` functions stay apart, and removes the need to guess which file a name meant.
import type { Def } from './defs.js';
import type { Edge } from './graph-build.js';
import type { SiblingRef } from './dispatch.js';
import type { Override } from './overrides.js';

// Four static kinds plus three dispatch kinds. The old twelve-value union conflated registries
// (callbacks and service events shared `event_emit`) and stored a handler in the same field as a
// key, so the same edge type meant different things depending on the call site.
export type EdgeType =
    | 'call' | 'new' | 'jsx' | 'type'
    | 'registers' | 'dispatches' | 'handles'
    // Interface or abstract member -> the class member implementing it. Without it a call on a
    // proxified service ends at a signature with no body: 634 such dead ends, 2332 edges absorbed.
    | 'implements';

// The twelve-value union the old text-matching extractor emitted. Kept only until its consumers
// (extract-edges.ts, indexer/skeleton.ts, the pipeline's name-keyed traversal) are removed in the
// cutover; nothing new may produce these.
export type LegacyEdgeType =
    | 'call' | 'jsx' | 'new' | 'event_emit' | 'event_listen' | 'pubsub_publish' | 'pubsub_subscribe'
    | 'rest_call' | 'rest_route' | 'stream_def' | 'stream_sub' | 'type';

export interface CallEdge { name: string; edgeType: LegacyEdgeType; event?: string }
export interface CallerRef { caller: string; file: string; edgeType: LegacyEdgeType }

export interface IndexStats {
    bound: number;
    external: number;
    unbound: number;
    failedFiles: number;
    // Edges whose target is in no shard's def list. Counted rather than loaded: such an edge
    // renders as a node with no body, which is worse than a missing edge.
    droppedEdges: number;
}

export const GLOBAL_INDEX = {
    defs:      new Map<string, Def>(),
    // Name -> defIds. For chain entry only — question to symbol name to candidates. Never used to
    // build an edge; edges carry their resolved target.
    byName:    new Map<string, string[]>(),
    out:       new Map<string, Edge[]>(),
    in:        new Map<string, Edge[]>(),
    dispatch:  new Map<string, SiblingRef[]>(),
    overrides: new Map<string, Override[]>(),
    allFiles:  new Set<string>(),
    stats:     { bound: 0, external: 0, unbound: 0, failedFiles: 0, droppedEdges: 0 } as IndexStats,

    // --- legacy, name-keyed. Deleted in the cutover along with their last reader. ---
    // They stay for now so the new store can land without dragging the whole pipeline with it:
    // every symptom in the design traces to these three being keyed by bare name.
    symbols:        new Map<string, Set<string>>(),
    fileDependents: new Map<string, Set<string>>(),
    callGraph:      new Map<string, Array<CallerRef>>(),
};

export function resetGlobalIndex(): void {
    GLOBAL_INDEX.defs.clear();
    GLOBAL_INDEX.byName.clear();
    GLOBAL_INDEX.out.clear();
    GLOBAL_INDEX.in.clear();
    GLOBAL_INDEX.dispatch.clear();
    GLOBAL_INDEX.overrides.clear();
    GLOBAL_INDEX.allFiles.clear();
    GLOBAL_INDEX.stats = { bound: 0, external: 0, unbound: 0, failedFiles: 0, droppedEdges: 0 };
    GLOBAL_INDEX.symbols.clear();
    GLOBAL_INDEX.fileDependents.clear();
    GLOBAL_INDEX.callGraph.clear();
}
