// src/indexer/modulegraph.ts
import Graph from 'graphology';
import louvain from 'graphology-communities-louvain';

export interface FileGraph { nodes: string[]; edges: Array<[string, string, number]> }
export interface ModuleGraph {
    modules: Array<{ id: string; anchor: string; label: string; files: string[]; entryFiles: string[]; edges: Array<[string, string, number]> }>;
    file_to_module: Record<string, string>;
}

// hub 惩罚:fan-in 超阈值的通用文件,其边权压低,避免全图连成一坨(spec §5.4)。
const HUB_FANIN = 60;

export function clusterModules(fg: FileGraph, resolution = 1.0): Array<{ files: string[] }> {
    const g = new Graph({ type: 'undirected', multi: false });
    for (const n of fg.nodes) if (!g.hasNode(n)) g.addNode(n);
    for (const [a, b, w] of fg.edges) {
        if (a === b || !g.hasNode(a) || !g.hasNode(b)) continue;
        if (g.hasEdge(a, b)) g.setEdgeAttribute(a, b, 'weight', g.getEdgeAttribute(a, b, 'weight') + w);
        else g.addEdge(a, b, { weight: w });
    }
    const communities: Record<string, number> = louvain(g, { resolution, getEdgeWeight: 'weight' });
    const byComm = new Map<number, string[]>();
    for (const [node, cid] of Object.entries(communities)) {
        (byComm.get(cid) ?? byComm.set(cid, []).get(cid)!).push(node);
    }
    return [...byComm.values()].map(files => ({ files }));
}

export function assignAnchor(files: string[], fanIn: Map<string, number>): string {
    return [...files].sort((a, b) => (fanIn.get(b) ?? 0) - (fanIn.get(a) ?? 0) || a.localeCompare(b))[0];
}

// 供 build 用:hub 降权后的边权
export function hubPenalizedWeight(w: number, fanInA: number, fanInB: number): number {
    const hub = fanInA >= HUB_FANIN || fanInB >= HUB_FANIN;
    return hub ? w * 0.1 : w;
}
