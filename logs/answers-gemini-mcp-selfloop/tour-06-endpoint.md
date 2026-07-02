# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you follow these steps:

1.  **Instantiate the API Class**: The `APIClass` is the core component for defining API routes. An instance of this class, typically `API.v1`, is created using the `createApi` function. This function is defined in `apps/meteor/app/api/server/api.ts` and allows for configuration such as the API version and default authentication.

2.  **Define the Route**: You define the API endpoint using the `addRoute` method of the `API.v1` instance. This method is available on the `APIClass` (defined in `apps/meteor/app/api/server/ApiClass.ts`).

    *   **Path**: The `addRoute` method takes an array of subpaths as its first argument, defining the URL structure of your endpoint.
    *   **Options**: The second argument is an `options` object, which can include settings like authentication requirements and rate limiting.
    *   **Endpoints**: The third argument is an `endpoints` object, where you define the HTTP methods (GET, POST, PUT, DELETE) and their corresponding handler functions.

**Example Flow (from `apps/meteor/app/api/server/v1/channels.ts`):**


```typescript
API.v1.addRoute(
  'channels.list',
  { authRequired: true },
  {
    get() {
      // Your API logic here
      return API.v1.success({
        channels: [], // Example return
      });
    },
  },
);
```


This example demonstrates how to create a GET endpoint at `/api/v1/channels.list` that requires authentication. The handler function within the `get()` method contains the actual logic for your API endpoint and should return a success or failure response using `API.v1.success()` or `API.v1.failure()`.

**Key Files:**

*   **`apps/meteor/app/api/server/ApiClass.ts`**: Defines the `APIClass`, which provides the methods for creating and managing API routes (e.g., `addRoute`, `get`, `post`, `put`, `delete`).
*   **`apps/meteor/app/api/server/api.ts`**: Contains the `createApi` function, used to instantiate the `APIClass` and set up the API version (e.g., `API.v1`).
*   **`apps/meteor/app/api/server/v1/channels.ts`**: A concrete example of how `API.v1.addRoute` is used to define a REST API endpoint for channel-related operations. Many other files in `apps/meteor/app/api/server/v1/` also demonstrate this pattern.

## Tool Calls (8 calls, 30,622 tokens)

**Step 1:** `plan({"question":"How do you create a new REST API endpoint in Rocket.Chat?","intent":"pattern"})` → 80 tokens
**Step 2:** `search({"query":"API endpoint"})` → 245 tokens
**Step 3:** `graph({"query":"ApiClass","file":"apps/meteor/app/api/server/ApiClass.ts","move":"expand","depth":1})` → 401 tokens
**Step 4:** `details({"symbolName":"ApiClass","filename":"apps/meteor/app/api/server/ApiClass.ts"})` → 15 tokens
**Step 5:** `details({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"APIClass"})` → 1575 tokens
**Step 6:** `search({"query":"createApi"})` → 225 tokens
**Step 7:** `details({"symbolName":"createApi","filename":"apps/meteor/app/api/server/api.ts"})` → 100 tokens
**Step 8:** `search({"query":"API.v1.addRoute"})` → 427 tokens

## Files Seen In Tool Results (22)

- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/tests/end-to-end/apps/app-api-endpoint-params.ts`
- `packages/apps-engine/src/definition/oauth2/IOAuth2.ts`
- `packages/rest-typings/src/v1/moderation/moderation.ts`
- `apps/meteor/ee/server/apps/marketplace/MarketplaceAPIClient.ts`
- `apps/meteor/app/api/server/api.ts`
- `apps/meteor/client/views/marketplace/helpers.ts`
- `apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/AppLogsFilterContextualBar.stories.tsx`
- `ee/packages/license/src/AirGappedRestriction.ts`
- `packages/rest-typings/src/v1/import/DownloadPublicImportFileParamsPOST.ts`
- `apps/meteor/app/api/server/middlewares/metrics.ts`
- `packages/mock-providers/src/MockedAppRootBuilder.tsx`
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
