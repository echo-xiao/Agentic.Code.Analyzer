# Rocket.Chat Code Analyzer

Agentic code analyzer for the Rocket.Chat monorepo. Answers codebase questions (locate,
mechanism, cross-cutting) with a **fixed 2-LLM-call pipeline** designed to run a full benchmark
inside the Gemini free tier: request count is the scarce resource, so no per-hop agent loop.

## Pipeline (per question)

1. **Outline routing** (LLM call 1): question + wiki outline -> relevant sections, chain grouping.
2. **Entry retrieval** (no LLM): section source-file lists + full-repo lexical channel -> RRF-ranked
   seed symbols, grouped into chains.
3. **Skeleton expansion** (no LLM): static call-graph expansion into per-chain skeletons -- major
   nodes (short ID + signature + call-site line) and pass-through nodes; high-fan-in nodes stay
   leaves; chains cut at subsystem boundaries with cross-references.
4. **Targeted reading** (no LLM): every major node's body read by line range, chain roots first,
   then the rest by chain RRF mass, into a per-chain token budget.
5. **Answer generation** (LLM call 2): one shot over the full skeleton text plus the read bodies,
   organized per chain, every claim cited as `file:line`.

There is no path-SELECTION call. It existed until 2026-08-06 and measured inert: the deterministic
backfill re-added every major node the LLM had skipped, so the answer prompt was identical whether
the model checked 1 node or 14. The skeleton text now goes into the answer prompt instead, so the
model can narrate the whole path -- including pass-through and boundary nodes that have no body.

Full design: `docs/superpowers/specs/2026-08-04-rocketchat-qa-pipeline-design.md` (local, untracked).

## What's here now

- `src/indexer/` — offline ts-morph syntax-level indexer. Extracts symbol definitions, call sites,
  and 12 edge types including the string-dispatch edges no parser resolves natively
  (`Meteor.call` ↔ `Meteor.methods`, REST route registration ↔ handler, `callbacks.run` ↔
  `callbacks.add`, streamer def ↔ sub, pubsub). Cache lives in `output.nosync/` (regenerable).
- `src/engine/` — what the pipeline still uses from the retired graph-navigation engine:
  line-range source reading (`source.ts`) and the repo-relative path helper (`common.ts`).
  Lexical seeding, neighbourhood expansion, and callers/callees traversal were removed once the
  skeleton-first pipeline stopped calling them; they live in git history.
- `src/eval/` — the 34-question benchmark (`utils/testcases.json`), ground-truth tooling
  (`truth.ts`), shared eval utilities. `logs/` keeps the previous architecture's benchmark answers
  as baselines.
- The pipeline itself (routing, skeleton expansion, path selection, generation, report) is being
  built on top of these — see the design doc.

## Commands

```bash
npm run prewarm   # build/refresh the ts-morph index cache (needs ../Rocket.Chat or $ROCKET_CHAT_SRC)
npm run truth     # maintain benchmark ground truth (needs ANTHROPIC_API_KEY)
npm test          # unit tests
```

## History

Earlier iterations (an MCP server with a multi-turn agent self-loop, local-embedding semantic
walk, and a self-generated wiki site deployed to Vercel) were removed on 2026-08-05 after the
skeleton-first design superseded them; they live in git history. Their final benchmark standing
(Gemini + MCP self-loop, 34 cases): PASS 13 / PARTIAL 19 / FAIL 2.
