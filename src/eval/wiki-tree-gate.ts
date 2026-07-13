import type { NavNode } from '../wikimap/schema.js';

export function collectLeafIds(tree: NavNode[]): string[] {
  const out: string[] = [];
  const walk = (n: NavNode) => { if (n.kind === 'page') out.push(n.id); n.children?.forEach(walk); };
  tree.forEach(walk);
  return out;
}

export function checkMECE(pageIds: string[], tree: NavNode[]): { ok: boolean; orphans: string[]; dups: string[] } {
  const leaves = collectLeafIds(tree);
  const leafSet = new Set(leaves);
  const seen = new Set<string>(), dups: string[] = [];
  for (const id of leaves) { if (seen.has(id)) dups.push(id); seen.add(id); }
  const orphans = pageIds.filter(id => !leafSet.has(id));
  return { ok: orphans.length === 0 && dups.length === 0, orphans, dups };
}

export function l1Jaccard(a: NavNode[], b: NavNode[]): number {
  const sa = new Set(a.map(n => n.title)), sb = new Set(b.map(n => n.title));
  const inter = [...sa].filter(x => sb.has(x)).length;
  const uni = new Set([...sa, ...sb]).size;
  return uni ? inter / uni : 1;
}
