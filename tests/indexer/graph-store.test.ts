import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { writeShard, readShards, writeDispatch, readDispatch, loadGlobalIndex } from '../../src/indexer/graph-store.js';
import { GLOBAL_INDEX, resetGlobalIndex } from '../../src/indexer/state.js';
import type { Shard } from '../../src/indexer/graph-build.js';
import type { DispatchArtifact } from '../../src/indexer/dispatch.js';

const dir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'graph-'));

const def = (id: string, file: string, name: string) =>
    ({ id, file, name, qualifiedName: name, kind: 'function' as const, line: 1, endLine: 3, signature: '', exported: true });

const shard = (pkg: string, over: Partial<Shard> = {}): Shard => ({
    package: pkg, tsconfig: null, generatorVersion: '12',
    files: [], defs: [], edges: [], slots: [], overrides: [], unbound: [], failedFiles: [],
    stats: { bound: 0, external: 0, unbound: 0 },
    ...over,
});

test('a shard round-trips through disk', () => {
    const d = dir();
    const s = shard('apps/meteor', { files: ['apps/meteor/a.ts'], defs: [def('apps/meteor/a.ts#f', 'apps/meteor/a.ts', 'f')] });

    writeShard(s, d);
    const back = readShards(d);

    assert.equal(back.length, 1);
    assert.equal(back[0].package, 'apps/meteor');
    assert.equal(back[0].defs[0].id, 'apps/meteor/a.ts#f');
});

test('a package id with slashes becomes one file, not a nested path', () => {
    const d = dir();
    writeShard(shard('ee/packages/license'), d);

    // A shard per package, flat: `ee/packages/license` must not create directories that a later
    // glob or prune has to reason about.
    assert.deepEqual(fs.readdirSync(d).filter(f => f.endsWith('.json')).length, 1);
    assert.equal(readShards(d)[0].package, 'ee/packages/license');
});

test('loadGlobalIndex indexes definitions forward, backward and by name', () => {
    resetGlobalIndex();
    const s = shard('p', {
        defs: [def('p/a.ts#caller', 'p/a.ts', 'caller'), def('p/b.ts#target', 'p/b.ts', 'target')],
        files: ['p/a.ts', 'p/b.ts'],
        edges: [{ from: 'p/a.ts#caller', to: 'p/b.ts#target', kind: 'call' }],
        stats: { bound: 1, external: 2, unbound: 3 },
    });

    loadGlobalIndex([s], null);

    assert.equal(GLOBAL_INDEX.defs.get('p/b.ts#target')!.name, 'target');
    assert.deepEqual(GLOBAL_INDEX.out.get('p/a.ts#caller')!.map(e => e.to), ['p/b.ts#target']);
    assert.deepEqual(GLOBAL_INDEX.in.get('p/b.ts#target')!.map(e => e.from), ['p/a.ts#caller']);
    assert.deepEqual(GLOBAL_INDEX.byName.get('target'), ['p/b.ts#target']);
    assert.equal(GLOBAL_INDEX.allFiles.size, 2);
    assert.deepEqual(GLOBAL_INDEX.stats, { bound: 1, external: 2, unbound: 3, failedFiles: 0, droppedEdges: 0 });
});

test('an edge whose target no shard defines is dropped and counted, never loaded', () => {
    resetGlobalIndex();
    const s = shard('p', {
        defs: [def('p/a.ts#caller', 'p/a.ts', 'caller')],
        edges: [
            { from: 'p/a.ts#caller', to: 'p/gone.ts#missing', kind: 'call' },
            { from: 'p/a.ts#caller', to: 'p/a.ts#caller', kind: 'call' },
        ],
    });

    loadGlobalIndex([s], null);

    // A dangling edge is worse than a missing one: it renders as a node that cannot be read.
    // Measured once at 8.6% of same-package edges before the defId rules were made consistent.
    assert.equal(GLOBAL_INDEX.out.get('p/a.ts#caller')!.length, 1);
    assert.equal(GLOBAL_INDEX.stats.droppedEdges, 1);
});

test('dispatch nodes and their siblings load, and dispatch edges survive the def check', () => {
    resetGlobalIndex();
    const art: DispatchArtifact = {
        generatorVersion: '12',
        edges: [
            { from: 'p/b.ts#send', to: '#dispatch/callbacks/k', kind: 'dispatches' },
            { from: '#dispatch/callbacks/k', to: 'p/a.ts#handler', kind: 'handles' },
        ],
        siblings: { '#dispatch/callbacks/k': [{ defId: 'p/a.ts#<module>', space: 'callbacks', role: 'register', key: 'k' }] },
        overrides: [{ key: 'IUsers', target: 'p/a.ts#A', by: 'p/b.ts#B', source: 'registerModel', resolvedAt: 'runtime' }],
        multiImplementation: [{ key: 'IUsers', implementations: ['p/a.ts#A', 'p/b.ts#B'] }],
        trunkKeyCounts: { callbacks: 1 },
        oneSidedKeys: [],
    };
    const s = shard('p', { defs: [def('p/a.ts#handler', 'p/a.ts', 'handler'), def('p/b.ts#send', 'p/b.ts', 'send')] });

    loadGlobalIndex([s], art);

    // A dispatch node is not a definition and must not be dropped by the dangling-edge guard.
    assert.equal(GLOBAL_INDEX.out.get('p/b.ts#send')!.length, 1);
    assert.equal(GLOBAL_INDEX.out.get('#dispatch/callbacks/k')!.length, 1);
    assert.equal(GLOBAL_INDEX.dispatch.get('#dispatch/callbacks/k')!.length, 1);
    assert.equal(GLOBAL_INDEX.stats.droppedEdges, 0);
});

test('overrides are indexed by the definition they apply to', () => {
    resetGlobalIndex();
    const art = {
        generatorVersion: '12', edges: [], siblings: {},
        overrides: [{ key: 'IUsers', target: 'p/a.ts#A', by: 'p/b.ts#B', source: 'registerModel' as const, resolvedAt: 'runtime' as const }],
        multiImplementation: [], trunkKeyCounts: {}, oneSidedKeys: [],
    };
    loadGlobalIndex([shard('p')], art);

    // Both ends are looked up: a reader arriving at either implementation must learn the other
    // one exists.
    assert.equal(GLOBAL_INDEX.overrides.get('p/a.ts#A')!.length, 1);
    assert.equal(GLOBAL_INDEX.overrides.get('p/b.ts#B')!.length, 1);
});

test('the dispatch artifact round-trips', () => {
    const d = dir();
    assert.equal(readDispatch(d), null);

    writeDispatch({
        generatorVersion: '12', edges: [], siblings: {}, overrides: [],
        multiImplementation: [], trunkKeyCounts: { rest: 639 }, oneSidedKeys: ['#dispatch/rest/x'],
    }, d);

    assert.equal(readDispatch(d)!.trunkKeyCounts.rest, 639);
});
