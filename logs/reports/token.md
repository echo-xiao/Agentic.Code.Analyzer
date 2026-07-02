# token — is the graph worth its tokens?  (no-MCP vs naive@same-budget vs MCP)

7/1/2026, 6:40:36 PM | 34 testcases | deterministic, no Gemini/key

Coverage = answer mentions of {core files ∪ key symbols}.

| Metric | no MCP | naive (same answer size) | with MCP |
|---|---:|---:|---:|
| Avg coverage | 14.0% | 12.0% | 44.9% |
| Avg tokens / question | 5,013 | ~23,135 | 23,135 |
| Questions improved (MCP > no-MCP) | — | — | 24/34 |

| # | id | type | cov no-MCP | cov naive | cov MCP | MCP−naive | tok no-MCP | tok MCP |
|---|---|---|---:|---:|---:|---:|---:|---:|
| 1 | tour-04-msg-client | architecture | 18% | 0% | 18% | +18 | 2,623 | 46,540 |
| 2 | new-19-message-rendering | architecture | 0% | 0% | 67% | +67 | 3,984 | 14,711 |
| 3 | claude-01-push-notifications | architecture | 0% | 45% | 64% | +18 | 3,623 | 15,867 |
| 4 | new-09-realtime-streamer | architecture | 0% | 0% | 11% | +11 | 2,507 | 51,717 |
| 5 | tour-05-msg-server | call-chain | 50% | 0% | 50% | +50 | 2,866 | 34,208 |
| 6 | claude-05-call-chain | call-chain | 31% | 44% | 44% | +0 | 4,100 | 64,519 |
| 7 | new-24-autotranslate | locate | 40% | 40% | 100% | +60 | 3,110 | 26,013 |
| 8 | new-15-impact-aftersave | impact | 43% | 29% | 71% | +43 | 64,138 | 12,828 |
| 9 | new-16-impact-streamer | impact | 25% | 38% | 25% | -13 | 3,385 | 9,632 |
| 10 | claude-08-federation | routing | 0% | 22% | 44% | +22 | 1,654 | 15,459 |
| 11 | new-18-webhook | routing | 0% | 0% | 67% | +67 | 3,622 | 32,856 |
| 12 | claude-07-api-endpoints | locate | 8% | 0% | 50% | +50 | 1,787 | 17,341 |
| 13 | new-25-search | locate | 0% | 0% | 0% | +0 | 3,231 | 8,767 |
| 14 | new-27-video-conference | locate | 0% | 0% | 0% | +0 | 2,329 | 26,173 |
| 15 | tour-06-endpoint | pattern | 33% | 0% | 67% | +67 | 4,519 | 30,622 |
| 16 | new-17-slash-commands | pattern | 17% | 0% | 83% | +83 | 3,840 | 25,328 |
| 17 | new-11-settings | architecture | 0% | 0% | 67% | +67 | 4,250 | 26,305 |
| 18 | claude-03-file-upload | architecture | 0% | 0% | 44% | +44 | 3,102 | 20,597 |
| 19 | new-10-apps-engine | architecture | 0% | 0% | 0% | +0 | 1,569 | 20,003 |
| 20 | new-20-proxify | locate | 29% | 0% | 71% | +71 | 3,111 | 21,283 |
| 21 | tour-07-db-model-create | pattern | 0% | 20% | 0% | -20 | 3,734 | 17,251 |
| 22 | tour-08-db-model-use | pattern | 0% | 0% | 0% | +0 | 3,248 | 14,240 |
| 23 | tour-11-new-package | pattern | 50% | 0% | 0% | +0 | 2,150 | 20,502 |
| 24 | tour-10-new-service | pattern | 0% | 25% | 0% | -25 | 4,801 | 26,298 |
| 25 | new-21-impact-settings | impact | 17% | 50% | 33% | -17 | 3,052 | 5,177 |
| 26 | new-22-2fa | architecture | 13% | 0% | 63% | +63 | 2,837 | 18,603 |
| 27 | claude-04-e2e-encryption | architecture | 9% | 27% | 36% | +9 | 4,261 | 15,527 |
| 28 | new-12-ldap-auth | routing | 0% | 0% | 75% | +75 | 3,613 | 23,114 |
| 29 | claude-02-msg-permissions | locate | 13% | 25% | 50% | +25 | 1,886 | 14,623 |
| 30 | new-14-ee-license | locate | 0% | 0% | 75% | +75 | 3,230 | 15,005 |
| 31 | new-13-room-creation | call-chain | 33% | 0% | 50% | +50 | 3,598 | 35,174 |
| 32 | new-23-omnichannel | call-chain | 14% | 0% | 43% | +43 | 3,708 | 5,685 |
| 33 | claude-06-livechat-routing | routing | 0% | 42% | 58% | +17 | 2,675 | 20,437 |
| 34 | new-26-team | locate | 33% | 0% | 100% | +100 | 4,288 | 34,177 |
