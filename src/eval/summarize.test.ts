import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPrompt } from './summarize.js';

test('buildPrompt: 把结构事实喂进 prompt(下游/跨层出现在提示里)', () => {
  const facts = { key_exports: ['sendMessage'], upstream: ['QueueManager'], downstream: ['a.ts','b.ts'], fanIn: 40, fanOut: 3, crossLayerEdges: ['pubsub_publish:notify-user'] };
  const p = buildPrompt('app/messaging/sendMessage.ts', '## File: ...\nexport function sendMessage()', facts as any);
  assert.ok(p.includes('sendMessage'));
  assert.ok(p.includes('40') || p.toLowerCase().includes('fan'));  // fanIn 喂进去
  assert.ok(p.includes('notify-user'));                             // 跨层边喂进去
  assert.ok(p.includes('QueueManager'));                           // 上游喂进去
});
