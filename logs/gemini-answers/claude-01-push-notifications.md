# How do push notifications work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's push notification system is triggered after a message is saved to the database. The process begins with the `afterSaveMessage` callback chain, which then calls `sendMessageNotifications`.

Here's a breakdown of the process:

1.  **`afterSaveMessage`**: This is a server-side callback that gets executed once a message has been successfully saved to the database. It acts as the initial trigger for the notification flow.

2.  **`sendMessageNotifications`**: Located in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`, this function is responsible for determining which users should receive notifications for a given message.
    *   It checks the `Troubleshoot_Disable_Notifications` setting to ensure notifications are enabled.
    *   It retrieves the message sender and identifies any mentions (`@all`, `@here`, or specific users) within the message.
    *   It considers users participating in a thread as implicitly mentioned.
    *   It prepares the notification message, potentially replacing usernames with full names based on settings.
    *   It applies logic to disable "all" message notifications for rooms exceeding a configurable `Notifications_Max_Room_Members` limit.
    *   It constructs a complex database query to find relevant subscriptions based on room ID, ignored users, notification preferences (desktop, mobile, email, mentions), and server default preferences.
    *   Finally, it fetches all matching subscriptions and iterates through them, calling the `sendNotification` function for each individual recipient.

3.  **`sendNotification`**: This function (found in `apps/meteor/app/push/server/push.ts` and `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`) is responsible for sending the actual push notification to a specific user.

The overall call chain for push notifications is:

`afterSaveMessage` (callback) → `sendMessageNotifications` (apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts) → `sendNotification` (apps/meteor/app/push/server/push.ts) → `shouldNotifyMobile`/`shouldNotifyDesktop`/`shouldNotifyEmail` (internal checks within `sendNotification`) → `NotificationQueue` → `PushNotification` → APN / FCM.

## Tool Calls (8 calls, 46,615 tokens)

**Step 1:** `search({"query":"sendNotificationsOnMessage","layer":"server"})` → 83 tokens
**Step 2:** `graph({"direction":"down","query":"sendNotificationsOnMessage","depth":4})` → 16 tokens
**Step 3:** `implement({"symbolName":"sendNotificationsOnMessage","filename":"apps/meteor/app/lib/server/lib/sendNotificati)` → 20 tokens
**Step 4:** `search({"layer":"server","query":"sendMessageNotifications"})` → 137 tokens
**Step 5:** `graph({"depth":4,"query":"sendMessageNotifications","direction":"down"})` → 896 tokens
**Step 6:** `search({"layer":"server","query":"sendNotification"})` → 109 tokens
**Step 7:** `graph({"query":"sendNotification","depth":4,"direction":"down","filename":"apps/meteor/app/push/server/pus)` → 859 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts","symbolName":"sendMessage)` → 946 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 3/5 |
| Tool calls | 8 |
| Total tokens | 46,615 |
