import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeClassify, makeNameClusters, type AnthropicLike } from '../../src/wiki/guide-llm.js';

const fake = (payload: unknown): AnthropicLike => ({
  messages: { create: async () => ({ content: [{ type: 'text', text: JSON.stringify(payload) }] }) },
});

test('makeClassify parses client JSON', async () => {
  const classify = makeClassify(fake([{ id: 'a', l1: 'Reference', l2: 'API & Contracts' }]));
  const r = await classify([{ id: 'a', title: 'REST', scope: '' }]);
  assert.deepEqual(r, [{ id: 'a', l1: 'Reference', l2: 'API & Contracts' }]);
});

test('makeNameClusters parses cluster names', async () => {
  const name = makeNameClusters(fake({ families: [{ name: 'Authentication', ids: ['a', 'b'] }] }));
  const g = await name('U ||| Subsystem Deep-Dives', [['a', 'b']], { a: { id: 'a', title: 'Auth', scope: '' }, b: { id: 'b', title: 'OAuth', scope: '' } });
  assert.deepEqual(g, [{ name: 'Authentication', ids: ['a', 'b'] }]);
});

test('makeClassify tolerates JSON wrapped in prose + code fences', async () => {
  const wrapped = 'Sure, here is the routing result:\n```json\n[{"id":"a","l1":"Reference","l2":"API & Contracts"}]\n```\nHope this helps!';
  const classify = makeClassify({ messages: { create: async () => ({ content: [{ type: 'text', text: wrapped }] }) } });
  const r = await classify([{ id: 'a', title: 'REST', scope: '' }]);
  assert.deepEqual(r, [{ id: 'a', l1: 'Reference', l2: 'API & Contracts' }]);
});
