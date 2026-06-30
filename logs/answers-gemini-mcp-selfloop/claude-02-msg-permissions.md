# Where is the logic for message permission validation located?

## Gemini Answer

The logic for message permission validation is primarily located in `apps/meteor/app/authorization/server/functions/canSendMessage.ts`, within the `validateRoomMessagePermissionsAsync` function. This function is a key part of the message sending flow on the server.

The call chain for message permission validation typically follows this path:

`Meteor.methods({ sendMessage })` → `executeSendMessage` → `canSendMessageAsync` → `validateRoomMessagePermissionsAsync`

**Key Files and Their Roles:**

*   **`apps/meteor/app/lib/server/functions/sendMessage.ts`**: Contains `executeSendMessage`, which is a core function in the message sending process and orchestrates various validations, including permission checks.
*   **`apps/meteor/app/authorization/server/functions/canSendMessage.ts`**: This file contains `validateRoomMessagePermissionsAsync`, which performs checks such as whether the room exists, is not archived, the user can access the room, the user is not blocked, and validates read-only permissions and muted status. It also calls:
    *   **`hasPermissionAsync`**: Located in `apps/meteor/app/authorization/server/functions/hasPermission.ts`, this function checks specific user permissions.
    *   **`canAccessRoomAsync`**: Located in `apps/meteor/app/authorization/server/functions/canAccessRoom.ts`, this function verifies if a user has access to a particular room.

## Tool Calls (2 calls, 6,030 tokens)

**Step 1:** `search({"layer":"server","query":"message permission validation"})` → 118 tokens
**Step 2:** `graph({"layer":"server","file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/app/authorization/se)` → 550 tokens
