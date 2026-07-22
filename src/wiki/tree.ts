import type { NavNode } from '../wikimap/schema.js';
import { TAXONOMY, type IntentL1 } from './taxonomy.js';
import type { Routing } from './route.js';
import type { Families } from './families.js';

const AXIS: Record<IntentL1, NavNode['axis']> = {
  'Understand Internals': 'architecture', 'Build & Integrate': 'integrate', 'Reference': 'reference',
};

export function buildGuideTree(
  pages: { id: string; title: string }[], routing: Routing, families: Families,
): NavNode[] {
  const title = new Map(pages.map(p => [p.id, p.title]));
  // (l1,l2) -> family -> ids ; use '' bucket when there is no family
  const grouped: Record<string, Record<string, Record<string, string[]>>> = {};
  for (const p of pages) {
    const r = routing[p.id]; if (!r) continue;
    const fam = families[p.id] ?? '';
    (((grouped[r.l1] ??= {})[r.l2] ??= {})[fam] ??= []).push(p.id);
  }
  const out: NavNode[] = [];
  for (const t of TAXONOMY) {
    const l1g = grouped[t.l1]; if (!l1g) continue;
    const l1: NavNode = { kind: 'section', id: `l1:${t.l1}`, title: t.label, axis: AXIS[t.l1], children: [] };
    for (const area of t.areas) {
      const fams = l1g[area]; if (!fams) continue;
      const l2: NavNode = { kind: 'section', id: `l2:${t.l1}:${area}`, title: area, children: [] };
      for (const [fam, ids] of Object.entries(fams)) {
        const leaves = ids.map(id => ({ kind: 'page', id, title: title.get(id) ?? id } as NavNode));
        if (fam === '' || ids.length === 1) l2.children!.push(...leaves);   // adaptive collapse
        else l2.children!.push({ kind: 'section', id: `l3:${t.l1}:${area}:${fam}`, title: fam, children: leaves });
      }
      l1.children!.push(l2);
    }
    out.push(l1);
  }
  return out;
}
