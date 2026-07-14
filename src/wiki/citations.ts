// citations.ts — `Sources:` citation validation. Shared by write.ts (enforce during generation)
// and verify.ts (offline re-check → citation_validity_rate). Pure functions — no LLM / no API.
import * as fs from 'fs';

// ── Index-like shape used by enforceCitations ─────────────────────────────────
export interface IndexLike {
  allFiles: Set<string> | ReadonlySet<string>;
  /**
   * optional: relOrAbsPath → line count.
   * Return undefined (or null) when the count cannot be determined
   * (file unresolvable / unreadable) → fail-open (keep citation).
   * Return a number when count is known → DROP if range exceeds it.
   */
  lineCountOf?: (relOrAbsPath: string) => number | undefined | null;
}

// ── Citation regex (shared across enforceCitations, countCitationRefs, writeChapter) ────────────
// Matches all four LLM-emitted forms:
//   path:L<start>           path:<start>
//   path:L<start>-L<end>    path:<start>-<end>   path:L<start>-<end>
// [^:] stops at first colon (the one before the optional L); path must not contain a bare colon.
export const SINGLE_REF_RE = /^([^:]+):L?(\d+)(?:-L?(\d+))?$/;

// ── enforceCitations ──────────────────────────────────────────────────────────

export interface DroppedCitation {
  claim: string;
  path: string;
  reason: string;
}

export interface CitationResult {
  kept: string;
  dropped: DroppedCitation[];
}

/**
 * Scan for `Sources: path:Lstart-Lend` lines.
 * Drop any assertion-line immediately preceding a bad Sources: line.
 * Returns cleaned text + list of dropped items.
 *
 * Pure function of (text, index) — no side effects, no I/O.
 *
 * Grammar matched (two accepted formats):
 *   Sources: <path>:L<start>-L<end>   (LLM tends to emit this form)
 *   Sources: <path>:L<start>-<end>    (compact form)
 *   Sources: <path>:L<start>           (single line)
 */
export function enforceCitations(text: string, index: IndexLike): CitationResult {
  const allFiles = index.allFiles;
  const lineCountOf = index.lineCountOf;

  // Build set of rel-paths from allFiles for O(1) lookup.
  // allFiles may contain absolute paths (Rocket.Chat/ prefix) or rel paths.
  const relFileSet = new Set<string>();
  for (const f of allFiles) {
    // normalise to rel path (after "Rocket.Chat/")
    const rel = f.includes('Rocket.Chat/') ? f.split('Rocket.Chat/')[1] : f;
    if (rel) relFileSet.add(rel);
    // also store as-is (for already-relative paths)
    relFileSet.add(f);
  }

  const SOURCES_LINE_RE = /^Sources:\s*(.+)$/im;

  const lines = text.split('\n');
  const dropped: DroppedCitation[] = [];
  const keepLine = new Array<boolean>(lines.length).fill(true);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const m = SOURCES_LINE_RE.exec(line);
    if (!m) continue;

    const refs = m[1].split(',').map(s => s.trim()).filter(Boolean);
    const badRefs: Array<{ ref: string; reason: string }> = [];

    for (const ref of refs) {
      const rm = SINGLE_REF_RE.exec(ref.trim());
      if (!rm) {
        badRefs.push({ ref, reason: 'malformed citation (expected path:Lstart[-end])' });
        continue;
      }
      const [, refPath, startStr, endStr] = rm;
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : start;

      // Path check
      if (!relFileSet.has(refPath) && !relFileSet.has(refPath.replace(/\\/g, '/'))) {
        badRefs.push({ ref, reason: `path not in index: ${refPath}` });
        continue;
      }

      // Bounds check (if lineCountOf provided)
      if (lineCountOf) {
        const lineCount = lineCountOf(refPath);
        if (lineCount !== null && (start < 1 || end > lineCount)) {
          badRefs.push({ ref, reason: `line range L${start}-${end} out of bounds (file has ${lineCount} lines)` });
        }
      }
    }

    if (badRefs.length > 0) {
      // Drop the Sources: line itself
      keepLine[i] = false;
      // Also drop the immediately preceding assertion line (non-empty, non-header)
      for (let j = i - 1; j >= 0; j--) {
        const prev = lines[j].trim();
        if (prev === '') continue;
        if (prev.startsWith('#')) break; // don't remove headers
        keepLine[j] = false;
        for (const { ref, reason } of badRefs) {
          dropped.push({ claim: prev, path: ref, reason });
        }
        break;
      }
    }
  }

  const kept = lines.filter((_, i) => keepLine[i]).join('\n');
  return { kept, dropped };
}

// ── countCitationRefs ─────────────────────────────────────────────────────────

/**
 * Count every well-formed citation ref on Sources: lines in `text`.
 * "Well-formed" means matching the same SOURCES_LINE_RE + SINGLE_REF_RE that
 * enforceCitations validates — so this counts exactly the refs that
 * enforceCitations will accept or reject, nothing more.
 *
 * Both valid AND invalid refs are counted; the caller can subtract
 * `dropped.length` to get the valid count.
 */
export function countCitationRefs(text: string): number {
  const SOURCES_LINE_RE_LOCAL = /^Sources:\s*(.+)$/gim;
  let total = 0;
  let m: RegExpExecArray | null;
  SOURCES_LINE_RE_LOCAL.lastIndex = 0;
  while ((m = SOURCES_LINE_RE_LOCAL.exec(text)) !== null) {
    const refs = m[1].split(',').map(s => s.trim()).filter(Boolean);
    for (const ref of refs) {
      // Count any non-empty ref — both valid and malformed ones are citation
      // attempts and land in dropped when invalid.
      if (ref.trim().length > 0) {
        total++;
      }
    }
  }
  return total;
}

// ── lineCountOf factory ───────────────────────────────────────────────────────

/**
 * Build a lineCountOf function that counts physical lines in a source file,
 * resolving citation paths using the same normalization that enforceCitations
 * uses for the allFiles membership check (so a path that passes the path check
 * will also resolve here).
 *
 * Returns undefined when the file can't be resolved or read → enforceCitations
 * treats that as "unknown" and keeps the citation (fail-open on unknown only).
 *
 * Results are cached in a Map to avoid repeated fs reads for the same file.
 */
export function buildLineCountOf(
  allFiles: Set<string> | ReadonlySet<string>,
): (relOrAbsPath: string) => number | undefined {
  const cache = new Map<string, number | undefined>();

  // Build a lookup: normalized-rel-path → absolute path from allFiles
  const relToAbs = new Map<string, string>();
  for (const f of allFiles) {
    const rel = f.includes('Rocket.Chat/') ? f.split('Rocket.Chat/')[1] : f;
    if (rel) relToAbs.set(rel, f);
    // also allow the as-is key (for already-relative paths)
    relToAbs.set(f, f);
  }

  return function lineCountOf(relOrAbsPath: string): number | undefined {
    if (cache.has(relOrAbsPath)) return cache.get(relOrAbsPath);

    // Resolve: try citation path via relToAbs table, then as-is
    const candidates: string[] = [];
    if (relToAbs.has(relOrAbsPath)) {
      const abs = relToAbs.get(relOrAbsPath);
      if (abs) candidates.push(abs);
    }
    // also push the citation path itself in case it's already absolute
    candidates.push(relOrAbsPath);

    for (const candidate of candidates) {
      try {
        const content = fs.readFileSync(candidate, 'utf-8');
        const count = content.split('\n').length;
        cache.set(relOrAbsPath, count);
        return count;
      } catch {
        // try next
      }
    }

    cache.set(relOrAbsPath, undefined);
    return undefined;
  };
}
