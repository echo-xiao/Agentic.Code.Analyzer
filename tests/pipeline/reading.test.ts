import { test } from 'node:test';
import assert from 'node:assert/strict';
import { packMaterials } from '../../src/pipeline/reading.js';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import type { SkeletonNode } from '../../src/pipeline/types.js';

const node = (id: string, sym: string): SkeletonNode => ({ id, symbol: sym, file: 'f/' + sym + '.ts', line: 10, snippet: '', kind: 'major', direction: 'down', edgeType: null, children: [] });
const table = new Map([['1a', node('1a', 'big')], ['1b', node('1b', 'small')], ['2a', node('2a', 'other')]]);
const readFn = (n: SkeletonNode) => ({ text: n.symbol === 'big' ? 'x'.repeat(4000) : 'y'.repeat(400), startLine: 10, endLine: 20 });

// Single global ceiling, no per-chain quota: read in order until the cap, then stop and record.
test('packMaterials reads the whole order when the ceiling allows', () => {
    const { materials, unread, cappedOut } = packMaterials(['1a', '1b', '2a'], table, 100000, { readFn });
    assert.deepEqual(materials.map(m => m.nodeId), ['1a', '1b', '2a']);
    assert.deepEqual(unread, []);
    assert.equal(cappedOut, false);
});

test('packMaterials stops at the ceiling and records what it never read', () => {
    const { materials, unread, cappedOut } = packMaterials(['1a', '1b', '2a'], table, 250, { readFn });
    assert.ok(materials.reduce((a, m) => a + m.tokens, 0) <= 250);
    assert.ok(unread.length > 0);
    assert.equal(cappedOut, true);
    assert.deepEqual([...materials.map(m => m.nodeId), ...unread].sort(), ['1a', '1b', '2a']);
});

test('packMaterials records ids whose read failed outright', () => {
    const { materials, unread } = packMaterials(['1a', '1b'], table, 100000, { readFn: n => n.id === '1b' ? null : readFn(n) });
    assert.deepEqual(materials.map(m => m.nodeId), ['1a']);
    assert.deepEqual(unread, ['1b']);
});

test('packMaterials packs a repeated id once', () => {
    const { materials } = packMaterials(['1a', '1a', '1b'], table, 100000, { readFn });
    assert.deepEqual(materials.map(m => m.nodeId), ['1a', '1b']);
});

test('a node with no definition id reads nothing rather than guessing a file', () => {
    // The default read this replaces took files[0] for the bare name and returned a blind 60-line
    // window, handed to the model as that symbol's implementation with no signal it was a guess.
    // Reading nothing is the honest outcome, and it lands in `unread` where attribution sees it.
    const orphan = node('9z', 'orphan');
    delete (orphan as { defId?: string }).defId;

    const { materials, unread } = packMaterials(['9z'], new Map([['9z', orphan]]), 24000);

    assert.deepEqual(materials, []);
    assert.deepEqual(unread, ['9z']);
});
