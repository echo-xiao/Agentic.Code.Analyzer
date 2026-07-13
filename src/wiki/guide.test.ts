// src/wiki/guide.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { runGuide } from './guide.js';

test('runGuide 端到端(注入)：写回 nav 且 MECE 通过', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-'));
  const mapPath = path.join(dir, 'wiki-map.json');
  const vecPath = path.join(dir, 'vectors.json');
  fs.writeFileSync(mapPath, JSON.stringify({ pages: [
    { id: 'a', title: 'Auth', scope: '' }, { id: 'b', title: 'REST', scope: '' },
  ] }));
  fs.writeFileSync(vecPath, JSON.stringify({ a: [1, 0], b: [0, 1] }));
  const classify = async () => [
    { id: 'a', l1: 'Understand Internals' as const, l2: '子系统深潜' },
    { id: 'b', l1: 'Reference' as const, l2: 'API 与契约' },
  ];
  const nameClusters = async (_b: string, cl: string[][]) => cl.map((ids, i) => ({ name: `族${i}`, ids }));
  const { tree, mece } = await runGuide({ classify, nameClusters, wikiMapPath: mapPath, vectorsPath: vecPath });
  assert.equal(mece.ok, true);
  assert.ok(tree.length >= 1);
  const back = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  assert.ok(Array.isArray(back.nav));
});
