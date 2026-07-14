import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildGuideTree } from '../../src/wiki/tree.js';
import type { Routing } from '../../src/wiki/route.js';
import type { Families } from '../../src/wiki/families.js';

const pages = [{ id: 'a', title: 'A' }, { id: 'b', title: 'B' }, { id: 'c', title: 'C' }];
const routing: Routing = {
  a: { l1: 'Understand Internals', l2: 'Subsystem Deep-Dives' },
  b: { l1: 'Understand Internals', l2: 'Subsystem Deep-Dives' },
  c: { l1: 'Reference', l2: 'API & Contracts' },
};
const families: Families = { a: '认证', b: '认证' }; // a,b 同族；c 无族

test('4 级：L1>L2>L3家族>页；无族页折叠到 L2', () => {
  const tree = buildGuideTree(pages, routing, families);
  assert.equal(tree[0].title, 'Understand Internals');            // L1 label
  const l2 = tree[0].children![0];
  assert.equal(l2.title, 'Subsystem Deep-Dives');
  const fam = l2.children![0];
  assert.equal(fam.kind, 'section');
  assert.equal(fam.title, '认证');
  assert.deepEqual(fam.children!.map(n => n.id).sort(), ['a', 'b']);
  // Reference/c：无族 → 页直接挂 L2
  const ref = tree.find(n => n.title === 'Reference')!;
  assert.equal(ref.children![0].children![0].id, 'c');
  assert.equal(ref.children![0].children![0].kind, 'page');
});
