/**
 * gen-diagrams-llm.ts — LLM-curated per-page architecture diagrams.
 *
 * The deterministic diagram builders dump the whole graph (500+ nodes → unrenderable).
 * Instead: give the LLM the page's REAL candidate graph (its modules + 1-hop neighbors +
 * real edges) and let it SELECT the 8-14 most important nodes + key edges. The LLM only
 * picks from real ids; a mechanical grounding step drops anything not in the candidate set.
 * Node labels come from the graph (not the LLM) → zero fabrication.
 *
 * Run: npx tsx scripts/gen-diagrams-llm.ts [--limit=N] [--dry]
 */
import '../src/eval/utils/load-env.js';
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { DATA_DIR, MODEL_TIERS, MODULE_GRAPH_PATH } from '../src/config.js';
import { runPool, callWithRetry } from '../src/eval/utils/pool.js';

const WIKI_MAP_PATH = path.join(DATA_DIR, 'wiki-map.json');
const MIN_MODULES = 3;                 // 碎页跳过
const MAX_CANDIDATES = 35;             // 喂给 LLM 的候选上限
const MAX_NODES = 15;                  // 最终图节点硬上限(安全)
const CONCURRENCY = Number(process.env.DIAGRAM_CONCURRENCY || 8);

const sanitize = (id: string) => id.replace(/[^a-zA-Z0-9_]/g, '_');

interface Mod { id: string; label?: string; edges?: [string, string, number][] }

function buildCandidates(coreIds: string[], byId: Map<string, Mod>) {
  const coreSet = new Set(coreIds.filter(id => byId.has(id)));
  // 1-hop neighbors (outgoing) of core, ranked by summed weight
  const nbrW = new Map<string, number>();
  for (const id of coreSet) {
    for (const [, to, w] of (byId.get(id)!.edges ?? [])) {
      if (to && !coreSet.has(to) && byId.has(to)) nbrW.set(to, (nbrW.get(to) ?? 0) + (w || 1));
    }
  }
  const neighbors = [...nbrW.entries()].sort((a, b) => b[1] - a[1])
    .slice(0, Math.max(0, MAX_CANDIDATES - coreSet.size)).map(([id]) => id);
  const candIds = [...coreSet, ...neighbors];
  const candSet = new Set(candIds);
  // real edges among candidates
  const seen = new Set<string>();
  const edges: [string, string][] = [];
  for (const id of candIds) {
    for (const [, to] of (byId.get(id)!.edges ?? [])) {
      if (candSet.has(to) && to !== id) { const k = id + '>' + to; if (!seen.has(k)) { seen.add(k); edges.push([id, to]); } }
    }
  }
  return { coreIds: [...coreSet], candIds, candSet, edges };
}

function buildPrompt(title: string, scope: string, core: string[], candIds: string[], edges: [string, string][], byId: Map<string, Mod>): string {
  const lbl = (id: string) => byId.get(id)?.label || id;
  return [
    `Draw a clean architecture diagram for ONE Rocket.Chat wiki page. You only SELECT nodes/edges — do not invent.`,
    `Page: ${title}`,
    `Scope: ${scope}`,
    ``,
    `Page's own modules: ${core.join(', ')}`,
    `Candidate modules (id — role):`,
    ...candIds.map(id => `  ${id} — ${lbl(id)}`),
    ``,
    `Real dependency edges among candidates (from -> to):`,
    ...edges.slice(0, 120).map(([f, t]) => `  ${f} -> ${t}`),
    ``,
    `TASK: pick the 8-14 MOST important modules + the key edges that best explain this subsystem to a new engineer.`,
    `Prefer the page's own modules and their most significant dependencies; drop noise/peripheral nodes.`,
    `Output ONLY JSON: {"nodes":["id",...],"edges":[["from","to"],...]}. Use ONLY ids from the candidates above.`,
    `If no meaningful diagram is possible, output {"nodes":[],"edges":[]}.`,
  ].join('\n');
}

function parseSel(raw: string): { nodes: string[]; edges: [string, string][] } | null {
  const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
  if (a < 0 || b <= a) return null;
  try {
    const j = JSON.parse(raw.slice(a, b + 1));
    return { nodes: Array.isArray(j.nodes) ? j.nodes : [], edges: Array.isArray(j.edges) ? j.edges : [] };
  } catch { return null; }
}

/** Ground the LLM selection against the real candidate set → a renderable WikiDiagram (sanitized ids). */
function ground(sel: { nodes: string[]; edges: [string, string][] }, candSet: Set<string>, realEdges: [string, string][], byId: Map<string, Mod>) {
  const chosen = sel.nodes.filter(id => candSet.has(id)).slice(0, MAX_NODES);
  const chosenSet = new Set(chosen);
  const realEdgeSet = new Set(realEdges.map(([f, t]) => f + '>' + t));
  const nodes: Record<string, string> = {};
  for (const id of chosen) nodes[sanitize(id)] = id.replace(/^(pkg|root|server|client|app):/, '') || id;
  const edges: string[][] = [];
  const emitted = new Set<string>();
  for (const e of sel.edges) {
    if (!Array.isArray(e) || e.length < 2) continue;
    const [f, t] = e;
    if (chosenSet.has(f) && chosenSet.has(t) && realEdgeSet.has(f + '>' + t)) {
      const k = sanitize(f) + '>' + sanitize(t);
      if (!emitted.has(k)) { emitted.add(k); edges.push([sanitize(f), sanitize(t)]); }
    }
  }
  return { nodes, edges, subgraphs: [] as string[] };
}

async function main() {
  const isDry = process.argv.includes('--dry');
  const limitArg = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
  const limit = limitArg ? parseInt(limitArg, 10) : undefined;

  const graph = JSON.parse(fs.readFileSync(MODULE_GRAPH_PATH, 'utf-8'));
  const byId = new Map<string, Mod>(graph.modules.map((m: Mod) => [m.id, m]));
  const wm = JSON.parse(fs.readFileSync(WIKI_MAP_PATH, 'utf-8'));

  let pages = wm.pages.filter((p: any) => (p.modules ?? []).length >= MIN_MODULES);
  if (limit !== undefined) pages = pages.slice(0, limit);
  console.error(`[diagram-llm] ${pages.length} 页有 >=${MIN_MODULES} modules(其余跳过);并发 ${CONCURRENCY}${isDry ? ' [dry]' : ''}`);

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
  if (!apiKey && !isDry) { console.error('[diagram-llm] 无 ANTHROPIC_API_KEY'); process.exit(1); }
  const client = apiKey ? new Anthropic({ apiKey }) : null;

  let done = 0, skipped = 0;
  await runPool(pages, isDry ? 1 : CONCURRENCY, async (page: any) => {
    const { coreIds, candIds, candSet, edges } = buildCandidates(page.modules, byId);
    if (candIds.length < 2) { skipped++; return; }
    if (isDry) { console.error(`  ${page.title}: ${coreIds.length} core + ${candIds.length - coreIds.length} nbr, ${edges.length} edges`); return; }

    const prompt = buildPrompt(page.title, page.scope || '', coreIds, candIds, edges, byId);
    try {
      const resp = await callWithRetry(() => client!.messages.create({
        model: MODEL_TIERS.leaf, max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      } as any));
      const text = (resp.content as any[]).find(b => b.type === 'text')?.text ?? '';
      const sel = parseSel(text);
      if (!sel) { skipped++; return; }
      const dia = ground(sel, candSet, edges, byId);
      if (Object.keys(dia.nodes).length >= 2) {
        page.diagrams = [dia];
        done++;
        fs.writeFileSync(WIKI_MAP_PATH, JSON.stringify(wm, null, 2), 'utf-8');   // checkpoint
        if (done % 10 === 0) console.error(`[diagram-llm] ${done} 页出图...`);
      } else { skipped++; }
    } catch (e: any) { console.error(`[diagram-llm] ${page.title} 失败: ${e?.message?.slice(0, 80)}`); skipped++; }
  });

  if (!isDry) fs.writeFileSync(WIKI_MAP_PATH, JSON.stringify(wm, null, 2), 'utf-8');
  console.error(`[diagram-llm] 完成:出图 ${done} 页,跳过 ${skipped} 页 → ${WIKI_MAP_PATH}`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
