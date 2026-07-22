import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleSummary, deriveRankingLine } from '../../src/eval/file-summary.js';

const FACTS = { key_exports: ['sendMessage'], upstream: ['QueueManager'], downstream: ['x.ts'], fanIn: 40, fanOut: 3, crossLayerEdges: ['pubsub_publish:notify-user'] };
const LLM = { role: 'Delivers chat messages to rooms', responsibilities: ['persist message', 'run callbacks'], characteristics: ['hot-path', 'cross-layer-dispatcher'], subsystem_hint: 'messaging' };

test('assembleSummary: composes LLM fields + structural fields + ranking_line', () => {
  const s = assembleSummary('h1', LLM, FACTS);
  assert.equal(s.hash, 'h1');
  assert.equal(s.role, LLM.role);
  assert.equal(s.fanIn, 40);                       // structural fields come from facts
  assert.deepEqual(s.key_exports, ['sendMessage']);
  assert.ok(s.ranking_line.includes('sendMessage')); // derived line contains key nouns
});

test('deriveRankingLine: contains role keywords + export names + characteristics, length capped', () => {
  const line = deriveRankingLine(LLM, FACTS);
  assert.ok(line.includes('sendMessage'));
  assert.ok(line.includes('hot-path'));
  assert.ok(line.length <= 200);
});
