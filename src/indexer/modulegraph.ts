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
    subsystems: Array<{ id: string; label: string; moduleIds: string[]; fileCount: number }>;
    modules: Array<{ id: string; subsystem: string; anchor: string; label: string; files: string[]; entryFiles: string[]; edges: Array<[string, string, number]> }>;
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
    // Prefer non-barrel files (not index.ts/index.tsx/index.js)
    const nonBarrels = files.filter(f => !/\/index\.(tsx?|js)$/.test(f));
    const candidates = nonBarrels.length > 0 ? nonBarrels : files;
    return [...candidates].sort((a, b) => (fanIn.get(b) ?? 0) - (fanIn.get(a) ?? 0) || a.localeCompare(b))[0];
}

// 供 build 用:hub 降权后的边权
export function hubPenalizedWeight(w: number, fanInA: number, fanInB: number): number {
    const hub = fanInA >= HUB_FANIN || fanInB >= HUB_FANIN;
    return hub ? w * 0.1 : w;
}

/** Returns true if the file is a test/spec/e2e/stories/page-objects file. */
export function isTestFile(f: string): boolean {
    return /(^|\/)tests?\//.test(f) || /\.(test|spec)\./.test(f) || /e2e/.test(f) || /page-objects/.test(f) || /\.stories\./.test(f);
}

/** Extract the conceptual feature/subsystem key from a rel path. */
export function featureKey(f0: string): string {
    const ee = f0.startsWith('ee/') ? 'ee:' : '';
    const f = f0.replace(/^ee\//, '');
    const s = f.split('/');
    const at = (i: number) => s[i] && !/\.(tsx?|js)$/.test(s[i]);
    let i;
    if ((i = s.indexOf('packages')) >= 0 && at(i + 1)) return ee + 'pkg:' + s[i + 1];
    if ((i = s.indexOf('app')) >= 0 && at(i + 1)) return ee + s[i + 1];
    if ((i = s.indexOf('views')) >= 0 && at(i + 1)) return ee + s[i + 1];
    if ((i = s.indexOf('components')) >= 0 && at(i + 1)) return ee + 'ui:' + s[i + 1];
    if ((i = s.indexOf('server')) >= 0 && at(i + 1)) return ee + s[i + 1];
    if ((i = s.indexOf('client')) >= 0 && at(i + 1)) return ee + s[i + 1];
    return ee + s.slice(0, Math.min(3, s.length - 1)).join('/');
}

// Cross-layer edge types get higher base weight
const CROSS_LAYER_TYPES = new Set([
    'event_emit', 'event_listen', 'pubsub_publish', 'pubsub_subscribe',
    'rest_call', 'rest_route', 'stream_def', 'stream_sub',
]);

const MAX_SUBDIVIDE_DEPTH = 3;
const SUBDIVIDE_THRESHOLD = 250;

/**
 * Recursively subdivide a group of files into sub-modules using clusterModules.
 * Returns array of file arrays (leaf clusters).
 */
function subdivide(
    files: string[],
    allEdges: Array<[string, string, number]>,
    depth: number,
): string[][] {
    if (files.length <= SUBDIVIDE_THRESHOLD || depth >= MAX_SUBDIVIDE_DEPTH) {
        return [files];
    }
    const fileSet = new Set(files);
    // Build induced subgraph edges
    const subEdges = allEdges.filter(([a, b]) => fileSet.has(a) && fileSet.has(b));
    const clusters = clusterModules({ nodes: files, edges: subEdges });
    if (clusters.length <= 1) {
        // Cannot subdivide further
        return [files];
    }
    const result: string[][] = [];
    for (const { files: subFiles } of clusters) {
        if (subFiles.length === 0) continue;
        for (const leaf of subdivide(subFiles, allEdges, depth + 1)) {
            result.push(leaf);
        }
    }
    return result;
}

export function buildModuleGraph(): ModuleGraph {
    // 1. fan-in (fileDependents size, using rel paths)
    const fanIn = new Map<string, number>();
    for (const [target, importers] of GLOBAL_INDEX.fileDependents) {
        fanIn.set(relPathOf(target), importers.size);
    }

    // 2. Build file graph edges (imports + call + cross-layer, hub-penalized)
    const rawEdges = new Map<string, number>();
    const addEdge = (a: string, b: string, w = 1) => {
        if (a === b) return;
        const key = a < b ? `${a}\0${b}` : `${b}\0${a}`;
        rawEdges.set(key, (rawEdges.get(key) ?? 0) + w);
    };

    // Import edges from fileDependents
    for (const [target, importers] of GLOBAL_INDEX.fileDependents) {
        const tb = relPathOf(target);
        for (const imp of importers) addEdge(relPathOf(imp), tb, 1);
    }

    // Call edges from callGraph
    for (const [callee, callerRefs] of GLOBAL_INDEX.callGraph) {
        const defFiles = GLOBAL_INDEX.symbols.get(callee);
        if (!defFiles) continue;
        for (const defFile of defFiles) {
            const df = relPathOf(defFile);
            for (const { file, edgeType } of callerRefs) {
                const cf = relPathOf(file);
                const w = CROSS_LAYER_TYPES.has(edgeType) ? 3 : 1;
                addEdge(cf, df, w);
            }
        }
    }

    const nodeSet = new Set<string>();
    const allEdges: Array<[string, string, number]> = [];
    for (const [key, w] of rawEdges) {
        const [a, b] = key.split('\0');
        nodeSet.add(a); nodeSet.add(b);
        allEdges.push([a, b, hubPenalizedWeight(w, fanIn.get(a) ?? 0, fanIn.get(b) ?? 0)]);
    }
    // Isolated files also get nodes
    for (const f of GLOBAL_INDEX.allFiles) nodeSet.add(relPathOf(f));

    // 3. Assign every rel file to a subsystem key
    const subsystemGroups = new Map<string, string[]>();
    for (const f of nodeSet) {
        const key = isTestFile(f) ? 'tests' : featureKey(f);
        (subsystemGroups.get(key) ?? subsystemGroups.set(key, []).get(key)!).push(f);
    }

    // 4 & 5. Build modules: subdivide large groups; assign anchor/label/entryFiles
    const modules: ModuleGraph['modules'] = [];
    const file_to_module: Record<string, string> = {};

    for (const [subsystemId, groupFiles] of subsystemGroups) {
        // Tests subsystem: one flat module, no recursion
        if (subsystemId === 'tests' || groupFiles.length <= SUBDIVIDE_THRESHOLD) {
            const anchor = assignAnchor(groupFiles, fanIn);
            const anchorBase = path.basename(anchor).replace(/\.(tsx?|js)$/, '');
            const moduleId = subsystemId;
            const entryFiles = [...groupFiles]
                .sort((a, b) => (fanIn.get(b) ?? 0) - (fanIn.get(a) ?? 0))
                .slice(0, 5);
            for (const f of groupFiles) file_to_module[f] = moduleId;
            modules.push({
                id: moduleId,
                subsystem: subsystemId,
                anchor,
                label: anchorBase,
                files: groupFiles,
                entryFiles,
                edges: [],
            });
        } else {
            // Recursively subdivide
            const leafClusters = subdivide(groupFiles, allEdges, 0);
            for (const leafFiles of leafClusters) {
                if (leafFiles.length === 0) continue;
                const anchor = assignAnchor(leafFiles, fanIn);
                const anchorBase = path.basename(anchor).replace(/\.(tsx?|js)$/, '');
                const moduleId = leafClusters.length === 1
                    ? subsystemId
                    : `${subsystemId}/${anchorBase}`;
                const entryFiles = [...leafFiles]
                    .sort((a, b) => (fanIn.get(b) ?? 0) - (fanIn.get(a) ?? 0))
                    .slice(0, 5);
                for (const f of leafFiles) file_to_module[f] = moduleId;
                modules.push({
                    id: moduleId,
                    subsystem: subsystemId,
                    anchor,
                    label: anchorBase,
                    files: leafFiles,
                    entryFiles,
                    edges: [],
                });
            }
        }
    }

    // 6. Module→module edges (cross-module ref counts from allEdges)
    const modOf = (f: string) => file_to_module[f];
    const modEdge = new Map<string, number>();
    for (const [a, b] of allEdges) {
        const ma = modOf(a), mb = modOf(b);
        if (!ma || !mb || ma === mb) continue;
        const k = ma < mb ? `${ma}\0${mb}` : `${mb}\0${ma}`;
        modEdge.set(k, (modEdge.get(k) ?? 0) + 1);
    }
    const byMod = new Map(modules.map(m => [m.id, m]));
    for (const [k, w] of modEdge) {
        const [ma, mb] = k.split('\0');
        byMod.get(ma)?.edges.push([ma, mb, w]);
    }

    // Build subsystems (group modules by subsystem key; fileCount = sum)
    const subsystemMap = new Map<string, { moduleIds: string[]; fileCount: number }>();
    for (const m of modules) {
        const entry = subsystemMap.get(m.subsystem) ?? subsystemMap.set(m.subsystem, { moduleIds: [], fileCount: 0 }).get(m.subsystem)!;
        entry.moduleIds.push(m.id);
        entry.fileCount += m.files.length;
    }
    const subsystems: ModuleGraph['subsystems'] = [];
    for (const [id, { moduleIds, fileCount }] of subsystemMap) {
        subsystems.push({ id, label: id, moduleIds, fileCount });
    }

    const out: ModuleGraph = { subsystems, modules, file_to_module };
    fs.mkdirSync(INDEX_DIR, { recursive: true });
    fs.writeFileSync(MODULE_GRAPH_PATH, JSON.stringify(out), 'utf-8');
    return out;
}
