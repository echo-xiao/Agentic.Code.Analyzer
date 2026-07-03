# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

The `proxify()` pattern in Rocket.Chat's core-services enables inter-service communication without direct imports. It works as follows:

1.  **`proxify()` function:**
    *   Located in `packages/core-services/src/lib/proxify.ts` and `packages/models/src/proxify.ts`.
    *   It takes a `namespace` (which represents the service name) as an argument.
    *   It returns a `Proxy` object. This proxy intercepts calls to methods on the "proxified" service.

2.  **`handler`:**
    *   The `proxify()` function uses a `handler` (also defined within the `proxify.ts` files) to manage the proxy's behavior.
    *   When a method is called on the proxified service (e.g., `api.call('namespace.method')`), the `handler` intercepts this call.

3.  **`LocalBroker`:**
    *   The `LocalBroker` (found in `packages/core-services/src/LocalBroker.ts`) is the central component for routing these inter-service calls.
    *   It maintains a `methods` map that stores method names as `'serviceName.methodName'` and their corresponding bound functions.
    *   When the `handler` intercepts a call, it forwards it to the `LocalBroker.call()` method.
    *   The `LocalBroker.call()` method then looks up the appropriate service method in its `methods` map and executes it.

4.  **Service Registration:**
    *   Services extend `ServiceClassInternal` (for the monolith) or `ServiceClass`.
    *   When a service is created, its methods are registered with the `LocalBroker` under their respective `serviceName.methodName` keys.

**Flow:**

Entry → `proxify('IServiceName')` (packages/core-services/src/lib/proxify.ts or packages/models/src/proxify.ts) → `api.call('namespace.method')` → `LocalBroker.call()` (packages/core-services/src/LocalBroker.ts) → bound ServiceClass method.

In essence, `proxify()` creates a proxy that acts as an intermediary, routing all service calls through the `LocalBroker`, which then dispatches them to the correct service method. This decouples services, preventing direct dependencies and promoting a more modular architecture.

## Tool Calls (8 calls, 20,194 tokens)

**Step 1:** `plan({"intent":"architecture","question":"How does the core-services proxify() pattern work for inter-service communication i)` → 205 tokens
**Step 2:** `search({"query":"proxify"})` → 84 tokens
**Step 3:** `graph({"file":"proxify.ts","move":"expand","query":"proxify","depth":2})` → 167 tokens
**Step 4:** `details({"filename":"proxify.ts","symbolName":"proxify"})` → 73 tokens
**Step 5:** `details({"symbolName":"proxify","filename":"proxify.ts"})` → 65 tokens
**Step 6:** `search({"query":"handler","layer":"packages"})` → 491 tokens
**Step 7:** `search({"query":"LocalBroker"})` → 67 tokens
**Step 8:** `details({"filename":"LocalBroker.ts","symbolName":"LocalBroker"})` → 458 tokens

## Files Seen In Tool Results (23)

- `packages/models/src/proxify.ts`
- `packages/core-services/src/lib/proxify.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/mod.ts`
- `ee/apps/ddp-streamer/src/Client.ts`
- `packages/apps-engine/deno-runtime/lib/wrapAppForRequest.ts`
- `packages/apps-engine/src/server/accessors/ModifyUpdater.ts`
- `packages/apps-engine/src/server/accessors/ModifyCreator.ts`
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
- `packages/core-services/src/LocalBroker.ts`
