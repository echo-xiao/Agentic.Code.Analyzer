# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Gemini Answer

The `proxify()` pattern in Rocket.Chat's `core-services` facilitates inter-service communication without direct imports. It works as follows:

1.  **`proxify(namespace)`** (at `packages/core-services/src/lib/proxify.ts`): This function takes a `namespace` (representing a service name) and returns a `Proxy` object.

2.  **`handler(namespace)`** (at `packages/core-services/src/lib/proxify.ts`): This internal function defines the `ProxyHandler` for the `Proxy` object. When a method is accessed on the proxified service, the `get` trap is triggered.

    *   The `get` trap returns a function that, when called with parameters, invokes `api.call(`${namespace}.${prop}`, params)`. Here, `prop` is the name of the method being called on the proxified service.

3.  **`api.call()`**: This is the central mechanism for dispatching inter-service calls. While a direct `api.call` implementation wasn't fully retrieved due to tool limitations, the search results indicate that `api.call` ultimately dispatches to `LocalBroker.call()`.

4.  **`LocalBroker.call()`**: (mentioned in the search output, defined in `packages/core-services/src/LocalBroker.ts`): The `LocalBroker` is responsible for storing and routing service methods. It maps method names in the format `'serviceName.methodName'` to their bound service class methods.

This pattern ensures that services interact through a standardized message bus, promoting loose coupling and making it easier to manage dependencies and potentially scale services independently.

**Call Chain:**

`Service A` calls `proxify('ServiceB').someMethod()` → `proxify()` (packages/core-services/src/lib/proxify.ts) → `handler()` (packages/core-services/src/lib/proxify.ts) → `api.call('ServiceB.someMethod', params)` (packages/core-services/src/lib/proxify.ts calls this implicitly) → `LocalBroker.call()` (packages/core-services/src/LocalBroker.ts) → `Service B.someMethod()` (bound method on the target service).

## Tool Calls (8 calls, 38,164 tokens)

**Step 1:** `search({"query":"proxify","layer":"packages"})` → 181 tokens
**Step 2:** `graph({"direction":"down","query":"proxify","layer":"packages"})` → 1107 tokens
**Step 3:** `implement({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"proxify"})` → 76 tokens
**Step 4:** `implement({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"handler"})` → 97 tokens
**Step 5:** `search({"layer":"packages","query":"api.call"})` → 75 tokens
**Step 6:** `search({"query":"LocalBroker","layer":"packages"})` → 165 tokens
**Step 7:** `search({"query":"api","layer":"packages"})` → 601 tokens
**Step 8:** `implement({"filename":"packages/core-services/src/api.ts","symbolName":"api.call"})` → 41 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 38,164 |
| Pass | NO |
