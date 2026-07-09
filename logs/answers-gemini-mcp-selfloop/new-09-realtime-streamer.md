# How does a new message appear in real-time on the client after being saved to the database?

## Plan

intent: architecture

## Gemini Answer

When a new message is saved to the database, it appears in real-time on the client through the following flow:

**Entry Point (Client-side optimistic update):**
1.  When a user sends a message, the client first performs an optimistic update by immediately inserting the message into the client-side `Messages` Zustand store, marking it as temporary. This provides immediate feedback to the user.
2.  Concurrently, the message is sent to the server via an `sdk.call('sendMessage')` API call. The `sendMessage` function is found in `/apps/meteor/app/lib/client/methods/sendMessage.ts` and `/apps/meteor/server/services/messages/service.ts`.

**Server-Side Processing and Broadcasting:**
1.  On the server, after the message is saved to the MongoDB `Messages` collection, the `Message.afterSave` hook is triggered. This hook is located in `/apps/meteor/server/services/messages/service.ts`.
2.  The `afterSave` hook then calls `notifyOnMessageChange`, which is responsible for broadcasting the new message.
3.  `notifyOnMessageChange` (located in `/apps/meteor/app/lib/server/lib/notifyListener.ts`) uses `api.broadcast('watch.messages', { message })` to send the new message to all connected clients.

**Client-Side Real-time Update:**
1.  Clients that are subscribed to the `room-messages` stream for a specific room will receive this broadcasted message via the `watch.messages` stream.
2.  Upon receiving a new message from the stream, the `upsertMessage` function is called. This function is located in `/apps/meteor/app/ui-utils/client/lib/RoomHistoryManager.ts`.
3.  The `upsertMessage` function processes the message and stores it in the client's `Messages.state`. This update to the client-side store causes the UI to re-render and display the new message.
4.  Additionally, the `streamNewMessage` client callback is run, which is used by components like `useHasNewMessages` to determine if a "new messages" indicator should be shown.

## Tool Calls (8 calls, 34,000 tokens)

**Step 1:** `plan({"question":"How does a new message appear in real-time on the client after being saved to the database?","intent":"arch)` → 864 tokens
**Step 2:** `search({"query":"sendMessage","layer":"server"})` → 318 tokens
**Step 3:** `details({"symbolName":"sendMessage","filename":"sendMessage.ts"})` → 520 tokens
**Step 4:** `search({"query":"notifyOnMessageChange","layer":"server"})` → 74 tokens
**Step 5:** `details({"filename":"notifyListener.ts","symbolName":"notifyOnMessageChange"})` → 111 tokens
**Step 6:** `graph({"query":"notifyOnMessageChange","file":"notifyListener.ts","move":"up","depth":2})` → 682 tokens
**Step 7:** `search({"query":"upsertMessage","layer":"client"})` → 72 tokens
**Step 8:** `details({"filename":"RoomHistoryManager.ts","symbolName":"upsertMessage"})` → 96 tokens

## Files Seen In Tool Results (45)

- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `packages/livechat/src/lib/room.js`
- `apps/meteor/client/startup/incomingMessages.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
- `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
- `packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts`
- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat-embedded.ts`
- `apps/meteor/tests/e2e/page-objects/fragments/home-content.ts`
- `apps/meteor/tests/e2e/federation/page-objects/fragments/home-content.ts`
- `apps/meteor/tests/data/messages.helper.ts`
- `apps/meteor/tests/data/chat.helper.ts`
- `apps/meteor/tests/data/livechat/rooms.ts`
- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `apps/meteor/server/features/EmailInbox/EmailInbox_Outgoing.ts`
- `apps/meteor/server/features/EmailInbox/EmailInbox_Incoming.ts`
- `apps/meteor/ee/server/lib/message-read-receipt/ReadReceipt.ts`
- `apps/meteor/app/threads/server/methods/unfollowMessage.ts`
- `apps/meteor/app/threads/server/methods/followMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/app/reactions/server/setReaction.ts`
- `apps/meteor/app/message-star/server/starMessage.ts`
- `apps/meteor/app/message-pin/server/pinMessage.ts`
- `apps/meteor/app/lib/server/functions/deleteMessage.ts`
- `apps/meteor/app/discussion/server/hooks/propagateDiscussionMetadata.ts`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/server/features/EmailInbox/EmailInbox.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/slackbridge/server/SlackAdapter.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/ui-utils/client/lib/RoomHistoryManager.ts`
