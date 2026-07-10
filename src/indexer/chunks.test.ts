import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chunkId, buildChunks, loadChunks } from './chunks.js';
import * as fs from 'fs';
import { OUTPUT_DIR } from '../config.js';

test('chunkId: 用 qualifiedName 优先,拼成 file#symbol', () => {
    assert.equal(
        chunkId('apps/meteor/app/x/Calc.ts', { name: 'add', qualifiedName: 'Calc.add' }),
        'apps/meteor/app/x/Calc.ts#Calc.add'
    );
    assert.equal(
        chunkId('lib/util.ts', { name: 'addTwo' }),
        'lib/util.ts#addTwo'
    );
});

test('buildChunks: 有 prewarm 产物时能聚出非空 chunks(否则跳过)', { skip: !fs.existsSync(OUTPUT_DIR) }, async () => {
    const n = await buildChunks();
    assert.ok(n > 0, `应聚出 chunk,实际 ${n}`);
    const chunks = loadChunks()!;
    const anyChunk = Object.values(chunks)[0];
    assert.ok(anyChunk.file && anyChunk.endLine >= anyChunk.startLine);
});
