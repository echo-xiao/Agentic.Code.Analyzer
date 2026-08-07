import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSelectPrompt, parseSelectReply, selectChains } from '../../src/pipeline/select.js';
import { FakeLlm } from '../../src/pipeline/llm.js';
import type { Chain } from '../../src/pipeline/types.js';

const chain = (id: number, label: string, tied = false): Chain =>
    ({ id, pageId: 'p', sections: ['p › S'], label, seed: { symbol: 's' + id, file: 'f.ts' }, score: 1, tied, prose: '' });
const chains = [
    chain(1, '2.2 › Message Sending Workflow · sendMessage'),
    chain(2, '2.4 › Message Composer Popups · RoomMessageContent', true),
    chain(3, '3.5 › System Architecture · encryptMessage', true),
];

test('buildSelectPrompt lists every chain and the whole skeleton', () => {
    const p = buildSelectPrompt('how is a message sent?', 'SKELETON-TEXT', chains);
    assert.ok(p.includes('Chain 1: 2.2 › Message Sending Workflow · sendMessage'));
    assert.ok(p.includes('tied seed'));                    // tied chains are flagged
    assert.ok(p.includes('SKELETON-TEXT'));
    assert.ok(p.includes('how is a message sent?'));
});

test('parseSelectReply keeps known ids in reply order and reports the rest as dropped', () => {
    const r = parseSelectReply('3, 1', chains);
    assert.deepEqual(r.kept, [3, 1]);
    assert.deepEqual(r.dropped, [2]);
});

test('parseSelectReply ignores unknown ids and duplicates', () => {
    assert.deepEqual(parseSelectReply('1\n1\n9\n2', chains).kept, [1, 2]);
});

test('parseSelectReply tolerates prose around the numbers', () => {
    assert.deepEqual(parseSelectReply('保留链 1 和链 3。', chains).kept, [1, 3]);
});

// Dropping is irreversible, so an unparseable reply must not cost the run all of its material.
test('parseSelectReply keeps everything when it can find no valid id', () => {
    const r = parseSelectReply('I am not sure which chains matter.', chains);
    assert.deepEqual(r.kept, [1, 2, 3]);
    assert.deepEqual(r.dropped, []);
});

test('selectChains returns the raw reply alongside the decision', async () => {
    const r = await selectChains('q', 'SK', chains, new FakeLlm(['1']));
    assert.deepEqual(r.kept, [1]);
    assert.deepEqual(r.dropped, [2, 3]);
    assert.equal(r.raw, '1');
});
