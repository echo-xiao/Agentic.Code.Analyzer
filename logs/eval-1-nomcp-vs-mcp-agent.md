# eval-1 — Does MCP help?  (Gemini no-MCP vs Gemini + MCP)

6/29/2026, 5:04:01 PM | 34 testcases | deterministic, no Gemini/key

## Takeaway

**MCP clearly helps: coverage roughly triples (16% → 47%), 26/34 questions improve, several dramatically** (2fa +100, ldap +88, new-service +88, webhook/slash-commands/settings +67). Cost: **~7.2× tokens** (3.7k → 27k per question) — the price of navigating real code instead of guessing from memory.

But MCP is not a free win everywhere (Claude's read of the pairs):
- **3 questions regressed** — `tour-05-msg-server` (50%→25%), `new-15-impact-aftersave` (43%→14%), `new-10-apps-engine` (20%→0%): the tools pulled the model toward the wrong files, doing worse than its own memory.
- **2 stayed at 0%** — `claude-08-federation`, `new-27-video-conference`: neither memory nor tools reached the answer (federation gives up; video-conf misses the core service).
- **3 flat** — tour-04, tour-08, tour-11: no change.

Net: a big coverage win, but the regressions cluster on **impact questions + apps-engine** (the same weak spots eval-3 flags), and the ×7.2 token cost is real.

> Coverage = answer mentions of {core files ∪ key symbols} (deterministic string match). Per-question coverage + token in the table below; the regressions/no-change rows are where MCP did not help.

| Metric | no MCP | with MCP | change |
|---|---:|---:|---|
| Avg coverage | 16.2% | 47.5% | +31.3 pts |
| Questions improved | — | — | 26/34 |
| Avg tokens / question | 3,746 | 26,934 | ×7.2 |

> MCP lifts coverage 16% → 47% at ×7.2 token cost.

| # | id | type | cov no-MCP | cov MCP | Δ | tok no-MCP | tok MCP |
|---|---|---|---:|---:|---:|---:|---:|
| 1 | tour-04-msg-client | architecture | 18% | 18% | +0 | 2,767 | 17,077 |
| 2 | new-19-message-rendering | architecture | 17% | 67% | +50 | 3,987 | 23,931 |
| 3 | claude-01-push-notifications | architecture | 18% | 55% | +36 | 4,124 | 36,227 |
| 4 | new-09-realtime-streamer | architecture | 0% | 11% | +11 | 2,954 | 45,102 |
| 5 | tour-05-msg-server | call-chain | 50% | 25% | -25 | 3,644 | 28,535 |
| 6 | claude-05-call-chain | call-chain | 31% | 44% | +13 | 4,561 | 59,122 |
| 7 | new-24-autotranslate | locate | 60% | 80% | +20 | 3,793 | 32,517 |
| 8 | new-15-impact-aftersave | impact | 43% | 14% | -29 | 3,317 | 14,917 |
| 9 | new-16-impact-streamer | impact | 13% | 25% | +13 | 3,101 | 6,693 |
| 10 | claude-08-federation | routing | 0% | 0% | +0 | 3,674 | 32,415 |
| 11 | new-18-webhook | routing | 0% | 67% | +67 | 3,795 | 13,950 |
| 12 | claude-07-api-endpoints | locate | 17% | 50% | +33 | 2,895 | 25,255 |
| 13 | new-25-search | locate | 0% | 33% | +33 | 3,751 | 24,123 |
| 14 | new-27-video-conference | locate | 0% | 0% | +0 | 3,989 | 28,536 |
| 15 | tour-06-endpoint | pattern | 17% | 67% | +50 | 5,441 | 49,065 |
| 16 | new-17-slash-commands | pattern | 0% | 67% | +67 | 3,029 | 54,407 |
| 17 | new-11-settings | architecture | 0% | 67% | +67 | 3,579 | 29,461 |
| 18 | claude-03-file-upload | architecture | 22% | 33% | +11 | 3,125 | 10,263 |
| 19 | new-10-apps-engine | architecture | 20% | 0% | -20 | 4,342 | 25,548 |
| 20 | new-20-proxify | locate | 29% | 71% | +43 | 3,208 | 33,460 |
| 21 | tour-07-db-model-create | pattern | 0% | 40% | +40 | 5,801 | 29,986 |
| 22 | tour-08-db-model-use | pattern | 0% | 0% | +0 | 4,024 | 29,765 |
| 23 | tour-11-new-package | pattern | 50% | 50% | +0 | 4,081 | 11,634 |
| 24 | tour-10-new-service | pattern | 0% | 88% | +88 | 5,624 | 13,563 |
| 25 | new-21-impact-settings | impact | 17% | 33% | +17 | 2,722 | 5,478 |
| 26 | new-22-2fa | architecture | 0% | 100% | +100 | 5,144 | 33,732 |
| 27 | claude-04-e2e-encryption | architecture | 0% | 64% | +64 | 3,144 | 31,488 |
| 28 | new-12-ldap-auth | routing | 13% | 100% | +88 | 3,852 | 48,578 |
| 29 | claude-02-msg-permissions | locate | 13% | 63% | +50 | 2,481 | 8,807 |
| 30 | new-14-ee-license | locate | 0% | 38% | +38 | 3,305 | 26,256 |
| 31 | new-13-room-creation | call-chain | 50% | 67% | +17 | 3,409 | 12,394 |
| 32 | new-23-omnichannel | call-chain | 14% | 71% | +57 | 3,538 | 21,194 |
| 33 | claude-06-livechat-routing | routing | 8% | 42% | +33 | 2,815 | 33,381 |
| 34 | new-26-team | locate | 33% | 67% | +33 | 4,342 | 18,896 |
