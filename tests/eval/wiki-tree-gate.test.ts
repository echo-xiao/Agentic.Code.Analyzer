import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectLeafIds, checkMECE, l1Jaccard } from '../../src/eval/wiki-tree-gate.js';
import type { NavNode } from '../../src/wikimap/schema.js';

const tree: NavNode[] = [{
  kind: 'section', id: 'l1:U', title: 'Understanding Internals', children: [
    { kind: 'section', id: 'l2', title: 'Subsystem Deep Dive', children: [
      { kind: 'page', id: 'a', title: 'A' }, { kind: 'page', id: 'b', title: 'B' },
    ]},
  ],
}];

test('collectLeafIds collects only pages', () => {
  assert.deepEqual(collectLeafIds(tree).sort(), ['a', 'b']);
});
test('checkMECE reports orphans and duplicates', () => {
  assert.deepEqual(checkMECE(['a', 'b'], tree), { ok: true, orphans: [], dups: [] });
  assert.deepEqual(checkMECE(['a', 'b', 'c'], tree).orphans, ['c']);
});
test('l1Jaccard: identical structure = 1', () => {
  assert.equal(l1Jaccard(tree, tree), 1);
});
