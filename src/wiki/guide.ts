// src/wiki/guide.ts
import '../eval/utils/load-env.js';
import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';
import { DATA_DIR } from '../config.js';
import type { WikiMap, NavNode } from '../wikimap/schema.js';
import { routeLeaves, type Classify } from './route.js';
import { clusterFamilies, type NameClusters } from './families.js';
import { buildGuideTree } from './tree.js';
import { checkMECE } from '../eval/wiki-tree-gate.js';
import { makeClassify, makeNameClusters } from './guide-llm.js';

/** 从页的 source_files 文件向量取均值，得到页级向量（summary-vectors 是文件键，需聚到页）。 */
export function aggregatePageVectors(
  pages: { id: string; source_files?: Record<string, string[]> }[],
  fileVectors: Record<string, number[]>,
): Record<string, number[]> {
  const out: Record<string, number[]> = {};
  for (const p of pages) {
    const vs = Object.keys(p.source_files || {}).map(f => fileVectors[f]).filter((v): v is number[] => Array.isArray(v));
    if (!vs.length) continue;
    const dim = vs[0].length;
    const mean = new Array(dim).fill(0);
    for (const v of vs) for (let i = 0; i < dim; i++) mean[i] += v[i] / vs.length;
    out[p.id] = mean;
  }
  return out;
}

export async function runGuide(deps: {
  classify?: Classify; nameClusters?: NameClusters; wikiMapPath?: string; vectorsPath?: string;
} = {}): Promise<{ tree: NavNode[]; mece: ReturnType<typeof checkMECE> }> {
  const mapPath = deps.wikiMapPath ?? path.join(DATA_DIR, 'wiki-map.json');
  const vecPath = deps.vectorsPath ?? path.join(DATA_DIR, 'summaries', 'summary-vectors.json');
  const classify = deps.classify ?? makeClassify();
  const nameClusters = deps.nameClusters ?? makeNameClusters();

  const map: WikiMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const fileVectors: Record<string, number[]> = fs.existsSync(vecPath) ? JSON.parse(fs.readFileSync(vecPath, 'utf8')) : {};
  const inputs = map.pages.map(p => ({ id: p.id, title: p.title, scope: p.scope ?? '' }));

  const pageVectors = aggregatePageVectors(map.pages, fileVectors);
  const routing = await routeLeaves(inputs, classify);
  const families = await clusterFamilies(inputs, routing, pageVectors, nameClusters);
  const tree = buildGuideTree(map.pages.map(p => ({ id: p.id, title: p.title })), routing, families);
  const mece = checkMECE(map.pages.map(p => p.id), tree);
  if (!mece.ok) throw new Error(`MECE 失败 orphans=${mece.orphans} dups=${mece.dups}`);

  map.nav = tree;
  fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
  return { tree, mece };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runGuide().then(({ tree, mece }) => { console.error(`nav L1=${tree.length} MECE=${mece.ok}`); });
}
