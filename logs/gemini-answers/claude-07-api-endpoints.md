# How are new endpoints registered in the REST API in Rocket.Chat?

## Gemini Answer

New endpoints are registered in the Rocket.Chat REST API through the `APIClass`.

Here's the call chain:

1.  **`startRestAPI`** (at `apps/meteor/app/api/server/api.ts`): This function initializes the REST API by setting up middleware and routing.
2.  Within `startRestAPI`, the `API.v1.router` and `API.default.router` are used.
3.  **`API`** (at `apps/meteor/app/api/server/api.ts`): This object defines the main API structure, including `API.v1` and `API.default`.
4.  **`createApi`** (at `apps/meteor/app/api/server/api.ts`): This function is responsible for creating instances of `APIClass` for different API versions (e.g., `v1`).
5.  **`APIClass`**: This class, when instantiated by `createApi`, is where individual routes are added using methods like `addRoute()` or the typed `.get()`, `.post()`, `.put()`, and `.delete()` methods.

The registration process begins with `startRestAPI`, which uses the `API` object. The `API` object, in turn, utilizes the `createApi` function to construct instances of `APIClass`. It is within these `APIClass` instances that the actual registration of new REST API endpoints occurs.

## Tool Calls (8 calls, 46,447 tokens)

**Step 1:** `search({"query":"REST API"})` → 602 tokens
**Step 2:** `graph({"query":"startRestAPI","direction":"down","layer":"server"})` → 1093 tokens
**Step 3:** `implement({"symbolName":"startRestAPI","filename":"apps/meteor/app/api/server/api.ts"})` → 153 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"ApiClass"})` → 15 tokens
**Step 5:** `search({"query":"API","layer":"server"})` → 573 tokens
**Step 6:** `implement({"symbolName":"API","filename":"apps/meteor/app/api/server/api.ts"})` → 259 tokens
**Step 7:** `search({"layer":"server","query":"createApi"})` → 215 tokens
**Step 8:** `implement({"symbolName":"createApi","filename":"apps/meteor/app/api/server/api.ts"})` → 104 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 4/5 |
| Tool calls | 8 |
| Total tokens | 46,447 |
| Pass | NO |
