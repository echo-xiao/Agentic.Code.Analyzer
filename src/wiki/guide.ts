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

export async function runGuide(deps: {
  classify?: Classify; nameClusters?: NameClusters; wikiMapPath?: string; vectorsPath?: string;
} = {}): Promise<{ tree: NavNode[]; mece: ReturnType<typeof checkMECE> }> {
  const mapPath = deps.wikiMapPath ?? path.join(DATA_DIR, 'wiki-map.json');
  const vecPath = deps.vectorsPath ?? path.join(DATA_DIR, 'summaries', 'summary-vectors.json');
  const classify = deps.classify ?? makeClassify();
  const nameClusters = deps.nameClusters ?? makeNameClusters();

  const map: WikiMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const vectors: Record<string, number[]> = fs.existsSync(vecPath) ? JSON.parse(fs.readFileSync(vecPath, 'utf8')) : {};
  const inputs = map.pages.map(p => ({ id: p.id, title: p.title, scope: p.scope ?? '' }));

  const routing = await routeLeaves(inputs, classify);
  const families = await clusterFamilies(inputs, routing, vectors, nameClusters);
  const tree = buildGuideTree(map.pages.map(p => ({ id: p.id, title: p.title })), routing, families);
  const mece = checkMECE(map.pages.map(p => p.id), tree);
  if (!mece.ok) throw new Error(`MECE 失败 orphans=${mece.orphans} dups=${mece.dups}`);

  map.nav = tree;
  fs.writeFileSync(mapPath, JSON.stringify(map, null, 0));
  return { tree, mece };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runGuide().then(({ tree, mece }) => { console.error(`nav L1=${tree.length} MECE=${mece.ok}`); });
}
