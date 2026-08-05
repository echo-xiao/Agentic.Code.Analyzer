import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePathReply, capSelection, selectPaths } from '../../src/pipeline/paths.js';
import { FakeLlm } from '../../src/pipeline/llm.js';
import type { SkeletonNode } from '../../src/pipeline/types.js';
import type { Chain } from '../../src/pipeline/types.js';

const node = (id: string): SkeletonNode => ({ id, symbol: 's' + id, file: 'f', line: 1, snippet: '', kind: 'major', edgeType: null, children: [] });
const table = new Map(['1a', '1b', '2a', '2b'].map(id => [id, node(id)]));
const chains: Chain[] = [
    { id: 1, label: 'x', seeds: [], rrfMass: 0.3 },
    { id: 2, label: 'y', seeds: [], rrfMass: 0.1 },
];

test('parsePathReply keeps known ids in order, hallucinated ids land in dropped', () => {
    const { selected, dropped } = parsePathReply('1a, 9z, 2b\n1a', table);
    assert.deepEqual(selected, ['1a', '2b']);
    assert.deepEqual(dropped, ['9z']);
});

test('capSelection trims to maxNodes, preferring the heavier chain', () => {
    const out = capSelection(['2a', '2b', '1a', '1b'], table, chains, 3);
    assert.equal(out.length, 3);
    assert.ok(out.includes('1a') && out.includes('1b'));                 // chain 1 is heavier, keeps both
});

test('selectPaths wires prompt->parse->cap through the llm', async () => {
    const r = await selectPaths('q', 'SKELETON', table, chains, new FakeLlm(['1a\n2a']));
    assert.deepEqual(r.selected, ['1a', '2a']);
    assert.equal(r.raw, '1a\n2a');
});
