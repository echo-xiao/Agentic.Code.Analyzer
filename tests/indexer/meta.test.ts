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

test('meta: returns null when the file does not exist', () => {
    const p = tmpMetaPath();
    assert.equal(readIndexMeta(p), null);
});

test('meta: reads back exactly what was written, stamped with the current GENERATOR_VERSION', () => {
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

test('meta: targetCommit may be null (the target is not a git repository)', () => {
    const p = tmpMetaPath();
    try {
        writeIndexMeta(null, '2026-08-09T00:00:00.000Z', p);
        assert.equal(readIndexMeta(p)!.targetCommit, null);
    } finally {
        fs.rmSync(p, { force: true });
    }
});

test('meta: returns null on a corrupt file rather than throwing', () => {
    const p = tmpMetaPath();
    try {
        fs.writeFileSync(p, '{ this is not json');
        assert.equal(readIndexMeta(p), null);
    } finally {
        fs.rmSync(p, { force: true });
    }
});

test('meta: a missing generatorVersion field is treated as invalid', () => {
    const p = tmpMetaPath();
    try {
        fs.writeFileSync(p, JSON.stringify({ targetCommit: 'abc' }));
        assert.equal(readIndexMeta(p), null);
    } finally {
        fs.rmSync(p, { force: true });
    }
});
