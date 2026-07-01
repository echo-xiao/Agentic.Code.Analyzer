# Unified report — verdicts · token · funnel · attribution

7/1/2026, 3:49:14 PM | 34 testcases | joined from tools/token sidecars + answers + verdicts.md (deterministic)

## 1. Headline — semantic verdicts (manual, verdicts.md)

**PASS 21 / PARTIAL 10 / FAIL 3** (34/34 judged)

## 2. Token efficiency — is the graph worth its tokens? (token)

| | no-MCP | naive @ same answer size | with MCP |
|---|---:|---:|---:|
| Avg coverage | 15% | 17% | 43% |
| Avg tokens / question | 5,041 | ~36,486 | 36,486 |

## 3. The funnel — one path, every stage ÷ the same 124 core files

> Per-FILE pooled fractions (of all 124 core files, how many survive each stage) — NOT tools' per-testcase mean R@k. Absolute numbers differ: the funnel weights bigger-spine testcases more.

```
INDEX (floor)
  indexed & graph-reachable    100%  ██████████████████████████████ 
RETRIEVAL — how deep core ranks in one query
  ranked in top-5               35%  ██████████░░░░░░░░░░░░░░░░░░░░ 
  ranked in top-10              43%  █████████████░░░░░░░░░░░░░░░░░ 
  ranked in top-20              52%  ███████████████░░░░░░░░░░░░░░░ 
  ranked in top-50 (ceiling)    55%  ████████████████░░░░░░░░░░░░░░ <- ceiling; 45% never rank (recall-miss)
AGENT
  surfaced by agent's loop      54%  ████████████████░░░░░░░░░░░░░░ <- gather 99% of ceiling
  written into the answer       42%  █████████████░░░░░░░░░░░░░░░░░ <- synth 78% of surfaced, drops 17
```

**Three stages, sized** (all ÷ 124):
- **never rank (recall-miss): 45%** — 56 core files absent even from top-50.
- **ranked-but-not-gathered: 1%** — 1 files rank in top-50 but the agent never surfaces them.
- **surfaced-but-not-written (synthesis): 12%** — 17 files.

> Index: file 99% / sym 100% / graph 100%. Chain-order LCS 79% (17 ordered Qs) · diag recall-miss 12/mixed 11/ranked-low 5/ok 6. Seen-log under-counts retrieval on `*` rows → 54% surfaced is a lower bound.

## 4. Detail — every testcase × every gate

Diag: rm=recall-miss · rl=ranked-low · mx=mixed · ok. `*` on G2 = seen-log under-counts (agent wrote more than it logged). Bottleneck = binding gate (rules in §5).

| # | id | type | G1 R@10·diag | G1.5 order | G2 gather | G3 synth | end cov | verdict | bottleneck |
|---|---|---|---|---:|---:|---:|---:|---|---|
| 1 | tour-04-msg-client | arch | 17% rm | 83% | 33% | 100% | 2/6 33% | PARTIAL | G1-recall |
| 2 | new-19-message-rendering | arch | 0% mx | 100% | 50% | 0% | 0/2 0% | FAIL | G1-mix |
| 3 | claude-01-push-notifications | arch | 17% rm | 67% | 83% | 80% | 4/6 67% | PASS | OK |
| 4 | new-09-realtime-streamer | arch | 20% rm | 80% | 40% | 100% | 2/5 40% | PARTIAL | G1-recall |
| 5 | tour-05-msg-server | chain | 20% mx | 60% | 60% | 33% | 1/5 20% | PARTIAL | G1-mix |
| 6 | claude-05-call-chain | chain | 38% mx | 75% | 88% | 43% | 3/8 38% | PARTIAL | G3 |
| 7 | new-24-autotranslate | loc | 67% rm | — | 100% | 100% | 3/3 100% | PASS | OK |
| 8 | new-15-impact-aftersave | imp | 33% rl | — | 100% | 67% | 2/3 67% | PASS | OK |
| 9 | new-16-impact-streamer | imp | 67% mx | — | 33% | 100% | 1/3 33% | PARTIAL | G2 |
| 10 | claude-08-federation | rout | 50% rm | 75% | 50% | 100% | 2/4 50% | PASS | OK |
| 11 | new-18-webhook | rout | 33% rl | 67% | 100% | 67% | 2/3 67% | PASS | OK |
| 12 | claude-07-api-endpoints | loc | 14% mx | — | 0% | 100% | 0/7 0% | FAIL | G1-mix |
| 13 | new-25-search | loc | 33% rm | — | 0% | 100% | 0/3 0% | PARTIAL | G2 |
| 14 | new-27-video-conference | loc | 100% ok | — | 100% | 100% | 1/1 100% | FAIL | OK |
| 15 | tour-06-endpoint | patt | 50% rm | — | 0% | 100% | 0/2 0% | PASS | G2 |
| 16 | new-17-slash-commands | patt | 25% rm | — | 0% | 100% | 0/4 0% | PARTIAL | G1-recall |
| 17 | new-11-settings | arch | 33% mx | 100% | 67% | 100% | 2/3 67% | PASS | OK |
| 18 | claude-03-file-upload | arch | 33% mx | 67% | 33% | 100% | 1/3 33% | PASS | G2 |
| 19 | new-10-apps-engine | arch | 60% mx | 60% | 20% | 100% | 1/5 20% | PASS | G2 |
| 20 | new-20-proxify | loc | 33% rm | — | 67% | 100% | 2/3 67% | PASS | OK |
| 21 | tour-07-db-model-create | patt | 100% ok | — | 100% | 0% | 0/2 0% | PASS | G3 |
| 22 | tour-08-db-model-use | patt | 100% ok | — | 0% | 100% | 0/2 0% | PARTIAL | G2 |
| 23 | tour-11-new-package | patt | 100% ok | — | 100% | 100% | 1/1 100% | PASS | OK |
| 24 | tour-10-new-service | patt | 100% ok | — | 100% | 0% | 0/4 0% | PASS | G3 |
| 25 | new-21-impact-settings | imp | 67% rm | — | 33% | 100% | 1/3 33% | PARTIAL | G2 |
| 26 | new-22-2fa | arch | 100% rl | 75% | 100% | 75% | 3/4 75% | PASS | OK |
| 27 | claude-04-e2e-encryption | arch | 60% mx | 80% | 60%* | 100% | 5/5 100% | PASS | OK |
| 28 | new-12-ldap-auth | rout | 50% rm | 100% | 100% | 100% | 4/4 100% | PASS | OK |
| 29 | claude-02-msg-permissions | loc | 25% rl | — | 50% | 100% | 2/4 50% | PASS | OK |
| 30 | new-14-ee-license | loc | 67% rl | — | 33% | 100% | 1/3 33% | PASS | G2 |
| 31 | new-13-room-creation | chain | 67% mx | 100% | 33% | 100% | 1/3 33% | PASS | G2 |
| 32 | new-23-omnichannel | chain | 33% mx | 100% | 67% | 100% | 2/3 67% | PASS | OK |
| 33 | claude-06-livechat-routing | rout | 0% rm | 50%✗ | 33% | 100% | 2/6 33% | PARTIAL | G1-recall |
| 34 | new-26-team | loc | 100% ok | — | 100% | 100% | 1/1 100% | PASS | OK |

**Bottleneck distribution:** OK 15 · G2 9 · G1-recall 4 · G1-mix 3 · G3 3.

### By question type

| type | n | avg R@10 | end cov | bottlenecks |
|---|---:|---:|---:|---|
| architecture | 9 | 38% | 48% | OK×4, G1-recall×2, G2×2, G1-mix |
| call-chain | 4 | 39% | 39% | G1-mix, G3, G2, OK |
| locate | 8 | 55% | 56% | OK×5, G2×2, G1-mix |
| pattern | 6 | 79% | 17% | G2×2, G3×2, G1-recall, OK |
| routing | 4 | 33% | 63% | OK×3, G1-recall |
| impact | 3 | 56% | 44% | G2×2, OK |

## 5. How the bottleneck is classified — and which plane fixes it

Front → back; the first leaking gate is the binding one:

```
ERR   answer empty / "ERROR …"  (infra, e.g. Gemini 503)
OK    end core coverage ≥ 50%
G1-*  R@10 < 30%   → recall (rm) / rank (rl) / mixed (mx) by tools diagnosis
G2    R@10 ok but retrieval-recall < 50%  (retrieval could, agent didn't gather)
G3    gathered but synthesis-recall < 70%  (surfaced, not written)
```
Triage: **G1 → engine** (seeds/expand/down/up) · **route/G2 → plan/intent table or architecture.json** (an oracle rerun — gen --oracle — separates the two) · **G3 → gen prompt / plan strategy**. The report gives the signal; a human picks the fix (auto-tuning overfits the testcases). Judging criteria stay frozen.
