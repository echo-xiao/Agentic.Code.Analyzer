import { test } from 'node:test';
import assert from 'node:assert/strict';
import { semanticPageScores } from '../../../../src/server/engine/walker/semantic-page.js';
import type { WikiMap } from '../../../../src/wikimap/schema.js';

const F = (a: number[]) => Float32Array.from(a);
const map = {
  pages: [
    { page: 'A', source_files: { 'x.ts': ['L1'], 'y.ts': ['L1'] } },
    { page: 'B', source_files: { 'z.ts': ['L1'] } },
    { page: 'C', source_files: { 'nov.ts': ['L1'] } },   // no vector
  ],
} as unknown as WikiMap;

test('page semantic score = max cosine of the page files vectors against the query', () => {
  const q = F([1, 0]);
  const vectors = new Map<string, Float32Array>([
    ['x.ts', F([0, 1])], ['y.ts', F([0.99, 0.01])], ['z.ts', F([-1, 0])],
  ]);
  const s = semanticPageScores(q, map, vectors);
  assert.ok(Math.abs(s.get('A')! - 0.9998) < 1e-2);   // y.ts is almost collinear with q → take max
  assert.ok(s.get('B')! < 0);                          // z.ts points the opposite way
  assert.equal(s.has('C'), false);                     // file with no vector → not included
});
