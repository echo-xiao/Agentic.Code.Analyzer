# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Gemini Answer

The `proxify()` pattern in Rocket.Chat's `core-services` facilitates inter-service communication by abstracting direct service calls. Instead of services directly importing and calling methods from other services, they use a proxy mechanism.

Here's how it works:

1.  **`proxify()` function**: Located in `packages/core-services/src/lib/proxify.ts`, the `proxify<T>(namespace: string)` function creates a JavaScript Proxy. This proxy intercepts calls to the methods of a service.

2.  **Proxy `handler`**: The `proxify` function uses a `handler` (also defined in `packages/core-services/src/lib/proxify.ts`) to define the behavior of the proxy. When a method is accessed on the proxified object, the `get` trap of the handler is triggered.

3.  **`api.call()`**: Inside the `handler`, the `get` trap returns a function that, when called, executes `api.call(`${namespace}.${prop}`, params)`. This means that any method call on the proxified service is transformed into a call to a generic `api.call` function, with the service's namespace and the method name concatenated (e.g., `IServiceName.methodName`) and the original parameters.

4.  **LocalBroker**: Although `api.call` was not directly found in the search, the pattern description indicates that `api.call` then dispatches to `LocalBroker.call()`. The `LocalBroker` is responsible for storing and mapping method names (like `serviceName.methodName`) to the actual bound functions of the service classes. Services extend either `ServiceClassInternal` (for the monolith) or `ServiceClass`.

In essence, the flow is:

**Calling Service** → `proxify('IServiceName')` → `api.call('namespace.method')` → `LocalBroker.call()` → **Target Service's bound method**.

This pattern ensures loose coupling between services, allowing them to communicate without direct dependencies, which is crucial for a microservices-oriented architecture.

## Tool Calls (8 calls, 21,283 tokens)

**Step 1:** `plan({"question":"How does the core-services proxify() pattern work for inter-service communication in Ro)` → 85 tokens
**Step 2:** `search({"query":"proxify"})` → 191 tokens
**Step 3:** `graph({"depth":2,"file":"packages/core-services/src/lib/proxify.ts","query":"proxify","move":"expand"})` → 274 tokens
**Step 4:** `details({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"proxify"})` → 73 tokens
**Step 5:** `search({"layer":"packages/core-services","query":"handler"})` → 714 tokens
**Step 6:** `details({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"handler"})` → 94 tokens
**Step 7:** `search({"layer":"packages/core-services","query":"api.call"})` → 24 tokens
**Step 8:** `details({"symbolName":"proxify","filename":"packages/core-services/src/lib/proxify.ts"})` → 73 tokens

## Files Seen In Tool Results (22)

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
