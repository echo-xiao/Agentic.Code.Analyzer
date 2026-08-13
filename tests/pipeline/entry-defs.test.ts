import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX, resetGlobalIndex } from '../../src/indexer/state.js';
import { defsInFiles, pickSeedDef } from '../../src/pipeline/entry-defs.js';
import type { Def } from '../../src/indexer/defs.js';

const put = (id: string, kind: Def['kind'] = 'function', exported = true) => {
    const [file, name] = id.split('#');
    GLOBAL_INDEX.defs.set(id, { id, file, name, qualifiedName: name, kind, line: 1, endLine: 5, signature: '', exported });
};

beforeEach(() => resetGlobalIndex());

test('candidates come from the definitions that live in the cited files', () => {
    put('a/rooms.ts#createRoom');
    put('a/rooms.ts#deleteRoom');
    put('b/other.ts#unrelated');

    const cands = defsInFiles(['a/rooms.ts']);

    assert.deepEqual(cands.map(c => c.defId).sort(), ['a/rooms.ts#createRoom', 'a/rooms.ts#deleteRoom']);
    assert.equal(cands[0].file, 'a/rooms.ts');
});

test('two same-named definitions in cited files are two candidates, not one', () => {
    put('a/rsa.ts#encrypt');
    put('a/aes.ts#encrypt');

    // Under the name-keyed index this was one entry with a files[] list, and something downstream
    // had to pick. Both are candidates now, and scoring decides on the evidence.
    assert.equal(defsInFiles(['a/rsa.ts', 'a/aes.ts']).length, 2);
});

test('module pseudo-definitions are never seeds', () => {
    put('a/rooms.ts#<module>', 'module');
    put('a/rooms.ts#createRoom');

    // Every file has one, they have no body worth reading, and by basename they used to collide:
    // 59 different index.ts files shared one symbol.
    assert.deepEqual(defsInFiles(['a/rooms.ts']).map(c => c.defId), ['a/rooms.ts#createRoom']);
});

test('a test-file definition is not a candidate even with no rival', () => {
    put('tests/data/livechat/rooms.ts#closeOmnichannelRoom');

    // Measured before this rule: the wiki cites test files, closeOmnichannelRoom became a seed
    // from a test utility, and the answer had to note the real handler was missing.
    assert.deepEqual(defsInFiles(['tests/data/livechat/rooms.ts']), []);
});

test('the seed is the candidate whose name best matches the question', () => {
    put('a/rooms.ts#createRoom');
    put('a/rooms.ts#deleteRoom');
    put('a/rooms.ts#helper');

    const seed = pickSeedDef(defsInFiles(['a/rooms.ts']), 'how is a room created');

    assert.equal(seed!.defId, 'a/rooms.ts#createRoom');
});

test('inflected question words still match a symbol name', () => {
    put('a/messages.ts#sendMessage');
    put('a/messages.ts#objectMaybeIncluding');

    // Measured on the real index: `how are messages sent to a room` scored sendMessage at zero,
    // because `sent` is not `send` and `messages` is not `message`, so every candidate tied at
    // zero and the pick fell to defId order — objectMaybeIncluding.
    const seed = pickSeedDef(defsInFiles(['a/messages.ts']), 'how are messages sent to a room');

    assert.equal(seed!.defId, 'a/messages.ts#sendMessage');
    assert.equal(seed!.tied, false);
});

test('a tie is reported rather than broken silently', () => {
    put('a/x.ts#createRoom');
    put('b/y.ts#createRoom');

    const seed = pickSeedDef(defsInFiles(['a/x.ts', 'b/y.ts']), 'create room');

    assert.equal(seed!.tied, true);
});

test('no candidate yields no seed instead of an arbitrary one', () => {
    assert.equal(pickSeedDef([], 'anything'), null);
});
