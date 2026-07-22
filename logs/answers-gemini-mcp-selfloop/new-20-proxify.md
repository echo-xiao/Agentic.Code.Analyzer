# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

The `proxify()` pattern in Rocket.Chat's `core-services` facilitates inter-service communication by creating a proxy object that intercepts method calls and routes them to the appropriate service.

Here's a breakdown of how it works:

1.  **`proxify()` function:**
    *   Located in `packages/core-services/src/lib/proxify.ts`.
    *   It takes a `namespace` (string) as an argument, which represents the target service.
    *   It returns a `Proxy` object.

2.  **`handler()` function:**
    *   Also in `packages/core-services/src/lib/proxify.ts`.
    *   This function defines the behavior of the proxy.
    *   When a property (method) is accessed on the proxified object, the `get` trap is triggered.
    *   The `get` trap returns a function that, when called, uses `api.call()` to invoke the actual method on the target service.
    *   The method name is constructed by concatenating the `namespace` and the `prop` (method name) with a dot (e.g., `namespace.methodName`).
    *   The arguments passed to the proxified method are forwarded as an array to `api.call()`.

3.  **`api.call()`:**
    *   This is the core mechanism for inter-service communication.
    *   While the exact implementation of `api.call()` isn't fully detailed in the provided snippets, it's responsible for dispatching the call to the correct service based on the constructed method string (e.g., `namespace.methodName`) and handling the asynchronous nature of inter-service communication (returning a `Promise`).

**In essence, the flow is:**

1.  A service wants to call a method on another service.
2.  It obtains a proxified object for the target service using `proxify('targetServiceNamespace')`.
3.  It calls a method on this proxified object (e.g., `proxifiedService.someMethod(arg1, arg2)`).
4.  The proxy's `handler` intercepts this call.
5.  The `handler` constructs a string like `'targetServiceNamespace.someMethod'`.
6.  The `handler` then calls `api.call('targetServiceNamespace.someMethod', [arg1, arg2])`.
7.  `api.call()` handles the actual communication and invocation of `someMethod` on the `targetServiceNamespace` service.

There is also a `proxify()` function in `packages/models/src/proxify.ts` which serves a different purpose: it creates read-only proxies for models, ensuring that direct modifications to models accessed via `proxify` are prevented in production environments. This `proxify` is not for inter-service communication but for controlling access to model instances.

## Tool Calls (8 calls, 36,815 tokens)

**Step 1:** `plan({"intent":"architecture","question":"How does the core-services proxify() pattern work for inter-service communication i)` → 2333 tokens
**Step 2:** `search({"query":"proxify"})` → 84 tokens
**Step 3:** `graph({"file":"proxify.ts","move":"expand","query":"proxify","depth":2})` → 184 tokens
**Step 4:** `details({"symbolName":"proxify","filename":"proxify.ts"})` → 73 tokens
**Step 5:** `details({"filename":"proxify.ts","symbolName":"handler"})` → 94 tokens
**Step 6:** `details({"filename":"proxify.ts","symbolName":"proxify"})` → 65 tokens
**Step 7:** `details({"filename":"proxify.ts","symbolName":"handler"})` → 238 tokens
**Step 8:** `search({"query":"api.call"})` → 111 tokens

## Files Seen In Tool Results (24)

- `packages/release-changelog/src/getGitHubInfo.ts`
- `apps/meteor/ee/server/apps/cron.ts`
- `apps/meteor/ee/server/apps/appRequestsCron.ts`
- `packages/livechat/src/lib/parentCall.ts`
- `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/integrations/server/api/api.ts`
- `packages/core-services/src/api.ts`
- `apps/meteor/app/api/server/api.ts`
- `apps/meteor/app/apps/server/bridges/api.ts`
- `apps/meteor/ee/server/api/api.ts`
- `apps/meteor/app/mailer/server/api.ts`
- `packages/core-services/src/types/ServiceClass.ts`
- `packages/livechat/src/api.ts`
- `packages/storybook-config/src/main.ts`
- `apps/meteor/ee/server/lib/apps/disableAppsWithAddonsCallback.ts`
- `packages/models/src/proxify.ts`
- `packages/core-services/src/lib/proxify.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/mod.ts`
- `packages/apps-engine/deno-runtime/handlers/app/handleInitialize.ts`
- `packages/apps-engine/src/server/accessors/ModifyUpdater.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProviderManager.ts`
- `packages/apps-engine/deno-runtime/handlers/api-handler.ts`
- `ee/packages/omnichannel-services/src/QueueWorker.ts`
