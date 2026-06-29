# Complete call chain for sendMessage?

## Answer

The sendMessage call chain spans from client-side message composition through server-side validation, persistence, and post-save hooks including notifications and real-time delivery. There are two entry paths on the server (Meteor method and REST API), but they converge on the same core pipeline.

**Client Side:**

The client flow starts in `apps/meteor/client/lib/chats/flows/sendMessage.ts`. The `process()` function (line 16) runs through a pipeline: `processSetReaction()` → `processTooLongMessage()` → `processSlashCommand()` → `processMessageUploads()` → `onClientBeforeSendMessage()` (client-side hooks). If none of these short-circuit, it proceeds to send. For new messages (no `mid`), it calls `sdk.call('sendMessage', message)` which invokes the Meteor method. For edits, it calls `sdk.call('updateMessage', message)`.

**Server Entry — Meteor Method:**

`apps/meteor/app/lib/server/methods/sendMessage.ts` registers the Meteor method `sendMessage`. It validates the caller is logged in, then calls `executeSendMessage(uid, message)` (line 32). This function:
1. Validates thread parameters (`tshow` requires `tmid`, threads must be enabled)
2. Validates timestamp is within 60 seconds of server time
3. Calls `canSendMessageAsync(rid, user)` for permission validation

**Server Entry — REST API:**

`apps/meteor/app/api/server/v1/chat.ts` registers `POST /v1/chat.sendMessage`. After auth and param validation via `isChatSendMessageProps`, it also calls `executeSendMessage()`, converging with the Meteor method path.

**Permission Validation:**

`canSendMessageAsync()` (in `authorization/server/functions/canSendMessage.ts`) fetches the room and calls `validateRoomMessagePermissionsAsync()`, which checks: room exists, not archived, `canAccessRoomAsync()`, not blocked/blocker, read-only permissions (`post-readonly` + `unmuted`), and muted status.

**Core sendMessage Function:**

After permissions pass, `executeSendMessage()` calls `sendMessage(user, message, room, upsert)` from `apps/meteor/app/lib/server/functions/sendMessage.ts`. This function:
1. Calls `validateMessage(message, room, user)` (line 151) — checks impersonation, XSS in href attributes, attachment structure, custom fields
2. Sets message metadata: `_id` (Random.id()), `rid`, `ts`, `u` (sender), `_updatedAt`
3. Processes URLs, attachments, and mentions
4. Inserts into database: `Messages.insertOne(message)` (or `upsert` variant)
5. Updates room's last message: `notifyOnRoomChangedById(rid)`
6. Calls `afterSaveMessage(message, room, user)` (line 292)

**Post-Save Pipeline:**

`afterSaveMessage()` (from `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`) triggers callbacks including:
- `sendAllNotifications()` (in `sendNotificationsOnMessage.ts`) — evaluates per-user notification eligibility for desktop, mobile, and email
- Mobile notifications flow to `NotificationQueue` with delay-based scheduling (120s online, 0s offline)
- Real-time delivery via `notifyOnMessageChange()` → `api.broadcast('watch.messages')` → `ListenersModule` → `streamRoomMessage._emit()` → DDP WebSocket to clients
- Apps Engine hooks (`IPostMessageSent`, etc.)
- Thread/discussion updates

### Call Chain
```
CLIENT:
sendMessage.ts process() → sdk.call('sendMessage', message)

SERVER:
methods/sendMessage.ts → executeSendMessage(uid, message)
  → canSendMessageAsync(rid, user)
    → validateRoomMessagePermissionsAsync(room, user)
      → canAccessRoomAsync(), blocked check, readonly check, muted check
  → sendMessage(user, message, room) (functions/sendMessage.ts)
    → validateMessage(message, room, user)
    → Messages.insertOne(message)
    → notifyOnRoomChangedById(rid)
    → afterSaveMessage(message, room, user)
      → sendAllNotifications()
        → shouldNotifyMobile/Desktop/Email per user
        → NotificationQueue.queueNotification()
      → notifyOnMessageChange() → api.broadcast('watch.messages')
      → Apps Engine hooks

REST ALTERNATIVE:
v1/chat.ts POST chat.sendMessage → executeSendMessage() (same path)
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/client/lib/chats/flows/sendMessage.ts` | Client-side send flow — `process()`, `sdk.call('sendMessage')` |
| `apps/meteor/app/lib/server/methods/sendMessage.ts` | `executeSendMessage()` — Meteor method entry, validation |
| `apps/meteor/app/api/server/v1/chat.ts` | REST entry — `POST chat.sendMessage` → `executeSendMessage()` |
| `apps/meteor/app/authorization/server/functions/canSendMessage.ts` | `canSendMessageAsync()`, `validateRoomMessagePermissionsAsync()` |
| `apps/meteor/app/lib/server/functions/sendMessage.ts` | `sendMessage()`, `validateMessage()` — core persistence |
| `apps/meteor/app/lib/server/lib/afterSaveMessage.ts` | `afterSaveMessage()` — post-save hook orchestration |
| `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts` | `sendAllNotifications()` — notification evaluation |
| `apps/meteor/app/lib/server/lib/notifyListener.ts` | `notifyOnMessageChange()` — real-time broadcast |
| `apps/meteor/app/notification-queue/server/NotificationQueue.ts` | `NotificationClass` — queued notification delivery |

### Key Symbols
process, sdk.call, executeSendMessage, canSendMessageAsync, validateRoomMessagePermissionsAsync, canAccessRoomAsync, sendMessage, validateMessage, Messages.insertOne, afterSaveMessage, sendAllNotifications, shouldNotifyMobile, NotificationQueue, notifyOnMessageChange, api.broadcast, streamRoomMessage
