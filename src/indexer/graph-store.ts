// graph-store.ts — shards and the dispatch artifact on disk, and loading them into GLOBAL_INDEX.
//
// The shards ARE the cache. There is no second serialization of the in-memory index: the old
// `.global_index.json` existed because the per-file mappings were too slow to re-read, and one
// file per package is not.
import * as fs from 'fs';
import * as path from 'path';
import { GRAPH_DIR } from '../config.js';
import { GLOBAL_INDEX, resetGlobalIndex } from './state.js';
import type { Shard } from './graph-build.js';
import type { DispatchArtifact } from './dispatch.js';

const DISPATCH_FILE = '_dispatch.json';

// `apps/meteor` and `ee/packages/license` are package ids with slashes. Flattening them keeps one
// file per package with no directories for prune or a later glob to reason about.
export function shardPath(packageId: string, dir: string = GRAPH_DIR): string {
    return path.join(dir, packageId.replace(/\//g, '__') + '.json');
}

export function writeShard(shard: Shard, dir: string = GRAPH_DIR): void {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(shardPath(shard.package, dir), JSON.stringify(shard), 'utf8');
}

export function readShards(dir: string = GRAPH_DIR): Shard[] {
    if (!fs.existsSync(dir)) return [];
    const out: Shard[] = [];
    for (const name of fs.readdirSync(dir)) {
        if (!name.endsWith('.json') || name === DISPATCH_FILE) continue;
        try {
            out.push(JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8')) as Shard);
        } catch (e) {
            console.error(`[graph-store] unreadable shard ${name}: ${(e as Error).message}`);
        }
    }
    return out;
}

export function writeDispatch(art: DispatchArtifact, dir: string = GRAPH_DIR): void {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, DISPATCH_FILE), JSON.stringify(art), 'utf8');
}

export function readDispatch(dir: string = GRAPH_DIR): DispatchArtifact | null {
    try {
        return JSON.parse(fs.readFileSync(path.join(dir, DISPATCH_FILE), 'utf8')) as DispatchArtifact;
    } catch { return null; }
}

export function loadGlobalIndex(shards: Shard[], dispatch: DispatchArtifact | null): void {
    resetGlobalIndex();

    for (const shard of shards) {
        for (const def of shard.defs) {
            GLOBAL_INDEX.defs.set(def.id, def);
            const byName = GLOBAL_INDEX.byName.get(def.name);
            if (byName) byName.push(def.id);
            else GLOBAL_INDEX.byName.set(def.name, [def.id]);
        }
        for (const f of shard.files) GLOBAL_INDEX.allFiles.add(f);
        GLOBAL_INDEX.stats.bound += shard.stats.bound;
        GLOBAL_INDEX.stats.external += shard.stats.external;
        GLOBAL_INDEX.stats.unbound += shard.stats.unbound;
        GLOBAL_INDEX.stats.failedFiles += shard.failedFiles.length;
    }

    // Dispatch nodes are not definitions and have no body, so they are exempt from the check
    // below — they are exactly what a caller and a handler that never reference each other have
    // in common.
    const isDispatchNode = (id: string): boolean => id.startsWith('#dispatch/');
    const exists = (id: string): boolean => GLOBAL_INDEX.defs.has(id) || isDispatchNode(id);

    const link = (edges: Iterable<Shard['edges'][number]>): void => {
        for (const e of edges) {
            // Both ends must be things the reader can open. An edge into a defId no shard
            // defines renders as a node with no body — worse than no edge at all, and measured
            // at 8.6% of same-package edges before the defId rules were made consistent.
            if (!exists(e.from) || !exists(e.to)) {
                GLOBAL_INDEX.stats.droppedEdges++;
                continue;
            }
            const out = GLOBAL_INDEX.out.get(e.from);
            if (out) out.push(e); else GLOBAL_INDEX.out.set(e.from, [e]);
            const inn = GLOBAL_INDEX.in.get(e.to);
            if (inn) inn.push(e); else GLOBAL_INDEX.in.set(e.to, [e]);
        }
    };

    for (const shard of shards) link(shard.edges);

    if (dispatch) {
        link(dispatch.edges);
        for (const [node, refs] of Object.entries(dispatch.siblings)) {
            GLOBAL_INDEX.dispatch.set(node, refs);
        }
        // Indexed under BOTH implementations: a reader arriving at either one must learn that the
        // other exists. An edge into the CE class looks complete on its own, and under a licence
        // the EE class is what runs.
        for (const o of dispatch.overrides) {
            for (const id of [o.target, o.by]) {
                const list = GLOBAL_INDEX.overrides.get(id);
                if (list) list.push(o); else GLOBAL_INDEX.overrides.set(id, [o]);
            }
        }
    }
}
