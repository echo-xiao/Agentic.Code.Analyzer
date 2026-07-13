import type { Routing } from './route.js';

export interface FamilyInput { id: string; title: string; scope: string }
export type NameClusters = (bucket: string, clusters: string[][], pages: Record<string, FamilyInput>) => Promise<{ name: string; ids: string[] }[]>;
export type Families = Record<string, string>;

function cos(a: number[], b: number[]): number {
  let d = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { d += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return (na && nb) ? d / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

export function cosineCluster(ids: string[], vectors: Record<string, number[]>, maxSize: number): string[][] {
  let cl = ids.map(id => [id]);
  const centroid = (c: string[]) => c.filter(id => vectors[id]).map(id => vectors[id]);
  const sim = (a: string[], b: string[]) => {
    const va = centroid(a), vb = centroid(b);
    if (!va.length || !vb.length) return -1;
    let s = 0, n = 0;
    for (const x of va) for (const y of vb) { s += cos(x, y); n++; }
    return n ? s / n : -1;
  };
  while (true) {
    let best = 0, bi = -1, bj = -1;                     // 阈值 0：只并正相关
    for (let i = 0; i < cl.length; i++) for (let j = i + 1; j < cl.length; j++) {
      if (cl[i].length + cl[j].length > maxSize) continue;
      const s = sim(cl[i], cl[j]); if (s > best) { best = s; bi = i; bj = j; }
    }
    if (bi < 0) break;
    cl[bi] = [...cl[bi], ...cl[bj]]; cl.splice(bj, 1);
  }
  return cl;
}

export async function clusterFamilies(
  pages: FamilyInput[], routing: Routing, vectors: Record<string, number[]>,
  nameClusters: NameClusters, minBucket = 7, maxSize = 8,
): Promise<Families> {
  const byId = Object.fromEntries(pages.map(p => [p.id, p]));
  const buckets: Record<string, string[]> = {};
  for (const p of pages) { const r = routing[p.id]; if (!r) continue; (buckets[`${r.l1} ||| ${r.l2}`] ??= []).push(p.id); }
  const fam: Families = {};
  for (const [bucket, ids] of Object.entries(buckets)) {
    if (ids.length < minBucket) continue;               // 小桶不产 L3
    const clusters = cosineCluster(ids, vectors, maxSize);
    const named = await nameClusters(bucket, clusters, byId);
    const seen = new Set<string>();
    for (const g of named) for (const id of g.ids) if (byId[id]) { fam[id] = g.name; seen.add(id); }
    for (const id of ids) if (!seen.has(id)) fam[id] = '其他';   // 兜底 MECE
  }
  return fam;
}
