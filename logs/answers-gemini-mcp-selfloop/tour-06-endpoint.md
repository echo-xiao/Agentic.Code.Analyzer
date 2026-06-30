# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you would follow these steps:

1.  **Initialize the API Instance**: An API instance, such as `API.v1`, is typically created using a `createApi()` function.
2.  **Define the Route**: Register your new endpoint using the `.get()`, `.post()`, `.put()`, or `.delete()` methods available on the API instance. The `addRoute()` method is also available but is considered a legacy approach.
3.  **Implement the Route Handler**: Provide a handler function for your route. This function will receive an `APIActionContext` object, which provides access to `this.bodyParams` (request body parameters), `this.queryParams` (URL query parameters), and `this.user` (authenticated user information). The handler should return a response using `API.v1.success()` or `API.v1.failure()`.

The core logic for defining and handling these routes resides within the `ApiClass` in `apps/meteor/app/api/server/ApiClass.ts`. This file manages the routing and middleware chain, which includes: `WebApp.rawConnectHandlers` → `remoteAddressMiddleware` → `CORS` → `logger` → `metrics` → `tracerSpan` → router dispatch → `authenticationMiddlewareForHono` → `permissionsMiddleware` → license check → route handler.

**Call Chain:**
Your new API endpoint definition file → `API.v1.get/post/put/delete` (in `apps/meteor/app/api/server/ApiClass.ts`) → Your custom route handler function.

## Tool Calls (8 calls, 28,048 tokens)

**Step 1:** `search({"query":"REST API endpoint","layer":"server"})` → 133 tokens
**Step 2:** `graph({"direction":"down","file":"apps/meteor/app/api/server/ApiClass.ts","query":"ApiClass"})` → 12 tokens
**Step 3:** `graph({"file":"apps/meteor/app/api/server/ApiClass.ts","query":"ApiClass","direction":"down"})` → 12 tokens
**Step 4:** `graph({"file":"apps/meteor/app/livechat/imports/server/rest/inquiries.ts","query":"LivechatInquiriesEndpoi)` → 232 tokens
**Step 5:** `implement({"symbolName":"ApiClass","filename":"apps/meteor/app/api/server/ApiClass.ts"})` → 15 tokens
**Step 6:** `search({"layer":"server","query":"addRoute"})` → 215 tokens
**Step 7:** `graph({"query":"addRoute","direction":"down","file":"apps/meteor/app/api/server/ApiClass.ts"})` → 1146 tokens
**Step 8:** `implement({"symbolName":"ApiClass.addRoute","filename":"apps/meteor/app/api/server/ApiClass.ts"})` → 47 tokens
