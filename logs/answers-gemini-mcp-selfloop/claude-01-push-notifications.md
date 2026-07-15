# How do push notifications work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

Rocket.Chat's push notification system is managed by the `PushClass` in `apps/meteor/app/push/server/push.ts` and the `PushNotification` class in `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`.

Here's a breakdown of how push notifications work:

**1. Notification Trigger and Payload Construction:**
   - When an event triggers a notification (e.g., a new message), the `PushNotification` class in `apps/meteor/app/push-notifications/server/lib/PushNotification.ts` is responsible for constructing the notification payload.
   - The `send` method within `PushNotification` gathers information like the room ID (`rid`), user ID (`uid`), message ID (`mid`), room name, username, message content, and other payload data.
   - It also consults user notification settings to determine if only the notification ID should be sent (`Push_request_content_from_server` setting).
   - Finally, `PushNotification.send` calls `Push.send(config)` to hand off the constructed notification configuration to the `PushClass`.

**2. Push Dispatching (`PushClass`):**
   - The `PushClass` in `apps/meteor/app/push/server/push.ts` is the core dispatcher for push notifications.
   - It is configured with options such as `sendTimeout` and APN settings via its `configure` method.
   - The `send` method of `PushClass` receives the `IPushNotificationConfig` from `PushNotification`.
   - It determines whether to use a push gateway (`shouldUseGateway`) based on server settings.
   - **Token Management:** `PushClass` interacts with the `PushToken` model (defined in `packages/models/src/models/PushToken.ts`) to manage device tokens. This includes `replaceToken` and `removeToken` methods for updating and deleting tokens.
   - **Native Dispatch:** The `sendNotificationNative` method handles sending notifications directly to Apple Push Notification Service (APN) or Firebase Cloud Messaging (FCM) based on the `IPushToken` type (`apn` or `gcm`).
   - **Gateway Dispatch:** If a gateway is used, `sendNotificationGateway` is called, which in turn uses `sendGatewayPush` to send the notification through the configured gateway.
   - The `NotificationQueue` (defined in `packages/models/src/models/NotificationQueue.ts`) is used to manage pending push notifications, ensuring reliable and asynchronous dispatch. Notifications are likely enqueued by the `PushClass` and processed by a background mechanism.

**3. User Notification Settings:**
   - User notification preferences are managed through the `saveNotificationSettingsMethod` in `apps/meteor/app/push-notifications/server/methods/saveNotificationSettings.ts`.
   - These settings, stored in the `Subscriptions` collection, control aspects like `desktopNotifications`, `mobilePushNotifications`, and `emailNotifications`, influencing whether and how a notification is generated and presented.

**Flow Summary:**

1.  **Message/Event Trigger:** An event occurs (e.g., new message).
2.  **Payload Construction:** `PushNotification` (`apps/meteor/app/push-notifications/server/lib/PushNotification.ts`) creates the notification payload and configuration.
3.  **Dispatch Hand-off:** `PushNotification.send` calls `Push.send` with the notification configuration.
4.  **Push Dispatcher:** `PushClass` (`apps/meteor/app/push/server/push.ts`) receives the configuration.
5.  **Token Lookup:** `PushClass` retrieves device tokens from the `PushToken` model (`packages/models/src/models/PushToken.ts`).
6.  **Gateway/Native Decision:** `PushClass` decides whether to use a gateway or send natively.
7.  **Enqueueing:** Notifications are likely added to the `NotificationQueue` (`packages/models/src/models/NotificationQueue.ts`).
8.  **External Service Dispatch:** `PushClass` dispatches the notification to APN or FCM (directly or via a gateway).
9.  **Delivery to Device:** APN/FCM delivers the notification to the user's mobile device.

## Tool Calls (8 calls, 41,517 tokens)

**Step 1:** `wiki({"question":"How do push notifications work in Rocket.Chat?"})` → 3882 tokens
**Step 2:** `search({"layer":"server","query":"PushClass"})` → 65 tokens
**Step 3:** `search({"layer":"server","query":"PushNotification"})` → 102 tokens
**Step 4:** `graph({"file":"push.ts","move":"expand","query":"PushClass"})` → 61 tokens
**Step 5:** `details({"filename":"push.ts","symbolName":"PushClass"})` → 561 tokens
**Step 6:** `details({"symbolName":"PushNotification","filename":"PushNotification.ts"})` → 266 tokens
**Step 7:** `graph({"query":"PushNotification.send","file":"PushNotification.ts","move":"down"})` → 15 tokens
**Step 8:** `details({"filename":"PushNotification.ts","symbolName":"PushNotification.send"})` → 165 tokens

## Files Seen In Tool Results (32)

- `packages/models/src/index.ts`
- `apps/meteor/app/push/server/definition.ts`
- `apps/meteor/app/push-notifications/server/methods/saveNotificationSettings.ts`
- `apps/meteor/app/lib/server/functions/saveUser/sendUserEmail.ts`
- `apps/meteor/app/push/server/push.ts`
- `apps/meteor/app/push/server/logger.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/notifier.ts`
- `packages/apps-engine/src/server/accessors/Notifier.ts`
- `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyUpdater.ts`
- `apps/meteor/app/apps/server/bridges/http.ts`
- `packages/apps-engine/src/server/accessors/UIExtend.ts`
- `apps/meteor/server/services/push/service.ts`
- `packages/models/src/models/PushToken.ts`
- `packages/models/src/models/NotificationQueue.ts`
- `apps/meteor/server/modules/notifications/notifications.module.ts`
- `apps/meteor/app/notifications/server/lib/Presence.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `packages/apps-engine/src/server/accessors/SettingUpdater.ts`
- `apps/meteor/app/importer/server/classes/ImporterWebsocket.ts`
- `packages/apps-engine/src/client/AppsEngineUIClient.ts`
- `apps/meteor/app/apps/server/converters/uploads.js`
- `ee/packages/presence/src/Presence.ts`
- `apps/meteor/app/version-check/server/functions/buildVersionUpdateMessage.ts`
- `apps/meteor/client/lib/customOAuth/CustomOAuth.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `apps/meteor/app/apps/server/bridges/uiInteraction.ts`
- `apps/meteor/server/modules/listeners/listeners.module.ts`
- `apps/meteor/app/slackbridge/server/RocketAdapter.ts`
- `apps/meteor/ee/server/apps/communication/websockets.ts`
- `apps/meteor/server/configuration/pushNotification.ts`
