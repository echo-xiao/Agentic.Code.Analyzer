// src/indexer/build-modulegraph.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('build-modulegraph 导出 main', async () => {
    const mod = await import('./build-modulegraph.js');
    assert.equal(typeof mod.main, 'function');
});
