# Where is the logic for message permission validation located?

## Gemini Answer

The core logic for message permission validation is located in `apps/meteor/app/authorization/server/functions/canSendMessage.ts`, specifically within the `validateRoomMessagePermissionsAsync` function. This function performs various checks, including verifying if the room exists, is not archived, the user can access it, is not blocked, and handles read-only permissions and muted statuses. For more granular permission checks, it calls `hasPermissionAsync`.

The call chain is as follows:

`apps/meteor/app/authorization/server/functions/canSendMessage.ts` (validateRoomMessagePermissionsAsync)
  ↓
`packages/server-core/src/hasPermission.ts` (hasPermissionAsync)

## Tool Calls (2 calls, 5,548 tokens)

**Step 1:** `search({"layer":"server","query":"message permission validation"})` → 118 tokens
**Step 2:** `graph({"query":"validateRoomMessagePermissionsAsync","direction":"down","layer":"server"})` → 550 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 4/4 |
| Tool calls | 2 |
| Total tokens | 5,548 |
| Pass | NO |
