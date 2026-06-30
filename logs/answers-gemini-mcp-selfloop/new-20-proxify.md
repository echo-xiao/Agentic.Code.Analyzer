# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Gemini Answer

The `core-services proxify()` pattern in Rocket.Chat facilitates inter-service communication by abstracting direct service imports. Instead, it uses a proxy to route method calls through a central `LocalBroker`.

The core components and their roles are:

1.  **`proxify` function** (`packages/core-services/src/lib/proxify.ts`):
    *   When a service needs to interact with another service, it calls `proxify('IServiceName')`.
    *   This function returns a `Proxy` object. The `Proxy`'s handler intercepts any method calls made on this object.

2.  **`Proxy` handler (internal to `proxify.ts`)**:
    *   When a method is invoked on the proxified object (e.g., `proxifiedService.someMethod(args)`), the handler intercepts this call.
    *   It constructs a fully qualified method name string (e.g., `'IServiceName.someMethod'`) and forwards this string, along with the arguments, to the `LocalBroker`.

3.  **`LocalBroker`** (`packages/core-services/src/LocalBroker.ts`):
    *   The `LocalBroker` maintains a map (`this.methods`) where keys are the fully qualified method names (e.g., `'serviceName.methodName'`) and values are the actual bound functions of the service methods.
    *   Its `call(method: string, data: any, ...)` method receives the method name and data from the `Proxy` handler.
    *   It then retrieves the corresponding service method from its `methods` map using `this.methods.get(method)` and executes it with the provided `data`.

**Call Chain:**

`Calling Code (e.g., Apps-Engine accessor)` → `proxify('IServiceName')` (`packages/core-services/src/lib/proxify.ts`) → `Proxy` Handler → `LocalBroker.call('IServiceName.method', args)` (`packages/core-services/src/LocalBroker.ts`) → `Actual Service Method`

## Tool Calls (6 calls, 19,550 tokens)

**Step 1:** `search({"query":"proxify","layer":"packages"})` → 265 tokens
**Step 2:** `graph({"depth":3,"file":"packages/core-services/src/lib/proxify.ts","query":"proxify","direction":"up"})` → 514 tokens
**Step 3:** `implement({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"proxify"})` → 76 tokens
**Step 4:** `implement({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"packages/core-services/src/lib)` → 62 tokens
**Step 5:** `search({"layer":"packages","query":"LocalBroker"})` → 165 tokens
**Step 6:** `implement({"symbolName":"LocalBroker.call","filename":"packages/core-services/src/LocalBroker.ts"})` → 165 tokens
