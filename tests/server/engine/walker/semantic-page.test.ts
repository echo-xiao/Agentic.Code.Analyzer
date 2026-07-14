import { test } from 'node:test';
import assert from 'node:assert/strict';
import { semanticPageScores } from '../../../../src/server/engine/walker/semantic-page.js';
import type { WikiMap } from '../../../../src/wikimap/schema.js';

const F = (a: number[]) => Float32Array.from(a);
const map = {
  pages: [
    { page: 'A', source_files: { 'x.ts': ['L1'], 'y.ts': ['L1'] } },
    { page: 'B', source_files: { 'z.ts': ['L1'] } },
    { page: 'C', source_files: { 'nov.ts': ['L1'] } },   // 无向量
  ],
} as unknown as WikiMap;

test('页语义分 = 页内文件向量与 query 的最大 cosine', () => {
  const q = F([1, 0]);
  const vectors = new Map<string, Float32Array>([
    ['x.ts', F([0, 1])], ['y.ts', F([0.99, 0.01])], ['z.ts', F([-1, 0])],
  ]);
  const s = semanticPageScores(q, map, vectors);
  assert.ok(Math.abs(s.get('A')! - 0.9998) < 1e-2);   // y.ts 与 q 几乎同向 → 取 max
  assert.ok(s.get('B')! < 0);                          // z.ts 反向
  assert.equal(s.has('C'), false);                     // 无向量文件 → 不入
});
