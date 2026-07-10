import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INDEX_DIR, CHUNKS_PATH, MODULE_GRAPH_PATH, GENERATOR_VERSION } from './config.js';

test('config: data/index 路径正确且 GENERATOR_VERSION 已 bump', () => {
    assert.ok(INDEX_DIR.endsWith('/data/index'), `INDEX_DIR=${INDEX_DIR}`);
    assert.ok(CHUNKS_PATH.endsWith('/data/index/chunks.json'));
    assert.ok(MODULE_GRAPH_PATH.endsWith('/data/index/module-graph.json'));
    assert.equal(GENERATOR_VERSION, '11');   // 从 '10' bump,触发全库 mapping 重生成
});
