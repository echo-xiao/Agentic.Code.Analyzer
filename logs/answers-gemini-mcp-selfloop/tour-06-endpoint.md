# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you primarily use the `API.v1.addRoute` method or the HTTP verb-specific methods (`API.v1.get`, `API.v1.post`, `API.v1.put`, `API.v1.delete`) provided by the `APIClass`.

The entry point for the REST API is initialized in `apps/meteor/app/api/server/api.ts` by the `startRestAPI` function, which sets up the `API.v1` router.

Here's how you can create a new endpoint:

**1. Using `API.v1.addRoute` (for multiple HTTP methods on the same path):**

This method allows you to define multiple HTTP methods (GET, POST, etc.) for a given path.

*   **File:** `apps/meteor/app/api/server/ApiClass.ts` (where `APIClass` is defined)
*   **Method:** `addRoute(subpaths: TSubPathPattern[], options: TOptions, endpoints?: Operations<TPathPattern, TOptions>): void`

Example (conceptual):


```typescript
API.v1.addRoute(
    ['/my-new-endpoint'],
    { authRequired: true }, // Options like authentication
    {
        get: function() {
            // Handle GET request
            return API.v1.success({ message: 'GET request received!' });
        },
        post: function() {
            // Handle POST request
            return API.v1.success({ message: 'POST request received!' });
        }
    }
);
```


**2. Using HTTP verb-specific methods (`API.v1.get`, `API.v1.post`, etc.):**

These methods are more concise for defining a single HTTP method for a given path.

*   **File:** `apps/meteor/app/api/server/ApiClass.ts` (where `APIClass` is defined)
*   **Methods:**
    *   `get(subpath: TSubPathPattern, options: TOptions, action: TypedAction<TOptions, TSubPathPattern>): APIClass`
    *   `post(subpath: TSubPathPattern, options: TOptions, action: TypedAction<TOptions, TSubPathPattern>): APIClass`
    *   `put(subpath: TSubPathPattern, options: TOptions, action: TypedAction<TOptions, TSubPathPattern>): APIClass`
    *   `delete(subpath: TSubPathPattern, options: TOptions, action: TypedAction<TOptions, TSubPathPattern>): APIClass`

Example (conceptual):


```typescript
API.v1.get(
    '/my-new-get-endpoint',
    { authRequired: false }, // Options
    function() {
        // Handle GET request
        return API.v1.success({ data: 'This is a new GET endpoint.' });
    }
);

API.v1.post(
    '/my-new-post-endpoint',
    { authRequired: true },
    function() {
        // Handle POST request
        const { someData } = this.bodyParams; // Access request body
        return API.v1.success({ received: someData });
    }
);
```


**Key Files and Their Roles:**

*   `apps/meteor/app/api/server/api.ts`: This file contains the `startRestAPI` function, which is the entry point for initializing the REST API. It sets up the `API.v1` and `API.default` routers.
*   `apps/meteor/app/api/server/ApiClass.ts`: This file defines the `APIClass`, which is the core class for creating and managing API routes. It provides the `addRoute` method and the HTTP verb-specific methods (`get`, `post`, `put`, `delete`).
*   `apps/meteor/app/api/server/v1/users.ts` (and similar files like `channels.ts`, `groups.ts`): These files demonstrate practical examples of how `API.v1.addRoute` and other methods are used to define specific API endpoints within the Rocket.Chat application.

**Call Chain:**
`apps/meteor/app/api/server/api.ts` (`startRestAPI`) → `apps/meteor/app/api/server/api.ts` (`API.v1` initialization via `createApi`) → `apps/meteor/app/api/server/ApiClass.ts` (`APIClass.addRoute` or `APIClass.get/post/put/delete` methods are called on the `API.v1` instance).

## Tool Calls (8 calls, 41,911 tokens)

**Step 1:** `search({"query":"API.addRoute","layer":"server"})` → 14 tokens
**Step 2:** `search({"layer":"server","query":"rest api"})` → 295 tokens
**Step 3:** `graph({"query":"startRestAPI","layer":"server","file":"apps/meteor/app/api/server/api.ts","direction":"dow)` → 1618 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/api/server/api.ts","symbolName":"startRestAPI"})` → 153 tokens
**Step 5:** `search({"layer":"server","query":"API.v1"})` → 285 tokens
**Step 6:** `implement({"symbolName":"API.v1.addRoute","filename":"apps/meteor/app/api/server/v1/users.ts"})` → 43 tokens
**Step 7:** `implement({"symbolName":"API","filename":"apps/meteor/app/api/server/api.ts"})` → 259 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/api/server/api.ts","symbolName":"APIClass"})` → 1578 tokens

## Files Seen In Tool Results (20)

- `apps/meteor/app/api/server/api.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `packages/apps-engine/src/server/bridges/ApiBridge.ts`
- `apps/meteor/app/utils/client/lib/RestApiClient.ts`
- `apps/meteor/ee/server/apps/communication/endpoints/appLogsDistinctInstanceHandler.ts`
- `apps/meteor/ee/lib/misc/formatAppInstanceForRest.ts`
- `apps/meteor/server/services/omnichannel-analytics/ChartData.ts`
- `apps/meteor/app/metrics/server/lib/metrics.ts`
- `apps/meteor/app/cloud/server/methods.ts`
- `apps/meteor/app/api/server/v1/users.ts`
- `apps/meteor/app/api/server/v1/channels.ts`
- `apps/meteor/app/api/server/v1/groups.ts`
- `apps/meteor/app/api/server/v1/rooms.ts`
- `apps/meteor/app/api/server/v1/teams.ts`
- `apps/meteor/app/api/server/v1/chat.ts`
- `apps/meteor/app/livechat/imports/server/rest/dashboards.ts`
- `apps/meteor/app/api/server/v1/im.ts`
- `apps/meteor/app/api/server/v1/commands.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
