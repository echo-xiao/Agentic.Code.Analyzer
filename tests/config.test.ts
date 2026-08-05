import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DATA_DIR, OUTPUT_DIR, GENERATOR_VERSION } from '../src/config.js';

test('config: paths are correct and GENERATOR_VERSION has been bumped', () => {
    assert.ok(DATA_DIR.endsWith('/data'), `DATA_DIR=${DATA_DIR}`);
    assert.ok(OUTPUT_DIR.endsWith('/output.nosync'), `OUTPUT_DIR=${OUTPUT_DIR}`);
    assert.equal(GENERATOR_VERSION, '11');   // bumped from '10', triggers a full-repo mapping regeneration
});
