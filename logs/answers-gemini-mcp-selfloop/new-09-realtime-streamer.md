# How does a new message appear in real-time on the client after being saved to the database?

## Plan

intent: call-chain

## Gemini Answer

The real-time display of new messages on the client after being saved to the database follows this flow:

**Entry Point:** `notifyOnMessageChange` in `apps/meteor/app/lib/server/lib/notifyListener.ts`

1.  **`notifyOnMessageChange`** (apps/meteor/app/lib/server/lib/notifyListener.ts): This function is triggered when a message changes. It retrieves the message data to be broadcast.
2.  **`api.broadcast('watch.messages', { message })`** (apps/meteor/app/lib/server/lib/notifyListener.ts): After fetching the message, `notifyOnMessageChange` uses `api.broadcast` to send a `watch.messages` event with the message payload. This is a crucial step for real-time communication.

While the full chain to the client-side `Streamer.receive()` wasn't directly traced in the provided tool outputs, the `api.broadcast('watch.messages')` call is the key mechanism that initiates the real-time push to connected clients. The plan's architecture description indicates that this broadcast is then handled by `ListenersModule` event handlers, which in turn use `streamRoomMessage.emitWithoutBroadcast(roomId, message)` and `Streamer._emit()` to send the message over a DDP WebSocket to the client. On the client, `Streamer.receive()` would then process this incoming message.

## Tool Calls (8 calls, 25,576 tokens)

**Step 1:** `plan({"intent":"call-chain","question":"How does a new message appear in real-time on the client after being saved to the dat)` → 220 tokens
**Step 2:** `search({"query":"notifyOnMessageChange","layer":"server"})` → 74 tokens
**Step 3:** `graph({"query":"notifyOnMessageChange","move":"down","depth":5,"file":"notifyListener.ts"})` → 769 tokens
**Step 4:** `search({"query":"api.broadcast","layer":"server"})` → 428 tokens
**Step 5:** `details({"filename":"notifyListener.ts","symbolName":"notifyOnMessageChange"})` → 111 tokens
**Step 6:** `search({"layer":"server","query":"streamRoomMessage"})` → 76 tokens
**Step 7:** `details({"symbolName":"streamRoomMessage","filename":"notifications.module.ts"})` → 77 tokens
**Step 8:** `search({"query":"emitWithoutBroadcast","layer":"server"})` → 75 tokens

## Files Seen In Tool Results (12)

- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/ee/server/apps/communication/websockets.ts`
- `apps/meteor/app/slashcommands-invite/server/server.ts`
- `apps/meteor/app/slashcommands-inviteall/server/server.ts`
- `apps/meteor/ee/app/license/server/startup.ts`
- `apps/meteor/tests/unit/server/services/calendar/statusEvents/applyStatusChange.ts`
- `apps/meteor/server/services/banner/service.ts`
- `apps/meteor/app/slashcommands-archiveroom/server/server.ts`
- `apps/meteor/app/slashcommands-hide/server/hide.ts`
- `apps/meteor/app/slashcommands-unarchiveroom/server/server.ts`
- `apps/meteor/server/modules/notifications/notifications.module.ts`
- `apps/meteor/server/modules/streamer/streamer.module.ts`
