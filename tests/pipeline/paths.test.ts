import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePathReply, capSelection, selectPaths, buildPathPrompt } from '../../src/pipeline/paths.js';
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

test('buildPathPrompt: chainProse renders above the right chain, not the others', () => {
    const skeletonText = 'Chain 1 (x):\n  [1a] sym1  f:1  code\n\nChain 2 (y):\n  [2a] sym2  f:2  code\n';
    const prose = new Map([[2, 'Y is the notification subsystem that fans out to the client.']]);
    const p = buildPathPrompt('q', skeletonText, prose);
    const noteIdx = p.indexOf('Section notes (wiki): Y is the notification subsystem');
    const chain1Idx = p.indexOf('Chain 1 (x):');
    const chain2Idx = p.indexOf('Chain 2 (y):');
    assert.ok(noteIdx > -1);
    assert.ok(noteIdx > chain1Idx && noteIdx < chain2Idx);   // note sits right above Chain 2, not Chain 1
});

test('buildPathPrompt: without chainProse, output is unchanged from before', () => {
    const skeletonText = 'Chain 1 (x):\n  [1a] sym1  f:1  code\n';
    const p = buildPathPrompt('q', skeletonText);
    assert.ok(!p.includes('Section notes (wiki)'));
    assert.ok(p.includes(skeletonText.trim()));
});
