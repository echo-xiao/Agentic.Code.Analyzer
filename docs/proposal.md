# Proposal for GSoC 2026

## Rocket.Chat: Code Analyzer — Agentic Inference Context Reduction Mechanics

| | |
|---|---|
| Name | Qian Xiao |
| Nicename | Echo |
| Email | echoxiao666@gmail.com |
| Project Link | https://github.com/echo-xiao/gsoc-rocket-chat |

---

**Abstract** — Analyzing massive codebases like Rocket.Chat via iterative LLM agents causes context bloat, rapidly exceeding free-tier limits. This project builds a graph-native code navigator exposed as an MCP server for the Antigravity CLI. An offline indexer parses the full Rocket.Chat source via ts-morph, extracts a typed dependency graph (8 edge types covering Rocket.Chat-specific patterns like `callbacks.run/add` and Meteor method dispatch that break standard import analysis), and compresses function bodies into signature-only skeletons for ~4x token reduction. At query time, three composable MCP tools — `search`, `graph`, `implement` — let an LLM navigate by following real edges rather than ranking documents. An evaluation framework with 34 ground-truth test cases (collected by Rocket.Chat experts and Claude), source-verified benchmark answers, and a two-layer eval system (tool-level + agent-level) closes the loop.

---

## Table of Contents

- [0 Tiny Bit of Myself](#0-tiny-bit-of-myself)
- [1 Problem Statement](#1-problem-statement)
- [2 Rocket.Chat-Specific Complexities](#2-rocketchat-specific-complexities)
- [3 Proposed Solution](#3-proposed-solution)
- [4 Architecture](#4-architecture)
  - [4.1 Offline Indexer](#41-offline-indexer)
  - [4.2 Online MCP Reasoning](#42-online-mcp-reasoning)
  - [4.3 Offline Evaluator](#43-offline-evaluator)
- [5 Timeline](#5-timeline)
- [6 References](#6-references)

---

## 0 Tiny Bit of Myself

I am Echo, a Computer Science M.S. student at Georgia Tech with 7+ years of industry experience in Data Science and Machine Learning, including senior roles at Alibaba and iQiyi. My expertise spans production-grade ML pipelines and, more recently, advanced AI agent systems.

---

## 1 Problem Statement

### 1.1 Background

Most production codebases are large monorepos that quickly exhaust the token budget of free-tier LLM APIs when used with AI agentic tooling. The root cause is structural: LLM inference runs inside a loop where context accumulates query after query, and repositories like Rocket.Chat (4M+ lines, 55 packages) generate far more context than any session budget allows.

This project takes a different approach: instead of compressing what gets fed to the LLM, it reduces what gets fetched in the first place. A pre-built dependency graph replaces file-level retrieval with graph-aware navigation, reducing context consumption in proportion to navigation precision rather than repository size. The implementation targets the Antigravity CLI (`agy`) within Google's free-tier limits, with mechanisms designed to generalize to other large codebases.

### 1.2 Core Problem

This is a navigation problem on a dependency graph. When we open an unfamiliar codebase and ask "how does a message get sent?", we don't run a similarity search — we navigate. We find an entry point, follow a function call to the next file, notice an event registration, trace it to its handler, and build a mental map incrementally. Each step is a traversal of a dependency edge. The destination is reached by following a path, not by matching a query.

Path reasoning mirrors how humans read code. The answer to an architectural question is not located at a point in vector space — it is a path through a graph. "How does MessageBox trigger a server-side message save?" cannot be answered by any single file. The answer is a sequence: `MessageBox -> onSend -> flows/sendMessage -> sdk.call('sendMessage') -> executeSendMessage -> Messages.insertOne -> afterSaveMessage`. Each arrow is a verified dependency edge. The path itself is the answer.

Four solution families exist for path reasoning on a dependency graph:

| Approach | Mechanism | Trade-off |
|----------|-----------|-----------|
| Static graph traversal | BFS/DFS over pre-extracted edges | Fast, precise, but breaks on dynamic dispatch |
| Compiler-grade analysis | Datalog queries over compiled snapshot | Highest precision, requires heavy infrastructure |
| Dynamic tracing | Record real call stacks at runtime | 100% accurate, needs runnable environment |
| LLM ReAct loop | Model decides which edges to follow | Flexible, expensive, unpredictable token cost |

This project combines static graph traversal as the primary mechanism with targeted extensions for Rocket.Chat's dynamic patterns (string-keyed dispatch, event callbacks, pub/sub). The LLM is used mainly for navigation decisions. Static analysis and dynamic patterns handle structural reasoning; the LLM handles intent interpretation. This is the best combination that achieves both precision and token efficiency within a free-tier budget.

### 1.3 Purpose / Benefit

- **Accuracy**: all eval test cases can be passed at threshold on the full Rocket.Chat source.
- **Token assumption**: each question can be explained within the Gemini free tier.

---

## 2 Rocket.Chat-Specific Complexities

The `sendMessage` flow traces end-to-end — from the React component tree on the client, across the DDP boundary, through the server method and database write, to the post-save callback chain — exposing five connection patterns invisible to standard import graph analysis:

| Pattern | Root cause | How this analyzer handles it |
|---------|-----------|------------------------------|
| Meteor string-keyed method dispatch | `sdk.call('sendMessage')` target is a string literal — invisible to import graph | Extract `sdk.call`/`Meteor.call` string args as virtual nodes; connect via `call` edge |
| Event-driven callbacks with string event names | `callbacks.run/add('afterSaveMessage')` — emit and listen are in different files with no import between them | Extract both sides as `event_emit` / `event_listen` edges; string literal becomes a virtual node connecting them |
| Symbol name collisions across client / server / packages | `sendMessage` has 6+ definitions across the monorepo — name similarity cannot pick the right one | Import-aware disambiguation: filter candidates by which file the caller actually imports via `fileDependents` reverse graph |
| Blaze-to-React migration gaps | Blaze `.html` template names don't appear in the TypeScript import graph | Inherent dead end — documented in Constitution so the agent stops traversing instead of looping |
| Hook-based EE extension across three monorepo layers | EE modules extend core via `callbacks.add` injection, not subclassing — connection is not in the type system | `layer` parameter + reverse import graph (`fileDependents`) to scope traversal per layer |

These five patterns define the boundary of what standard static analysis can cover. The indexer handles each one explicitly.

---

## 3 Proposed Solution

This project strikes a balance between the precision of graph traversal (static + dynamic edges) and the flexibility of ReAct — using static AST extraction to establish deterministic edges, using the LLM's MCP tool calls to make navigation decisions, and using the Constitution to prevent it from wandering. The agent receives three layers of input to answer a question:

- **Constitution** (`AGENTS.md`): architecture knowledge and reasoning rules, injected as system prompt
- **Skeleton**: compressed symbol signatures and call edges from `GLOBAL_INDEX`, providing structural context
- **Symbol details**: full source implementation of specific symbols, fetched on demand via `implement`

Each failing metric is triaged to one of three problems — indexer, call graphs, or reasoning — and fixed accordingly.

---

## 4 Architecture

*See `docs/diagrams/architecture.drawio` for the full sendMessage architecture diagram.*

### 4.1 Offline Indexer

#### 4.1.1 Pipeline

The indexer runs offline and transforms raw TypeScript source into a structured, memory-resident graph that the agent can query at runtime:

*See `docs/diagrams/indexer-pipeline.drawio` for the indexer pipeline diagram.*

Key implementation details:

- **Incremental processing**: `CodebaseHasher` computes MD5 per file. Only changed files are re-parsed. A `GENERATOR_VERSION` constant triggers full rebuild when skeleton extraction logic changes; `EMBEDDING_VERSION` triggers re-embedding.
- **Skeleton compression**: function bodies are replaced with `/* Implementation Hidden */` after edge extraction, yielding ~4x token reduction while preserving all structural information.
- **Embedding**: `batchEmbedContents` with batch size 100, rate-limited at 1200ms between batches. Supports SIGINT-safe checkpointing (progress saved every 500 symbols). Vectors are truncated from 3072 to 768 dimensions for 4x storage reduction with <5% retrieval quality loss.
- **Persistence**: `LocalDatabase` serializes the in-memory index to disk (`.global_index.json` + `.embedding_cache.json`). On restart with no source changes, index loads from cache in seconds. File watcher enables hot-reload when index is rebuilt externally.

#### 4.1.2 Edge Extraction

The indexer extracts 8 typed edge kinds organized in three categories:

**Category 1 — Static edges** (import-reachable, AST-resolvable):

| Edge | Extraction | Graph connection |
|------|-----------|-----------------|
| `call` | Direct function/method call via identifier or property access | caller -> callee |
| `jsx` | `<Component />` tag name + JSX prop handlers (uppercase filter) | parent component -> child component |
| `new` | `new X()` constructor invocation | caller -> class |
| `type` | TypeScript type annotation references (e.g., `x: ChatAPI`), excluding built-in types (`Promise`, `Partial`, etc.) | usage site -> interface/type definition |

**Category 2 — String-literal edges** (dynamic dispatch, target is a hardcoded string):

| Edge | Extraction | Graph connection |
|------|-----------|-----------------|
| `event_emit` | First string arg of `callbacks.run('X')` / `.emit('X')` | caller -> virtual node 'X' |
| `event_listen` | `callbacks.add('X', handler)` / `.on('X', fn)` — extract event name + handler name. If handler is an inline function, extracts event name only | virtual node 'X' -> handler (or file) |
| `pubsub_publish` | First string arg of `Meteor.publish('X', fn)` | virtual node 'X' -> publish file |
| `pubsub_subscribe` | First string arg of `Meteor.subscribe('X')` | subscriber -> virtual node 'X' |

Cross-boundary dispatch uses two mechanisms:
- **`sdk.call('X')` / `Meteor.call('X')`** — extracted as a `call` edge to the virtual node `'X'`
- **`Meteor.methods({ X: fn })`** — object literal keys extracted as `call` edges, creating the server-side virtual node that connects to the client-side `sdk.call('X')`

**Virtual node mechanism:**

```
Emit/call side                    Virtual node              Listen/handler side
-----------------------------     ---------------           ---------------------------
callbacks.run('afterSaveMessage') -> 'afterSaveMessage' <- callbacks.add('afterSaveMessage', handler)
sdk.call('sendMessage')           -> 'sendMessage'      <- Meteor.methods({ sendMessage: fn })
Meteor.subscribe('roomMessages')  -> 'roomMessages'     <- Meteor.publish('roomMessages', fn)
```

**Category 3 — React inner edges** (handlers inside function bodies, require unwrap):

These edges cannot be extracted after body removal. `extractInnerFunctions` runs before `setBodyText('/* Implementation Hidden */')`, targeting `on[A-Z]` / `handle[A-Z]` arrow functions inside React components. Hook wrappers (`useCallback`, `useMemo`, `useEffectEvent`) are automatically unwrapped to reach the actual function body.

| Edge | Extraction | Graph connection |
|------|-----------|-----------------|
| `call` (inner) | Named arrow functions matching `on[A-Z]` / `handle[A-Z]` pattern | Registered as `OuterComponent.onXxx` qualified symbol with its own call edges |

---

### 4.2 Online MCP Reasoning

#### 4.2.1 Pipeline

At query time, a Gemini LLM agent receives two inputs: a Constitution (`AGENTS.md`, auto-loaded by Antigravity CLI as system prompt) and access to three MCP tools:

*See `docs/diagrams/mcp-reasoning.drawio` for the MCP reasoning diagram.*

- **`search(query, layer?)`** — Entry point for every query. Locates a symbol via exact -> prefix -> fuzzy match (via fuzzysort), reranked by semantic embedding similarity (0.4 x fuzzy + 0.6 x cosine). Also searches file paths by substring and string-dispatch patterns like `sdk.call('X')` via full-text grep. Supports `client`/`server`/`packages`/`ee` layer filter.

- **`graph(query, direction, depth?, edgeTypes?, question?)`** — Traverses the call graph from a known symbol. `direction='up'` traces callers upstream (for impact analysis); `direction='down'` traces callees downstream (for flow tracing). `mode='impact'` provides BFS layer-by-layer blast-radius view. Filters by layer and edge type. When `question` is provided, applies **semantic pruning**: edges are scored by cosine similarity between their embedding and the question embedding, edges below 0.1 are dropped, and results are ranked by relevance. Import-aware scoping via `fileDependents` prevents same-name symbols in unrelated files from polluting traversal.

- **`implement(symbolName, filename)`** — Reads the full source implementation of a specific symbol (via ts-morph re-parse of the original file) plus up to 5 callee skeletons for downstream context. `filename` is required to disambiguate. This is the most expensive tool in token cost.

#### 4.2.2 Constitution

The Constitution (`AGENTS.md`) is architectural knowledge encoded as navigation rules, injected into the LLM's system prompt at startup.

The core problem it solves: even with a correct dependency graph and precise tools, an LLM agent can still fail by choosing the wrong entry point, following the wrong edge type, or not knowing when to stop. These are not retrieval failures — they are navigation failures. The Constitution encodes the knowledge that prevents them.

It contains four types of rules:

1. **Tool usage constraints** — hard limits that prevent over-exploration. `implement` should not be called before `graph` except for Locate and Pattern questions.

2. **Entry points** — which symbol to start from for each subsystem (10 subsystems documented). Without this, an agent searching for `sendMessage` gets 6+ results and picks the wrong one.

3. **Question type -> tool strategy** — 5 question types with distinct tool sequences (Section 4.2.3).

4. **Dynamic pattern rules** — tell the agent how to cross boundaries invisible to the graph: DDP dispatch, callbacks, pub/sub, `proxify()` service bus, and message rendering pipeline. Each rule corresponds to a virtual node established by the indexer (Section 4.1.2).

5. **Dead-end recognition** — where to stop rather than loop. Blaze templates have no TypeScript import representation. The message rendering pipeline is a data transformation, not a call chain. Fuselage component internals are irrelevant to business logic questions.

Every rule is falsifiable. The evaluator's file hit rate and tool call count metrics expose which rules fail in practice. This makes the Constitution a living document updated by measured failures.

#### 4.2.3 Question Types -> Tool Strategy

Not all codebase questions have the same shape. A question like "where is the rate limiter configured?" requires a single lookup; a question like "how does a message flow from the client to the database?" requires multi-hop traversal across four files. Using the same tool strategy for both wastes tokens on the first and misses steps on the second.

This analyzer classifies questions into five types, each with a distinct tool strategy:

| Type | Example | Strategy |
|------|---------|---------|
| Architecture | "How does message sending work end-to-end?" | Check Architecture section -> `search(entry)` -> `graph(down)` |
| Locate | "Where is the rate limiter configured?" | `search(keyword)` -> `implement` top result |
| Pattern | "How do I register a new REST endpoint?" | `search` existing instance -> `implement` — skip `graph` |
| Routing | "How does a DDP method call reach its handler?" | Check Architecture section -> `search(dispatcher)` -> `graph(down, edgeTypes=[...])` |
| Impact | "What breaks if I change sendMessage?" | `search(target)` -> `graph(up)` -> `implement` top callers |

`implement()` is the most expensive tool — it reads full source and consumes the most tokens. The strategy table encodes when to call it and when to skip it. For Architecture and Routing questions, `implement` is called only at layer boundaries (e.g., where `sdk.call()` crosses to the server). For Locate and Pattern questions, the graph is skipped entirely. This keeps the average tool call count within the <= 10 threshold measured by the evaluator.

---

### 4.3 Two-Layer Evaluation

The evaluator answers one question: **can the agent give a correct answer?** But when the answer is wrong, you need to know _why_ — is it the tool's fault (returned wrong files) or the LLM's fault (chose wrong tools)? A single end-to-end test cannot distinguish between the two. This motivates a two-layer evaluation design.

*See `docs/diagrams/evaluator.drawio` for the two-layer evaluator diagram.*

**Ground truth**: 34 test cases in `testcases.json`, each defining three layers of expected output:
- `groundTruthFiles` — which files should be retrieved
- `groundTruthPath` — expected traversal order (file + symbol at each step)
- `keySymbols` — symbols that must appear in the final answer

Test cases are sourced from Rocket.Chat Guided Tours (7) and Claude-generated questions (27), covering 20 subsystems across 6 question types (architecture, call-chain, pattern, locate, routing, impact).

#### 4.3.1 Layer 1 — Tool Eval (Deterministic, Zero-Cost)

Tests whether the indexer and tools _can_ return the correct information, assuming perfect navigation decisions. No LLM is involved.

For each test case, the runner programmatically calls the MCP tools (`search`, `graph`, `implement`) with the ground-truth entry points and checks whether the results contain the expected files and symbols:

```
For each testcase:
  search(keySymbols[0]) -> does the result contain groundTruthFiles?
  graph(entrySymbol, down) -> does the traversal reach keySymbols?
  implement(symbol, file) -> does it return the correct source?
```

**Metrics**:

| Metric | Threshold | What it catches |
|--------|-----------|----------------|
| File recall | >= 95% | Index missing files — traces to edge extraction gaps |
| Symbol recall | 100% | Symbol not reachable via tools — traces to missing graph edges |
| Path reachability | all hops connected | Graph cannot traverse the expected path — traces to virtual node gaps |

**Properties**: deterministic (same index = same result), zero API cost, runs in seconds, CI-integrable (can run on every push to catch regressions).

#### 4.3.2 Layer 2 — Agent Eval (End-to-End, LLM-Dependent)

Tests the full pipeline: LLM reads the Constitution, decides which tools to call, and composes an answer. This is the end-to-end accuracy that Rocket.Chat mentors care about.

`session-recorder.ts` captures the full agent session via the `script` command — every tool call, its arguments, its result, and every line of LLM output. `evaluator.ts` parses the cleaned log, matches each turn to its testcase, and scores it.

**Metrics**:

| Metric | Threshold | What it catches |
|--------|-----------|----------------|
| File hit rate | >= 95% | Wrong files retrieved — could be tool or LLM fault |
| Symbol coverage | 100% | Key symbol missing from answer — could be tool or LLM fault |
| Tool call count | <= 10 | Agent taking too many steps — traces to Constitution gaps |
| Implement share | <= 30% | Over-relying on full source reads — traces to Constitution gaps |

**Properties**: non-deterministic (LLM may choose different paths), costs Gemini free-tier quota, slower.

#### 4.3.3 Fault Isolation

The two layers together enable fault isolation:

| Layer 1 result | Layer 2 result | Diagnosis |
|----------------|----------------|-----------|
| Pass | Pass | Everything works |
| **Fail** | Fail | **Tool/index bug** — fix indexer or graph edges |
| Pass | **Fail** | **LLM navigation bug** — fix Constitution or AGENTS.md |
| Fail | Pass | Lucky path — LLM found an alternative route, but index still has a gap |

This separation is critical: without Layer 1, every failure requires manual inspection of session logs to determine root cause. With Layer 1, index bugs are caught deterministically before any LLM is involved.

#### 4.3.4 Feedback Loop

Each failing metric points to a root cause in one of three modules — indexer, retrieval logic, or Constitution rules. The evaluator provides the signal; human diagnosis decides the fix. This creates a data-driven iteration loop:

```
Layer 1 (tool eval) -> fix index/graph gaps -> rebuild -> re-run Layer 1
Layer 2 (agent eval) -> fix Constitution rules -> re-run Layer 2
```

---

## 5 Timeline

| Milestone | Start | End | Tasks |
|-----------|-------|-----|-------|
| Community Bonding | - | Sun, 24 May | Meet mentor; review codebase; finalize scope; collect questions |
| Index Robustness | Mon, 25 May | Sun, 31 May | Add `meteor_method` edge extraction for `Meteor.methods({...})`; verify DDP client->server path connects via virtual node; build Layer 1 (tool eval) runner and run 34-case baseline |
| | Mon, 1 June | Sun, 7 June | Handle decorator-wrapped methods (`@ServiceClass`); resolve re-export chains in `packages/core-services` |
| | Mon, 8 June | Sun, 14 June | Fix remaining extraction gaps from Layer 1 eval results; measure file recall and symbol recall before/after; document coverage |
| Graph Quality | Mon, 15 June | Sun, 21 June | Harden BFS cycle detection with visited-set tracking; model `proxify()` as explicit `service_call` edge pointing to ServiceClass |
| | Mon, 22 June | Sun, 28 June | Add Meteor.methods string dispatch as explicit graph edge; verify full DDP path end-to-end; Layer 1 eval all green |
| | Mon, 29 June | Sun, 5 July | **Midterm eval**; run Layer 2 (agent eval) on all 34 cases; measure file hit rate, symbol coverage, tool call count; write midterm report with fault isolation analysis |
| Comparative Evaluation | Mon, 6 July | Sun, 12 July | Add Claude baseline mode to evaluator; run Rocket.Chat questions against Claude without MCP tools |
| | Mon, 13 July | Sun, 19 July | Add `claudeBaseline` fields to `testcases.json`; implement side-by-side comparison report (Layer 2 with MCP vs baseline without MCP) |
| | Mon, 20 July | Sun, 26 July | Analyze results: token cost, file hit rate, symbol collision handling — MCP navigator vs baseline; use fault isolation table to attribute failures |
| Packaging + Final | Mon, 27 July | Sun, 2 Aug | Setup script for first-run index build; document MCP config for Antigravity CLI and Claude Desktop; integrate Layer 1 eval into CI |
| | Mon, 3 Aug | Sun, 9 Aug | Fix remaining Layer 2 failures by updating Constitution; final tuning pass on all 34 cases |
| | Mon, 10 Aug | Sun, 16 Aug | Final eval run (both layers) across all cases; write GSoC final report; submit PR |

---

## 6 References

- Vasilopoulos, A. (2026). *Codified Context: Infrastructure for AI Agents in a Complex Codebase*. arXiv preprint arXiv:2602.20478.
- Gloaguen, T., Mundler, N., Muller, M., Raychev, V., & Vechev, M. (2026). *Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?* arXiv preprint arXiv:2602.11988.
