// src/indexer/modulegraph.ts
import Graph from 'graphology';
import louvain from 'graphology-communities-louvain';
import * as fs from 'fs';
import * as path from 'path';
import { GLOBAL_INDEX } from './state.js';
import { relPathOf } from './chunks.js';
import { MODULE_GRAPH_PATH, INDEX_DIR } from '../config.js';

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

function jaccard(a: Set<string>, b: Set<string>): number {
    let inter = 0; for (const x of a) if (b.has(x)) inter++;
    const uni = a.size + b.size - inter;
    return uni === 0 ? 0 : inter / uni;
}

export function stableId(newFiles: string[], prev: Array<{ id: string; files: string[] }>, anchor: string): string {
    const nf = new Set(newFiles);
    let best = { id: '', score: 0 };
    for (const m of prev) {
        const s = jaccard(nf, new Set(m.files));
        if (s > best.score) best = { id: m.id, score: s };
    }
    if (best.score >= 0.5) return best.id;
    return 'mod:' + path.basename(anchor).replace(/\.(tsx?|js)$/, '');
}

export function buildModuleGraph(): ModuleGraph {
    // 1. fan-in(fileDependents 大小,用 rel 文件)
    const fanIn = new Map<string, number>();
    for (const [target, importers] of GLOBAL_INDEX.fileDependents) {
        fanIn.set(relPathOf(target), importers.size);
    }
    // 2. 文件互引无向图(A import B → A-B 一条边;hub 降权)
    const rawEdges = new Map<string, number>();
    const addEdge = (a: string, b: string) => {
        if (a === b) return;
        const key = a < b ? `${a}\0${b}` : `${b}\0${a}`;
        rawEdges.set(key, (rawEdges.get(key) ?? 0) + 1);
    };
    for (const [target, importers] of GLOBAL_INDEX.fileDependents) {
        const tb = relPathOf(target);
        for (const imp of importers) addEdge(relPathOf(imp), tb);
    }
    const nodeSet = new Set<string>();
    const edges: Array<[string, string, number]> = [];
    for (const [key, w] of rawEdges) {
        const [a, b] = key.split('\0');
        nodeSet.add(a); nodeSet.add(b);
        edges.push([a, b, hubPenalizedWeight(w, fanIn.get(a) ?? 0, fanIn.get(b) ?? 0)]);
    }
    // 孤立文件也进节点(否则漏)
    for (const f of GLOBAL_INDEX.allFiles) nodeSet.add(relPathOf(f));
    const nodes = [...nodeSet];

    // 3. 聚类
    const comms = clusterModules({ nodes, edges });

    // 4. 读旧图做 id 继承
    let prevModules: Array<{ id: string; files: string[] }> = [];
    try { prevModules = (JSON.parse(fs.readFileSync(MODULE_GRAPH_PATH, 'utf-8')) as ModuleGraph).modules; } catch { /* 首次无旧图 */ }

    // 5. 组装 module-graph
    const modules: ModuleGraph['modules'] = [];
    const file_to_module: Record<string, string> = {};
    const usedIds = new Set<string>();
    for (const { files } of comms) {
        if (files.length === 0) continue;
        const anchor = assignAnchor(files, fanIn);
        let id = stableId(files, prevModules, anchor);
        while (usedIds.has(id)) id += '_';   // 去重同名新 id
        usedIds.add(id);
        const entryFiles = [...files].sort((a, b) => (fanIn.get(b) ?? 0) - (fanIn.get(a) ?? 0)).slice(0, 5);
        for (const f of files) file_to_module[f] = id;
        modules.push({ id, anchor, label: id.replace(/^mod:/, ''), files, entryFiles, edges: [] });
    }
    // 6. 模块间边(跨社区引用计数)
    const modOf = (f: string) => file_to_module[f];
    const modEdge = new Map<string, number>();
    for (const [a, b] of edges) {
        const ma = modOf(a), mb = modOf(b);
        if (!ma || !mb || ma === mb) continue;
        const k = ma < mb ? `${ma}\0${mb}` : `${mb}\0${ma}`;
        modEdge.set(k, (modEdge.get(k) ?? 0) + 1);
    }
    const byMod = new Map(modules.map(m => [m.id, m]));
    for (const [k, w] of modEdge) {
        const [ma, mb] = k.split('\0');
        byMod.get(ma)!.edges.push([ma, mb, w]);
    }

    const out: ModuleGraph = { modules, file_to_module };
    fs.mkdirSync(INDEX_DIR, { recursive: true });
    fs.writeFileSync(MODULE_GRAPH_PATH, JSON.stringify(out), 'utf-8');
    return out;
}
