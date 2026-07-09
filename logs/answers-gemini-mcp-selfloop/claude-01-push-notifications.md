# How do push notifications work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat's push notification system involves several server-side components for registering devices, configuring notifications, and dispatching them.

Here's a breakdown of how it works:

**1. Push Token Registration:**
When a mobile device needs to receive push notifications, it registers a unique push token with the Rocket.Chat server.
*   **Entry Point**: Mobile clients interact with the `push.token` API endpoint.
*   **Core Method**: The `registerPushToken` function handles the actual registration logic.
    *   **File**: `apps/meteor/server/services/push/tokenManagement/registerPushToken.ts`
    *   This function receives the device's token, type (e.g., APN or GCM), app name, and an authentication token. It then either inserts a new token into the database or updates an existing one.

**2. Sending Push Notifications:**
When a message or event triggers a push notification, the server uses the `PushNotification` class to construct and dispatch it.
*   **Core Class**: `PushNotification`
    *   **File**: `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`
    *   This class contains the following key methods:
        *   `getNotificationConfig`: Prepares the notification payload, including the title, text, badge count, and other data. It can also redact message content based on server settings.
        *   `getNotificationForMessageId`: Retrieves sender information and processes the message text, applying callbacks and real name replacements before generating the push data for messages.
        *   `send`: Dispatches the configured notification through the push gateway and increments notification metrics.

**Flow for Sending a Push Notification:**

1.  A message is sent or an event occurs that requires a push notification.
2.  The server determines if a push notification is needed for the relevant users.
3.  An instance of the `PushNotification` class is used.
4.  `PushNotification.getNotificationForMessageId` (if it's a message) is called to retrieve and process the message content.
5.  `PushNotification.getNotificationConfig` is called to prepare the final notification payload.
6.  `PushNotification.send` is called to dispatch the notification to the appropriate push gateway (e.g., APN for iOS, FCM for Android), which then delivers it to the user's device.

**3. Notification Settings and Testing:**
*   Users can configure their push notification preferences (e.g., `mobilePushNotifications`) via the `saveNotificationSettings` method.
*   Administrators can test push notifications using the `push_test` Meteor method, which sends a test message to a user's registered devices, checking for permissions and global push notification settings.

## Tool Calls (8 calls, 19,221 tokens)

**Step 1:** `wiki({"question":"How do push notifications work in Rocket.Chat?"})` → 737 tokens
**Step 2:** `search({"query":"Push.registerPushToken"})` → 108 tokens
**Step 3:** `search({"query":"PushNotification"})` → 154 tokens
**Step 4:** `details({"symbolName":"Push.registerPushToken","filename":"methods.ts"})` → 47 tokens
**Step 5:** `search({"query":"Push.registerPushToken definition"})` → 30 tokens
**Step 6:** `search({"query":"registerPushToken","layer":"server"})` → 99 tokens
**Step 7:** `details({"filename":"registerPushToken.ts","symbolName":"registerPushToken"})` → 113 tokens
**Step 8:** `details({"filename":"PushNotification.ts","symbolName":"PushNotification"})` → 266 tokens

## Files Seen In Tool Results (8)

- `apps/meteor/app/push/server/methods.ts`
- `apps/meteor/app/api/server/v1/push.ts`
- `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`
- `packages/core-typings/src/IPushNotificationConfig.ts`
- `apps/meteor/server/configuration/pushNotification.ts`
- `apps/meteor/client/hooks/roomActions/usePushNotificationsRoomAction.ts`
- `apps/meteor/server/services/push/service.ts`
- `apps/meteor/server/services/push/tokenManagement/registerPushToken.ts`
