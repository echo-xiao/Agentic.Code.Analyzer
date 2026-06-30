# How do push notifications work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's push notification system, from the server-side perspective, works as follows:

The entry point for push notifications is often triggered by the `afterSaveMessage` callback, which is registered with a low priority.

**Call Chain:**

1.  **`sendAllNotifications`** (from `apps/meteor/app/notification-queue/server/NotificationQueue.ts`)
2.  **`sendMessageNotifications`** (from `apps/meteor/app/notification-queue/server/NotificationQueue.ts`)
3.  **`sendNotification`** (from `apps/meteor/app/notification-queue/server/NotificationQueue.ts`)
    *   This function determines if a user should receive desktop, mobile, or email notifications.
    *   For mobile notifications, it calls `Notification.scheduleItem({type:'push'})`, queuing the notification. Online users have a 120-second delay, while offline users have no delay.
    *   For email notifications, it also calls `Notification.scheduleItem({type:'email'})`, queuing the notification.
    *   Desktop notifications are sent immediately via `notifyDesktopUser()`.
4.  **`NotificationQueue` worker**
    *   Processes the queued push items.
    *   Calls `PushNotification.send()` (defined in `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`).
5.  **`PushNotification.send`** (from `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`)
    *   This method gets the notification configuration via `this.getNotificationConfig`.
    *   It then calls `await Push.send(config)`.
6.  **`Push.send`** (from `apps/meteor/app/push/server/push.ts`)
    *   This is the core push notification sending logic.
    *   If Rocket.Chat is configured in "gateway mode," it makes an HTTP POST request to the cloud gateway.
    *   If in "native mode," it directly calls `sendAPN()` for Apple Push Notification service or `sendFCM()` for Firebase Cloud Messaging.

**Key Files:**

*   `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`: Defines the `PushNotification` class, including the `send` method which prepares the notification configuration and ultimately calls `Push.send`.
*   `apps/meteor/app/push/server/push.ts`: Contains the `Push.send` function, which handles routing the notification to either the cloud gateway, APN, or FCM.
*   `apps/meteor/app/notification-queue/server/NotificationQueue.ts`: Manages the notification queue and the initial `sendNotification` logic that decides whether to queue a push notification.

Push notifications can be disabled via the `Troubleshoot_Disable_Notifications` setting.

## Tool Calls (8 calls, 28,292 tokens)

**Step 1:** `search({"layer":"server","query":"push notification"})` → 288 tokens
**Step 2:** `graph({"direction":"down","file":"apps/meteor/app/push-notifications/server/lib/PushNotification.ts","quer)` → 245 tokens
**Step 3:** `search({"layer":"server","query":"PushNotification.send"})` → 267 tokens
**Step 4:** `graph({"file":"apps/meteor/app/push-notifications/server/lib/PushNotification.ts","query":"PushNotificatio)` → 15 tokens
**Step 5:** `implement({"symbolName":"PushNotification","filename":"apps/meteor/app/push-notifications/server/lib/PushNotif)` → 272 tokens
**Step 6:** `graph({"file":"apps/meteor/app/push-notifications/server/lib/PushNotification.ts","direction":"down","quer)` → 15 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/push-notifications/server/lib/PushNotification.ts","symbolName":"PushNo)` → 167 tokens
**Step 8:** `search({"layer":"server","query":"Push.send"})` → 141 tokens
