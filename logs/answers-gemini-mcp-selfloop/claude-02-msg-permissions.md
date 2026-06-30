# Where is the logic for message permission validation located?

## Gemini Answer

The logic for message permission validation is primarily located in the `validateRoomMessagePermissionsAsync` function. This function performs a series of checks to determine if a user has the necessary permissions to send a message in a given room.

**Call Chain:**
`Meteor.methods({ sendMessage })` → `executeSendMessage` → `canSendMessageAsync` → `validateRoomMessagePermissionsAsync`

**Key Files and Their Roles:**

1.  **`apps/meteor/app/authorization/server/functions/canSendMessage.ts`**: This file contains the `validateRoomMessagePermissionsAsync` function, which is the core of the message permission validation. It checks:
    *   Room existence
    *   Room archived status
    *   User's ability to access the room (delegates to `canAccessRoomAsync`)
    *   If the user is blocked in the room
    *   If the room is read-only and if the user has `post-readonly` permission
    *   If the user is muted in the room

2.  **`apps/meteor/app/authorization/server/functions/canAccessRoom.ts`**: This file contains the `canAccessRoomAsync` function, which is called by `validateRoomMessagePermissionsAsync` to verify if a user has general access to the room.

3.  **`apps/meteor/app/authorization/server/functions/hasPermission.ts`**: This file contains the `hasPermissionAsync` function, which is used by `validateRoomMessagePermissionsAsync` to check for specific permissions, such as `post-readonly`.

## Tool Calls (3 calls, 8,807 tokens)

**Step 1:** `search({"query":"message permission validation"})` → 118 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"validateRoomMessagePermissionsAsync"})` → 550 tokens
**Step 3:** `implement({"symbolName":"validateRoomMessagePermissionsAsync","filename":"apps/meteor/app/authorization/server)` → 409 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 4/4 |
| Tool calls | 3 |
| Total tokens | 8,807 |
| Pass | NO |
