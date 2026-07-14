import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TAXONOMY, areasOf, isValidArea, type IntentL1 } from '../../src/wiki/taxonomy.js';

test('三个意图域，顺序固定', () => {
  assert.deepEqual(TAXONOMY.map(t => t.l1),
    ['Understand Internals', 'Build & Integrate', 'Reference']);
});
test('每个域有区，areasOf/isValidArea 一致', () => {
  for (const t of TAXONOMY) {
    assert.ok(t.areas.length >= 1);
    assert.deepEqual(areasOf(t.l1), t.areas);
    assert.ok(isValidArea(t.l1, t.areas[0]));
    assert.equal(isValidArea(t.l1, '不存在的区'), false);
  }
});
