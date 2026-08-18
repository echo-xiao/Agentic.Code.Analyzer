# Rocket.Chat Code Analyzer

Agentic code analyzer for the Rocket.Chat monorepo. Answers codebase questions (locate,
mechanism, cross-cutting) with a **fixed 3-LLM-call pipeline** designed to run a full benchmark
inside the Gemini free tier: request count is the scarce resource, so no per-hop agent loop.

## Pipeline (per question)

1. **Outline routing** (LLM call 1, `routing.ts`): question + 294 wiki subsections -> relevant
   subsections, grouped into chains by topic. The one place natural language is mapped onto
   repository structure.
2. **Entry retrieval** (no LLM, `entry.ts`): subsection source-file lists + a full-repo lexical
   channel, fused with RRF -> each chain's seed symbols.
3. **Skeleton expansion** (no LLM, `candidates.ts` + `skeleton-defs.ts`): definition-graph
   expansion into per-chain skeletons -- major nodes (short ID + signature + call-site line) and
   pass-through nodes; high-fan-in nodes stay leaves; chains cut at subsystem boundaries with
   cross-references. Pure in-memory graph work, ~3s for all 34 questions.
4. **Chain selection** (LLM call 2, `select.ts`): given every chain's skeleton, decide which chains
   are worth reading in full. The granularity is the chain, not the node: a chain header carries
   three reliable signals (page, subsection, seed symbol), while node names alone mislead.
5. **Targeted reading** (no LLM, `reading.ts`): every major node's body in a kept chain read by
   line range, round-robin across chains with roots first, into a token budget (24,000 by default).
6. **Answer generation** (LLM call 3, `answer.ts`): one shot over the kept skeleton text plus the
   read bodies. The skeleton goes into the prompt too, so the model can narrate pass-through,
   boundary and dispatch nodes that have no body to read.

Selection operates on chains because the node-level version did not work. A path-selection call
over individual nodes existed until 2026-08-06 and measured inert: the deterministic backfill
re-added every major node the LLM had skipped, so the answer prompt was identical whether the model
checked 1 node or 14.

Full design: `docs/superpowers/specs/2026-08-04-rocketchat-qa-pipeline-design.md` and
`2026-08-13-binding-resolution-design.md` (local, untracked).

## What's here now

- `src/indexer/` — offline ts-morph indexer. Every reference is resolved to a declaration by the
  type checker, never guessed by name: a declaration inside the target repo is a project binding,
  one in `lib.*.d.ts` or under `node_modules` produces no edge, and anything the checker cannot
  resolve is recorded as unbound rather than invented. Eight edge kinds (`call`, `new`, `jsx`,
  `type`, `registers`, `dispatches`, `handles`, `implements`), which include the string-dispatch
  edges no parser resolves natively. Those are declared as six communication trunks -- callbacks,
  service events, REST, streamer, `api.call`, Meteor methods -- each matched by *declaration*
  rather than call-site text (`src/indexer/idioms.ts`). Cache lives in `output.nosync/`
  (regenerable).
- `src/deepwiki/` — the knowledge layer. DeepWiki's outline is fetched and cached to `data/`, then
  split into 294 subsections, each carrying the source files cited under it; routing runs against
  these. `ask.ts` also fetches DeepWiki's own answer for a question, recorded next to ours in every
  benchmark report as the comparison baseline.
- `src/engine/` — what the pipeline still uses from the retired graph-navigation engine:
  line-range source reading and the repo-relative path helper.
- `src/eval/` — the 34-question benchmark (`utils/testcases.json`), ground-truth tooling
  (`truth.ts`), shared eval utilities. `logs/` keeps the previous architecture's benchmark answers
  as baselines.
- `src/pipeline/` — the pipeline above. `run.ts` holds `runQuestion()` and nothing else; the
  benchmark loop lives in `cli.ts`, so a second entry can import the pipeline without starting a
  34-question run.
- `src/mcp/` — a stdio MCP server exposing one tool, `ask_codebase(question)`, over the same
  `runQuestion()` the benchmark runs. Three Gemini requests per call, serialised with the
  benchmark's own 6s spacing so a host emitting several tool calls at once cannot blow the
  free-tier RPM. Since the answer prompt imposes no citation format, the tool result ships a
  node-to-source mapping built from the run trace, so every reference in the answer resolves to
  `file:line-line`. No DeepWiki baseline on this path and no run report written.
- `tools/agy-plugin/` — an Antigravity CLI (`agy`) plugin that registers the MCP server and denies
  every built-in tool inside this workspace. See below.

## Commands

```bash
npm run prewarm   # build/refresh the ts-morph index cache (needs ../Rocket.Chat or $ROCKET_CHAT_SRC)
npm run ask       # run the pipeline over the benchmark, writing a report to runs/
npm run mcp       # serve the pipeline over stdio as an MCP tool (`ask_codebase`)
npm run truth     # maintain benchmark ground truth (needs ANTHROPIC_API_KEY)
npm test          # unit tests
```

## Using it from an MCP host

`.mcp.json` in the repo root registers the server for hosts that read it. To drive the server
directly, with no model in between, speak JSON-RPC to it:

```bash
printf '%s\n%s\n%s\n' \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"cli","version":"0"}}}' \
  '{"jsonrpc":"2.0","method":"notifications/initialized"}' \
  '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"ask_codebase","arguments":{"question":"How do push notifications work in Rocket.Chat?"}}}' \
  | npm run --silent mcp 2>/dev/null \
  | python3 -c "import sys,json; [print(json.loads(l)['result']['content'][0]['text']) for l in sys.stdin if l.strip() and json.loads(l).get('id')==2]"
```

This is the form to use for a demo or an acceptance check: the output is the tool's own bytes,
including the node-to-source mapping, with nothing rewritten by a host model.

### Antigravity CLI (`agy`)

A host with its own file tools will answer from `grep` instead of calling the analyzer — and in
this repository it can reach `logs/answers-claude/`, the benchmark's ground-truth answers. The
plugin under `tools/agy-plugin/` closes both paths:

```bash
./tools/agy-plugin/install.sh   # fills in absolute paths, then `agy plugin install`
```

It registers the MCP server and a `PreToolUse` hook that denies every built-in tool while the
workspace is this repository, so an answer has to come from `ask_codebase`. Reads of agy's own
scratch directory stay allowed — that is where it spills a large tool result before reading it
back. Outside this repository the hook allows everything.

Restart `agy` after installing. Notes worth keeping if you adapt this for another host: agy loads
hooks only from a plugin's `hooks.json` (not from `settings.json`), the event is `PreToolUse`, and
a hook response must carry an explicit `decision` field — an empty object reads as a denial.

## Standing

Scored by hand over the 34-case benchmark. DeepWiki answers the same questions and is recorded in
every run report, so the comparison is against a run, not a remembered number.

| | CORRECT | PARTIAL | INCORRECT |
|---|---|---|---|
| DeepWiki (baseline) | 20 | 14 | 0 |
| This system (`runs/2026-08-14-report-v38.en.md`) | 17 | 13 | 4 |

## History

Earlier iterations (an MCP server with a multi-turn agent self-loop, local-embedding semantic
walk, and a self-generated wiki site deployed to Vercel) were removed on 2026-08-05 after the
skeleton-first design superseded them; they live in git history. Their final benchmark standing
(Gemini + MCP self-loop, 34 cases): PASS 13 / PARTIAL 19 / FAIL 2.
