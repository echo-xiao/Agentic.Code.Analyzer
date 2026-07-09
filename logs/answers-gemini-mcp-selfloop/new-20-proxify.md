# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The `proxify()` pattern in Rocket.Chat's `core-services` package enables inter-service communication by creating typed proxy interfaces. These proxies abstract the underlying communication mechanism, allowing services to interact without needing to know if the target service is local or remote.

Here's a breakdown of how it works:

1.  **Proxy Creation**: The `proxify()` function, located in `packages/core-services/src/lib/proxify.ts`, takes a service name (namespace) and returns a `Proxy` object. This proxy acts as an intermediary for the actual service.

2.  **Method Invocation**: When a method is called on the proxified object, the call is intercepted by a `handler` function, also defined in `packages/core-services/src/lib/proxify.ts`. This `handler` constructs a string representing the method to be called (e.g., `namespace.methodName`) and then uses `api.call()` to dispatch the invocation.

3.  **API Dispatch**: The `api` object, a singleton instance of the `Api` class (defined in `packages/core-services/src/api.ts` and `packages/core-services/src/lib/Api.ts`), is responsible for routing the service call. It determines whether to route the call locally (via an in-process TCP transport in monolithic deployments) or remotely (via NATS messaging in distributed deployments).

4.  **Service Registration**: Services register themselves with the `api` object (which internally uses a broker) on startup. This registration makes their methods and events available for invocation through the `proxify()` mechanism.

In essence, the flow is:
`proxify()` (packages/core-services/src/lib/proxify.ts) → `handler` (packages/core-services/src/lib/proxify.ts) → `api.call()` (packages/core-services/src/lib/Api.ts) → Broker (Local or NATS) → Target Service.

## Tool Calls (8 calls, 32,223 tokens)

**Step 1:** `wiki({"question":"How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?"})` → 1300 tokens
**Step 2:** `search({"query":"proxify","layer":"packages"})` → 84 tokens
**Step 3:** `details({"symbolName":"proxify","filename":"proxify.ts"})` → 73 tokens
**Step 4:** `search({"query":"handler","file":"proxify.ts"})` → 511 tokens
**Step 5:** `details({"filename":"proxify.ts","symbolName":"handler"})` → 94 tokens
**Step 6:** `search({"query":"api.call","layer":"packages"})` → 85 tokens
**Step 7:** `search({"layer":"packages","query":"api"})` → 485 tokens
**Step 8:** `details({"filename":"Api.ts","symbolName":"api"})` → 54 tokens

## Files Seen In Tool Results (43)

- `apps/meteor/server/services/startup.ts`
- `packages/core-services/src/index.ts`
- `ee/packages/abac/src/service.spec.ts`
- `packages/apps/base-runtime/src/lib/accessors/mod.ts`
- `packages/models/src/index.ts`
- `packages/models/src/proxify.ts`
- `packages/core-services/src/lib/proxify.ts`
- `ee/apps/ddp-streamer/src/Client.ts`
- `packages/apps-engine/src/definition/uikit/IUIKitActionHandler.ts`
- `packages/apps-engine/src/definition/uikit/livechat/IUIKitLivechatActionHandler.ts`
- `packages/apps-engine/src/definition/livechat/ILivechatRoomClosedHandler.ts`
- `packages/apps-engine/deno-runtime/error-handlers.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/formatResponseErrorHandler.ts`
- `packages/apps-engine/deno-runtime/handlers/videoconference-handler.ts`
- `packages/apps-engine/deno-runtime/handlers/slashcommand-handler.ts`
- `packages/apps-engine/deno-runtime/handlers/scheduler-handler.ts`
- `packages/apps-engine/deno-runtime/handlers/outboundcomms-handler.ts`
- `packages/apps-engine/deno-runtime/handlers/api-handler.ts`
- `packages/apps-engine/deno-runtime/handlers/uikit/handler.ts`
- `packages/apps-engine/deno-runtime/handlers/tests/helpers/mod.ts`
- `packages/apps-engine/deno-runtime/handlers/listener/handler.ts`
- `packages/apps-engine/deno-runtime/handlers/lib/assertions.ts`
- `packages/apps-engine/deno-runtime/handlers/app/handler.ts`
- `ee/packages/omnichannel-services/src/QueueWorker.ts`
- `packages/livechat/src/api.ts`
- `packages/core-services/src/api.ts`
- `packages/core-services/src/types/ServiceClass.ts`
- `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`
- `packages/ui-client/src/components/Wizard/mocks/createMockWizardApi.ts`
- `packages/livechat/src/lib/api.ts`
- `packages/desktop-api/src/index.ts`
- `packages/core-services/src/types/IApiService.ts`
- `packages/core-services/src/lib/Api.ts`
- `packages/apps-engine/tests/test-data/bridges/apiBridge.ts`
- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `packages/apps-engine/src/server/managers/AppApi.ts`
- `packages/apps-engine/src/server/errors/RequiredApiVersionError.ts`
- `packages/apps-engine/src/server/bridges/ApiBridge.ts`
- `packages/apps-engine/src/server/accessors/ApiExtend.ts`
- `packages/apps-engine/src/definition/api/index.ts`
- `packages/apps-engine/src/definition/api/IResponse.ts`
- `packages/apps-engine/src/definition/api/IRequest.ts`
- `packages/apps-engine/src/definition/api/IApiExample.ts`
