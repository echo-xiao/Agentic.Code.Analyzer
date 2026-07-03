# Where is the logic for message permission validation located?

## Plan

intent: locate

## Gemini Answer

The logic for message permission validation is primarily located in two key files:

1.  **`apps/meteor/app/authorization/server/functions/canSendMessage.ts`**: This file contains the `validateRoomMessagePermissionsAsync` function, which is responsible for validating a user's permissions to send messages within a specific room. It checks for conditions such as:
    *   Room existence and archived status.
    *   User's general access to the room.
    *   Whether the user is blocked.
    *   Read-only room status and `post-readonly` permission.
    *   User's muted status within the room.

2.  **`apps/meteor/app/lib/server/functions/sendMessage.ts`**: This file contains the `validateMessage` function, which performs validation on the message object itself. While it also includes some permission checks, such as `message-impersonate` for alias and avatar usage, its main role is to validate the structure and content of the message, including attachments and custom fields.

The overall flow for message permission validation can be summarized as:

Entry (`executeSendMessage`) → `canSendMessageAsync` → `validateRoomMessagePermissionsAsync` (for room-level permissions)
Entry (`sendMessage`) → `validateMessage` (for message content-level permissions)

## Tool Calls (5 calls, 8,095 tokens)

**Step 1:** `plan({"question":"Where is the logic for message permission validation located?","intent":"locate"})` → 292 tokens
**Step 2:** `search({"query":"validateMessage"})` → 96 tokens
**Step 3:** `graph({"depth":1,"move":"expand","query":"validateMessage","file":"sendMessage.ts"})` → 331 tokens
**Step 4:** `details({"filename":"sendMessage.ts","symbolName":"validateMessage"})` → 298 tokens
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
