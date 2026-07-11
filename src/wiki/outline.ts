#!/usr/bin/env npx tsx
/**
 * outline.ts — P3 wiki:outline (pipeline step 1).
 *
 * generateOutline():
 *   buildPrebrief() → LLM prompt → client.messages.create()
 *   → validateOutline() → (retry once if not ok) → (deterministic fallback if still not ok)
 *   → assembleWikiMap() → write data/wiki-map.json
 *
 * Flags:
 *   --dry   print prebrief + call count, NO API request
 *   --limit N  (placeholder — outline is a single call, but flag parsed for parity)
 *
 * Index-light: only reads module-graph.json + fs probes. NO GLOBAL_INDEX.
 */

import '../eval/utils/load-env.js';
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { DATA_DIR, MODEL_TIERS, MODULE_GRAPH_PATH } from '../config.js';
import type { WikiMap, WikiPage } from '../wikimap/schema.js';
import { buildPrebrief, buildPrebriefFromGraph, type ModuleGraph, type Prebrief } from './prebrief.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIKI_MAP_PATH = path.join(DATA_DIR, 'wiki-map.json');

// ── Schema ────────────────────────────────────────────────────────────────────

export const OUTLINE_SCHEMA = {
  type: 'object',
  properties: {
    pages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id:       { type: 'string' },
          title:    { type: 'string' },
          category: { type: 'string' },
          scope:    { type: 'string' },
          modules:  { type: 'array', items: { type: 'string' } },
        },
        required: ['id', 'title', 'category', 'scope', 'modules'],
        additionalProperties: false,
      },
    },
  },
  required: ['pages'],
  additionalProperties: false,
} as const;

// LLM raw page (before we add seedFiles / page / sections / diagrams / source_files)
export interface LLMPage {
  id: string;
  title: string;
  category: string;
  scope: string;
  modules: string[];
}

// ── validateOutline ───────────────────────────────────────────────────────────

export interface ModuleGraphLike {
  modules: Array<{ id: string; entryFiles: string[]; files: string[] }>;
  file_to_module: Record<string, string>;
}

export function validateOutline(
  pages: Array<{ modules: string[] }>,
  graph: ModuleGraphLike,
): { ok: boolean; unknownModules: string[]; uncoveredModules: string[] } {
  const knownIds = new Set(graph.modules.map(m => m.id));
  const usedIds = new Set<string>();
  const unknownSet = new Set<string>();

  for (const p of pages) {
    for (const id of p.modules) {
      if (knownIds.has(id)) {
        usedIds.add(id);
      } else {
        unknownSet.add(id);
      }
    }
  }

  const uncoveredModules = graph.modules.map(m => m.id).filter(id => !usedIds.has(id));
  const unknownModules = [...unknownSet];

  return {
    ok: unknownModules.length === 0 && uncoveredModules.length === 0,
    unknownModules,
    uncoveredModules,
  };
}

// ── assembleWikiMap ───────────────────────────────────────────────────────────

export function assembleWikiMap(llmPages: LLMPage[], graph: ModuleGraphLike): WikiMap {
  const moduleById = new Map(graph.modules.map(m => [m.id, m]));

  const pages: WikiPage[] = llmPages.map(lp => {
    // seedFiles: dedup entryFiles from all member modules
    const seen = new Set<string>();
    const seedFiles: string[] = [];
    for (const mid of lp.modules) {
      const mod = moduleById.get(mid);
      if (!mod) continue;
      for (const f of mod.entryFiles) {
        if (!seen.has(f)) { seen.add(f); seedFiles.push(f); }
      }
    }

    return {
      // planning fields
      id: lp.id,
      title: lp.title,
      category: lp.category,
      scope: lp.scope,
      modules: lp.modules.filter(id => moduleById.has(id)), // only real modules
      seedFiles,
      // consumer fields
      page: lp.title,       // convention: page === title
      sections: [],
      diagrams: [],
      source_files: {},     // filled by later tasks
    };
  });

  // file_to_pages: deterministic, derived from file_to_module + page.modules
  // For each page → its module ids → files belonging to those modules → file→[pageId,...]
  const fileToPagesMap = new Map<string, string[]>();
  for (const page of pages) {
    const moduleIdSet = new Set(page.modules);
    for (const [file, mid] of Object.entries(graph.file_to_module)) {
      if (moduleIdSet.has(mid)) {
        const arr = fileToPagesMap.get(file) ?? [];
        if (!arr.includes(page.id)) arr.push(page.id);
        fileToPagesMap.set(file, arr);
      }
    }
  }

  // Sort for determinism
  const file_to_pages: Record<string, string[]> = {};
  for (const [file, ids] of [...fileToPagesMap.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    file_to_pages[file] = ids;
  }

  return {
    repo: 'Rocket.Chat',
    generated_at: new Date().toISOString(),
    derived_from: 'self-generated wiki:outline',
    pages,
    file_to_pages,
  };
}

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildPrompt(prebrief: Prebrief, feedback?: { unknownModules: string[]; uncoveredModules: string[] }): string {
  const subsystemSummary = prebrief.subsystems
    .map(s => {
      const mods = s.modules
        .map(m => `      - ${m.id}  (label:${m.label}, fanIn:${m.fanIn}, entryFiles:[${m.entryFiles.slice(0, 2).join(', ')}${m.entryFiles.length > 2 ? ',...' : ''}])`)
        .join('\n');
      return `  subsystem: ${s.subsystem}\n${mods}`;
    })
    .join('\n\n');

  const allModuleIds = prebrief.subsystems.flatMap(s => s.modules.map(m => m.id));

  const lines = [
    `You are planning the wiki for the Rocket.Chat open-source chat platform.`,
    ``,
    `## HARD CONSTRAINTS`,
    `1. Every wiki page's "modules" list MUST ONLY contain module IDs from the list below.`,
    `2. Every module ID listed below MUST appear in exactly one page's "modules" list.`,
    `3. Chapter titles must reflect Rocket.Chat's real subsystems — avoid generic templates.`,
    ``,
    `## Repository signals`,
    `- Top groups: ${prebrief.topGroups.join(', ') || '(unknown)'}`,
    `- Readme intro: ${prebrief.readmeIntro || '(unavailable)'}`,
    `- Has build config: ${prebrief.hasConfig.build}, Has CI: ${prebrief.hasConfig.ci}`,
    ``,
    `## Module catalog (${allModuleIds.length} modules, ONLY these IDs are valid)`,
    subsystemSummary,
    ``,
    `## Key entry files (high fan-in)`,
    prebrief.entryFiles.slice(0, 20).map(f => `  - ${f}`).join('\n'),
    ``,
    `## Task`,
    `Plan wiki chapters (pages) for this codebase. Group related modules into coherent chapters.`,
    `Each chapter should cover a meaningful architectural boundary.`,
    `Output a JSON object with a "pages" array. Each page must have:`,
    `  - id: kebab-case string`,
    `  - title: human-readable`,
    `  - category: e.g. "Overview", "Core Services", "UI", "Infrastructure", etc.`,
    `  - scope: 1-2 sentences describing what this chapter covers`,
    `  - modules: array of module IDs (MUST be from the catalog above, cover ALL modules)`,
  ];

  if (feedback) {
    lines.push(``);
    lines.push(`## VALIDATION FEEDBACK (fix these before responding)`);
    if (feedback.unknownModules.length > 0) {
      lines.push(`- UNKNOWN module IDs used (remove these): ${feedback.unknownModules.join(', ')}`);
    }
    if (feedback.uncoveredModules.length > 0) {
      lines.push(`- UNCOVERED modules (add to a page): ${feedback.uncoveredModules.join(', ')}`);
    }
  }

  return lines.join('\n');
}

// ── Deterministic fallback ────────────────────────────────────────────────────

function deterministicFallback(llmPages: LLMPage[], graph: ModuleGraphLike): LLMPage[] {
  const moduleById = new Map(graph.modules.map(m => [m.id, m as typeof graph.modules[0] & { subsystem?: string }]));

  // Remove unknown module ids from pages
  const cleaned: LLMPage[] = llmPages.map(p => ({
    ...p,
    modules: p.modules.filter(id => moduleById.has(id)),
  }));

  // Find uncovered modules
  const usedIds = new Set(cleaned.flatMap(p => p.modules));
  const uncovered = graph.modules.filter(m => !usedIds.has(m.id));

  if (uncovered.length === 0) return cleaned;

  // Group uncovered by subsystem (if available on the graph node)
  const bySubsystem = new Map<string, string[]>();
  for (const m of uncovered) {
    const mod = m as any;
    const subsystem: string = mod.subsystem ?? 'misc';
    const arr = bySubsystem.get(subsystem) ?? [];
    arr.push(m.id);
    bySubsystem.set(subsystem, arr);
  }

  for (const [subsystem, ids] of bySubsystem.entries()) {
    const safeId = subsystem.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    cleaned.push({
      id: `catchall-${safeId}`,
      title: `${subsystem} (supplemental)`,
      category: 'Supplemental',
      scope: `Catch-all chapter for uncovered modules in the ${subsystem} subsystem.`,
      modules: ids,
    });
  }

  return cleaned;
}

// ── generateOutline ───────────────────────────────────────────────────────────

export async function generateOutline(model: string = MODEL_TIERS.outline): Promise<WikiMap> {
  const graph: ModuleGraph = JSON.parse(fs.readFileSync(MODULE_GRAPH_PATH, 'utf-8'));
  const prebrief = buildPrebriefFromGraph(graph);

  const isDry = process.argv.includes('--dry');

  if (isDry) {
    console.log('=== PREBRIEF ===');
    console.log(JSON.stringify(prebrief, null, 2));
    console.log(`\n=== OUTLINE PLAN ===`);
    console.log(`Model: ${model}`);
    console.log(`Modules to cover: ${graph.modules.length}`);
    console.log(`Subsystems: ${graph.subsystems.length}`);
    console.log(`Intended API calls: 1 (+ up to 1 retry if validation fails)`);
    console.log(`[dry] No API request made.`);
    process.exit(0);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    console.error('[wiki:outline] ANTHROPIC_API_KEY not set — skipping outline generation.');
    process.exit(0);
  }

  const client = new Anthropic({ apiKey });

  // First attempt
  const prompt1 = buildPrompt(prebrief);
  const resp1 = await client.messages.create({
    model,
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt1 }],
    output_config: { format: { type: 'json_schema', schema: OUTLINE_SCHEMA } },
  } as any);

  const block1 = (resp1.content as any[]).find((b: any) => b.type === 'text');
  let llmPages: LLMPage[] = JSON.parse(block1.text).pages;

  let validation = validateOutline(llmPages, graph);

  if (!validation.ok) {
    console.error(`[wiki:outline] Validation failed (attempt 1): unknown=${validation.unknownModules.length}, uncovered=${validation.uncoveredModules.length}. Retrying…`);

    const prompt2 = buildPrompt(prebrief, validation);
    const resp2 = await client.messages.create({
      model,
      max_tokens: 8192,
      messages: [
        { role: 'user', content: prompt1 },
        { role: 'assistant', content: block1.text },
        { role: 'user', content: prompt2 },
      ],
      output_config: { format: { type: 'json_schema', schema: OUTLINE_SCHEMA } },
    } as any);

    const block2 = (resp2.content as any[]).find((b: any) => b.type === 'text');
    llmPages = JSON.parse(block2.text).pages;
    validation = validateOutline(llmPages, graph);
  }

  if (!validation.ok) {
    console.error(`[wiki:outline] Validation still failed after retry — applying deterministic fallback.`);
    llmPages = deterministicFallback(llmPages, graph);
  }

  const wikiMap = assembleWikiMap(llmPages, graph);

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(WIKI_MAP_PATH, JSON.stringify(wikiMap, null, 2), 'utf-8');
  console.log(`[wiki:outline] Wrote ${wikiMap.pages.length} pages to ${WIKI_MAP_PATH}`);

  return wikiMap;
}

// ── Entry point ───────────────────────────────────────────────────────────────

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  generateOutline().catch(err => {
    console.error('[wiki:outline] Fatal:', err);
    process.exit(1);
  });
}

function pathToFileURL(p: string) {
  return new URL('file://' + p);
}
