# eval-1 — Does MCP help, and why?  (no-MCP vs naive@same-budget vs MCP)

6/30/2026, 7:36:02 PM | 34 testcases | deterministic, no Gemini/key

Coverage = answer mentions of {core files ∪ key symbols}.

| Metric | no MCP | naive (same answer size) | with MCP |
|---|---:|---:|---:|
| Avg coverage | 14.5% | 20.7% | 38.1% |
| Avg tokens / question | 3,258 | ~33,670 | 33,670 |
| Questions improved (MCP > no-MCP) | — | — | 22/34 |

> **Is the lift the graph, or just more tokens?** In the SAME answer space, dumb keyword search reaches 21%, while the MCP agent reaches 38% — so the graph/agent adds **+17 pts beyond what equal-length plain search buys**. The lift is the graph, not just tokens.

| # | id | type | cov no-MCP | cov naive | cov MCP | MCP−naive | tok no-MCP | tok MCP |
|---|---|---|---:|---:|---:|---:|---:|---:|
| 1 | tour-04-msg-client | architecture | 18% | 0% | 55% | +55 | 2,623 | 69,447 |
| 2 | new-19-message-rendering | architecture | 0% | 0% | 0% | +0 | 3,984 | 37,996 |
| 3 | claude-01-push-notifications | architecture | 18% | 0% | 0% | +0 | 4,154 | 0 |
| 4 | new-09-realtime-streamer | architecture | 0% | 0% | 11% | +11 | 2,662 | 56,843 |
| 5 | tour-05-msg-server | call-chain | 50% | 0% | 25% | +25 | 3,621 | 16,745 |
| 6 | claude-05-call-chain | call-chain | 31% | 6% | 31% | +25 | 3,829 | 73,873 |
| 7 | new-24-autotranslate | locate | 40% | 100% | 100% | +0 | 3,110 | 49,953 |
| 8 | new-15-impact-aftersave | impact | 43% | 43% | 14% | -29 | 3,309 | 15,951 |
| 9 | new-16-impact-streamer | impact | 25% | 25% | 25% | +0 | 3,385 | 7,578 |
| 10 | claude-08-federation | routing | 0% | 22% | 11% | -11 | 1,654 | 52,454 |
| 11 | new-18-webhook | routing | 0% | 33% | 67% | +33 | 3,622 | 45,554 |
| 12 | claude-07-api-endpoints | locate | 8% | 25% | 25% | +0 | 1,648 | 46,728 |
| 13 | new-25-search | locate | 0% | 0% | 0% | +0 | 3,343 | 46,385 |
| 14 | new-27-video-conference | locate | 0% | 0% | 0% | +0 | 3,262 | 0 |
| 15 | tour-06-endpoint | pattern | 33% | 50% | 67% | +17 | 2,364 | 41,911 |
| 16 | new-17-slash-commands | pattern | 17% | 0% | 0% | +0 | 3,840 | 43,403 |
| 17 | new-11-settings | architecture | 0% | 0% | 67% | +67 | 4,119 | 38,031 |
| 18 | claude-03-file-upload | architecture | 11% | 0% | 56% | +56 | 3,263 | 59,833 |
| 19 | new-10-apps-engine | architecture | 0% | 0% | 0% | +0 | 1,569 | 27,006 |
| 20 | new-20-proxify | locate | 29% | 0% | 43% | +43 | 3,111 | 16,859 |
| 21 | tour-07-db-model-create | pattern | 0% | 0% | 40% | +40 | 3,734 | 29,471 |
| 22 | tour-08-db-model-use | pattern | 0% | 0% | 0% | +0 | 3,248 | 20,969 |
| 23 | tour-11-new-package | pattern | 50% | 50% | 50% | +0 | 2,150 | 12,339 |
| 24 | tour-10-new-service | pattern | 0% | 25% | 13% | -13 | 4,801 | 43,471 |
| 25 | new-21-impact-settings | impact | 17% | 50% | 33% | -17 | 3,052 | 6,665 |
| 26 | new-22-2fa | architecture | 0% | 75% | 63% | -13 | 3,271 | 31,752 |
| 27 | claude-04-e2e-encryption | architecture | 9% | 9% | 73% | +64 | 4,261 | 51,126 |
| 28 | new-12-ldap-auth | routing | 0% | 13% | 100% | +88 | 3,613 | 43,688 |
| 29 | claude-02-msg-permissions | locate | 13% | 50% | 38% | -13 | 1,886 | 6,556 |
| 30 | new-14-ee-license | locate | 0% | 0% | 38% | +38 | 3,230 | 19,878 |
| 31 | new-13-room-creation | call-chain | 17% | 0% | 67% | +67 | 3,682 | 21,824 |
| 32 | new-23-omnichannel | call-chain | 14% | 43% | 71% | +29 | 3,708 | 26,801 |
| 33 | claude-06-livechat-routing | routing | 17% | 50% | 50% | +0 | 3,384 | 25,416 |
| 34 | new-26-team | locate | 33% | 33% | 67% | +33 | 4,288 | 58,289 |
