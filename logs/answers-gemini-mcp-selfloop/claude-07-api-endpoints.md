# How are new endpoints registered in the REST API in Rocket.Chat?

## Gemini Answer

New endpoints are registered in Rocket.Chat's REST API through the following call chain:

**Entry → Step 1 → Step 2 → Step 3 → Final**

1.  **`createApi`** (`apps/meteor/app/api/server/api.ts`): This function is responsible for initializing the core API object.
2.  **`APIClass`** (`apps/meteor/app/api/server/ApiClass.ts`): The `createApi` function instantiates the `APIClass`. This class provides methods for defining API routes.
3.  **`APIClass.addRoute`** (or `APIClass.get`/`post`/`put`/`delete`) (`apps/meteor/app/api/server/ApiClass.ts`): Developers use these methods (though `addRoute` is deprecated in favor of the typed `get`, `post`, etc.) to define a new API endpoint.
    *   The `addRoute` method takes a `subpath`, `options`, and `endpoints` (which define the HTTP methods and their corresponding action handlers).
    *   Inside `addRoute`, a series of middleware functions are applied, including:
        *   `authenticationMiddlewareForHono`
        *   `permissionsMiddleware`
        *   `license`
    *   Finally, the route, along with its options, middleware, and the actual action handler, is registered with an internal `router` object (e.g., `this.router[method.toLowerCase()](route, options, ...middleware, action)`). This `router` is responsible for integrating the route with the underlying HTTP server.

## Tool Calls (6 calls, 25,165 tokens)

**Step 1:** `search({"query":"API.v1.addRoute"})` → 419 tokens
**Step 2:** `graph({"file":"apps/meteor/app/api/server/v1/channels.ts","query":"API.v1.addRoute","direction":"down"})` → 14 tokens
**Step 3:** `search({"query":"createApi"})` → 215 tokens
**Step 4:** `graph({"direction":"down","query":"createApi","file":"apps/meteor/app/api/server/api.ts"})` → 195 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"APIClass"})` → 1579 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"APIClass.addRoute"})` → 1712 tokens
