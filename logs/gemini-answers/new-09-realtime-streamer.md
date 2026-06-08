# How does a new message appear in real-time on the client after being saved to the database?

## Gemini Answer

After a message is saved to the database, its real-time appearance on the client follows this chain:

1.  **`notifyOnMessageChange`** (`apps/meteor/app/lib/server/lib/notifyListener.ts`): This function is triggered after a message is saved. It constructs the message data to be broadcast.
2.  **`api.broadcast('watch.messages', { message })`** (`apps/meteor/app/lib/server/lib/notifyListener.ts`): Inside `notifyOnMessageChange`, an event named 'watch.messages' is broadcast through the `api.broadcast` mechanism.
3.  **`service.onEvent('watch.messages')`** (`apps/meteor/server/modules/listeners/listeners.module.ts`): A listener in the server's `listeners.module.ts` captures the 'watch.messages' event. This listener then processes the incoming message.

The full call chain is:
`notifyOnMessageChange` (apps/meteor/app/lib/server/lib/notifyListener.ts)
`→ api.broadcast('watch.messages')` (apps/meteor/app/lib/server/lib/notifyListener.ts)
`→ service.onEvent('watch.messages')` (apps/meteor/server/modules/listeners/listeners.module.ts)

This process ultimately leads to the message being pushed to the client via DDP (Distributed Data Protocol) over a WebSocket connection, enabling real-time updates.

## Tool Calls (8 calls, 36,608 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 411 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"sendMessage"})` → 637 tokens
**Step 3:** `search({"query":"stream-room-messages","layer":"server"})` → 16 tokens
**Step 4:** `search({"layer":"server","query":"publish"})` → 242 tokens
**Step 5:** `search({"layer":"server","query":"notifyOnMessageChange"})` → 186 tokens
**Step 6:** `graph({"query":"notifyOnMessageChange","layer":"server","direction":"down"})` → 625 tokens
**Step 7:** `implement({"symbolName":"notifyOnMessageChange","filename":"apps/meteor/app/lib/server/lib/notifyListener.ts"})` → 118 tokens
**Step 8:** `search({"layer":"server","query":"watch.messages"})` → 141 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/5 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 36,608 |
| Pass | NO |
