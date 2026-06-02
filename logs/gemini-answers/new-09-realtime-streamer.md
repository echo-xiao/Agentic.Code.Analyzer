# How does a new message appear in real-time on the client after being saved to the database?

## Gemini Answer

The system uses a DDP (Distributed Data Protocol) publish/subscribe mechanism for real-time updates.

The core component responsible for pushing real-time updates to clients is `StreamerCentral`. However, the direct callers or publishers to `StreamerCentral` were not found through the `graph` tool with the provided depth and layer filters, indicating that the publishing mechanism might be dynamically registered or involve a more complex pattern.

The `Meteor.publish` function is used to define server-side data publications that clients can subscribe to. Although a direct `Meteor.publish('roomMessages')` wasn't explicitly found, it's the standard Meteor way for a server to send data to subscribed clients in real-time.

Based on the architecture notes and the search results, the general flow for a new message appearing in real-time on the client after being saved to the database is as follows:

**Call Chain:**

1.  **Server-side Message Save:** A new message is saved to the database (e.g., via `Messages.insertOne` as mentioned in the server message sending architecture).
2.  **Server-side Publication:** The server, likely through a `Meteor.publish` declaration (such as for `roomMessages` or a similar stream), detects the new message.
    *   **File:** `apps/meteor/app/notifications/server/lib/Notifications.ts` (contains `Meteor.publish` usage for notifications, suggesting similar patterns for messages).
3.  **StreamerCentral:** The new message data is then pushed to `StreamerCentral`.
    *   **File:** `apps/meteor/server/modules/streamer/streamer.module.ts` (where `StreamerCentral` is instantiated).
4.  **DDP Push to Client:** `StreamerCentral` uses DDP WebSockets to push these real-time updates to all subscribed clients.
5.  **Client-side Subscription:** The client, having previously subscribed to the relevant message stream (e.g., `Meteor.subscribe('roomMessages')`), receives the DDP push.
    *   **File:** `apps/meteor/client/lib/streamer/streamer.ts` (client-side streamer implementation).
6.  **Client-side UI Update:** The client-side application then processes the received message data and updates the UI to display the new message.

## Tool Calls (8 calls, 34,009 tokens)

**Step 1:** `search({"query":"StreamerCentral"})` → 111 tokens
**Step 2:** `graph({"depth":3,"query":"afterSaveMessage","edgeTypes":["event_listen"],"direction":"down"})` → 40 tokens
**Step 3:** `graph({"depth":4,"edgeTypes":["event_listen"],"query":"afterSaveMessage","direction":"down"})` → 40 tokens
**Step 4:** `graph({"direction":"up","layer":"server","query":"StreamerCentral","depth":4})` → 51 tokens
**Step 5:** `search({"query":"Meteor.publish","layer":"server"})` → 101 tokens
**Step 6:** `search({"query":"Meteor.publish('roomMessages'","layer":"server"})` → 18 tokens
**Step 7:** `implement({"filename":"apps/meteor/server/modules/streamer/streamer.module.ts","symbolName":"StreamerCentral"})` → 36 tokens
**Step 8:** `search({"query":"StreamerCentralClass"})` → 90 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/5 |
| Symbols hit | 1/4 |
| Tool calls | 8 |
| Total tokens | 34,009 |
