# Where is the logic for message permission validation located?

## Plan

intent: locate

## Gemini Answer

The logic for message permission validation is primarily located in the `validateRoomMessagePermissionsAsync` function within the file `apps/meteor/app/authorization/server/functions/canSendMessage.ts`.

This function performs several checks, including:
*   Validating the room's existence and status (e.g., not archived).
*   Verifying user access to the room via `canAccessRoomAsync`.
*   Checking for blocked users.
*   Enforcing read-only room restrictions using `hasPermissionAsync` for the 'post-readonly' permission.
*   Identifying and handling muted users.

A related function for general permission checks, `hasPermissionAsync`, is located in `apps/meteor/app/authorization/server/functions/hasPermission.ts`.

**Core File:**
*   `apps/meteor/app/authorization/server/functions/canSendMessage.ts`: Contains the `validateRoomMessagePermissionsAsync` function, which is the central point for message permission validation.

**Related File:**
*   `apps/meteor/app/authorization/server/functions/hasPermission.ts`: Contains the `hasPermissionAsync` function, used for general permission checks, including those related to message posting in read-only rooms.

## Tool Calls (5 calls, 8,675 tokens)

**Step 1:** `plan({"question":"Where is the logic for message permission validation located?","intent":"locate"})` → 75 tokens
**Step 2:** `search({"query":"message permission validation"})` → 29 tokens
**Step 3:** `search({"query":"validateMessage"})` → 96 tokens
**Step 4:** `graph({"query":"validateMessage","move":"expand","file":"sendMessage.ts"})` → 331 tokens
**Step 5:** `details({"symbolName":"validateRoomMessagePermissionsAsync","filename":"canSendMessage.ts"})` → 399 tokens

## Files Seen In Tool Results (13)

- `apps/meteor/app/livechat/server/hooks/leadCapture.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/lib/server/lib/validateCustomMessageFields.ts`
- `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
- `ee/packages/omnichannel-services/src/OmnichannelTranscript.fixtures.ts`
- `apps/meteor/tests/unit/app/lib/server/lib/validateCustomMessageFields.tests.ts`
- `apps/meteor/client/lib/rooms/roomCoordinator.tsx`
- `apps/meteor/app/lib/server/functions/insertMessage.ts`
- `apps/meteor/app/authorization/server/functions/hasPermission.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/server/ufs/ufs-store.ts`
- `apps/meteor/server/ufs/ufs-filter.ts`
