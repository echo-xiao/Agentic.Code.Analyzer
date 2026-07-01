# Retrieval funnel — unified report

6/30/2026, 8:05:40 PM | 34 testcases | joined from eval-1/2/3 sidecars (deterministic)

> ⚠ 2 infra failure(s) excluded from capability averages: claude-01-push-notifications, new-27-video-conference (empty / 503).

## 1. Token efficiency — is the graph worth its tokens? (eval-1)

| | no-MCP | naive @ same answer size | with MCP |
|---|---:|---:|---:|
| Avg coverage | 14% | 21% | 38% |
| Avg tokens / question | 3,258 | ~33,670 | 33,670 |

## 2. The funnel — one path, every stage ÷ the same 117 core files

```
INDEX (floor)
  indexed & graph-reachable    100%  ██████████████████████████████ 
RETRIEVAL — how deep core ranks in one search query
  ranked in top-5               34%  ██████████░░░░░░░░░░░░░░░░░░░░ 
  ranked in top-10              43%  █████████████░░░░░░░░░░░░░░░░░ 
  ranked in top-20              53%  ████████████████░░░░░░░░░░░░░░ 
  ranked in top-50 (ceiling)    56%  █████████████████░░░░░░░░░░░░░ <- ceiling; 44% never rank (recall-miss)
AGENT
  surfaced by agent's loop      49%  ███████████████░░░░░░░░░░░░░░░ <- gather 86% of ceiling
  written into the answer       38%  ███████████░░░░░░░░░░░░░░░░░░░ <- synth 77% of surfaced, drops 17
```

**Three stages, sized** (all ÷ 117):
- **never rank (recall-miss): 44%** — 51 core files absent even from top-50.
- **ranked-but-not-gathered: 8%** — 9 files rank in top-50 but the agent never surfaces them.
- **surfaced-but-not-written (synthesis): 11%** — 17 files.

> Index: file 100% / sym 100% / graph 100%. Chain-order LCS 79% (17 ordered Qs) · diag recall-miss 11/mixed 12/ranked-low 5/ok 6. Seen-log under-counts retrieval on `*` rows → 49% surfaced is a lower bound.

## 3. Detail — every testcase × every gate

Diag: rm=recall-miss · rl=ranked-low · mx=mixed · ok. `*` on G2 = seen-log under-counts (agent wrote more than it logged). Bottleneck = binding gate (rules in §5).

| # | id | type | G1 R@10·diag | G1.5 order | G2 gather | G3 synth | end cov | bottleneck |
|---|---|---|---|---:|---:|---:|---:|---|
| 1 | tour-04-msg-client | arch | 17% rm | 83% | 33% | 100% | 2/6 33% | G1-recall |
| 2 | new-19-message-rendering | arch | 0% mx | 100% | 0% | 100% | 0/2 0% | G1-mix |
| 3 | claude-01-push-notifications | arch | — | 67% | — | — | — | ERR |
| 4 | new-09-realtime-streamer | arch | 20% rm | 80% | 20% | 100% | 1/5 20% | G1-recall |
| 5 | tour-05-msg-server | chain | 20% rl | 60% | 60% | 33% | 1/5 20% | G1-rank |
| 6 | claude-05-call-chain | chain | 38% mx | 75% | 88% | 57% | 4/8 50% | OK |
| 7 | new-24-autotranslate | loc | 67% rm | — | 100% | 100% | 3/3 100% | OK |
| 8 | new-15-impact-aftersave | imp | 33% rl | — | 67% | 0% | 0/3 0% | G3 |
| 9 | new-16-impact-streamer | imp | 67% mx | — | 33% | 100% | 1/3 33% | G2 |
| 10 | claude-08-federation | rout | 50% rm | 75% | 0% | 100% | 0/4 0% | G2 |
| 11 | new-18-webhook | rout | 33% rl | 67% | 67% | 100% | 2/3 67% | OK |
| 12 | claude-07-api-endpoints | loc | 14% mx | — | 57% | 75% | 3/7 43% | G1-mix |
| 13 | new-25-search | loc | 33% rm | — | 0% | 100% | 0/3 0% | G2 |
| 14 | new-27-video-conference | loc | — | — | — | — | — | ERR |
| 15 | tour-06-endpoint | patt | 50% rm | — | 100% | 50% | 1/2 50% | OK |
| 16 | new-17-slash-commands | patt | 25% rm | — | 0% | 100% | 0/4 0% | G1-recall |
| 17 | new-11-settings | arch | 33% mx | 100% | 67% | 100% | 2/3 67% | OK |
| 18 | claude-03-file-upload | arch | 33% mx | 67% | 67% | 100% | 2/3 67% | OK |
| 19 | new-10-apps-engine | arch | 60% mx | 60% | 0% | 100% | 0/5 0% | G2 |
| 20 | new-20-proxify | loc | 33% rm | — | 33% | 100% | 1/3 33% | MEAS |
| 21 | tour-07-db-model-create | patt | 100% ok | — | 0% | 100% | 0/2 0% | MEAS |
| 22 | tour-08-db-model-use | patt | 100% ok | — | 0% | 100% | 0/2 0% | G2 |
| 23 | tour-11-new-package | patt | 100% ok | — | 0%* | 100% | 1/1 100% | OK |
| 24 | tour-10-new-service | patt | 100% ok | — | 100% | 0% | 0/4 0% | MEAS |
| 25 | new-21-impact-settings | imp | 33% mx | — | 33% | 100% | 1/3 33% | G2 |
| 26 | new-22-2fa | arch | 100% rl | 75% | 75% | 33% | 1/4 25% | MEAS |
| 27 | claude-04-e2e-encryption | arch | 60% mx | 80% | 40%* | 100% | 5/5 100% | OK |
| 28 | new-12-ldap-auth | rout | 50% rm | 100% | 100% | 100% | 4/4 100% | OK |
| 29 | claude-02-msg-permissions | loc | 25% rl | — | 50% | 100% | 2/4 50% | OK |
| 30 | new-14-ee-license | loc | 67% mx | — | 33% | 100% | 1/3 33% | MEAS |
| 31 | new-13-room-creation | chain | 67% mx | 100% | 67% | 100% | 2/3 67% | OK |
| 32 | new-23-omnichannel | chain | 33% mx | 100% | 67% | 100% | 2/3 67% | OK |
| 33 | claude-06-livechat-routing | rout | 0% rm | 50%✗ | 50% | 33% | 1/6 17% | G1-recall |
| 34 | new-26-team | loc | 100% ok | — | 100% | 100% | 1/1 100% | OK |

**Bottleneck distribution:** OK 13 · G2 6 · MEAS 5 · G1-recall 4 · G1-mix 2 · ERR 2 · G1-rank 1 · G3 1.

## 4. Summary — by question type

| type | n | avg R@10 | end cov | bottlenecks |
|---|---:|---:|---:|---|
| architecture | 9 | 38% | 39% | OK×3, G1-recall×2, G1-mix, ERR, G2, MEAS |
| call-chain | 4 | 39% | 51% | OK×3, G1-rank |
| locate | 8 | 55% | 51% | OK×3, MEAS×2, G1-mix, G2, ERR |
| pattern | 6 | 79% | 25% | OK×2, MEAS×2, G1-recall, G2 |
| routing | 4 | 33% | 46% | OK×2, G2, G1-recall |
| impact | 3 | 44% | 22% | G2×2, G3 |

## 5. How the bottleneck is classified

Front → back; the first leaking gate is the binding one:

```
ERR   answer empty / "ERROR …"  (infra, e.g. Gemini 503)
OK    end core coverage ≥ 50%
MEAS  manual verdict = PASS but coverage < 50%  (file-overlap under-rates: right mechanism, different files)
G1-*  R@10 < 30%   → recall (rm) / rank (rl) / mixed (mx) by eval-2 diagnosis
G2    R@10 ok but retrieval-recall < 50%  (search could, agent didn't gather)
G3    gathered but synthesis-recall < 70%  (surfaced, not written)
```
