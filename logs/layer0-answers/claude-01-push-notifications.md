# How do push notifications work in Rocket.Chat?

## Baseline Answer (no tools)

Push notifications in Rocket.Chat are a complex interplay between the Rocket.Chat server, a dedicated Push Proxy service, and the native push notification services provided by Apple (APNs) and Google (FCM). The goal is to reliably deliver messages to mobile devices even when the app is not actively running.

Here's a detailed breakdown of how they work:

### 1. High-Level Overview

1.  **Message Sent:** A user sends a message in a room or direct message.
2.  **Server Checks:** The Rocket.Chat server determines which users need a push notification (offline, mentions, DM).
3.  **Payload Generation & Queue:** For each recipient, the server generates a notification payload and stores it in a temporary queue.
4.  **Push Proxy (Rocket.Chat's Service):** The Rocket.Chat server sends these payloads to a configurable Push Proxy service (often Rocket.Chat's official `https://push.rocket.chat/`).
5.  **Platform-Specific Sending:** The Push Proxy translates the generic payload into platform-specific formats (APNs for iOS, FCM for Android/Web) and forwards them to Apple's APNs and Google's FCM services.
6.  **Gateway Delivery:** APNs and FCM deliver the notification to the target mobile devices.
7.  **Client Reception:** The Rocket.Chat mobile app (via the OS) receives and processes the notification, potentially displaying an alert and updating the app badge.

### 2. Detailed Flow and Components

#### a. Client Registration (Initial Setup)

When a user logs into the Rocket.Chat mobile app for the first time or after a reinstall:
1.  The mobile app (React Native) requests a unique device token from the underlying operating system (iOS or Android).
2.  This token is then sent to the Rocket.Chat server and stored in the `Meteor.users` collection, specifically under `services.push.apn` (for iOS) or `services.push.gcm` (for Android/FCM).
    *   **File:** `apps/mobile/src/lib/push.ts` (handles device token registration and submission to the server).
    *   **Database:** `Meteor.users` collection, field `services.push` (stores `apn` and `gcm` tokens, and `id` which is the token itself).

#### b. Sending a Message (Server-Side Processing)

When a message is sent in Rocket.Chat:
1.  **Message Hook:** A server-side hook (`RocketChat.callbacks.run('afterSaveMessage', message, room, user)`) is triggered after the message is saved.
    *   **File:** `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts` (This file orchestrates the notification process after a message is saved).
2.  **Recipient Identification:** The server identifies all potential recipients for the notification based on:
    *   Direct messages (DMs).
    *   Mentions (`@username`, `@all`, `@here`).
    *   Messages in channels the user is a member of (if their notification preferences allow it).
3.  **Notification Preference Check:** For each potential recipient, the server checks:
    *   User's global notification preferences (`Administration > Push`).
    *   User's individual notification preferences (`User Menu > My Account > Preferences > Notifications`).
    *   Room-specific notification preferences.
    *   `DND` (Do Not Disturb) status.
    *   User's online/offline status (notifications are primarily for offline users).
    *   **File:** `apps/meteor/app/lib/server/functions/notifications/getUserNotificationPreference.ts` (Determines if a user should receive a notification and how).
4.  **Payload Construction:** If a user needs a push notification, the server constructs a notification payload containing:
    *   `messageId`: ID of the message.
    *   `senderId`: ID of the sender.
    *   `rid`: Room ID.
    *   `title`: Notification title (e.g., sender's name).
    *   `text`: Message content.
    *   `badge`: Badge count for the app icon.
    *   `sound`: Notification sound.
    *   `notId`: A unique identifier for the notification (used for grouping/updating notifications on the device).
    *   Platform-specific flags (`apn`, `gcm`).
    *   **File:** `apps/meteor/app/push/server/raw.ts` (Handles the raw payload generation).
5.  **Queueing:** The generated payload (including the device token) is then inserted into the `rocketchat_notification` MongoDB collection. This collection acts as a queue for pending push notifications.
    *   **File:** `apps/meteor/app/push/server/send.ts` (The `sendPush` function here adds the notification to the queue).
    *   **Database:** `rocketchat_notification` collection.
6.  **Push Daemon/Processor:** Rocket.Chat runs a background process (often called the `Push` module) that continuously monitors the `rocketchat_notification` collection. When new entries appear, it picks them up.
    *   **File:** `apps/meteor/app/push/server/push.ts` (The core logic for processing the queue and sending to the proxy).

#### c. Rocket.Chat Push Proxy (The Intermediate Service)

This is a crucial, often external, component:
1.  **Proxy Connection:** The Rocket.Chat server (the `Push` module mentioned above) sends the notification payloads to a configured Push Proxy service via HTTP POST requests. By default, Rocket.Chat instances are configured to use Rocket.Chat's official hosted proxy at `https://push.rocket.chat/`.
    *   **Admin Setting:** `Administration > Push > Gateway` (defines the URL of the Push Proxy).
    *   **File:** `apps/meteor/app/push/server/settings.ts` (defines push settings like the gateway URL).
2.  **Platform Translation:** The Push Proxy receives the generic Rocket.Chat payloads. It then translates these into the specific formats required by APNs (for iOS) and FCM (for Android/Web).
    *   It includes the necessary API keys/certificates configured in the Rocket.Chat server settings (e.g., APN certificate or FCM server key).
    *   **Libraries:** The proxy uses libraries like `apn` for Apple and `fcm` (or `node-gcm`) for Google.
3.  **Forwarding to Gateways:** The Push Proxy then forwards these platform-specific notifications to:
    *   **Apple Push Notification service (APNs):** For iOS devices.
    *   **Firebase Cloud Messaging (FCM):** For Android devices and Web Push.

#### d. APNs and FCM (Native Push Gateways)

These are Apple and Google's highly optimized, globally distributed services:
1.  **Device Identification:** They use the device token (provided by the Push Proxy) to identify the target device.
2.  **Delivery:** They reliably deliver the notification to the respective operating system on the device. They handle network conditions, device power states, etc.

#### e. Client (Mobile App) Reception

1.  **OS Delivery:** The mobile OS (iOS or Android) receives the notification from its respective gateway.
2.  **App Activation (Background):** Even if the Rocket.Chat app is closed or in the background, the OS will often wake up a small part of the app (e.g., a background service on Android, or `application:didReceiveRemoteNotification:` on iOS) to handle the incoming payload.
3.  **Notification Display:** The OS displays the notification (banner, sound, vibration) based on the payload and user's OS-level notification settings.
4.  **App Logic:** The Rocket.Chat mobile app's code processes the notification:
    *   It updates the badge count on the app icon.
    *   If the user taps the notification, the app opens to the specific room/message.
    *   **File:** `apps/mobile/src/containers/Notification/index.tsx` (or similar files within the mobile app codebase) would handle the display and navigation logic upon notification tap.

### 3. Key Configuration Points (Administration Panel)

*   **`Administration > Push`:**
    *   **Enabled:** Toggles push notifications on/off.
    *   **Gateway:** URL of the Push Proxy service (default: `https://push.rocket.chat/`).
    *   **APN Certificate/Key:** For iOS notifications (if not using Rocket.Chat's proxy).
    *   **GCM/FCM API Key:** For Android and Web Push notifications (if not using Rocket.Chat's proxy).
*   **`User Menu > My Account > Preferences > Notifications`:** Individual user settings for sounds, alerts, and mentions.

### 4. Important Considerations

*   **Rocket.Chat's Push Proxy:** Using Rocket.Chat's official proxy (`https://push.rocket.chat/`) simplifies setup, as it handles the complexities of APN certificates and FCM keys for you. For self-hosting, you would need to generate and manage these credentials yourself.
*   **Web Push:** Web Push notifications also leverage FCM but are delivered to web browsers that support the Push API. The flow is similar, with the browser registering a service worker and subscribing to FCM.
*   **Offline Status:** Push notifications are generally sent only when a user is considered "offline" by the Rocket.Chat server. If a user is actively connected via a web client or desktop app, desktop notifications might be used instead.
*   **Battery Optimization:** Mobile operating systems have aggressive battery optimization features that can sometimes delay or prevent push notifications.
*   **Security:** Push tokens are sensitive. The communication between the Rocket.Chat server and the Push Proxy, and the proxy to APNs/FCM, is typically secured with HTTPS.

This architecture ensures a scalable and reliable way to deliver real-time communication to mobile users in Rocket.Chat, integrating with the native OS capabilities.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,124 |
| Model | gemini-2.5-flash |
| Tools | NONE |
