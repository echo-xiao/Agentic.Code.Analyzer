# How are new endpoints registered in the REST API in Rocket.Chat?

## Plan

intent: pattern

## Gemini Answer

New endpoints are registered in the Rocket.Chat REST API by first creating an API instance using `createApi` from `apps/meteor/app/api/server/api.ts`. This `createApi` function returns an `APIClass` instance (defined in `apps/meteor/app/api/server/ApiClass.ts`).

The `APIClass` provides methods for registering routes, including:

*   **`addRoute(subpaths, options, endpoints)`**: This is a legacy method for adding routes. It takes an array of subpaths, options, and an object of endpoints. Many existing API endpoints, such as those found in `apps/meteor/app/api/server/v1/channels.ts`, `apps/meteor/app/api/server/v1/users.ts`, and `apps/meteor/app/api/server/v1/groups.ts`, utilize this method.
*   **Typed methods (`get`, `post`, `put`, `delete`)**: These methods provide a more modern and type-safe way to register routes for specific HTTP verbs. They take a subpath, options, and an action function as arguments.

The general flow for registering a new endpoint is:

1.  **Create an API instance**: `API.v1 = createApi({ version: 'v1', useDefaultAuth: true });` (as seen in `apps/meteor/app/api/server/api.ts`).
2.  **Register the route**: Using either `API.v1.addRoute()` for legacy routes or `API.v1.get()`, `API.v1.post()`, etc., for typed routes.

For example, a typical `addRoute` call looks like this (from `apps/meteor/app/api/server/v1/channels.ts`):


```typescript
API.v1.addRoute('channels.list', { authRequired: true }, {
  get() {
    // ... route handler logic ...
  },
});
```

## Tool Calls (8 calls, 32,167 tokens)

**Step 1:** `plan({"question":"How are new endpoints registered in the REST API in Rocket.Chat?","intent":"pattern"})` → 257 tokens
**Step 2:** `search({"query":"createApi"})` → 64 tokens
**Step 3:** `graph({"query":"createApi","file":"api.ts","depth":1,"move":"expand"})` → 247 tokens
**Step 4:** `details({"symbolName":"APIClass","filename":"ApiClass.ts"})` → 1575 tokens
**Step 5:** `search({"query":"API.v1.addRoute"})` → 267 tokens
**Step 6:** `details({"symbolName":"API.v1.addRoute","filename":"channels.ts"})` → 44 tokens
**Step 7:** `details({"symbolName":"channels.ts","filename":"channels.ts"})` → 46 tokens
**Step 8:** `search({"query":"API.v1.addRoute('/channels.list'"})` → 30 tokens

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
- `apps/meteor/app/api/server/v1/channels.ts`
- `apps/meteor/app/api/server/v1/users.ts`
- `apps/meteor/app/api/server/v1/groups.ts`
- `apps/meteor/app/api/server/v1/rooms.ts`
- `apps/meteor/app/api/server/v1/chat.ts`
- `apps/meteor/app/api/server/v1/teams.ts`
- `apps/meteor/app/api/server/v1/im.ts`
- `apps/meteor/app/livechat/server/api/v1/contact.ts`
- `apps/meteor/app/livechat/imports/server/rest/departments.ts`
- `apps/meteor/app/livechat/imports/server/rest/dashboards.ts`
