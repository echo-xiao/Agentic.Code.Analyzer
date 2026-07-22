import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import { computeFacts, CROSS_LAYER_EDGE_TYPES } from '../../src/indexer/structural-facts.js';
import { relPathOf } from '../../src/indexer/chunks.js';

function resetIndex() {
  GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.fileDependents.clear();
  GLOBAL_INDEX.allFiles.clear(); GLOBAL_INDEX.callGraph.clear();
}

test('computeFacts: deterministic extraction of key_exports/fanIn/downstream/crossLayer', () => {
  resetIndex();
  // Target file a.ts defines foo (exported) + emits a pubsub; depended on by b.ts and c.ts
  // Use absolute paths that resolve to predictable rel paths via relPathOf
  const TARGET = process.env.TARGET_SRC_DIR || '/repo';
  const A = `${TARGET}/a.ts`;
  const B = `${TARGET}/b.ts`;
  const C = `${TARGET}/c.ts`;

  GLOBAL_INDEX.allFiles.add(A);
  GLOBAL_INDEX.symbols.set('foo', new Set([A]));
  GLOBAL_INDEX.fileDependents.set(A, new Set([B, C])); // who imports me = downstream

  const symbols = [
    { name: 'foo', exported: true, calls: [{ name: 'notify-user', edgeType: 'pubsub_publish' }, { name: 'bar', edgeType: 'call' }] },
    { name: 'helper', exported: false, calls: [] },
  ];
  const relFile = relPathOf(A);
  const f = computeFacts(relFile, symbols);
  assert.deepEqual(f.key_exports, ['foo']);          // only the exported one
  assert.equal(f.fanIn, 2);                           // b.ts, c.ts
  assert.ok(f.downstream.includes(relPathOf(B)));
  assert.ok(f.downstream.includes(relPathOf(C)));
  assert.ok(f.crossLayerEdges.some(e => e.includes('notify-user'))); // pubsub is cross-layer
  assert.ok(f.fanOut >= 1);                            // called bar
});

test('CROSS_LAYER_EDGE_TYPES contains the 8 cross-layer edge types', () => {
  for (const t of ['event_emit','pubsub_publish','rest_call','stream_def']) assert.ok(CROSS_LAYER_EDGE_TYPES.has(t));
  assert.ok(!CROSS_LAYER_EDGE_TYPES.has('call')); // a plain call is not cross-layer
});
