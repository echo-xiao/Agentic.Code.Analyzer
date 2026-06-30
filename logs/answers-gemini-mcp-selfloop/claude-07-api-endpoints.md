# How are new endpoints registered in the REST API in Rocket.Chat?

## Gemini Answer

New endpoints in Rocket.Chat's REST API are primarily registered through the `ApiClass` in `apps/meteor/app/api/server/ApiClass.ts`. This class likely utilizes the `packages/http-router/src/Router.ts` to handle the actual route registration with the underlying HTTP server.

For applications built with the Apps-Engine, the process starts in `packages/apps-engine/src/server/managers/AppApiManager.ts` with the `registerApis` function. This then delegates to `packages/apps-engine/src/server/bridges/ApiBridge.ts`'s `registerApi` and `doRegisterApi` methods, which in turn would interact with the core `ApiClass` and `Router` to establish the endpoints.

**Call Chain:**

1.  **Entry Point (Core API):** `apps/meteor/app/api/server/ApiClass.ts` (defines API routes)
2.  **Route Registration:** `packages/http-router/src/Router.ts` (handles the actual registration of typed routes)

**Call Chain (Apps-Engine):**

1.  **Entry Point (Apps-Engine):** `packages/apps-engine/src/server/managers/AppApiManager.ts` (`registerApis`)
2.  **API Bridge:** `packages/apps-engine/src/server/bridges/ApiBridge.ts` (`registerApi`, `doRegisterApi`)
3.  **Core API Integration:** `apps/meteor/app/api/server/ApiClass.ts` (utilizes core API mechanisms)
4.  **Route Registration:** `packages/http-router/src/Router.ts` (registers the routes)

## Tool Calls (8 calls, 46,728 tokens)

**Step 1:** `search({"query":"REST API register","layer":"server"})` → 284 tokens
**Step 2:** `graph({"query":"registerApis","layer":"server","file":"packages/apps-engine/src/server/managers/AppApiMana)` → 1778 tokens
**Step 3:** `implement({"filename":"packages/apps-engine/src/server/bridges/ApiBridge.ts","symbolName":"doRegisterApi"})` → 59 tokens
**Step 4:** `implement({"symbolName":"doRegisterApi","filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/apps-en)` → 70 tokens
**Step 5:** `search({"layer":"server","query":"registerTypedRoutes"})` → 146 tokens
**Step 6:** `implement({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/app/api/server/ApiClass.ts","symb)` → 84 tokens
**Step 7:** `implement({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/http-router/src/Router.ts","symbolNa)` → 83 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/api/server/ApiClass.ts","symbolName":"addRoute"})` → 51 tokens

## Files Seen In Tool Results (15)

- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `apps/meteor/app/cloud/server/functions/startRegisterWorkspaceSetupWizard.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProviderManager.ts`
- `apps/meteor/ee/server/apps/communication/endpoints/appLogsDistinctInstanceHandler.ts`
- `apps/meteor/app/apple/server/appleOauthRegisterService.ts`
- `packages/apps-engine/src/server/bridges/ApiBridge.ts`
- `packages/apps-engine/src/server/bridges/OutboundMessagesBridge.ts`
- `apps/meteor/app/livechat/server/lib/outboundcommunication.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/api/server/definition.ts`
- `apps/meteor/app/api/server/api.ts`
- `packages/apps-engine/src/server/logging/AppConsole.ts`
- `apps/meteor/server/lib/i18n.ts`
- `packages/http-router/src/Router.ts`
