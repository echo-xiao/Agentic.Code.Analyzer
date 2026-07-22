import { cosine } from '../embeddings.js';
import type { WikiMap } from '../../../wikimap/schema.js';

/** Per-page semantic score = the max cosine between queryVec and any file vector in that page's source_files. Pages with no file vectors are omitted from the map. */
export function semanticPageScores(
  queryVec: Float32Array, map: WikiMap, vectors: Map<string, Float32Array>,
): Map<string, number> {
  const out = new Map<string, number>();
  for (const p of map.pages) {
    let best = -Infinity, any = false;
    for (const f of Object.keys(p.source_files || {})) {
      const v = vectors.get(f);
      if (!v) continue;
      any = true;
      const c = cosine(queryVec, v);
      if (c > best) best = c;
    }
    if (any) out.set(p.page, best);
  }
  return out;
}
