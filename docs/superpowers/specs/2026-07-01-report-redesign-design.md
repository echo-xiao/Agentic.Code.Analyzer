# Report redesign — attribution skeleton aligned to the plan/search/graph/details pipeline

**Date:** 2026-07-01
**Status:** Design — structure approved by user; pending spec review before implementation plan.
**Scope of change:** `src/eval/report.ts` (primary render/classifier rewrite) + a 1-line intent capture in `src/eval/gen.ts`. **No reindex, no `GENERATOR_VERSION` change, no new eval/Gemini run.**

## 1. Motivation

The refactor (commit `3ef95db`) split the engine into a control/data architecture: `plan → search → graph → details`, with **`plan` (intent routing) now a first-class control step**. But `report.ts` still frames attribution with the pre-refactor funnel `index → retrieve → gather → synth` and a `G1/G2/G3` gate classifier:

- The **routing** step is invisible — folded into the old `G2` tag.
- The funnel stages don't name the tools, so the report no longer mirrors how the system actually works.

This redesign reframes attribution around the new pipeline **while keeping** the funnel's cumulative-survival view and the two orthogonal axes (semantic verdicts, token efficiency).

**Chosen approach: A×C** (user picked "both"):
- **A — the funnel** = top-down cumulative **per-file survival** ("where does the one path leak most?").
- **C — per-tool scorecards** = bottom-up **local conversion + fix-lever + binding testcases** ("is each tool pulling its weight?").

They are complementary, not redundant: **different denominators, different purpose.** The funnel uses pooled per-file fractions (monotonic, ÷ the same N core files); the scorecards use each tool's local rate plus which testcases bind on it.

## 2. New report structure

| § | Source | Content |
|---|--------|---------|
| §1 Headline | A (keep) | Semantic verdicts `PASS/PARTIAL/FAIL` from `verdicts.md` — **unchanged**. |
| §2 Token efficiency | A (keep) | no-MCP / naive / MCP coverage from `token-data.json` — **unchanged**. |
| §3 The Funnel | A (relabel) | Cumulative per-file survival, pipeline-labeled + routing/chain-order diagnostics. |
| §4 Per-tool scorecards | C (new) | One block per tool: `plan / search / graph / details / synth`. |
| §5 Per-testcase detail | A (relabel) | Columns aligned to pipeline stages. |

### §3 The Funnel (same pooled per-file math, relabeled to the pipeline)

Stages, each ÷ the same N core files (monotonic):

```
INDEX (floor)          indexed & graph-reachable                     100%
SEARCH+GRAPH rank      core ranked in top-5 / 10 / 20 / 50 (one query)   <- ranking ceiling
GRAPH loop (gather)    surfaced across the agent's multi-turn loop
SYNTH (write)          written into the answer
```

- **Documented limitation:** the single-query R@k ceiling bundles search seeds + graph expand (the `tools` eval runs `search+expand` as one query), so **search vs graph are not perfectly separable in the per-file funnel.** The funnel labels the ranking stage `SEARCH+GRAPH rank (one query)` and attributes the multi-turn gather delta to `GRAPH loop`. The per-tool scorecards (§4) discuss the two tools separately.
- **Diagnostics row (NOT survival bars — different unit, per-question):** `PLAN routing accuracy (X/34 correct intent)` · `chain-order LCS (ordered Qs)`.

### §4 Per-tool scorecards

One block per tool — `role (1 line) · metric · local leak · # testcases it binds · fix-lever`:

- **plan (route):** routing accuracy = resolved intent vs `tc.questionType` (X/34). *Fix-lever:* `intent.ts` keyword table / `architecture.json` hints.
- **search (seed):** seed-rank quality (R@10 / R@50); recall-miss share (core never ranked in top-50). *Fix-lever:* seeds / engine ranking.
- **graph (traverse):** gather rate = surfaced ÷ ranking ceiling; chain-order LCS on ordered Qs. *Fix-lever:* `engine` expand / down / up depth+direction.
- **details:** fetch step — call count only; **not a binding stage** (low leak). Noted for completeness.
- **synth (write):** synth-recall = written ÷ surfaced; dropped-file count. *Fix-lever:* `gen` prompt / `plan` strategy.

**Binding-tool classifier** (replaces `G1/G2/G3`): front→back, the first leaking stage binds — `route → search → graph → synth`. Old `§5` classifier rules fold into each tool's *fix-lever* line.

### §5 Per-testcase detail

Columns: `# · id · type · route ✓/✗ · search R@10·diag · graph gather · synth · end cov · verdict · binding tool`.

## 3. Routing intent resolution (the one data-capture change)

**Problem:** `plan(...)` args are truncated (~100 chars) in saved answers, so the intent survives for ~29/34 and is fully lost for 5 (`new-09`, `new-10`, `new-15`, `new-19`, `new-20`).

**Resolution order per question (in `report.ts`):**
1. Untruncated `resolvedIntent` field, if present (future answers — see gen.ts change).
2. Prefix-recovery from truncated args (`"intent":"arc` → `architecture`; the 6 intent prefixes are unambiguous). Covers ~29/34.
3. Deterministic classifier reconstruction (`intent.ts` on the question) for the fully-truncated 5 — **footnoted "best-effort (agent override not visible due to truncation)."**

**`gen.ts` change (1 line, no reindex, no `GENERATOR_VERSION` change):** after `plan` resolves, record `SESSION.intent` into the `AnswerRecord` (a `resolvedIntent` field + a short `## Plan` line in the saved answer). Future `gen:mcp` runs → routing is 34/34 clean and resolution step 1 wins. **No forced rerun now** — the current report renders routing from steps 2+3 and footnotes the 5.

## 4. Data sources (all existing — no new run)

`verdicts.md` (§1) · `token-data.json` (§2) · `tools-data.json` (R@k, chain-order, diagnosis) · answers' `## Files Seen In Tool Results` (gather) + written core (synth). No Gemini call, no index rebuild.

## 5. Testing / verification

- `npm run report` renders §1–§5, joins 34/34, funnel is monotonic, routing shows `X/34`, per-tool scorecards populate, detail-table columns align.
- Diff §1 (verdicts) and §2 (token) against the committed baseline report → **identical** (regression guard).
- Binding-tool tags sum to 34 and are consistent with the funnel leaks.

## 6. Non-goals (YAGNI)

- **No oracle run** (lightweight routing chosen — accuracy only, not the pt-cost of misrouting).
- **No reindex / `GENERATOR_VERSION` change** ([[feedback_generator_version]]).
- **No changes to `eval:tools` / `eval:token` metrics** — only `report.ts` rendering+reorg and the 1-line `gen.ts` capture.
- **No new funnel math** — same pooled per-file fractions, only relabeled.
