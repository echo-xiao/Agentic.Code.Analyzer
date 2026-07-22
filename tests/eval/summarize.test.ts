import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPrompt } from '../../src/eval/summarize.js';

test('buildPrompt: feeds structural facts into the prompt (downstream/cross-layer appear in the prompt)', () => {
  const facts = { key_exports: ['sendMessage'], upstream: ['QueueManager'], downstream: ['a.ts','b.ts'], fanIn: 40, fanOut: 3, crossLayerEdges: ['pubsub_publish:notify-user'] };
  const p = buildPrompt('app/messaging/sendMessage.ts', '## File: ...\nexport function sendMessage()', facts as any);
  assert.ok(p.includes('sendMessage'));
  assert.ok(p.includes('40') || p.toLowerCase().includes('fan'));  // fanIn fed in
  assert.ok(p.includes('notify-user'));                             // cross-layer edge fed in
  assert.ok(p.includes('QueueManager'));                           // upstream fed in
});
