# eval-1 — Does MCP help?  (Gemini no-MCP vs Gemini + MCP)

6/30/2026, 9:56:39 AM | 34 testcases | deterministic, no Gemini/key

Coverage = answer mentions of {core files ∪ key symbols}. Semantic comparison (is the MCP answer better) is added by Claude.

| Metric | no MCP | with MCP | change |
|---|---:|---:|---|
| Avg coverage | 14.4% | 46.7% | +32.3 pts |
| Questions improved | — | — | 28/34 |
| Avg tokens / question | 3,586 | 37,186 | ×10.4 |

> MCP lifts coverage 14% → 47% at ×10.4 token cost.

| # | id | type | cov no-MCP | cov MCP | Δ | tok no-MCP | tok MCP |
|---|---|---|---:|---:|---:|---:|---:|
| 1 | tour-04-msg-client | architecture | 9% | 55% | +45 | 3,645 | 86,754 |
| 2 | new-19-message-rendering | architecture | 0% | 50% | +50 | 4,033 | 48,588 |
| 3 | claude-01-push-notifications | architecture | 18% | 36% | +18 | 3,561 | 26,938 |
| 4 | new-09-realtime-streamer | architecture | 0% | 11% | +11 | 2,788 | 40,078 |
| 5 | tour-05-msg-server | call-chain | 50% | 25% | -25 | 1,720 | 16,410 |
| 6 | claude-05-call-chain | call-chain | 25% | 31% | +6 | 3,637 | 35,581 |
| 7 | new-24-autotranslate | locate | 0% | 80% | +80 | 3,967 | 44,146 |
| 8 | new-15-impact-aftersave | impact | 43% | 29% | -14 | 3,332 | 9,913 |
| 9 | new-16-impact-streamer | impact | 13% | 25% | +13 | 3,149 | 7,291 |
| 10 | claude-08-federation | routing | 0% | 11% | +11 | 3,140 | 40,395 |
| 11 | new-18-webhook | routing | 0% | 67% | +67 | 3,693 | 95,704 |
| 12 | claude-07-api-endpoints | locate | 17% | 58% | +42 | 1,990 | 24,768 |
| 13 | new-25-search | locate | 0% | 67% | +67 | 3,755 | 47,480 |
| 14 | new-27-video-conference | locate | 0% | 67% | +67 | 3,001 | 56,593 |
| 15 | tour-06-endpoint | pattern | 33% | 50% | +17 | 3,857 | 50,550 |
| 16 | new-17-slash-commands | pattern | 33% | 67% | +33 | 3,502 | 48,974 |
| 17 | new-11-settings | architecture | 0% | 67% | +67 | 4,473 | 33,739 |
| 18 | claude-03-file-upload | architecture | 11% | 44% | +33 | 3,858 | 57,750 |
| 19 | new-10-apps-engine | architecture | 30% | 40% | +10 | 2,772 | 30,538 |
| 20 | new-20-proxify | locate | 29% | 57% | +29 | 3,535 | 19,550 |
| 21 | tour-07-db-model-create | pattern | 0% | 40% | +40 | 5,955 | 97,601 |
| 22 | tour-08-db-model-use | pattern | 0% | 0% | +0 | 3,624 | 19,058 |
| 23 | tour-11-new-package | pattern | 50% | 50% | +0 | 4,946 | 18,981 |
| 24 | tour-10-new-service | pattern | 0% | 0% | +0 | 5,186 | 35,884 |
| 25 | new-21-impact-settings | impact | 17% | 33% | +17 | 3,866 | 6,576 |
| 26 | new-22-2fa | architecture | 0% | 75% | +75 | 3,359 | 17,569 |
| 27 | claude-04-e2e-encryption | architecture | 9% | 64% | +55 | 4,170 | 56,644 |
| 28 | new-12-ldap-auth | routing | 13% | 88% | +75 | 3,500 | 22,337 |
| 29 | claude-02-msg-permissions | locate | 13% | 63% | +50 | 1,604 | 6,346 |
| 30 | new-14-ee-license | locate | 0% | 25% | +25 | 3,254 | 26,774 |
| 31 | new-13-room-creation | call-chain | 50% | 50% | +0 | 4,262 | 7,737 |
| 32 | new-23-omnichannel | call-chain | 29% | 57% | +29 | 4,218 | 43,096 |
| 33 | claude-06-livechat-routing | routing | 0% | 42% | +42 | 3,145 | 31,491 |
| 34 | new-26-team | locate | 0% | 67% | +67 | 3,424 | 52,478 |
