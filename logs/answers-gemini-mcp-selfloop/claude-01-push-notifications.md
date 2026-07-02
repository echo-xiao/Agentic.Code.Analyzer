# How do push notifications work in Rocket.Chat?

## Gemini Answer

Push notifications in Rocket.Chat follow a structured flow, triggered by message events and routed based on user preferences and system configuration.

**Flow:**

1.  **Message Save Trigger:** The process begins when a message is saved, triggering the `afterSaveMessage` callback.
2.  **Notification Dispatch:** The `sendNotificationsOnMessage` function in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts` is responsible for orchestrating the notification process for all relevant users.
3.  **User-Specific Notification Checks:** For each user, the system checks:
    *   `shouldNotifyDesktop`: If true, `notifyDesktopUser()` is called, sending a desktop notification immediately without queuing.
    *   `shouldNotifyMobile`: If true, `Notification.scheduleItem({type:'push'})` queues a mobile push notification. The delay is 120 seconds if the user is online and 0 seconds if offline.
    *   `shouldNotifyEmail`: If true, `Notification.scheduleItem({type:'email'})` queues an email notification.
4.  **Notification Queue Processing:** A `NotificationQueue` worker processes the queued items. For push notifications, it calls `PushNotification.send()`.
5.  **Push Notification Routing (`PushClass`):** The `PushClass` determines how the push notification is sent:
    *   **Gateway Mode:** If configured for gateway mode, an HTTP POST request is sent to the cloud gateway.
    *   **Native Mode:** If in native mode, the notification is sent directly using:
        *   `sendAPN()` for Apple Push Notification service.
        *   `sendFCM()` for Google Firebase Cloud Messaging.
6.  **Disabling Notifications:** The entire push notification system can be disabled via the `Troubleshoot_Disable_Notifications` setting.

**Key Files and Their Roles:**

*   **`apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`**: This file contains the `sendNotificationsOnMessage` function, which is the central orchestrator for determining and dispatching various types of notifications (desktop, mobile, email) after a message is saved.
*   **`apps/meteor/app/push/server/fcm.ts`**: This file is responsible for sending push notifications specifically using Firebase Cloud Messaging (FCM), likely containing the `sendFCM()` implementation.
*   **`apps/meteor/app/push/server/push.ts`**: This file likely contains the `PushClass` and the logic for routing push notifications to either the cloud gateway or native APN/FCM services, as well as the `PushNotification.send()` method.

## Tool Calls (6 calls, 15,867 tokens)

**Step 1:** `plan({"question":"How do push notifications work in Rocket.Chat?","intent":"architecture"})` → 85 tokens
**Step 2:** `search({"layer":"server","query":"push notification"})` → 122 tokens
**Step 3:** `graph({"move":"expand","query":"fcm.ts","depth":2,"file":"apps/meteor/app/push/server/fcm.ts"})` → 340 tokens
**Step 4:** `graph({"query":"push.ts","depth":2,"file":"apps/meteor/app/push/server/push.ts","move":"expand"})` → 294 tokens
**Step 5:** `search({"layer":"server","query":"send notification"})` → 129 tokens
**Step 6:** `graph({"query":"sendNotificationsOnMessage","depth":4,"file":"apps/meteor/app/lib/server/lib/sendNotificat)` → 2562 tokens

## Files Seen In Tool Results (27)

- `apps/meteor/app/push/server/push.ts`
- `apps/meteor/app/push/server/fcm.ts`
- `apps/meteor/client/views/omnichannel/modals/ForwardChatModal.stories.tsx`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveCheckMAC.tests.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveCheckMAC.ts`
- `packages/core-services/src/lib/Api.ts`
- `packages/apps-engine/src/server/bridges/LivechatBridge.ts`
- `apps/meteor/app/lib/server/functions/createRoom.ts`
- `apps/meteor/app/livechat/server/lib/departmentsLib.ts`
- `apps/meteor/ee/server/lib/ldap/Manager.ts`
- `apps/meteor/app/meteor-accounts-saml/server/lib/SAML.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `apps/meteor/app/apps/server/converters/visitors.js`
- `packages/core-typings/src/IUser.ts`
- `apps/meteor/app/utils/server/lib/getValidRoomName.ts`
- `apps/meteor/tests/unit/server/services/calendar/statusEvents/cancelUpcomingStatusChanges.tests.ts`
- `apps/meteor/server/services/calendar/service.ts`
- `apps/meteor/client/lib/banners.ts`
- `apps/meteor/app/settings/server/CachedSettings.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `packages/apps-engine/src/server/accessors/RoomBuilder.ts`
- `apps/meteor/app/importer/server/classes/converters/ConverterCache.ts`
- `ee/apps/ddp-streamer/src/lib/Autoupdate.ts`
- `apps/meteor/ee/app/settings/server/settings.ts`
- `apps/meteor/server/services/calendar/statusEvents/generateCronJobId.ts`
- `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`
