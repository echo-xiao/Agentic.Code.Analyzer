# How are new endpoints registered in the REST API in Rocket.Chat?

## Gemini Answer

New endpoints are registered in the Rocket.Chat REST API primarily through the Apps-Engine, which allows applications to extend Rocket.Chat's functionality.

The process begins with `AppApiManager.registerApis` in `packages/apps-engine/src/server/managers/AppApiManager.ts`. This function orchestrates the registration of APIs provided by an app.

The core registration logic is handled by the `ApiBridge`. Specifically, `ApiBridge.doRegisterApi` in `packages/apps-engine/src/server/bridges/ApiBridge.ts` is called, which in turn calls the abstract `ApiBridge.registerApi` method.

The concrete implementation of `ApiBridge.registerApi` is found in `AppApisBridge.registerApi` within `apps/meteor/app/apps/server/bridges/api.ts`. This method performs the following steps:

1.  It logs the API registration for debugging purposes.
2.  It verifies the API and its endpoint configuration.
3.  It retrieves or creates an `express.Router()` instance associated with the app's ID.
4.  It constructs the `routePath` ensuring it starts with a `/`.
5.  It then uses the `router[method]` (typically `router.all`) to register the endpoint with the Express router. This registration includes:
    *   The `routePath`.
    *   `authenticationMiddleware` to handle authentication based on `endpoint.authRequired`.
    *   `Meteor.bindEnvironment(this._appApiExecutor(endpoint, appId))` which wraps the API execution logic within a Meteor environment.

In summary, the call chain for registering new REST API endpoints is:

`AppApiManager.registerApis` (packages/apps-engine/src/server/managers/AppApiManager.ts) → `ApiBridge.doRegisterApi` (packages/apps-engine/src/server/bridges/ApiBridge.ts) → `AppApisBridge.registerApi` (apps/meteor/app/apps/server/bridges/api.ts) which ultimately uses `express.Router()` to define the endpoint.

## Tool Calls (8 calls, 46,536 tokens)

**Step 1:** `search({"query":"rest api register","layer":"server"})` → 284 tokens
**Step 2:** `graph({"query":"registerApis","direction":"down","layer":"server","file":"packages/apps-engine/src/server/)` → 1778 tokens
**Step 3:** `implement({"symbolName":"doRegisterApi","filename":"packages/apps-engine/src/server/bridges/ApiBridge.ts"})` → 59 tokens
**Step 4:** `implement({"symbolName":"ApiBridge.doRegisterApi","filename":"packages/apps-engine/src/server/bridges/ApiBridg)` → 94 tokens
**Step 5:** `implement({"filename":"packages/apps-engine/src/server/bridges/ApiBridge.ts","symbolName":"ApiBridge.registerA)` → 110 tokens
**Step 6:** `graph({"direction":"up","file":"packages/apps-engine/src/server/bridges/ApiBridge.ts","mode":"impact","que)` → 15 tokens
**Step 7:** `search({"query":"ApiBridge"})` → 288 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/apps/server/bridges/api.ts","symbolName":"AppApisBridge.registerApi"})` → 245 tokens

## Files Seen In Tool Results (19)

- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `apps/meteor/app/cloud/server/functions/startRegisterWorkspaceSetupWizard.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProviderManager.ts`
- `apps/meteor/ee/server/apps/communication/endpoints/appLogsDistinctInstanceHandler.ts`
- `apps/meteor/app/apple/server/appleOauthRegisterService.ts`
- `packages/apps-engine/src/server/bridges/ApiBridge.ts`
- `packages/apps-engine/src/server/bridges/OutboundMessagesBridge.ts`
- `apps/meteor/app/livechat/server/lib/outboundcommunication.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `packages/apps-engine/src/server/bridges/AppBridges.ts`
- `apps/meteor/app/apps/server/bridges/api.ts`
- `apps/meteor/app/apps/server/bridges/internal.ts`
- `apps/meteor/app/apps/server/bridges/email.ts`
- `apps/meteor/app/apps/server/bridges/settings.ts`
- `apps/meteor/app/apps/server/bridges/listeners.ts`
- `packages/apps-engine/tests/test-data/bridges/apiBridge.ts`
- `apps/meteor/app/apps/server/bridges/internalFederation.ts`
- `packages/apps-engine/tests/test-data/bridges/appBridges.ts`
- `packages/apps-engine/src/server/bridges/AppActivationBridge.ts`
