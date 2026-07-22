import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { shouldReset, guardModel, stampModel } from '../../../src/eval/utils/vec-model-guard.js';

test('shouldReset: resets only when there is an old stamp and the model differs', () => {
    assert.equal(shouldReset('Xenova/all-MiniLM-L6-v2', 'Xenova/bge-small-en-v1.5'), true);
    assert.equal(shouldReset('Xenova/bge-small-en-v1.5', 'Xenova/bge-small-en-v1.5'), false);
    assert.equal(shouldReset(null, 'Xenova/bge-small-en-v1.5'), false); // no stamp on first run, no reset
});

test('guardModel: deletes the old vector store when the model changes; stampModel writes the stamp', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vg-'));
    const store = path.join(dir, 'vec.json');
    fs.writeFileSync(store, '{"a":{"hash":"x","vec":"y"}}');
    // First stamp the old model
    stampModel(store, 'old-model');
    assert.ok(fs.existsSync(store + '.model'));
    // Model changed → guardModel deletes the vector store
    guardModel(store, 'new-model');
    assert.equal(fs.existsSync(store), false, 'a model change should delete the old vector store');
    // Same model → no deletion
    fs.writeFileSync(store, '{}'); stampModel(store, 'new-model');
    guardModel(store, 'new-model');
    assert.ok(fs.existsSync(store), 'same model should not delete');
    fs.rmSync(dir, { recursive: true, force: true });
});
