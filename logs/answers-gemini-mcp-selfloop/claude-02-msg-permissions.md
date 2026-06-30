# Where is the logic for message permission validation located?

## Gemini Answer

The logic for message permission validation is primarily located in:

`apps/meteor/app/authorization/server/functions/canSendMessage.ts` within the function `validateRoomMessagePermissionsAsync`.

This function performs checks such as:
*   Room existence
*   Room archived status
*   User's ability to access the room (`canAccessRoomAsync`)
*   If the user is blocked
*   Read-only permissions
*   Muted status

The call chain for message permission validation typically follows this path:

`Meteor.methods({ sendMessage })` → `executeSendMessage` → `canSendMessageAsync` → `validateRoomMessagePermissionsAsync`

The `validateRoomMessagePermissionsAsync` function further utilizes other permission-related functions:

*   **Entry Point:** `validateRoomMessagePermissionsAsync` in `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
*   **Permission Check:** `hasPermissionAsync` in `apps/meteor/app/authorization/server/functions/hasPermission.ts`
*   **Room Directives:** `getRoomDirectives` in `apps/meteor/server/lib/rooms/roomCoordinator.ts`
*   **Room Access:** `canAccessRoomAsync` in `apps/meteor/app/authorization/server/functions/canAccessRoom.ts`

## Tool Calls (2 calls, 6,346 tokens)

**Step 1:** `search({"query":"message permission validation","layer":"server"})` → 303 tokens
**Step 2:** `graph({"query":"validateRoomMessagePermissionsAsync","file":"apps/meteor/app/authorization/server/function)` → 528 tokens
