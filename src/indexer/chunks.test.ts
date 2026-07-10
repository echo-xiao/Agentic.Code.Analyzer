import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chunkId, buildChunks, loadChunks, chunksBySymbol, chunksByFile, type Chunk } from './chunks.js';
import * as fs from 'fs';
import { OUTPUT_DIR } from '../config.js';

const SAMPLE: Record<string, Chunk> = {
    'a.ts#foo': { id: 'a.ts#foo', kind: 'function', name: 'foo', file: 'a.ts', startLine: 1, endLine: 3, signature: 'foo()', exported: true },
    'b.ts#foo': { id: 'b.ts#foo', kind: 'function', name: 'foo', file: 'b.ts', startLine: 1, endLine: 3, signature: 'foo()', exported: true },
    'a.ts#bar': { id: 'a.ts#bar', kind: 'function', name: 'bar', file: 'a.ts', startLine: 5, endLine: 7, signature: 'bar()', exported: false },
};

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

test('chunksBySymbol: 同名符号聚到一起', () => {
    const bySym = chunksBySymbol(SAMPLE);
    assert.equal(bySym.get('foo')!.length, 2);
    assert.equal(bySym.get('bar')!.length, 1);
});

test('chunksByFile: 按文件聚', () => {
    const byFile = chunksByFile(SAMPLE);
    assert.equal(byFile.get('a.ts')!.length, 2);
    assert.equal(byFile.get('b.ts')!.length, 1);
});
