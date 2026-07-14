#!/usr/bin/env npx tsx
/**
 * diagram.ts — P3 wiki:diagram (§7.4 三尺度 Mermaid).
 *
 * Exports (pure, graph-injectable for tests):
 *   systemCommunityDiagram(graph)             — GLOBAL: all modules + module→module edges
 *   moduleSliceDiagram(page, graph)           — page's modules + 1-hop neighbor modules
 *   componentDiagram(page, graph, callGraph)  — internal callGraph edges among module's files
 *   chainSequence(seedFile, graph, callGraph) — one end-to-end call chain via callGraph
 *   generateDiagrams(wikiMapPath?, graphPath?, callGraph?) — iterate wiki-map.json, fill diagrams
 *
 * All builders take the graph (and optionally callGraph) as injectable arguments.
 * The CLI wrapper reads real files; tests supply fixture data.
 *
 * §13 risk: after each render call, parseMermaid is run; diagrams that fail to parse
 * are DROPPED with a console.error warn.
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

import { DATA_DIR, MODULE_GRAPH_PATH } from '../config.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import type { WikiDiagram, WikiMap } from '../wikimap/schema.js';
import { parseMermaid, renderFlowchart, renderSequence } from '../wikimap/mermaid.js';

const WIKI_MAP_PATH = path.join(DATA_DIR, 'wiki-map.json');

// ── Types ─────────────────────────────────────────────────────────────────────

export interface GraphModule {
  id: string;
  subsystem: string;
  anchor: string;
  label: string;
  files: string[];
  entryFiles: string[];
  /** [fromModuleId, toModuleId, weight] — stored on the source module */
  edges: Array<[string, string, number]>;
}

export interface DiagramGraph {
  subsystems: Array<{ id: string; label: string; moduleIds: string[]; fileCount: number }>;
  modules: GraphModule[];
  file_to_module: Record<string, string>;
}

/** Minimal callGraph type matching GLOBAL_INDEX.callGraph shape */
export type CallGraphMap = Map<string, Array<{ caller: string; file: string; edgeType: string }>>;

// ── Helper: safe parseMermaid (§13 risk guard) ────────────────────────────────

// Sequence edge pattern: "A->>B: message" (mermaid sequence syntax)
const SEQ_EDGE_RE = /^\s*(\w+)[-=]{1,2}>+\s*(\w+)\s*:/gm;

export function safeParse(block: string, label: string): WikiDiagram | null {
  try {
    const d = parseMermaid(block);
    const isEmpty = Object.keys(d.nodes).length === 0 && d.edges.length === 0;
    if (isEmpty) {
      // parseMermaid is flowchart-only; sequence diagrams won't produce nodes/edges.
      // Validate sequence diagrams separately: must have at least one A->>B step.
      if (/^\s*sequenceDiagram/m.test(block)) {
        const seqEdges: string[][] = [];
        for (const m of block.matchAll(SEQ_EDGE_RE)) {
          seqEdges.push([m[1], m[2]]);
        }
        if (seqEdges.length === 0) {
          console.error(`[wiki:diagram] DROP ${label}: sequenceDiagram has no steps`);
          return null;
        }
        // Return a WikiDiagram with steps encoded as edges (from → to)
        const nodes: Record<string, string> = {};
        for (const [from, to] of seqEdges) { nodes[from] = from; nodes[to] = to; }
        return { nodes, edges: seqEdges, subgraphs: [] };
      }
      console.error(`[wiki:diagram] DROP ${label}: parseMermaid returned empty structure`);
      return null;
    }
    return d;
  } catch (e) {
    console.error(`[wiki:diagram] DROP ${label}: parseMermaid threw: ${e}`);
    return null;
  }
}

// ── systemCommunityDiagram ────────────────────────────────────────────────────

/**
 * GLOBAL scale: all modules as nodes, module→module edges across the whole graph.
 * nodes = { moduleId → label }, edges from module.edges (stored on source module).
 */
export function systemCommunityDiagram(graph: DiagramGraph): WikiDiagram | null {
  const nodes: Record<string, string> = {};
  for (const m of graph.modules) {
    nodes[m.id] = m.label || m.id;
  }

  const edges: Array<[string, string, string?]> = [];
  for (const m of graph.modules) {
    for (const [from, to, weight] of m.edges) {
      edges.push([from, to, String(weight)]);
    }
  }

  const block = renderFlowchart(nodes, edges);
  return safeParse(block, 'systemCommunityDiagram');
}

// ── moduleSliceDiagram ────────────────────────────────────────────────────────

/**
 * MODULE SLICE: the page's modules + their 1-hop neighbor modules only.
 * Filters module.edges to those touching any of the page's module ids.
 * "我连谁."
 */
export function moduleSliceDiagram(
  page: { modules: string[] },
  graph: DiagramGraph,
): WikiDiagram | null {
  const pageModuleSet = new Set(page.modules);
  const neighborSet = new Set<string>(page.modules);
  const sliceEdges: Array<[string, string, string?]> = [];

  for (const m of graph.modules) {
    for (const [from, to, weight] of m.edges) {
      if (pageModuleSet.has(from) || pageModuleSet.has(to)) {
        neighborSet.add(from);
        neighborSet.add(to);
        sliceEdges.push([from, to, String(weight)]);
      }
    }
  }

  const moduleById = new Map(graph.modules.map(m => [m.id, m]));
  const nodes: Record<string, string> = {};
  for (const id of neighborSet) {
    const m = moduleById.get(id);
    nodes[id] = m ? (m.label || id) : id;
  }

  const block = renderFlowchart(nodes, sliceEdges);
  return safeParse(block, `moduleSliceDiagram(${page.modules.join(',')})`);
}

// ── componentDiagram ──────────────────────────────────────────────────────────

/**
 * COMPONENT: internal structure of the page's modules.
 * Uses callGraph edges among the modules' member files (cross-layer sub-graph).
 * "模块内部."
 *
 * callGraph key convention:
 *   - In production: keys are symbol names; CallerRef.file is the calling file.
 *     We resolve callee file via GLOBAL_INDEX.symbols (Map<symbol, Set<file>>).
 *   - In tests: keys are callee file paths (simple fixture convention).
 */
export function componentDiagram(
  page: { modules: string[] },
  graph: DiagramGraph,
  callGraph: CallGraphMap = GLOBAL_INDEX.callGraph as CallGraphMap,
): WikiDiagram | null {
  const pageModuleSet = new Set(page.modules);

  // Collect all files belonging to the page's modules
  const internalFiles = new Set<string>();
  for (const m of graph.modules) {
    if (pageModuleSet.has(m.id)) {
      for (const f of m.files) internalFiles.add(f);
    }
  }

  if (internalFiles.size === 0) return null;

  // Build nodes: file → basename label
  const nodes: Record<string, string> = {};
  for (const f of internalFiles) {
    nodes[f] = path.basename(f).replace(/\.(tsx?|js)$/, '');
  }

  // Collect internal edges from callGraph
  const edgeSet = new Set<string>();
  const edges: Array<[string, string]> = [];

  for (const [calleeKey, callerRefs] of callGraph) {
    for (const { file: callerFile } of callerRefs) {
      if (!internalFiles.has(callerFile)) continue;
      if (callerFile === calleeKey) continue; // skip self-loops

      // Resolve callee file:
      // 1. If calleeKey is itself an internal file (test fixture convention)
      if (internalFiles.has(calleeKey)) {
        const edgeKey = `${callerFile}\0${calleeKey}`;
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edges.push([callerFile, calleeKey]);
        }
        continue;
      }

      // 2. Production: resolve symbol → file via GLOBAL_INDEX.symbols
      const symFiles = (GLOBAL_INDEX as { symbols: Map<string, Set<string>> }).symbols?.get?.(calleeKey);
      if (symFiles) {
        for (const sf of symFiles) {
          if (!internalFiles.has(sf) || sf === callerFile) continue;
          const edgeKey = `${callerFile}\0${sf}`;
          if (!edgeSet.has(edgeKey)) {
            edgeSet.add(edgeKey);
            edges.push([callerFile, sf]);
          }
        }
      }
    }
  }

  const block = renderFlowchart(nodes, edges);
  return safeParse(block, `componentDiagram(${page.modules.join(',')})`);
}

// ── chainSequence ─────────────────────────────────────────────────────────────

/**
 * SEQUENCE: one end-to-end call chain via callGraph down-style traversal from a seed file.
 * callGraph maps callee → callerRefs; we invert to get caller → callees, then DFS forward.
 * "一条链."
 */
export function chainSequence(
  seedFile: string,
  _graph: DiagramGraph,
  callGraph: CallGraphMap = GLOBAL_INDEX.callGraph as CallGraphMap,
  maxSteps = 8,
): WikiDiagram | null {
  // Build forward map: callerFile → [calleeKeys]
  const forwardMap = new Map<string, string[]>();
  for (const [calleeKey, callerRefs] of callGraph) {
    for (const { file: callerFile } of callerRefs) {
      const arr = forwardMap.get(callerFile);
      if (arr) {
        arr.push(calleeKey);
      } else {
        forwardMap.set(callerFile, [calleeKey]);
      }
    }
  }

  // DFS from seedFile
  const visited = new Set<string>();
  const steps: Array<[string, string, string]> = [];
  let current = seedFile;
  visited.add(current);

  for (let i = 0; i < maxSteps; i++) {
    const callees = forwardMap.get(current) ?? [];
    const next = callees.find(c => !visited.has(c));
    if (!next) break;
    const fromLabel = path.basename(current).replace(/\.(tsx?|js)$/, '');
    const toLabel = path.basename(next).replace(/\.(tsx?|js)$/, '');
    steps.push([fromLabel, toLabel, 'calls']);
    visited.add(next);

    // Advance `current` to the next CALLER FILE so the DFS keeps traversing.
    // callGraph keys are callee FILE paths in test fixtures, but callee SYMBOL names
    // in production; a symbol has no forwardMap entry, so resolve it to its defining
    // file via GLOBAL_INDEX.symbols (like componentDiagram) and continue from there.
    // Without this, production chains break after one hop (current=symbol → no edges).
    if (forwardMap.has(next)) {
      current = next;                                   // callee key is itself a caller file
    } else {
      const symFiles = (GLOBAL_INDEX as { symbols?: Map<string, Set<string>> }).symbols?.get?.(next);
      const nextFile = symFiles && [...symFiles].find(f => !visited.has(f) && forwardMap.has(f));
      if (!nextFile) break;
      visited.add(nextFile);
      current = nextFile;
    }
  }

  if (steps.length === 0) return null;

  const title = path.basename(seedFile).replace(/\.(tsx?|js)$/, '') + ' flow';
  const block = renderSequence(title, steps);
  return safeParse(block, `chainSequence(${seedFile})`);
}

// ── pickChainSeed ─────────────────────────────────────────────────────────────

const CROSS_LAYER: ReadonlySet<string> = new Set([
  'event_emit', 'event_listen', 'pubsub_publish', 'pubsub_subscribe',
  'rest_call', 'rest_route', 'stream_def', 'stream_sub',
]);

/** 页里跨层出边最多的文件当链起点;无跨层→seedFiles[0];仍无→页首文件/null。 */
export function pickChainSeed(
  page: { source_files?: Record<string, string[]>; seedFiles?: string[] },
  callGraph: CallGraphMap,
): string | null {
  const pageFiles = Object.keys(page.source_files ?? {});
  const outCount = new Map<string, number>();
  for (const [, refs] of callGraph) {
    for (const r of refs) {
      if (CROSS_LAYER.has(r.edgeType)) outCount.set(r.file, (outCount.get(r.file) ?? 0) + 1);
    }
  }
  let best: string | null = null, bestN = 0;
  for (const f of pageFiles) {
    const n = outCount.get(f) ?? 0;
    if (n > bestN) { bestN = n; best = f; }
  }
  return best ?? (page.seedFiles ?? [])[0] ?? pageFiles[0] ?? null;
}

// ── generateDiagrams ──────────────────────────────────────────────────────────

/**
 * Iterate wiki-map.json pages and fill page.diagrams:
 * - GLOBAL community diagram goes ONLY on the Overview/architecture chapter (first match)
 * - Every MODULE chapter gets its slice + component (+ key flow if seed available)
 * - parseMermaid is run on each; failures are dropped with console.error
 */
export function generateDiagrams(
  wikiMapPath: string = WIKI_MAP_PATH,
  graphPath: string = MODULE_GRAPH_PATH,
  callGraph: CallGraphMap = GLOBAL_INDEX.callGraph as CallGraphMap,
): void {
  const graph: DiagramGraph = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));
  const wikiMap: WikiMap = JSON.parse(fs.readFileSync(wikiMapPath, 'utf-8'));

  // Build global community diagram (once)
  const globalDiagram = systemCommunityDiagram(graph);

  // Find the Overview/architecture page (first match, no fallback — global diagram
  // is only placed when an actual overview/architecture chapter exists)
  const overviewPage =
    wikiMap.pages.find(p =>
      /overview|architecture/i.test(p.category ?? '') ||
      /overview|architecture/i.test(p.title ?? ''),
    ) ?? null;

  for (const page of wikiMap.pages) {
    const diagrams: WikiDiagram[] = [];

    // Global diagram: only on Overview/architecture chapter
    if (page === overviewPage && globalDiagram) {
      diagrams.push(globalDiagram);
    }

    // Module slice + component + sequence for module chapters
    if ((page.modules ?? []).length > 0) {
      const sliceDiag = moduleSliceDiagram(page, graph);
      if (sliceDiag) diagrams.push(sliceDiag);

      const compDiag = componentDiagram(page, graph, callGraph);
      if (compDiag) diagrams.push(compDiag);

      const seedFile = (page.seedFiles ?? [])[0];
      if (seedFile) {
        const seqDiag = chainSequence(seedFile, graph, callGraph);
        if (seqDiag) diagrams.push(seqDiag);
      }
    }

    page.diagrams = diagrams;
  }

  fs.writeFileSync(wikiMapPath, JSON.stringify(wikiMap, null, 2), 'utf-8');
  console.log(`[wiki:diagram] Filled diagrams for ${wikiMap.pages.length} pages → ${wikiMapPath}`);
}

// ── Entry point ───────────────────────────────────────────────────────────────

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const isDry = process.argv.includes('--dry');
  if (isDry) {
    const graphExists = fs.existsSync(MODULE_GRAPH_PATH);
    const wikiMapExists = fs.existsSync(WIKI_MAP_PATH);
    console.log(`[wiki:diagram --dry]`);
    console.log(`  module-graph.json: ${graphExists ? 'EXISTS' : 'MISSING'}`);
    console.log(`  wiki-map.json:     ${wikiMapExists ? 'EXISTS' : 'MISSING'}`);
    console.log(`  (no real generation in --dry mode)`);
    process.exit(0);
  }
  generateDiagrams();
}
