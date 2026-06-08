# How are new endpoints registered in the REST API in Rocket.Chat?

## Gemini Answer

New endpoints in Rocket.Chat's REST API are registered through a structured process, primarily using the `API.v1.addRoute` method. This method, part of the `APIClass`, handles middleware for authentication, permissions, rate limiting, and then delegates the actual route registration to an underlying router.

Here's the call chain for endpoint registration:

**Entry → Step 1 → Step 2 → Final**

1.  **Entry Point: API Endpoint Definition** (e.g., `apps/meteor/app/api/server/v1/channels.ts`)
    New endpoints are defined by calling `API.v1.addRoute()`. For example:
    `API.v1.addRoute('channels.list', { authRequired: true }, { get() { ... } });`

2.  **`createApi` function** (`apps/meteor/app/api/server/api.ts`)
    The `API.v1` object itself is an instance created by the `createApi` function, which initializes an `APIClass` instance.

3.  **`APIClass.addRoute` Method** (`apps/meteor/app/api/server/ApiClass.ts`)
    The `addRoute` method of the `APIClass` is responsible for processing the route definition. It performs the following key actions:
    *   Checks and applies permissions (`checkPermissions`).
    *   Adds rate-limiting rules if configured (`addRateLimiterRuleForRoutes`).
    *   Wraps the provided endpoint action with an internal handler that includes:
        *   Request context setup (`this.queryOperations`, `this.queryFields`, `this.logger`).
        *   Authentication token processing.
        *   Rate limit enforcement (`api.enforceRateLimit`).
        *   Parameter validation (`_options.validateParams`).
        *   Two-factor authentication processing (`api.processTwoFactor`).
        *   Error handling for various API errors (e.g., unauthorized, forbidden, too many requests).
    *   Registers the route with the underlying router (e.g., Hono) using `this.router[method.toLowerCase()]`, passing the path, options, and middleware functions for authentication (`authenticationMiddlewareForHono`), permissions (`permissionsMiddleware`), and licensing (`license`).

This chain ensures that all new REST API endpoints adhere to Rocket.Chat's security, performance, and operational standards.

## Tool Calls (5 calls, 17,707 tokens)

**Step 1:** `search({"layer":"server","query":"API.v1.addRoute"})` → 419 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"API.v1.addRoute"})` → 14 tokens
**Step 3:** `search({"query":"createApi","layer":"server"})` → 215 tokens
**Step 4:** `graph({"layer":"server","query":"createApi","direction":"down"})` → 195 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"APIClass.addRoute"})` → 1712 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 4/5 |
| Tool calls | 5 |
| Total tokens | 17,707 |
| Pass | NO |
