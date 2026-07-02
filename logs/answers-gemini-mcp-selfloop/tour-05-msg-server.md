# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

The server-side message sending in Rocket.Chat follows a structured flow, primarily orchestrated by the `sendMessage` function. The core process involves validation, app integration hooks, pre-save processing, database persistence, post-save actions, and client notifications.

Here's the detailed call chain:

**Entry Point:** `sendMessage` in `apps/meteor/app/lib/server/methods/sendMessage.ts` (DDP method called by clients)

**Core Logic:** `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`

**Flow:**

1.  **Initial Validation and Preparation:**
    *   `sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts)
        *   Performs initial checks for user, message, and room validity.
        *   Calls `validateMessage(message, room, user)` to ensure message content is valid.
        *   Calls `prepareMessageObject(message, room._id, user)` to set up the message object.

2.  **App Integration (Pre-send Hooks):**
    *   `sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts)
        *   Triggers `AppEvents.IPreMessageSentPrevent` via `Apps.self?.triggerEvent` to allow apps to prevent message sending.
        *   Triggers `AppEvents.IPreMessageSentExtend` and `AppEvents.IPreMessageSentModify` via `Apps.self?.triggerEvent` to allow apps to extend or modify the message object before it's saved.

3.  **Before Save Processing:**
    *   `sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts)
        *   Calls `Message.beforeSave({ message, room, user, previewUrls, parseUrls: message.parseUrls })`. This is a critical step where the message undergoes final transformations, such as markdown parsing, URL preview generation, and other pre-persistence logic.

4.  **Database Persistence:**
    *   `sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts)
        *   If `message._id` exists and `upsert` is true, it calls `Messages.updateOne` to update an existing message.
        *   Otherwise, it calls `Messages.insertOne(message)` to insert a new message into the database.
        *   `Messages` is a database collection or service responsible for message storage.

5.  **App Integration (Post-send Hooks):**
    *   `sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts)
        *   Triggers `AppEvents.IPostSystemMessageSent` (for system messages) or `AppEvents.IPostMessageSent` via `Apps.self?.triggerEvent` to notify apps after the message has been saved.

6.  **After Save Actions:**
    *   `sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts)
        *   Calls `afterSaveMessage(message, room, user)`. This function handles post-persistence tasks like sending notifications, updating unread counts, and other side effects.

7.  **Client Notification:**
    *   `sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts)
        *   Calls `notifyOnRoomChangedById(message.rid)` (notifyListener.ts) to inform clients about changes in the room, which triggers UI updates to display the new message.

**Key Files:**

*   **apps/meteor/app/lib/server/methods/sendMessage.ts**: The DDP method that serves as the primary entry point for client-initiated message sending.
*   **apps/meteor/app/lib/server/functions/sendMessage.ts**: Contains the core server-side logic for processing and sending messages, including validation, app hooks, and database interaction.
*   **apps/meteor/server/services/messages/service.ts**: (Likely where `Message.beforeSave` and `afterSaveMessage` are defined, based on common service patterns, though not explicitly detailed in the graph output).
*   **apps/meteor/app/lib/server/lib/notifyListener.ts**: Handles notifications to clients about room changes.
*   **apps/meteor/app/lib/server/lib/BaseRaw.ts**: Provides base methods for database operations, including `updateOne` and `insertOne`.

## Tool Calls (5 calls, 34,208 tokens)

**Step 1:** `plan({"question":"How is a message sent on the server side in Rocket.Chat?","intent":"call-chain"})` → 81 tokens
**Step 2:** `search({"query":"sendMessage","layer":"server"})` → 421 tokens
**Step 3:** `graph({"file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/app/lib/server/functions/sendMessage.)` → 3279 tokens
**Step 4:** `graph({"move":"down","depth":5,"file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/app/lib/serve)` → 3279 tokens
**Step 5:** `details({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/app/lib/server/functions/sendMess)` → 617 tokens

## Files Seen In Tool Results (11)

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
