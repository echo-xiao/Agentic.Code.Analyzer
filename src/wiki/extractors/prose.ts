/**
 * Prose layer (spec 2026-07-12 §4; delivers 2026-07-11 step 1b).
 *
 * Deterministic extractors already produce exact tables/graphs/citations in
 * chapter.prose[].text. This layer LAYERS narrative on top:
 *   - chapter.page.summary        — one "Purpose and Scope" paragraph
 *   - chapter.prose[i].narrative  — 2–4 sentences explaining a section's table/figure
 * It NEVER edits structural fields. Every path/package/number the LLM writes is
 * checked against the chapter's real facts + GLOBAL_INDEX.allFiles; drifting
 * sentences are dropped, never shipped.
 */
import type { MetaChapter } from './types.js';

// ── Facts the prose is allowed to reference ────────────────────────────────
export interface ChapterFacts {
  allowedPaths: Set<string>;   // rel paths from source_files + paths cited in section texts
  factText: string;            // scope + all section texts (substring source for pkg/number checks)
}

// file-path tokens by extension; @scope/pkg tokens; 2+ digit numbers
const PATH_TOKEN_RE = /[\w./@-]+\.(?:ts|tsx|js|jsx|json|mjs|cjs|yml|yaml|md|sh)/gi;
const PKG_TOKEN_RE  = /@[\w.-]+\/[\w.-]+/g;
const NUM_TOKEN_RE  = /\b\d{2,}\b/g;

export function collectFacts(chapter: MetaChapter): ChapterFacts {
  const allowedPaths = new Set<string>();
  const page = chapter.page;
  for (const p of Object.keys(page.source_files ?? {})) allowedPaths.add(p);
  const factParts: string[] = [page.scope ?? ''];
  for (const s of chapter.prose ?? []) {
    const t = s.text ?? '';
    factParts.push(t);
    for (const m of t.matchAll(PATH_TOKEN_RE)) allowedPaths.add(m[0]);
  }
  return { allowedPaths, factText: factParts.join('\n') };
}

// Normalise a path for membership check the same way enforceCitations does.
function relOf(p: string): string {
  return p.includes('Rocket.Chat/') ? p.split('Rocket.Chat/')[1] : p;
}

function splitSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
}

export interface GroundResult { clean: string; dropped: string[] }

/**
 * Sentence-level grounding. Drop any sentence that mentions:
 *   - a file-path token absent from facts.allowedPaths AND from allFiles      (HARD)
 *   - an @scope/pkg token that never appears in facts.factText                (HARD)
 *   - a 2+ digit number that never appears in facts.factText                  (HARD)
 * Kept sentences are re-joined. Returns cleaned text + the dropped sentences.
 */
export function groundText(
  text: string,
  facts: ChapterFacts,
  allFiles: ReadonlySet<string> | Set<string>,
): GroundResult {
  const relAll = new Set<string>();
  for (const f of allFiles) { relAll.add(f); const r = relOf(f); if (r) relAll.add(r); }

  const kept: string[] = [];
  const dropped: string[] = [];

  for (const sent of splitSentences(text)) {
    let drift = false;
    for (const m of sent.matchAll(PATH_TOKEN_RE)) {
      const tok = m[0];
      if (!facts.allowedPaths.has(tok) && !relAll.has(tok) && !relAll.has(relOf(tok))) { drift = true; break; }
    }
    if (!drift) for (const m of sent.matchAll(PKG_TOKEN_RE)) {
      if (!facts.factText.includes(m[0])) { drift = true; break; }
    }
    if (!drift) for (const m of sent.matchAll(NUM_TOKEN_RE)) {
      if (!facts.factText.includes(m[0])) { drift = true; break; }
    }
    if (drift) dropped.push(sent);
    else kept.push(sent);
  }
  return { clean: kept.join(' ').replace(/\s+/g, ' ').trim(), dropped };
}
