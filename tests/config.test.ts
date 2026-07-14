import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INDEX_DIR, CHUNKS_PATH, MODULE_GRAPH_PATH, GENERATOR_VERSION, MODEL_TIERS } from '../src/config.js';

test('config: data/index 路径正确且 GENERATOR_VERSION 已 bump', () => {
    assert.ok(INDEX_DIR.endsWith('/data/index'), `INDEX_DIR=${INDEX_DIR}`);
    assert.ok(CHUNKS_PATH.endsWith('/data/index/chunks.json'));
    assert.ok(MODULE_GRAPH_PATH.endsWith('/data/index/module-graph.json'));
    assert.equal(GENERATOR_VERSION, '11');   // 从 '10' bump,触发全库 mapping 重生成
});

test('MODEL_TIERS 六档值锁定', () => {
  assert.equal(MODEL_TIERS.leaf, 'claude-haiku-4-5-20251001');
  assert.equal(MODEL_TIERS.module, 'claude-sonnet-4-6');
  assert.equal(MODEL_TIERS.outline, 'claude-sonnet-4-6');
  assert.equal(MODEL_TIERS.chapter, 'claude-sonnet-4-6');
  assert.equal(MODEL_TIERS.verify, 'claude-haiku-4-5-20251001');
  assert.equal(MODEL_TIERS.embed, 'Xenova/bge-small-en-v1.5');
});
