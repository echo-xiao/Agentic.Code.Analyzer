# metrics — quantitative pipeline report (no semantic analysis)

7/2/2026, 12:44:43 AM | 34 testcases | deterministic (index + answers + tools-data), NO verdicts. Semantic analysis lives in logs/reports/verdicts.md.

## 1. Value — do the tools help?

| | no-MCP | naive @ same answer size | with MCP |
|---|---:|---:|---:|
| Avg coverage | 14% | 12% | 45% |
| Avg tokens / question | 5,013 | ~23,135 | 23,135 |

**The agent's navigation adds +31 pts over pure LLM, +33 over same-budget keyword dump** — the lift is choosing moves, not just spending tokens.

## 2. The agent funnel — of the same 124 core files, how many the agent surfaces then writes

> Pooled per-file fractions from the ACTUAL multi-turn run (seen-log → written). R@k below is a single-query PROBE (tool ceiling), NOT a stage the agent flows through.

```
INDEX  indexed & reachable     100%  ██████████████████████████████ 
AGENT  surfaced (seen-log)      51%  ███████████████░░░░░░░░░░░░░░░ <- 49% never surfaced
AGENT  written (answer)         40%  ████████████░░░░░░░░░░░░░░░░░░ <- synth 78% of surfaced, drops 14
```

**Two agent stages** (÷ 124): not-surfaced 49% (61 files) · surfaced-but-not-written 11% (14 files).
> Single-query probe (tool capability, NOT the agent path): R@5/10/20/50 = 35%/43%/52%/55%. Of "never surfaced": ~45% never rank in top-50 (engine) vs ~4% rank-but-skipped (agent loop).
> Floor: substring recall file 99% / sym 100% · graph reachability 100% · chain-order LCS 79% (17 ordered Qs).

## 3. Auto-triage — mechanical "suspected stage" per testcase (no semantic judgment)

> Front→back, first trip wins, numbers only: route (intent≠type) → search (R@50<30%) → graph (surfaced<50%) → synth (synth<70%); ok if end coverage ≥50%. Flags WHICH question + stage to inspect — the WHY is in verdicts.md.

**Suspected-stage distribution:** ok 15 · graph 9 · route 6 · synth 3 · search 1.

| # | id | type | route | R@10·diag | surfaced | synth | end cov | suspected stage |
|---|---|---|:-:|---|---:|---:|---:|---|
| 1 | tour-04-msg-client | arch | ✗ | 17% rm | 17% | 100% | 1/6 17% | route |
| 2 | new-19-message-rendering | arch | ✓ | 0% mx | 100% | 100% | 2/2 100% | ok |
| 3 | claude-01-push-notifications | arch | ✓ | 17% rm | 50% | 100% | 3/6 50% | ok |
| 4 | new-09-realtime-streamer | arch | ✗ | 20% rm | 20% | 100% | 1/5 20% | route |
| 5 | tour-05-msg-server | chain | ✓ | 20% mx | 60% | 100% | 3/5 60% | ok |
| 6 | claude-05-call-chain | chain | ✓ | 38% mx | 88% | 57% | 4/8 50% | ok |
| 7 | new-24-autotranslate | loc | ✗ | 67% rm | 100% | 100% | 3/3 100% | ok |
| 8 | new-15-impact-aftersave | imp | ✓ | 33% rl | 100% | 100% | 3/3 100% | ok |
| 9 | new-16-impact-streamer | imp | ✓ | 67% mx | 33% | 100% | 1/3 33% | graph |
| 10 | claude-08-federation | rout | ✗ | 50% rm | 50% | 100% | 2/4 50% | ok |
| 11 | new-18-webhook | rout | ✗ | 33% rl | 67% | 100% | 2/3 67% | ok |
| 12 | claude-07-api-endpoints | loc | ✗ | 14% mx | 43% | 100% | 3/7 43% | route |
| 13 | new-25-search | loc | ✗ | 33% rm | 0% | 100% | 0/3 0% | route |
| 14 | new-27-video-conference | loc | ✗ | 100% ok | 100% | 0% | 0/1 0% | route |
| 15 | tour-06-endpoint | patt | ✓ | 50% rm | 100% | 50% | 1/2 50% | ok |
| 16 | new-17-slash-commands | patt | ✗ | 25% rm | 75% | 100% | 3/4 75% | ok |
| 17 | new-11-settings | arch | ✓ | 33% mx | 67% | 100% | 2/3 67% | ok |
| 18 | claude-03-file-upload | arch | ✓ | 33% mx | 33% | 100% | 1/3 33% | graph |
| 19 | new-10-apps-engine | arch | ✓ | 60% mx | 0% | 100% | 0/5 0% | graph |
| 20 | new-20-proxify | loc | ✗ | 33% rm | 33% | 100% | 1/3 33% | route |
| 21 | tour-07-db-model-create | patt | ✓ | 100% ok | 0% | 100% | 0/2 0% | graph |
| 22 | tour-08-db-model-use | patt | ✓ | 100% ok | 0% | 100% | 0/2 0% | graph |
| 23 | tour-11-new-package | patt | ✓ | 100% ok | 100% | 0% | 0/1 0% | synth |
| 24 | tour-10-new-service | patt | ✓ | 100% ok | 100% | 0% | 0/4 0% | synth |
| 25 | new-21-impact-settings | imp | ✓ | 67% rm | 33% | 100% | 1/3 33% | graph |
| 26 | new-22-2fa | arch | ✓ | 100% rl | 25% | 100% | 1/4 25% | graph |
| 27 | claude-04-e2e-encryption | arch | ✓ | 60% mx | 40% | 100% | 2/5 40% | graph |
| 28 | new-12-ldap-auth | rout | ✗ | 50% rm | 75% | 67% | 2/4 50% | ok |
| 29 | claude-02-msg-permissions | loc | ✓ | 25% rl | 100% | 50% | 2/4 50% | ok |
| 30 | new-14-ee-license | loc | ✗ | 67% rl | 67% | 100% | 2/3 67% | ok |
| 31 | new-13-room-creation | chain | ✓ | 67% mx | 67% | 50% | 1/3 33% | synth |
| 32 | new-23-omnichannel | chain | ✓ | 33% mx | 0% | 100% | 0/3 0% | graph |
| 33 | claude-06-livechat-routing | rout | ✓ | 0% rm | 17% | 100% | 1/6 17% | search |
| 34 | new-26-team | loc | ✗ | 100% ok | 100% | 100% | 1/1 100% | ok |
