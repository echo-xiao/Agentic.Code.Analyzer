// Shared graph-navigation helpers used by every engine module. Pure functions over GLOBAL_INDEX.
// (Architecture routing was retired; the `wiki` tool provides self-generated architecture wiki overviews now.)
import { GLOBAL_INDEX } from '../../indexer/state.js';
import type { EdgeType } from '../../indexer/state.js';

export const LAYER_SEGMENTS: Record<string, string> = {
    client:   '/client/',
    server:   '/server/',
    packages: '/packages/',
    ee:       '/ee/',
};

export function filterByLayer(paths: string[], layer: string, strict = false): string[] {
    const seg = LAYER_SEGMENTS[layer];
    if (!seg) return paths;
    const filtered = paths.filter(p => p.includes(seg));
    if (filtered.length > 0) return filtered;
    return strict ? [] : paths;
}

export function isTestFile(filePath: string): boolean {
    const p = filePath.toLowerCase();
    return p.includes('.test.ts') || p.includes('.spec.ts') ||
        p.includes('.test.tsx') || p.includes('.spec.tsx') ||
        p.includes('/e2e/') || p.includes('/__tests__/') ||
        // Test-data/helper files live under /tests/ without a .test suffix, yet are imported by
        // many other tests → high fan-in. Without this they'd win centrality root selection
        // (e.g. tests/data/livechat/rooms.ts outranking the real sendMessage definition).
        p.includes('/tests/') || p.includes('/test/') || p.includes('.mocks.');
}

// Path-string variant used by the ranking engine (matches .test.* of any extension).
export function isTestPath(p: string): boolean {
    const s = p.toLowerCase();
    return s.includes('.test.') || s.includes('.spec.') || s.includes('.mocks.') ||
        s.includes('/tests/') || s.includes('/test/') || s.includes('/e2e/') || s.includes('/__tests__/');
}

// Event/pubsub dependents register via string-keyed dispatch (callbacks.add, Meteor.subscribe…)
// and do NOT statically import the emitter — so import-based scoping would wrongly drop them.
// Only static edges (call/new/jsx/type) carry a real import relationship to scope on.
const DYNAMIC_EDGES = new Set<EdgeType>(['event_emit', 'event_listen', 'pubsub_publish', 'pubsub_subscribe', 'rest_call', 'rest_route', 'stream_def', 'stream_sub']);
export function isDynamicEdge(et: EdgeType): boolean { return DYNAMIC_EDGES.has(et); }

export const edgeLabel: Record<EdgeType, string> = {
    call: '',
    jsx: ' [jsx]',
    new: ' [new]',
    event_emit: ' [event→]',
    event_listen: ' [→event]',
    pubsub_publish: ' [pub]',
    pubsub_subscribe: ' [sub]',
    rest_call: ' [rest→]',
    rest_route: ' [→rest]',
    stream_def: ' [stream]',
    stream_sub: ' [→stream]',
    type: ' [type]',
};

export function relPath(p: string): string {
    return p.split('Rocket.Chat/')[1] || p;
}

export function computeImportDistances(startFile: string): Map<string, number> {
    const dist = new Map<string, number>();
    const queue: string[] = [startFile];
    dist.set(startFile, 0);
    while (queue.length > 0) {
        const cur = queue.shift()!;
        const d = dist.get(cur)!;
        const importers = GLOBAL_INDEX.fileDependents.get(cur);
        if (!importers) continue;
        for (const importer of importers) {
            if (!dist.has(importer)) {
                dist.set(importer, d + 1);
                queue.push(importer);
            }
        }
    }
    return dist;
}

// Choose which definition of a colliding symbol to traverse from.
// Preference order: explicit file > highest fan-in centrality (most-imported) > non-test.
// Avoids the old `Array.from(symbolFiles)[0]` (insertion order ≈ random) that traced the wrong
// definition for collisions like `Streamer` (message streamer vs admin deploy UI).
export function pickRootFile(files: string[], preferredFile?: string): string {
    if (files.length === 0) return '';
    if (files.length === 1) return files[0];
    if (preferredFile) {
        const q = preferredFile.toLowerCase().replace(/\.tsx?$/, '');
        const exact = files.find(p => p.toLowerCase().replace(/\.tsx?$/, '').endsWith(q));
        if (exact) return exact;
    }
    return [...files].sort((a, b) => {
        const ta = isTestFile(a) ? 1 : 0, tb = isTestFile(b) ? 1 : 0;
        if (ta !== tb) return ta - tb;
        const ca = GLOBAL_INDEX.fileDependents.get(a)?.size ?? 0;
        const cb = GLOBAL_INDEX.fileDependents.get(b)?.size ?? 0;
        return cb - ca;
    })[0];
}

export const ALL_EDGE_TYPES: EdgeType[] = [
    'call', 'jsx', 'new', 'event_emit', 'event_listen', 'pubsub_publish', 'pubsub_subscribe', 'rest_call', 'rest_route', 'stream_def', 'stream_sub', 'type'
];

export function resolveEdgeFilter(edgeTypes?: string[]): (et: EdgeType) => boolean {
    const allowed: Set<EdgeType> = edgeTypes && edgeTypes.length > 0
        ? new Set(edgeTypes as EdgeType[])
        : new Set(ALL_EDGE_TYPES);
    return (et: EdgeType) => allowed.has(et);
}
