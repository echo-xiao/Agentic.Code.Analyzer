# How are new endpoints registered in the REST API in Rocket.Chat?

## Gemini Answer

New endpoints in Rocket.Chat's REST API are registered through classes that extend the `APIClass`. The process involves defining routes using specific HTTP method functions (`get`, `post`, `put`, `delete`) provided by the `APIClass`.

Here's the call chain:

1.  **`APIClass`** (`apps/meteor/app/api/server/ApiClass.ts`): This is the base class for defining REST API endpoints.
    *   Developers define API routes by calling methods such as `get()`, `post()`, `put()`, or `delete()` on an instance of a class that extends `APIClass`.
    *   These methods take the `subpath` for the endpoint, `options` (which can include authentication requirements, rate limiting configurations, and parameter validation), and the `action` function (which is the actual handler for the API request).
    *   Internally, these methods delegate to a `method()` function which then calls the `addRoute()` method.

2.  **`addRoute()`** (within `APIClass`, `apps/meteor/app/api/server/ApiClass.ts`):
    *   This method (though marked as deprecated in favor of the direct HTTP verb methods) is responsible for processing the route definition.
    *   It applies various middleware functions, including `authenticationMiddlewareForHono`, `permissionsMiddleware`, and `license` checks, based on the options provided.
    *   Crucially, it interacts with the internal `router` instance.

3.  **`RocketChatAPIRouter`** (initialized within `APIClass` constructor, `apps/meteor/app/api/server/ApiClass.ts`):
    *   An instance of `RocketChatAPIRouter` is created within the `APIClass` constructor.
    *   The `addRoute` method calls the corresponding HTTP verb method (e.g., `this.router.get()`, `this.router.post()`) on this `router` instance, passing the full route path, options, middleware functions, and the `action` (route handler) as arguments.

In summary, new REST API endpoints are registered by:

*   Creating a class that extends `APIClass` (`apps/meteor/app/api/server/ApiClass.ts`).
*   Using the `get()`, `post()`, `put()`, or `delete()` methods within that class, providing the endpoint's path, configuration options, and the function that handles the request.
*   The `APIClass` then uses its internal `RocketChatAPIRouter` instance to formally register these routes with the server's routing system, applying necessary middleware for authentication, permissions, and rate limiting.

## Tool Calls (4 calls, 30,466 tokens)

**Step 1:** `search({"query":"ApiClass"})` → 27 tokens
**Step 2:** `graph({"direction":"down","depth":2,"query":"ApiClass"})` → 12 tokens
**Step 3:** `implement({"symbolName":"ApiClass","filename":"apps/meteor/app/api/server/ApiClass.ts"})` → 15 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"APIClass"})` → 7781 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 4/5 |
| Tool calls | 4 |
| Total tokens | 30,466 |
