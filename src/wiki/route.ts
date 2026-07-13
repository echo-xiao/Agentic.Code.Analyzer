import { areasOf, isValidArea, TAXONOMY, type IntentL1 } from './taxonomy.js';

export interface RouteInput { id: string; title: string; scope: string }
export interface Routed { id: string; l1: IntentL1; l2: string }
export type Classify = (pages: RouteInput[]) => Promise<Routed[]>;
export type Routing = Record<string, { l1: IntentL1; l2: string }>;

const VALID_L1 = new Set(TAXONOMY.map(t => t.l1));
const DEFAULT_L1: IntentL1 = 'Understand Internals';
const DEFAULT_L2 = '子系统深潜';

export async function routeLeaves(pages: RouteInput[], classify: Classify): Promise<Routing> {
  const raw = await classify(pages);
  const byId = new Map(raw.map(r => [r.id, r]));
  const out: Routing = {};
  for (const p of pages) {
    const r = byId.get(p.id);
    if (!r) {
      // Page missing from classify output → default
      out[p.id] = { l1: DEFAULT_L1, l2: DEFAULT_L2 };
    } else {
      // Page exists in classify output
      let l1 = VALID_L1.has(r.l1) ? r.l1 : DEFAULT_L1;
      let l2 = isValidArea(l1, r.l2) ? r.l2 : areasOf(l1)[0];
      out[p.id] = { l1, l2 };
    }
  }
  return out;
}
