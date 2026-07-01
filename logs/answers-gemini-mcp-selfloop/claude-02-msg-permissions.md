# Where is the logic for message permission validation located?

## Gemini Answer

The core logic for message permission validation is primarily located in `apps/meteor/app/authorization/server/functions/canSendMessage.ts`, specifically within the `validateRoomMessagePermissionsAsync` function. This function is part of the broader message sending flow initiated by the `sendMessage` Meteor method.

The call chain for message permission validation is as follows:

`Meteor.methods({ sendMessage })` → `executeSendMessage` → `canSendMessageAsync` → `validateRoomMessagePermissionsAsync`

**Key files and their roles:**

*   **`apps/meteor/app/authorization/server/functions/canSendMessage.ts`**: Contains `validateRoomMessagePermissionsAsync`, which performs checks such as:
    *   Verifying the room's existence and active status (not archived).
    *   Calling `canAccessRoomAsync` to ensure the user has access to the room.
    *   Checking for user-specific restrictions like being blocked or muted.
    *   Evaluating read-only room permissions.
*   **`apps/meteor/app/authorization/server/functions/hasPermission.ts`**: Contains `hasPermissionAsync`, a general utility function used by `validateRoomMessagePermissionsAsync` and other authorization checks to determine if a user has a specific permission.
*   **`apps/meteor/app/authorization/server/functions/canAccessRoom.ts`**: Contains `canAccessRoomAsync`, which is called by `validateRoomMessagePermissionsAsync` to determine if a user can access a given room.
*   **`apps/meteor/app/lib/server/functions/deleteMessage.ts`**: Contains `deleteMessageValidatingPermission`, which handles permission validation specifically for deleting messages.

## Tool Calls (2 calls, 6,665 tokens)

**Step 1:** `search({"query":"message permission","layer":"server"})` → 291 tokens
**Step 2:** `graph({"file":"apps/meteor/app/authorization/server/functions/canSendMessage.ts","query":"validateRoomMess)` → 653 tokens

## Files Seen In Tool Results (10)

- `apps/meteor/app/lib/server/functions/deleteMessage.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
- `apps/meteor/server/methods/deleteFileMessage.ts`
- `apps/meteor/app/authorization/server/functions/canDeleteMessage.ts`
- `apps/meteor/app/authorization/server/functions/canAccessRoom.ts`
- `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`
- `apps/meteor/server/lib/rooms/roomCoordinator.ts`
- `apps/meteor/app/authorization/server/functions/hasPermission.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
