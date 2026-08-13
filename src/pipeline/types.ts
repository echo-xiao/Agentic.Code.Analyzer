// Shared pipeline types. Data flows: RoutedSection[] -> Chain[] (one per admitted section)
// -> ChainSkeleton[] -> read order (all major node ids) -> Material[] -> answer + QuestionTrace.
import type { EdgeType } from '../indexer/state.js';

export interface RoutedSection { path: string; rank: number }

export interface ChainSeed { symbol: string; file: string }

export interface Chain {
    id: number;
    pageId: string;
    sections: string[];              // the hit subsection paths this chain was built from
    label: string;                   // "page › subsection · seed" for display
    seed: ChainSeed;
    score: number;                   // the seed's lexical score; comparable ACROSS pools
    tied: boolean;                   // this seed shared the top lexical score with others
    prose: string;                   // hit subsections' prose, concatenated
}

// A chain walks in exactly one direction, decided at its entry. Mixing directions inside one
// chain would make indentation mean both "then" and "alongside" at once.
export type ChainMode = 'flow' | 'impact';

// 'dispatch' is a pseudo-node: a string-dispatch KEY (event name / normalized route / pubsub /
// streamer), not a real symbol. It has no definition site and no body -- it exists to carry the
// sibling group of everything wired to that key.
// No 'boundary': a package hop is an ordinary edge now. It existed because the traversal cut any
// edge leaving the anchor's top-level path, which discarded 40.5% of unambiguous edges.
export type NodeKind = 'major' | 'passthrough' | 'hotleaf' | 'type' | 'dispatch';

export type Direction = 'down' | 'up';

export interface SiblingRef { symbol: string; file: string; edgeType: EdgeType }
export interface SiblingGroup { key: string; refs: SiblingRef[]; total: number }

export interface SkeletonNode {
    id: string;                      // "1a", "2c" — chain number + letter; '' for non-major
    // Definition id. A node IS a definition, so nothing downstream has to locate it by name:
    // the reader opens defs[defId].file at its recorded line range.
    defId?: string;
    // Set when this definition's registry key has a second implementation. An edge into the CE
    // class looks complete on its own, and under a licence the EE class is what runs.
    overrides?: import('../indexer/overrides.js').Override[];
    // How many classes implement this interface member. Present on interface nodes with more than
    // one implementation, so a fork is visible rather than reading as a single destination.
    implCount?: number;
    symbol: string;
    file: string;                    // '' for dispatch pseudo-nodes
    line: number;
    snippet: string;
    kind: NodeKind;
    direction: Direction;            // how this node was reached from its parent
    edgeType: EdgeType | null;
    siblings?: SiblingGroup;         // dispatch nodes only
    children: SkeletonNode[];
}

export interface ChainSkeleton {
    chain: Chain;
    mode: ChainMode;
    roots: SkeletonNode[];
    majorCount: number;
    nodeCount: number;
    maxDepthReached: number;
    rerooted?: { from: string; to: string };   // flow chains only: entry moved one hop upstream
}

export interface Material { nodeId: string; symbol: string; file: string; startLine: number; endLine: number; text: string; tokens: number }

export interface PoolStat {
    pageId: string;
    sections: string[];
    fileCount: number;
    symbolCount: number;
    seeds: string[];                 // empty => whole pool scored zero, no chain built
}

export interface QuestionTrace {
    qid: string; question: string;
    routing: { sections: RoutedSection[]; promptTokens: number };
    pools: PoolStat[];
    // Chains are built for every seed, then the redundant ones are dropped before the quota is
    // spent: expanded = built, droppedRedundant = duplicate or subset, kept = what reached step 4.
    candidates: { expanded: number; droppedRedundant: number; kept: number };
    chains: Array<{
        id: number; label: string; mode: ChainMode;
        seed: ChainSeed; tied: boolean;
        rerooted?: { from: string; to: string };
    }>;
    skeleton: Array<{ chainId: number; majorCount: number; nodeCount: number; maxDepthReached: number; files: string[] }>;
    skeletonText: string;
    selection: { kept: number[]; dropped: number[] };
    readIds: string[];
    reading: { materials: Array<{ nodeId: string; file: string; startLine: number; endLine: number; tokens: number }>; unread: string[]; cappedOut: boolean };
    llm: { calls: number; promptTokensEst: number };
}
