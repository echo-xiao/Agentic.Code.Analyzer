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

/** 层/结构目录(不是功能)——找 feature 时跳过,避免 lib/server/client 变成垃圾桶。 */
const LAYER = new Set([
    'apps', 'meteor', 'app', 'client', 'server', 'ee', 'src', 'source',
    'lib', 'libs', 'tests', 'test', '__tests__', '__mocks__', 'unit', 'integration',
    'e2e', 'end-to-end', 'functions', 'methods', 'startup', 'services',
    'views', 'definition', 'definitions', 'index', 'dist', 'build',
    'page-objects', 'fixtures', 'mocks', 'stubs',
]);

// 从路径抽"功能/子系统键":跳过层目录取第一个真功能段;功能跨 client/server/app/tests 自动合并。
// 例 app/livechat/server -> livechat; server/services/omnichannel -> omnichannel;
// tests/unit/server/services/omnichannel-analytics -> omnichannel-analytics(测试归位)。
export function featureKey(f0: string): string {
    const segs = f0.split('/').filter(s => s && !/\.[mc]?[jt]sx?$/.test(s));   // 去掉文件名段
    const pi = segs.indexOf('packages');
    if (pi >= 0 && segs[pi + 1]) return 'pkg:' + segs[pi + 1];                  // 包 = 单元
    const feature = segs.find(s => !LAYER.has(s) && s !== 'packages');          // 第一个非层目录 = 功能
    if (feature) return feature;
    const area = segs.find(s => s === 'app' || s === 'client' || s === 'server' || s === 'ee') ?? 'root';
    return `${area}:${segs[segs.length - 1] ?? 'misc'}`;                        // 纯通用:按区命名,别全并一坨
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
        const key = featureKey(f);   // 测试也走 featureKey → 归到对应功能(featureKey 跳过 tests/unit 等层目录)
        (subsystemGroups.get(key) ?? subsystemGroups.set(key, []).get(key)!).push(f);
    }

    // 4 & 5. Build modules: subdivide large groups; assign anchor/label/entryFiles
    const modules: ModuleGraph['modules'] = [];
    const file_to_module: Record<string, string> = {};
    const usedIds = new Set<string>();

    for (const [subsystemId, groupFiles] of subsystemGroups) {
        // Tests subsystem: one flat module, no recursion
        if (subsystemId === 'tests' || groupFiles.length <= SUBDIVIDE_THRESHOLD) {
            const anchor = assignAnchor(groupFiles, fanIn);
            const anchorBase = path.basename(anchor).replace(/\.(tsx?|js)$/, '');
            let moduleId = subsystemId;

            // Deduplicate id if already used
            if (usedIds.has(moduleId)) {
                let k = 2;
                while (usedIds.has(`${moduleId}-${k}`)) k++;
                moduleId = `${moduleId}-${k}`;
            }
            usedIds.add(moduleId);

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
                let moduleId = leafClusters.length === 1
                    ? subsystemId
                    : `${subsystemId}/${anchorBase}`;

                // Deduplicate id if already used
                if (usedIds.has(moduleId)) {
                    let k = 2;
                    while (usedIds.has(`${moduleId}-${k}`)) k++;
                    moduleId = `${moduleId}-${k}`;
                }
                usedIds.add(moduleId);

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

    // 5.5 合并过碎尾巴:每个子系统内 ≤MERGE_MAX 文件的小模块并进本子系统最大模块(减模块数;去掉 47% 数量/5% 代码的琐碎尾巴)。
    //      单模块子系统天然不动(无可并);全是小模块的子系统 → 并成一个。合并在建边前做,边按合并后的 file_to_module 聚合。
    const MERGE_MAX = 3;
    const subMods = new Map<string, ModuleGraph['modules']>();
    for (const m of modules) (subMods.get(m.subsystem) ?? subMods.set(m.subsystem, []).get(m.subsystem)!).push(m);
    const reEntry = (m: ModuleGraph['modules'][number]) => { m.entryFiles = [...m.files].sort((a, b) => (fanIn.get(b) ?? 0) - (fanIn.get(a) ?? 0)).slice(0, 5); };
    const kept: ModuleGraph['modules'] = [];
    for (const [, mods] of subMods) {
        if (mods.length === 1) { kept.push(mods[0]); continue; }
        const big = mods.filter(m => m.files.length > MERGE_MAX);
        const small = mods.filter(m => m.files.length <= MERGE_MAX);
        if (big.length === 0) {                                                   // 全小 → 并成一个(最大的当宿主)
            const host = mods.slice().sort((a, b) => b.files.length - a.files.length)[0];
            for (const s of mods) if (s !== host) for (const f of s.files) { host.files.push(f); file_to_module[f] = host.id; }
            reEntry(host); kept.push(host); continue;
        }
        const host = big.slice().sort((a, b) => b.files.length - a.files.length)[0];
        for (const s of small) for (const f of s.files) { host.files.push(f); file_to_module[f] = host.id; }
        for (const b of big) reEntry(b);
        kept.push(...big);
    }
    modules.length = 0; modules.push(...kept);

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
