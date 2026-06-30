# How are new endpoints registered in the REST API in Rocket.Chat?

## Gemini Answer

New endpoints in Rocket.Chat's REST API are registered through an instance of `APIClass`, which is typically created by calling the `createApi` function.

The registration process follows this call chain:

`Entry → createApi → APIClass.addRoute`

1.  **`createApi`** (defined in `apps/meteor/app/api/server/api.ts`): This function is responsible for initializing the REST API version (e.g., `API.v1`). It creates an instance of `APIClass`.
2.  **`APIClass.addRoute`** (defined in `apps/meteor/app/api/server/ApiClass.ts`): This method of the `APIClass` is used to register individual API routes. While it's noted as a legacy method, it internally calls the more specific HTTP method functions (`get`, `post`, `put`, `delete`) on an internal `router` object.

When `APIClass.addRoute` is invoked, it processes the provided subpaths, options, and endpoint handlers. It also integrates several key functionalities:

*   **Permissions and Authentication:** It checks permissions and handles authentication through `authenticationMiddlewareForHono` and `permissionsMiddleware`.
*   **Rate Limiting:** It applies rate limiting rules to prevent abuse.
*   **Deprecation Handling:** It checks for deprecated routes and can throw errors or parse deprecation headers.
*   **Error Handling:** It wraps the route's action in a try-catch block to handle errors gracefully and return appropriate API responses (e.g., `tooManyRequests`, `unauthorized`, `forbidden`, `failure`).
*   **Request Context:** It sets up the request context, including user information, IP address, and connection details, making them available to the route handler.

In summary, `createApi` sets up the API version, and then the `APIClass` instance's `addRoute` (or direct `get`/`post`/`put`/`delete` methods) is used to define the endpoint paths, HTTP methods, and their corresponding logic, along with various middleware for robust API management.

## Tool Calls (7 calls, 24,768 tokens)

**Step 1:** `search({"query":"REST API registration","layer":"server"})` → 16 tokens
**Step 2:** `search({"layer":"server","query":"API.v1.addRoute"})` → 419 tokens
**Step 3:** `graph({"layer":"server","query":"API.v1.addRoute","direction":"down"})` → 14 tokens
**Step 4:** `search({"layer":"server","query":"createApi"})` → 448 tokens
**Step 5:** `graph({"file":"apps/meteor/app/api/server/api.ts","direction":"down","layer":"server","query":"createApi"})` → 195 tokens
**Step 6:** `search({"layer":"server","query":"APIClass"})` → 414 tokens
**Step 7:** `implement({"symbolName":"APIClass.addRoute","filename":"apps/meteor/app/api/server/ApiClass.ts"})` → 1712 tokens
