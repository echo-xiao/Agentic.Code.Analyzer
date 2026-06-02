# How is a message sent on the server side in Rocket.Chat?

## Answer

Server-side message sending starts when `sdk.call('sendMessage')` crosses the DDP boundary from the client, hitting the Meteor method handler, then flowing through validation, permission checks, database persistence, and post-save callbacks.

### 1. DDP Entry Point

**Meteor method registration** (`apps/meteor/app/lib/server/methods/sendMessage.ts`, line 134-175):
- Registered via `Meteor.methods({ sendMessage })`
- Validates input via `check()` and `Match`
- Gets current user via `Meteor.userAsync()`
- Prevents system message injection from client
- Wraps `executeSendMessage()` with `applyAirGappedRestrictionsValidation()`

**Rate Limiter** (line 177-181): Limits non-bot users to 5 messages/second. Users with `send-many-messages` permission are exempt.

### 2. executeSendMessage()

**`executeSendMessage(uid, message, extraInfo)`** (line 32-125):

1. **Thread validation** (line 37-47): Rejects `tshow=true` without `tmid`; rejects threads if disabled
2. **Timestamp processing** (line 49-64): Validates client timestamp isn't out of sync (>60s = error, >10s = override to server time)
3. **Message size** (line 66-72): Checks `msg.length` against `Message_MaxAllowedSize` setting
4. **User validation** (line 74-77): Resolves user object, requires username
5. **Room resolution** (line 79-93): Gets `rid` from message; for thread replies, resolves parent's rid; prevents nested threads
6. **Permission check** (line 97-98): Calls `canSendMessageAsync(rid, user)` which delegates to `validateRoomMessagePermissionsAsync()`
7. **Encryption validation** (line 100-106): In encrypted rooms with E2E enabled, requires `message.t === 'e2e'`
8. **Metrics** (line 108): Increments `metrics.messagesSent.inc()`
9. **Send** (line 109): Calls the core `sendMessage(user, message, room, { previewUrls })`

### 3. Permission Validation

**`canSendMessageAsync(rid, user)`** (`apps/meteor/app/authorization/server/functions/canSendMessage.ts`):
- Finds room by ID
- Calls `validateRoomMessagePermissionsAsync(room, { uid, username, type })`

**`validateRoomMessagePermissionsAsync(room, args)`** checks in order:
1. Room exists → `error-invalid-room`
2. Room not archived → `room_is_archived`
3. User can access room → `canAccessRoomAsync()` (skipped for apps)
4. DM not blocked → checks subscription for blocked/blocker status
5. Read-only room → requires `post-readonly` permission or in `room.unmuted`
6. User not muted → checks `room.muted` array

### 4. Core sendMessage Function

**`sendMessage(user, message, room, options)`** (`apps/meteor/app/lib/server/functions/sendMessage.ts`, line 224-297):

1. **validateMessage()** (line 231): Checks message structure, impersonation permissions (alias/avatar require `message-impersonate`), attachment URLs (XSS prevention), custom fields
2. **prepareMessageObject()** (line 232): Sets timestamp, user info (`u._id`, `username`, `name`), room ID, normalizes `msg` to empty string if not provided
3. **Read receipt** (line 234-236): Sets `message.unread = true` if read receipts enabled
4. **Apps Engine pre-save hooks** (line 239-257):
   - `IPreMessageSentPrevent` — app can cancel the message
   - `IPreMessageSentExtend` — app can add data
   - `IPreMessageSentModify` — app can modify message
   - Re-validates after modifications
5. **Message service processing** (line 259-263): `Message.beforeSave()` — parses URLs, handles E2E, generates previews
6. **Database write** (line 265-284): `Messages.insertOne()` or `Messages.updateOne()` (if upsert)
7. **Apps post-save hook** (line 286-290): `IPostMessageSent` or `IPostSystemMessageSent`
8. **afterSaveMessage()** (line 292): Triggers the callback chain — notifications, search indexing, integrations
9. **Room notification** (line 294): `notifyOnRoomChangedById(message.rid)`

### 5. Key Files

| File | Role |
|------|------|
| `apps/meteor/app/lib/server/methods/sendMessage.ts` | DDP entry, executeSendMessage, rate limiting |
| `apps/meteor/app/lib/server/functions/sendMessage.ts` | Core send: validate, persist, afterSave |
| `apps/meteor/app/authorization/server/functions/canSendMessage.ts` | Permission validation chain |
| `apps/meteor/client/lib/chats/ChatAPI.ts` | ChatAPI interface (client-server contract) |
| `apps/meteor/app/ui/client/lib/ChatMessages.ts` | ChatMessages class (client-side coordinator) |
| `apps/meteor/app/lib/client/methods/sendMessage.ts` | Client-side method stub for optimistic UI |

### 6. Key Symbols

`executeSendMessage`, `sendMessage`, `validateMessage`, `prepareMessageObject`, `canSendMessageAsync`, `validateRoomMessagePermissionsAsync`, `afterSaveMessage`, `ChatMessages`, `ChatAPI`
