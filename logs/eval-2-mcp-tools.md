# Layer 1 — Tool Eval Report

6/29/2026, 6:55:32 PM

## Summary: 29/34 passed

| Metric | Average |
|--------|---------|
| File recall (search, substring) | 97.1% |
| Symbol recall (search, substring) | 100.0% |
| Graph reachability | 100.0% |
| **Precision@5** (primary query) | 24.1% |
| **Recall@5 / @10 / @20** | 40.0% / 41.2% / 43.7% |
| **MRR** (core files) | 0.336 |
| **F1@5** | 28.6% |
| **Chain order LCS** (ordered Qs: 17, report-only) | 78.7% |

## Per-Testcase Results

| # | ID | Subsystem | Files | Symbols | Graph | Pass |
|---|---|---|---|---|---|---|
| 1 | tour-04-msg-client | message chat | 6/6 | 5/5 | 6/6 | PASS |
| 2 | new-19-message-rendering | message rendering | 6/6 | 4/4 | 2/2 | PASS |
| 3 | claude-01-push-notifications | push notifications | 6/6 | 5/5 | 6/6 | PASS |
| 4 | new-09-realtime-streamer | streamer | 5/5 | 4/4 | 5/5 | PASS |
| 5 | tour-05-msg-server | message chat | 6/6 | 3/3 | 5/5 | PASS |
| 6 | claude-05-call-chain | message chat | 6/6 | 8/8 | 8/8 | PASS |
| 7 | new-24-autotranslate | autotranslate | 6/6 | 2/2 | 3/3 | PASS |
| 8 | new-15-impact-aftersave | message chat | 6/6 | 4/4 | 3/3 | PASS |
| 9 | new-16-impact-streamer | streamer | 5/5 | 5/5 | 3/3 | PASS |
| 10 | claude-08-federation | federation | 6/6 | 5/5 | 4/4 | PASS |
| 11 | new-18-webhook | integrations | 6/6 | 3/3 | 3/3 | PASS |
| 12 | claude-07-api-endpoints | api | 5/6 | 5/5 | 7/7 | **FAIL** |
| 13 | new-25-search | search | 6/6 | 3/3 | 3/3 | PASS |
| 14 | new-27-video-conference | video conference | 6/6 | 2/2 | - | PASS |
| 15 | tour-06-endpoint | api | 4/6 | 4/4 | 2/2 | **FAIL** |
| 16 | new-17-slash-commands | slash commands | 6/6 | 2/2 | 4/4 | PASS |
| 17 | new-11-settings | settings | 6/6 | 3/3 | 3/3 | PASS |
| 18 | claude-03-file-upload | file upload | 6/6 | 6/6 | 3/3 | PASS |
| 19 | new-10-apps-engine | apps engine | 5/6 | 5/5 | 5/5 | **FAIL** |
| 20 | new-20-proxify | core-services | 6/6 | 4/4 | 3/3 | PASS |
| 21 | tour-07-db-model-create | database | 6/6 | 3/3 | 2/2 | PASS |
| 22 | tour-08-db-model-use | database | 6/6 | 2/2 | 2/2 | PASS |
| 23 | tour-11-new-package | tooling | 5/5 | 1/1 | - | PASS |
| 24 | tour-10-new-service | services | 6/6 | 4/4 | 4/4 | PASS |
| 25 | new-21-impact-settings | settings | 5/5 | 3/3 | 3/3 | PASS |
| 26 | new-22-2fa | 2fa | 6/6 | 4/4 | 4/4 | PASS |
| 27 | claude-04-e2e-encryption | e2e encryption | 6/6 | 6/6 | 5/5 | PASS |
| 28 | new-12-ldap-auth | authentication | 5/6 | 4/4 | 4/4 | **FAIL** |
| 29 | claude-02-msg-permissions | authorization | 6/6 | 4/4 | 4/4 | PASS |
| 30 | new-14-ee-license | ee licensing | 6/6 | 5/5 | 3/3 | PASS |
| 31 | new-13-room-creation | rooms | 6/6 | 3/3 | 3/3 | PASS |
| 32 | new-23-omnichannel | omnichannel | 5/6 | 4/4 | 3/3 | **FAIL** |
| 33 | claude-06-livechat-routing | livechat | 6/6 | 6/6 | 6/6 | PASS |
| 34 | new-26-team | team | 6/6 | 2/2 | - | PASS |
## Retrieval Ranking (primary query → search top-50)

| # | ID | Query | P@5 | R@5 | R@10 | R@20 | MRR | Diagnosis |
|---|---|---|----:|----:|----:|----:|----:|---|
| 1 | tour-04-msg-client | `RoomBody` | 20% | 17% | 17% | 17% | 0.17 | recall-miss |
| 2 | new-19-message-rendering | `parse` | 20% | 50% | 50% | 50% | 0.50 | recall-miss |
| 3 | claude-01-push-notifications | `sendAllNotifications` | 20% | 17% | 17% | 17% | 0.17 | recall-miss |
| 4 | new-09-realtime-streamer | `notifyOnMessageChange` | 20% | 20% | 20% | 20% | 0.20 | recall-miss |
| 5 | tour-05-msg-server | `ChatAPI` | 20% | 20% | 20% | 20% | 0.10 | recall-miss |
| 6 | claude-05-call-chain | `sendMessage` | 0% | 0% | 0% | 50% | 0.04 | mixed |
| 7 | new-24-autotranslate | `TranslationProviderRegistry` | 20% | 67% | 67% | 67% | 0.67 | recall-miss |
| 8 | new-15-impact-aftersave | `afterSaveMessage` | 20% | 33% | 33% | 33% | 0.11 | recall-miss |
| 9 | new-16-impact-streamer | `Streamer` | 40% | 33% | 33% | 67% | 0.11 | mixed |
| 10 | claude-08-federation | `FederationMatrix` | 20% | 50% | 50% | 50% | 0.25 | recall-miss |
| 11 | new-18-webhook | `executeIntegrationRest` | 20% | 33% | 33% | 33% | 0.33 | recall-miss |
| 12 | claude-07-api-endpoints | `createApi` | 20% | 14% | 14% | 14% | 0.14 | recall-miss |
| 13 | new-25-search | `SearchProviderService` | 40% | 33% | 33% | 33% | 0.33 | recall-miss |
| 14 | new-27-video-conference | `VideoConfService` | 40% | 100% | 100% | 100% | 1.00 | ok |
| 15 | tour-06-endpoint | `APIClass` | 40% | 50% | 50% | 50% | 0.25 | recall-miss |
| 16 | new-17-slash-commands | `slashCommands` | 20% | 25% | 25% | 25% | 0.25 | recall-miss |
| 17 | new-11-settings | `SettingsRegistry` | 20% | 33% | 33% | 33% | 0.33 | recall-miss |
| 18 | claude-03-file-upload | `uploadFiles` | 40% | 33% | 33% | 33% | 0.17 | recall-miss |
| 19 | new-10-apps-engine | `AppManager` | 20% | 20% | 60% | 60% | 0.24 | mixed |
| 20 | new-20-proxify | `proxify` | 20% | 33% | 33% | 33% | 0.17 | recall-miss |
| 21 | tour-07-db-model-create | `MessagesRaw` | 20% | 50% | 50% | 50% | 0.50 | recall-miss |
| 22 | tour-08-db-model-use | `loadHistory` | 60% | 100% | 100% | 100% | 0.29 | ok |
| 23 | tour-11-new-package | `hashLoginToken` | 20% | 100% | 100% | 100% | 1.00 | ok |
| 24 | tour-10-new-service | `RoomService` | 40% | 100% | 100% | 100% | 1.00 | ok |
| 25 | new-21-impact-settings | `CachedSettings` | 20% | 33% | 33% | 33% | 0.33 | recall-miss |
| 26 | new-22-2fa | `checkCodeForUser` | 20% | 25% | 25% | 25% | 0.25 | recall-miss |
| 27 | claude-04-e2e-encryption | `createAndLoadKeys` | 20% | 20% | 20% | 20% | 0.20 | recall-miss |
| 28 | new-12-ldap-auth | `configureLDAP` | 20% | 25% | 25% | 25% | 0.25 | recall-miss |
| 29 | claude-02-msg-permissions | `executeSendMessage` | 20% | 25% | 25% | 25% | 0.25 | recall-miss |
| 30 | new-14-ee-license | `LicenseManager` | 20% | 33% | 33% | 33% | 0.17 | recall-miss |
| 31 | new-13-room-creation | `createChannelMethod` | 20% | 33% | 33% | 33% | 0.33 | recall-miss |
| 32 | new-23-omnichannel | `OmnichannelService` | 20% | 33% | 33% | 33% | 0.33 | recall-miss |
| 33 | claude-06-livechat-routing | `LivechatClientImpl` | 0% | 0% | 0% | 0% | 0.00 | recall-miss |
| 34 | new-26-team | `TeamService` | 40% | 100% | 100% | 100% | 1.00 | ok |

### Truncation diagnosis summary
| Diagnosis | Count | Action |
|-----------|------:|--------|
| recall-miss | 26 | absent from top-50 → fix matching (threshold / split / hints) |
| mixed | 3 | both ranking + matching issues |
| ok | 5 | core files in top-5 — no change |

## Chain Order (LCS — ordered questions only, report-only, not a pass gate)

| # | ID | Chain | LCS | Order | Observed order |
|---|---|----:|----:|----:|---|
| 1 | tour-04-msg-client | 6 | 5 | 83% | RoomBody → ComposerContainer → onSend → sendMessage → handleSendMessage → ChatAPI |
| 2 | new-19-message-rendering | 2 | 2 | 100% | parse → Markup |
| 3 | claude-01-push-notifications | 6 | 4 | 67% | sendAllNotifications → shouldNotifyMobile → NotificationQueue → PushClass |
| 4 | new-09-realtime-streamer | 5 | 4 | 80% | notifyOnMessageChange → streamRoomMessage → Streamer → Streamer → listeners |
| 5 | tour-05-msg-server | 5 | 3 | 60% | sendMessage → sendMessage → ChatAPI → ChatMessages → executeSendMessage |
| 6 | claude-05-call-chain | 8 | 6 | 75% | sendMessage → sendMessage → sendMessage → executeSendMessage → canSendMessageAsync → validateRoomMessagePermissionsAsync → validateMessage → afterSaveMessage |
| 10 | claude-08-federation | 4 | 3 | 75% | FederationMatrix → sendMessage → processIncomingTransaction |
| 11 | new-18-webhook | 3 | 2 | 67% | executeIntegrationRest → processWebhookMessage → triggerHandler |
| 17 | new-11-settings | 3 | 3 | 100% | SettingsRegistry → CachedSettings → public-settings/get |
| 18 | claude-03-file-upload | 3 | 2 | 67% | uploadFiles → FileUploadClass → roomsMedia |
| 19 | new-10-apps-engine | 5 | 3 | 60% | AppListenerManager → executeListener → AppManager → AppInterface |
| 26 | new-22-2fa | 4 | 3 | 75% | twoFactorRequired → checkCodeForUser → TOTPCheck → EmailCheck |
| 27 | claude-04-e2e-encryption | 5 | 4 | 80% | createAndLoadKeys → createGroupKey → Keychain → generate |
| 28 | new-12-ldap-auth | 4 | 4 | 100% | configureLDAP → LDAPService → LDAPManager → LDAPConnection |
| 31 | new-13-room-creation | 3 | 3 | 100% | createChannelMethod → createRoom → RoomService |
| 32 | new-23-omnichannel | 3 | 3 | 100% | OmnichannelService → OmnichannelQueue → closeRoom |
| 33 | claude-06-livechat-routing | 6 | 3 | 50% | requestRoom → delegateInquiry → takeInquiry → LivechatClientImpl → widget → createRoom |


## Failures

### claude-07-api-endpoints — api

**Q:** How are new endpoints registered in the REST API in Rocket.Chat?

**Missed files (search):**
- `apps/meteor/app/api/server/definition.ts`

### tour-06-endpoint — api

**Q:** How do you create a new REST API endpoint in Rocket.Chat?

**Missed files (search):**
- `apps/meteor/app/api/server/router.ts`
- `apps/meteor/app/api/server/middlewares/permissions.ts`

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
