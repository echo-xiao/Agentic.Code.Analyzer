#!/usr/bin/env npx tsx
/**
 * verify.ts — P3 wiki:verify (pipeline step 4).
 *
 * Exports:
 *   verifyCitations(prose, index)  — pure fn; validates all Sources: citations per chapter
 *   writeVerifyReport(result, outPath?) — writes wiki-verify.md report
 *
 * Flags:
 *   --dry     read prose + build index, print summary, NO API call
 *   --rewrite for chapters with many invalid citations, expose a Haiku rewrite hook
 *   --rewrite --dry  logs "would rewrite N chapters" but makes NO API call
 *
 * Reuse strategy: imports enforceCitations from ./write.js (same validation predicate).
 * This ensures the reported rate matches what write.ts actually enforced.
 */

import '../eval/utils/load-env.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import { DATA_DIR, MODEL_TIERS } from '../config.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { ensureIndex } from '../indexer/index.js';
import type { ProseSection } from '../wikimap/schema.js';

// ─── Import shared citation validation and helpers from write.ts ─────────────
import { enforceCitations, countCitationRefs, buildLineCountOf, type IndexLike } from './write.js';
export type { IndexLike } from './write.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIKI_PROSE_PATH = path.join(DATA_DIR, 'wiki-prose.json');
const LOGS_REPORTS_DIR = path.join(path.resolve(__dirname, '../../'), 'logs', 'reports');
const DEFAULT_REPORT_PATH = path.join(LOGS_REPORTS_DIR, 'wiki-verify.md');

// ── Types ─────────────────────────────────────────────────────────────────────

export interface InvalidCitation {
  claim: string;
  path: string;
  reason: string;
}

export interface ChapterVerifyResult {
  chapter: string;
  citations: number;
  valid: number;
  invalid: InvalidCitation[];
}

export interface VerifyResult {
  perChapter: ChapterVerifyResult[];
  citation_validity_rate: number;
  /**
   * Number of chapters with zero citations.
   * These are excluded from citation_validity_rate to avoid inflation.
   * A high value here signals a "no sourcing" quality gap — tracked separately.
   */
  uncited_chapters: number;
}

// ── Prose shape accepted by verifyCitations ───────────────────────────────────
// Matches data/wiki-prose.json: Record<chapterTitle, Array<{section, text}>>
export type ProseRecord = Record<string, ProseSection[]>;

// ── verifyCitations ───────────────────────────────────────────────────────────

/**
 * Validate all Sources: citations across the wiki prose using enforceCitations.
 *
 * citation_validity_rate: "of the citations that EXIST, how many are valid?"
 *   - Only chapters with totalCitations > 0 contribute to the rate.
 *   - Chapters with zero citations are counted in `uncited_chapters` instead.
 *   - If NO chapter has any citation (denominator = 0), rate = 1.0 (no invalid
 *     citations exist) and uncited_chapters = total chapters.
 *
 * @param prose  Record<chapterTitle, ProseSection[]> — same shape as wiki-prose.json
 * @param index  IndexLike — allFiles + optional lineCountOf
 */
export function verifyCitations(prose: ProseRecord, index: IndexLike): VerifyResult {
  const perChapter: ChapterVerifyResult[] = [];
  let sumValid = 0;
  let sumCitations = 0;
  let uncited_chapters = 0;

  for (const [chapter, sections] of Object.entries(prose)) {
    // Reconstruct full text for this chapter (join all sections)
    const fullText = sections.map(s => s.text).join('\n');

    // Count total citation refs in this chapter (using shared helper from write.ts)
    const totalCitations = countCitationRefs(fullText);

    // Run enforceCitations to find which refs are invalid
    // The dropped array contains one entry per invalid ref
    const { kept, dropped } = enforceCitations(fullText, index);

    // dropped entries: each is one invalid citation (one ref that failed)
    const invalidCitations: InvalidCitation[] = dropped.map(d => ({
      claim: d.claim,
      path: d.path,
      reason: d.reason,
    }));

    // valid = count of refs that ACTUALLY SURVIVED into `kept`
    // This is accurate even when a Sources: line has one good + one bad ref
    // (the entire line is dropped by enforceCitations, so the good ref does NOT survive).
    const validCount = countCitationRefs(kept);

    if (totalCitations === 0) {
      // Zero-citation chapter: excluded from rate; tracked separately
      uncited_chapters++;
    } else {
      sumValid += validCount;
      sumCitations += totalCitations;
    }

    perChapter.push({
      chapter,
      citations: totalCitations,
      valid: validCount,
      invalid: invalidCitations,
    });
  }

  // citation_validity_rate: guard divide-by-zero (no cited chapters → 1.0,
  // because there are no invalid citations in a world with no citations at all)
  const citation_validity_rate = sumCitations > 0 ? sumValid / sumCitations : 1.0;

  return { perChapter, citation_validity_rate, uncited_chapters };
}

// ── writeVerifyReport ─────────────────────────────────────────────────────────

/**
 * Write wiki-verify.md to the given path (default: logs/reports/wiki-verify.md).
 * The report includes per-chapter stats and the summary citation_validity_rate.
 */
export function writeVerifyReport(result: VerifyResult, outPath: string = DEFAULT_REPORT_PATH): void {
  const lines: string[] = [
    `# wiki:verify Report`,
    ``,
    `**citation_validity_rate:** ${(result.citation_validity_rate * 100).toFixed(1)}%`,
    `**uncited_chapters:** ${result.uncited_chapters} (chapters with zero citations; excluded from rate)`,
    ``,
    `| Chapter | Citations | Valid | Invalid |`,
    `|---------|-----------|-------|---------|`,
  ];

  for (const ch of result.perChapter) {
    lines.push(`| ${ch.chapter} | ${ch.citations} | ${ch.valid} | ${ch.invalid.length} |`);
  }

  lines.push('');
  lines.push('## Invalid Citations Detail');
  lines.push('');

  let anyInvalid = false;
  for (const ch of result.perChapter) {
    if (ch.invalid.length === 0) continue;
    anyInvalid = true;
    lines.push(`### ${ch.chapter}`);
    lines.push('');
    for (const inv of ch.invalid) {
      lines.push(`- **path:** \`${inv.path}\``);
      lines.push(`  - **reason:** ${inv.reason}`);
      lines.push(`  - **claim:** ${inv.claim.slice(0, 120)}`);
    }
    lines.push('');
  }

  if (!anyInvalid) {
    lines.push('_(no invalid citations found)_');
    lines.push('');
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const isDry = process.argv.includes('--dry');
  const doRewrite = process.argv.includes('--rewrite');

  // Load wiki-prose
  let prose: ProseRecord;
  try {
    prose = JSON.parse(fs.readFileSync(WIKI_PROSE_PATH, 'utf-8'));
  } catch {
    console.error('[wiki:verify] data/wiki-prose.json missing — run wiki:write first.');
    process.exit(1);
  }

  if (isDry && !doRewrite) {
    const chapterCount = Object.keys(prose).length;
    console.log(`[wiki:verify --dry] ${chapterCount} chapter(s) in prose — would verify (no index load).`);
    console.log('[wiki:verify --dry] Done — no API request made.');
    return;
  }

  // Build index for citation validation
  await ensureIndex();

  const lineCountOf = buildLineCountOf(GLOBAL_INDEX.allFiles);
  const index: IndexLike = {
    allFiles: GLOBAL_INDEX.allFiles,
    lineCountOf,
  };

  const result = verifyCitations(prose, index);

  console.log(`[wiki:verify] citation_validity_rate = ${(result.citation_validity_rate * 100).toFixed(1)}%`);
  for (const ch of result.perChapter) {
    const icon = ch.invalid.length === 0 ? '✓' : '✗';
    console.log(`  ${icon} ${ch.chapter}: ${ch.valid}/${ch.citations} valid`);
  }

  // Rewrite hook (gated behind --rewrite flag)
  if (doRewrite) {
    const model = MODEL_TIERS.verify;
    const chaptersNeedingRewrite = result.perChapter.filter(ch => ch.invalid.length > 0);

    if (isDry) {
      console.log(`[wiki:verify --rewrite --dry] would rewrite ${chaptersNeedingRewrite.length} chapters using model ${model}`);
    } else {
      const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
      if (!apiKey) {
        console.warn('[wiki:verify --rewrite] No API key — skipping rewrite (set ANTHROPIC_API_KEY).');
      } else {
        // Real rewrite deferred — stub only
        console.log(`[wiki:verify --rewrite] would rewrite ${chaptersNeedingRewrite.length} chapters (real rewrite deferred to a future task)`);
      }
    }
  }

  writeVerifyReport(result);
  console.log(`[wiki:verify] → logs/reports/wiki-verify.md`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch(e => {
    console.error('[wiki:verify] Fatal:', e);
    process.exit(2);
  });
}
