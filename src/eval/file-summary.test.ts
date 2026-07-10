import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleSummary, deriveRankingLine } from './file-summary.js';

const FACTS = { key_exports: ['sendMessage'], upstream: ['QueueManager'], downstream: ['x.ts'], fanIn: 40, fanOut: 3, crossLayerEdges: ['pubsub_publish:notify-user'] };
const LLM = { role: 'Delivers chat messages to rooms', responsibilities: ['persist message', 'run callbacks'], characteristics: ['hot-path', 'cross-layer-dispatcher'], subsystem_hint: 'messaging' };

test('assembleSummary: LLM 字段 + 结构字段 + ranking_line 合成', () => {
  const s = assembleSummary('h1', LLM, FACTS);
  assert.equal(s.hash, 'h1');
  assert.equal(s.role, LLM.role);
  assert.equal(s.fanIn, 40);                       // 结构字段来自 facts
  assert.deepEqual(s.key_exports, ['sendMessage']);
  assert.ok(s.ranking_line.includes('sendMessage')); // 派生行含 key 名词
});

test('deriveRankingLine: 含 role 关键词 + 导出名 + 特点,长度受限', () => {
  const line = deriveRankingLine(LLM, FACTS);
  assert.ok(line.includes('sendMessage'));
  assert.ok(line.includes('hot-path'));
  assert.ok(line.length <= 200);
});
