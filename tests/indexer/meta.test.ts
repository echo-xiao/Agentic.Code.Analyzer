import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { readIndexMeta, writeIndexMeta } from '../../src/indexer/meta.js';
import { GENERATOR_VERSION } from '../../src/config.js';

function tmpMetaPath(): string {
    return path.join(os.tmpdir(), `meta-${process.pid}-${Math.round(process.hrtime()[1])}.json`);
}

test('meta: 文件不存在时返回 null', () => {
    const p = tmpMetaPath();
    assert.equal(readIndexMeta(p), null);
});

test('meta: 写入后能原样读回，并自动带上当前 GENERATOR_VERSION', () => {
    const p = tmpMetaPath();
    try {
        writeIndexMeta('abc123', '2026-08-09T00:00:00.000Z', p);
        const m = readIndexMeta(p);
        assert.ok(m, 'should read back');
        assert.equal(m!.targetCommit, 'abc123');
        assert.equal(m!.generatorVersion, GENERATOR_VERSION);
        assert.equal(m!.builtAt, '2026-08-09T00:00:00.000Z');
    } finally {
        fs.rmSync(p, { force: true });
    }
});

test('meta: targetCommit 允许为 null（目标不是 git 仓库）', () => {
    const p = tmpMetaPath();
    try {
        writeIndexMeta(null, '2026-08-09T00:00:00.000Z', p);
        assert.equal(readIndexMeta(p)!.targetCommit, null);
    } finally {
        fs.rmSync(p, { force: true });
    }
});

test('meta: 文件损坏时返回 null 而不是抛异常', () => {
    const p = tmpMetaPath();
    try {
        fs.writeFileSync(p, '{ this is not json');
        assert.equal(readIndexMeta(p), null);
    } finally {
        fs.rmSync(p, { force: true });
    }
});

test('meta: 缺少 generatorVersion 字段视为无效', () => {
    const p = tmpMetaPath();
    try {
        fs.writeFileSync(p, JSON.stringify({ targetCommit: 'abc' }));
        assert.equal(readIndexMeta(p), null);
    } finally {
        fs.rmSync(p, { force: true });
    }
});
