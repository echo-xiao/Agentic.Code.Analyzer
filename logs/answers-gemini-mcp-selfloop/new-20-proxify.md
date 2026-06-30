# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Gemini Answer

The `proxify()` pattern in Rocket.Chat's `core-services` facilitates inter-service communication by creating a proxy object that, when a method is called on it, translates that call into an `api.call()` to the appropriate service method. This prevents direct imports between services and promotes a more decoupled architecture.

Here's the breakdown of the call chain and relevant files:

*   **`proxify()`** (in `packages/core-services/src/lib/proxify.ts`):
    *   This function takes a `namespace` (which is the service name) as an argument.
    *   It returns a `Proxy` object.

*   **`handler()`** (in `packages/core-services/src/lib/proxify.ts`):
    *   This is the handler for the `Proxy` object created by `proxify()`.
    *   When a `get` operation occurs on the proxy (i.e., a method is accessed), it returns a function.
    *   This returned function, when invoked, calls `api.call()` with a concatenated string of the `namespace` and the `prop` (the method name), along with the method parameters.

*   **`api.call()`** (in `packages/core-services/src/lib/Api.ts`):
    *   The `Api` class is responsible for managing services and handling inter-service communication.
    *   The `call` method of the `Api` class is the central point for dispatching calls to registered services.
    *   While the `graph` output didn't explicitly show `LocalBroker.call()`, the pattern description indicates that `api.call()` eventually delegates to `LocalBroker.call()`, which then invokes the bound method of the target service. The `LocalBroker` effectively maps "serviceName.methodName" to the actual function within the service.

**Call Chain:**

`proxify("IServiceName")` → `Proxy` object method call (`handler`) → `api.call("namespace.method", params)` → (implicitly) `LocalBroker.call()` → `bound ServiceClass method`

## Tool Calls (8 calls, 35,643 tokens)

**Step 1:** `search({"query":"proxify","layer":"packages"})` → 181 tokens
**Step 2:** `graph({"file":"packages/core-services/src/lib/proxify.ts","direction":"down","query":"proxify","layer":"pa)` → 933 tokens
**Step 3:** `implement({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"proxify"})` → 76 tokens
**Step 4:** `implement({"symbolName":"handler","filename":"packages/core-services/src/lib/proxify.ts"})` → 97 tokens
**Step 5:** `search({"query":"api.call","layer":"packages"})` → 75 tokens
**Step 6:** `search({"query":"LocalBroker.call"})` → 15 tokens
**Step 7:** `search({"layer":"packages","query":"api "})` → 213 tokens
**Step 8:** `implement({"filename":"packages/core-services/src/lib/Api.ts","symbolName":"Api"})` → 318 tokens
