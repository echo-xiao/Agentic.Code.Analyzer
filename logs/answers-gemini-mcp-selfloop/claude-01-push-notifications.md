# How do push notifications work in Rocket.Chat?

## Gemini Answer

Push notifications in Rocket.Chat follow a server-side flow initiated by message activity. Here's the detailed architecture:

**Entry Point:** The process begins with the `afterSaveMessage` callback, which triggers `sendAllNotifications`. This callback is located in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`.

**Notification Scheduling:**
1. `sendAllNotifications` orchestrates the notification process.
2. For mobile notifications, it calls `Notification.scheduleItem({type:'push'})`, queuing the notification with a delay (120 seconds if online, immediately if offline).

**Push Notification Processing:**
1. A `NotificationQueue` worker processes the queued push items.
2. The worker then calls `PushNotification.send()`. Although `PushNotification.send()` was not directly found, the architecture description points to `PushClass` as the core component for sending push notifications.
3. The `PushClass` is located in `apps/meteor/app/push/server/push.ts`.

**`PushClass` Implementation:**
1. The `PushClass.send(options: IPushNotificationConfig)` method in `apps/meteor/app/push/server/push.ts` prepares the `PendingPushNotification` object.
2. It then calls `this.sendNotification(notification)`.
3. `PushClass.sendNotification(notification)`, also in `apps/meteor/app/push/server/push.ts`, retrieves the relevant push tokens for the user from the `PushToken` collection.
4. It then determines the sending method:
    * If `this.shouldUseGateway()` returns true, it calls `this.sendNotificationGateway()`. This implies an HTTP POST to the Rocket.Chat cloud gateway.
    * Otherwise, it calls `this.sendNotificationNative()`.

**Native Push Notification:**
The `PushClass.sendNotificationNative()` method handles sending notifications directly using Apple Push Notification Service (APN) for iOS devices and Firebase Cloud Messaging (FCM) for Android devices. The specific implementation of `sendAPN()` and `sendFCM()` would be within this method, or further downstream, for interacting with the respective push notification services.

**Call Chain:**
`afterSaveMessage` → `sendAllNotifications` (apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts) → `Notification.scheduleItem` → `NotificationQueue` worker → `PushNotification.send()` (conceptual, as per architecture) → `PushClass.send` (apps/meteor/app/push/server/push.ts) → `PushClass.sendNotification` (apps/meteor/app/push/server/push.ts) → (`PushClass.sendNotificationGateway` OR `PushClass.sendNotificationNative`) (apps/meteor/app/push/server/push.ts) → (sendAPN/sendFCM for native, HTTP POST to gateway for gateway mode)

## Tool Calls (8 calls, 36,227 tokens)

**Step 1:** `search({"query":"sendPushNotification","layer":"server"})` → 254 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"sendAllNotifications"})` → 691 tokens
**Step 3:** `graph({"layer":"server","direction":"down","query":"PushNotification.send"})` → 15 tokens
**Step 4:** `search({"query":"PushClass","layer":"server"})` → 241 tokens
**Step 5:** `graph({"direction":"down","query":"PushClass","layer":"server"})` → 220 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/push/server/push.ts","symbolName":"PushClass"})` → 565 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/push/server/push.ts","symbolName":"PushClass.send"})` → 295 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/push/server/push.ts","symbolName":"PushClass.sendNotification"})` → 604 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 5/5 |
| Tool calls | 8 |
| Total tokens | 36,227 |
| Pass | NO |
