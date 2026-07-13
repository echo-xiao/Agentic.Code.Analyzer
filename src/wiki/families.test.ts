import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cosineCluster, clusterFamilies, type FamilyInput, type NameClusters } from './families.js';
import type { Routing } from './route.js';

test('cosineCluster: 近向量并簇，受 maxSize 限', () => {
  const v = { a: [1, 0], b: [0.99, 0.01], c: [0, 1], d: [0.01, 0.99] };
  const cl = cosineCluster(['a', 'b', 'c', 'd'], v, 2);
  const sizes = cl.map(c => c.length).sort();
  assert.deepEqual(sizes, [2, 2]);       // {a,b} {c,d}
});

test('clusterFamilies: 只聚 >=minBucket 的桶', async () => {
  const pages: FamilyInput[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(id => ({ id, title: id, scope: '' }));
  const routing: Routing = Object.fromEntries(pages.map(p => [p.id, { l1: 'Understand Internals' as const, l2: '子系统深潜' }]));
  const vectors = Object.fromEntries(pages.map((p, i) => [p.id, [Math.cos(i), Math.sin(i)]]));
  const nameClusters: NameClusters = async (_b, clusters) => clusters.map((ids, i) => ({ name: `族${i}`, ids }));
  const fam = await clusterFamilies(pages, routing, vectors, nameClusters, 7, 4);
  assert.equal(Object.keys(fam).length, 7);          // 7 页全覆盖(桶=7 ≥ minBucket)
  assert.ok(new Set(Object.values(fam)).size >= 2);  // 至少 2 个家族
});
