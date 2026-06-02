# How is a message sent on the server side in Rocket.Chat?

## Gemini Answer

Here's how a message is sent on the server side in Rocket.Chat:

**Call Chain:** `Meteor.methods({ sendMessage })` → `executeSendMessage` → `sendMessage` → `Messages.insertOne` → `afterSaveMessage` callbacks → `sendMessageNotifications` → `sendNotification`

1.  **`Meteor.methods({ sendMessage })`**: The process begins when a client calls the `sendMessage` DDP method, which is handled by a Meteor method defined on the server. This acts as the entry point for server-side message processing.

2.  **`executeSendMessage`** (in `apps/meteor/app/lib/server/methods/sendMessage.ts`):
    *   This function is responsible for initial validation and preparation of the message.
    *   It performs checks such as:
        *   Ensuring `tshow` is accompanied by `tmid` for threads.
        *   Verifying if threads are enabled when `tmid` is present.
        *   Validating the message timestamp to prevent out-of-sync issues.
        *   Checking if the message size exceeds the `Message_MaxAllowedSize` setting.
        *   Retrieving user information.
        *   Resolving the `rid` (room ID) for threaded messages.
        *   Verifying user permissions to send messages in the specified room using `canSendMessageAsync`.
        *   Enforcing E2E encryption rules for encrypted rooms.
    *   Finally, it calls the core `sendMessage` function to persist the message.

3.  **`sendMessage`** (in `apps/meteor/app/lib/server/functions/sendMessage.ts`):
    *   This is the core function for message persistence and post-processing.
    *   It further validates and prepares the message object.
    *   It integrates with the Rocket.Chat Apps Engine, triggering `IPreMessageSentPrevent`, `IPreMessageSentExtend`, and `IPreMessageSentModify` events, allowing installed apps to interact with and modify the message before it's saved.
    *   The message is then saved into the database:
        *   If `upsert` is true and `_id` exists, it updates an existing message using `Messages.updateOne`.
        *   Otherwise, it inserts a new message using `Messages.insertOne`.
    *   After saving, it triggers `IPostSystemMessageSent` (for system messages) or `IPostMessageSent` (for regular messages) App Engine events.
    *   It then calls the `afterSaveMessage` callback.

4.  **`afterSaveMessage` callbacks**:
    *   This is a callback event system (`callbacks.add('afterSaveMessage', handler)`).
    *   Various modules can register handlers for this event to perform actions after a message has been saved.
    *   Examples include:
        *   `apps/meteor/app/search/server/events/index.ts` registers a handler for search indexing.
        *   `apps/meteor/app/slackbridge/server/RocketAdapter.ts` registers a handler for Slack integration.
    *   One critical callback is `sendMessageNotifications` (in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`).

5.  **`sendMessageNotifications`** (in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`):
    *   This function is responsible for determining if and how notifications should be sent for the new message.
    *   It iterates through users in the room and checks their notification preferences.
    *   For each user, it calls `sendNotification` (per user) based on whether they should be notified on mobile, desktop, or via email.

6.  **`sendNotification`**:
    *   This function (not fully implemented in the provided details but inferred from the architecture) handles the actual dispatch of various types of notifications.
    *   It considers `shouldNotifyMobile`/`Desktop`/`Email` settings.
    *   Ultimately, it pushes notifications to the `NotificationQueue`, which then uses `PushNotification` to send them via services like APN (Apple Push Notification) or FCM (Firebase Cloud Messaging).

## Tool Calls (8 calls, 54,960 tokens)

**Step 1:** `search({"query":"executeSendMessage","layer":"server"})` → 132 tokens
**Step 2:** `graph({"query":"executeSendMessage","layer":"server","direction":"down"})` → 434 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/lib/server/methods/sendMessage.ts","symbolName":"executeSendMessage"})` → 826 tokens
**Step 4:** `search({"query":"sendMessage","layer":"server"})` → 379 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","symbolName":"sendMessage"})` → 594 tokens
**Step 6:** `graph({"direction":"down","query":"afterSaveMessage","edgeTypes":["event_listen"]})` → 40 tokens
**Step 7:** `search({"query":"callbacks.add('afterSaveMessage'"})` → 164 tokens
**Step 8:** `search({"query":"sendMessageNotifications"})` → 137 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 2/3 |
| Tool calls | 8 |
| Total tokens | 54,960 |
