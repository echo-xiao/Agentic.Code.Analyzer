# Layer 1 — Tool Eval Report

6/8/2026, 11:04:29 AM

## Summary: 25/34 passed

| Metric | Average |
|--------|---------|
| File recall (search) | 94.6% |
| Symbol recall (search) | 100.0% |
| Graph reachability | 100.0% |

## Per-Testcase Results

| # | ID | Subsystem | Files | Symbols | Graph | Pass |
|---|---|---|---|---|---|---|
| 1 | tour-04-msg-client | message chat | 6/6 | 5/5 | 6/6 | PASS |
| 2 | tour-05-msg-server | message chat | 6/6 | 3/3 | 5/5 | PASS |
| 3 | tour-06-endpoint | api | 3/6 | 4/4 | 2/2 | **FAIL** |
| 4 | tour-07-db-model-create | database | 5/6 | 3/3 | 2/2 | **FAIL** |
| 5 | tour-08-db-model-use | database | 6/6 | 2/2 | 2/2 | PASS |
| 6 | tour-10-new-service | services | 6/6 | 4/4 | 4/4 | PASS |
| 7 | tour-11-new-package | tooling | 5/5 | 1/1 | - | PASS |
| 8 | claude-01-push-notifications | push notifications | 6/6 | 5/5 | 6/6 | PASS |
| 9 | claude-02-msg-permissions | authorization | 6/6 | 4/4 | 4/4 | PASS |
| 10 | claude-03-file-upload | file upload | 5/6 | 6/6 | 3/3 | **FAIL** |
| 11 | claude-04-e2e-encryption | e2e encryption | 6/6 | 6/6 | 5/5 | PASS |
| 12 | claude-05-call-chain | message chat | 5/6 | 8/8 | 8/8 | **FAIL** |
| 13 | claude-06-livechat-routing | livechat | 5/6 | 6/6 | 6/6 | **FAIL** |
| 14 | claude-07-api-endpoints | api | 5/6 | 5/5 | 7/7 | **FAIL** |
| 15 | claude-08-federation | federation | 6/6 | 5/5 | 4/4 | PASS |
| 16 | new-09-realtime-streamer | streamer | 5/5 | 4/4 | 5/5 | PASS |
| 17 | new-10-apps-engine | apps engine | 5/6 | 5/5 | 5/5 | **FAIL** |
| 18 | new-11-settings | settings | 6/6 | 3/3 | 3/3 | PASS |
| 19 | new-12-ldap-auth | authentication | 5/6 | 4/4 | 4/4 | **FAIL** |
| 20 | new-13-room-creation | rooms | 6/6 | 3/3 | 3/3 | PASS |
| 21 | new-14-ee-license | ee licensing | 6/6 | 5/5 | 3/3 | PASS |
| 22 | new-15-impact-aftersave | message chat | 6/6 | 4/4 | 3/3 | PASS |
| 23 | new-16-impact-streamer | streamer | 5/5 | 5/5 | 3/3 | PASS |
| 24 | new-17-slash-commands | slash commands | 6/6 | 2/2 | 4/4 | PASS |
| 25 | new-18-webhook | integrations | 6/6 | 3/3 | 3/3 | PASS |
| 26 | new-19-message-rendering | message rendering | 6/6 | 4/4 | 2/2 | PASS |
| 27 | new-20-proxify | core-services | 6/6 | 4/4 | 3/3 | PASS |
| 28 | new-21-impact-settings | settings | 5/5 | 3/3 | 3/3 | PASS |
| 29 | new-22-2fa | 2fa | 6/6 | 4/4 | 4/4 | PASS |
| 30 | new-23-omnichannel | omnichannel | 5/6 | 4/4 | 3/3 | **FAIL** |
| 31 | new-24-autotranslate | autotranslate | 6/6 | 2/2 | 3/3 | PASS |
| 32 | new-25-search | search | 6/6 | 3/3 | 3/3 | PASS |
| 33 | new-26-team | team | 6/6 | 2/2 | - | PASS |
| 34 | new-27-video-conference | video conference | 6/6 | 2/2 | - | PASS |

## Failures

### tour-06-endpoint — api

**Q:** How do you create a new REST API endpoint in Rocket.Chat?

**Missed files (search):**
- `apps/meteor/app/api/server/router.ts`
- `apps/meteor/app/api/server/middlewares/permissions.ts`
- `apps/meteor/app/api/server/v1/chat.ts`

### tour-07-db-model-create — database

**Q:** How do you create a new database model in Rocket.Chat?

**Missed files (search):**
- `apps/meteor/server/models.ts`

### claude-03-file-upload — file upload

**Q:** What is the storage workflow for file uploads in Rocket.Chat?

**Missed files (search):**
- `apps/meteor/app/file-upload/server/config/Webdav.ts`

### claude-05-call-chain — message chat

**Q:** What is the complete call chain for sendMessage?

**Missed files (search):**
- `apps/meteor/app/api/server/v1/chat.ts`

### claude-06-livechat-routing — livechat

**Q:** How are Livechat requests routed to the server-side in Rocket.Chat?

**Missed files (search):**
- `packages/livechat/src/widget.ts`

### claude-07-api-endpoints — api

**Q:** How are new endpoints registered in the REST API in Rocket.Chat?

**Missed files (search):**
- `apps/meteor/app/api/server/definition.ts`

### new-10-apps-engine — apps engine

**Q:** How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?

**Missed files (search):**
- `apps/meteor/app/apps/server/bridges/bridges.js`

### new-12-ldap-auth — authentication

**Q:** How does LDAP authentication work in Rocket.Chat?

**Missed files (search):**
- `apps/meteor/server/lib/ldap/Logger.ts`

### new-23-omnichannel — omnichannel

**Q:** How does the Omnichannel queue process and close a livechat conversation?

**Missed files (search):**
- `apps/meteor/app/livechat/server/lib/Helper.ts`
