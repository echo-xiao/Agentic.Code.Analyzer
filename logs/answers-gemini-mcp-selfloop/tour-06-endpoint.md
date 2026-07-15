# How do you create a new REST API endpoint in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you primarily interact with the `APIClass` located at `apps/meteor/app/api/server/ApiClass.ts`.

Here's a breakdown of the process:

1.  **`APIClass`**: This class serves as the core framework for registering and handling HTTP endpoints. It provides methods for defining different HTTP verbs (GET, POST, PUT, DELETE) and managing authentication, rate limiting, and response formatting.

2.  **`API` object**: In `apps/meteor/app/api/server/api.ts`, an `API` object is exported. This object contains instances of `APIClass`, specifically `API.v1` for versioned API endpoints and `API.default` for unversioned endpoints. These instances are created using the `createApi` function.

3.  **Defining Endpoints**: To create a new endpoint, you would typically use the `get`, `post`, `put`, or `delete` methods provided by an `APIClass` instance (e.g., `API.v1`). These methods take the subpath of the endpoint, options (like authentication requirements), and an action function that defines the logic for the endpoint.

**Flow for creating a new REST API endpoint:**

1.  **Instantiate/Access `APIClass`**: You would typically use the `API.v1` or `API.default` instances from `apps/meteor/app/api/server/api.ts`.
2.  **Define the Route**: Call the appropriate HTTP method (`get`, `post`, `put`, `delete`) on the `APIClass` instance.
    *   **`subpath`**: This defines the specific path for your endpoint (e.g., `'/my-new-endpoint'`).
    *   **`options`**: This object can include configurations like `authRequired` to specify if authentication is needed for the endpoint.
    *   **`action`**: This is the function that will be executed when the endpoint is called. It receives the request context and should return a response using methods like `this.success()`, `this.failure()`, `this.notFound()`, etc., provided by `APIClass`.

**Example (conceptual):**


```typescript
// In a new server-side file, e.g., apps/meteor/app/api/server/v1/myNewEndpoint.ts
import { API } from '../../api/server/api';

API.v1.addRoute('my-new-endpoint', { authRequired: true }, {
  get() {
    // Logic for GET requests to /api/v1/my-new-endpoint
    return API.v1.success({ message: 'Hello from new endpoint!' });
  },
  post() {
    // Logic for POST requests to /api/v1/my-new-endpoint
    const { data } = this.bodyParams;
    return API.v1.success({ received: data });
  },
});
```


This conceptual example demonstrates how you would use the `API.v1` instance and its `addRoute` method (which internally uses `get`, `post`, etc.) to define a new endpoint with both GET and POST functionality. The `APIClass` handles the underlying routing and request processing.

## Tool Calls (8 calls, 65,812 tokens)

**Step 1:** `plan({"question":"How do you create a new REST API endpoint in Rocket.Chat?","intent":"architecture"})` → 4076 tokens
**Step 2:** `search({"query":"ApiClass","layer":"server"})` → 61 tokens
**Step 3:** `graph({"query":"ApiClass","file":"ApiClass.ts","move":"expand","depth":2})` → 98 tokens
**Step 4:** `details({"filename":"ApiClass.ts","symbolName":"APIClass"})` → 1575 tokens
**Step 5:** `details({"filename":"api.ts","symbolName":"ExtractApiClassEndpoints"})` → 91 tokens
**Step 6:** `search({"layer":"server","query":"new APIClass"})` → 74 tokens
**Step 7:** `details({"symbolName":"api.ts","filename":"api.ts"})` → 40 tokens
**Step 8:** `details({"symbolName":"API","filename":"api.ts"})` → 257 tokens

## Files Seen In Tool Results (36)

- `apps/meteor/server/services/nps/service.ts`
- `packages/models/src/models/Nps.ts`
- `apps/meteor/server/services/nps/notification.ts`
- `apps/meteor/server/services/nps/getAndCreateNpsSurvey.ts`
- `packages/models/src/models/NpsVote.ts`
- `apps/meteor/server/cron/nps.ts`
- `apps/meteor/app/version-check/server/index.ts`
- `packages/core-services/src/index.ts`
- `apps/meteor/client/views/room/index.ts`
- `packages/apps-engine/src/definition/api/ApiEndpoint.ts`
- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `packages/apps-engine/src/server/managers/AppApi.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/apps/server/bridges/api.ts`
- `apps/meteor/app/version-check/server/functions/getNewUpdates.ts`
- `packages/apps-engine/src/server/accessors/ModifyExtender.ts`
- `apps/meteor/client/lib/chats/data.ts`
- `apps/meteor/app/apps/server/bridges/rooms.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/server/lib/cas/createNewUser.ts`
- `apps/meteor/app/apps/server/bridges/oauthApps.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/utils/client/lib/SDKClient.ts`
- `packages/apps-engine/src/server/accessors/ApiExtend.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `apps/meteor/ee/server/apps/communication/uikit.ts`
- `packages/apps-engine/src/definition/accessors/IApiExtend.ts`
- `packages/apps-engine/deno-runtime/handlers/api-handler.ts`
- `apps/meteor/ee/server/local-services/instance/service.ts`
- `packages/apps-engine/src/definition/accessors/IModify.ts`
- `apps/meteor/app/apps/server/bridges/uploads.ts`
- `packages/api-client/src/index.ts`
- `packages/rest-typings/src/v1/auth.ts`
- `packages/apps-engine/src/server/accessors/ContactCreator.ts`
- `apps/meteor/app/api/server/default/openApi.ts`
- `apps/meteor/app/api/server/api.ts`
