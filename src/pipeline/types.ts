// Shared pipeline types. Data flows: RoutedSection[] -> RankedSeed[] -> Chain[] ->
// ChainSkeleton[] -> selected node ids -> Material[] -> answer + QuestionTrace.
import type { EdgeType } from '../indexer/state.js';

export interface RoutedSection { sectionId: string; rank: number }

export interface RankedSeed {
    symbol: string;
    file: string;                    // repo-relative path
    rrf: number;
    signals: { lexicalRank: number | null; provenanceRank: number | null; graphRank: number | null };
    sectionId: string | null;        // provenance section, if any
}

export interface Chain { id: number; label: string; seeds: RankedSeed[]; rrfMass: number }

export interface SkeletonNode {
    id: string;                      // "1a", "2c" — chain number + letter
    symbol: string;
    file: string;
    line: number;                    // call-site or definition line
    snippet: string;                 // the literal source line, trimmed
    kind: 'major' | 'passthrough' | 'hotleaf' | 'boundary';
    edgeType: EdgeType | null;
    children: SkeletonNode[];
}

export interface ChainSkeleton { chain: Chain; roots: SkeletonNode[]; majorCount: number }

export interface Material { nodeId: string; symbol: string; file: string; startLine: number; endLine: number; text: string; tokens: number }

export interface QuestionTrace {
    qid: string; question: string;
    routing: { sections: RoutedSection[]; promptTokens: number };
    seeds: RankedSeed[];
    chains: Array<{ id: number; label: string; budgetShare: number }>;
    skeleton: Array<{ chainId: number; majorCount: number; nodeCount: number; files: string[] }>;
    pathsRaw: string; selectedIds: string[]; droppedIds: string[];
    reading: { materials: Array<{ nodeId: string; file: string; startLine: number; endLine: number; tokens: number }>; evicted: string[] };
    llm: { calls: number; promptTokensEst: number };
}
