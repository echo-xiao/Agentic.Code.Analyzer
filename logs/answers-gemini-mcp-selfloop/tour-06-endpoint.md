# How do you create a new REST API endpoint in Rocket.Chat?

## Gemini Answer

To create a new REST API endpoint in Rocket.Chat, you typically follow these steps:

1.  **Create an API instance**: An API version (e.g., `API.v1`) is initialized using a `createApi` function. This function is responsible for setting up the API's version and default authentication.
2.  **Register routes**: Once an API instance is created, you can register new routes using either the legacy `addRoute()` method or the more modern typed methods like `.get()`, `.post()`, `.put()`, or `.delete()`. These methods allow you to define the HTTP verb, the endpoint path, and the handler function for the API endpoint.

The core logic for defining and managing REST API endpoints resides in:

*   `apps/meteor/app/api/server/ApiClass.ts`: This file contains the `ApiClass` which provides the methods for adding routes to the API.

**Call Chain:**
`createApi` (implicitly defined or used to instantiate an API version) → `API.v1.addRoute()` or `API.v1.get()/.post()/.put()/.delete()` (within `apps/meteor/app/api/server/ApiClass.ts`).

## Tool Calls (8 calls, 22,863 tokens)

**Step 1:** `search({"query":"REST API endpoint","layer":"server"})` → 136 tokens
**Step 2:** `graph({"direction":"down","layer":"server","file":"apps/meteor/app/api/server/ApiClass.ts","query":"ApiCla)` → 12 tokens
**Step 3:** `graph({"direction":"down","query":"ApiClass","layer":"server"})` → 12 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"ApiClass"})` → 15 tokens
**Step 5:** `search({"layer":"server","query":"addRoute"})` → 387 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"ApiClass.addRoute"})` → 47 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"ApiClass"})` → 15 tokens
**Step 8:** `implement({"symbolName":"apps/meteor/app/api/server/ApiClass.ts","filename":"apps/meteor/app/api/server/ApiCla)` → 59 tokens

## Files Seen In Tool Results (8)

- `apps/meteor/app/livechat/imports/server/rest/inquiries.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/lib/server/functions/addUserToDefaultChannels.ts`
- `apps/meteor/app/version-check/server/functions/buildVersionUpdateMessage.ts`
- `ee/packages/abac/src/index.ts`
- `apps/meteor/client/views/admin/engagementDashboard/EngagementDashboardRoute.tsx`
- `packages/media-signaling/src/lib/services/webrtc/Processor.ts`
