# How are new endpoints registered in the REST API in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

New endpoints are registered in the Rocket.Chat REST API primarily through the `APIClass` in `apps/meteor/app/api/server/ApiClass.ts`.

Here's the flow:

1.  **`APIClass` Definition**: The `APIClass` (defined in `apps/meteor/app/api/server/ApiClass.ts`) serves as the core framework for defining and managing REST API routes. It provides methods like `get`, `post`, `put`, `delete`, and `addRoute` for registering different HTTP methods and paths.

2.  **`createApi` Function**: The `createApi` function (in `apps/meteor/app/api/server/api.ts`) is responsible for instantiating `APIClass` objects. It allows for configuration such as API versioning and default authentication settings.

3.  **`API` Object**: The `API` object (also in `apps/meteor/app/api/server/api.ts`) is the central point for accessing different API versions. It exposes `v1` (an instance of `APIClass` configured for version 1 of the API with default authentication) and `default` (another `APIClass` instance with default settings).

4.  **Endpoint Registration**: Developers register new endpoints by calling methods like `API.v1.addRoute()` or `API.v1.get()`, `API.v1.post()`, etc., on the `v1` (or `default`) instance of the `API` object. This is evident in numerous files, such as `apps/meteor/app/api/server/v1/channels.ts`, `apps/meteor/app/api/server/v1/users.ts`, and `apps/meteor/app/api/server/v1/groups.ts`, where `API.v1.addRoute()` is frequently used to define specific API endpoints for various functionalities.

In summary, the process is:
`APIClass` (framework) → `createApi` (instantiation) → `API` object (central access) → `API.v1.addRoute()` (endpoint definition).

## Tool Calls (8 calls, 64,324 tokens)

**Step 1:** `plan({"intent":"architecture","question":"How are new endpoints registered in the REST API in Rocket.Chat?"})` → 3247 tokens
**Step 2:** `search({"query":"APIClass"})` → 65 tokens
**Step 3:** `details({"filename":"ApiClass.ts","symbolName":"APIClass"})` → 1575 tokens
**Step 4:** `graph({"move":"up","file":"ApiClass.ts","depth":2,"query":"APIClass"})` → 568 tokens
**Step 5:** `details({"filename":"api.ts","symbolName":"createApi"})` → 100 tokens
**Step 6:** `details({"filename":"api.ts","symbolName":"API"})` → 257 tokens
**Step 7:** `search({"layer":"server","query":"API.v1.addRoute"})` → 267 tokens
**Step 8:** `details({"symbolName":"API.v1.addRoute","filename":"channels.ts"})` → 44 tokens

## Files Seen In Tool Results (45)

- `packages/core-services/src/index.ts`
- `packages/rest-typings/src/v1/auth.ts`
- `packages/apps-engine/src/definition/api/ApiEndpoint.ts`
- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `apps/meteor/app/apps/server/bridges/api.ts`
- `packages/apps-engine/src/server/managers/AppApi.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `packages/apps-engine/src/server/managers/AppExternalComponentManager.ts`
- `packages/apps-engine/src/server/accessors/ApiExtend.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `packages/apps-engine/src/server/accessors/MessageExtender.ts`
- `apps/meteor/app/apps/server/converters/uploads.js`
- `ee/packages/network-broker/src/NetworkBroker.ts`
- `apps/meteor/app/apps/server/converters/messages.js`
- `apps/meteor/ee/server/apps/communication/uikit.ts`
- `apps/meteor/app/apps/server/converters/users.js`
- `packages/apps-engine/src/server/managers/AppSlashCommand.ts`
- `apps/meteor/app/apps/server/bridges/commands.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/extenders/MessageExtender.ts`
- `packages/apps-engine/src/server/accessors/AppAccessors.ts`
- `packages/api-client/src/index.ts`
- `packages/apps-engine/src/server/errors/VideoConfProviderNotRegisteredError.ts`
- `packages/apps-engine/src/server/accessors/Http.ts`
- `apps/meteor/app/apps/server/bridges/cloud.ts`
- `apps/meteor/app/cloud/server/functions/getWorkspaceAccessToken.ts`
- `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`
- `apps/meteor/ee/server/apps/communication/endpoints/appLogsExportHandler.ts`
- `apps/meteor/app/integrations/server/api/api.ts`
- `apps/meteor/app/api/server/middlewares/metrics.ts`
- `apps/meteor/app/api/server/middlewares/authenticationHono.ts`
- `apps/meteor/app/api/server/api.ts`
- `packages/ui-client/src/components/Wizard/Wizard.tsx`
- `apps/meteor/app/livechat/server/api/v1/room.ts`
- `apps/meteor/app/livechat/server/api/v1/config.ts`
- `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
- `apps/meteor/app/api/server/v1/channels.ts`
- `apps/meteor/app/api/server/v1/users.ts`
- `apps/meteor/app/api/server/v1/groups.ts`
- `apps/meteor/app/api/server/v1/rooms.ts`
- `apps/meteor/app/api/server/v1/chat.ts`
- `apps/meteor/app/api/server/v1/teams.ts`
- `apps/meteor/app/api/server/v1/im.ts`
- `apps/meteor/app/livechat/server/api/v1/contact.ts`
- `apps/meteor/app/livechat/imports/server/rest/departments.ts`
- `apps/meteor/app/livechat/imports/server/rest/dashboards.ts`
