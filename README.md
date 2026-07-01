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
    tools.ts                   deterministic capability gate: R@k · reachability · chain LCS
    token.ts                   token efficiency: no-MCP vs naive@budget vs MCP
    report.ts                  unified join: verdicts + funnel + per-gate attribution
    verdicts.md                semantic verdicts — judged manually by Claude, frozen criteria
    utils/                     testcases.json + shared scoring helpers
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

```bash
npm run prewarm     # build/load the index (needs Rocket.Chat checkout at ../Rocket.Chat or $ROCKET_CHAT_SRC)
npm run start       # MCP server on stdio
npm run inspect     # MCP inspector

# eval pipeline (GEMINI_API_KEY in .env for gen)
npm run gen:nomcp   # baseline answers, no tools
npm run gen:mcp     # agent answers (add --oracle to force intent from testcase type)
npm run eval:tools  # deterministic gate — the regression gate, run before/after every change
npm run eval:token  # token efficiency
npm run report      # unified report → logs/report.md
```

## Evaluation discipline

- **tools (`eval:tools`) is the main gate** — deterministic, seconds, no API. R@k / graph
  reachability / chain-order LCS must not regress. Judging criteria stay frozen.
- **token** tracks efficiency; **verdicts.md** holds the semantic truth (mechanism right?) — judged
  manually by Claude and **re-judged every time answers regenerate**. Single-run PASS counts on
  free-tier Gemini are noisy; judge trends.
- Failure triage (report.md): G1 → engine (seeds/expand/down/up) · route/G2 → plan/intent or
  architecture.json (an `--oracle` rerun separates them) · G3 → gen prompt / plan strategy.
- `logs/reports/tools-BASELINE-pre-refactor.md` is a **frozen** anchor (24/34, captured before the
  control/data refactor). `tools.md` is regenerated on every `eval:tools` run; diff it against the
  frozen baseline to catch regressions in untouched testcases.

## Roadmap

The control/data refactor was **phase 1** — structural cleanup that froze the ranking formula, so
it moved zero accuracy by design (tools 24/34, bit-identical to the baseline). The seams it created
(`seeds.ts` / `expand.ts` / `intent.ts` as standalone units) are what make phase 2 tractable.

**Phase 2 — lift seed recall on concept queries.** The dominant failure bucket is retrieval-recall
= 0: core files never surfaced. In eval-3 that's 6 questions — `claude-07-api-endpoints`,
`new-25-search`, `tour-06-endpoint`, `new-17-slash-commands`, `tour-08-db-model-use`,
`new-10-apps-engine` — all concept-shaped queries (“API endpoints”, “slash commands”) where
`lexicalSeeds` (fuzzysort over symbol names) matches nothing and only grep saves it. The lever is a
concept → symbol/edge seed map (feed `architecture.json`-style anchors into `seeds.ts`) so these get
a structured entry when the name-fuzzy seed misses. Gate stays `eval:tools` — the other 28 must not
regress.
