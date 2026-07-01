# token — is the graph worth its tokens?  (no-MCP vs naive@same-budget vs MCP)

7/1/2026, 3:49:13 PM | 34 testcases | deterministic, no Gemini/key

Coverage = answer mentions of {core files ∪ key symbols}.

| Metric | no MCP | naive (same answer size) | with MCP |
|---|---:|---:|---:|
| Avg coverage | 14.6% | 17.3% | 43.4% |
| Avg tokens / question | 5,041 | ~36,486 | 36,486 |
| Questions improved (MCP > no-MCP) | — | — | 25/34 |

| # | id | type | cov no-MCP | cov naive | cov MCP | MCP−naive | tok no-MCP | tok MCP |
|---|---|---|---:|---:|---:|---:|---:|---:|
| 1 | tour-04-msg-client | architecture | 18% | 0% | 55% | +55 | 2,623 | 41,089 |
| 2 | new-19-message-rendering | architecture | 17% | 0% | 33% | +33 | 3,585 | 55,856 |
| 3 | claude-01-push-notifications | architecture | 0% | 45% | 55% | +9 | 3,623 | 26,554 |
| 4 | new-09-realtime-streamer | architecture | 0% | 0% | 33% | +33 | 2,662 | 52,439 |
| 5 | tour-05-msg-server | call-chain | 50% | 0% | 25% | +25 | 3,621 | 16,827 |
| 6 | claude-05-call-chain | call-chain | 31% | 31% | 25% | -6 | 3,829 | 49,032 |
| 7 | new-24-autotranslate | locate | 60% | 80% | 100% | +20 | 3,107 | 57,247 |
| 8 | new-15-impact-aftersave | impact | 43% | 43% | 57% | +14 | 64,138 | 11,831 |
| 9 | new-16-impact-streamer | impact | 25% | 38% | 25% | -13 | 3,385 | 10,039 |
| 10 | claude-08-federation | routing | 0% | 22% | 44% | +22 | 1,654 | 35,039 |
| 11 | new-18-webhook | routing | 0% | 0% | 67% | +67 | 3,622 | 47,558 |
| 12 | claude-07-api-endpoints | locate | 8% | 25% | 0% | -25 | 1,648 | 46,536 |
| 13 | new-25-search | locate | 0% | 0% | 0% | +0 | 3,231 | 47,381 |
| 14 | new-27-video-conference | locate | 0% | 0% | 33% | +33 | 2,329 | 33,891 |
| 15 | tour-06-endpoint | pattern | 33% | 0% | 33% | +33 | 4,519 | 22,863 |
| 16 | new-17-slash-commands | pattern | 17% | 0% | 0% | +0 | 3,275 | 40,971 |
| 17 | new-11-settings | architecture | 0% | 0% | 67% | +67 | 4,119 | 38,052 |
| 18 | claude-03-file-upload | architecture | 0% | 22% | 33% | +11 | 3,102 | 38,001 |
| 19 | new-10-apps-engine | architecture | 0% | 0% | 30% | +30 | 1,569 | 29,729 |
| 20 | new-20-proxify | locate | 29% | 0% | 57% | +57 | 3,111 | 43,236 |
| 21 | tour-07-db-model-create | pattern | 0% | 20% | 20% | +0 | 3,734 | 122,650 |
| 22 | tour-08-db-model-use | pattern | 0% | 0% | 0% | +0 | 3,248 | 35,861 |
| 23 | tour-11-new-package | pattern | 50% | 50% | 50% | +0 | 2,150 | 15,255 |
| 24 | tour-10-new-service | pattern | 0% | 25% | 13% | -13 | 6,715 | 71,291 |
| 25 | new-21-impact-settings | impact | 17% | 67% | 33% | -33 | 2,726 | 6,894 |
| 26 | new-22-2fa | architecture | 0% | 0% | 75% | +75 | 3,271 | 52,951 |
| 27 | claude-04-e2e-encryption | architecture | 9% | 27% | 73% | +45 | 3,543 | 39,636 |
| 28 | new-12-ldap-auth | routing | 0% | 0% | 100% | +100 | 3,288 | 7,947 |
| 29 | claude-02-msg-permissions | locate | 13% | 50% | 63% | +13 | 1,886 | 6,665 |
| 30 | new-14-ee-license | locate | 0% | 0% | 38% | +38 | 3,230 | 16,035 |
| 31 | new-13-room-creation | call-chain | 17% | 0% | 50% | +50 | 3,682 | 8,620 |
| 32 | new-23-omnichannel | call-chain | 29% | 0% | 71% | +71 | 4,222 | 26,687 |
| 33 | claude-06-livechat-routing | routing | 0% | 42% | 50% | +8 | 2,675 | 25,026 |
| 34 | new-26-team | locate | 33% | 0% | 67% | +67 | 4,288 | 60,829 |
