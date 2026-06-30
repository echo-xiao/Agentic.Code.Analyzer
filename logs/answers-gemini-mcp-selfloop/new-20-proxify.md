# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Gemini Answer

The `proxify()` pattern in Rocket.Chat's `core-services` facilitates inter-service communication by providing a loosely coupled mechanism for services to call each other's methods without direct imports. It leverages a `Proxy` object to intercept method calls and routes them through a central `LocalBroker`.

Here's the call chain and the role of each key file:

**Call Chain:** `proxify` → `handler` (internal) → `api.call` (implicit delegation) → `LocalBroker.call` → bound `ServiceClass` method

1.  **`packages/core-services/src/lib/proxify.ts`**
    *   The `proxify<T>(namespace: string)` function is the entry point of this pattern. It takes a `namespace` (typically the service name, e.g., 'UserService') and returns a `Proxy` object.
    *   This `Proxy` is configured with an internal `handler` function.

2.  **`packages/core-services/src/lib/proxify.ts` (internal `handler` function)**
    *   The `handler` is a `ProxyHandler` that defines the behavior when properties (which represent service methods) are accessed on the proxified object.
    *   Specifically, its `get` trap intercepts method calls. When a method like `proxifiedService.create` is invoked, it constructs a full method string (e.g., `'UserService.create'`) by combining the `namespace` and the `prop` (method name).
    *   It then makes a call to `api.call(`${namespace}.${prop}`, params)`. The `api` object is an assumed global or imported entity that effectively delegates the call to the `LocalBroker`.

3.  **`packages/core-services/src/LocalBroker.ts`**
    *   The `LocalBroker` class acts as an in-memory message bus. Services register their methods with the `LocalBroker` when they are initialized.
    *   The `async call(method: string, data: any, options?: CallingOptions)` method is the target of `api.call`.
    *   It receives the full `method` string (e.g., `'UserService.create'`) and the `data` (parameters for the method).
    *   It looks up the corresponding bound function in its internal `this.methods` `Map` using the `method` string as a key.
    *   Finally, it executes the retrieved service method with the provided `data`: `this.methods.get(method)?.(...data)`.

In essence, `proxify` creates a dynamic proxy that translates direct method calls into a routed message to the `LocalBroker`, which then dispatches the call to the actual registered service method. This ensures services remain decoupled, communicating via defined method strings rather than direct imports.

## Tool Calls (8 calls, 33,460 tokens)

**Step 1:** `search({"layer":"packages","query":"proxify"})` → 181 tokens
**Step 2:** `graph({"query":"proxify","layer":"packages","direction":"down"})` → 1107 tokens
**Step 3:** `implement({"symbolName":"proxify","filename":"packages/core-services/src/lib/proxify.ts"})` → 76 tokens
**Step 4:** `implement({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"handler"})` → 97 tokens
**Step 5:** `search({"layer":"packages","query":"api.call"})` → 75 tokens
**Step 6:** `search({"layer":"packages","query":"LocalBroker"})` → 165 tokens
**Step 7:** `implement({"filename":"packages/core-services/src/LocalBroker.ts","symbolName":"LocalBroker"})` → 462 tokens
**Step 8:** `implement({"symbolName":"LocalBroker.call","filename":"packages/core-services/src/LocalBroker.ts"})` → 165 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 33,460 |
| Pass | NO |
