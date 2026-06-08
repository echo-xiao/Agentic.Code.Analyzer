# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

The server-side message sending process in Rocket.Chat begins with a client-side DDP method call, which is then handled by a server-side Meteor method. The core logic for processing and persisting the message resides in `apps/meteor/app/lib/server/functions/sendMessage.ts`.

Here's the call chain for how a message is sent on the server side:

**Call Chain:**
Entry Point (Client Call) → `apps/meteor/app/lib/server/methods/sendMessage.ts` (Meteor Method Handler - implied) → `apps/meteor/app/lib/server/functions/sendMessage.ts` → Validation/Preparation → Apps Integration Hooks → Database Persistence (`Messages.insertOne`/`Messages.updateOne`) → Post-Save Hooks → Real-time Notification

**Detailed Steps:**

1.  **Client Initiates Message Send:** A client application (e.g., web UI, mobile app) calls a Meteor method, typically named `sendMessage`. This method call is handled by the DDP (Distributed Data Protocol) over a WebSocket connection.

2.  **Server Method Handler:** The server-side Meteor method, likely defined in `apps/meteor/app/lib/server/methods/sendMessage.ts`, receives the DDP call. This method acts as an entry point and delegates the actual message processing to the core function.

3.  **Core Message Processing (`sendMessage`)**:
    *   **File:** `apps/meteor/app/lib/server/functions/sendMessage.ts`
    *   This function performs the central message handling:
        *   **Validation:** It first calls `validateMessage` to ensure the message, room, and user are valid.
        *   **Preparation:** `prepareMessageObject` is invoked to format the message object with necessary server-side data.
        *   **Apps Integration (Pre-Send Hooks):** Rocket.Chat Apps can intercept the message via several event triggers:
            *   `AppEvents.IPreMessageSentPrevent`: Allows apps to prevent the message from being sent.
            *   `AppEvents.IPreMessageSentExtend`: Allows apps to extend the message object.
            *   `AppEvents.IPreMessageSentModify`: Allows apps to modify the message content.
        *   **Before Save Hook:** `Message.beforeSave` is executed to perform any final processing or transformations before the message is written to the database.
        *   **Database Persistence:**
            *   If the message has an `_id` and the `upsert` option is true, `Messages.updateOne` is called to update an existing message in the `Messages` MongoDB collection.
            *   Otherwise, for a new message, `Messages.insertOne` is called to insert it into the `Messages` collection.
        *   **Apps Integration (Post-Send Hooks):** After saving, Apps are notified via `AppEvents.IPostSystemMessageSent` (for system messages) or `AppEvents.IPostMessageSent` (for regular messages).
        *   **After Save Hook:** `afterSaveMessage` is called to perform actions immediately after the message has been saved, such as broadcasting the message to subscribed clients.
        *   **Real-time Notification:** Finally, `notifyOnRoomChangedById(message.rid)` is invoked. This function is critical for the real-time nature of Rocket.Chat, signaling to connected clients that the specified room has been updated, prompting them to fetch the new message.

This comprehensive flow ensures message validation, extensibility through apps, robust database persistence, and immediate real-time updates to all relevant clients.

## Tool Calls (7 calls, 33,749 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 411 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"sendMessage"})` → 637 tokens
**Step 3:** `graph({"query":"sendMessage","direction":"down","layer":"server","depth":2})` → 335 tokens
**Step 4:** `implement({"symbolName":"sendMessage","filename":"apps/meteor/app/lib/server/methods/sendMessage.ts"})` → 352 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens
**Step 6:** `graph({"direction":"down","layer":"server","depth":1,"query":"sendMessage"})` → 174 tokens
**Step 7:** `graph({"direction":"down","layer":"server","filename":"apps/meteor/app/lib/server/functions/sendMessage.ts)` → 637 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 1/3 |
| Tool calls | 7 |
| Total tokens | 33,749 |
| Pass | NO |
