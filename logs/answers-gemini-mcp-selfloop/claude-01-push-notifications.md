# How do push notifications work in Rocket.Chat?

## Gemini Answer

Push notifications in Rocket.Chat are handled on the server-side, with the following general flow:

**Call Chain:** `afterSaveMessage` callback → `sendAllNotifications` → `sendMessageNotifications` → `sendNotification` → `Notification.scheduleItem` (for push) → `NotificationQueue` worker → `PushNotification.send()` → `PushClass`.

1.  **Trigger:** The process begins with an `afterSaveMessage` callback, which is registered with a low priority.
2.  **Notification Routing:** This callback leads to `sendAllNotifications`, which then calls `sendMessageNotifications`. For each user, `sendNotification` is called, which determines if a mobile notification should be sent.
3.  **Queueing:** If a mobile notification is required, it's queued using `Notification.scheduleItem({type:'push'})`. This item is queued with a delay: 120 seconds if the user is online, and 0 seconds if they are offline.
4.  **Processing:** The `NotificationQueue` worker processes these queued push items.
5.  **Sending:** The `PushNotification.send()` method (located in `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`) is responsible for handling the push notification.
6.  **PushClass Routing:** `PushNotification.send()` then interacts with `PushClass` (defined in `apps/meteor/app/push/server/push.ts`). The `PushClass` handles the actual sending of the notification:
    *   **Gateway Mode:** If in gateway mode, it performs an HTTP POST to a cloud gateway.
    *   **Native Mode:** If in native mode, it calls `sendAPN()` for Apple Push Notification service or `sendFCM()` for Google Firebase Cloud Messaging.

Push notifications can be disabled via the `Troubleshoot_Disable_Notifications` setting.

**Key Files:**

*   `apps/meteor/server/services/video-conference/service.ts`: Contains a `sendPushNotification` symbol, though the main push notification flow is handled by `PushNotification.send()`.
*   `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`: Contains the `PushNotification` class, which has the `send` method responsible for initiating the push notification process.
*   `apps/meteor/app/push/server/push.ts`: Defines the `PushClass` which ultimately sends the push notifications via APN, FCM, or a cloud gateway.

## Tool Calls (8 calls, 26,938 tokens)

**Step 1:** `search({"query":"sendPushNotification","layer":"server"})` → 393 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"PushNotification.send"})` → 15 tokens
**Step 3:** `search({"layer":"server","query":"PushNotification.ts"})` → 273 tokens
**Step 4:** `graph({"layer":"server","direction":"down","query":"PushNotification.send","file":"apps/meteor/app/push-no)` → 15 tokens
**Step 5:** `implement({"symbolName":"PushNotification","filename":"apps/meteor/app/push-notifications/server/lib/PushNotif)` → 272 tokens
**Step 6:** `graph({"query":"PushNotification.send","direction":"down","file":"apps/meteor/app/push-notifications/serve)` → 15 tokens
**Step 7:** `search({"layer":"server","query":"PushClass"})` → 241 tokens
**Step 8:** `graph({"query":"PushClass","layer":"server","direction":"down","file":"apps/meteor/app/push/server/push.ts)` → 220 tokens
