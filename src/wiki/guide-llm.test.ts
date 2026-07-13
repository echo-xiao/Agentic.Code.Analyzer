import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeClassify, makeNameClusters, type AnthropicLike } from './guide-llm.js';

const fake = (payload: unknown): AnthropicLike => ({
  messages: { create: async () => ({ content: [{ type: 'text', text: JSON.stringify(payload) }] }) },
});

test('makeClassify 解析 client JSON', async () => {
  const classify = makeClassify(fake([{ id: 'a', l1: 'Reference', l2: 'API 与契约' }]));
  const r = await classify([{ id: 'a', title: 'REST', scope: '' }]);
  assert.deepEqual(r, [{ id: 'a', l1: 'Reference', l2: 'API 与契约' }]);
});

test('makeNameClusters 解析簇名', async () => {
  const name = makeNameClusters(fake({ families: [{ name: '认证', ids: ['a', 'b'] }] }));
  const g = await name('U ||| 子系统深潜', [['a', 'b']], { a: { id: 'a', title: 'Auth', scope: '' }, b: { id: 'b', title: 'OAuth', scope: '' } });
  assert.deepEqual(g, [{ name: '认证', ids: ['a', 'b'] }]);
});

test('makeClassify 容忍散文+围栏包裹的 JSON', async () => {
  const wrapped = '好的,这是路由结果:\n```json\n[{"id":"a","l1":"Reference","l2":"API 与契约"}]\n```\n希望有用!';
  const classify = makeClassify({ messages: { create: async () => ({ content: [{ type: 'text', text: wrapped }] }) } });
  const r = await classify([{ id: 'a', title: 'REST', scope: '' }]);
  assert.deepEqual(r, [{ id: 'a', l1: 'Reference', l2: 'API 与契约' }]);
});
