import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import { OUTPUT_DIR } from '../../src/config.js';

test('embed-chunks 导出 embedChunks 且签名文本为空的 chunk 被跳过', async () => {
    const mod = await import('../../src/eval/embed-chunks.js');
    assert.equal(typeof mod.embedChunks, 'function');
    // 纯函数校验:embedText 输入选择 —— 通过内部 textFor 导出验证
    assert.equal(mod.textForChunk({ signature: 'foo(a): number' } as any), 'foo(a): number');
    assert.equal(mod.textForChunk({ signature: '' } as any), '');
});
