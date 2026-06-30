# eval-1 — Does MCP help?  (Gemini no-MCP vs Gemini + MCP)

6/29/2026, 6:55:06 PM | 34 testcases | deterministic, no Gemini/key

Coverage = answer mentions of {core files ∪ key symbols}. Semantic comparison (is the MCP answer better) is added by Claude.

| Metric | no MCP | with MCP | change |
|---|---:|---:|---|
| Avg coverage | 16.2% | 41.7% | +25.5 pts |
| Questions improved | — | — | 25/34 |
| Avg tokens / question | 3,746 | 34,341 | ×9.2 |

> MCP lifts coverage 16% → 42% at ×9.2 token cost.

| # | id | type | cov no-MCP | cov MCP | Δ | tok no-MCP | tok MCP |
|---|---|---|---:|---:|---:|---:|---:|
| 1 | tour-04-msg-client | architecture | 18% | 18% | +0 | 2,767 | 54,125 |
| 2 | new-19-message-rendering | architecture | 17% | 0% | -17 | 3,987 | 31,413 |
| 3 | claude-01-push-notifications | architecture | 18% | 36% | +18 | 4,124 | 28,292 |
| 4 | new-09-realtime-streamer | architecture | 0% | 11% | +11 | 2,954 | 47,494 |
| 5 | tour-05-msg-server | call-chain | 50% | 25% | -25 | 3,644 | 74,703 |
| 6 | claude-05-call-chain | call-chain | 31% | 31% | +0 | 4,561 | 90,507 |
| 7 | new-24-autotranslate | locate | 60% | 80% | +20 | 3,793 | 33,647 |
| 8 | new-15-impact-aftersave | impact | 43% | 29% | -14 | 3,317 | 11,654 |
| 9 | new-16-impact-streamer | impact | 13% | 25% | +13 | 3,101 | 7,322 |
| 10 | claude-08-federation | routing | 0% | 33% | +33 | 3,674 | 30,722 |
| 11 | new-18-webhook | routing | 0% | 67% | +67 | 3,795 | 21,849 |
| 12 | claude-07-api-endpoints | locate | 17% | 58% | +42 | 2,895 | 25,165 |
| 13 | new-25-search | locate | 0% | 0% | +0 | 3,751 | 44,779 |
| 14 | new-27-video-conference | locate | 0% | 67% | +67 | 3,989 | 79,642 |
| 15 | tour-06-endpoint | pattern | 17% | 33% | +17 | 5,441 | 28,048 |
| 16 | new-17-slash-commands | pattern | 0% | 33% | +33 | 3,029 | 43,133 |
| 17 | new-11-settings | architecture | 0% | 50% | +50 | 3,579 | 39,803 |
| 18 | claude-03-file-upload | architecture | 22% | 33% | +11 | 3,125 | 30,868 |
| 19 | new-10-apps-engine | architecture | 20% | 20% | +0 | 4,342 | 27,165 |
| 20 | new-20-proxify | locate | 29% | 57% | +29 | 3,208 | 35,643 |
| 21 | tour-07-db-model-create | pattern | 0% | 40% | +40 | 5,801 | 36,867 |
| 22 | tour-08-db-model-use | pattern | 0% | 0% | +0 | 4,024 | 17,288 |
| 23 | tour-11-new-package | pattern | 50% | 0% | -50 | 4,081 | 21,600 |
| 24 | tour-10-new-service | pattern | 0% | 88% | +88 | 5,624 | 37,620 |
| 25 | new-21-impact-settings | impact | 17% | 33% | +17 | 2,722 | 6,793 |
| 26 | new-22-2fa | architecture | 0% | 75% | +75 | 5,144 | 53,073 |
| 27 | claude-04-e2e-encryption | architecture | 0% | 45% | +45 | 3,144 | 36,711 |
| 28 | new-12-ldap-auth | routing | 13% | 88% | +75 | 3,852 | 18,276 |
| 29 | claude-02-msg-permissions | locate | 13% | 75% | +63 | 2,481 | 6,030 |
| 30 | new-14-ee-license | locate | 0% | 50% | +50 | 3,305 | 23,456 |
| 31 | new-13-room-creation | call-chain | 50% | 67% | +17 | 3,409 | 32,547 |
| 32 | new-23-omnichannel | call-chain | 14% | 43% | +29 | 3,538 | 36,901 |
| 33 | claude-06-livechat-routing | routing | 8% | 42% | +33 | 2,815 | 42,461 |
| 34 | new-26-team | locate | 33% | 67% | +33 | 4,342 | 12,007 |
