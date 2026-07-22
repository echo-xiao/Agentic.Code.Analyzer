import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TAXONOMY, areasOf, isValidArea, type IntentL1 } from '../../src/wiki/taxonomy.js';

test('three intent domains, fixed order', () => {
  assert.deepEqual(TAXONOMY.map(t => t.l1),
    ['Understand Internals', 'Build & Integrate', 'Reference']);
});
test('each domain has areas; areasOf/isValidArea agree', () => {
  for (const t of TAXONOMY) {
    assert.ok(t.areas.length >= 1);
    assert.deepEqual(areasOf(t.l1), t.areas);
    assert.ok(isValidArea(t.l1, t.areas[0]));
    assert.equal(isValidArea(t.l1, 'Nonexistent Area'), false);
  }
});
