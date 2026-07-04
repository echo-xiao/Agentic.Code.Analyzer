# How are new endpoints registered in the REST API in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

New endpoints in Rocket.Chat's REST API are registered using the `API.v1.addRoute` method or by chaining HTTP method calls (e.g., `.get`, `.post`, `.put`, `.delete`) to `API.v1`.

Here's a breakdown of the process:

**1. `APIClass` and `API.v1` Initialization:**
   - The core functionality for API route management resides in the `APIClass` defined in `apps/meteor/app/api/server/ApiClass.ts`.
   - An instance of `APIClass` is created and exposed as `API.v1` in `apps/meteor/app/api/server/api.ts`. This `API.v1` object is then used throughout the codebase to register specific API endpoints.

**2. Endpoint Registration Methods:**
   - **`API.v1.addRoute`**: This method is used to register a route with multiple HTTP methods or to define a route with a more complex structure. It takes an array of subpaths, an options object, and an optional `endpoints` object.
   - **Chained HTTP Methods (`.get`, `.post`, `.put`, `.delete`)**: For simpler, single-method endpoints, developers can directly chain the HTTP method to `API.v1`. These methods take a subpath, an options object, and an `action` function.

**3. Route Definition Components:**
   Each route definition typically includes:
   - **HTTP Method and Path**: Specifies the HTTP verb (GET, POST, PUT, DELETE) and the URL path for the endpoint.
   - **Options Object**: Configures the endpoint's behavior, including:
     - `authRequired`: A boolean indicating if authentication is mandatory.
     - `permissionsRequired`: An array of permissions a user needs to access the endpoint.
     - `twoFactorRequired`: A boolean for two-factor authentication.
     - `validateParams`: A function for validating incoming parameters.
     - `query` or `body`: JSON schemas (using `ajv`) for validating query parameters or the request body.
     - `response`: Defines expected response schemas for different HTTP status codes.
   - **Action Function**: An asynchronous function that contains the business logic for the endpoint. It receives a `this` context with `queryParams`, `bodyParams`, `userId`, and `request`.

**Example:**
Many API endpoints, such as those for channels, users, and groups, utilize `API.v1.addRoute` or the chained methods. For instance, you can find numerous examples in files like:
- `apps/meteor/app/api/server/v1/channels.ts`
- `apps/meteor/app/api/server/v1/users.ts`
- `apps/meteor/app/api/server/v1/groups.ts`

**Type Definitions:**
After defining endpoints, their types are extended into the global `@rocket.chat/rest-typings` module's `Endpoints` interface. This ensures type safety and facilitates automatic OpenAPI documentation generation.

**Flow:**
Entry (`apps/meteor/app/api/server/api.ts`) → `APIClass` instantiation (`apps/meteor/app/api/server/ApiClass.ts`) → Endpoint registration using `API.v1.addRoute` or chained methods (e.g., `apps/meteor/app/api/server/v1/channels.ts`).

## Tool Calls (8 calls, 36,531 tokens)

**Step 1:** `wiki({"question":"How are new endpoints registered in the REST API in Rocket.Chat?"})` → 826 tokens
**Step 2:** `plan({"intent":"architecture","question":"How are new endpoints registered in the REST API in Rocket.Chat?"})` → 85 tokens
**Step 3:** `search({"query":"API.v1.addRoute"})` → 267 tokens
**Step 4:** `search({"query":"APIClass"})` → 65 tokens
**Step 5:** `details({"symbolName":"APIClass","filename":"ApiClass.ts"})` → 1575 tokens
**Step 6:** `search({"query":"API.v1"})` → 296 tokens
**Step 7:** `search({"query":"new APIClass"})` → 74 tokens
**Step 8:** `details({"symbolName":"new APIClass","filename":"api.ts"})` → 16 tokens

## Files Seen In Tool Results (14)

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
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/api/server/v1/commands.ts`
- `apps/meteor/app/api/server/api.ts`
