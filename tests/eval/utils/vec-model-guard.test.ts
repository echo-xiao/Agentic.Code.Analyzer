import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { shouldReset, guardModel, stampModel } from '../../../src/eval/utils/vec-model-guard.js';

test('shouldReset: 只在有旧戳且模型不同才重置', () => {
    assert.equal(shouldReset('Xenova/all-MiniLM-L6-v2', 'Xenova/bge-small-en-v1.5'), true);
    assert.equal(shouldReset('Xenova/bge-small-en-v1.5', 'Xenova/bge-small-en-v1.5'), false);
    assert.equal(shouldReset(null, 'Xenova/bge-small-en-v1.5'), false); // 首次无戳,不重置
});

test('guardModel: 模型变了删旧向量库;stampModel 写戳', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vg-'));
    const store = path.join(dir, 'vec.json');
    fs.writeFileSync(store, '{"a":{"hash":"x","vec":"y"}}');
    // 先盖旧模型戳
    stampModel(store, 'old-model');
    assert.ok(fs.existsSync(store + '.model'));
    // 模型换了 → guardModel 删掉向量库
    guardModel(store, 'new-model');
    assert.equal(fs.existsSync(store), false, '模型变应删旧向量库');
    // 相同模型 → 不删
    fs.writeFileSync(store, '{}'); stampModel(store, 'new-model');
    guardModel(store, 'new-model');
    assert.ok(fs.existsSync(store), '同模型不该删');
    fs.rmSync(dir, { recursive: true, force: true });
});
