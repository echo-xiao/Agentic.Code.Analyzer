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
import-aware (`pickRootFile` + import distances). Ranking is graph-first, with a semantic cosine
(query × file-summary vectors) fused in by RRF — see **How it works** below.

## How it works

Two phases, one **north star: zero runtime external dependency** — every expensive step (parsing,
summarizing, embedding, wiki generation) is amortized **offline** into local indexes; at query time
the retriever only reads them (no external wiki service, no runtime fetch). An **offline indexer** turns the Rocket.Chat
checkout into a graph plus a summary layer, and the self-generated wiki (`wiki:gen`) doubles as a
**routing layer**; the **online retriever** walks all of it to answer one question at a time, through
four agent tools.

### Offline — build the index (`prewarm`, chained by `refresh`)

1. **scan + incremental hash** — walk the source tree; `hasher` fingerprints each file so a rebuild
   only re-processes what changed.
2. **dehydrate (ts-morph)** — `skeleton.ts` parses each file into a skeleton (symbols + signatures);
   `extract-edges.ts` pulls the **12 edge types** — 4 static (`call`/`jsx`/`new`/`type`) and 8
   string-dispatch ones (`event_*`, `pubsub_*`, `rest_*`, `stream_*`) captured as virtual nodes, so
   the no-import cross-layer hops become traversable.
3. **build `GLOBAL_INDEX`** — the in-memory graph: `symbols` (name → files) · `callGraph` (reverse
   edges: `caller → {file, edgeType}`) · `fileDependents` · `allFiles`.
4. **summarize + embed** — `summarize.ts` writes one paragraph per file; `embed.ts` turns each summary
   into a vector. This is the semantic layer the ranker blends in below — no source is re-read at
   query time except the final `details` step.

### Online — answer one question (the four tools)

5. **`plan(question)` → intent** — `classifyIntent` keyword-matches the question to one of six intents
   (architecture / routing / locate / pattern / call-chain / impact), each mapped to a default graph
   move + depth by `RECIPES`. In parallel, `entry-map` reads the self-generated wiki (the routing
   layer) and runs one zero-LLM offline walk (entry graph → pick page → pick seed → affinity walk),
   handing the agent a candidate-file map to start from — in-memory, no LLM, no network.
6. **`search(query)` → seeds** — three deterministic lookups, no ranking: exact symbol hit (🎯),
   file-path fragment (📁), and a content `grep` fallback (🔍) for call-patterns and index misses.
7. **`graph(query, move, depth)` → traverse + rank** — the heart of retrieval:
   - **`expand`** — `lexicalSeeds` (fuzzysort over symbol names) seeds a BFS neighborhood, then ranks
     by **fusing two signals with RRF**: (1) a **structural score**
     `2·proximity + 1.5·lexical + 0.6·cohesion + 0.2·centrality + prior − 0.6·hubPenalty − testPenalty`
     (close to the seed, densely wired into the neighborhood, a real definition — minus the
     everything-touches utilities), and (2) **semantic cosine** (query vector × the symbol's
     file-summary vector). The two are **complementary** — semantic catches on-topic summaries, fuzzy
     catches path-literal matches — so RRF takes whichever ranks a file higher rather than a weighted
     sum that pleases neither (litmus: 7→14 top-25 hits). No vectors present → pure structure,
     bit-identical to the old behavior.
   - **`down`** — ordered callee tree (call chains); **`up`** — layered dependents including dynamic
     edges (blast radius).
8. **`details(symbol, file)` → read** — `source.ts` re-opens the one located file with ts-morph and
   returns the symbol's real source, so every citation is grounded, never recalled from training data.

Net: fuzzysort seeds + graph arithmetic find the subsystem; the file-summary cosine re-weights what the
walk already surfaced; ts-morph reads ground truth only at the two ends — the index build, and the
final `details`.

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
    gen.ts                     generate agent answers: --mode=mcp [--oracle] [--model] [--filter] (nomcp/wiki-only retired 2026-07-08)
    trace.ts                   per-question retrieval trace (record-only) → logs/data/retrieval-trace/
    report.ts                  single report → logs/reports/report.md (correctness vs gold: scope/recall/walk-core/seed + trace; semantic via --semantic)
    judge.ts                   semantic-compare LIBRARY (judgeAnswers; used by report --semantic; gold = answers-claude, never the wiki)
    truth.ts                   extract Claude-derived ground truth → utils/claude-truth.json (core/supporting/chain, one-time)
    utils/                     testcases.json + shared scoring helpers
  wiki/                        knowledge product: self-generated architecture wiki (feeds the `wiki` tool + wiki-site)
    generate.ts                5-step pipeline: outline → guide → write → diagram → verify (→ data/wiki-map.json, git-sha stamped)
    outline.ts guide.ts write.ts diagram.ts citations.ts verify.ts   taxonomy.ts tree.ts route.ts families.ts
data/
  wiki-map.json                generated wiki (page structure + component relations + index-ranked files) — read by the `wiki` tool & wiki-site
  index/                       chunks.json · chunk-vectors.json · module-graph.json
wiki-site/                     static wiki viewer (index.html · app.js · style.css) over data/*.json — `npm run wiki:serve`
logs/reports/
  report.md                    single report — correctness (vs gold, zero-API) + trace + optional semantic; by report.ts
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

# --- eval pipeline (GEMINI_API_KEY in .env for gen:mcp; CLAUDE_API_KEY for --semantic/truth) ---
npm run gen:mcp     # agent answers: Gemini + plan/search/graph/details + self-generated `wiki` self-loop
                    #   → logs/answers-gemini-mcp-selfloop/  (add --oracle to force intent from testcase type)
                    #   Gemini free-tier throws ~10% transient 404/429/5xx — gen.ts retries w/ backoff (retries don't affect determinism)
npm run trace       # deterministic per-question retrieval trace, no API → logs/data/retrieval-trace/
npm run report      # single report → logs/reports/report.md  (correctness vs gold: scope/recall/walk-core/seed + trace; zero-API)
                    #   add `-- --semantic` for the paid Claude semantic segment (agent answers vs answers-claude gold)
npm run truth       # (re)build Claude-derived ground truth from answers-claude → src/eval/utils/claude-truth.json (paid API; rerun only when answers-claude changes)

# --- self-generated architecture wiki (paid LLM: outline/guide/write/diagram/verify) ---
npm run wiki:gen    # 5-step pipeline → data/wiki-map.json (stamped with the indexed git sha)
npm run wiki:serve  # static viewer at http://localhost:8080 (whitelist: only wiki-site/ + data/*.json)

npm run refresh     # one-shot chain: prewarm → module:build → summaries → embeds → module:summarize → wiki:map → gen:mcp → trace → report
                    #   (retrieval/report are deterministic; gen:mcp + summaries call LLM APIs; --semantic is separate/paid)

# --- unit guards ---
npm test            # SYSTEM_PROMPT has no ground-truth path leak + gen.ts is import-side-effect-safe
```

Semantic scoring is opt-in and paid: run `npm run report -- --semantic` (uses the `judge` library) on demand — it's the only Claude-judged segment; `refresh` skips it.

## Evaluation discipline

Two questions, never conflated: **did the answer come out right?** and **where did retrieval go wrong?**
The semantic judge gives the verdict; the trace localizes the failure. `report.md` is the single
artifact holding both.

- **Verdict — semantic judge (opt-in, paid).** `npm run report -- --semantic` runs the `judge` library
  (Claude sonnet-4-6, agent answers vs `answers-claude/` gold) → per-question **PASS / PARTIAL / FAIL**,
  folded into `report.md` + cached to `verdicts-latest.json`. This is the *only* judge of final answer
  quality, and it's never run against the self-generated wiki (that would be circular).
  Latest run (Gemini + MCP, 34 cases): **PASS 13 / PARTIAL 19 / FAIL 2**.
- **Diagnosis — trace + correctness check (default, zero-API).** A FAIL alone doesn't say *why*; the trace does.
  `report.md` lands the raw **trace** (scope → seed → walk → agent's actual calls — each step's options / chosen /
  reason / result) next to the **correctness check** (trace × `claude-truth.json`): is the answer file's page in scope?
  how many answer files were recalled? did each walk step hit a core file? did the *seed itself* hit core,
  or only the wide walk? So every failure pins to a stage — **scope missed the page / seed anchored wrong /
  walk never reached it** — not just a number. A **traceDrift** guard voids a trace run against a stale
  wiki-map (its `pageStep.chosen` no longer matches), so stale traces can't emit fake numbers.
  Latest: scope 17/34 · mean recall 56%.
- **Gold** = `src/eval/utils/claude-truth.json` (extracted from `answers-claude/` by `truth.ts`);
  `testcases.json` supplies question metadata (type/subsystem/difficulty/ordered).
