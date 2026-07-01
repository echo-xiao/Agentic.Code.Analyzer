# Layer 1 — Tool Eval Report

7/1/2026, 12:19:09 AM

## Summary: 24/34 passed

> Gate = **sanity** (substring recall, near-100% by construction — a floor, not a score) 
> **AND retrieval** (a single realistic query surfaces ≥30% of core files in top-10) 
> **AND order** (ordered Qs only: graph(down) recovers ≥60% of the chain in causal order).

| Gate | Pass |
|---|---:|
| Sanity (substring recall) | 32/34 |
| **Retrieval (single-query R@10 ≥ 0.3)** | **25/34** |
| **Chain order (LCS ≥ 60%, ordered Qs)** | **16/17** |
| Combined | 24/34 |

| Metric | Average |
|--------|---------|
| File recall (search, substring) | 99.0% |
| Symbol recall (search, substring) | 100.0% |
| Graph reachability | 100.0% |
| **Precision@5** (primary query) | 27.6% |
| **Recall@5 / @10 / @20** | 42.8% / 50.3% / 58.4% |
| **MRR** (core files) | 0.311 |
| **F1@5** | 32.0% |
| **Chain order LCS** (ordered Qs: 17, gate ≥ 60%) | 78.7% |

## Per-Testcase Results

| # | ID | Subsystem | Files | Symbols | Graph | R@10 | Retr | Pass |
|---|---|---|---|---|---|---:|---|---|
| 1 | tour-04-msg-client | message chat | 6/6 | 5/5 | 6/6 | 17% | ❌ | **FAIL** |
| 2 | new-19-message-rendering | message rendering | 6/6 | 4/4 | 2/2 | 0% | ❌ | **FAIL** |
| 3 | claude-01-push-notifications | push notifications | 6/6 | 5/5 | 6/6 | 17% | ❌ | **FAIL** |
| 4 | new-09-realtime-streamer | streamer | 5/5 | 4/4 | 5/5 | 20% | ❌ | **FAIL** |
| 5 | tour-05-msg-server | message chat | 6/6 | 3/3 | 5/5 | 20% | ❌ | **FAIL** |
| 6 | claude-05-call-chain | message chat | 6/6 | 8/8 | 8/8 | 38% | ✅ | PASS |
| 7 | new-24-autotranslate | autotranslate | 6/6 | 2/2 | 3/3 | 67% | ✅ | PASS |
| 8 | new-15-impact-aftersave | message chat | 6/6 | 4/4 | 3/3 | 33% | ✅ | PASS |
| 9 | new-16-impact-streamer | streamer | 5/5 | 5/5 | 3/3 | 67% | ✅ | PASS |
| 10 | claude-08-federation | federation | 6/6 | 5/5 | 4/4 | 50% | ✅ | PASS |
| 11 | new-18-webhook | integrations | 6/6 | 3/3 | 3/3 | 33% | ✅ | PASS |
| 12 | claude-07-api-endpoints | api | 5/6 | 5/5 | 7/7 | 14% | ❌ | **FAIL** |
| 13 | new-25-search | search | 6/6 | 3/3 | 3/3 | 33% | ✅ | PASS |
| 14 | new-27-video-conference | video conference | 6/6 | 2/2 | - | 100% | ✅ | PASS |
| 15 | tour-06-endpoint | api | 5/6 | 4/4 | 2/2 | 50% | ✅ | **FAIL** |
| 16 | new-17-slash-commands | slash commands | 6/6 | 2/2 | 4/4 | 25% | ❌ | **FAIL** |
| 17 | new-11-settings | settings | 6/6 | 3/3 | 3/3 | 33% | ✅ | PASS |
| 18 | claude-03-file-upload | file upload | 6/6 | 6/6 | 3/3 | 33% | ✅ | PASS |
| 19 | new-10-apps-engine | apps engine | 6/6 | 5/5 | 5/5 | 60% | ✅ | PASS |
| 20 | new-20-proxify | core-services | 6/6 | 4/4 | 3/3 | 33% | ✅ | PASS |
| 21 | tour-07-db-model-create | database | 6/6 | 3/3 | 2/2 | 100% | ✅ | PASS |
| 22 | tour-08-db-model-use | database | 6/6 | 2/2 | 2/2 | 100% | ✅ | PASS |
| 23 | tour-11-new-package | tooling | 5/5 | 1/1 | - | 100% | ✅ | PASS |
| 24 | tour-10-new-service | services | 6/6 | 4/4 | 4/4 | 100% | ✅ | PASS |
| 25 | new-21-impact-settings | settings | 5/5 | 3/3 | 3/3 | 67% | ✅ | PASS |
| 26 | new-22-2fa | 2fa | 6/6 | 4/4 | 4/4 | 100% | ✅ | PASS |
| 27 | claude-04-e2e-encryption | e2e encryption | 6/6 | 6/6 | 5/5 | 60% | ✅ | PASS |
| 28 | new-12-ldap-auth | authentication | 6/6 | 4/4 | 4/4 | 50% | ✅ | PASS |
| 29 | claude-02-msg-permissions | authorization | 6/6 | 4/4 | 4/4 | 25% | ❌ | **FAIL** |
| 30 | new-14-ee-license | ee licensing | 6/6 | 5/5 | 3/3 | 67% | ✅ | PASS |
| 31 | new-13-room-creation | rooms | 6/6 | 3/3 | 3/3 | 67% | ✅ | PASS |
| 32 | new-23-omnichannel | omnichannel | 6/6 | 4/4 | 3/3 | 33% | ✅ | PASS |
| 33 | claude-06-livechat-routing | livechat | 6/6 | 6/6 | 6/6 | 0% | ❌ | **FAIL** |
| 34 | new-26-team | team | 6/6 | 2/2 | - | 100% | ✅ | PASS |
## Retrieval Ranking (primary query → search top-50)

| # | ID | Query | P@5 | R@5 | R@10 | R@20 | MRR | Diagnosis |
|---|---|---|----:|----:|----:|----:|----:|---|
| 1 | tour-04-msg-client | `RoomBody` | 20% | 17% | 17% | 17% | 0.08 | recall-miss |
| 2 | new-19-message-rendering | `parse` | 0% | 0% | 0% | 50% | 0.04 | mixed |
| 3 | claude-01-push-notifications | `sendAllNotifications` | 20% | 17% | 17% | 17% | 0.08 | recall-miss |
| 4 | new-09-realtime-streamer | `notifyOnMessageChange` | 20% | 20% | 20% | 20% | 0.20 | recall-miss |
| 5 | tour-05-msg-server | `ChatAPI` | 20% | 20% | 20% | 20% | 0.10 | mixed |
| 6 | claude-05-call-chain | `sendMessage` | 20% | 25% | 38% | 50% | 0.09 | mixed |
| 7 | new-24-autotranslate | `TranslationProviderRegistry` | 20% | 67% | 67% | 67% | 0.67 | recall-miss |
| 8 | new-15-impact-aftersave | `afterSaveMessage` | 20% | 33% | 33% | 67% | 0.14 | ranked-low |
| 9 | new-16-impact-streamer | `Streamer` | 40% | 33% | 67% | 67% | 0.37 | mixed |
| 10 | claude-08-federation | `FederationMatrix` | 20% | 50% | 50% | 50% | 0.13 | recall-miss |
| 11 | new-18-webhook | `executeIntegrationRest` | 20% | 33% | 33% | 67% | 0.37 | ranked-low |
| 12 | claude-07-api-endpoints | `createApi` | 20% | 14% | 14% | 57% | 0.17 | mixed |
| 13 | new-25-search | `SearchProviderService` | 40% | 33% | 33% | 33% | 0.17 | recall-miss |
| 14 | new-27-video-conference | `VideoConfService` | 40% | 100% | 100% | 100% | 1.00 | ok |
| 15 | tour-06-endpoint | `APIClass` | 40% | 50% | 50% | 50% | 0.25 | recall-miss |
| 16 | new-17-slash-commands | `slashCommands` | 20% | 25% | 25% | 25% | 0.25 | recall-miss |
| 17 | new-11-settings | `SettingsRegistry` | 20% | 33% | 33% | 67% | 0.36 | mixed |
| 18 | claude-03-file-upload | `uploadFiles` | 40% | 33% | 33% | 33% | 0.10 | mixed |
| 19 | new-10-apps-engine | `AppManager` | 20% | 20% | 60% | 60% | 0.12 | mixed |
| 20 | new-20-proxify | `proxify` | 20% | 33% | 33% | 33% | 0.17 | recall-miss |
| 21 | tour-07-db-model-create | `MessagesRaw` | 60% | 100% | 100% | 100% | 0.60 | ok |
| 22 | tour-08-db-model-use | `loadHistory` | 60% | 100% | 100% | 100% | 0.42 | ok |
| 23 | tour-11-new-package | `hashLoginToken` | 20% | 100% | 100% | 100% | 0.50 | ok |
| 24 | tour-10-new-service | `RoomService` | 40% | 100% | 100% | 100% | 0.50 | ok |
| 25 | new-21-impact-settings | `CachedSettings` | 40% | 67% | 67% | 67% | 0.50 | recall-miss |
| 26 | new-22-2fa | `checkCodeForUser` | 60% | 50% | 100% | 100% | 0.39 | ranked-low |
| 27 | claude-04-e2e-encryption | `createAndLoadKeys` | 40% | 40% | 60% | 80% | 0.34 | mixed |
| 28 | new-12-ldap-auth | `configureLDAP` | 40% | 50% | 50% | 50% | 0.38 | recall-miss |
| 29 | claude-02-msg-permissions | `executeSendMessage` | 20% | 25% | 25% | 75% | 0.30 | ranked-low |
| 30 | new-14-ee-license | `LicenseManager` | 20% | 33% | 67% | 67% | 0.38 | ranked-low |
| 31 | new-13-room-creation | `createChannelMethod` | 20% | 33% | 67% | 67% | 0.38 | mixed |
| 32 | new-23-omnichannel | `OmnichannelService` | 0% | 0% | 33% | 33% | 0.06 | mixed |
| 33 | claude-06-livechat-routing | `LivechatClientImpl` | 0% | 0% | 0% | 0% | 0.00 | recall-miss |
| 34 | new-26-team | `TeamService` | 40% | 100% | 100% | 100% | 1.00 | ok |

### Truncation diagnosis summary
| Diagnosis | Count | Meaning |
|-----------|------:|--------|
| recall-miss | 12 | absent from top-50 |
| mixed | 11 | both ranking + matching issues |
| ranked-low | 5 | in top-50 but ranked >5 |
| ok | 6 | core files in top-5 |

## Chain Order (LCS — ordered questions only, pass gate ≥ 60%)

| # | ID | Chain | LCS | Order | Gate | Observed order |
|---|---|----:|----:|----:|---|---|
| 1 | tour-04-msg-client | 6 | 5 | 83% | ✅ | RoomBody → ComposerContainer → onSend → sendMessage → handleSendMessage → ChatAPI |
| 2 | new-19-message-rendering | 2 | 2 | 100% | ✅ | parse → Markup |
| 3 | claude-01-push-notifications | 6 | 4 | 67% | ✅ | sendAllNotifications → shouldNotifyMobile → NotificationQueue → PushClass |
| 4 | new-09-realtime-streamer | 5 | 4 | 80% | ✅ | notifyOnMessageChange → streamRoomMessage → Streamer → Streamer → listeners |
| 5 | tour-05-msg-server | 5 | 3 | 60% | ✅ | sendMessage → sendMessage → ChatAPI → ChatMessages → executeSendMessage |
| 6 | claude-05-call-chain | 8 | 6 | 75% | ✅ | sendMessage → sendMessage → sendMessage → executeSendMessage → canSendMessageAsync → validateRoomMessagePermissionsAsync → validateMessage → afterSaveMessage |
| 10 | claude-08-federation | 4 | 3 | 75% | ✅ | FederationMatrix → sendMessage → processIncomingTransaction |
| 11 | new-18-webhook | 3 | 2 | 67% | ✅ | executeIntegrationRest → processWebhookMessage → triggerHandler |
| 17 | new-11-settings | 3 | 3 | 100% | ✅ | SettingsRegistry → CachedSettings → public-settings/get |
| 18 | claude-03-file-upload | 3 | 2 | 67% | ✅ | uploadFiles → FileUploadClass → roomsMedia |
| 19 | new-10-apps-engine | 5 | 3 | 60% | ✅ | AppListenerManager → executeListener → AppManager → AppInterface |
| 26 | new-22-2fa | 4 | 3 | 75% | ✅ | twoFactorRequired → checkCodeForUser → TOTPCheck → EmailCheck |
| 27 | claude-04-e2e-encryption | 5 | 4 | 80% | ✅ | createAndLoadKeys → createGroupKey → Keychain → generate |
| 28 | new-12-ldap-auth | 4 | 4 | 100% | ✅ | configureLDAP → LDAPService → LDAPManager → LDAPConnection |
| 31 | new-13-room-creation | 3 | 3 | 100% | ✅ | createChannelMethod → createRoom → RoomService |
| 32 | new-23-omnichannel | 3 | 3 | 100% | ✅ | OmnichannelService → OmnichannelQueue → closeRoom |
| 33 | claude-06-livechat-routing | 6 | 3 | 50% | ❌ | requestRoom → delegateInquiry → takeInquiry → LivechatClientImpl → widget → createRoom |


## Failures

### tour-04-msg-client — message chat

**Q:** How is a message sent on the client side in Rocket.Chat?

### new-19-message-rendering — message rendering

**Q:** How is a message rendered from raw text to React components in Rocket.Chat?

### claude-01-push-notifications — push notifications

**Q:** How do push notifications work in Rocket.Chat?

### new-09-realtime-streamer — streamer

**Q:** How does a new message appear in real-time on the client after being saved to the database?

### tour-05-msg-server — message chat

**Q:** How is a message sent on the server side in Rocket.Chat?

### claude-07-api-endpoints — api

**Q:** How are new endpoints registered in the REST API in Rocket.Chat?

**Missed files (search):**
- `apps/meteor/app/api/server/definition.ts`

### tour-06-endpoint — api

**Q:** How do you create a new REST API endpoint in Rocket.Chat?

**Missed files (search):**
- `apps/meteor/app/api/server/middlewares/permissions.ts`

### new-17-slash-commands — slash commands

**Q:** How do slash commands work in Rocket.Chat — from registration to execution?

### claude-02-msg-permissions — authorization

**Q:** Where is the logic for message permission validation located?

### claude-06-livechat-routing — livechat

**Q:** How are Livechat requests routed to the server-side in Rocket.Chat?

**Chain order below gate (50% < 60%):**
- expected: LivechatClientImpl → widget → createRoom → requestRoom → delegateInquiry → takeInquiry
- observed: requestRoom → delegateInquiry → takeInquiry → LivechatClientImpl → widget → createRoom
