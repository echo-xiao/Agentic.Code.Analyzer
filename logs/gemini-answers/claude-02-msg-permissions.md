# Where is the logic for message permission validation located?

## Gemini Answer

The logic for message permission validation is primarily located in the `validateRoomMessagePermissionsAsync` function within `apps/meteor/app/authorization/server/functions/canSendMessage.ts`.

Here's the call chain and the relevant files:

*   **Entry Point**: `validateRoomMessagePermissionsAsync` in `apps/meteor/app/authorization/server/functions/canSendMessage.ts`

Within `validateRoomMessagePermissionsAsync`, the following checks are performed:

1.  **Room Existence and Archive Status**: Checks if the room exists and is not archived.
2.  **Room Access**: Calls `canAccessRoomAsync` (defined in `apps/meteor/app/authorization/server/functions/canAccessRoom.ts`) to verify if the user has general access to the room.
3.  **Blocked Status**: Utilizes `roomCoordinator.getRoomDirectives` to determine if a member action (BLOCK) is allowed and then checks if the user is blocked or has blocked another user in the room via `Subscriptions.findOneByRoomIdAndUserId`.
4.  **Read-only Rooms**: If the room is read-only (`room.ro === true`), it checks for the `post-readonly` permission using `hasPermissionAsync` (defined in `packages/server/lib/src/hasPermission.ts`, which may also involve `apps/meteor/app/authorization/server/functions/hasPermission.ts`). It also verifies if the user is explicitly unmuted in a read-only room.
5.  **Muted Users**: Checks if the user is muted in the room.

**Call Chain:**
`Entry (e.g., sendMessage method)` → `executeSendMessage` → `canSendMessageAsync` → `validateRoomMessagePermissionsAsync` (apps/meteor/app/authorization/server/functions/canSendMessage.ts)

**Key Files:**
*   `apps/meteor/app/authorization/server/functions/canSendMessage.ts` (contains `validateRoomMessagePermissionsAsync`)
*   `apps/meteor/app/authorization/server/functions/canAccessRoom.ts` (contains `canAccessRoomAsync`)
*   `packages/server/lib/src/hasPermission.ts` (contains `hasPermissionAsync` for general permissions)
*   `apps/meteor/app/lib/server/functions/deleteMessage.ts` (contains `deleteMessageValidatingPermission` for message deletion specific permission)

## Tool Calls (3 calls, 8,851 tokens)

**Step 1:** `search({"query":"message permission validation","layer":"server"})` → 118 tokens
**Step 2:** `graph({"layer":"server","query":"validateRoomMessagePermissionsAsync","direction":"down"})` → 550 tokens
**Step 3:** `implement({"symbolName":"validateRoomMessagePermissionsAsync","filename":"apps/meteor/app/authorization/server)` → 409 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 4/4 |
| Tool calls | 3 |
| Total tokens | 8,851 |
| Pass | NO |
