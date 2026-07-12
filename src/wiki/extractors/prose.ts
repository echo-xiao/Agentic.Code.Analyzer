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
import '../../eval/utils/load-env.js';
import Anthropic from '@anthropic-ai/sdk';
import { MODEL_TIERS } from '../../config.js';
import { GLOBAL_INDEX } from '../../indexer/state.js';
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

// ── addProse orchestration ─────────────────────────────────────────────────
export interface AddProseDeps {
  /** injectable model call (system,user) → raw text; defaults to Claude. Lets tests run offline. */
  generate?: (system: string, user: string) => Promise<string>;
  /** allowed file set for path grounding; defaults to GLOBAL_INDEX.allFiles. */
  allFiles?: ReadonlySet<string> | Set<string>;
  /** model id; defaults to MODEL_TIERS.leaf (Haiku). */
  model?: string;
}

const PROSE_SYSTEM = [
  'You are a technical writer. You receive the EXACT structural facts of ONE wiki page',
  '(its scope, its section tables/lists). Write short narrative prose that explains what',
  'those facts mean to a new engineer.',
  'HARD RULES:',
  '- Explain ONLY the facts given. Do NOT introduce any number, file path, or package name',
  '  that is not already present in the given facts.',
  '- Do NOT add citations or "Sources:" lines — the tables already carry them.',
  '- Be concise and concrete. 2-4 sentences each. No marketing language.',
].join('\n');

function buildProsePrompt(chapter: MetaChapter): string {
  const p = chapter.page;
  const lines = [`# Page: ${p.title}`, `Scope: ${p.scope}`, '', '## Sections (verbatim facts):'];
  for (const s of chapter.prose ?? []) lines.push(`### ${s.section}`, s.text, '');
  lines.push(
    '',
    'Return ONLY a JSON object of this exact shape:',
    '{"summary": "<one Purpose-and-Scope paragraph, 2-4 sentences>",',
    ' "narratives": {"<section name>": "<2-4 sentence narrative>", ...}}',
    'Cover every section above by its EXACT name. Output ONLY the JSON, no prose around it.',
  );
  return lines.join('\n');
}

function parseProseJson(raw: string): { summary?: string; narratives?: Record<string, string> } | null {
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  try { return JSON.parse(raw.slice(start, end + 1)); } catch { return null; }
}

function defaultGenerate(model: string) {
  return async (system: string, user: string): Promise<string> => {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    if (!apiKey) throw new Error('[prose] No ANTHROPIC_API_KEY / CLAUDE_API_KEY');
    const client = new Anthropic({ apiKey });
    const resp = await client.messages.create({
      model, max_tokens: 2048, system,
      messages: [{ role: 'user', content: user }],
    });
    const block = (resp.content as any[]).find((b: any) => b.type === 'text');
    return block?.text ?? '';
  };
}

export async function addProse(chapter: MetaChapter, deps: AddProseDeps = {}): Promise<MetaChapter> {
  const model = deps.model ?? MODEL_TIERS.leaf;
  const allFiles = deps.allFiles ?? GLOBAL_INDEX.allFiles;
  const generate = deps.generate ?? defaultGenerate(model);

  // copy structural fields; only summary/narrative get added
  const out: MetaChapter = {
    page: { ...chapter.page },
    prose: (chapter.prose ?? []).map(s => ({ ...s })),
  };

  const raw = await generate(PROSE_SYSTEM, buildProsePrompt(chapter));
  const parsed = parseProseJson(raw);
  if (!parsed) return out;   // degrade: structural-only, no crash

  const facts = collectFacts(chapter);

  if (parsed.summary) {
    const g = groundText(parsed.summary, facts, allFiles);
    if (g.clean) out.page.summary = g.clean;
  }
  for (const s of out.prose) {
    const n = parsed.narratives?.[s.section];
    if (!n) continue;
    const g = groundText(n, facts, allFiles);
    if (g.clean) s.narrative = g.clean;
  }
  return out;
}
