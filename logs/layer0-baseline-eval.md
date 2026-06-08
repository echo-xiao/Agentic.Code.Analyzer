# Baseline Eval Report (No Tools)

6/1/2026, 6:27:22 PM | Model: gemini-2.5-flash | Testcases: 34

## Summary

| Metric | Value |
|--------|-------|
| Avg tokens / question | 3,746 |
| Total tokens | 127,358 |
| Tools | NONE |

## Per-Question

| # | ID | Type | Subsystem | Tokens | Words |
|---|---|---|---|------:|------:|
| 1 | tour-04-msg-client | architecture | message chat | 2,767 | 670 |
| 2 | tour-05-msg-server | call-chain | message chat | 3,644 | 630 |
| 3 | tour-06-endpoint | pattern | api | 5,441 | 1162 |
| 4 | tour-07-db-model-create | pattern | database | 5,801 | 1698 |
| 5 | tour-08-db-model-use | pattern | database | 4,024 | 1172 |
| 6 | tour-10-new-service | pattern | services | 5,624 | 1583 |
| 7 | tour-11-new-package | pattern | tooling | 4,081 | 906 |
| 8 | claude-01-push-notifications | architecture | push notifications | 4,124 | 1249 |
| 9 | claude-02-msg-permissions | locate | authorization | 2,481 | 336 |
| 10 | claude-03-file-upload | architecture | file upload | 3,125 | 882 |
| 11 | claude-04-e2e-encryption | architecture | e2e encryption | 3,144 | 972 |
| 12 | claude-05-call-chain | call-chain | message chat | 4,561 | 678 |
| 13 | claude-06-livechat-routing | routing | livechat | 2,815 | 475 |
| 14 | claude-07-api-endpoints | locate | api | 2,895 | 714 |
| 15 | claude-08-federation | routing | federation | 3,674 | 689 |
| 16 | new-09-realtime-streamer | architecture | streamer | 2,954 | 723 |
| 17 | new-10-apps-engine | architecture | apps engine | 4,342 | 847 |
| 18 | new-11-settings | architecture | settings | 3,579 | 1029 |
| 19 | new-12-ldap-auth | routing | authentication | 3,852 | 1014 |
| 20 | new-13-room-creation | call-chain | rooms | 3,409 | 748 |
| 21 | new-14-ee-license | locate | ee licensing | 3,305 | 817 |
| 22 | new-15-impact-aftersave | impact | message chat | 3,317 | 831 |
| 23 | new-16-impact-streamer | impact | streamer | 3,101 | 698 |
| 24 | new-17-slash-commands | pattern | slash commands | 3,029 | 800 |
| 25 | new-18-webhook | routing | integrations | 3,795 | 913 |
| 26 | new-19-message-rendering | architecture | message rendering | 3,987 | 964 |
| 27 | new-20-proxify | locate | core-services | 3,208 | 876 |
| 28 | new-21-impact-settings | impact | settings | 2,722 | 646 |
| 29 | new-22-2fa | architecture | 2fa | 5,144 | 1555 |
| 30 | new-23-omnichannel | call-chain | omnichannel | 3,538 | 831 |
| 31 | new-24-autotranslate | locate | autotranslate | 3,793 | 763 |
| 32 | new-25-search | locate | search | 3,751 | 913 |
| 33 | new-26-team | locate | team | 4,342 | 1183 |
| 34 | new-27-video-conference | locate | video conference | 3,989 | 1095 |