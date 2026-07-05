# metrics — quantitative pipeline report (no semantic analysis)

7/5/2026, 9:53:00 AM | 34 testcases | deterministic (index + answers + tools-data), NO verdicts. Semantic analysis lives in logs/reports/verdicts.md.

## 1. Value — do the tools help?

| | no-MCP | naive @ same answer size | with MCP |
|---|---:|---:|---:|
| Avg coverage | 11% | 7% | 28% |
| Avg tokens / question | 5,013 | ~30,362 | 30,362 |

**The agent's navigation adds +17 pts over pure LLM, +21 over same-budget keyword dump** — the lift is choosing moves, not just spending tokens.

## 2. The agent funnel — of the same 150 core files, how many the agent surfaces then writes

> Pooled per-file fractions from the ACTUAL multi-turn run (seen-log → written). R@k below is a single-query PROBE (tool ceiling), NOT a stage the agent flows through.

```
INDEX  indexed & reachable     100%  ██████████████████████████████ 
AGENT  surfaced (seen-log)      37%  ███████████░░░░░░░░░░░░░░░░░░░ <- 63% never surfaced
AGENT  written (answer)         31%  █████████░░░░░░░░░░░░░░░░░░░░░ <- synth 84% of surfaced, drops 12
```

**Two agent stages** (÷ 150): not-surfaced 63% (95 files) · surfaced-but-not-written 6% (12 files).
> Single-query probe (tool capability, NOT the agent path): R@5/10/20/50 = 15%/18%/21%/25%. Of "never surfaced": ~75% never rank in top-50 (engine) vs ~0% rank-but-skipped (agent loop).
> Floor: substring recall file 98% / sym 97% · chain-order LCS 72% (17 ordered Qs). (graph-reachability dropped — it was tautological, see tools.ts.)

## 3. Auto-triage — mechanical "suspected stage" per testcase (no semantic judgment)

> Front→back, first trip wins, numbers only: search (R@50<30%) → graph (surfaced<50%) → synth (synth<70%); ok if end coverage ≥50%. Flags WHICH question + stage to inspect — the WHY is in verdicts.md. **route (intent≠type) is shown as a column but is NOT a gate** — it's a labeling disagreement with ~0 precision as a failure cause (0/12 semantic failures are misrouted), so it no longer drives the stage.

**Suspected-stage distribution:** search 15 · graph 10 · ok 5 · synth 4.

> Column key: **R@10·diag** = single-query probe recall@10 + diagnosis (rm=recall-miss / rl=ranked-low / mx=mixed / ok). **core ranks** = each core file's rank in that probe; `#2 · 5 miss` = one file ranks #2, the other five never appear at all (engine can't reach them by ranking). Full per-file breakdown in §4. **trace** = the agent's ACTUAL calls in order, one per line, showing what each did: `plan:` intent · `search:` query(·layer) · `graph:`/`graph↓`(down chain)/`graph↑`(up impact) target · `details:` file. **surfaced/synth** = the agent's actual run, not the probe.

| # | id | type | route | R@10·diag | core ranks | surfaced | synth | end cov | trace (agent 实际调用) | suspected stage |
|---|---|---|:-:|---|---|---:|---:|---:|---|---|
| 1 | tour-04-msg-client | arch | ✗ | 20% rm | #2 · 4 miss | 40% | 100% | 2/5 40% | 8 calls ⛔<br>plan: call-chain<br>search: "sendMessage" ·client<br>graph↓: sendMessage ×2<br>wiki<br>details: ComposerMessage.tsx<br>details: sendMessage.ts ×2 | search |
| 2 | new-19-message-rendering | arch | ✗ | 0% mx | #14 · 2 miss | 67% | 100% | 2/3 67% | 8 calls ⛔<br>plan: call-chain<br>wiki<br>search: "Markup" ·packages<br>graph↓: Markup<br>search: "parse" ·packages<br>details: index.tsx<br>search: "MarkdownBlock" ·packages<br>details: index.tsx | ok |
| 3 | claude-01-push-notifications | arch | ✓ | 0% mx | #37 · 5 miss | 0% | 100% | 0/6 0% | 1 calls<br>wiki | search |
| 4 | new-09-realtime-streamer | arch | ✓ | 20% rm | #1 · 4 miss | 20% | 100% | 1/5 20% | 8 calls ⛔<br>plan: architecture<br>wiki<br>search: "afterSaveMessage" ·server<br>graph↓: afterSaveMessage<br>details: notifyListener.ts<br>search: "LegacyRoomManager" ·client<br>details: LegacyRoomManager.ts<br>search: "sdk.stream('room-messages')" ·client | search |
| 5 | tour-05-msg-server | chain | ✓ | 0% rm | 3 miss | 100% | 33% | 1/3 33% | 8 calls ⛔<br>plan: call-chain<br>search: "sendMessage" ·server<br>graph↓: sendMessage ×2<br>search: "insert message" ·server<br>search: "Messages.insert" ·server<br>graph↓: insertMessage<br>details: insertMessage.ts | search |
| 6 | claude-05-call-chain | chain | ✓ | 20% mx | #10 · 4 miss | 80% | 25% | 1/5 20% | 8 calls ⛔<br>plan: call-chain<br>search: "sendMessage"<br>graph↓: sendMessage ×2<br>details: sendMessage.ts<br>graph↓: sendMessage<br>search: "validateMessage"<br>details: sendMessage.ts | search |
| 7 | new-24-autotranslate | loc | ✗ | 0% rm | 4 miss | 25% | 100% | 1/4 25% | 1 calls<br>wiki | search |
| 8 | new-15-impact-aftersave | imp | ✓ | 20% mx | #5 · #37 · 3 miss | 100% | 100% | 5/5 100% | 3 calls<br>plan: impact<br>search: "afterSaveMessage"<br>graph↑: afterSaveMessage | ok |
| 9 | new-16-impact-streamer | imp | ✓ | 67% mx | #1 · #10 · 1 miss | 33% | 100% | 1/3 33% | 4 calls<br>plan: impact<br>search: "Streamer"<br>graph↑: Streamer<br>details: Streamer.ts | graph |
| 10 | claude-08-federation | rout | ✗ | 0% rm | 4 miss | 0% | 100% | 0/4 0% | 8 calls ⛔<br>wiki<br>plan: call-chain<br>search: "afterSaveMessage"<br>search: "FederationMatrix.sendMessage"<br>graph↓: afterSaveMessage<br>graph↑: FederationMatrix.sendMessage ×2<br>details: index.ts | search |
| 11 | new-18-webhook | rout | ✗ | 25% mx | #1 · #12 · #59 · 1 miss | 50% | 50% | 1/4 25% | 8 calls ⛔<br>plan: call-chain<br>wiki<br>search: "processWebhookMessage"<br>graph↓: processWebhookMessage<br>search: "hooks" ·server<br>search: "API endpoint webhook" ·server<br>search: "addIncomingIntegration"<br>search: "/hooks/" ·server | synth |
| 12 | claude-07-api-endpoints | loc | ✗ | 0% mx | #51 · 5 miss | 33% | 100% | 2/6 33% | 8 calls ⛔<br>wiki<br>plan: architecture<br>search: "API.v1.addRoute"<br>search: "APIClass"<br>details: ApiClass.ts<br>search: "API.v1"<br>search: "new APIClass"<br>details: api.ts | search |
| 13 | new-25-search | loc | ✗ | 0% rm | 4 miss | 25% | 100% | 1/4 25% | 8 calls ⛔<br>wiki<br>search: "MessageSearchForm" ·client<br>graph↓: MessageSearchForm<br>search: "chat.search" ·server<br>details: chat.ts<br>search: "messageSearch" ·server<br>details: messageSearch.ts<br>details: parseMessageSearchQuery.ts | search |
| 14 | new-27-video-conference | loc | ✗ | 0% rm | 6 miss | 0% | 100% | 0/6 0% | 1 calls<br>wiki | search |
| 15 | tour-06-endpoint | patt | ✓ | 20% mx | #1 · #17 · 3 miss | 40% | 100% | 2/5 40% | 4 calls<br>wiki<br>search: "APIClass"<br>search: "API.v1"<br>search: "new APIClass" | graph |
| 16 | new-17-slash-commands | patt | ✗ | 0% rm | 2 miss | 100% | 100% | 2/2 100% | 8 calls ⛔<br>wiki<br>plan: call-chain<br>search: "slashCommands.add"<br>graph↑: slashCommands.add<br>search: "slashCommands" ·server<br>details: slashCommand.ts<br>search: "processSlashCommand" ·client<br>graph↓: processSlashCommand | ok |
| 17 | new-11-settings | arch | ✓ | 0% rm | 3 miss | 33% | 100% | 1/3 33% | 8 calls ⛔<br>wiki<br>search: "settingsRegistry.addGroup"<br>details: index.ts<br>search: "settingsRegistry"<br>details: SettingsRegistry.ts ×2<br>search: "notifyOnSettingChangedById"<br>details: notifyListener.ts | search |
| 18 | claude-03-file-upload | arch | ✓ | 40% mx | #3 · #4 · #26 · 2 miss | 0% | 100% | 2/5 40% | 1 calls<br>wiki | graph |
| 19 | new-10-apps-engine | arch | ✓ | 25% mx | #1 · #13 · #183 · 1 miss | 25% | 100% | 1/4 25% | 8 calls ⛔<br>wiki<br>search: "AppEvents"<br>search: "IPostMessageSent"<br>search: "afterSaveMessage"<br>details: IPostMessageSent.ts<br>details: events.ts<br>search: "AppInterface"<br>details: AppInterface.ts | graph |
| 20 | new-20-proxify | loc | ✗ | 33% rm | #2 · 2 miss | 67% | 50% | 1/3 33% | 8 calls ⛔<br>wiki<br>search: "proxify" ·packages<br>details: proxify.ts ×2<br>search: "api.call" ·packages<br>search: "api" ·packages<br>details: createMockWizardApi.ts ×2 | synth |
| 21 | tour-07-db-model-create | patt | ✓ | 40% mx | #6 · #8 · 3 miss | 40% | 100% | 2/5 40% | 8 calls ⛔<br>wiki<br>search: "IBaseModel" ·packages<br>search: "BaseRaw" ·packages<br>search: "registerModel"<br>details: IBaseModel.ts<br>details: BaseRaw.ts<br>details: proxify.ts<br>search: "registerModel" ·server | graph |
| 22 | tour-08-db-model-use | patt | ✗ | 100% ok | #1 · #2 · #3 | 0% | 100% | 0/3 0% | 1 calls<br>wiki | graph |
| 23 | tour-11-new-package | patt | ✓ | 33% rm | #2 · 2 miss | 33% | 0% | 0/3 0% | 8 calls ⛔<br>plan: pattern<br>search: "package" ·packages<br>details: package.js<br>search: "lerna.json"<br>search: "yarn.lock"<br>search: "create-package"<br>search: "package.json" ·packages<br>details: package.json | graph |
| 24 | tour-10-new-service | patt | ✓ | 50% rm | #2 · #5 · 2 miss | 0% | 100% | 0/4 0% | 1 calls<br>wiki | graph |
| 25 | new-21-impact-settings | imp | ✓ | 0% rm | 3 miss | 33% | 0% | 0/3 0% | 3 calls<br>plan: impact<br>search: "CachedSettings"<br>graph↑: CachedSettings | search |
| 26 | new-22-2fa | arch | ✓ | 17% mx | #2 · #49 · 4 miss | 33% | 100% | 2/6 33% | 5 calls<br>wiki<br>search: "checkCodeForUser"<br>details: index.ts<br>search: "EmailCheck"<br>details: EmailCheck.ts | graph |
| 27 | claude-04-e2e-encryption | arch | ✗ | 0% rm | 6 miss | 33% | 100% | 2/6 33% | 8 calls ⛔<br>wiki<br>search: "e2e.setUserPublicAndPrivateKeys"<br>search: "e2e.persistKeys" ·client<br>search: "e2e.setUserPublicAndPrivateKeys" ·client<br>details: rocketchat.e2e.ts<br>search: "class E2E" ·client<br>details: rocketchat.e2e.ts ×2 | search |
| 28 | new-12-ldap-auth | rout | ✗ | 40% rm | #1 · #2 · 3 miss | 40% | 100% | 2/5 40% | 8 calls ⛔<br>wiki<br>details: Manager.ts ×2<br>search: "LDAPConnection" ·server<br>details: Connection.ts ×2<br>details: Manager.ts<br>details: Connection.ts | graph |
| 29 | claude-02-msg-permissions | loc | ✓ | 20% mx | #1 · #12 · #35 · 2 miss | 60% | 67% | 2/5 40% | 5 calls<br>plan: locate<br>search: "message permission validation"<br>search: "validateMessage"<br>graph: validateMessage<br>details: canSendMessage.ts | synth |
| 30 | new-14-ee-license | loc | ✗ | 17% mx | #1 · #22 · 4 miss | 50% | 67% | 2/6 33% | 8 calls ⛔<br>wiki<br>search: "LicenseService" ·ee<br>details: license.internalService.ts<br>search: "License" ·packages<br>search: "License" ·ee<br>details: license.ts<br>search: "engagement-dashboard"<br>search: "hasModule" ·ee | synth |
| 31 | new-13-room-creation | chain | ✓ | 50% rl | #3 · #73 | 100% | 100% | 2/2 100% | 8 calls ⛔<br>plan: call-chain<br>search: "create channel"<br>graph↓: create channel<br>search: "createChannel"<br>graph↓: createChannel<br>details: createChannel.ts<br>graph↓: createRoom<br>details: createRoom.ts | ok |
| 32 | new-23-omnichannel | chain | ✗ | 0% rm | 4 miss | 50% | 100% | 2/4 50% | 8 calls ⛔<br>wiki<br>search: "OmnichannelQueue" ·server<br>graph↓: OmnichannelQueue<br>details: queue.ts ×4<br>search: "closeRoom" | ok |
| 33 | claude-06-livechat-routing | rout | ✓ | 13% mx | #1 · #67 · 6 miss | 13% | 100% | 2/8 25% | 8 calls ⛔<br>wiki<br>plan: routing<br>search: "/livechat/room"<br>search: "QueueManager" ·server<br>graph: QueueManager<br>details: QueueManager.ts<br>graph↓: QueueManager.requestRoom<br>search: "requestRoom" ·server | search |
| 34 | new-26-team | loc | ✗ | 0% rm | 5 miss | 40% | 50% | 1/5 20% | 3 calls<br>wiki<br>search: "TeamService" ·server<br>details: service.ts | search |

## 4. Per-core-file probe rank — every core file, its rank or MISS

> §3's `core@probe` expanded: the single-query graph(expand) rank of EACH core file, best-rank first. `MISS` = never appears in the ranked neighborhood at all (engine can't reach it by ranking). A deep rank (#100+) is effectively unreachable — the agent won't page that far.

**tour-04-msg-client** · arch · 1/5 ranked · surfaced 40%
- `#2` apps/meteor/client/views/room/body/RoomBody.tsx
- `MISS` apps/meteor/client/views/room/composer/ComposerContainer.tsx
- `MISS` apps/meteor/client/views/room/composer/ComposerMessage.tsx
- `MISS` apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx
- `MISS` apps/meteor/client/lib/chats/flows/sendMessage.ts

**new-19-message-rendering** · arch · 1/3 ranked · surfaced 67%
- `#14` packages/message-parser/src/index.ts
- `MISS` packages/message-parser/src/grammar.pegjs
- `MISS` packages/gazzodown/src/Markup.tsx

**claude-01-push-notifications** · arch · 1/6 ranked · surfaced 0%
- `#37` apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts
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

**tour-05-msg-server** · chain · 0/3 ranked · surfaced 100%
- `MISS` apps/meteor/app/lib/server/methods/sendMessage.ts
- `MISS` apps/meteor/app/lib/server/functions/sendMessage.ts
- `MISS` apps/meteor/app/authorization/server/functions/canSendMessage.ts

**claude-05-call-chain** · chain · 1/5 ranked · surfaced 80%
- `#10` apps/meteor/client/lib/chats/flows/sendMessage.ts
- `MISS` apps/meteor/app/lib/server/methods/sendMessage.ts
- `MISS` apps/meteor/app/lib/server/functions/sendMessage.ts
- `MISS` apps/meteor/app/authorization/server/functions/canSendMessage.ts
- `MISS` apps/meteor/app/lib/server/lib/afterSaveMessage.ts

**new-24-autotranslate** · loc · 0/4 ranked · surfaced 25%
- `MISS` apps/meteor/app/autotranslate/server/autotranslate.ts
- `MISS` apps/meteor/app/autotranslate/server/googleTranslate.ts
- `MISS` apps/meteor/app/autotranslate/server/msTranslate.ts
- `MISS` apps/meteor/app/autotranslate/server/deeplTranslate.ts

**new-15-impact-aftersave** · imp · 2/5 ranked · surfaced 100%
- `#5` apps/meteor/app/lib/server/functions/sendMessage.ts
- `#37` apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts
- `MISS` apps/meteor/app/lib/server/lib/afterSaveMessage.ts
- `MISS` apps/meteor/app/lib/server/functions/updateMessage.ts
- `MISS` apps/meteor/app/autotranslate/server/autotranslate.ts

**new-16-impact-streamer** · imp · 2/3 ranked · surfaced 33%
- `#1` apps/meteor/server/modules/streamer/streamer.module.ts
- `#10` apps/meteor/server/modules/notifications/notifications.module.ts
- `MISS` apps/meteor/server/modules/listeners/listeners.module.ts

**claude-08-federation** · rout · 0/4 ranked · surfaced 0%
- `MISS` ee/packages/federation-matrix/src/FederationMatrix.ts
- `MISS` ee/packages/federation-matrix/src/api/_matrix/transactions.ts
- `MISS` ee/packages/federation-matrix/src/events/message.ts
- `MISS` ee/packages/federation-matrix/src/helpers/message.parsers.ts

**new-18-webhook** · rout · 3/4 ranked · surfaced 50%
- `#1` apps/meteor/app/integrations/server/api/api.ts
- `#12` apps/meteor/app/integrations/server/lib/triggerHandler.ts
- `#59` apps/meteor/app/lib/server/functions/processWebhookMessage.ts
- `MISS` apps/meteor/app/integrations/server/lib/isolated-vm/isolated-vm.ts

**claude-07-api-endpoints** · loc · 1/6 ranked · surfaced 33%
- `#51` apps/meteor/app/api/server/ApiClass.ts
- `MISS` apps/meteor/app/api/server/api.ts
- `MISS` apps/meteor/app/api/server/router.ts
- `MISS` apps/meteor/app/api/server/index.ts
- `MISS` apps/meteor/app/api/server/middlewares/authenticationHono.ts
- `MISS` apps/meteor/app/api/server/middlewares/permissions.ts

**new-25-search** · loc · 0/4 ranked · surfaced 25%
- `MISS` apps/meteor/app/search/server/service/SearchProviderService.ts
- `MISS` apps/meteor/app/search/server/model/SearchProvider.ts
- `MISS` apps/meteor/app/search/server/provider/DefaultProvider.ts
- `MISS` apps/meteor/server/methods/messageSearch.ts

**new-27-video-conference** · loc · 0/6 ranked · surfaced 0%
- `MISS` apps/meteor/server/services/video-conference/service.ts
- `MISS` packages/core-services/src/types/IVideoConfService.ts
- `MISS` packages/core-typings/src/VideoConference.ts
- `MISS` apps/meteor/server/lib/videoConfProviders.ts
- `MISS` apps/meteor/server/lib/isRoomCompatibleWithVideoConfRinging.ts
- `MISS` packages/models/src/models/VideoConference.ts

**tour-06-endpoint** · patt · 2/5 ranked · surfaced 40%
- `#1` apps/meteor/app/api/server/api.ts
- `#17` apps/meteor/app/api/server/ApiClass.ts
- `MISS` apps/meteor/app/api/server/router.ts
- `MISS` apps/meteor/app/api/server/middlewares/authenticationHono.ts
- `MISS` apps/meteor/app/api/server/middlewares/permissions.ts

**new-17-slash-commands** · patt · 0/2 ranked · surfaced 100%
- `MISS` apps/meteor/app/utils/server/slashCommand.ts
- `MISS` apps/meteor/client/lib/chats/flows/processSlashCommand.ts

**new-11-settings** · arch · 0/3 ranked · surfaced 33%
- `MISS` apps/meteor/app/settings/server/SettingsRegistry.ts
- `MISS` apps/meteor/app/settings/server/CachedSettings.ts
- `MISS` apps/meteor/server/publications/settings/index.ts

**claude-03-file-upload** · arch · 3/5 ranked · surfaced 0%
- `#3` apps/meteor/server/services/upload/service.ts
- `#4` apps/meteor/client/lib/chats/flows/uploadFiles.ts
- `#26` apps/meteor/app/file-upload/server/lib/FileUpload.ts
- `MISS` apps/meteor/app/api/server/v1/rooms.ts
- `MISS` apps/meteor/app/file-upload/server/methods/sendFileMessage.ts

**new-10-apps-engine** · arch · 3/4 ranked · surfaced 25%
- `#1` apps/meteor/app/apps/server/bridges/listeners.ts
- `#13` packages/apps-engine/src/server/AppManager.ts
- `#183` packages/apps-engine/src/server/managers/AppListenerManager.ts
- `MISS` packages/apps-engine/src/definition/metadata/AppInterface.ts

**new-20-proxify** · loc · 1/3 ranked · surfaced 67%
- `#2` packages/core-services/src/lib/proxify.ts
- `MISS` packages/core-services/src/LocalBroker.ts
- `MISS` packages/core-services/src/types/ServiceClass.ts

**tour-07-db-model-create** · patt · 2/5 ranked · surfaced 40%
- `#6` packages/model-typings/src/models/IMessagesModel.ts
- `#8` packages/core-typings/src/IMessage/IMessage.ts
- `MISS` packages/models/src/models/BaseRaw.ts
- `MISS` packages/models/src/models/Messages.ts
- `MISS` apps/meteor/server/models.ts

**tour-08-db-model-use** · patt · 3/3 ranked · surfaced 0%
- `#1` packages/models/src/models/Messages.ts
- `#2` apps/meteor/app/lib/server/functions/loadMessageHistory.ts
- `#3` apps/meteor/server/methods/loadHistory.ts

**tour-11-new-package** · patt · 1/3 ranked · surfaced 33%
- `#2` packages/account-utils/src/index.ts
- `MISS` packages/account-utils/package.json
- `MISS` packages/account-utils/tsconfig.json

**tour-10-new-service** · patt · 2/4 ranked · surfaced 0%
- `#2` packages/core-services/src/types/IRoomService.ts
- `#5` apps/meteor/server/services/room/service.ts
- `MISS` packages/core-services/src/index.ts
- `MISS` packages/core-services/src/lib/ServiceClassInternal.ts

**new-21-impact-settings** · imp · 0/3 ranked · surfaced 33%
- `MISS` apps/meteor/app/settings/server/CachedSettings.ts
- `MISS` apps/meteor/app/settings/server/SettingsRegistry.ts
- `MISS` apps/meteor/app/settings/server/index.ts

**new-22-2fa** · arch · 2/6 ranked · surfaced 33%
- `#2` apps/meteor/app/2fa/server/twoFactorRequired.ts
- `#49` apps/meteor/app/2fa/server/code/index.ts
- `MISS` apps/meteor/app/2fa/server/code/ICodeCheck.ts
- `MISS` apps/meteor/app/2fa/server/code/TOTPCheck.ts
- `MISS` apps/meteor/app/2fa/server/code/EmailCheck.ts
- `MISS` apps/meteor/app/2fa/server/code/PasswordCheckFallback.ts

**claude-04-e2e-encryption** · arch · 0/6 ranked · surfaced 33%
- `MISS` apps/meteor/client/lib/e2ee/rocketchat.e2e.ts
- `MISS` apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts
- `MISS` apps/meteor/client/lib/e2ee/crypto/rsa.ts
- `MISS` apps/meteor/client/lib/e2ee/crypto/aes.ts
- `MISS` apps/meteor/client/lib/e2ee/crypto/pbkdf2.ts
- `MISS` apps/meteor/client/lib/e2ee/keychain.ts

**new-12-ldap-auth** · rout · 2/5 ranked · surfaced 40%
- `#1` apps/meteor/server/configuration/ldap.ts
- `#2` apps/meteor/server/services/ldap/service.ts
- `MISS` apps/meteor/server/lib/ldap/Manager.ts
- `MISS` apps/meteor/server/lib/ldap/Connection.ts
- `MISS` apps/meteor/server/lib/ldap/UserConverter.ts

**claude-02-msg-permissions** · loc · 3/5 ranked · surfaced 60%
- `#1` apps/meteor/app/lib/server/methods/sendMessage.ts
- `#12` apps/meteor/app/authorization/server/functions/canSendMessage.ts
- `#35` apps/meteor/app/lib/server/functions/sendMessage.ts
- `MISS` apps/meteor/app/authorization/server/functions/canAccessRoom.ts
- `MISS` apps/meteor/app/authorization/server/functions/hasPermission.ts

**new-14-ee-license** · loc · 2/6 ranked · surfaced 50%
- `#1` ee/packages/license/src/license.ts
- `#22` ee/packages/license/src/modules.ts
- `MISS` ee/packages/license/src/licenseImp.ts
- `MISS` ee/packages/license/src/events/listeners.ts
- `MISS` ee/packages/license/src/events/emitter.ts
- `MISS` ee/packages/license/src/validation/runValidation.ts

**new-13-room-creation** · chain · 2/2 ranked · surfaced 100%
- `#3` apps/meteor/app/lib/server/methods/createChannel.ts
- `#73` apps/meteor/app/lib/server/functions/createRoom.ts

**new-23-omnichannel** · chain · 0/4 ranked · surfaced 50%
- `MISS` apps/meteor/server/services/omnichannel/service.ts
- `MISS` apps/meteor/server/services/omnichannel/queue.ts
- `MISS` apps/meteor/app/livechat/server/lib/closeRoom.ts
- `MISS` apps/meteor/app/livechat/server/lib/RoutingManager.ts

**claude-06-livechat-routing** · rout · 2/8 ranked · surfaced 13%
- `#1` packages/livechat/src/widget.ts
- `#67` apps/meteor/app/livechat/server/api/v1/room.ts
- `MISS` packages/livechat/src/api.ts
- `MISS` apps/meteor/app/livechat/server/lib/QueueManager.ts
- `MISS` apps/meteor/app/livechat/server/lib/RoutingManager.ts
- `MISS` apps/meteor/app/livechat/server/lib/routing/AutoSelection.ts
- `MISS` apps/meteor/app/livechat/server/lib/routing/ManualSelection.ts
- `MISS` apps/meteor/app/livechat/server/lib/routing/External.ts

**new-26-team** · loc · 0/5 ranked · surfaced 40%
- `MISS` apps/meteor/server/services/team/service.ts
- `MISS` packages/core-services/src/types/ITeamService.ts
- `MISS` packages/core-typings/src/ITeam.ts
- `MISS` packages/models/src/models/Team.ts
- `MISS` packages/models/src/models/TeamMember.ts
