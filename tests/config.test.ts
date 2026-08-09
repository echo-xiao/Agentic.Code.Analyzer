import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DATA_DIR, OUTPUT_DIR, GENERATOR_VERSION, isIndexedSourceFile } from '../src/config.js';

test('config: paths are correct and GENERATOR_VERSION has been bumped', () => {
    assert.ok(DATA_DIR.endsWith('/data'), `DATA_DIR=${DATA_DIR}`);
    assert.ok(OUTPUT_DIR.endsWith('/output.nosync'), `OUTPUT_DIR=${OUTPUT_DIR}`);
    assert.equal(GENERATOR_VERSION, '11');   // bumped from '10', triggers a full-repo mapping regeneration
});

test('isIndexedSourceFile: plain .ts / .tsx / .js pass', () => {
    assert.equal(isIndexedSourceFile('apps/meteor/server/foo.ts'), true);
    assert.equal(isIndexedSourceFile('apps/meteor/client/Bar.tsx'), true);
    assert.equal(isIndexedSourceFile('apps/meteor/server/baz.js'), true);
});

test('isIndexedSourceFile: same extensions but scanDirectory-excluded patterns are rejected', () => {
    assert.equal(isIndexedSourceFile('apps/meteor/server/foo.d.ts'), false);
    assert.equal(isIndexedSourceFile('apps/meteor/server/foo.test.ts'), false);
    assert.equal(isIndexedSourceFile('apps/meteor/client/Bar.spec.tsx'), false);
    assert.equal(isIndexedSourceFile('apps/meteor/public/vendor.min.js'), false);
});

test('isIndexedSourceFile: node_modules and dist paths are rejected', () => {
    assert.equal(isIndexedSourceFile('apps/meteor/node_modules/lib/index.ts'), false);
    assert.equal(isIndexedSourceFile('apps/meteor/dist/bundle.js'), false);
});
