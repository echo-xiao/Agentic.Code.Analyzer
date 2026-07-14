#!/usr/bin/env npx tsx
/**
 * write.ts — P3 wiki:write (pipeline step 3).
 *
 * Citation validation (enforceCitations / buildLineCountOf / SINGLE_REF_RE) lives in ./citations.ts.
 *
 * Exports:
 *   assembleProse(page, rawText)   — splits LLM output into ProseSection[]; strips mermaid
 *   writeChapter(page, model)      — calls LLM, enforces citations, returns prose
 *   main()                         — iterates wiki-map.pages; writes wiki-prose.json + backfills wiki-map.json
 *
 * Flags:
 *   --dry    print chapter plan, make NO API call
 *   --limit=N  only write first N chapters
 *
 * Measurement isolation: this file does NOT import eval/walker code.
 */

import '../eval/utils/load-env.js';
import Anthropic from '@anthropic-ai/sdk';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import { DATA_DIR, MODEL_TIERS } from '../config.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { ensureIndex } from '../indexer/index.js';
import type { ProseSection, WikiMap, WikiPage } from '../wikimap/schema.js';
import {
  buildChapterContext,
  formatChapterContext,
  type RetrievalDeps,
} from './retrieval-context.js';
import { enforceCitations, buildLineCountOf, SINGLE_REF_RE, type DroppedCitation } from './citations.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIKI_MAP_PATH = path.join(DATA_DIR, 'wiki-map.json');
const WIKI_PROSE_PATH = path.join(DATA_DIR, 'wiki-prose.json');
const SUMMARIES_DIR = path.join(DATA_DIR, 'summaries');
const FILE_SUMMARIES_PATH = path.join(SUMMARIES_DIR, 'file-summaries.json');
const MODULE_SUMMARIES_PATH = path.join(SUMMARIES_DIR, 'module-summaries.json');

// ── assembleProse ─────────────────────────────────────────────────────────────

/**
 * Split LLM output into ProseSection[] by ## headers.
 *   - Preserves Sources: lines within each section.
 *   - Strips ```mermaid ... ``` blocks (those go to Task 7 diagrams).
 *   - Returns sections with non-empty text.
 */
export function assembleProse(_page: WikiPage, rawText: string): ProseSection[] {
  // Strip mermaid blocks first
  const stripped = rawText.replace(/```mermaid[\s\S]*?```/g, '');

  const sections: ProseSection[] = [];
  // Split by lines starting with ## (not ###)
  const parts = stripped.split(/^(?=## )/m);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Check if it starts with ## header
    const headerMatch = trimmed.match(/^## (.+)/);
    if (headerMatch) {
      const sectionName = headerMatch[1].trim();
      // Text is everything after the header line
      const bodyStart = trimmed.indexOf('\n');
      const body = bodyStart >= 0 ? trimmed.slice(bodyStart + 1).trim() : '';
      if (body.length > 0) {
        sections.push({ section: sectionName, text: body });
      } else {
        sections.push({ section: sectionName, text: '' });
      }
    } else {
      // Content before first ## — use a default section name
      if (trimmed.length > 0) {
        sections.push({ section: 'Overview', text: trimmed });
      }
    }
  }

  return sections;
}


// ── writeChapter ──────────────────────────────────────────────────────────────

export interface ChapterResult {
  prose: ProseSection[];
  source_files: Record<string, string[]>;
  dropped: DroppedCitation[];
}

const CITATION_SYSTEM_PROMPT = `You are a technical writer generating one chapter of an architecture wiki for the Rocket.Chat codebase.

## Citation Red-Lines (NON-NEGOTIABLE)
1. 未经检索确认的符号/路径不得写入。(Do NOT mention any file path or symbol that you have not verified against the provided candidate list.)
2. 每个组件断言后跟 \`Sources: path:Lstart-Lend\`。(After every assertion about a specific component, append a \`Sources:\` line with the exact file path and line range from the candidate list.)
3. Format: \`Sources: path/to/file.ts:L10-L50\` (use relative paths matching the candidate list exactly).
4. If you are unsure of the exact line numbers, use \`L1\` as a placeholder rather than omitting the Sources line.
5. Do NOT invent file paths. Only cite files from the "Candidate Files" section below.

## Output Format
- Use ## (h2) headers for each major section.
- Do NOT include mermaid blocks (those are generated separately).
- Write a SYNTHESIZED NARRATIVE (DeepWiki-style): explain how this subsystem actually works — trace the flow of one representative operation end-to-end across layers — rather than listing components. Prefer a how-it-works story over a file inventory.
- Whenever you name a specific file or symbol in the narrative, immediately follow that claim with its \`Sources:\` line (see Citation Red-Lines). Grounding is NON-NEGOTIABLE even in narrative prose.
- Target 400–800 words per chapter.`;

export async function writeChapter(
  page: WikiPage,
  deps: RetrievalDeps,
  model: string = MODEL_TIERS.chapter,
): Promise<ChapterResult> {
  const ctx = buildChapterContext(page, deps);
  const contextStr = formatChapterContext(ctx);

  const userMessage = [
    `## Chapter: ${page.title}`,
    ``,
    `**Scope:** ${page.scope}`,
    ``,
    contextStr,
    ``,
    `Write a narrative wiki chapter for "${page.title}" — trace how it works end-to-end, don't just list components. Structure it with ## section headers.`,
    `Every specific claim about a file or component MUST be followed by \`Sources: path:Lstart-Lend\` (from the candidate list only).`,
  ].join('\n');

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    console.error(`[wiki:write] No API key — skipping chapter "${page.title}"`);
    return { prose: [], source_files: {}, dropped: [] };
  }

  const client = new Anthropic({ apiKey });

  const resp = await client.messages.create({
    model,
    max_tokens: 4096,
    system: CITATION_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  });

  const block = (resp.content as any[]).find((b: any) => b.type === 'text');
  const rawText: string = block?.text ?? '';

  // Enforce citations against GLOBAL_INDEX — including real line-count bounds check
  const lineCountOf = buildLineCountOf(GLOBAL_INDEX.allFiles);
  const { kept, dropped } = enforceCitations(rawText, {
    allFiles: GLOBAL_INDEX.allFiles,
    lineCountOf,
  });

  const prose = assembleProse(page, kept);

  // Collect source_files from surviving Sources: lines
  const source_files: Record<string, string[]> = {};
  const SOURCES_RE = /^Sources:\s*(.+)$/gim;
  let sm: RegExpExecArray | null;
  while ((sm = SOURCES_RE.exec(kept)) !== null) {
    for (const ref of sm[1].split(',').map(s => s.trim())) {
      const rm = SINGLE_REF_RE.exec(ref.trim());
      if (!rm) continue;
      const [, refPath, start, end] = rm;
      const range = end ? `L${start}-${end}` : `L${start}`;
      if (!source_files[refPath]) source_files[refPath] = [];
      if (!source_files[refPath].includes(range)) source_files[refPath].push(range);
    }
  }

  return { prose, source_files, dropped };
}

// ── Hash helpers ──────────────────────────────────────────────────────────────

function pageHash(page: WikiPage, moduleSummaries: Record<string, string> | null): string {
  const content = JSON.stringify({
    scope: page.scope,
    modules: [...page.modules].sort(),
    summaries: page.modules.map(m => moduleSummaries?.[m] ?? '').join('|'),
  });
  return crypto.createHash('sha1').update(content).digest('hex');
}

// ── Load summaries helpers ────────────────────────────────────────────────────

function loadFileSummaries(): Record<string, { ranking_line: string }> | null {
  try {
    return JSON.parse(fs.readFileSync(FILE_SUMMARIES_PATH, 'utf-8'));
  } catch {
    return null;
  }
}

function loadModuleSummaries(): Record<string, string> | null {
  try {
    return JSON.parse(fs.readFileSync(MODULE_SUMMARIES_PATH, 'utf-8'));
  } catch {
    return null;
  }
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const isDry = process.argv.includes('--dry');
  const limitArg = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
  const limit = limitArg ? parseInt(limitArg, 10) : undefined;

  // Load wiki-map
  let wikiMap: WikiMap;
  try {
    wikiMap = JSON.parse(fs.readFileSync(WIKI_MAP_PATH, 'utf-8'));
  } catch (e) {
    console.error('[wiki:write] data/wiki-map.json missing — run wiki:outline first.');
    process.exit(1);
  }

  const pages = limit !== undefined ? wikiMap.pages.slice(0, limit) : wikiMap.pages;

  if (isDry) {
    console.log(`[wiki:write --dry] ${pages.length} chapter(s) planned (no API calls):`);
    for (const p of pages) {
      const modules = p.modules ?? [];
      const seedFiles = p.seedFiles ?? [];
      const displayName = p.title ?? p.page ?? '(untitled)';
      console.log(`  - ${displayName} (${modules.length} modules, ${seedFiles.length} seed files)`);
    }
    console.log('[wiki:write --dry] Done — no API request made.');
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    console.error('[wiki:write] ANTHROPIC_API_KEY not set — skipping (set key to generate prose).');
    return;
  }

  // Load index (needed for GLOBAL_INDEX.allFiles for citation checking)
  await ensureIndex();

  // Load summaries
  const fileSummaries = loadFileSummaries();
  const moduleSummaries = loadModuleSummaries();

  // Wire up lineOf — for production we use a simple fallback (line 1)
  // A future task can enrich this from chunks.json
  const deps: RetrievalDeps = {
    fileSummaries: fileSummaries as Record<string, { ranking_line: string }> | null,
    moduleSummaries,
    lineOf: (_sym: string) => 1,
  };

  // Load existing prose (incremental)
  const prose: Record<string, ProseSection[]> =
    fs.existsSync(WIKI_PROSE_PATH)
      ? JSON.parse(fs.readFileSync(WIKI_PROSE_PATH, 'utf-8'))
      : {};

  // Load hash cache
  const HASH_CACHE_PATH = path.join(DATA_DIR, '.wiki-prose-hashes.json');
  const hashCache: Record<string, string> =
    fs.existsSync(HASH_CACHE_PATH)
      ? JSON.parse(fs.readFileSync(HASH_CACHE_PATH, 'utf-8'))
      : {};

  let written = 0;
  let skipped = 0;
  let failed = 0;

  for (const page of pages) {
    const h = pageHash(page, moduleSummaries);
    if (hashCache[page.page] === h && prose[page.page]) {
      skipped++;
      console.error(`[wiki:write] skip (hash unchanged): ${page.title}`);
      continue;
    }

    console.error(`[wiki:write] writing: ${page.title}…`);
    try {
      const result = await writeChapter(page, deps);
      prose[page.page] = result.prose;

      // Backfill wiki-map sections + source_files
      const mapPage = wikiMap.pages.find(p => p.page === page.page);
      if (mapPage) {
        mapPage.sections = result.prose.map(s => s.section);
        // Merge source_files (union)
        for (const [f, ranges] of Object.entries(result.source_files)) {
          if (!mapPage.source_files[f]) mapPage.source_files[f] = [];
          for (const r of ranges) {
            if (!mapPage.source_files[f].includes(r)) mapPage.source_files[f].push(r);
          }
        }
      }

      hashCache[page.page] = h;
      written++;

      if (result.dropped.length > 0) {
        console.error(`  [citations] dropped ${result.dropped.length} unverifiable claim(s)`);
      }
    } catch (e: any) {
      failed++;
      console.error(`[wiki:write] FAILED ${page.title}: ${e?.message?.slice(0, 120)}`);
    }

    // Checkpoint write after each chapter
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(WIKI_PROSE_PATH, JSON.stringify(prose, null, 2), 'utf-8');
    fs.writeFileSync(WIKI_MAP_PATH, JSON.stringify(wikiMap, null, 2), 'utf-8');
    fs.writeFileSync(HASH_CACHE_PATH, JSON.stringify(hashCache, null, 2), 'utf-8');
  }

  console.error(`[wiki:write] done — written=${written}, skipped=${skipped}, failed=${failed}`);
  console.error(`[wiki:write] → data/wiki-prose.json`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch(e => {
    console.error('[wiki:write] Fatal:', e);
    process.exit(2);
  });
}
