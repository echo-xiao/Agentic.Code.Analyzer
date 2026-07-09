# How are new endpoints registered in the REST API in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

New endpoints in the Rocket.Chat REST API are registered using the `API.v1.addRoute` method or by chaining HTTP method calls on `API.v1`. The `API.v1` object is an instance of `APIClass`, defined in `apps/meteor/app/api/server/ApiClass.ts`.

Here's a breakdown of the process:

**1. `APIClass` Definition:**
   - The core functionality for API route management resides in the `APIClass` class, located at `apps/meteor/app/api/server/ApiClass.ts`.
   - This class provides methods like `addRoute`, `get`, `post`, `put`, and `delete` for defining API endpoints.

**2. Endpoint Registration Methods:**

   *   **`API.v1.addRoute`**: This is a primary method for registering endpoints. It takes:
        *   `subpaths`: An array of strings representing the URL paths for the endpoint.
        *   `options`: An object containing configurations such as `authRequired` (boolean for authentication), `permissionsRequired` (array of permissions), and `validateParams` (a function for parameter validation).
        *   `endpoints`: An object containing asynchronous functions for different HTTP methods (e.g., `get`, `post`, `delete`). These functions receive `this.urlParams`, `this.queryParams`, and `this.bodyParams` to access request data.
        *   Examples of its usage can be found in numerous files, including:
            *   `apps/meteor/app/api/server/v1/channels.ts`
            *   `apps/meteor/app/api/server/v1/users.ts`
            *   `apps/meteor/app/api/server/v1/groups.ts`

   *   **Chaining HTTP Method Calls**: Endpoints can also be registered by chaining HTTP method calls directly on `API.v1`, such as `API.v1.post` or `API.v1.get`. This approach is often used when multiple HTTP methods share the same base path but have different request/response schemas or permissions.
        *   The `APIClass` provides methods like `get`, `post`, `put`, and `delete` that allow for this chained registration. These methods take the `subpath`, `options`, and an `action` function (the handler for the request).
        *   Examples of this pattern can be seen in files like `apps/meteor/app/api/server/v1/commands.ts`, where `API.v1.get` is used.

**3. Type Definition and OpenAPI Support:**
   - After registration, the types for these endpoints are typically defined using `ExtractRoutesFromAPI<typeof endpointsObject>` and then extended into the global `Endpoints` interface within the `@rocket.chat/rest-typings` module. This ensures type safety and provides a centralized definition for all REST API endpoints.

In summary, the `APIClass` in `apps/meteor/app/api/server/ApiClass.ts` is the central component for registering new REST API endpoints in Rocket.Chat, primarily through the `addRoute` method or by chaining HTTP method calls.

## Tool Calls (8 calls, 41,544 tokens)

**Step 1:** `wiki({"question":"How are new endpoints registered in the REST API in Rocket.Chat?"})` → 815 tokens
**Step 2:** `plan({"intent":"architecture","question":"How are new endpoints registered in the REST API in Rocket.Chat?"})` → 890 tokens
**Step 3:** `search({"query":"API.v1.addRoute","layer":"server"})` → 267 tokens
**Step 4:** `search({"query":"API.v1","layer":"server"})` → 296 tokens
**Step 5:** `search({"layer":"server","query":"class API"})` → 99 tokens
**Step 6:** `details({"symbolName":"APIClass","filename":"ApiClass.ts"})` → 1575 tokens
**Step 7:** `search({"layer":"server","query":"API.v1 = new APIClass"})` → 27 tokens
**Step 8:** `search({"query":"API.v1 =","layer":"server"})` → 24 tokens

## Files Seen In Tool Results (13)

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
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/api/server/v1/commands.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
