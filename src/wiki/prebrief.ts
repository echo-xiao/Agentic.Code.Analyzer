#!/usr/bin/env npx tsx
/**
 * prebrief.ts — P3 wiki:outline Step 1.
 *
 * Collects deterministic signals (ZERO LLM) from module-graph.json + fs probes.
 * No GLOBAL_INDEX, no data/summaries — index-light by design.
 *
 * Exports:
 *   buildPrebriefFromGraph(graph)  — pure, testable core; accepts injected graph
 *   buildPrebrief(graphArg?)       — CLI wrapper; reads MODULE_GRAPH_PATH when no arg given
 *   Prebrief                       — interface
 *   ModuleGraph                    — interface (re-exported for outline.ts)
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { MODULE_GRAPH_PATH, TARGET_SRC_DIR } from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', 'Rocket.Chat');

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface ModuleNode {
  id: string;
  subsystem: string;
  anchor: string;
  label: string;
  files: string[];
  entryFiles: string[];
  /** edges[i] = [fromModuleId, toModuleId, weight] */
  edges: [string, string, number][];
}

export interface ModuleGraph {
  subsystems: string[];
  modules: ModuleNode[];
  file_to_module: Record<string, string>;
}

export interface Prebrief {
  repo: string;
  topGroups: string[];                    // distinct top-level dirs in Rocket.Chat/
  readmeIntro: string;                    // README first paragraph (truncated)
  subsystems: Array<{
    subsystem: string;
    modules: Array<{ id: string; label: string; fanIn: number; entryFiles: string[] }>;
  }>;
  entryFiles: string[];                   // fan-in top N entry files
  hasConfig: { build: boolean; ci: boolean };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Derive per-module fan-in from module edges (CHEAP — no GLOBAL_INDEX). */
function computeFanIn(modules: ModuleNode[]): Map<string, number> {
  const fanIn = new Map<string, number>();
  for (const m of modules) {
    if (!fanIn.has(m.id)) fanIn.set(m.id, 0);
    for (const [, toId, weight] of m.edges) {
      fanIn.set(toId, (fanIn.get(toId) ?? 0) + weight);
    }
  }
  return fanIn;
}

function readReadmeIntro(repoRoot: string): string {
  const readmePath = path.join(repoRoot, 'README.md');
  if (!fs.existsSync(readmePath)) return '';
  const text = fs.readFileSync(readmePath, 'utf-8');
  // Strip HTML tags, find first non-empty paragraph
  const lines = text.split('\n');
  const paras: string[] = [];
  let current: string[] = [];
  for (const line of lines) {
    const stripped = line.replace(/<[^>]*>/g, '').trim();
    if (stripped === '') {
      if (current.length > 0) { paras.push(current.join(' ')); current = []; }
    } else {
      current.push(stripped);
    }
  }
  if (current.length > 0) paras.push(current.join(' '));
  const intro = paras.find(p => p.length > 30) ?? '';
  return intro.slice(0, 500);
}

function detectTopGroups(repoRoot: string): string[] {
  const KNOWN_GROUPS = ['apps/meteor', 'packages', 'ee'];
  return KNOWN_GROUPS.filter(g => fs.existsSync(path.join(repoRoot, g)));
}

// ── Core (pure, testable) ─────────────────────────────────────────────────────

export function buildPrebriefFromGraph(
  graph: ModuleGraph,
  opts: {
    repoRoot?: string;
    fanInTopN?: number;
  } = {},
): Prebrief {
  const repoRoot = opts.repoRoot ?? REPO_ROOT;
  const fanInTopN = opts.fanInTopN ?? 30;

  const fanInMap = computeFanIn(graph.modules);

  // Build subsystem → modules listing
  const subsystemMap = new Map<string, typeof graph.modules>();
  for (const m of graph.modules) {
    const arr = subsystemMap.get(m.subsystem) ?? [];
    arr.push(m);
    subsystemMap.set(m.subsystem, arr);
  }

  const subsystems = [...subsystemMap.entries()].map(([subsystem, mods]) => ({
    subsystem,
    modules: mods
      .map(m => ({
        id: m.id,
        label: m.label,
        fanIn: fanInMap.get(m.id) ?? 0,
        entryFiles: m.entryFiles,
      }))
      .sort((a, b) => b.fanIn - a.fanIn),
  }));

  // Top N entry files by fan-in descending
  const modulesByFanIn = [...graph.modules]
    .map(m => ({ m, fi: fanInMap.get(m.id) ?? 0 }))
    .sort((a, b) => b.fi - a.fi)
    .slice(0, fanInTopN);

  const seenFiles = new Set<string>();
  const entryFiles: string[] = [];
  for (const { m } of modulesByFanIn) {
    for (const f of m.entryFiles) {
      if (!seenFiles.has(f)) { seenFiles.add(f); entryFiles.push(f); }
    }
  }

  const topGroups = detectTopGroups(repoRoot);
  const readmeIntro = readReadmeIntro(repoRoot);

  const hasConfig = {
    build: fs.existsSync(path.join(repoRoot, 'package.json'))
        || fs.existsSync(path.join(repoRoot, 'tsconfig.json')),
    ci: fs.existsSync(path.join(repoRoot, '.github', 'workflows'))
     || fs.existsSync(path.join(repoRoot, '.circleci'))
     || fs.existsSync(path.join(repoRoot, 'codecov.yml')),
  };

  return {
    repo: 'Rocket.Chat',
    topGroups,
    readmeIntro,
    subsystems,
    entryFiles,
    hasConfig,
  };
}

// ── CLI wrapper ───────────────────────────────────────────────────────────────

export function buildPrebrief(graph?: ModuleGraph): Prebrief {
  const g = graph ?? (JSON.parse(fs.readFileSync(MODULE_GRAPH_PATH, 'utf-8')) as ModuleGraph);
  return buildPrebriefFromGraph(g);
}

// ── entry point (for direct invocation) ──────────────────────────────────────
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const prebrief = buildPrebrief();
  console.log(JSON.stringify(prebrief, null, 2));
}

function pathToFileURL(p: string) {
  // mini shim — only used in entry guard
  return new URL('file://' + p);
}
