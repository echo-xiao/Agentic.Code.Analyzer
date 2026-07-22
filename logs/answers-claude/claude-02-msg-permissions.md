# Where is message permission validation?

## Answer

Message permission validation in Rocket.Chat is implemented through a layered system of permission checks that runs before every message send. The primary validation functions are in `apps/meteor/app/authorization/server/functions/canSendMessage.ts`, with additional message content validation in `apps/meteor/app/lib/server/functions/sendMessage.ts`.

The entry point for permission checking is `executeSendMessage()` in `apps/meteor/app/lib/server/methods/sendMessage.ts` (line 32). This function is called by both the Meteor method `sendMessage` and the REST API endpoint `chat.sendMessage` (in `v1/chat.ts`). It first validates basic parameters (thread settings, timestamp within 60s window), then calls `canSendMessageAsync()`.

`canSendMessageAsync()` (line 54 of `canSendMessage.ts`) performs the first layer: it fetches the room via `Rooms.findOneById(rid)` and then delegates to `validateRoomMessagePermissionsAsync()` (line 17). This function enforces the following checks in order:

1. **Room exists** — throws `error-invalid-room` if room is null
2. **Not archived** — throws `room_is_archived` if `room.archived` is true
3. **Room access** — calls `canAccessRoomAsync(room, user, extraData)` from `canAccessRoom.ts` (unless user type is `'app'`), which checks membership, invite tokens, and room type-specific access rules
4. **Not blocked** — for DMs, checks `subscription.blocked` and `subscription.blocker` via `Subscriptions.findOneByRoomIdAndUserId()`. Uses `roomCoordinator.getRoomDirectives(room.t).allowMemberAction(room, RoomMemberActions.BLOCK, uid)` to determine if blocking applies
5. **Read-only handling** — if `room.ro === true`, checks `hasPermissionAsync(uid, 'post-readonly', room._id)`. If the user lacks the permission, checks if they are in `room.unmuted[]` as an exception
6. **Muted check** — if `room.muted` includes the username, throws `You_have_been_muted`

After `canSendMessageAsync()` returns the room, `executeSendMessage()` calls `sendMessage()` from `apps/meteor/app/lib/server/functions/sendMessage.ts`. Inside this function, `validateMessage()` (line 151) performs content-level validation:
- Checks message impersonation (prevents setting a different `u` field without permission)
- Validates URLs in attachments against XSS (JavaScript protocol injection via `validFullURLParam`)
- Validates attachment structure with `Match.check()`
- Checks custom fields via `validateCustomMessageFields()`

For generic RBAC, `hasPermissionAsync()` from `apps/meteor/app/authorization/server/functions/hasPermission.ts` checks the `Permissions` and `Roles` models. Room-level access is handled by `canAccessRoomAsync()` in `apps/meteor/app/authorization/server/functions/canAccessRoom.ts`, which evaluates room type-specific access validators registered via `roomCoordinator`.

### Call Chain
```
executeSendMessage(uid, message) (methods/sendMessage.ts)
→ canSendMessageAsync(rid, user) (canSendMessage.ts)
  → Rooms.findOneById(rid)
  → validateRoomMessagePermissionsAsync(room, user)
    → room exists check
    → room.archived check
    → canAccessRoomAsync(room, user) (canAccessRoom.ts)
    → blocked/blocker check via Subscriptions
    → room.ro + hasPermissionAsync('post-readonly') + unmuted check
    → room.muted check
→ sendMessage(user, message, room) (functions/sendMessage.ts)
  → validateMessage(message, room, user)
    → impersonation check
    → XSS/href validation
    → attachment structure validation
    → validateCustomMessageFields()
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/authorization/server/functions/canSendMessage.ts` | `canSendMessageAsync()`, `validateRoomMessagePermissionsAsync()` — core permission gate |
| `apps/meteor/app/authorization/server/functions/canAccessRoom.ts` | `canAccessRoomAsync()` — room access validation |
| `apps/meteor/app/authorization/server/functions/hasPermission.ts` | `hasPermissionAsync()` — generic RBAC check |
| `apps/meteor/app/lib/server/methods/sendMessage.ts` | `executeSendMessage()` — entry point calling canSendMessageAsync |
| `apps/meteor/app/lib/server/functions/sendMessage.ts` | `validateMessage()` — content-level validation (XSS, impersonation) |
| `apps/meteor/app/lib/server/lib/validateCustomMessageFields.ts` | `validateCustomMessageFields()` — custom field validation |
| `apps/meteor/app/api/server/v1/chat.ts` | REST entry calling `executeSendMessage()` |

### Key Symbols
executeSendMessage, canSendMessageAsync, validateRoomMessagePermissionsAsync, canAccessRoomAsync, hasPermissionAsync, validateMessage, validateCustomMessageFields, RoomMemberActions.BLOCK, post-readonly, room.muted, room.unmuted, room.ro, room.archived, subscription.blocked, subscription.blocker
