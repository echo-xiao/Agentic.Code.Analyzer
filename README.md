# Agentic Code Analyzer

GSoC 2026 — graph-native code navigation for Rocket.Chat's 4M+ line monorepo.

**[GSoC Proposal](https://docs.google.com/document/d/19hv5TVLv8ArlPvlQVP7VDv7AdGoZqzgmHHSy6p1RgvY/edit?usp=sharing)**

## Problem

LLM agents analyzing large codebases accumulate context query after query, quickly exhausting free-tier token budgets. The root cause: code exploration is treated as a **retrieval problem** (rank documents by similarity), but it is actually a **navigation problem** (follow dependency edges from an entry point).

Rocket.Chat compounds this with five patterns invisible to standard import analysis:

| Pattern | Why standard analysis fails |
|---------|----------------------------|
| Meteor string-keyed method dispatch | `sdk.call('sendMessage')` target is a string literal |
| Event-driven callbacks | `callbacks.run/add('afterSaveMessage')` — no import between emit and handler |
| Symbol name collisions | `sendMessage` has 6+ definitions across client / server / packages |
| Blaze-to-React migration gaps | `.html` template names don't appear in TypeScript imports |
| Hook-based EE extensions | EE modules extend core via `callbacks.add`, not subclassing |

## Solution

An offline indexer builds a typed dependency graph (11 edge kinds). Three MCP tools expose it to any MCP-compatible client. A Constitution (`AGENTS.md`) encodes architecture knowledge as navigation rules. An evaluator closes the loop.

```
Source (.ts/.tsx)
  → hasher.ts      incremental MD5, skip unchanged
  → skeleton.ts    AST parse: signatures + 11 typed edges
  → GLOBAL_INDEX   symbols · callGraph · fileDependents
        ↓
  AGENTS.md (navigation rules) + MCP tools → LLM
        ↓
  Evaluator (5 metrics) → eval report → targeted fix → repeat
```

## Setup

```bash
# Clone both repos side by side
git clone https://github.com/RocketChat/Agentic.Code.Analyzer.git
git clone https://github.com/RocketChat/Rocket.Chat.git

cd Agentic.Code.Analyzer
npm install
npm start

# For eval scripts only:
export GEMINI_API_KEY=your_key
npm run eval:agent
```

The analyzer expects `Rocket.Chat` as a sibling directory by default. To use a different path:
```bash
export ROCKET_CHAT_SRC=/path/to/Rocket.Chat
npm start
```

## Usage with Antigravity CLI (agy)

Install agy:
```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

The project includes `.agents/mcp_config.json` — agy picks it up automatically:
```bash
cd Agentic.Code.Analyzer
agy
```

Then ask questions directly:
```
> How does message sending work end-to-end?
> Where is the rate limiter configured?
> What breaks if I change sendMessage?
```

Quick non-interactive test:
```bash
agy -p "Use the search tool to find sendMessage in the server layer"
```

### Other MCP Clients (Claude Desktop, Cursor, etc.)

This is a standard MCP server. Add to your client's MCP config:
```json
{
  "mcpServers": {
    "rocket-ast-analyzer": {
      "command": "npx",
      "args": ["tsx", "/path/to/Agentic.Code.Analyzer/src/server/index.ts"]
    }
  }
}
```

## MCP Tools

| Tool | Description |
|------|-------------|
| `search(query, layer?)` | Fuzzy symbol search with path-aware scoring. Supports `client`/`server` layer filter. |
| `graph(query, direction?, depth?, layer?, mode?, edgeTypes?)` | BFS upstream or downstream traversal. `mode=impact` shows blast radius layer-by-layer. |
| `implement(symbolName, filename)` | Full source + up to 5 callee skeletons. |

## Question types → tool strategy

| Type | Example | Strategy |
|------|---------|---------|
| Architecture | "How does message sending work end-to-end?" | `search(entry)` → `graph(down)` |
| Locate | "Where is the rate limiter configured?" | `search(keyword)` → `implement` |
| Pattern | "How do I register a new REST endpoint?" | `search` existing instance → `implement` |
| Routing | "How does a DDP method call reach its handler?" | `search(dispatcher)` → `graph(down, edgeTypes=[...])` |
| Impact | "What breaks if I change sendMessage?" | `search(target)` → `graph(up)` → `implement` top callers |

## Evaluator metrics

| Metric | Threshold | What it catches |
|--------|-----------|----------------|
| File hit rate | ≥ 95% | Wrong files retrieved |
| Symbol coverage | 100% | Key symbol missing from answer |
| Retrieval order | ≥ 80% | Entry point found too late |
| Tool call count | ≤ 10 | Agent taking too many steps |
| Implement share | ≤ 30% | Over-relying on full source reads |

## The retrieval funnel

Getting a core file to appear **correctly in the answer** is one continuous funnel. Every stage divides by the **same** set of must-find (core) files, so reach only ever shrinks. `npm run refresh` regenerates this view into `logs/report.md`; the numbers below are one representative run (117 core files across 32 testcases, 2 infra failures excluded).

```
INDEX (floor)
  indexed & graph-reachable    100%  ██████████████████████████████
RETRIEVAL — how deep core ranks in one search query
  ranked in top-5               34%  ██████████░░░░░░░░░░░░░░░░░░░░
  ranked in top-10              43%  █████████████░░░░░░░░░░░░░░░░░
  ranked in top-20              53%  ████████████████░░░░░░░░░░░░░░
  ranked in top-50 (ceiling)    56%  █████████████████░░░░░░░░░░░░░  ← 44% never rank (recall-miss)
AGENT
  surfaced by agent's loop      49%  ███████████████░░░░░░░░░░░░░░░  ← gather 86% of ceiling
  written into the answer       38%  ███████████░░░░░░░░░░░░░░░░░░░  ← synth 77% of surfaced, drops 17
```

Each stage carries both **cumulative reach** and its **conditional pass-rate** (gather = surfaced ÷ ceiling; synth = written ÷ surfaced). Sized by files lost:

| leak | size | files | fix |
|------|-----:|------:|-----|
| **never rank (recall-miss)** | **44%** | 51 | absent even from a single query's top-50 → matching / graph-reach (**re-rank can't help**) |
| ranked-but-not-gathered | 8% | 9 | in top-50 but the agent never surfaces it → re-rank + agent digs deeper / walks the graph |
| surfaced-but-not-written (synthesis) | 11% | 17 | in the tool output but never cited → citation prompt |

The biggest hole is **upstream**: nearly half the core files never rank in top-50 — a matching/graph-reach problem re-ranking cannot fix. The agent's *gather* is actually strong (86% of what's rankable), so it is **not** the bottleneck; *synthesis* then drops another 17. Ranking depth (top-5..50) is a diagnostic zoom on the retrieval leak; chain-order LCS (79%) is a separate quality axis, not a funnel stage. The seen-log under-counts retrieval, so 49% surfaced is a lower bound.

### Per-gate analysis

| Gate | What it is | Health | Fix when it leaks |
|------|-----------|--------|-------------------|
| **0 Index / graph** | file, symbol, call-edge exist in the system (a floor, not a score) | ✅ ~100% — not the bottleneck | rebuild the indexer |
| **1a Matching** | core file ranks anywhere in top-50 (`recall-miss` ×11) | ⚠ **biggest leak — 44% (51 files) never rank** | query expansion, synonyms, split camelCase, symbol-aware matching, **graph-reach seeding** |
| **1b Ranking** | core file in top-50 but ranked > 5 (`ranked-low` ×5) | ⚠ ranked too low | re-rank (graph centrality, core-file heuristics, cross-encoder) |
| **1.5 Graph order** | call chain emitted in causal order (LCS 78.7%) | ✅ good — 1 failure (`#33` client/server flipped) | fix edge direction / traversal |
| **2 Agent gather** | agent's tool loop surfaces what's rankable (86% of ceiling) | ✅ strong — **not** the bottleneck | (only 9 files lost here; low priority) |
| **3 Synthesis** | surfaced core actually written (77%, 17 dropped) | 🟡 cheapest fix | prompt: every core file seen on the path must be cited by name |

### Optimization backlog (ordered by leverage)

1. **Matching / graph-reach (gate 1a) — biggest lever, 51 files**: nearly half the core never ranks in top-50. Symbol-aware matching, query expansion, and seeding retrieval from graph neighbors so string-dispatch / callback targets become findable at all. Re-ranking can't help here.
2. **Synthesis prompt (gate 3) — cheapest, ~17 files**: make "if you saw it, cite it" a hard constraint in the answer-composition prompt.
3. **Re-rank (gate 1b) — residual, 9 files**: files that rank in top-50 but the agent never surfaces → graph-centrality re-ranking + let the agent dig past top-10.

## Metric dictionary — what each eval measures

Read it as a relay: **eval-2** covers the front half (gates 0/1/1.5, retrieval + ranking), **eval-3** covers the back half (gates 2/3, agent gather + synthesis), **eval-1** covers end-to-end + attribution (is the graph worth the tokens).

| Metric | Eval | What it judges | Gate | Current |
|--------|------|----------------|------|--------:|
| File / Symbol recall (substring) | eval-2 | can the raw material be found at all | 0 index | 99.5% / 100% |
| Graph reachability | eval-2 | is the target reachable in the graph | 0 index | 100% |
| Sanity gate | eval-2 | gate-0 floor | 0 index | 33/34 |
| Recall@5 / @10 / @20 | eval-2 | how deep before core is found (recall) | 1 retrieve+rank | 42 / 49 / 58% |
| Precision@5 | eval-2 | noise in the top 5 | 1 retrieve+rank | 27.6% |
| MRR | eval-2 | how high the first core file ranks | 1 retrieve+rank | 0.268 |
| F1@5 | eval-2 | precision + recall combined | 1 retrieve+rank | 31.5% |
| Retrieval gate (R@10 ≥ 0.3) | eval-2 | does gate 1 pass | 1 retrieve+rank | 25/34 |
| Diagnosis (recall-miss / ranked-low) | eval-2 | is gate 1 broken at matching or ranking | 1a / 1b | 11 / 5 |
| Chain-order LCS (+ gate) | eval-2 | is the call chain in causal order | 1.5 graph order | 78.7%, 16/17 |
| Recall@50 (ceiling) | eval-2 | how many core rank anywhere in top-50 (re-rank ceiling) | 1 retrieve+rank | 56% (pooled) |
| **retrieval-recall** | eval-3 | did the agent's tool loop surface core | **2 gather** | 49% (86% of ceiling) |
| **synthesis-recall** | eval-3 | did it write what it surfaced | **3 synthesis** | 77% |
| droppedBySynth | eval-3 | core files surfaced but not written | 3 synthesis | 17 |
| core cov (gate) | eval-3 | end-to-end: core written into answer | 3 output | ~38% (44/117) |
| Avg coverage (MCP) | eval-1 | end-to-end, files ∪ key symbols | 3 output | 38.1% |
| Hard vs Claude | eval-3 | measured against Claude's full citation list (strict) | 3 output | 23% |
| manual verdict | eval-3 | semantic truth ("right mechanism, different files") | 3 output | sole verdict |
| MCP − naive | eval-1 | is the lift the graph or just more tokens | attribution | +17.4 pts |
| Avg tokens / questions improved | eval-1 | cost / win count | cross-cutting | 3.3k→33.7k / 22-34 |

> The end-to-end numbers (35% / 38.1% / 23%) all describe the **output** of the same funnel measured against different denominators (core spine, core ∪ symbols, Claude's full list). They agree once you account for the denominator — they are not conflicting scores.

## Project structure

```
src/
  server/           MCP server layer
    index.ts          entry point — builds index, starts MCP server
    registry.ts       tool definitions + handlers
    retriever.ts      search / getContext / getImplementation
  indexer/          offline indexer
    index.ts          scan, prewarm, build GLOBAL_INDEX
    skeleton.ts       AST parse → signatures + 11 edge types
    hasher.ts         incremental MD5 change detection
    state.ts          GLOBAL_INDEX type definitions
    local-db.ts       index persistence to disk
  eval/             evaluation framework
    layer0-baseline-eval.ts  Layer 0: Gemini without tools (control group)
    layer1-tool-eval.ts      Layer 1: deterministic tool recall/reachability
    layer2-agent-eval.ts     Layer 2: Gemini + tools end-to-end scoring
    testcases.json           ground truth: questions + expected files/symbols
  config.ts         paths and constants
AGENTS.md           navigation rules (auto-loaded by agy)
.agents/            workspace MCP config (auto-loaded by agy)
```
