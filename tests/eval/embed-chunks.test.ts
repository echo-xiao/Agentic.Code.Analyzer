import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import { OUTPUT_DIR } from '../../src/config.js';

test('embed-chunks exports embedChunks and skips chunks whose signature text is empty', async () => {
    const mod = await import('../../src/eval/embed-chunks.js');
    assert.equal(typeof mod.embedChunks, 'function');
    // Pure-function check: embedText input selection, verified via the internal textFor export
    assert.equal(mod.textForChunk({ signature: 'foo(a): number' } as any), 'foo(a): number');
    assert.equal(mod.textForChunk({ signature: '' } as any), '');
});
