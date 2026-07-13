import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectLeafIds, checkMECE, l1Jaccard } from './wiki-tree-gate.js';
import type { NavNode } from '../wikimap/schema.js';

const tree: NavNode[] = [{
  kind: 'section', id: 'l1:U', title: '理解内部', children: [
    { kind: 'section', id: 'l2', title: '子系统深潜', children: [
      { kind: 'page', id: 'a', title: 'A' }, { kind: 'page', id: 'b', title: 'B' },
    ]},
  ],
}];

test('collectLeafIds 只收 page', () => {
  assert.deepEqual(collectLeafIds(tree).sort(), ['a', 'b']);
});
test('checkMECE 报孤儿与重复', () => {
  assert.deepEqual(checkMECE(['a', 'b'], tree), { ok: true, orphans: [], dups: [] });
  assert.deepEqual(checkMECE(['a', 'b', 'c'], tree).orphans, ['c']);
});
test('l1Jaccard 同结构=1', () => {
  assert.equal(l1Jaccard(tree, tree), 1);
});
