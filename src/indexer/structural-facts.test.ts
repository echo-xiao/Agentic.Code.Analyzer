import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from './state.js';
import { computeFacts, CROSS_LAYER_EDGE_TYPES } from './structural-facts.js';
import { relPathOf } from './chunks.js';

function resetIndex() {
  GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.fileDependents.clear();
  GLOBAL_INDEX.allFiles.clear(); GLOBAL_INDEX.callGraph.clear();
}

test('computeFacts: key_exports/fanIn/downstream/crossLayer 确定性抽取', () => {
  resetIndex();
  // 目标文件 a.ts 定义 foo(exported) + emit 一个 pubsub;被 b.ts、c.ts 依赖
  // Use absolute paths that resolve to predictable rel paths via relPathOf
  const TARGET = process.env.TARGET_SRC_DIR || '/repo';
  const A = `${TARGET}/a.ts`;
  const B = `${TARGET}/b.ts`;
  const C = `${TARGET}/c.ts`;

  GLOBAL_INDEX.allFiles.add(A);
  GLOBAL_INDEX.symbols.set('foo', new Set([A]));
  GLOBAL_INDEX.fileDependents.set(A, new Set([B, C])); // 谁 import 我 = downstream

  const symbols = [
    { name: 'foo', exported: true, calls: [{ name: 'notify-user', edgeType: 'pubsub_publish' }, { name: 'bar', edgeType: 'call' }] },
    { name: 'helper', exported: false, calls: [] },
  ];
  const relFile = relPathOf(A);
  const f = computeFacts(relFile, symbols);
  assert.deepEqual(f.key_exports, ['foo']);          // 只导出的
  assert.equal(f.fanIn, 2);                           // b.ts, c.ts
  assert.ok(f.downstream.includes(B));
  assert.ok(f.downstream.includes(C));
  assert.ok(f.crossLayerEdges.some(e => e.includes('notify-user'))); // pubsub 跨层
  assert.ok(f.fanOut >= 1);                            // 调了 bar
});

test('CROSS_LAYER_EDGE_TYPES 含 8 种跨层边', () => {
  for (const t of ['event_emit','pubsub_publish','rest_call','stream_def']) assert.ok(CROSS_LAYER_EDGE_TYPES.has(t));
  assert.ok(!CROSS_LAYER_EDGE_TYPES.has('call')); // 普通 call 不算跨层
});
