# metrics — trace 报告（游走器决策 + agent 实际调用；无语义判定，语义在 verdicts.md）

7/8/2026, 4:38:15 PM | 34 testcases | deterministic (retrieval-trace + answers + wiki-map + claude-truth)

## 1. Trace — 确定性游走器逐题决策概览

> "答案文件" = Claude 标准答案里列出的关键文件（claude-truth.json 的 core），下同。trace 文件本身不含任何答案信息，本节的对照是报告生成时算的。

**入口**：2/34 题在入口图里找不到页面、退回了普通符号搜索 · 被选最多的页面：UI Component System×14 · Omnichannel and Livechat×9 · Key Features×9 · Core Application×7 · Authentication and Authorization×7 · Room and Channel Management×6
**游走**：平均每题走 4.5 步 · 停下来的原因：枯竭 61 · 衰减 14 · 预算 6 · 节点 1
**对照标准答案**：入口页选对 **17/20** 题（只算答案文件所在页面存在于入口图的题；另 14 题答案文件根本不在任何 wiki 页面里，怎么选都选不到，记 —）· 平均找到 **58%** 的答案文件 · 一个答案文件都没找到的题 8/34

| # | id | 选中的入口页 (top-3) | 入口页对吗 | 找到答案文件 | seeds | 走了几步 | 停止原因 |
|---|---|---|:-:|---:|---:|---:|---|
| 1 | tour-04-msg-client | Core Application<br>UI Component System<br>Room and Channel Management | ✓ | 3/5 | 3 | 10 | 枯竭/枯竭/预算 |
| 2 | new-19-message-rendering | UI Component System<br>Release Management<br>Omnichannel and Livechat | — | 2/3 | 3 | 4 | 枯竭/枯竭/枯竭 |
| 3 | claude-01-push-notifications | Video Conferencing and VoIP<br>CI/CD Pipeline<br>Microservices Architecture | ✓ | 3/6 | 2 | 4 | 衰减/枯竭 |
| 4 | new-09-realtime-streamer | Core Application<br>Type System and API Contracts<br>Runtime Requirements | ✓ | 5/5 | 2 | 2 | 枯竭/枯竭 |
| 5 | tour-05-msg-server | Core Application<br>UI Component System<br>Room and Channel Management | — | 3/3 | 3 | 10 | 枯竭/枯竭/预算 |
| 6 | claude-05-call-chain | UI Component System<br>Type System and API Contracts<br>Room and Channel Management | ✗ | 4/5 | 3 | 5 | 枯竭/枯竭/枯竭 |
| 7 | new-24-autotranslate | Key Features<br>Omnichannel and Livechat<br>UI Component System | — | 4/4 | 3 | 4 | 枯竭/枯竭/枯竭 |
| 8 | new-15-impact-aftersave | REST API Reference<br>Room and Channel Management<br>UI Component System | — | 5/5 | 3 | 9 | 预算/衰减/衰减 |
| 9 | new-16-impact-streamer | Microservices Architecture<br>CI/CD Pipeline<br>System Architecture | ✓ | 0/3 | 1 | 1 | 枯竭 |
| 10 | claude-08-federation | Federation and Matrix Integration<br>Key Features<br>UI Component System | ✓ | 3/4 | 3 | 4 | 枯竭/枯竭/枯竭 |
| 11 | new-18-webhook | Messaging and Room APIs<br>Key Features<br>Omnichannel and Livechat | ✓ | 2/4 | 3 | 2 | 衰减/衰减/衰减 |
| 12 | claude-07-api-endpoints | User and Account APIs<br>Authentication and Authorization<br>Type System and API Contracts | — | 0/6 | 3 | 4 | 衰减/枯竭/衰减 |
| 13 | new-25-search | REST API Reference<br>UI Component System<br>Key Features | ✓ | 4/4 | 3 | 10 | 枯竭/枯竭/枯竭 |
| 14 | new-27-video-conference | Monorepo Structure<br>Video Conferencing and VoIP<br>UI Component System | ✓ | 1/6 | 2 | 0 | 枯竭/枯竭 |
| 15 | tour-06-endpoint | Authentication and Authorization<br>Type System and API Contracts<br>Omnichannel and Livechat | — | 2/5 | 3 | 4 | 枯竭/衰减/枯竭 |
| 16 | new-17-slash-commands | Authentication and Authorization<br>API Framework and Patterns<br>CI/CD Pipeline | — | 0/2 | 2 | 0 | 枯竭/枯竭 |
| 17 | new-11-settings | Core Application<br>Authentication and Authorization<br>UI Component System | — | 3/3 | 3 | 12 | 枯竭/枯竭/枯竭 |
| 18 | claude-03-file-upload | Release Management<br>Testing Framework<br>Development Workflow | ✓ | 5/5 | 2 | 5 | 枯竭/节点 |
| 19 | new-10-apps-engine | Apps Engine and Marketplace<br>Core Application<br>UI Component System | — | 4/4 | 3 | 8 | 枯竭/枯竭/枯竭 |
| 20 | new-20-proxify | Microservices Architecture<br>Internationalization System<br>API Framework and Patterns | ✓ | 0/3 | 3 | 0 | 枯竭/衰减/枯竭 |
| 21 | tour-07-db-model-create | (退回符号搜索) | ✗ | 0/5 | 0 | 0 |  |
| 22 | tour-08-db-model-use | (退回符号搜索) | — | 0/3 | 0 | 0 |  |
| 23 | tour-11-new-package | Monorepo Structure<br>Monorepo Management<br>Omnichannel and Livechat | ✓ | 0/3 | 1 | 0 | 枯竭 |
| 24 | tour-10-new-service | CI/CD Pipeline<br>Omnichannel and Livechat<br>Microservices Architecture | ✓ | 0/4 | 2 | 0 | 枯竭/枯竭 |
| 25 | new-21-impact-settings | Apps Engine and Marketplace<br>Federation and Matrix Integration<br>UI Component System | — | 3/3 | 3 | 6 | 衰减/枯竭/枯竭 |
| 26 | new-22-2fa | Monorepo Structure<br>UI Component System<br>Authentication and Authorization | — | 4/6 | 2 | 4 | 枯竭/枯竭 |
| 27 | claude-04-e2e-encryption | End-to-End Encryption<br>Key Features<br>Testing Framework | ✓ | 2/6 | 3 | 1 | 枯竭/枯竭/枯竭 |
| 28 | new-12-ldap-auth | Authentication and Authorization<br>Key Features<br>Core Application | ✓ | 2/5 | 3 | 1 | 枯竭/枯竭/衰减 |
| 29 | claude-02-msg-permissions | REST API Reference<br>Messaging and Room APIs<br>Key Features | — | 5/5 | 3 | 9 | 枯竭/枯竭/枯竭 |
| 30 | new-14-ee-license | Key Features<br>Glossary<br>Authentication and Authorization | ✓ | 3/6 | 2 | 2 | 衰减/枯竭 |
| 31 | new-13-room-creation | Omnichannel and Livechat<br>Room and Channel Management<br>UI Component System | — | 2/2 | 3 | 11 | 枯竭/衰减/预算 |
| 32 | new-23-omnichannel | Omnichannel and Livechat<br>Microservices Architecture<br>Room and Channel Management | ✓ | 4/4 | 3 | 8 | 枯竭/枯竭/预算 |
| 33 | claude-06-livechat-routing | Omnichannel and Livechat<br>Core Application<br>CI/CD Pipeline | ✓ | 8/8 | 2 | 4 | 枯竭/枯竭 |
| 34 | new-26-team | Key Features<br>Testing Framework<br>Glossary | ✗ | 2/5 | 2 | 8 | 预算/枯竭 |

## 2. 游走诊断 — 效率、停止时机、和真 agent 的对比

**多快找到第一个答案文件**：没找到×8 · 第0步(seed自身就是)×9 · 第1步×8 · 第2步×7 · 第3步×1 · 第5步×1
**每一轮新找到几个答案文件**（全部题目加总；轮次按每个 seed 自己数）：第1轮 15个 · 第2轮 45个 · 第3轮 16个 · 第4轮 2个 · 第5轮 1个
**停止时机**：28/34 题正常；有问题的：tour-04-msg-client(停晚了(最后两步已无新答案文件))、tour-05-msg-server(停晚了(最后两步已无新答案文件))、new-15-impact-aftersave(停晚了(最后两步已无新答案文件))、new-27-video-conference(停早了(预览里还有 1 个答案文件))、new-23-omnichannel(停晚了(最后两步已无新答案文件))、new-26-team(停晚了(最后两步已无新答案文件))
**和真 agent 对比**（同一批答案文件，共 150 个）：自动游走找到 88 个，真 agent 在工具结果里见过 46 个，**其中 52 个是自动游走找到、agent 没见过的**——这就是把游走结果喂给 agent 能带来的增量上限。

| # | id | 游走找到 | agent 见过 | 游走多找 | 第几步首次找到 | 停止评价 |
|---|---|---:|---:|---:|---:|---|
| 1 | tour-04-msg-client | 3/5 | 1/5 | +2 | seed 即是 | 停晚了(最后两步已无新答案文件) |
| 2 | new-19-message-rendering | 2/3 | 0/3 | +2 | 第2步 | 正常 |
| 3 | claude-01-push-notifications | 3/6 | 0/6 | +3 | 第2步 | 正常 |
| 4 | new-09-realtime-streamer | 5/5 | 1/5 | +4 | 第1步 | 正常 |
| 5 | tour-05-msg-server | 3/3 | 3/3 | +0 | 第5步 | 停晚了(最后两步已无新答案文件) |
| 6 | claude-05-call-chain | 4/5 | 4/5 | +1 | 第3步 | 正常 |
| 7 | new-24-autotranslate | 4/4 | 0/4 | +4 | 第2步 | 正常 |
| 8 | new-15-impact-aftersave | 5/5 | 5/5 | +0 | 第1步 | 停晚了(最后两步已无新答案文件) |
| 9 | new-16-impact-streamer | 0/3 | 1/3 | +0 | 没找到 | 正常 |
| 10 | claude-08-federation | 3/4 | 1/4 | +2 | seed 即是 | 正常 |
| 11 | new-18-webhook | 2/4 | 1/4 | +1 | 第2步 | 正常 |
| 12 | claude-07-api-endpoints | 0/6 | 1/6 | +0 | 没找到 | 正常 |
| 13 | new-25-search | 4/4 | 2/4 | +2 | seed 即是 | 正常 |
| 14 | new-27-video-conference | 1/6 | 0/6 | +1 | seed 即是 | 停早了(预览里还有 1 个答案文件) |
| 15 | tour-06-endpoint | 2/5 | 1/5 | +1 | 第1步 | 正常 |
| 16 | new-17-slash-commands | 0/2 | 2/2 | +0 | 没找到 | 正常 |
| 17 | new-11-settings | 3/3 | 1/3 | +2 | 第1步 | 正常 |
| 18 | claude-03-file-upload | 5/5 | 3/5 | +2 | seed 即是 | 正常 |
| 19 | new-10-apps-engine | 4/4 | 1/4 | +3 | 第2步 | 正常 |
| 20 | new-20-proxify | 0/3 | 2/3 | +0 | 没找到 | 正常 |
| 21 | tour-07-db-model-create | 0/5 | 1/5 | +0 | 没找到 | 正常 |
| 22 | tour-08-db-model-use | 0/3 | 0/3 | +0 | 没找到 | 正常 |
| 23 | tour-11-new-package | 0/3 | 0/3 | +0 | 没找到 | 正常 |
| 24 | tour-10-new-service | 0/4 | 0/4 | +0 | 没找到 | 正常 |
| 25 | new-21-impact-settings | 3/3 | 1/3 | +2 | 第1步 | 正常 |
| 26 | new-22-2fa | 4/6 | 0/6 | +4 | 第2步 | 正常 |
| 27 | claude-04-e2e-encryption | 2/6 | 2/6 | +0 | seed 即是 | 正常 |
| 28 | new-12-ldap-auth | 2/5 | 1/5 | +1 | seed 即是 | 正常 |
| 29 | claude-02-msg-permissions | 5/5 | 2/5 | +3 | 第1步 | 正常 |
| 30 | new-14-ee-license | 3/6 | 0/6 | +3 | seed 即是 | 正常 |
| 31 | new-13-room-creation | 2/2 | 2/2 | +0 | 第1步 | 正常 |
| 32 | new-23-omnichannel | 4/4 | 2/4 | +2 | seed 即是 | 停晚了(最后两步已无新答案文件) |
| 33 | claude-06-livechat-routing | 8/8 | 1/8 | +7 | 第2步 | 正常 |
| 34 | new-26-team | 2/5 | 4/5 | +0 | 第1步 | 停晚了(最后两步已无新答案文件) |

## 3. Agent 实际调用 — 每题的真实工具调用序列

> 解析自 `logs/answers-gemini-mcp-selfloop/<id>.md` 的 ## Tool Calls 段。`plan:` intent · `search:` query(·layer) · `graph:`/`graph↓`(down)/`graph↑`(up) target · `details:` file · `wiki`。⛔ = 用满 8 次调用预算。

| # | id | type | calls | trace (agent 实际调用) |
|---|---|---|---:|---|
| 1 | tour-04-msg-client | arch | 6 | plan: call-chain<br>search: "sendMessage" ·client<br>graph↓: sendMessage<br>details: sendMessage.ts<br>search: "process" ·client<br>details: sendMessage.ts |
| 2 | new-19-message-rendering | arch | 6 | plan: call-chain<br>search: "useNormalizedMessage" ·client<br>graph↓: useNormalizedMessage<br>details: parseMessageTextToAstMarkdown.ts<br>search: "MessageContentBody" ·client<br>graph↓: MessageContentBody |
| 3 | claude-01-push-notifications | arch | 8 ⛔ | wiki<br>search: "Push.registerPushToken"<br>search: "PushNotification"<br>details: methods.ts<br>search: "Push.registerPushToken definition"<br>search: "registerPushToken" ·server<br>details: registerPushToken.ts<br>details: PushNotification.ts |
| 4 | new-09-realtime-streamer | arch | 8 ⛔ | plan: architecture<br>search: "sendMessage" ·server<br>details: sendMessage.ts<br>search: "notifyOnMessageChange" ·server<br>details: notifyListener.ts<br>graph↑: notifyOnMessageChange<br>search: "upsertMessage" ·client<br>details: RoomHistoryManager.ts |
| 5 | tour-05-msg-server | chain | 8 ⛔ | plan: call-chain<br>search: "sendMessage" ·server<br>search: "executeSendMessage" ·server<br>graph↓: executeSendMessage<br>details: sendMessage.ts ×4 |
| 6 | claude-05-call-chain | chain | 8 ⛔ | plan: call-chain<br>search: "sendMessage" ·client<br>graph↓: sendMessage<br>details: sendMessage.ts ×2<br>search: "sendMessage" ·server<br>graph↓: sendMessage<br>details: sendMessage.ts |
| 7 | new-24-autotranslate | loc | 1 | wiki |
| 8 | new-15-impact-aftersave | imp | 3 | plan: impact<br>search: "afterSaveMessage" ·server<br>graph↑: afterSaveMessage |
| 9 | new-16-impact-streamer | imp | 3 | plan: impact<br>search: "Streamer"<br>graph↑: Streamer |
| 10 | claude-08-federation | rout | 8 ⛔ | wiki<br>plan: call-chain<br>search: "FederationMatrix.sendMessage" ·ee<br>search: "FederationMatrix" ·packages<br>details: FederationMatrix.ts ×4 |
| 11 | new-18-webhook | rout | 8 ⛔ | plan: call-chain<br>search: "executeIntegrationRest"<br>graph↓: executeIntegrationRest<br>search: "scriptEngine.processIncomingRequest"<br>graph↓: scriptEngine.processIncomingRequest<br>search: "scriptEngine"<br>details: validateScriptEngine.ts ×2 |
| 12 | claude-07-api-endpoints | loc | 8 ⛔ | wiki<br>plan: architecture<br>search: "API.v1.addRoute" ·server<br>search: "API.v1" ·server<br>search: "class API" ·server<br>details: ApiClass.ts<br>search: "API.v1 = new APIClass" ·server<br>search: "API.v1 =" ·server |
| 13 | new-25-search | loc | 8 ⛔ | wiki<br>search: "/v1/chat.search" ·server<br>search: "API.v1.addRoute 'chat.search'" ·server<br>search: "messageSearch" ·server<br>graph↑: messageSearch<br>details: chat.ts<br>search: "API.v1.addRoute"<br>details: messageSearch.ts |
| 14 | new-27-video-conference | loc | 1 | wiki |
| 15 | tour-06-endpoint | patt | 4 | wiki<br>search: "APIClass"<br>details: ApiClass.ts<br>search: "livechat/units/:unitId/monitors" |
| 16 | new-17-slash-commands | patt | 8 ⛔ | wiki<br>plan: call-chain<br>search: "slashCommands.add"<br>graph↓: slashCommands.add<br>search: "slashCommands"<br>details: slashCommand.ts ×2<br>search: "AppCommandsBridge" |
| 17 | new-11-settings | arch | 8 ⛔ | wiki<br>search: "settingsRegistry.addGroup"<br>details: omnichannel.ts<br>details: index.ts<br>details: omnichannel.ts ×2<br>graph↓: SettingsRegistry<br>details: SettingsRegistry.ts |
| 18 | claude-03-file-upload | arch | 8 ⛔ | wiki<br>details: FileUpload.ts<br>search: "UploadFS"<br>graph: UploadFS<br>details: ufs.ts ×2<br>search: "Store class" ·server<br>search: "Store" ·server |
| 19 | new-10-apps-engine | arch | 8 ⛔ | wiki<br>search: "IPostMessageUpdated" ·packages<br>graph↑: IPostMessageUpdated<br>search: "AppsEngineService" ·server<br>details: service.ts<br>search: "AppListenerManager"<br>details: AppListenerManager.symbolName<br>details: IPostMessageUpdated.ts |
| 20 | new-20-proxify | loc | 8 ⛔ | wiki<br>search: "proxify" ·packages<br>details: proxify.ts<br>search: "handler"<br>details: proxify.ts<br>search: "api.call" ·packages<br>search: "api" ·packages<br>details: createMockWizardApi.ts |
| 21 | tour-07-db-model-create | patt | 8 ⛔ | wiki<br>search: "registerModel"<br>details: proxify.ts<br>search: "ICannedResponseModel"<br>details: ICannedResponseModel.ts<br>search: "CannedResponseRaw"<br>details: CannedResponse.ts<br>search: "CannedResponseRaw" ·server |
| 22 | tour-08-db-model-use | patt | 4 | wiki<br>search: "SubscriptionsRaw" ·packages<br>details: Subscriptions.ts ×2 |
| 23 | tour-11-new-package | patt | 7 | plan: pattern<br>wiki<br>search: "package.json" ·packages<br>details: package.json<br>graph: packages/core-typings<br>details: package.json<br>search: "\" ·packages |
| 24 | tour-10-new-service | patt | 8 ⛔ | wiki<br>search: "api.registerService"<br>graph↓: api.registerService<br>search: "registerService" ·server<br>details: startup.ts<br>details: api.ts<br>search: "IServiceClass"<br>details: ServiceClass.ts |
| 25 | new-21-impact-settings | imp | 3 | plan: impact<br>search: "CachedSettings"<br>graph↑: CachedSettings |
| 26 | new-22-2fa | arch | 1 | wiki |
| 27 | claude-04-e2e-encryption | arch | 11 ⛔ | wiki<br>search: "" ·server<br>search: "E2E class" ·client<br>search: "E2ERoom class" ·client<br>search: "apps/meteor/client/lib/e2ee/rocketchat.e2e.ts"<br>search: "apps/meteor/client/lib/e2ee/rocketchat.e2e.room.ts"<br>search: "setUserPublicAndPrivateKeys" ·server<br>search: "resetRoomKey" ·server<br>search: "fetchMyKeys" ·server<br>search: "acceptSuggestedGroupKey" ·server<br>search: "rejectSuggestedGroupKey" ·server |
| 28 | new-12-ldap-auth | rout | 8 ⛔ | wiki<br>search: "LDAPManager"<br>graph↓: LDAPManager.login<br>details: Manager.ts<br>graph↓: LDAPManager.login<br>graph↓: LDAPManager<br>details: Manager.ts ×2 |
| 29 | claude-02-msg-permissions | loc | 9 ⛔ | plan: locate<br>search: "message permission"<br>wiki<br>search: "canSendMessageAsync"<br>search: "canDeleteMessageAsync"<br>details: canSendMessage.ts<br>details: canDeleteMessage.ts<br>search: "executeSendMessage"<br>search: "deleteMessageValidatingPermission" |
| 30 | new-14-ee-license | loc | 1 | wiki |
| 31 | new-13-room-creation | chain | 6 | plan: call-chain<br>search: "CreateChannelModal" ·client<br>graph↓: CreateChannelModal<br>details: createChannel.ts ×2<br>details: createRoom.ts |
| 32 | new-23-omnichannel | chain | 8 ⛔ | wiki<br>search: "OmnichannelQueue" ·server<br>details: queue.ts ×3<br>details: closeRoom.ts ×3 |
| 33 | claude-06-livechat-routing | rout | 8 ⛔ | wiki<br>plan: routing<br>search: "GET /livechat/room"<br>search: "addRoute 'livechat/room'"<br>search: "QueueManager.requestRoom"<br>search: "RoutingManager.delegateInquiry"<br>graph↓: QueueManager.requestRoom ×2 |
| 34 | new-26-team | loc | 8 ⛔ | wiki<br>search: "TeamService"<br>graph: TeamService<br>details: service.ts<br>search: "TeamMember"<br>details: TeamMember.ts<br>details: ITeamMemberModel.ts<br>search: "ITeamMember" |
