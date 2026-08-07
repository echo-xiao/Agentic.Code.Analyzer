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
    tied: boolean;                   // this seed shared the top lexical score with others
    prose: string;                   // hit subsections' prose, concatenated
}

// A chain walks in exactly one direction, decided at its entry. Mixing directions inside one
// chain would make indentation mean both "then" and "alongside" at once.
export type ChainMode = 'flow' | 'impact';

// 'dispatch' is a pseudo-node: a string-dispatch KEY (event name / normalized route / pubsub /
// streamer), not a real symbol. It has no definition site and no body -- it exists to carry the
// sibling group of everything wired to that key.
export type NodeKind = 'major' | 'passthrough' | 'hotleaf' | 'boundary' | 'type' | 'dispatch';

export type Direction = 'down' | 'up';

export interface SiblingRef { symbol: string; file: string; edgeType: EdgeType }
export interface SiblingGroup { key: string; refs: SiblingRef[]; total: number }

export interface SkeletonNode {
    id: string;                      // "1a", "2c" — chain number + letter; '' for non-major
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
