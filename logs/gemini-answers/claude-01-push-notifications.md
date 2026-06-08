# How do push notifications work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's push notification system works as follows:

**Call Chain:** `afterSaveMessage` callback → `sendAllNotifications` → `sendMessageNotifications` → `sendNotification` → `Notification.scheduleItem` → `NotificationQueue` worker → `PushNotification.send()` → `PushClass.send` → `PushClass.sendNotification` → (Gateway or Native specific sender)

1.  **Trigger:** The process begins after a message is saved. An `afterSaveMessage` callback, registered with low priority, initiates the notification flow.
2.  **Initial Sending Logic:** This callback leads to `sendAllNotifications` which then calls `sendMessageNotifications`. For each user, a `sendNotification` function is invoked (found in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts` and `apps/meteor/app/push/server/push.ts`).
3.  **Mobile Notification Check & Queueing:** The `sendNotification` function checks if `shouldNotifyMobile`. If a mobile notification is required, it schedules an item using `Notification.scheduleItem({type:'push'})`. These items are queued with a delay: 120 seconds for online users and 0 seconds for offline users.
4.  **Queue Processing:** A `NotificationQueue` worker (located in `apps/meteor/app/notification-queue/server/NotificationQueue.ts`) processes these queued push items.
5.  **Push Notification Sending:** The worker calls `PushNotification.send()`, which ultimately delegates to the `PushClass` (defined in `apps/meteor/app/push/server/push.ts`).
6.  **`PushClass.send` Method:** The `send` method of the `PushClass` prepares the notification payload and then calls its private `sendNotification` method.
    *   **File:** `apps/meteor/app/push/server/push.ts`
    *   **Symbol:** `PushClass.send`
7.  **Routing (Gateway vs. Native):** The `PushClass.sendNotification` method determines the routing based on server configuration:
    *   **Gateway Mode:** If Rocket.Chat is configured to use a gateway, it performs an HTTP POST to the cloud gateway via the `sendGatewayPush` method.
    *   **Native Mode:** If in native mode, it directly sends notifications using `sendAPN()` for Apple devices or `sendFCM()` for Google Firebase Cloud Messaging via the `sendNotificationNative` method.
    *   **File:** `apps/meteor/app/push/server/push.ts`
    *   **Symbol:** `PushClass.sendNotification` (private method)

Push notifications can be entirely disabled using the `Troubleshoot_Disable_Notifications` setting.

## Tool Calls (8 calls, 40,142 tokens)

**Step 1:** `search({"layer":"server","query":"sendNotification"})` → 273 tokens
**Step 2:** `graph({"query":"sendNotification","direction":"down","layer":"server"})` → 1054 tokens
**Step 3:** `search({"layer":"server","query":"PushNotification.send"})` → 267 tokens
**Step 4:** `graph({"direction":"down","query":"PushNotification.send","layer":"server"})` → 15 tokens
**Step 5:** `search({"layer":"server","query":"PushClass"})` → 241 tokens
**Step 6:** `graph({"query":"PushClass","layer":"server","direction":"down"})` → 220 tokens
**Step 7:** `implement({"symbolName":"PushClass","filename":"apps/meteor/app/push/server/push.ts"})` → 565 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/push/server/push.ts","symbolName":"PushClass.send"})` → 295 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 5/5 |
| Tool calls | 8 |
| Total tokens | 40,142 |
| Pass | NO |
