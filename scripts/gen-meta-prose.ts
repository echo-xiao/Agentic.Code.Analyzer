import '../src/eval/utils/load-env.js';
import * as fs from 'fs';
import * as path from 'path';
import { DATA_DIR, MODEL_TIERS } from '../src/config.js';
import { ensureIndex } from '../src/indexer/index.js';
import { addProse } from '../src/wiki/extractors/prose.js';
import type { MetaChapter } from '../src/wiki/extractors/types.js';

// Step 1 scope: the 4 "System Architecture" meta pages only.
const PAGES = ['monorepo', 'core-application', 'microservices', 'data-flow'];
const META_DIR = path.join(DATA_DIR, 'wiki-meta');

async function main() {
  await ensureIndex();   // one-time: populate GLOBAL_INDEX.allFiles for grounding
  const model = process.env.WIKI_PROSE_TIER === 'sonnet' ? MODEL_TIERS.chapter : MODEL_TIERS.leaf;
  console.log(`[prose] model=${model} — 4 pages, concurrent`);

  // 4 pages run concurrently; each is one addProse (one Claude call).
  await Promise.all(PAGES.map(async (name) => {
    const file = path.join(META_DIR, `${name}.json`);
    const chapter = JSON.parse(fs.readFileSync(file, 'utf8')) as MetaChapter;
    const out = await addProse(chapter, { model });
    fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
    const nNarr = out.prose.filter(s => s.narrative).length;
    console.log(`  ${name}: summary=${out.page.summary ? 'yes' : 'MISSING'}  narratives=${nNarr}/${out.prose.length}`);
  }));

  console.log('[prose] done — 4 pages regenerated');
}

main().catch(e => { console.error(e); process.exit(1); });
