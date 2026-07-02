# Unified report — verdicts · token · funnel · attribution

7/1/2026, 11:20:58 PM | 34 testcases | joined from tools/token sidecars + answers + verdicts.md (deterministic)

## 1. Headline — semantic verdicts (manual, verdicts.md)

**PASS 22 / PARTIAL 9 / FAIL 3** (34/34 judged)

## 2. Token efficiency — is the graph worth its tokens? (token)

| | no-MCP | naive @ same answer size | with MCP |
|---|---:|---:|---:|
| Avg coverage | 14% | 12% | 45% |
| Avg tokens / question | 5,013 | ~23,135 | 23,135 |

## 3. Agent behavior diagnosis — agent-fault vs engine-fault

**22/34 PASS · of the 12 non-PASS: 10 agent-fault (fix prompt/plan/loop) · 2 engine-fault (fix ranking).**

| failure mode | fault | # | testcases | fix-lever |
|---|---|---:|---|---|
| no-pivot | agent | 5 | new-09-realtime-streamer, tour-05-msg-server, new-16-impact-streamer, new-10-apps-engine, new-21-impact-settings | graph expand/down/up depth+direction |
| engine-unrankable | engine | 2 | tour-04-msg-client, new-25-search | ENGINE: retrieval ranking (not agent) |
| wrong-subsystem | agent | 2 | new-27-video-conference, tour-07-db-model-create | plan strategy / architecture.json hint |
| sloppy-source | agent | 1 | claude-05-call-chain | gen prompt (cite real load-bearing files) |
| gave-up | agent | 1 | tour-08-db-model-use | gen prompt (don't stop early) |
| dropped-synth | agent | 1 | tour-10-new-service | gen prompt (write what you saw) |

## 4. The funnel — one path, every stage ÷ the same 124 core files

> Per-FILE pooled fractions (of all 124 core files, how many survive each stage) — NOT tools' per-testcase mean R@k. Absolute numbers differ: the funnel weights bigger-spine testcases more.

```
INDEX (floor)
  indexed & graph-reachable    100%  ██████████████████████████████ 
SEARCH+GRAPH rank — how deep core ranks in one query
  ranked in top-5               35%  ██████████░░░░░░░░░░░░░░░░░░░░ 
  ranked in top-10              43%  █████████████░░░░░░░░░░░░░░░░░ 
  ranked in top-20              52%  ███████████████░░░░░░░░░░░░░░░ 
  ranked in top-50 (ceiling)    55%  ████████████████░░░░░░░░░░░░░░ <- 45% never rank = ENGINE-fault (recall-miss)
GRAPH loop — agent multi-turn gather
  surfaced by agent loop        51%  ███████████████░░░░░░░░░░░░░░░ <- gather 93% of ceiling
SYNTH — agent writes what it surfaced
  written into the answer       40%  ████████████░░░░░░░░░░░░░░░░░░ <- synth 78% of surfaced, drops 14
```

**Three stages, sized** (all ÷ 124):
- **never rank (recall-miss): 45%** — 56 core files absent even from top-50 (**ENGINE-fault**).
- **ranked-but-not-gathered: 4%** — 5 files rank in top-50 but the agent never surfaces them (**agent-fault**).
- **surfaced-but-not-written (synthesis): 11%** — 14 files (**agent-fault**).

> Index: file 99% / sym 100% / graph 100%. Chain-order LCS 79% (17 ordered Qs) · diag recall-miss 12/mixed 11/ranked-low 5/ok 6. Seen-log under-counts retrieval on `*` rows → 51% surfaced is a lower bound.

## 5. Per-tool scorecards — is each tool pulling its weight?

| tool | metric | leak | binds # | fix-lever |
|---|---|---|---:|---|
| plan (route) | intent accuracy | 21/34 correct | 0 | intent.ts table / architecture.json |
| search (seed) | R@10 43% · R@50 55% | 45% never rank | 2 | seeds / engine ranking |
| graph (traverse) | gather 93% of ceiling · order 79% | 4% ranked-not-gathered | 8 | engine expand/down/up |
| details | fetch step | — (not a binding stage) | 0 | — |
| synth (write) | synth 78% of surfaced | drops 14 files | 2 | gen prompt / plan strategy |

## 6. Detail — every testcase × every stage

Diag: rm=recall-miss · rl=ranked-low · mx=mixed · ok. route ✓/✗ = plan intent vs question type. `*` on gather = seen-log under-counts. binding = first leaking stage (route→search→graph→synth).

| # | id | type | route | R@10·diag | gather | synth | end cov | mode | verdict | binding |
|---|---|---|:-:|---|---:|---:|---:|---|---|---|
| 1 | tour-04-msg-client | arch | ✗ | 17% rm | 17% | 100% | 1/6 17% | engine-unrankable | PARTIAL | search |
| 2 | new-19-message-rendering | arch | ✓ | 0% mx | 100% | 100% | 2/2 100% | — | PASS | ok |
| 3 | claude-01-push-notifications | arch | ✓ | 17% rm | 50% | 100% | 3/6 50% | — | PASS | ok |
| 4 | new-09-realtime-streamer | arch | ✗ | 20% rm | 20% | 100% | 1/5 20% | no-pivot | PARTIAL | graph |
| 5 | tour-05-msg-server | chain | ✓ | 20% mx | 60% | 100% | 3/5 60% | no-pivot | PARTIAL | graph |
| 6 | claude-05-call-chain | chain | ✓ | 38% mx | 88% | 57% | 4/8 50% | sloppy-source | PARTIAL | synth |
| 7 | new-24-autotranslate | loc | ✗ | 67% rm | 100% | 100% | 3/3 100% | — | PASS | ok |
| 8 | new-15-impact-aftersave | imp | ✓ | 33% rl | 100% | 100% | 3/3 100% | — | PASS | ok |
| 9 | new-16-impact-streamer | imp | ✓ | 67% mx | 33% | 100% | 1/3 33% | no-pivot | PARTIAL | graph |
| 10 | claude-08-federation | rout | ✗ | 50% rm | 50% | 100% | 2/4 50% | — | PASS | ok |
| 11 | new-18-webhook | rout | ✗ | 33% rl | 67% | 100% | 2/3 67% | — | PASS | ok |
| 12 | claude-07-api-endpoints | loc | ✗ | 14% mx | 43% | 100% | 3/7 43% | — | PASS | ok |
| 13 | new-25-search | loc | ✗ | 33% rm | 0% | 100% | 0/3 0% | engine-unrankable | PARTIAL | search |
| 14 | new-27-video-conference | loc | ✗ | 100% ok | 100% | 0% | 0/1 0% | wrong-subsystem | FAIL | graph |
| 15 | tour-06-endpoint | patt | ✓ | 50% rm | 100% | 50% | 1/2 50% | — | PASS | ok |
| 16 | new-17-slash-commands | patt | ✗ | 25% rm | 75% | 100% | 3/4 75% | — | PASS | ok |
| 17 | new-11-settings | arch | ✓ | 33% mx | 67% | 100% | 2/3 67% | — | PASS | ok |
| 18 | claude-03-file-upload | arch | ✓ | 33% mx | 33% | 100% | 1/3 33% | — | PASS | ok |
| 19 | new-10-apps-engine | arch | ✓ | 60% mx | 0% | 100% | 0/5 0% | no-pivot | PARTIAL | graph |
| 20 | new-20-proxify | loc | ✗ | 33% rm | 33% | 100% | 1/3 33% | — | PASS | ok |
| 21 | tour-07-db-model-create | patt | ✓ | 100% ok | 0% | 100% | 0/2 0% | wrong-subsystem | FAIL | graph |
| 22 | tour-08-db-model-use | patt | ✓ | 100% ok | 0% | 100% | 0/2 0% | gave-up | FAIL | graph |
| 23 | tour-11-new-package | patt | ✓ | 100% ok | 100% | 0% | 0/1 0% | — | PASS | ok |
| 24 | tour-10-new-service | patt | ✓ | 100% ok | 100% | 0% | 0/4 0% | dropped-synth | PARTIAL | synth |
| 25 | new-21-impact-settings | imp | ✓ | 67% rm | 33% | 100% | 1/3 33% | no-pivot | PARTIAL | graph |
| 26 | new-22-2fa | arch | ✓ | 100% rl | 25% | 100% | 1/4 25% | — | PASS | ok |
| 27 | claude-04-e2e-encryption | arch | ✓ | 60% mx | 40% | 100% | 2/5 40% | — | PASS | ok |
| 28 | new-12-ldap-auth | rout | ✗ | 50% rm | 75% | 67% | 2/4 50% | — | PASS | ok |
| 29 | claude-02-msg-permissions | loc | ✓ | 25% rl | 100% | 50% | 2/4 50% | — | PASS | ok |
| 30 | new-14-ee-license | loc | ✗ | 67% rl | 67% | 100% | 2/3 67% | — | PASS | ok |
| 31 | new-13-room-creation | chain | ✓ | 67% mx | 67% | 50% | 1/3 33% | — | PASS | ok |
| 32 | new-23-omnichannel | chain | ✓ | 33% mx | 0% | 100% | 0/3 0% | — | PASS | ok |
| 33 | claude-06-livechat-routing | rout | ✓ | 0% rm | 17% | 100% | 1/6 17% | — | PASS | ok |
| 34 | new-26-team | loc | ✗ | 100% ok | 100% | 100% | 1/1 100% | — | PASS | ok |

**Binding-tool distribution:** ok 22 · graph 8 · search 2 · synth 2.

### By question type

| type | n | avg R@10 | end cov | binding |
|---|---:|---:|---:|---|
| architecture | 9 | 38% | 39% | ok×6, graph×2, search |
| call-chain | 4 | 39% | 36% | ok×2, graph, synth |
| locate | 8 | 55% | 49% | ok×6, search, graph |
| pattern | 6 | 79% | 21% | ok×3, graph×2, synth |
| routing | 4 | 33% | 46% | ok×4 |
| impact | 3 | 56% | 56% | graph×2, ok |
