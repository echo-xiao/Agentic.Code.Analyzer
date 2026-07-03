# How do you create a new REST API endpoint in Rocket.Chat?

## Plan

intent: pattern

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you follow these steps:

1.  **Create an API instance**: An API instance is created using the `createApi` function, typically found in `apps/meteor/app/api/server/api.ts`. This function returns an `APIClass` instance. For example, `API.v1` is an instance of `APIClass` with version 'v1' and default authentication.

    *   **File**: `apps/meteor/app/api/server/api.ts`
    *   **Symbol**: `createApi`

2.  **Define the endpoint using `APIClass` methods**: The `APIClass` (defined in `apps/meteor/app/api/server/ApiClass.ts`) provides methods like `get()`, `post()`, `put()`, and `delete()` to define different HTTP methods for your endpoint. You pass the subpath, options, and an action function to these methods.

    *   **File**: `apps/meteor/app/api/server/ApiClass.ts`
    *   **Symbol**: `APIClass` (specifically, its `get`, `post`, `put`, `delete` methods)

3.  **Implement the route handler**: The action function (the last argument to `get()`, `post()`, etc.) is the route handler. It receives an `APIActionContext` object, which contains `this.bodyParams`, `this.queryParams`, and `this.user`. The handler should return a success or failure response using `API.v1.success()` or `API.v1.failure()`.

**Example Flow (based on common usage patterns):**

*   **Entry**: `apps/meteor/app/api/server/api.ts` (where `API.v1` is initialized)
*   **Step 1**: `apps/meteor/app/api/server/v1/moderation.ts` (or any other `v1` API file)
*   **Step 2**: `API.v1.get('/your-new-endpoint', options, function() { /* your logic here */ });`

This structure allows for defining new API endpoints with proper routing, authentication, and response handling within the Rocket.Chat server.

## Tool Calls (8 calls, 28,051 tokens)

**Step 1:** `plan({"question":"How do you create a new REST API endpoint in Rocket.Chat?","intent":"pattern"})` → 257 tokens
**Step 2:** `search({"query":"createApi"})` → 64 tokens
**Step 3:** `graph({"query":"createApi","file":"api.ts","move":"expand"})` → 247 tokens
**Step 4:** `details({"filename":"ApiClass.ts","symbolName":"APIClass"})` → 1575 tokens
**Step 5:** `details({"filename":"api.ts","symbolName":"createApi"})` → 100 tokens
**Step 6:** `search({"query":"API.v1.get"})` → 246 tokens
**Step 7:** `details({"filename":"moderation.ts","symbolName":"API.v1.get"})` → 45 tokens
**Step 8:** `details({"filename":"moderation.ts"})` → 8 tokens

## Files Seen In Tool Results (20)

- `apps/meteor/app/api/server/api.ts`
- `apps/meteor/server/settings/ldap.ts`
- `apps/meteor/client/lib/chats/uploads.ts`
- `packages/ui-client/src/components/Wizard/mocks/createMockWizardApi.ts`
- `apps/meteor/client/lib/chats/data.ts`
- `apps/meteor/app/ui-message/client/messageBox/createComposerAPI.ts`
- `apps/meteor/tests/mocks/data/outbound-message.ts`
- `apps/meteor/tests/e2e/federation/utils/channel.ts`
- `apps/meteor/tests/mocks/data/marketplace.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/api/server/v1/moderation.ts`
- `apps/meteor/app/api/server/v1/import.ts`
- `apps/meteor/app/api/server/v1/settings.ts`
- `apps/meteor/app/api/server/v1/misc.ts`
- `apps/meteor/app/api/server/v1/videoConference.ts`
- `apps/meteor/app/api/server/v1/integrations.ts`
- `apps/meteor/app/api/server/v1/email-inbox.ts`
- `apps/meteor/app/api/server/v1/cloud.ts`
- `apps/meteor/app/api/server/v1/calendar.ts`
- `apps/meteor/app/api/server/v1/banners.ts`
