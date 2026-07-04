# metrics — quantitative pipeline report (no semantic analysis)

7/3/2026, 10:32:06 PM | 34 testcases | deterministic (index + answers + tools-data), NO verdicts. Semantic analysis lives in logs/reports/verdicts.md.

## 1. Value — do the tools help?

| | no-MCP | naive @ same answer size | with MCP |
|---|---:|---:|---:|
| Avg coverage | 14% | 10% | 38% |
| Avg tokens / question | 5,013 | ~30,362 | 30,362 |

**The agent's navigation adds +24 pts over pure LLM, +28 over same-budget keyword dump** — the lift is choosing moves, not just spending tokens.

## 2. The agent funnel — of the same 124 core files, how many the agent surfaces then writes

> Pooled per-file fractions from the ACTUAL multi-turn run (seen-log → written). R@k below is a single-query PROBE (tool ceiling), NOT a stage the agent flows through.

```
INDEX  indexed & reachable     100%  ██████████████████████████████ 
AGENT  surfaced (seen-log)      44%  █████████████░░░░░░░░░░░░░░░░░ <- 56% never surfaced
AGENT  written (answer)         37%  ███████████░░░░░░░░░░░░░░░░░░░ <- synth 84% of surfaced, drops 13
```

**Two agent stages** (÷ 124): not-surfaced 56% (69 files) · surfaced-but-not-written 7% (13 files).
> Single-query probe (tool capability, NOT the agent path): R@5/10/20/50 = 35%/43%/52%/55%. Of "never surfaced": ~45% never rank in top-50 (engine) vs ~10% rank-but-skipped (agent loop).
> Floor: substring recall file 99% / sym 100% · graph reachability 100% · chain-order LCS 57% (17 ordered Qs).

## 3. Auto-triage — mechanical "suspected stage" per testcase (no semantic judgment)

> Front→back, first trip wins, numbers only: search (R@50<30%) → graph (surfaced<50%) → synth (synth<70%); ok if end coverage ≥50%. Flags WHICH question + stage to inspect — the WHY is in verdicts.md. **route (intent≠type) is shown as a column but is NOT a gate** — it's a labeling disagreement with ~0 precision as a failure cause (0/12 semantic failures are misrouted), so it no longer drives the stage.

**Suspected-stage distribution:** ok 15 · graph 10 · synth 5 · search 4.

> Column key: **R@10·diag** = single-query probe recall@10 + diagnosis (rm=recall-miss / rl=ranked-low / mx=mixed / ok). **core ranks** = each core file's rank in that probe; `#2 · 5 miss` = one file ranks #2, the other five never appear at all (engine can't reach them by ranking). Full per-file breakdown in §4. **trace** = the agent's ACTUAL calls in order, one per line, showing what each did: `plan:` intent · `search:` query(·layer) · `graph:`/`graph↓`(down chain)/`graph↑`(up impact) target · `details:` file. **surfaced/synth** = the agent's actual run, not the probe.

| # | id | type | route | R@10·diag | core ranks | surfaced | synth | end cov | trace (agent 实际调用) | suspected stage |
|---|---|---|:-:|---|---|---:|---:|---:|---|---|
| 1 | tour-04-msg-client | arch | ✗ | 17% rm | #2 · 5 miss | 33% | 100% | 2/6 33% | 8 calls ⛔<br>plan: call-chain<br>search: "sendMessage" ·client<br>graph↓: sendMessage ×2<br>wiki<br>details: ComposerMessage.tsx<br>details: sendMessage.ts ×2 | search |
| 2 | new-19-message-rendering | arch | ✗ | 0% mx | #14 · 1 miss | 100% | 100% | 2/2 100% | 8 calls ⛔<br>plan: call-chain<br>wiki<br>search: "Markup" ·packages<br>graph↓: Markup<br>search: "parse" ·packages<br>details: index.tsx<br>search: "MarkdownBlock" ·packages<br>details: index.tsx | ok |
| 3 | claude-01-push-notifications | arch | ✓ | 17% rm | #2 · 5 miss | 0% | 100% | 0/6 0% | 1 calls<br>wiki | search |
| 4 | new-09-realtime-streamer | arch | ✓ | 20% rm | #1 · 4 miss | 20% | 100% | 1/5 20% | 8 calls ⛔<br>plan: architecture<br>wiki<br>search: "afterSaveMessage" ·server<br>graph↓: afterSaveMessage<br>details: notifyListener.ts<br>search: "LegacyRoomManager" ·client<br>details: LegacyRoomManager.ts<br>search: "sdk.stream('room-messages')" ·client | search |
| 5 | tour-05-msg-server | chain | ✓ | 20% mx | #2 · #335 · 3 miss | 60% | 33% | 1/5 20% | 8 calls ⛔<br>plan: call-chain<br>search: "sendMessage" ·server<br>graph↓: sendMessage ×2<br>search: "insert message" ·server<br>search: "Messages.insert" ·server<br>graph↓: insertMessage<br>details: insertMessage.ts | search |
| 6 | claude-05-call-chain | chain | ✓ | 38% mx | #5 · #5 · #6 · #12 · #30 · #30 · 2 miss | 75% | 33% | 2/8 25% | 8 calls ⛔<br>plan: call-chain<br>search: "sendMessage"<br>graph↓: sendMessage ×2<br>details: sendMessage.ts<br>graph↓: sendMessage<br>search: "validateMessage"<br>details: sendMessage.ts | synth |
| 7 | new-24-autotranslate | loc | ✗ | 67% rm | #1 · #1 · 1 miss | 67% | 100% | 2/3 67% | 1 calls<br>wiki | ok |
| 8 | new-15-impact-aftersave | imp | ✓ | 33% rl | #3 · #17 · #68 | 100% | 100% | 3/3 100% | 3 calls<br>plan: impact<br>search: "afterSaveMessage"<br>graph↑: afterSaveMessage | ok |
| 9 | new-16-impact-streamer | imp | ✓ | 67% mx | #1 · #10 · 1 miss | 33% | 100% | 1/3 33% | 4 calls<br>plan: impact<br>search: "Streamer"<br>graph↑: Streamer<br>details: Streamer.ts | graph |
| 10 | claude-08-federation | rout | ✗ | 50% rm | #4 · #4 · 2 miss | 0% | 100% | 0/4 0% | 8 calls ⛔<br>wiki<br>plan: call-chain<br>search: "afterSaveMessage"<br>search: "FederationMatrix.sendMessage"<br>graph↓: afterSaveMessage<br>graph↑: FederationMatrix.sendMessage ×2<br>details: index.ts | graph |
| 11 | new-18-webhook | rout | ✗ | 33% rl | #1 · #12 · #59 | 67% | 50% | 1/3 33% | 8 calls ⛔<br>plan: call-chain<br>wiki<br>search: "processWebhookMessage"<br>graph↓: processWebhookMessage<br>search: "hooks" ·server<br>search: "API endpoint webhook" ·server<br>search: "addIncomingIntegration"<br>search: "/hooks/" ·server | synth |
| 12 | claude-07-api-endpoints | loc | ✗ | 14% mx | #1 · #17 · #17 · #17 · 3 miss | 57% | 100% | 4/7 57% | 8 calls ⛔<br>wiki<br>plan: architecture<br>search: "API.v1.addRoute"<br>search: "APIClass"<br>details: ApiClass.ts<br>search: "API.v1"<br>search: "new APIClass"<br>details: api.ts | ok |
| 13 | new-25-search | loc | ✗ | 33% rm | #2 · 2 miss | 0% | 100% | 0/3 0% | 8 calls ⛔<br>wiki<br>search: "MessageSearchForm" ·client<br>graph↓: MessageSearchForm<br>search: "chat.search" ·server<br>details: chat.ts<br>search: "messageSearch" ·server<br>details: messageSearch.ts<br>details: parseMessageSearchQuery.ts | graph |
| 14 | new-27-video-conference | loc | ✗ | 100% ok | #1 | 0% | 100% | 0/1 0% | 1 calls<br>wiki | graph |
| 15 | tour-06-endpoint | patt | ✓ | 50% rm | #2 · 1 miss | 100% | 50% | 1/2 50% | 4 calls<br>wiki<br>search: "APIClass"<br>search: "API.v1"<br>search: "new APIClass" | ok |
| 16 | new-17-slash-commands | patt | ✗ | 25% rm | #1 · 3 miss | 75% | 100% | 3/4 75% | 8 calls ⛔<br>wiki<br>plan: call-chain<br>search: "slashCommands.add"<br>graph↑: slashCommands.add<br>search: "slashCommands" ·server<br>details: slashCommand.ts<br>search: "processSlashCommand" ·client<br>graph↓: processSlashCommand | ok |
| 17 | new-11-settings | arch | ✓ | 33% mx | #1 · #15 · 1 miss | 33% | 100% | 1/3 33% | 8 calls ⛔<br>wiki<br>search: "settingsRegistry.addGroup"<br>details: index.ts<br>search: "settingsRegistry"<br>details: SettingsRegistry.ts ×2<br>search: "notifyOnSettingChangedById"<br>details: notifyListener.ts | graph |
| 18 | claude-03-file-upload | arch | ✓ | 33% mx | #4 · #26 · 1 miss | 0% | 100% | 2/3 67% | 1 calls<br>wiki | ok |
| 19 | new-10-apps-engine | arch | ✓ | 60% mx | #3 · #8 · #8 · #392 · 1 miss | 20% | 100% | 1/5 20% | 8 calls ⛔<br>wiki<br>search: "AppEvents"<br>search: "IPostMessageSent"<br>search: "afterSaveMessage"<br>details: IPostMessageSent.ts<br>details: events.ts<br>search: "AppInterface"<br>details: AppInterface.ts | graph |
| 20 | new-20-proxify | loc | ✗ | 33% rm | #2 · 2 miss | 67% | 50% | 1/3 33% | 8 calls ⛔<br>wiki<br>search: "proxify" ·packages<br>details: proxify.ts ×2<br>search: "api.call" ·packages<br>search: "api" ·packages<br>details: createMockWizardApi.ts ×2 | synth |
| 21 | tour-07-db-model-create | patt | ✓ | 100% ok | #1 · #5 | 50% | 100% | 1/2 50% | 8 calls ⛔<br>wiki<br>search: "IBaseModel" ·packages<br>search: "BaseRaw" ·packages<br>search: "registerModel"<br>details: IBaseModel.ts<br>details: BaseRaw.ts<br>details: proxify.ts<br>search: "registerModel" ·server | ok |
| 22 | tour-08-db-model-use | patt | ✗ | 100% ok | #2 · #3 | 0% | 100% | 0/2 0% | 1 calls<br>wiki | graph |
| 23 | tour-11-new-package | patt | ✓ | 100% ok | #2 | 100% | 0% | 0/1 0% | 8 calls ⛔<br>plan: pattern<br>search: "package" ·packages<br>details: package.js<br>search: "lerna.json"<br>search: "yarn.lock"<br>search: "create-package"<br>search: "package.json" ·packages<br>details: package.json | synth |
| 24 | tour-10-new-service | patt | ✓ | 100% ok | #2 · #2 · #2 · #2 | 0% | 100% | 0/4 0% | 1 calls<br>wiki | graph |
| 25 | new-21-impact-settings | imp | ✓ | 67% rm | #1 · #2 · 1 miss | 33% | 0% | 0/3 0% | 3 calls<br>plan: impact<br>search: "CachedSettings"<br>graph↑: CachedSettings | graph |
| 26 | new-22-2fa | arch | ✓ | 100% rl | #1 · #4 · #6 · #7 | 50% | 100% | 2/4 50% | 5 calls<br>wiki<br>search: "checkCodeForUser"<br>details: index.ts<br>search: "EmailCheck"<br>details: EmailCheck.ts | ok |
| 27 | claude-04-e2e-encryption | arch | ✗ | 60% mx | #1 · #2 · #8 · #12 · 1 miss | 40% | 100% | 2/5 40% | 8 calls ⛔<br>wiki<br>search: "e2e.setUserPublicAndPrivateKeys"<br>search: "e2e.persistKeys" ·client<br>search: "e2e.setUserPublicAndPrivateKeys" ·client<br>details: rocketchat.e2e.ts<br>search: "class E2E" ·client<br>details: rocketchat.e2e.ts ×2 | graph |
| 28 | new-12-ldap-auth | rout | ✗ | 50% rm | #1 · #2 · 2 miss | 50% | 100% | 2/4 50% | 8 calls ⛔<br>wiki<br>details: Manager.ts ×2<br>search: "LDAPConnection" ·server<br>details: Connection.ts ×2<br>details: Manager.ts<br>details: Connection.ts | ok |
| 29 | claude-02-msg-permissions | loc | ✓ | 25% rl | #1 · #12 · #12 · #35 | 75% | 67% | 2/4 50% | 5 calls<br>plan: locate<br>search: "message permission validation"<br>search: "validateMessage"<br>graph: validateMessage<br>details: canSendMessage.ts | ok |
| 30 | new-14-ee-license | loc | ✗ | 67% rl | #1 · #7 · #643 | 67% | 50% | 1/3 33% | 8 calls ⛔<br>wiki<br>search: "LicenseService" ·ee<br>details: license.internalService.ts<br>search: "License" ·packages<br>search: "License" ·ee<br>details: license.ts<br>search: "engagement-dashboard"<br>search: "hasModule" ·ee | synth |
| 31 | new-13-room-creation | chain | ✓ | 67% mx | #1 · #7 · 1 miss | 67% | 100% | 2/3 67% | 8 calls ⛔<br>plan: call-chain<br>search: "create channel"<br>graph↓: create channel<br>search: "createChannel"<br>graph↓: createChannel<br>details: createChannel.ts<br>graph↓: createRoom<br>details: createRoom.ts | ok |
| 32 | new-23-omnichannel | chain | ✗ | 33% mx | #6 · 2 miss | 67% | 100% | 2/3 67% | 8 calls ⛔<br>wiki<br>search: "OmnichannelQueue" ·server<br>graph↓: OmnichannelQueue<br>details: queue.ts ×4<br>search: "closeRoom" | ok |
| 33 | claude-06-livechat-routing | rout | ✓ | 0% rm | 6 miss | 17% | 100% | 3/6 50% | 8 calls ⛔<br>wiki<br>plan: routing<br>search: "/livechat/room"<br>search: "QueueManager" ·server<br>graph: QueueManager<br>details: QueueManager.ts<br>graph↓: QueueManager.requestRoom<br>search: "requestRoom" ·server | ok |
| 34 | new-26-team | loc | ✗ | 100% ok | #1 | 100% | 100% | 1/1 100% | 3 calls<br>wiki<br>search: "TeamService" ·server<br>details: service.ts | ok |

## 4. Per-core-file probe rank — every core file, its rank or MISS

> §3's `core@probe` expanded: the single-query graph(expand) rank of EACH core file, best-rank first. `MISS` = never appears in the ranked neighborhood at all (engine can't reach it by ranking). A deep rank (#100+) is effectively unreachable — the agent won't page that far.

**tour-04-msg-client** · arch · 1/6 ranked · surfaced 33%
- `#2` apps/meteor/client/views/room/body/RoomBody.tsx
- `MISS` apps/meteor/client/views/room/composer/ComposerContainer.tsx
- `MISS` apps/meteor/client/views/room/composer/ComposerMessage.tsx
- `MISS` apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx
- `MISS` apps/meteor/client/lib/chats/ChatAPI.ts
- `MISS` apps/meteor/client/lib/chats/flows/sendMessage.ts

**new-19-message-rendering** · arch · 1/2 ranked · surfaced 100%
- `#14` packages/message-parser/src/index.ts
- `MISS` packages/gazzodown/src/Markup.tsx

**claude-01-push-notifications** · arch · 1/6 ranked · surfaced 0%
- `#2` apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts
- `MISS` apps/meteor/app/lib/server/functions/notifications/mobile.js
- `MISS` apps/meteor/app/notification-queue/server/NotificationQueue.ts
- `MISS` apps/meteor/app/push/server/push.ts
- `MISS` apps/meteor/app/push/server/apn.ts
- `MISS` apps/meteor/app/push/server/fcm.ts

**new-09-realtime-streamer** · arch · 1/5 ranked · surfaced 20%
- `#1` apps/meteor/app/lib/server/lib/notifyListener.ts
- `MISS` apps/meteor/server/modules/listeners/listeners.module.ts
- `MISS` apps/meteor/server/modules/notifications/notifications.module.ts
- `MISS` apps/meteor/server/modules/streamer/streamer.module.ts
- `MISS` apps/meteor/client/lib/streamer/streamer.ts

**tour-05-msg-server** · chain · 2/5 ranked · surfaced 60%
- `#2` apps/meteor/client/lib/chats/ChatAPI.ts
- `#335` apps/meteor/app/ui/client/lib/ChatMessages.ts
- `MISS` apps/meteor/app/lib/server/methods/sendMessage.ts
- `MISS` apps/meteor/app/lib/server/functions/sendMessage.ts
- `MISS` apps/meteor/app/lib/client/methods/sendMessage.ts

**claude-05-call-chain** · chain · 6/8 ranked · surfaced 75%
- `#5` apps/meteor/app/lib/server/functions/sendMessage.ts
- `#5` apps/meteor/app/lib/server/functions/sendMessage.ts
- `#6` apps/meteor/app/lib/server/methods/sendMessage.ts
- `#12` apps/meteor/client/lib/chats/flows/sendMessage.ts
- `#30` apps/meteor/app/authorization/server/functions/canSendMessage.ts
- `#30` apps/meteor/app/authorization/server/functions/canSendMessage.ts
- `MISS` apps/meteor/app/api/server/v1/chat.ts
- `MISS` apps/meteor/app/lib/server/lib/afterSaveMessage.ts

**new-24-autotranslate** · loc · 2/3 ranked · surfaced 67%
- `#1` apps/meteor/app/autotranslate/server/autotranslate.ts
- `#1` apps/meteor/app/autotranslate/server/autotranslate.ts
- `MISS` apps/meteor/app/autotranslate/server/googleTranslate.ts

**new-15-impact-aftersave** · imp · 3/3 ranked · surfaced 100%
- `#3` apps/meteor/app/lib/server/lib/afterSaveMessage.ts
- `#17` apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts
- `#68` apps/meteor/app/lib/server/functions/sendMessage.ts

**new-16-impact-streamer** · imp · 2/3 ranked · surfaced 33%
- `#1` apps/meteor/server/modules/streamer/streamer.module.ts
- `#10` apps/meteor/server/modules/notifications/notifications.module.ts
- `MISS` apps/meteor/server/modules/listeners/listeners.module.ts

**claude-08-federation** · rout · 2/4 ranked · surfaced 0%
- `#4` ee/packages/federation-matrix/src/FederationMatrix.ts
- `#4` ee/packages/federation-matrix/src/FederationMatrix.ts
- `MISS` ee/packages/federation-matrix/src/api/_matrix/transactions.ts
- `MISS` ee/packages/federation-matrix/src/events/message.ts

**new-18-webhook** · rout · 3/3 ranked · surfaced 67%
- `#1` apps/meteor/app/integrations/server/api/api.ts
- `#12` apps/meteor/app/integrations/server/lib/triggerHandler.ts
- `#59` apps/meteor/app/lib/server/functions/processWebhookMessage.ts

**claude-07-api-endpoints** · loc · 4/7 ranked · surfaced 57%
- `#1` apps/meteor/app/api/server/api.ts
- `#17` apps/meteor/app/api/server/ApiClass.ts
- `#17` apps/meteor/app/api/server/ApiClass.ts
- `#17` apps/meteor/app/api/server/ApiClass.ts
- `MISS` apps/meteor/app/api/server/router.ts
- `MISS` apps/meteor/app/api/server/middlewares/authenticationHono.ts
- `MISS` apps/meteor/app/api/server/middlewares/permissions.ts

**new-25-search** · loc · 1/3 ranked · surfaced 0%
- `#2` apps/meteor/app/search/server/service/SearchProviderService.ts
- `MISS` apps/meteor/app/search/server/model/SearchProvider.ts
- `MISS` apps/meteor/app/search/server/provider/DefaultProvider.ts

**new-27-video-conference** · loc · 1/1 ranked · surfaced 0%
- `#1` apps/meteor/server/services/video-conference/service.ts

**tour-06-endpoint** · patt · 1/2 ranked · surfaced 100%
- `#2` apps/meteor/app/api/server/api.ts
- `MISS` apps/meteor/app/api/server/v1/chat.ts

**new-17-slash-commands** · patt · 1/4 ranked · surfaced 75%
- `#1` apps/meteor/app/utils/server/slashCommand.ts
- `MISS` apps/meteor/client/lib/chats/flows/sendMessage.ts
- `MISS` apps/meteor/client/lib/chats/flows/processSlashCommand.ts
- `MISS` apps/meteor/app/slashcommands-invite/server/server.ts

**new-11-settings** · arch · 2/3 ranked · surfaced 33%
- `#1` apps/meteor/app/settings/server/SettingsRegistry.ts
- `#15` apps/meteor/app/settings/server/CachedSettings.ts
- `MISS` apps/meteor/server/publications/settings/index.ts

**claude-03-file-upload** · arch · 2/3 ranked · surfaced 0%
- `#4` apps/meteor/client/lib/chats/flows/uploadFiles.ts
- `#26` apps/meteor/app/file-upload/server/lib/FileUpload.ts
- `MISS` apps/meteor/app/api/server/v1/rooms.ts

**new-10-apps-engine** · arch · 4/5 ranked · surfaced 20%
- `#3` packages/apps-engine/src/server/AppManager.ts
- `#8` packages/apps-engine/src/server/managers/AppListenerManager.ts
- `#8` packages/apps-engine/src/server/managers/AppListenerManager.ts
- `#392` apps/meteor/app/apps/server/bridges/listeners.ts
- `MISS` packages/apps-engine/src/definition/metadata/AppInterface.ts

**new-20-proxify** · loc · 1/3 ranked · surfaced 67%
- `#2` packages/core-services/src/lib/proxify.ts
- `MISS` packages/core-services/src/LocalBroker.ts
- `MISS` packages/core-services/src/types/ServiceClass.ts

**tour-07-db-model-create** · patt · 2/2 ranked · surfaced 50%
- `#1` packages/models/src/models/Messages.ts
- `#5` apps/meteor/server/models.ts

**tour-08-db-model-use** · patt · 2/2 ranked · surfaced 0%
- `#2` apps/meteor/app/lib/server/functions/loadMessageHistory.ts
- `#3` apps/meteor/server/methods/loadHistory.ts

**tour-11-new-package** · patt · 1/1 ranked · surfaced 100%
- `#2` packages/account-utils/src/index.ts

**tour-10-new-service** · patt · 4/4 ranked · surfaced 0%
- `#2` apps/meteor/server/services/room/service.ts
- `#2` apps/meteor/server/services/room/service.ts
- `#2` apps/meteor/server/services/room/service.ts
- `#2` apps/meteor/server/services/room/service.ts

**new-21-impact-settings** · imp · 2/3 ranked · surfaced 33%
- `#1` apps/meteor/app/settings/server/CachedSettings.ts
- `#2` apps/meteor/app/settings/server/SettingsRegistry.ts
- `MISS` apps/meteor/server/publications/settings/index.ts

**new-22-2fa** · arch · 4/4 ranked · surfaced 50%
- `#1` apps/meteor/app/2fa/server/code/index.ts
- `#4` apps/meteor/app/2fa/server/code/TOTPCheck.ts
- `#6` apps/meteor/app/2fa/server/code/EmailCheck.ts
- `#7` apps/meteor/app/2fa/server/twoFactorRequired.ts

**claude-04-e2e-encryption** · arch · 4/5 ranked · surfaced 40%
- `#1` apps/meteor/client/lib/e2ee/rocketchat.e2e.ts
- `#2` apps/meteor/client/lib/e2ee/crypto/rsa.ts
- `#8` apps/meteor/client/lib/e2ee/crypto/aes.ts
- `#12` apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts
- `MISS` apps/meteor/client/lib/e2ee/keychain.ts

**new-12-ldap-auth** · rout · 2/4 ranked · surfaced 50%
- `#1` apps/meteor/server/configuration/ldap.ts
- `#2` apps/meteor/server/services/ldap/service.ts
- `MISS` apps/meteor/server/lib/ldap/Manager.ts
- `MISS` apps/meteor/server/lib/ldap/Connection.ts

**claude-02-msg-permissions** · loc · 4/4 ranked · surfaced 75%
- `#1` apps/meteor/app/lib/server/methods/sendMessage.ts
- `#12` apps/meteor/app/authorization/server/functions/canSendMessage.ts
- `#12` apps/meteor/app/authorization/server/functions/canSendMessage.ts
- `#35` apps/meteor/app/lib/server/functions/sendMessage.ts

**new-14-ee-license** · loc · 3/3 ranked · surfaced 67%
- `#1` ee/packages/license/src/license.ts
- `#7` ee/packages/license/src/licenseImp.ts
- `#643` ee/packages/license/src/events/listeners.ts

**new-13-room-creation** · chain · 2/3 ranked · surfaced 67%
- `#1` apps/meteor/app/lib/server/methods/createChannel.ts
- `#7` apps/meteor/app/lib/server/functions/createRoom.ts
- `MISS` apps/meteor/server/services/room/service.ts

**new-23-omnichannel** · chain · 1/3 ranked · surfaced 67%
- `#6` apps/meteor/server/services/omnichannel/service.ts
- `MISS` apps/meteor/server/services/omnichannel/queue.ts
- `MISS` apps/meteor/app/livechat/server/lib/closeRoom.ts

**claude-06-livechat-routing** · rout · 0/6 ranked · surfaced 17%
- `MISS` packages/livechat/src/api.ts
- `MISS` packages/livechat/src/widget.ts
- `MISS` apps/meteor/app/livechat/server/api/v1/room.ts
- `MISS` apps/meteor/app/livechat/server/lib/QueueManager.ts
- `MISS` apps/meteor/app/livechat/server/lib/RoutingManager.ts
- `MISS` apps/meteor/app/livechat/server/lib/RoutingManager.ts

**new-26-team** · loc · 1/1 ranked · surfaced 100%
- `#1` apps/meteor/server/services/team/service.ts
