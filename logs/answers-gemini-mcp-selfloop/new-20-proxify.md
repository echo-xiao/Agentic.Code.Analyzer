# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The `proxify()` pattern in Rocket.Chat's `core-services` package enables inter-service communication by creating proxy objects that abstract the underlying message transport. This allows services to invoke methods on other services as if they were local objects.

Here's a breakdown of how it works:

**Flow:**

1.  **Proxy Creation:** The `proxify()` function, located in `packages/core-services/src/lib/proxify.ts`, takes a service name (namespace) as input. It then returns a `Proxy` object.
2.  **Method Interception:** When a method is called on this `Proxy` object, the `handler` function (also in `packages/core-services/src/lib/proxify.ts`) intercepts the call.
3.  **API Call:** The `handler` then uses the `api.call()` method to route the request. The `api` object is an instance of the `Api` class, defined in `packages/core-services/src/lib/Api.ts`.
4.  **Broker Delegation:** The `Api.call()` method, in turn, delegates the actual communication to a `broker` instance. This `broker` is set via `Api.setBroker()`.
5.  **Message Transport:** The broker handles the message passing between services. In a monolithic deployment, an in-process `LocalBroker` is used, while in a distributed environment, NATS and the `@rocket.chat/network-broker` package are utilized.

**Key Files and Their Roles:**

*   **`packages/core-services/src/lib/proxify.ts`**: This file contains the `proxify()` function, which creates the proxy object, and the `handler` function, which intercepts method calls on the proxy.
*   **`packages/core-services/src/lib/Api.ts`**: This file defines the `Api` class, which acts as a central point for inter-service communication. It includes the `call()` method, responsible for routing requests, and the `setBroker()` method, which configures the underlying message transport.

## Tool Calls (8 calls, 28,881 tokens)

**Step 1:** `wiki({"question":"How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?"})` → 1064 tokens
**Step 2:** `search({"query":"proxify","layer":"packages"})` → 84 tokens
**Step 3:** `details({"symbolName":"proxify","filename":"proxify.ts"})` → 73 tokens
**Step 4:** `details({"filename":"proxify.ts","symbolName":"handler"})` → 94 tokens
**Step 5:** `search({"query":"api.call","layer":"packages"})` → 85 tokens
**Step 6:** `search({"file":"core-services","layer":"packages","query":"api"})` → 485 tokens
**Step 7:** `details({"filename":"Api.ts","symbolName":"Api"})` → 315 tokens
**Step 8:** `details({"symbolName":"Api.call","filename":"Api.ts"})` → 74 tokens

## Files Seen In Tool Results (26)

- `packages/core-services/src/index.ts`
- `packages/models/src/index.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/mod.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `packages/models/src/proxify.ts`
- `packages/core-services/src/lib/proxify.ts`
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
