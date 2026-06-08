# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Gemini Answer

The blast radius of changing the `Streamer` module in Rocket.Chat is extensive, impacting numerous core functionalities that rely on real-time communication. The `Streamer` module is fundamental to how Rocket.Chat pushes updates to clients.

The impact can be traced from the entry point `notifyOnMessageChange` (which uses `api.broadcast` and ultimately the `Streamer` module) up through its callers.

**Call Chain:**
`notifyOnMessageChange` (apps/meteor/app/lib/server/lib/notifyListener.ts)
  → `api.broadcast`
  → `ListenersModule event handler`
  → `streamRoomMessage.emitWithoutBroadcast`
  → `Streamer._emit()` (apps/meteor/server/modules/streamer/streamer.module.ts)
  → `DDP WebSocket`
  → `client Streamer.receive()` (apps/meteor/client/lib/streamer/streamer.ts)

**Key Files in the Call Chain:**
*   `apps/meteor/app/lib/server/lib/notifyListener.ts`
*   `apps/meteor/server/modules/streamer/streamer.module.ts`
*   `apps/meteor/client/lib/streamer/streamer.ts`

**Blast Radius (Upstream Callers of `notifyOnMessageChange`):**

**Direct Callers (15 symbols):**
These are the most immediate functions that will be affected as they directly call `notifyOnMessageChange`:
*   `declineLivechatCall` (apps/meteor/server/services/video-conference/service.ts)
*   `saveSystemMessage`, `afterSave` (apps/meteor/server/services/messages/service.ts)
*   `onEmailReceived` (apps/meteor/server/features/EmailInbox/EmailInbox_Incoming.ts)
*   `markMessageAsReadBySender` (apps/meteor/ee/server/lib/message-read-receipt/ReadReceipt.ts)
*   `unfollowMessage` (apps/meteor/app/threads/server/methods/unfollowMessage.ts)
*   `followMessage` (apps/meteor/app/threads/server/methods/followMessage.ts)
*   `processThreads` (apps/meteor/app/threads/server/hooks/aftersavemessage.ts)
*   `setReaction` (apps/meteor/app/reactions/server/setReaction.ts)
*   `starMessage` (apps/meteor/app/message-star/server/starMessage.ts)
*   `unpinMessage` (apps/meteor/app/message-pin/server/pinMessage.ts)
*   `deleteMessage` (apps/meteor/app/lib/server/functions/deleteMessage.ts)
*   `deleteThreadMessage` (apps/meteor/app/lib/server/functions/deleteMessage.ts)
*   `updateAndNotifyParentRoomWithParentMessage` (apps/meteor/app/discussion/server/hooks/propagateDiscussionMetadata.ts)
*   `notifyTranslatedMessage` (apps/meteor/app/autotranslate/server/autotranslate.ts)

**Indirect Dependents (2-hop, 10 symbols):**
These functions are higher-level operations that eventually lead to a `Streamer` interaction:
*   `saveSystemMessageAndNotifyUser` (apps/meteor/server/services/messages/service.ts)
*   `afterSaveMessage`, `afterSaveMessageAsync` (apps/meteor/app/lib/server/lib/afterSaveMessage.ts)
*   `configureEmailInboxes` (apps/meteor/server/features/EmailInbox/EmailInbox.ts)
*   `executeSetReaction` (apps/meteor/app/reactions/server/setReaction.ts)
*   `deleteMessage` (apps/meteor/server/services/messages/service.ts)
*   `processMessageDeleted` (apps/meteor/app/slackbridge/server/SlackAdapter.ts)
*   `deleteMessageValidatingPermission` (apps/meteor/app/lib/server/functions/deleteMessage.ts)
*   `delete` (apps/meteor/app/apps/server/bridges/messages.ts)
*   `translateMessage` (apps/meteor/app/autotranslate/server/autotranslate.ts)

**3-hop Dependents (56 symbols):**
This layer reveals broader features and services that, several steps removed, interact with the `Streamer` module:
*   Livechat operations (`saveTransferHistory` in `apps/meteor/app/livechat/server/lib/transfer.ts`, `afterRoomClosed` in `apps/meteor/app/livechat/server/lib/closeRoom.ts`, `requestRoom` in `apps/meteor/app/livechat/server/lib/QueueManager.ts`)
*   Message manipulation (`updateMessage` in `apps/meteor/app/lib/server/functions/updateMessage.ts`, `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`)
*   Discussion creation (`create` in `apps/meteor/app/discussion/server/methods/createDiscussion.ts`)
*   Reactions (`reactToMessage` in `apps/meteor/server/services/messages/service.ts`, `onReactionRemoved`, `onReactionAdded` in `apps/meteor/app/slackbridge/server/SlackAdapter.ts`)
*   App Engine interactions (`removeLocal` in `packages/apps-engine/src/server/AppManager.ts`, `unregisterProviders` in `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`)

**4-hop Dependents (98 symbols):**
This represents a very broad set of functionalities across various modules. It includes:
*   More Livechat room management (`returnRoomAsInquiry` in `apps/meteor/app/livechat/server/lib/rooms.ts`, `forwardRoomToAgent` in `apps/meteor/app/livechat/server/lib/Helper.ts`, `forwardRoomToDepartment` in `apps/meteor/app/livechat/server/lib/Helper.ts`, `closeRoom` in `apps/meteor/app/livechat/server/lib/closeRoom.ts`, `createRoom` in `apps/meteor/app/livechat/server/lib/rooms.ts`)
*   Extensive message update and creation (`updateMessageRemovingFiles` in `apps/meteor/server/services/upload/service.ts`, `updateMessage` in `apps/meteor/server/services/messages/service.ts`)
*   Slack Bridge interactions (`postMessageUpdate`, `processMessageChanged` in `apps/meteor/app/slackbridge/server/SlackAdapter.ts`)
*   Various message sending functions (`sendMessageWithValidation` in `apps/meteor/server/services/messages/service.ts`, `sendHistoryMessage` in `apps/meteor/server/services/media-call/service.ts`, `sendErrorReplyMessage` in `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`)

**Conclusion:**
Changes to the `Streamer` module will affect almost every real-time feature in Rocket.Chat, including core messaging functions (sending, deleting, updating messages, reactions), Livechat operations, email inbox processing, video conferencing, third-party integrations (e.g., Slack Bridge), and the App Engine. Any modification will require extensive testing across the entire platform.

## Tool Calls (8 calls, 33,429 tokens)

**Step 1:** `search({"query":"Streamer"})` → 508 tokens
**Step 2:** `graph({"direction":"up","mode":"impact","layer":"server","query":"Streamer"})` → 178 tokens
**Step 3:** `search({"query":"StreamerCentral"})` → 205 tokens
**Step 4:** `graph({"layer":"server","direction":"up","query":"StreamerCentral","mode":"impact"})` → 164 tokens
**Step 5:** `search({"query":"api.broadcast","layer":"server"})` → 419 tokens
**Step 6:** `graph({"direction":"up","mode":"impact","layer":"server","query":"api.broadcast"})` → 13 tokens
**Step 7:** `search({"query":"notifyOnMessageChange","layer":"server"})` → 186 tokens
**Step 8:** `graph({"mode":"impact","layer":"server","direction":"up","query":"notifyOnMessageChange"})` → 1276 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/5 |
| Symbols hit | 3/5 |
| Tool calls | 8 |
| Total tokens | 33,429 |
| Pass | NO |
