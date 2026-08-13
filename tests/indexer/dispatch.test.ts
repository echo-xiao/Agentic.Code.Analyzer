import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildDispatch, dispatchNodeId } from '../../src/indexer/dispatch.js';
import type { Slot } from '../../src/indexer/idioms.js';
import type { OverrideSite } from '../../src/indexer/overrides.js';

const slot = (o: Partial<Slot> & Pick<Slot, 'space' | 'role' | 'key' | 'at'>): Slot => ({
    decl: 'lib.ts#Registry.add', argIndex: 0, realm: 'server', form: '1a',
    keyResolution: 'literal-union', keyspaceScope: 'test@v12', evidence: 'static',
    ...o,
} as Slot);

test('a key is one node, and both sides of it wire to that node', () => {
    const art = buildDispatch([
        slot({ space: 'callbacks', role: 'register', key: 'afterSaveMessage', at: 'a.ts#<module>', handler: 'a.ts#notifyUsers' }),
        slot({ space: 'callbacks', role: 'dispatch', key: 'afterSaveMessage', at: 'b.ts#sendMessage' }),
    ], []);

    const node = dispatchNodeId('callbacks', 'afterSaveMessage');

    // The register and dispatch halves live in different packages and never import each other;
    // the key node is the only thing that joins them.
    assert.ok(art.edges.some(e => e.from === 'b.ts#sendMessage' && e.to === node && e.kind === 'dispatches'));
    assert.ok(art.edges.some(e => e.from === 'a.ts#<module>' && e.to === node && e.kind === 'registers'));
    // And the handler is reachable from the node, so a chain can walk caller -> key -> handler.
    assert.ok(art.edges.some(e => e.from === node && e.to === 'a.ts#notifyUsers' && e.kind === 'handles'));
});

test('the same key in two spaces is two nodes', () => {
    const art = buildDispatch([
        slot({ space: 'callbacks', role: 'register', key: 'user.updated', at: 'a.ts#<module>' }),
        slot({ space: 'service-events', role: 'register', key: 'user.updated', at: 'b.ts#<module>' }),
    ], []);

    // Nothing derives the pairing: two idioms sharing a `space` are the two sides by construction,
    // and a collision across spaces is a different registry that happens to use the same string.
    assert.equal(Object.keys(art.siblings).length, 2);
    assert.ok(art.siblings[dispatchNodeId('callbacks', 'user.updated')]);
    assert.ok(art.siblings[dispatchNodeId('service-events', 'user.updated')]);
});

test('siblings list everything wired to a key, with its role', () => {
    const art = buildDispatch([
        slot({ space: 'callbacks', role: 'register', key: 'k', at: 'a.ts#<module>', handler: 'a.ts#h1' }),
        slot({ space: 'callbacks', role: 'register', key: 'k', at: 'b.ts#<module>', handler: 'b.ts#h2' }),
        slot({ space: 'callbacks', role: 'dispatch', key: 'k', at: 'c.ts#run' }),
    ], []);

    const refs = art.siblings[dispatchNodeId('callbacks', 'k')];

    assert.equal(refs.length, 3);
    assert.equal(refs.filter(r => r.role === 'register').length, 2);
    assert.equal(refs.filter(r => r.role === 'dispatch').length, 1);
});

test('an out-of-scope slot is carried but marked, never counted as a trunk', () => {
    const art = buildDispatch([
        slot({ space: 'slash-commands', role: 'register', key: 'gimme', at: 'a.ts#<module>', scope: 'out' }),
        slot({ space: 'callbacks', role: 'register', key: 'k', at: 'b.ts#<module>' }),
    ], []);

    assert.ok(art.siblings[dispatchNodeId('slash-commands', 'gimme')]);
    assert.deepEqual(art.trunkKeyCounts['slash-commands' as never], undefined);
    assert.equal(art.trunkKeyCounts.callbacks, 1);
});

test('overrides pair across shards and reach the artifact', () => {
    const sites: OverrideSite[] = [
        { key: 'IUsersModel', impl: 'ce/Users.ts#UsersRaw', at: 'ce/Users.ts#<module>', file: 'ce/Users.ts', source: 'registerModel' },
        {
            key: 'IUsersModel', impl: 'ee/Users.ts#UsersEE', at: 'ee/Users.ts#<module>', file: 'ee/Users.ts',
            source: 'registerModel', condition: { kind: 'license', module: 'livechat-enterprise', evalAt: 'import' },
        },
    ];

    const art = buildDispatch([], sites);

    assert.equal(art.overrides.length, 1);
    assert.equal(art.overrides[0].by, 'ee/Users.ts#UsersEE');
    assert.equal(art.overrides[0].resolvedAt, 'runtime');
    assert.deepEqual(art.multiImplementation.map(m => m.key), ['IUsersModel']);
});

test('a key with only one side is still a node, and the gap is visible', () => {
    const art = buildDispatch([
        slot({ space: 'callbacks', role: 'register', key: 'registered-never-run', at: 'a.ts#<module>' }),
    ], []);

    // "Registered but never dispatched" is a coverage gap worth seeing, not an error to hide.
    assert.equal(art.oneSidedKeys.length, 1);
    assert.equal(art.oneSidedKeys[0], dispatchNodeId('callbacks', 'registered-never-run'));
});
