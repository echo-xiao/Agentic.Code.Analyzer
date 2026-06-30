# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you primarily interact with the `API` object, specifically `API.v1`, which is an instance of `APIClass`. The core process involves defining routes on this `APIClass` instance.

Here's the breakdown of the call chain and key files:

**Call Chain:**

`startRestAPI` (apps/meteor/app/api/server/api.ts) → `API.api.use()` (apps/meteor/app/api/server/api.ts) → `API.v1.router` (apps/meteor/app/api/server/api.ts)

**Key Files and Their Roles:**

1.  **`apps/meteor/app/api/server/api.ts`**: This file is the entry point for the REST API.
    *   `startRestAPI`: This function initializes the REST API middleware stack, including `API.v1.router`.
    *   `API`: This exported constant object contains instances of `APIClass` for different API versions (e.g., `API.v1` for version 1 of the API).
    *   `createApi`: This function is used internally to create instances of `APIClass`, configuring them with properties like the API version and default authentication.

**How to Create a New Endpoint:**

New REST API endpoints are registered on instances of `APIClass`. The `APIClass` provides methods like `.get()`, `.post()`, `.put()`, and `.delete()` to define routes. You would add your new endpoint definition within the context of `API.v1` (or another API version you intend to use).

For example, a typical endpoint definition would look something like this (though the exact syntax for `APIClass` methods would need to be referenced in its implementation):


```typescript
// Inside a file where you want to define your new endpoint,
// likely alongside other API v1 endpoints
API.v1.addRoute('/my-new-endpoint', {
    get: async function() {
        // Access request parameters: this.bodyParams, this.queryParams
        // Access user information: this.user
        // Perform server-side logic
        return API.v1.success({ message: 'Hello from new endpoint!' });
    },
    post: async function() {
        // Handle POST requests
        return API.v1.success({ received: this.bodyParams });
    }
});
```


**Middleware Chain for REST API Requests:**

When a request hits a Rocket.Chat REST API endpoint, it goes through a series of middleware functions defined in `startRestAPI` in `apps/meteor/app/api/server/api.ts`:

*   `remoteAddressMiddleware`
*   `cors` (Cross-Origin Resource Sharing)
*   `loggerMiddleware`
*   `metricsMiddleware`
*   `tracerSpanMiddleware`
*   `API.v1.router` (dispatches to the specific route handler)
*   `API.default.router` (for default routes)

Within the `APIClass` (which `API.v1` is an instance of), there are additional middlewares for:

*   `authenticationMiddlewareForHono`: Validates `x-user-id` and `x-auth-token` headers or OAuth tokens.
*   `permissionsMiddleware`: Checks user permissions.
*   License checks (for Enterprise Edition features).

Route handlers receive an `APIActionContext` object, providing access to `this.bodyParams`, `this.queryParams`, and `this.user` for processing the request. They should return responses using `API.v1.success()` or `API.v1.failure()`.

## Tool Calls (8 calls, 49,065 tokens)

**Step 1:** `search({"query":"rest api"})` → 289 tokens
**Step 2:** `graph({"direction":"down","query":"startRestAPI"})` → 1784 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/api/server/api.ts","symbolName":"startRestAPI"})` → 153 tokens
**Step 4:** `search({"query":"API.v1.router","layer":"server"})` → 65 tokens
**Step 5:** `search({"layer":"server","query":"export const API"})` → 67 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/api/server/api.ts","symbolName":"API"})` → 259 tokens
**Step 7:** `search({"query":"createApi","layer":"server"})` → 215 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/api/server/api.ts","symbolName":"createApi"})` → 104 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 3/4 |
| Tool calls | 8 |
| Total tokens | 49,065 |
| Pass | NO |
