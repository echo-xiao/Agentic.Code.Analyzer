import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX, resetGlobalIndex } from '../../src/indexer/state.js';
import { buildChainSkeletonByDef } from '../../src/pipeline/skeleton-defs.js';
import { fanIn as fanInOf } from '../../src/pipeline/traverse.js';
import type { Def } from '../../src/indexer/defs.js';
import type { Edge } from '../../src/indexer/graph-build.js';
import type { Chain } from '../../src/pipeline/types.js';

const def = (id: string): Def => {
    const [file, name] = id.split('#');
    return { id, file, name, qualifiedName: name, kind: 'function', line: 10, endLine: 20, signature: `function ${name}()`, exported: true };
};

const load = (defs: string[], edges: Edge[]) => {
    resetGlobalIndex();
    for (const id of defs) {
        GLOBAL_INDEX.defs.set(id, def(id));
        const n = id.split('#')[1];
        GLOBAL_INDEX.byName.set(n, [...(GLOBAL_INDEX.byName.get(n) ?? []), id]);
    }
    for (const e of edges) {
        (GLOBAL_INDEX.out.get(e.from) ?? GLOBAL_INDEX.out.set(e.from, []).get(e.from)!).push(e);
        (GLOBAL_INDEX.in.get(e.to) ?? GLOBAL_INDEX.in.set(e.to, []).get(e.to)!).push(e);
    }
};

const chain = (defId: string): Chain => ({
    id: 1, pageId: 'p', sections: [], label: 'l', seed: { symbol: defId.split('#')[1], file: defId.split('#')[0] },
    score: 1, tied: false, prose: '',
});

beforeEach(() => resetGlobalIndex());

test('a flow chain walks downstream from the entry definition', () => {
    load(['a.ts#entry', 'b.ts#mid', 'c.ts#leaf'], [
        { from: 'a.ts#entry', to: 'b.ts#mid', kind: 'call' },
        { from: 'b.ts#mid', to: 'c.ts#leaf', kind: 'call' },
    ]);

    const sk = buildChainSkeletonByDef(chain('a.ts#entry'), 'a.ts#entry');

    assert.equal(sk.mode, 'flow');
    assert.equal(sk.roots[0].defId, 'a.ts#entry');
    assert.equal(sk.roots[0].children[0].defId, 'b.ts#mid');
    assert.equal(sk.roots[0].children[0].children[0].defId, 'c.ts#leaf');
});

test('two same-named definitions both expand in one chain', () => {
    load(['a.ts#caller', 'rsa.ts#encrypt', 'aes.ts#encrypt'], [
        { from: 'a.ts#caller', to: 'rsa.ts#encrypt', kind: 'call' },
        { from: 'a.ts#caller', to: 'aes.ts#encrypt', kind: 'call' },
    ]);

    const sk = buildChainSkeletonByDef(chain('a.ts#caller'), 'a.ts#caller');

    // visited is keyed by definition. Keyed by bare name, the second `encrypt` was silently
    // dropped as already-seen: measured at 400 expansion points across 69 of 311 chains.
    assert.deepEqual(sk.roots[0].children.map(c => c.defId).sort(), ['aes.ts#encrypt', 'rsa.ts#encrypt']);
});

test('a cross-package edge is followed, not cut', () => {
    load(['apps/meteor/a.ts#caller', 'packages/models/b.ts#target'], [
        { from: 'apps/meteor/a.ts#caller', to: 'packages/models/b.ts#target', kind: 'call' },
    ]);

    const sk = buildChainSkeletonByDef(chain('apps/meteor/a.ts#caller'), 'apps/meteor/a.ts#caller');

    assert.equal(sk.roots[0].children[0].defId, 'packages/models/b.ts#target');
    assert.ok(!sk.roots[0].children.some(c => c.kind === 'boundary' as never));
});

test('a definition above the hot threshold becomes a leaf, counted per definition', () => {
    const callers = Array.from({ length: 30 }, (_, i) => `c${i}.ts#f${i}`);
    load(['a.ts#entry', 'hot.ts#popular', 'x.ts#quiet', ...callers], [
        { from: 'a.ts#entry', to: 'hot.ts#popular', kind: 'call' },
        { from: 'a.ts#entry', to: 'x.ts#quiet', kind: 'call' },
        { from: 'hot.ts#popular', to: 'x.ts#quiet', kind: 'call' },
        ...callers.map(c => ({ from: c, to: 'hot.ts#popular', kind: 'call' as const })),
    ]);

    const sk = buildChainSkeletonByDef(chain('a.ts#entry'), 'a.ts#entry', { hotFanIn: 25 });
    const hot = sk.roots[0].children.find(c => c.defId === 'hot.ts#popular')!;

    assert.equal(hot.kind, 'hotleaf');
    assert.equal(hot.children.length, 0);
    assert.equal(sk.roots[0].children.find(c => c.defId === 'x.ts#quiet')!.kind !== 'hotleaf', true);
});

test('a chain reaches a handler through a dispatch key', () => {
    resetGlobalIndex();
    for (const id of ['b.ts#send', 'a.ts#handler']) GLOBAL_INDEX.defs.set(id, def(id));
    const node = '#dispatch/callbacks/afterSave';
    for (const e of [
        { from: 'b.ts#send', to: node, kind: 'dispatches' as const },
        { from: node, to: 'a.ts#handler', kind: 'handles' as const },
    ]) {
        (GLOBAL_INDEX.out.get(e.from) ?? GLOBAL_INDEX.out.set(e.from, []).get(e.from)!).push(e);
        (GLOBAL_INDEX.in.get(e.to) ?? GLOBAL_INDEX.in.set(e.to, []).get(e.to)!).push(e);
    }
    GLOBAL_INDEX.dispatch.set(node, [{ defId: 'a.ts#<module>', space: 'callbacks', role: 'register', key: 'afterSave' }]);

    const sk = buildChainSkeletonByDef(chain('b.ts#send'), 'b.ts#send');
    const key = sk.roots[0].children[0];

    assert.equal(key.kind, 'dispatch');
    assert.equal(key.symbol, 'afterSave');
    assert.equal(key.siblings?.refs.length, 1);
    assert.equal(key.children[0].defId, 'a.ts#handler');
});

test('an impact chain walks upstream when the entry has more above it than below', () => {
    load(['leaf.ts#target', 'a.ts#one', 'b.ts#two'], [
        { from: 'a.ts#one', to: 'leaf.ts#target', kind: 'call' },
        { from: 'b.ts#two', to: 'leaf.ts#target', kind: 'call' },
    ]);

    const sk = buildChainSkeletonByDef(chain('leaf.ts#target'), 'leaf.ts#target');

    assert.equal(sk.mode, 'impact');
    assert.deepEqual(sk.roots[0].children.map(c => c.defId).sort(), ['a.ts#one', 'b.ts#two']);
});

test('a node carries the override annotation when its key has a second implementation', () => {
    load(['a.ts#caller', 'ce/Users.ts#UsersRaw'], [
        { from: 'a.ts#caller', to: 'ce/Users.ts#UsersRaw', kind: 'call' },
    ]);
    GLOBAL_INDEX.overrides.set('ce/Users.ts#UsersRaw', [{
        key: 'IUsersModel', target: 'ce/Users.ts#UsersRaw', by: 'ee/Users.ts#UsersEE',
        source: 'registerModel', condition: { kind: 'license', module: 'livechat-enterprise', evalAt: 'import' },
        resolvedAt: 'runtime',
    }]);

    const sk = buildChainSkeletonByDef(chain('a.ts#caller'), 'a.ts#caller');

    // An edge into the CE class looks complete on its own; under a licence the EE class runs.
    // A reader who is not told that draws the wrong conclusion from a healthy-looking graph.
    assert.equal(sk.roots[0].children[0].overrides?.[0].by, 'ee/Users.ts#UsersEE');
});

test('a chain steps from an interface method to its implementation', () => {
    load(['a.ts#caller', 'core/IAuth.ts#IAuth.check', 'svc/Auth.ts#Auth.check', 'svc/Auth.ts#deep'], [
        { from: 'a.ts#caller', to: 'core/IAuth.ts#IAuth.check', kind: 'call' },
        { from: 'core/IAuth.ts#IAuth.check', to: 'svc/Auth.ts#Auth.check', kind: 'implements', implCount: 1 },
        { from: 'svc/Auth.ts#Auth.check', to: 'svc/Auth.ts#deep', kind: 'call' },
    ]);

    const sk = buildChainSkeletonByDef(chain('a.ts#caller'), 'a.ts#caller');
    const iface = sk.roots[0].children[0];

    // A call on a proxified service binds to the signature, which has no body. Without this hop
    // the chain ends there and the real logic is never read.
    assert.equal(iface.defId, 'core/IAuth.ts#IAuth.check');
    assert.equal(iface.children[0].defId, 'svc/Auth.ts#Auth.check');
    assert.equal(iface.children[0].children[0].defId, 'svc/Auth.ts#deep');
});

test('a member with several implementations shows every one, and says how many', () => {
    load(['a.ts#caller', 'core/IStore.ts#IStore.save', 'x/Mem.ts#Mem.save', 'y/Disk.ts#Disk.save'], [
        { from: 'a.ts#caller', to: 'core/IStore.ts#IStore.save', kind: 'call' },
        { from: 'core/IStore.ts#IStore.save', to: 'x/Mem.ts#Mem.save', kind: 'implements', implCount: 2 },
        { from: 'core/IStore.ts#IStore.save', to: 'y/Disk.ts#Disk.save', kind: 'implements', implCount: 2 },
    ]);

    const iface = buildChainSkeletonByDef(chain('a.ts#caller'), 'a.ts#caller').roots[0].children[0];

    // Showing one and staying silent about the other is the same failure as coverage mode picking
    // an implementation: the graph looks complete and the reader never learns there is a fork.
    assert.deepEqual(iface.children.map(c => c.defId).sort(), ['x/Mem.ts#Mem.save', 'y/Disk.ts#Disk.save']);
    assert.equal(iface.implCount, 2);
});

test('an implementation is not judged hot because its interface is widely used', () => {
    const callers = Array.from({ length: 30 }, (_, i) => `c${i}.ts#f${i}`);
    load(['core/IAuth.ts#IAuth.check', 'svc/Auth.ts#Auth.check', 'a.ts#caller', ...callers], [
        { from: 'a.ts#caller', to: 'core/IAuth.ts#IAuth.check', kind: 'call' },
        { from: 'core/IAuth.ts#IAuth.check', to: 'svc/Auth.ts#Auth.check', kind: 'implements', implCount: 1 },
        ...callers.map(c => ({ from: c, to: 'core/IAuth.ts#IAuth.check', kind: 'call' as const })),
    ]);

    const iface = buildChainSkeletonByDef(chain('a.ts#caller'), 'a.ts#caller', { hotFanIn: 25 }).roots[0].children[0];

    // The interface absorbs the fan-in, as it should — it really is a hot node. Its single
    // implementation has one in-edge and must stay expandable, or the hop just added is wasted.
    assert.equal(iface.kind, 'hotleaf');
    assert.equal(iface.children.length, 0);
    assert.equal(fanInOf('svc/Auth.ts#Auth.check'), 1);
});
