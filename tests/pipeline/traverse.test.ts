import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX, resetGlobalIndex } from '../../src/indexer/state.js';
import { fanIn, downstreamOf, upstreamOf, siblingsOf } from '../../src/pipeline/traverse.js';
import type { Def } from '../../src/indexer/defs.js';
import type { Edge } from '../../src/indexer/graph-build.js';

const def = (id: string): Def => {
    const [file, name] = id.split('#');
    return { id, file, name, qualifiedName: name, kind: 'function', line: 1, endLine: 5, signature: '', exported: true };
};

const load = (defs: string[], edges: Edge[]) => {
    resetGlobalIndex();
    for (const id of defs) GLOBAL_INDEX.defs.set(id, def(id));
    for (const e of edges) {
        (GLOBAL_INDEX.out.get(e.from) ?? GLOBAL_INDEX.out.set(e.from, []).get(e.from)!).push(e);
        (GLOBAL_INDEX.in.get(e.to) ?? GLOBAL_INDEX.in.set(e.to, []).get(e.to)!).push(e);
    }
};

beforeEach(() => resetGlobalIndex());

test('fanIn counts one definition, not every same-named thing in the repo', () => {
    load(['a/rsa.ts#encrypt', 'a/aes.ts#encrypt', 'x.ts#one', 'y.ts#two', 'z.ts#three'], [
        { from: 'x.ts#one', to: 'a/rsa.ts#encrypt', kind: 'call' },
        { from: 'y.ts#two', to: 'a/aes.ts#encrypt', kind: 'call' },
        { from: 'z.ts#three', to: 'a/aes.ts#encrypt', kind: 'call' },
    ]);

    // Under the old name-keyed index both of these read 3: every caller of every `encrypt`.
    // canAccessRoomAsync was judged a hot leaf 18 times that way, on a single definition.
    assert.equal(fanIn('a/rsa.ts#encrypt'), 1);
    assert.equal(fanIn('a/aes.ts#encrypt'), 2);
});

test('downstream candidates come from the edge list, needing no file filter', () => {
    load(['a.ts#caller', 'b.ts#target', 'c.ts#other'], [
        { from: 'a.ts#caller', to: 'b.ts#target', kind: 'call' },
        { from: 'c.ts#other', to: 'b.ts#target', kind: 'call' },
    ]);

    // The old version filtered callees down to those whose call site shared the node's file,
    // because a name carried every same-named symbol's out-edges. An edge already knows its ends.
    assert.deepEqual(downstreamOf('a.ts#caller').map(c => c.defId), ['b.ts#target']);
    assert.deepEqual(downstreamOf('b.ts#target'), []);
});

test('upstream candidates keep every caller, with no import-evidence filter', () => {
    load(['a.ts#caller', 'b.ts#target'], [{ from: 'a.ts#caller', to: 'b.ts#target', kind: 'call' }]);

    // That filter existed to compensate for name ambiguity and dropped 77.3% of static upstream
    // edges, 36,265 of them because the definition simply lived in another package.
    assert.deepEqual(upstreamOf('b.ts#target').map(c => c.defId), ['a.ts#caller']);
});

test('a test-file definition is excluded from candidates on both sides', () => {
    load(['a.ts#caller', 'a.spec.ts#helper', 'b.ts#real'], [
        { from: 'a.ts#caller', to: 'a.spec.ts#helper', kind: 'call' },
        { from: 'a.ts#caller', to: 'b.ts#real', kind: 'call' },
        { from: 'a.spec.ts#helper', to: 'b.ts#real', kind: 'call' },
    ]);

    assert.deepEqual(downstreamOf('a.ts#caller').map(c => c.defId), ['b.ts#real']);
    assert.deepEqual(upstreamOf('b.ts#real').map(c => c.defId), ['a.ts#caller']);
});

test('a dispatch node is traversable in both directions and carries its siblings', () => {
    resetGlobalIndex();
    GLOBAL_INDEX.defs.set('b.ts#send', def('b.ts#send'));
    GLOBAL_INDEX.defs.set('a.ts#handler', def('a.ts#handler'));
    const node = '#dispatch/callbacks/afterSave';
    for (const e of [
        { from: 'b.ts#send', to: node, kind: 'dispatches' as const },
        { from: node, to: 'a.ts#handler', kind: 'handles' as const },
    ]) {
        (GLOBAL_INDEX.out.get(e.from) ?? GLOBAL_INDEX.out.set(e.from, []).get(e.from)!).push(e);
        (GLOBAL_INDEX.in.get(e.to) ?? GLOBAL_INDEX.in.set(e.to, []).get(e.to)!).push(e);
    }
    GLOBAL_INDEX.dispatch.set(node, [{ defId: 'a.ts#<module>', space: 'callbacks', role: 'register', key: 'afterSave' }]);

    // The caller reaches the handler through the key: they share no import and no symbol.
    assert.deepEqual(downstreamOf('b.ts#send').map(c => c.defId), [node]);
    assert.deepEqual(downstreamOf(node).map(c => c.defId), ['a.ts#handler']);
    assert.equal(siblingsOf(node).length, 1);
});

test('cross-package edges are not truncated', () => {
    load(['apps/meteor/a.ts#caller', 'packages/models/b.ts#target'], [
        { from: 'apps/meteor/a.ts#caller', to: 'packages/models/b.ts#target', kind: 'call' },
    ]);

    // The old traversal cut every edge whose target sat under a different top-level path,
    // discarding 40.5% of unambiguous edges — while Rocket.Chat's real flows all cross packages.
    assert.deepEqual(downstreamOf('apps/meteor/a.ts#caller').map(c => c.defId),
        ['packages/models/b.ts#target']);
});
