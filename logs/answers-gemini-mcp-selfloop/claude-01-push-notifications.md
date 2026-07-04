# How do push notifications work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The push notification system in Rocket.Chat follows this flow:

**Entry → Token Registration → Notification Configuration → Sending Notification**

Here's a breakdown of the process and key components:

1.  **Token Registration**:
    *   Mobile devices register a push token with the Rocket.Chat server via the `push.token` API endpoint.
    *   The server uses the `authToken` for user authentication.
    *   The `Push.registerPushToken` method stores the device ID, token type (e.g., APN, GCM), token value, and application name. This method is also used by the `raix:push-update` Meteor method.

2.  **Notification Configuration**:
    *   The `PushNotification` class, located at `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`, is responsible for constructing the notification payload.
    *   It gathers information such as the room ID, user ID, message ID, room name, username, and message content.
    *   It also determines whether only the message ID should be sent (to hide message content from Apple/Google) based on the `Push_request_content_from_server` setting.

3.  **Sending Notifications**:
    *   The `PushNotification.send` method increments a metric for mobile notifications sent.
    *   It then calls `Push.send` with the prepared notification configuration.

**User Settings and Testing**:

*   **User Notification Settings**: Users can configure their push notification preferences using the `saveNotificationSettings` Meteor method. These settings are stored in the `Subscriptions` collection.
*   **Testing Push Notifications**: The `push_test` Meteor method allows users with the `test-push-notifications` permission to send a test push notification. This method checks the `Push_enable` setting and, if enabled, calls `executePushTest` to retrieve user push tokens and send a test message via `Push.send`.

**Gateway and Legacy Support**:

*   **Push Gateway**: Rocket.Chat can use a push gateway, which acts as a proxy for mobile push notifications and requires server registration.
*   **Legacy Provider Deprecation**: A warning indicates that the legacy notification provider will be deprecated after June 20, 2024.

**Key Files**:

*   `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`: This file contains the `PushNotification` class, which is central to configuring and sending push notifications.

## Tool Calls (1 calls, 3,327 tokens)

**Step 1:** `wiki({"question":"How do push notifications work in Rocket.Chat?"})` → 923 tokens

## Files Seen In Tool Results (1)

- `apps/meteor/app/push-notifications/server/lib/PushNotification.ts`
