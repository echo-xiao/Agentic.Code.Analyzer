# How does a new message appear in real-time on the client after being saved to the database?

## Plan

intent: architecture

## Gemini Answer

Rocket.Chat delivers new messages to clients in real-time through a system built on Meteor's DDP and WebSockets. The process involves both client-side optimistic updates and server-side persistence and broadcasting.

Here's the flow:

1.  **Client-side Preprocessing and Optimistic Update**: When a user sends a message, the `sendMessage` function in `apps/meteor/client/lib/chats/flows/sendMessage.ts` is triggered. This function performs an optimistic update, adding the message to the local `Messages` store with a `temp: true` flag, making it appear instantly to the sender.

2.  **Server-side Persistence**: The client then calls the server-side `sendMessage` method via `sdk.call('sendMessage', message, previewUrls)`. On the server, the `executeSendMessage` function in `apps/meteor/app/lib/server/methods/sendMessage.ts` handles the message, performing validation and inserting it into the `Messages` collection in MongoDB.

3.  **Real-time Delivery (Server-side)**: After the message is saved, the `afterSaveMessage` hook is triggered. This hook, defined in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`, eventually leads to `notifyOnMessageChange` in `apps/meteor/app/lib/server/lib/notifyListener.ts`. The `notifyOnMessageChange` function then broadcasts a `watch.messages` event with the new message data using `api.broadcast('watch.messages', { message })`.

4.  **Real-time Delivery (Client-side)**: On the client, the `LegacyRoomManager` in `apps/meteor/app/ui-utils/client/lib/LegacyRoomManager.ts` subscribes to `room-messages` streams using `sdk.stream('room-messages', [record.rid], async (msg) => { ... })`. When a new message event is received through this stream, the client updates its local `Messages` store and removes the `temp` flag from the optimistically updated message, ensuring the message is permanently displayed.

## Tool Calls (8 calls, 48,027 tokens)

**Step 1:** `plan({"question":"How does a new message appear in real-time on the client after being saved to the database?","intent":"arch)` → 85 tokens
**Step 2:** `wiki({"question":"How does Rocket.Chat handle real-time message delivery to clients?"})` → 853 tokens
**Step 3:** `search({"query":"afterSaveMessage","layer":"server"})` → 152 tokens
**Step 4:** `graph({"query":"afterSaveMessage","move":"down","depth":5,"file":"afterSaveMessage.ts"})` → 2853 tokens
**Step 5:** `details({"filename":"notifyListener.ts","symbolName":"notifyOnMessageChange"})` → 111 tokens
**Step 6:** `search({"layer":"client","query":"LegacyRoomManager"})` → 74 tokens
**Step 7:** `details({"symbolName":"LegacyRoomManager","filename":"LegacyRoomManager.ts"})` → 115 tokens
**Step 8:** `search({"layer":"client","query":"sdk.stream('room-messages')"})` → 29 tokens

## Files Seen In Tool Results (8)

- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/ui-utils/client/lib/LegacyRoomManager.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
