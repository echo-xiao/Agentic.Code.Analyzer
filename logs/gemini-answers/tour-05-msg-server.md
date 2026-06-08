# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

A message is sent on the Rocket.Chat server-side through the `sendMessage` function located in `apps/meteor/app/lib/server/functions/sendMessage.ts`.

Here's a breakdown of the process:

**Call Chain:**

1.  **Entry Point:** The `sendMessage` function in `apps/meteor/app/lib/server/functions/sendMessage.ts` serves as a core entry point for sending messages. This function is likely called by various server-side processes or DDP methods invoked from the client.

2.  **Message Validation and Preparation:**
    *   The function first validates the `user`, `message`, and `room._id` parameters.
    *   It then calls `validateMessage` to further validate the message.
    *   `prepareMessageObject` is called to prepare the message object for storage.

3.  **Read Receipts:** If `Message_Read_Receipt_Enabled` is active in the settings, the message's `unread` property is set to `true`.

4.  **Rocket.Chat Apps Integration:**
    *   The system checks if Rocket.Chat Apps are loaded (`Apps.self?.isLoaded()`).
    *   If so, it triggers several events for message prevention (`AppEvents.IPreMessageSentPrevent`), modification (`AppEvents.IPreMessageSentModify`), and extension (`AppEvents.IPreMessageSentExtend`). This allows installed apps to interact with and potentially alter the message before it is sent.
    *   If an app prevents the message from being sent, the function returns early.
    *   Any modifications from apps are applied to the message, and the message is re-validated.

5.  **Before Save Hook:** The `Message.beforeSave` hook is called, allowing further processing and modification of the message before it's persisted.

6.  **Database Persistence:**
    *   If `message._id` exists and `upsert` is true, the message is updated in the `Messages` collection using `Messages.updateOne`.
    *   Otherwise, it checks if a message with the same `_id` already exists. If not, the message is inserted into the `Messages` collection using `Messages.insertOne`.

7.  **Post-Save Events:**
    *   After the message is saved, if Rocket.Chat Apps are loaded, it triggers either `AppEvents.IPostSystemMessageSent` (for system messages) or `AppEvents.IPostMessageSent` (for regular messages).
    *   `afterSaveMessage` is called for any additional post-save processing.

8.  **Notification:** `notifyOnRoomChangedById` is called to notify clients about changes in the room due to the new message.

**Key Files:**

*   `apps/meteor/app/lib/server/functions/sendMessage.ts`: Contains the core logic for sending a message on the server.
*   `apps/meteor/server/services/messages/service.ts`: Another file with a `sendMessage` symbol, likely a service-layer abstraction that might call the function in `app/lib/server/functions/sendMessage.ts` or have its own implementation for specific scenarios. (Further investigation with `graph(down)` on this file would clarify its role.)

## Tool Calls (8 calls, 45,799 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 411 tokens
**Step 2:** `graph({"layer":"server","query":"sendMessage","filename":"apps/meteor/app/lib/server/functions/sendMessage)` → 637 tokens
**Step 3:** `graph({"query":"sendMessage","direction":"down","filename":"apps/meteor/app/lib/server/methods/sendMessage)` → 637 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/lib/server/methods/sendMessage.ts","symbolName":"sendMessage"})` → 352 tokens
**Step 5:** `search({"layer":"server","query":"Meteor.methods sendMessage"})` → 18 tokens
**Step 6:** `implement({"filename":"apps/meteor/server/services/messages/service.ts","symbolName":"sendMessage"})` → 461 tokens
**Step 7:** `implement({"filename":"apps/meteor/server/services/messages/service.ts","symbolName":""})` → 8 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 1/3 |
| Tool calls | 8 |
| Total tokens | 45,799 |
| Pass | NO |
