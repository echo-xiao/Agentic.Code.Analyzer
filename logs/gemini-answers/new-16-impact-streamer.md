# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Gemini Answer

The Streamer module in Rocket.Chat is a critical component of its real-time messaging infrastructure. Changing this module, particularly its core `_emit` functionality, would have a significant blast radius across the application, affecting all features that rely on real-time message updates.

The core real-time message flow is as follows:

**Call Chain:** `notifyOnMessageChange` → `api.broadcast('watch.messages')` → `ListenersModule event handler` → `streamRoomMessage.emitWithoutBroadcast` → `Streamer._emit()` → `DDP WebSocket` → `client Streamer.receive()`.

**Key files and their roles:**

1.  **Entry Point:** `notifyOnMessageChange` in `apps/meteor/app/lib/server/lib/notifyListener.ts`
    *   This function is triggered after a database write related to messages.
2.  **Broadcasting:** The system then uses `api.broadcast('watch.messages')`.
3.  **Event Handling:** A `ListenersModule event handler` then processes this broadcast.
4.  **Message Streaming:** `streamRoomMessage.emitWithoutBroadcast(roomId, message)` in `apps/meteor/server/modules/notifications/notifications.module.ts` is invoked.
5.  **Core Streamer Functionality:** This, in turn, calls `Streamer._emit()` from `apps/meteor/server/modules/streamer/streamer.module.ts`. This is the method responsible for sending the real-time update over the DDP WebSocket.
6.  **Client Reception:** The DDP WebSocket then delivers the message to the client, where `client Streamer.receive()` processes it.

Therefore, any changes to the `Streamer` module in `apps/meteor/server/modules/streamer/streamer.module.ts`, especially `Streamer._emit()`, would directly impact the real-time delivery of messages and other related events that utilize this streaming mechanism. All features relying on instant updates for messages would be affected.

## Tool Calls (8 calls, 25,385 tokens)

**Step 1:** `search({"query":"Streamer","layer":"server"})` → 229 tokens
**Step 2:** `graph({"mode":"impact","query":"Streamer","layer":"server","direction":"up"})` → 178 tokens
**Step 3:** `graph({"direction":"up","layer":"server","mode":"impact","query":"Streamer._emit"})` → 13 tokens
**Step 4:** `search({"layer":"server","query":"StreamerCentral"})` → 183 tokens
**Step 5:** `graph({"layer":"server","mode":"impact","query":"StreamerCentral","direction":"up"})` → 164 tokens
**Step 6:** `search({"layer":"server","query":"streamRoomMessage"})` → 187 tokens
**Step 7:** `graph({"layer":"server","mode":"impact","query":"streamRoomMessage","direction":"up"})` → 167 tokens
**Step 8:** `search({"query":"notifyOnMessageChange","layer":"server"})` → 186 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/5 |
| Symbols hit | 3/5 |
| Tool calls | 8 |
| Total tokens | 25,385 |
| Pass | NO |
