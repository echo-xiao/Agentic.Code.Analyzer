# Where is the logic for message permission validation located?

## Gemini Answer

The core logic for message permission validation is located in the `canSendMessageAsync` function within the file `apps/meteor/app/authorization/server/functions/canSendMessage.ts`.

This function performs the initial room validation and then calls `validateRoomMessagePermissionsAsync` to handle the specific message permission checks.

## Tool Calls (8 calls, 14,623 tokens)

**Step 1:** `plan({"question":"Where is the logic for message permission validation located?","intent":"locate"})` → 75 tokens
**Step 2:** `search({"query":"validateMessagePermissions"})` → 29 tokens
**Step 3:** `search({"query":"message permission"})` → 98 tokens
**Step 4:** `search({"query":"canSendMessage"})` → 203 tokens
**Step 5:** `details({"symbolName":"canSendMessage","filename":"apps/meteor/app/authorization/server/functions/canSendMes)` → 17 tokens
**Step 6:** `details({"filename":"apps/meteor/app/authorization/server/functions/canSendMessage.ts","symbolName":""})` → 8 tokens
**Step 7:** `graph({"file":"apps/meteor/app/authorization/server/functions/canSendMessage.ts","query":"canSendMessage",)` → 431 tokens
**Step 8:** `details({"symbolName":"canSendMessageAsync","filename":"apps/meteor/app/authorization/server/functions/canSe)` → 158 tokens

## Files Seen In Tool Results (13)

- `apps/meteor/tests/end-to-end/api/chat.ts`
- `ee/packages/omni-core-ee/src/outbound-communication/validators/canSendMessage.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `packages/apps-engine/src/server/managers/AppPermissionManager.ts`
- `apps/meteor/ee/server/configuration/videoConference.ts`
- `ee/packages/omni-core-ee/src/units/addRoleBasedRestrictionsToDepartment.ts`
- `packages/models/src/models/BaseRaw.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/lib/server/methods/updateMessage.ts`
- `apps/meteor/server/lib/callbacks/callbacksBase.ts`
- `packages/models/src/models/Users.ts`
