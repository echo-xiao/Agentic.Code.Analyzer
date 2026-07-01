# How do push notifications work in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's push notification system is designed to deliver real-time alerts to mobile devices (iOS, Android) and web browsers, even when the user is not actively connected via DDP. It's a critical component for user engagement and ensuring messages are seen promptly.

The architecture has evolved, with a strong emphasis on **UnifiedPush** as the modern and recommended approach, offering greater flexibility, privacy, and self-hosting options.

Here's a detailed breakdown of how push notifications work in Rocket.Chat:

## High-Level Overview

1.  **Event Trigger:** An event occurs on the Rocket.Chat server (e.g., a new message, a mention, a direct message).
2.  **Notification Decision:** The server determines if a notification should be sent to a specific user based on their preferences, room settings, and online status.
3.  **Payload Construction:** A notification payload (JSON) is created, containing relevant message data.
4.  **Push Service Integration:** The Rocket.Chat server sends this payload to a configured push service.
    *   **Recommended:** A **UnifiedPush provider** (e.g., ntfy.sh, Gotify, or a self-hosted instance).
    *   **Legacy/Direct:** Directly to Apple Push Notification service (APN) for iOS or Firebase Cloud Messaging (FCM) for Android.
5.  **Platform Gateway:** The push service (or Rocket.Chat directly in legacy mode) forwards the payload to the respective platform's push gateway (APN for iOS, FCM for Android).
6.  **Device Delivery:** APN/FCM deliver the notification to the target mobile device.
7.  **Client Reception:** The Rocket.Chat mobile app receives the notification, displays it, and potentially fetches more data from the server.

## Detailed Flow and Key Components

### 1. Event Trigger & Notification Generation

*   **Trigger:** When a message is sent, edited, or deleted, or a user is mentioned, the server-side logic is invoked.
    *   **File:** `app/lib/server/functions/sendMessage.ts` is a primary entry point for message processing.
*   **Notification Logic:** The system checks various conditions:
    *   **User Preferences:** Does the user have mobile push notifications enabled? (`Preferences > Notifications`).
    *   **Room Settings:** Is the room muted? Are notifications configured for mentions only?
    *   **User Status:** Is the user currently online and active in the same room? If so, a push notification might be suppressed in favor of a real-time DDP update.
    *   **File:** `app/notifications/server/lib/Notifications.ts` contains the core logic for deciding *who* to notify and *how*.
    *   **File:** `app/lib/server/functions/notifications/notification.ts` is a higher-level function that orchestrates the notification process.

### 2. Push Token Registration

*   **Client-Side:** When a user logs into the Rocket.Chat mobile app (or enables web push in a browser), the app registers a unique device token with the respective platform's push service (APN for iOS, FCM for Android, or browser for web push).
*   **Server-Side:** This device token is then sent to the Rocket.Chat server.
    *   **Method:** The client calls a Meteor method, typically `push:register`.
    *   **File:** `app/push/server/methods/registerPushToken.ts` handles this method call, storing the token in the `rocketchat_push_tokens` MongoDB collection.
    *   **Collection:** `rocketchat_push_tokens` stores documents like:
        ```json
        {
          "_id": "...",
          "userId": "...",
          "type": "apn" | "fcm" | "web",
          "value": "device_token_string",
          "appName": "RocketChat",
          "createdAt": "...",
          "updatedAt": "..."
        }
        ```

### 3. Payload Construction

*   Once the server decides to send a notification, it constructs a JSON payload. This payload includes:
    *   `messageId`: The ID of the message.
    *   `sender`: User details (name, username).
    *   `room`: Room ID and name.
    *   `type`: Type of notification (e.g., `message`, `mention`, `dm`).
    *   `badge`: The unread message count for the user.
    *   `sound`: Notification sound.
    *   `title`, `text`: The display text for the notification.
*   **File:** The payload structure is defined within the `app/notifications/server/lib/Notifications.ts` and related sending functions.

### 4. Sending to Push Service (UnifiedPush - Recommended)

This is the modern and preferred way.

*   **UnifiedPush Provider:** Rocket.Chat is configured to send notifications to a UnifiedPush provider (e.g., ntfy.sh, Gotify, or a self-hosted instance like NextPush).
*   **Single API:** Rocket.Chat sends a standardized request to the UnifiedPush provider's API.
*   **Provider's Role:** The UnifiedPush provider then takes on the responsibility of translating this request into the specific formats required by APN and FCM, and sending them to Apple and Google respectively.
*   **Benefits:**
    *   **Privacy:** Rocket.Chat server doesn't directly interact with Apple/Google, potentially reducing metadata leakage.
    *   **Self-Hosting:** Admins can host their own UnifiedPush provider, gaining full control.
    *   **Flexibility:** Supports various push technologies beyond just APN/FCM.
    *   **Simplified Configuration:** Rocket.Chat only needs to know about one UnifiedPush endpoint.
*   **File:** `app/notifications/server/lib/sendToUnifiedPush.ts` handles the communication with the configured UnifiedPush provider.

### 5. Sending to Push Service (Legacy/Direct - Less Common)

In older setups or specific configurations, Rocket.Chat might directly send to APN/FCM.

*   **APN (Apple Push Notification service):** For iOS devices. Requires an Apple Push Notification certificate (`.p12` file) configured in Rocket.Chat.
    *   **File:** `app/notifications/server/lib/sendToAPN.ts`
*   **FCM (Firebase Cloud Messaging):** For Android devices. Requires a Firebase server key configured in Rocket.Chat.
    *   **File:** `app/notifications/server/lib/sendToFCM.ts`
*   **Web Push:** For browsers that support Service Workers. Uses the Web Push Protocol.
    *   **File:** `app/notifications/server/lib/sendToWebPush.ts`

### 6. Platform Gateway & Device Delivery

*   **APN/FCM:** Apple and Google's respective push services are highly optimized, reliable networks designed to deliver notifications to devices globally.
*   **Device Target:** They use the device token to identify the specific device and deliver the payload.

### 7. Client Reception

*   **Mobile App:** The Rocket.Chat mobile app (iOS or Android) receives the push notification.
    *   It displays the notification to the user (title, text, sound, badge).
    *   It can perform background tasks, such as fetching the full message content from the Rocket.Chat server if the notification payload was truncated.
    *   **Mobile App Repositories:**
        *   [Rocket.Chat.iOS](https://github.com/RocketChat/Rocket.Chat.iOS)
        *   [Rocket.Chat.Android](https://github.com/RocketChat/Rocket.Chat.Android)
*   **Web Browser:** For web push, the browser's Service Worker intercepts the notification, which can then be displayed to the user.

## Configuration in Rocket.Chat

Admins can configure push notifications via the Admin UI:

*   **`Administration > Workspace > Push`**:
    *   **UnifiedPush:** Enable/disable, set the UnifiedPush URL and token. This is the primary configuration for modern deployments.
    *   **Legacy APN:** Upload `.p12` certificate, set password.
    *   **Legacy FCM:** Enter the FCM server key.
    *   **Web Push:** VAPID keys for web push.

## Troubleshooting Tips

*   **Check Server Logs:** Rocket.Chat server logs will show attempts to send notifications and any errors encountered (e.g., invalid tokens, connection issues to push services).
*   **UnifiedPush Provider Logs:** If using UnifiedPush, check the logs of your UnifiedPush provider for errors in forwarding to APN/FCM.
*   **Network Connectivity:** Ensure the Rocket.Chat server can reach the configured push service (UnifiedPush provider, or APN/FCM endpoints directly). Firewall rules are a common culprit.
*   **Configuration:** Double-check all keys, certificates, and URLs in the Admin UI.
*   **Device Settings:** Ensure the mobile app has notification permissions enabled on the device, and that battery optimization settings aren't preventing the app from receiving notifications.
*   **User Preferences:** Verify the user hasn't muted the room or disabled mobile notifications in their personal preferences.

By leveraging UnifiedPush, Rocket.Chat provides a robust, flexible, and privacy-conscious push notification system that keeps users informed across various platforms.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,623 |
| Model | gemini-2.5-flash |
| Tools | NONE |
