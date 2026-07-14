# Rocket.Chat Code Analyzer

Graph-native code navigator for the Rocket.Chat monorepo, exposed as an MCP server. An agent
answers codebase questions by declaring intent (`plan`), finding seeds (`search`), traversing the
dependency graph (`graph`), and reading source for 1-2 key points (`details`) — built for high
answer accuracy at low token cost on free-tier models.

## Why a graph, not grep

`sendMessage` end-to-end crosses 5 communication layers (React tree → DDP boundary → server method
→ DB write → afterSave callbacks), and every cross-layer hop has **no import statement**. The
offline indexer makes those hops traversable by extracting string-dispatch sites as virtual nodes:

| Cross-layer pattern | Edge types |
|---|---|
| `sdk.call('sendMessage')` ↔ `Meteor.methods({sendMessage})` | `call` via virtual node |
| `callbacks.run('afterSaveMessage')` ↔ `callbacks.add(...)` | `event_emit` / `event_listen` |
| `rest.get('/v1/..')` ↔ `API.v1.addRoute('..')` (normRoute) | `rest_call` / `rest_route` |
| `Meteor.publish` ↔ `Meteor.subscribe` | `pubsub_publish` / `pubsub_subscribe` |
| `new Streamer('notify-user')` ↔ `sdk.stream('notify-user')` | `stream_def` / `stream_sub` |

12 edge types total (also `call`/`jsx`/`new`/`type` static edges). Symbol collisions are resolved
import-aware (`pickRootFile` + import distances). No embeddings — ranking is pure graph arithmetic.

## Layout

```
src/
  config.ts                    ROCKET_CHAT_SRC (default ../Rocket.Chat), output paths
  architecture.json            entry-point hints keyed by query keywords
  indexer/                     knowledge layer: scan → dehydrate (ts-morph) → hash → build → load
    state.ts                   GLOBAL_INDEX: symbols · callGraph (reverse edges) · fileDependents · allFiles
    skeleton.ts hasher.ts local-db.ts index.ts
  server/                      retrieval layer (control / data split)
    index.ts                   MCP bootstrap
    registry.ts                tool schemas + dispatch + metering (MCP adapter only)
    session.ts                 SESSION: declared intent + call metering
    intent.ts                  intent → move/depth recipes + keyword classifier
    tools/                     one tool per file
      plan.ts                  control: declare question type → sets SESSION.intent
      search.ts                data: exact symbol + path fragment + grep (seeds, no ranking)
      graph.ts                 data: move = expand | down | up (defaults from intent)
      details.ts               data: full source of one located symbol (guarded)
    engine/                    one algorithm per file
      seeds.ts                 lexicalSeeds — fuzzysort seeding only
      expand.ts                expandNeighborhood — BFS + the ONLY ranking formula
      down.ts                  ordered callee tree (call chains)
      up.ts                    layered dependents / blast radius (impact)
      source.ts                ts-morph source extraction
      common.ts                shared helpers (layers, test filters, root picking, arch hints)
  eval/                        measurement layer
    gen.ts                     generate answers: --mode=nomcp|mcp [--oracle] [--model] [--filter]
    trace.ts                   per-question retrieval trace (record-only) → logs/data/retrieval-trace/
    report.ts                  single report → logs/reports/report.md (对不对 gold: scope/召回/walk-core/seed + trace; semantic via --semantic)
    judge.ts                   semantic-compare LIBRARY (judgeAnswers; used by report --semantic; gold = answers-claude, never the wiki)
    truth.ts                   extract Claude-derived ground truth → utils/claude-truth.json (core/supporting/chain, one-time)
    utils/                     testcases.json + shared scoring helpers
logs/reports/
  report.md                    single report — 对不对(gold, zero-API) + trace + optional semantic; by report.ts
  wiki-verify.md               self-generated wiki citation validity (by wiki:verify)
```

## Tools (agent-facing)

| Tool | Role | Returns |
|---|---|---|
| `plan(question)` | control — classify intent | strategy + default graph move/depth |
| `search(query, layer?)` | seeds | exact symbol hits · path matches · grep fallback |
| `graph(query, move?, depth?, …)` | traverse | `expand` ranked neighborhood · `down` ordered chain · `up` blast radius |
| `details(symbolName, filename)` | read | full source (class methods via `Class.method`) |

Intent recipes: architecture/routing → `expand` (depth 2) · locate/pattern → `expand` (depth 1) ·
call-chain → `down` (depth 5) · impact → `up` (depth 5). The agent can override any default.

## Run

The index must be built (`prewarm`) before the MCP server, `gen:mcp`, or `trace` — they
all read `GLOBAL_INDEX`. `refresh` chains the whole pipeline in the right order.

```bash
# --- index + server (index needs a Rocket.Chat checkout at ../Rocket.Chat or $ROCKET_CHAT_SRC) ---
npm run prewarm     # build/load the graph index (run first)
npm run start       # MCP server on stdio
npm run inspect     # MCP inspector against the server

# --- eval pipeline (GEMINI_API_KEY in .env for gen:*) ---
npm run gen:nomcp   # baseline answers, Gemini with no tools               → logs/answers-gemini-nomcp/
npm run gen:mcp     # agent answers: Gemini + plan/search/graph/details + DeepWiki `wiki` self-loop
                    #   → logs/answers-gemini-mcp-selfloop/  (add --oracle to force intent from testcase type)
npm run trace       # deterministic per-question retrieval trace, no API → logs/data/retrieval-trace/
npm run report      # single report → logs/reports/report.md  (对不对 gold: scope/召回/walk-core/seed + trace; zero-API)
                    #   add `-- --semantic` for the paid Claude semantic segment (agent answers vs answers-claude gold)
npm run truth       # (re)build Claude-derived ground truth from answers-claude → src/eval/utils/claude-truth.json (paid API; rerun only when answers-claude changes)
npm run refresh     # one-shot: prewarm → gen:nomcp → gen:mcp → trace → report  (all zero-API; --semantic is separate/paid)

# --- unit guards ---
npm test            # SYSTEM_PROMPT has no ground-truth path leak + gen.ts is import-side-effect-safe
```

Semantic scoring is opt-in and paid: run `npm run report -- --semantic` (uses the `judge` library) on demand; `refresh` stays zero-API.

## Evaluation discipline

- **`report.md` is the single eval artifact** — deterministic and zero-API by default. Per question it lands
  **对不对** (trace × `claude-truth.json`: is the answer file's page in scope? how many answer files recalled?
  does each walk step hit a core file? did the *seed itself* hit core, or only the wide walk?) plus the raw
  **trace** (scope/seed/walk/agent 实调). A **traceDrift** guard warns when the trace was run against a stale
  wiki-map (its `pageStep.chosen` page names no longer match the current one) — so stale traces can't emit fake numbers.
- **Gold** = `src/eval/utils/claude-truth.json` (extracted from `answers-claude/` by `truth.ts`).
  `testcases.json` supplies question metadata (question/type/subsystem/difficulty/ordered).
- **Semantic is opt-in and paid**: `npm run report -- --semantic` runs the `judge` library (Claude
  sonnet-4-6, agent answers vs `answers-claude/` gold) → per-question PASS/PARTIAL/FAIL folded into
  `report.md` + cached to `verdicts-latest.json`. Never judged against the self-generated wiki (circular).
- **Retired** (superseded by the single `report`): the `eval:tools` R@k/reachability/chain-LCS gate, the
  `metrics.md`/`verdicts.md`/`tools-data.json` triple, and the mechanical auto-triage.

## Roadmap

The control/data refactor was **phase 1** — structural cleanup that froze the ranking formula, so
it moved zero accuracy by design (tools 24/34 at the time, bit-identical to the baseline; the honest
engine-only floor is now 19/34 after architecture hints moved to `plan` — see Evaluation discipline).
The seams it created (`seeds.ts` / `expand.ts` / `intent.ts` as standalone units) make phase 2 tractable.

**Phase 2 — lift seed recall on concept queries.** A stubborn failure bucket is retrieval-recall
= 0: core files never surfaced (the `search`-stage / `engine-unrankable` cases in the reports) —
concept-shaped queries (“API endpoints”, “slash commands”) where `lexicalSeeds` (fuzzysort over
symbol names) matches nothing and only grep saves it. The lever is a
concept → symbol/edge seed map (feed `architecture.json`-style anchors into `seeds.ts`) so these get
a structured entry when the name-fuzzy seed misses. Gate is the `report` 对不对/召回 — the other questions must not
regress.
