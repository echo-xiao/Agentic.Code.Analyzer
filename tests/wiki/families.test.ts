import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cosineCluster, clusterFamilies, type FamilyInput, type NameClusters } from '../../src/wiki/families.js';
import type { Routing } from '../../src/wiki/route.js';

test('cosineCluster: merges near vectors, bounded by maxSize', () => {
  const v = { a: [1, 0], b: [0.99, 0.01], c: [0, 1], d: [0.01, 0.99] };
  const cl = cosineCluster(['a', 'b', 'c', 'd'], v, 2);
  const sizes = cl.map(c => c.length).sort();
  assert.deepEqual(sizes, [2, 2]);       // {a,b} {c,d}
});

test('clusterFamilies: only clusters buckets >= minBucket', async () => {
  const pages: FamilyInput[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(id => ({ id, title: id, scope: '' }));
  const routing: Routing = Object.fromEntries(pages.map(p => [p.id, { l1: 'Understand Internals' as const, l2: 'Subsystem Deep-Dives' }]));
  const vectors = Object.fromEntries(pages.map((p, i) => [p.id, [Math.cos(i), Math.sin(i)]]));
  const nameClusters: NameClusters = async (_b, clusters) => clusters.map((ids, i) => ({ name: `Family ${i}`, ids }));
  const fam = await clusterFamilies(pages, routing, vectors, nameClusters, 7, 4);
  assert.equal(Object.keys(fam).length, 7);          // all 7 pages covered (bucket=7 >= minBucket)
  assert.ok(new Set(Object.values(fam)).size >= 2);  // at least 2 families
});

test('cosineCluster: ids without a vector each form their own cluster', () => {
  const v = { a: [1, 0], b: [0.99, 0.01] }; // c,d have no vector
  const cl = cosineCluster(['a', 'b', 'c', 'd'], v, 4);
  const sizes = cl.map(c => c.length).sort();
  assert.deepEqual(sizes, [1, 1, 2]);                       // a,b merged; c,d each a singleton cluster
  assert.ok(cl.some(c => c.length === 1 && c[0] === 'c'));
  assert.ok(cl.some(c => c.length === 1 && c[0] === 'd'));
});

test('clusterFamilies: small bucket (<minBucket) produces no families', async () => {
  const pages: FamilyInput[] = ['a', 'b', 'c'].map(id => ({ id, title: id, scope: '' }));
  const routing: Routing = Object.fromEntries(pages.map(p => [p.id, { l1: 'Understand Internals' as const, l2: 'Subsystem Deep-Dives' }]));
  const vectors = Object.fromEntries(pages.map((p, i) => [p.id, [Math.cos(i), Math.sin(i)]]));
  const nameClusters: NameClusters = async (_b, cl) => cl.map((ids, i) => ({ name: `Family ${i}`, ids }));
  const fam = await clusterFamilies(pages, routing, vectors, nameClusters, 7, 4); // bucket=3 < 7
  assert.equal(Object.keys(fam).length, 0);                 // no families
});
