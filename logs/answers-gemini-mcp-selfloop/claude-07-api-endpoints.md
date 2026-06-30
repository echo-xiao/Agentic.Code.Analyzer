# How are new endpoints registered in the REST API in Rocket.Chat?

## Gemini Answer

New endpoints are primarily registered in the Rocket.Chat REST API using the `API.v1` object.

The process for registering new endpoints involves:

1.  **API Initialization**: The `API.v1` object is instantiated via `createApi({ version:'v1', useDefaultAuth:true })`.
2.  **Route Registration**: Routes are registered using either:
    *   The `APIClass.addRoute()` method (for legacy routes).
    *   Typed methods such as `.get()`, `.post()`, `.put()`, or `.delete()` directly on the `API.v1` object.

**Call Chain:**
`API.v1` instantiation → `API.v1.addRoute()` or `API.v1.get/post/put/delete()`

**Key Files and Examples:**

*   **`apps/meteor/app/api/server/ApiClass.ts`**: This file likely defines the `ApiClass` and its methods, including `addRoute` and the typed HTTP methods.
*   **`apps/meteor/app/api/server/v1/users.ts`**: Contains examples of `API.v1.addRoute()` for user-related endpoints.
*   **`apps/meteor/app/api/server/v1/channels.ts`**: Contains examples of `API.v1.addRoute()` for channel-related endpoints.
*   **`apps/meteor/app/api/server/v1/groups.ts`**: Contains examples of `API.v1.addRoute()` for group-related endpoints.
*   **`apps/meteor/app/api/server/v1/chat.ts`**: Contains examples of `API.v1.addRoute()` for chat-related endpoints.

**Middleware Chain (Context):**
After registration, the requests to these endpoints pass through a middleware chain: `WebApp.rawConnectHandlers` → `remoteAddressMiddleware` → `CORS` → `logger` → `metrics` → `tracerSpan` → `router dispatch` → `authenticationMiddlewareForHono` → `permissionsMiddleware` → `license check` → `route handler`. Route handlers receive `APIActionContext` (with `this.bodyParams`, `this.queryParams`, `this.user`) and return `API.v1.success()` or `API.v1.failure()`.

## Tool Calls (8 calls, 25,255 tokens)

**Step 1:** `search({"query":"rest api register endpoint","layer":"server"})` → 18 tokens
**Step 2:** `search({"layer":"server","query":"Restivus"})` → 13 tokens
**Step 3:** `search({"layer":"server","query":"API.v1"})` → 285 tokens
**Step 4:** `graph({"layer":"server","direction":"down","query":"API.v1.addRoute"})` → 14 tokens
**Step 5:** `search({"query":"API.v1","filename":"app/api/server/v1","layer":"server"})` → 285 tokens
**Step 6:** `search({"layer":"server","query":"API.v1"})` → 285 tokens
**Step 7:** `search({"filename":"app/api/server","query":"addRoute","layer":"server"})` → 215 tokens
**Step 8:** `implement({"symbolName":"ApiClass.addRoute","filename":"apps/meteor/app/api/server/ApiClass.ts"})` → 47 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 3/5 |
| Tool calls | 8 |
| Total tokens | 25,255 |
| Pass | NO |
