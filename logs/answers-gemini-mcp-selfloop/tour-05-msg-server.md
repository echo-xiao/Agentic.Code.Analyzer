# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

The server-side message sending in Rocket.Chat follows a multi-step process, starting with a core `sendMessage` function that handles validation, app integrations, database persistence, and finally, broadcasting updates to clients.

The primary entry point for server-side message sending is `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`. This function orchestrates the following flow:

**Call Chain:**

`sendMessage` (`apps/meteor/app/lib/server/functions/sendMessage.ts`)
1.  **Message Validation:** Calls `validateMessage` to ensure the message, room, and user are valid.
2.  **Message Preparation:** Calls `prepareMessageObject` to format the message object.
3.  **Apps Engine Hooks (Pre-Send):** Integrates with the Rocket.Chat Apps Engine via `Apps.self?.triggerEvent` for `IPreMessageSentPrevent`, `IPreMessageSentModify`, and `IPreMessageSentExtend` to allow external apps to modify or prevent the message from being sent.
4.  **Before Save Hook:** Invokes `Message.beforeSave` for any pre-database storage processing.
5.  **Database Persistence:**
    *   If `upsert` is true and an `_id` exists, it calls `Messages.updateOne` to update an existing message in the database.
    *   Otherwise, it calls `Messages.insertOne` to insert a new message into the `Messages` collection.
6.  **Apps Engine Hooks (Post-Send):** Triggers `IPostSystemMessageSent` or `IPostMessageSent` events via `Apps.self?.triggerEvent` after the message has been saved.
7.  **`afterSaveMessage`**: This function is called to perform actions after the message is saved.
    *   `afterSaveMessage` (`apps/meteor/app/lib/server/functions/sendMessage.ts`)
    *   Triggers an internal `afterSaveMessage` event (which is handled by various modules for tasks like notifications, auto-translation, and app integration).
    *   Calls `afterSave` within `apps/meteor/server/services/messages/service.ts`, which further calls `notifyOnMessageChange` (`apps/meteor/server/services/messages/notifyListener.ts`).
8.  **`notifyOnRoomChangedById`**: This function is called to notify clients about the changes in the room.
    *   `notifyOnRoomChangedById` (`apps/meteor/app/lib/server/lib/notifyListener.ts`)
    *   This function utilizes `LocalBroker.ts` to `broadcast` the room changes, ensuring real-time updates are propagated to connected clients.

**Key Files and Their Roles:**

*   `apps/meteor/app/lib/server/functions/sendMessage.ts`: The central server-side function for sending messages, handling the main logic flow from validation to persistence and post-save actions.
*   `apps/meteor/server/services/messages/service.ts`: Contains service-level logic related to messages, including further processing after a message is saved, which triggers notifications.
*   `apps/meteor/server/services/messages/notifyListener.ts`: Responsible for notifying clients about message changes, often broadcasting updates.
*   `packages/rocketchat-apps/lib/server/Apps.ts`: Manages the Rocket.Chat Apps Engine, allowing external applications to hook into the message sending process.
*   `packages/rocketchat-models/server/models/Messages.ts`: Provides the interface for interacting with the `Messages` database collection for insertion and updates.
*   `apps/meteor/app/lib/server/lib/notifyListener.ts`: Contains the `notifyOnRoomChangedById` function responsible for broadcasting room changes to clients.
*   `packages/rocketchat-channel-broker/lib/LocalBroker.ts`: Handles the local broadcasting mechanism to propagate real-time updates to connected clients.

## Tool Calls (6 calls, 28,535 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"server"})` → 411 tokens
**Step 2:** `graph({"query":"sendMessage","layer":"server","direction":"down"})` → 637 tokens
**Step 3:** `graph({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","layer":"server","query":"sendMess)` → 637 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens
**Step 5:** `graph({"query":"afterSaveMessage","layer":"server","direction":"down"})` → 348 tokens
**Step 6:** `graph({"layer":"server","query":"notifyOnRoomChangedById","direction":"down"})` → 315 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 1/3 |
| Tool calls | 6 |
| Total tokens | 28,535 |
| Pass | NO |
