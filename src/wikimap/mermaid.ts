import type { WikiDiagram } from './schema.js';

const NODE_RE = /^\s*(\w+)\[["']?(.+?)["']?\]\s*$/gm;
const EDGE_RE = /^\s*(\w+)\s*(?:-{1,3}\.?-*>|={2}>)\s*(?:\|"?([^|"\n]*)"?\|\s*)?(\w+)\s*$/gm;
const SUBGRAPH_RE = /subgraph\s+"?([^"\n]+?)"?\s*$/gm;
function cleanLabel(s: string): string { return s.replace(/<br\s*\/?>/g, ' / ').trim(); }

/** mermaid flowchart block → structure (§7.4: backfill diagrams after generation; retained piece of the wiki parser). */
export function parseMermaid(block: string): WikiDiagram {
  const nodes: Record<string, string> = {};
  for (const m of block.matchAll(NODE_RE)) nodes[m[1]] = cleanLabel(m[2]);
  const edges: string[][] = [];
  for (const m of block.matchAll(EDGE_RE)) {
    // Skip lines that mis-match node definitions (EDGE_RE should only hit the A --> B form)
    if (!m[3]) continue;
    const e = [m[1], m[3]];
    if (m[2]) e.push(m[2].trim());
    edges.push(e);
  }
  const subgraphs = [...block.matchAll(SUBGRAPH_RE)].map(m => m[1].trim());
  return { nodes, edges, subgraphs };
}

const nodeId = (s: string) => s.replace(/[^A-Za-z0-9_]/g, '_').slice(0, 60);

/** Real edge set → mermaid flowchart string (§7.4: nodes/edges come from real data, not LLM hallucination). */
export function renderFlowchart(
  nodes: Record<string, string>,
  edges: Array<[string, string, string?]>,
  subgraphs?: Record<string, string[]>,
): string {
  const lines: string[] = ['flowchart TD'];
  const emitted = new Set<string>();
  const emitNode = (id: string) => {
    const k = nodeId(id);
    if (emitted.has(k)) return; emitted.add(k);
    lines.push(`  ${k}["${(nodes[id] ?? id).replace(/"/g, "'")}"]`);
  };
  if (subgraphs) for (const [name, ids] of Object.entries(subgraphs)) {
    lines.push(`  subgraph ${name.replace(/[^A-Za-z0-9_ ]/g, '_')}`);
    for (const id of ids) emitNode(id);
    lines.push('  end');
  } else for (const id of Object.keys(nodes)) emitNode(id);
  for (const [a, b, label] of edges) {
    emitNode(a); emitNode(b);
    lines.push(label ? `  ${nodeId(a)} -->|${label.replace(/"/g, "'").replace(/\|/g, '/')}| ${nodeId(b)}` : `  ${nodeId(a)} --> ${nodeId(b)}`);
  }
  return lines.join('\n');
}

/** One main call-chain → mermaid sequence (§7.4 end-to-end flow). */
export function renderSequence(title: string, steps: Array<[string, string, string]>): string {
  const lines: string[] = [`sequenceDiagram`, `  title ${title}`];
  for (const [from, to, msg] of steps) lines.push(`  ${nodeId(from)}->>${nodeId(to)}: ${msg}`);
  return lines.join('\n');
}
