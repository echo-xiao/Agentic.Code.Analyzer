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
  → embedder.ts    Gemini API: symbol → float32[768]
  → GLOBAL_INDEX   symbols · callGraph · fileDependents · embeddings
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
export GEMINI_API_KEY=your_key
npm start
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
| `search(query, layer?, question?)` | Fuzzy symbol search reranked by embedding similarity (0.4 × fuzzy + 0.6 × cosine). Supports `client`/`server` layer filter. |
| `graph(symbol, direction, depth?, edgeTypes?, question?)` | BFS downstream or upstream. When `question` is provided, applies semantic pruning — edges with cosine similarity < 0.1 are dropped. |
| `implement(symbol, filename)` | Full source + up to 5 callee skeletons. Capped at 3 calls per question. |

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
    embedder.ts       Gemini embedding API
    state.ts          GLOBAL_INDEX type definitions
    local-db.ts       index persistence to disk
  eval/             evaluation framework
    session-recorder.ts   record agy sessions (tool calls + AI output)
    evaluator.ts          score sessions against 5 metrics
    testcases.json        ground truth: questions + expected files/symbols
    claude_answers.md     Claude baseline (for comparison)
  config.ts         paths and constants
AGENTS.md           navigation rules (auto-loaded by agy)
.agents/            workspace MCP config (auto-loaded by agy)
```
