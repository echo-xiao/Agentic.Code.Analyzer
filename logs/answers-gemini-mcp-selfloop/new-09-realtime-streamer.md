# How does a new message appear in real-time on the client after being saved to the database?

## Plan

intent: call-chain

## Gemini Answer

A new message appearing in real-time on the client after being saved to the database follows this flow:

**Server-side:**

1.  **`afterSaveMessage` hook:** After a message is saved to the database, the `afterSaveMessage` hook in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts` is triggered. This hook is a central point for post-message persistence actions.
2.  **`notifyOnMessageChange`:** Within `afterSaveMessage`, the `notifyOnMessageChange` function (defined in `apps/meteor/app/lib/server/lib/notifyListener.ts`) is called.
3.  **`api.broadcast('watch.messages', { message })`:** The `notifyOnMessageChange` function retrieves the message data and then broadcasts an event named `'watch.messages'` with the new message object to all connected clients. This is the mechanism for real-time updates.

**Client-side:**

While the exact client-side subscription to `'watch.messages'` was not directly found in the provided tool outputs, the typical Rocket.Chat architecture for real-time updates involves:

1.  **Client-side subscription:** The client-side code (likely within `apps/meteor/client/startup/incomingMessages.ts` or a similar file responsible for initializing real-time streams) subscribes to the `'watch.messages'` event broadcast by the server. This is usually done using a Meteor stream or a similar real-time communication mechanism.
2.  **Message processing:** Upon receiving a `'watch.messages'` event, the client-side handler processes the incoming message. This involves:
    *   Updating the local message store (e.g., `apps/meteor/client/stores/Messages.ts`).
    *   Triggering UI re-renders to display the new message in the chat interface (e.g., components like `apps/meteor/client/views/room/MessageList/MessageListItem.tsx`).
    *   Potentially updating other related UI elements, such as unread indicators or last message previews.

**Key Files:**

*   **`apps/meteor/app/lib/server/lib/afterSaveMessage.ts`**: Contains the `afterSaveMessage` hook, the entry point for post-save message processing on the server.
*   **`apps/meteor/app/lib/server/lib/notifyListener.ts`**: Defines `notifyOnMessageChange`, which broadcasts the real-time message update to clients.

## Tool Calls (8 calls, 48,459 tokens)

**Step 1:** `plan({"question":"How does a new message appear in real-time on the client after being saved to the database?","intent":"call)` → 3159 tokens
**Step 2:** `search({"query":"afterSaveMessage","layer":"server"})` → 152 tokens
**Step 3:** `graph({"file":"afterSaveMessage.ts","depth":3,"query":"afterSaveMessage","move":"down"})` → 573 tokens
**Step 4:** `details({"filename":"notifyListener.ts","symbolName":"notifyOnMessageChange"})` → 111 tokens
**Step 5:** `search({"query":"watch.messages","layer":"client"})` → 26 tokens
**Step 6:** `details({"filename":"incomingMessages.ts","symbolName":"incomingMessages"})` → 57 tokens
**Step 7:** `details({"filename":"incomingMessages.ts","symbolName":"default"})` → 15 tokens
**Step 8:** `search({"layer":"client","query":"api.onStream"})` → 25 tokens

## Files Seen In Tool Results (32)

- `packages/ui-composer/src/MessageComposer/MessageComposer.tsx`
- `packages/ui-composer/src/MessageComposer/MessageComposerIcon.tsx`
- `packages/ui-composer/src/MessageFooterCallout/MessageFooterCalloutContent.tsx`
- `apps/meteor/app/ui/client/lib/ChatMessages.ts`
- `apps/meteor/client/views/room/MessageList/lib/isMessageNewDay.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/client/startup/incomingMessages.ts`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `apps/meteor/app/lib/server/functions/updateMessage.ts`
- `apps/meteor/app/lib/server/functions/insertMessage.ts`
- `apps/meteor/client/lib/onClientMessageReceived.ts`
- `apps/meteor/server/publications/messages.ts`
- `packages/models/src/models/MessageReads.ts`
- `apps/meteor/client/stores/Messages.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `packages/livechat/src/hooks/useRoomMessagesSubscription.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/client/views/room/contextualBar/Threads/components/ThreadMessageItem.tsx`
- `packages/livechat/src/hooks/useDeleteMessageSubscription.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/lib/server/functions/isTheLastMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/index.ts`
- `apps/meteor/client/hooks/useInfiniteMessageQueryUpdates.ts`
- `apps/meteor/client/views/room/contextualBar/Threads/hooks/useThreadMainMessageQuery.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterReadMessages.ts`
- `apps/meteor/server/lib/dataExport/exportRoomMessagesToFile.ts`
- `apps/meteor/client/views/room/MessageList/MessageListItem.tsx`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `packages/livechat/src/routes/TriggerMessage/component.tsx`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
