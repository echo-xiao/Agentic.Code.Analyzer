// src/wiki/guide.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { runGuide, aggregatePageVectors } from './guide.js';

test('runGuide 端到端(注入)：写回 nav 且 MECE 通过', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-'));
  const mapPath = path.join(dir, 'wiki-map.json');
  const vecPath = path.join(dir, 'vectors.json');
  fs.writeFileSync(mapPath, JSON.stringify({ pages: [
    { id: 'a', title: 'Auth', scope: '' }, { id: 'b', title: 'REST', scope: '' },
  ] }));
  fs.writeFileSync(vecPath, JSON.stringify({ a: [1, 0], b: [0, 1] }));
  const classify = async () => [
    { id: 'a', l1: 'Understand Internals' as const, l2: 'Subsystem Deep-Dives' },
    { id: 'b', l1: 'Reference' as const, l2: 'API & Contracts' },
  ];
  const nameClusters = async (_b: string, cl: string[][]) => cl.map((ids, i) => ({ name: `族${i}`, ids }));
  const { tree, mece } = await runGuide({ classify, nameClusters, wikiMapPath: mapPath, vectorsPath: vecPath });
  assert.equal(mece.ok, true);
  assert.ok(tree.length >= 1);
  const back = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  assert.ok(Array.isArray(back.nav));
});

test('aggregatePageVectors: 页向量=其 source_files 文件向量均值', () => {
  const pages = [
    { id: 'p1', source_files: { 'a.ts': ['L1'], 'b.ts': ['L2'] } },
    { id: 'p2', source_files: { 'c.ts': ['L1'] } },
    { id: 'p3', source_files: {} },            // 无文件向量 → 不产出
  ];
  const fileVectors = { 'a.ts': [1, 0], 'b.ts': [3, 4], 'c.ts': [0, 2] };
  const pv = aggregatePageVectors(pages, fileVectors);
  assert.deepEqual(pv['p1'], [2, 2]);          // 均值 ([1,0]+[3,4])/2
  assert.deepEqual(pv['p2'], [0, 2]);
  assert.equal(pv['p3'], undefined);           // 无向量的页不出现
});

test('aggregatePageVectors: 解码 base64 Float32 的 {vec} 条目(真实 summary-vectors 格式)', () => {
  const b64 = Buffer.from(new Float32Array([1, 0]).buffer).toString('base64');
  const pv = aggregatePageVectors(
    [{ id: 'p', source_files: { 'x.ts': ['L1'] } }],
    { 'x.ts': { hash: 'h', vec: b64 } },
  );
  assert.equal(pv['p'].length, 2);
  assert.ok(Math.abs(pv['p'][0] - 1) < 1e-6 && Math.abs(pv['p'][1]) < 1e-6);
});
