# How do push notifications work?

## Answer

Push notifications in Rocket.Chat follow a multi-stage pipeline: message save triggers notification evaluation, eligible notifications are queued with delay-based scheduling, and a background worker dequeues and dispatches them to either the Rocket.Chat Cloud gateway or directly to APNs/FCM.

The pipeline begins after a message is saved to the database. The `afterSaveMessage()` hook (called at the end of `sendMessage()` in `apps/meteor/app/lib/server/functions/sendMessage.ts`, line 292) triggers `sendAllNotifications()` in `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`. This function iterates over all room subscriptions, evaluating each user's eligibility for desktop, mobile, and email notifications.

For mobile push, `shouldNotifyMobile()` (from `apps/meteor/app/lib/server/functions/notifications/mobile.js`) determines eligibility based on: user's mobile push notification preference on the subscription, global settings, user online status, DND mode, and whether the message mentions the user or matches highlight words. `getPushData()` in the same file constructs the push payload with sender info, room name, message text (optionally omitted for privacy via `Push_request_content_from_server`), and category (MESSAGE vs MESSAGE_NOREPLY based on room read-only/muted status).

Eligible notifications are not sent immediately. Instead, `sendNotification()` calls `Notification.queueNotification()` on the `NotificationQueue` singleton (from `apps/meteor/app/notification-queue/server/NotificationQueue.ts`). The `NotificationClass` (line 18) implements delay-based scheduling: online users get a 120-second delay (`NOTIFICATIONS_SCHEDULE_DELAY_ONLINE`), away users get 0-second delay, and offline users get 0-second delay. This allows online users to read messages before being notified. Notifications are stored in the `NotificationQueue` MongoDB collection with a `schedule` timestamp.

A background worker (`initWorker()` / `executeWorkerLater()`) polls the queue every 2 seconds (`NOTIFICATIONS_WORKER_TIMEOUT`), fetching batches of up to 100 (`NOTIFICATIONS_BATCH_SIZE`) due notifications. For push notifications, it calls `PushNotification.send()` which delegates to the `PushClass` in `apps/meteor/app/push/server/push.ts` (line 131).

`PushClass` routes notifications through two paths:
1. **Cloud Gateway** (`sendNotificationGateway()`, line 327): When configured for Rocket.Chat Cloud push, it sends the payload to `https://gateway.rocket.chat/push/:appName/send` via HTTP POST. The gateway handles APNs/FCM delivery.
2. **Native/Direct** (`sendNotificationNative()`, line 182): When using direct push, it sends to APNs via the `apn` module (`apps/meteor/app/push/server/apn.ts` using `sendAPN()`) and to FCM via `apps/meteor/app/push/server/fcm.ts` using `sendFCM()` with OAuth2 JWT authentication (using `google-auth-library`'s `JWT` class for service account credentials).

Token management uses the `PushToken` model — devices register their APNs/FCM tokens, and `PushClass` queries tokens by user ID to determine delivery targets.

### Call Chain
```
sendMessage() → afterSaveMessage()
→ sendAllNotifications() (sendNotificationsOnMessage.ts)
  → shouldNotifyMobile() — per-user eligibility check
  → getPushData() — build payload
  → sendNotification() → Notification.queueNotification()
→ NotificationQueue (NotificationQueue.ts)
  → schedules with delay: 120s online, 0s away/offline
  → worker polls every 2s, batch size 100
→ PushNotification.send() → PushClass (push.ts)
  → sendNotificationGateway() — HTTP POST to cloud gateway
  OR
  → sendNotificationNative()
    → sendAPN() (apn.ts) — Apple Push Notification service
    → sendFCM() (fcm.ts) — Firebase Cloud Messaging via OAuth2 JWT
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts` | `sendAllNotifications()`, `sendNotification()` — orchestrates per-user notification evaluation |
| `apps/meteor/app/lib/server/functions/notifications/mobile.js` | `shouldNotifyMobile()`, `getPushData()` — mobile eligibility and payload |
| `apps/meteor/app/notification-queue/server/NotificationQueue.ts` | `NotificationClass` — delay-based scheduling, background worker |
| `apps/meteor/app/push/server/push.ts` | `PushClass` — `sendNotificationGateway()`, `sendNotificationNative()` |
| `apps/meteor/app/push/server/apn.ts` | `sendAPN()`, `initAPN()` — Apple Push Notification service |
| `apps/meteor/app/push/server/fcm.ts` | `sendFCM()` — Firebase Cloud Messaging with OAuth2 JWT |
| `apps/meteor/app/push-notifications/server/index.ts` | `PushNotification` — builds and sends push payloads |
| `apps/meteor/app/lib/server/functions/sendMessage.ts` | `sendMessage()` → `afterSaveMessage()` trigger |

### Key Symbols
sendAllNotifications, sendNotification, shouldNotifyMobile, getPushData, NotificationClass, Notification, queueNotification, PushClass, sendNotificationGateway, sendNotificationNative, sendAPN, sendFCM, initAPN, afterSaveMessage, PushNotification, NOTIFICATIONS_SCHEDULE_DELAY_ONLINE, NOTIFICATIONS_SCHEDULE_DELAY_OFFLINE, NOTIFICATIONS_WORKER_TIMEOUT, NOTIFICATIONS_BATCH_SIZE
