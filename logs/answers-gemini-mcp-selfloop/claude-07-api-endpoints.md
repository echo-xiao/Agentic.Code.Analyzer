# How are new endpoints registered in the REST API in Rocket.Chat?

## Gemini Answer

New endpoints are registered in the Rocket.Chat REST API primarily through the `ApiClass` in `apps/meteor/app/api/server/ApiClass.ts`.

The process involves:

1.  **`createApi`**: An API instance (e.g., `API.v1`) is created using `createApi({ version:'v1', useDefaultAuth:true })`.
2.  **`addRoute` or typed methods**: Routes are then registered using either the legacy `APIClass.addRoute()` method or the more modern typed methods like `.get()`, `.post()`, `.put()`, and `.delete()`.

The full middleware chain for handling these API requests includes:

*   `WebApp.rawConnectHandlers`
*   `remoteAddressMiddleware`
*   `CORS`
*   `logger`
*   `metrics`
*   `tracerSpan`
*   `router dispatch`
*   `authenticationMiddlewareForHono` (validates `x-user-id`, `x-auth-token` headers, or OAuth tokens)
*   `permissionsMiddleware`
*   `license check`
*   `route handler`

Route handlers receive an `APIActionContext` object containing `this.bodyParams`, `this.queryParams`, and `this.user`, and are expected to return `API.v1.success()` or `API.v1.failure()`.

## Tool Calls (8 calls, 17,341 tokens)

**Step 1:** `plan({"question":"How are new endpoints registered in the REST API in Rocket.Chat?","intent":"pattern"})` → 80 tokens
**Step 2:** `search({"query":"addRoute","layer":"server"})` → 225 tokens
**Step 3:** `graph({"file":"apps/meteor/app/api/server/ApiClass.ts","query":"addRoute","move":"expand"})` → 379 tokens
**Step 4:** `details({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"addRoute"})` → 51 tokens
**Step 5:** `details({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"ApiClass"})` → 15 tokens
**Step 6:** `details({"symbolName":"ApiClass","filename":"apps/meteor/app/api/server/ApiClass.ts"})` → 15 tokens
**Step 7:** `details({"symbolName":"addManagementRoutes","filename":"apps/meteor/ee/server/apps/communication/rest.ts"})` → 59 tokens
**Step 8:** `search({"query":"apps/meteor/app/api/server/ApiClass.ts"})` → 229 tokens

## Files Seen In Tool Results (7)

- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/lib/server/functions/addUserToDefaultChannels.ts`
- `ee/packages/abac/src/index.ts`
- `apps/meteor/client/views/admin/engagementDashboard/EngagementDashboardRoute.tsx`
- `apps/meteor/app/version-check/server/functions/buildVersionUpdateMessage.ts`
- `packages/media-signaling/src/lib/services/webrtc/Processor.ts`
