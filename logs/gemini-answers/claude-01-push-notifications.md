# How do push notifications work in Rocket.Chat?

## Gemini Answer

Push notifications in Rocket.Chat follow a server-side process, starting from message saving and culminating in dispatch to either a cloud gateway or native push services (APN/FCM).

Here's the detailed call chain:

**Entry → Step 1 → Step 2 → Step 3 → Step 4 → Step 5 → Final**

1.  **Entry Point:** The process begins with the `afterSaveMessage` callback, a server-side event with low priority.
2.  **Notification Scheduling:** Following the `afterSaveMessage` callback, the system calls `sendAllNotifications` which then calls `sendMessageNotifications` leading to a per-user `sendNotification` function. If mobile notification conditions are met, `Notification.scheduleItem({type:'push'})` is called. This queues the push notification (with a 120-second delay for online users, 0 seconds for offline users).
3.  **Queue Processing:** A `NotificationQueue` worker (defined in `apps/meteor/app/notification-queue/server/NotificationQueue.ts`) processes the queued push items.
4.  **Notification Configuration:** The queue worker then invokes `PushNotification.send()` (from `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`). This method (`PushNotification.send`) is responsible for gathering and configuring the notification payload, including details like room ID, user ID, message, and category.
5.  **Push Service Dispatch:** Inside `PushNotification.send`, the final dispatch is handled by `await Push.send(config)` (likely defined in `apps/meteor/app/push/server/push.ts`). This `Push` object determines the routing based on the Rocket.Chat server's configuration:
    *   **Gateway Mode:** An HTTP POST request is sent to a configured cloud gateway.
    *   **Native Mode:** The notification is sent directly using `sendAPN()` for Apple devices or `sendFCM()` for Google Firebase Cloud Messaging.

**Key Files Involved:**

*   `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`: Contains the `PushNotification` class and its `send` method, which is crucial for preparing and initiating the push notification.
*   `apps/meteor/app/notification-queue/server/NotificationQueue.ts`: Implements the `NotificationQueue` worker that processes queued notifications and calls `PushNotification.send`.
*   `apps/meteor/app/push/server/push.ts`: This file is expected to contain the `Push` object and its `send` method, responsible for the actual communication with APN, FCM, or the cloud gateway.

Push notifications can be disabled entirely via the `Troubleshoot_Disable_Notifications` setting.

## Tool Calls (8 calls, 29,488 tokens)

**Step 1:** `search({"query":"push notification","layer":"server"})` → 288 tokens
**Step 2:** `graph({"layer":"server","filename":"apps/meteor/app/push-notifications/server/lib/PushNotification.ts","di)` → 231 tokens
**Step 3:** `search({"layer":"server","query":"PushNotification.send"})` → 267 tokens
**Step 4:** `graph({"direction":"down","filename":"apps/meteor/app/notification-queue/server/NotificationQueue.ts","lay)` → 15 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/push-notifications/server/lib/PushNotification.ts","symbolName":"PushNo)` → 272 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/push-notifications/server/lib/PushNotification.ts","symbolName":"PushNo)` → 167 tokens
**Step 7:** `search({"layer":"server","query":"Push.send"})` → 141 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/push/server/push.ts","symbolName":"Push.send"})` → 42 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 4/5 |
| Tool calls | 8 |
| Total tokens | 29,488 |
| Pass | NO |
