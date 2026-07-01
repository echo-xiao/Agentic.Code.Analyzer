# How do push notifications work in Rocket.Chat?

## Gemini Answer

Rocket.Chat's push notification system is initiated by a callback after a message is saved, then intelligently routes notifications based on user status and device type.

Here's the call chain:

**Entry Point → Notification Scheduling → Queue Processing → Push Service Routing → Native Push Services**

1.  **Entry Point (Implicit): `afterSaveMessage` callback**
    *   When a message is saved, an `afterSaveMessage` callback is triggered (likely within a core message handling file, though not explicitly traced in this session). This callback initiates the notification process.

2.  **Notification Scheduling: `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`**
    *   This file contains the `sendNotificationsOnMessage` function, which determines which users should receive notifications (desktop, mobile, or email).
    *   For mobile push notifications, it calls `Notification.scheduleItem({type:'push'})` to add the notification to a queue. Online users have a 120-second delay, while offline users receive immediate notifications.

3.  **Queue Processing: `apps/meteor/app/notification-queue/server/NotificationQueue.ts`**
    *   A worker process within this file continuously monitors and processes the notification queue.
    *   When a push notification item is dequeued, it invokes `PushNotification.send()`.

4.  **Push Service Routing: `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`**
    *   This file defines the `PushNotification` class (or object) and its `send` method. This method acts as a central router for push notifications.
    *   It determines whether to send the notification via a cloud gateway (if configured) or directly using native push services (APN for Apple, FCM for Google).

5.  **Native Push Services:**
    *   **Apple Push Notification Service (APN): `apps/meteor/app/push/server/apn.ts`**
        *   If the notification is for an Apple device and native mode is used, `PushNotification.send()` calls the `sendAPN()` function in this file to deliver the notification via Apple's APN service.
    *   **Firebase Cloud Messaging (FCM): `apps/meteor/app/push/server/fcm.ts`**
        *   If the notification is for an Android device and native mode is used, `PushNotification.send()` calls the `sendFCM()` function in this file to deliver the notification via Google's FCM service.

Push notifications can also be disabled via the `Troubleshoot_Disable_Notifications` setting.

## Tool Calls (8 calls, 26,554 tokens)

**Step 1:** `search({"query":"push notification","layer":"server"})` → 315 tokens
**Step 2:** `graph({"layer":"server","query":"sendAllPushNotifications","direction":"down"})` → 1664 tokens
**Step 3:** `search({"query":"PushNotification.send","layer":"server"})` → 267 tokens
**Step 4:** `search({"query":"Notification.scheduleItem","layer":"server"})` → 84 tokens
**Step 5:** `search({"layer":"server","query":"PushNotification.send"})` → 267 tokens
**Step 6:** `search({"layer":"server","query":"sendAPN"})` → 314 tokens
**Step 7:** `search({"layer":"server","query":"sendFCM"})` → 223 tokens
**Step 8:** `search({"layer":"server","query":"PushNotification"})` → 408 tokens

## Files Seen In Tool Results (26)

- `apps/meteor/app/push/server/definition.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `apps/meteor/server/configuration/pushNotification.ts`
- `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`
- `packages/core-typings/src/IPushNotificationConfig.ts`
- `apps/meteor/client/hooks/roomActions/usePushNotificationsRoomAction.ts`
- `packages/core-typings/src/INotification.ts`
- `apps/meteor/app/push/server/push.ts`
- `apps/meteor/app/push/server/fcm.ts`
- `apps/meteor/app/notification-queue/server/NotificationQueue.ts`
- `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`
- `apps/meteor/app/push/server/apn.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/sendPdfTranscriptOnClose.ts`
- `apps/meteor/server/modules/streamer/streamer.module.ts`
- `apps/meteor/app/livechat/server/hooks/sendEmailTranscriptOnClose.ts`
- `packages/media-signaling/src/lib/Call.ts`
- `apps/meteor/client/views/marketplace/hooks/useAppsCountQuery.ts`
- `apps/meteor/client/hooks/useEndpointMutation.ts`
- `apps/meteor/app/livechat/server/hooks/processRoomAbandonment.ts`
- `apps/meteor/server/modules/streamer/types.ts`
- `apps/meteor/app/2fa/server/code/index.ts`
- `apps/meteor/app/livechat/server/methods/sendFileLivechatMessage.ts`
- `packages/core-services/src/types/IUploadService.ts`
- `apps/meteor/app/2fa/server/code/ICodeCheck.ts`
- `packages/apps-engine/src/server/bridges/UploadBridge.ts`
