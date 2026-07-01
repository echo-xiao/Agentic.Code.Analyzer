# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Gemini Answer

The `proxify()` pattern in Rocket.Chat's `core-services` facilitates inter-service communication without direct imports, promoting a decoupled architecture.

Here's how it works:

1.  **`proxify(namespace)`**:
    *   Located in `packages/core-services/src/lib/proxify.ts`.
    *   This function takes a `namespace` (which represents the service name, e.g., 'IServiceName') as an argument.
    *   It returns a `Proxy` object.

2.  **`handler(namespace)`**:
    *   Also in `packages/core-services/src/lib/proxify.ts`.
    *   This is the core of the proxy's behavior. When a method is called on the proxified object (e.g., `proxifiedService.methodName(...)`), the `get` trap of the `ProxyHandler` is triggered.
    *   The `get` trap constructs a full method string in the format `${namespace}.${prop}` (e.g., `IServiceName.methodName`).
    *   It then calls `api.call()` with this constructed method string and the parameters passed to the original method.

3.  **`api.call()`**:
    *   While `api.call` is used in `proxify.ts`, its implementation is not directly available in the provided tool outputs. However, the pattern description states that `api.call()` ultimately leads to `LocalBroker.call()`.

4.  **`LocalBroker.call()`**:
    *   Located in `packages/core-services/src/LocalBroker.ts`.
    *   This method receives the full method string (e.g., `IServiceName.methodName`) and the data (parameters).
    *   It retrieves the actual bound function from its internal `methods` map using the method string as a key.
    *   It then executes this bound function with the provided data.
    *   The `LocalBroker` also handles tracing and context propagation using `tracerActiveSpan` and `asyncLocalStorage`.

**Call Chain:**

`proxify()` (packages/core-services/src/lib/proxify.ts)
  → `handler()` (packages/core-services/src/lib/proxify.ts)
    → `api.call()` (implicitly handled by the system, as per pattern description)
      → `LocalBroker.call()` (packages/core-services/src/LocalBroker.ts)
        → `this.methods.get(method)?.(...data)` (packages/core-services/src/LocalBroker.ts)

In essence, `proxify()` creates a dynamic proxy that intercepts method calls, translates them into a standardized `serviceName.methodName` format, and then dispatches them through a `LocalBroker` to the actual service implementation. This allows services to communicate without direct code dependencies, making the system more modular and maintainable.

## Tool Calls (8 calls, 43,236 tokens)

**Step 1:** `search({"query":"proxify","layer":"packages"})` → 265 tokens
**Step 2:** `graph({"direction":"down","query":"proxify","file":"packages/core-services/src/lib/proxify.ts"})` → 1396 tokens
**Step 3:** `implement({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"proxify"})` → 76 tokens
**Step 4:** `implement({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"handler"})` → 97 tokens
**Step 5:** `search({"query":"api.call"})` → 101 tokens
**Step 6:** `search({"layer":"packages","query":"LocalBroker"})` → 233 tokens
**Step 7:** `implement({"symbolName":"LocalBroker","filename":"packages/core-services/src/LocalBroker.ts"})` → 462 tokens
**Step 8:** `implement({"filename":"packages/core-services/src/LocalBroker.ts","symbolName":"LocalBroker.call"})` → 165 tokens

## Files Seen In Tool Results (10)

- `packages/models/src/proxify.ts`
- `packages/core-services/src/lib/proxify.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/mod.ts`
- `packages/apps-engine/deno-runtime/lib/wrapAppForRequest.ts`
- `packages/apps-engine/src/server/accessors/ModifyUpdater.ts`
- `ee/packages/omnichannel-services/src/QueueWorker.ts`
- `packages/core-services/src/LocalBroker.ts`
- `packages/core-services/src/types/IBroker.ts`
- `packages/core-services/src/lib/Api.ts`
- `ee/packages/network-broker/src/NetworkBroker.ts`
