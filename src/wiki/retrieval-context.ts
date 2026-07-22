/**
 * retrieval-context.ts — per-chapter retrieval context builder (P3 §7.3).
 *
 * buildChapterContext(page, deps) reuses existing retrieval internals
 * (expandNeighborhood, walkFromSeed, rankCandidates) to produce a structured
 * ChapterContext with every seedSymbol and candidate carrying path + line info.
 *
 * Design:
 *   - deps is fully injected (summaries, symbol→lines lookup) → testable with fixtures
 *   - GLOBAL_INDEX must be pre-populated by caller (tests do this with tiny fixtures)
 *   - No LLM, no fs reads inside this module
 */

import { GLOBAL_INDEX } from '../indexer/state.js';
import { expandNeighborhood } from '../server/engine/expand.js';
import { rankCandidates } from '../server/engine/entry-map.js';
import { buildDirectedAdjacency, walkFromSeed } from '../server/engine/walker/walk.js';
import { relPath } from '../server/engine/common.js';
import { questionTokens } from '../server/engine/walker/affinity.js';
import type { WikiPage } from '../wikimap/schema.js';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SeedSymbolEntry {
  name: string;
  path: string;  // relative path (Rocket.Chat/...)
  line: number;  // first-defined line; 1 if unknown
}

export interface CandidateEntry {
  path: string;        // relative path
  lines: string;       // e.g. "L1-L80" or "L1" if no range info
  role: string;        // summary or "" if unavailable
}

export interface ChapterContext {
  moduleSummaries: Record<string, string>;      // moduleId → summary text
  seedSymbols: SeedSymbolEntry[];               // up to ~20, deduped, with path+line
  candidates: CandidateEntry[];                 // up to MAX_CANDIDATES, ranked
}

// ── Injected deps (for testability) ──────────────────────────────────────────

export interface RetrievalDeps {
  /**
   * file-summaries: rel path → { ranking_line, ... } (new P2 output field ranking_line, not the old summary).
   * CLI wrapper passes real file-summaries.json; tests pass fixtures.
   */
  fileSummaries: Record<string, { ranking_line: string }> | null;

  /**
   * module-summaries: moduleId → summary text.
   * CLI wrapper passes real module-summaries.json; tests pass fixtures.
   */
  moduleSummaries: Record<string, string> | null;

  /**
   * symbol → first-defined line number lookup.
   * CLI wrapper reads from mapping.json / chunks; tests can inject directly.
   * Returns 1 when unknown.
   */
  lineOf: (symbolName: string) => number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_CANDIDATES = 40;
const MAX_SEED_SYMBOLS = 20;

// ── Core ──────────────────────────────────────────────────────────────────────

/**
 * Build a ChapterContext for one wiki page.
 *
 * 1. Derive tokens from page.scope (reuses questionTokens tokeniser).
 * 2. For each seedFile, find its symbols from GLOBAL_INDEX, pick the best one,
 *    expand its neighbourhood (1-hop via expandNeighborhood), collect seedSymbols.
 * 3. Walk from each seed symbol to gather additional candidate files.
 * 4. rank all discovered files via rankCandidates, cap at MAX_CANDIDATES.
 * 5. Inject moduleSummaries + fileSummary roles into output.
 */
export function buildChapterContext(page: WikiPage, deps: RetrievalDeps): ChapterContext {
  const tokens = questionTokens(page.scope + ' ' + page.title);

  // Build adjacency + walk context
  const adj = buildDirectedAdjacency(GLOBAL_INDEX.callGraph);

  // Build symbol→file and file→symbols lookups from GLOBAL_INDEX
  const byFile = new Map<string, string[]>();
  for (const [sym, paths] of GLOBAL_INDEX.symbols) {
    for (const p of paths) {
      let arr = byFile.get(p);
      if (!arr) { arr = []; byFile.set(p, arr); }
      arr.push(sym);
    }
  }
  const filesOf = (sym: string): string[] =>
    [...(GLOBAL_INDEX.symbols.get(sym) ?? [])].map(relPath);
  const symbolsOfFile = (relF: string): string[] => {
    // relF may be relative (from walkFromSeed); try to match against full paths
    for (const [fullPath, syms] of byFile) {
      if (relPath(fullPath) === relF || fullPath === relF) return syms;
    }
    return [];
  };

  const ctx = { adj, filesOf, symbolsOfFile };

  // ── Step 1: Collect seed symbols from page.seedFiles ─────────────────────────
  const seedSymbolSet = new Set<string>();
  const seedSymbolList: SeedSymbolEntry[] = [];

  for (const seedFile of page.seedFiles) {
    // seedFile may be absolute or relative
    const relSeedFile = seedFile.includes('Rocket.Chat/') ? relPath(seedFile) : seedFile;

    // Find all symbols in this file (check both rel and absolute keys in byFile)
    let symsInFile: string[] = [];
    for (const [fullPath, syms] of byFile) {
      if (relPath(fullPath) === relSeedFile || fullPath === seedFile) {
        symsInFile = syms;
        break;
      }
    }

    for (const sym of symsInFile.slice(0, 3)) {
      if (seedSymbolSet.has(sym)) continue;
      seedSymbolSet.add(sym);

      const paths = [...(GLOBAL_INDEX.symbols.get(sym) ?? [])];
      const primaryPath = paths[0] ? relPath(paths[0]) : relSeedFile;
      const line = deps.lineOf(sym);

      seedSymbolList.push({ name: sym, path: primaryPath, line });
    }
  }

  // ── Step 2: Expand neighbourhood from seed symbols ────────────────────────────
  // We feed expandNeighborhood with a SeedResult-shaped object.
  // (No fuzzysort — we have direct seeds from the seedFiles.)
  const firstRound = new Map<string, number>();

  for (const seed of seedSymbolList) {
    // Seed's own files = round 0
    for (const f of filesOf(seed.name)) {
      if (!firstRound.has(f)) firstRound.set(f, 0);
    }

    // Walk to gather neighbouring files
    const rounds = walkFromSeed(seed.name, ctx, tokens, { maxRounds: 4, minNewFiles: 1, minAffinity: 0.1 });
    for (const w of rounds) {
      for (const f of w.result?.newFiles ?? []) {
        if (!firstRound.has(f) || firstRound.get(f)! > w.round) {
          firstRound.set(f, w.round);
        }
      }
    }

    // Also expand with expandNeighborhood to collect more neighbourhood symbols
    const seedResultLike = {
      seeds: [seed.name],
      lexical: new Map([[seed.name, 1.0]]),
      layerSegment: null,
      inferredSegments: [],
    };
    const expanded = expandNeighborhood(seedResultLike, { maxHop: 1, limit: 15 });

    for (const ranked of expanded) {
      if (seedSymbolSet.has(ranked.symbolName)) continue;
      if (seedSymbolList.length >= MAX_SEED_SYMBOLS) break;
      seedSymbolSet.add(ranked.symbolName);
      const paths = ranked.paths;
      const primaryPath = paths[0] ? relPath(paths[0]) : '';
      if (!primaryPath) continue;
      const line = deps.lineOf(ranked.symbolName);
      seedSymbolList.push({ name: ranked.symbolName, path: primaryPath, line });

      // Add these expanded symbols' files as round 1 candidates
      for (const p of paths.map(relPath)) {
        if (!firstRound.has(p)) firstRound.set(p, ranked.hop + 1);
      }
    }
  }

  // ── Step 3: Rank candidate files ──────────────────────────────────────────────
  const items = [...firstRound].map(([f, round]) => ({ f, round }));
  const rankedFiles = rankCandidates(items, tokens, deps.fileSummaries)
    .slice(0, MAX_CANDIDATES);

  // ── Step 4: Build candidates with path:lines + role ───────────────────────────
  const candidates: CandidateEntry[] = rankedFiles.map(f => {
    const summary = deps.fileSummaries?.[f]?.ranking_line ?? '';
    return {
      path: f,
      lines: 'L1',  // default; CLI can enrich from chunks if needed
      role: summary,
    };
  });

  // ── Step 5: Module summaries ──────────────────────────────────────────────────
  const moduleSummaries: Record<string, string> = {};
  for (const mid of page.modules) {
    const s = deps.moduleSummaries?.[mid];
    if (s) moduleSummaries[mid] = s;
  }

  // Dedup seedSymbols by name (just in case)
  const seen = new Set<string>();
  const dedupedSeeds = seedSymbolList.filter(s => {
    if (seen.has(s.name)) return false;
    seen.add(s.name);
    return true;
  });

  return {
    moduleSummaries,
    seedSymbols: dedupedSeeds.slice(0, MAX_SEED_SYMBOLS),
    candidates,
  };
}

/**
 * Format a ChapterContext as a human-readable string for injection into an LLM prompt.
 */
export function formatChapterContext(ctx: ChapterContext): string {
  const lines: string[] = [];

  if (Object.keys(ctx.moduleSummaries).length > 0) {
    lines.push('## Module Summaries');
    for (const [mid, summary] of Object.entries(ctx.moduleSummaries)) {
      lines.push(`- **${mid}**: ${summary}`);
    }
    lines.push('');
  }

  if (ctx.seedSymbols.length > 0) {
    lines.push('## Seed Symbols (entry points for this chapter)');
    for (const s of ctx.seedSymbols) {
      lines.push(`- \`${s.name}\` — ${s.path}:L${s.line}`);
    }
    lines.push('');
  }

  if (ctx.candidates.length > 0) {
    lines.push(`## Candidate Files (ranked, top ${ctx.candidates.length})`);
    for (const c of ctx.candidates) {
      const roleStr = c.role ? ` — ${c.role}` : '';
      lines.push(`- ${c.path}:${c.lines}${roleStr}`);
    }
    lines.push('');
  }

  lines.push('⚠️ Every component assertion MUST be followed by `Sources: path:Lstart-Lend`.');
  lines.push('Only cite paths that appear in the candidate list above or that you have verified via retrieval.');

  return lines.join('\n');
}
