# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Gemini Answer

Rocket.Chat's `core-services` use a `proxify()` pattern for inter-service communication, avoiding direct imports between services. This pattern establishes a robust message bus system.

The core communication flow is as follows:
**Entry → Step 1 → Step 2 → Step 3 → Final**

1.  **`proxify('IServiceName')`** (located at `packages/core-services/src/lib/proxify.ts`)
    *   Client code requests a proxified instance of a service, for example, `proxify('RoomService')`.
    *   The `proxify` function creates and returns a JavaScript `Proxy` object. This proxy intercepts any method calls made on the service instance.

2.  **`Proxy.handler`** (internal to `packages/core-services/src/lib/proxify.ts`)
    *   When a method is invoked on the proxified service object (e.g., `proxifiedRoomService.createRoom()`), the `Proxy`'s `handler` intercepts this call.
    *   The `handler` then constructs a fully qualified method name string, such as `'RoomService.createRoom'`, and prepares the arguments.

3.  **`api.call('namespace.method')`** (example usage seen in `ee/packages/omnichannel-services/src/QueueWorker.ts`)
    *   The `handler` ultimately translates the intercepted call into an `api.call` with the service's namespace and method name (e.g., `api.call('RoomService.createRoom', [args])`).
    *   This `api.call` is an internal mechanism that bridges to the message broker.

4.  **`LocalBroker.call(method, data, options)`** (located at `packages/core-services/src/LocalBroker.ts`)
    *   The `api.call` then delegates to the `LocalBroker.call` method.
    *   The `LocalBroker` is responsible for managing and dispatching service calls within the application. It maintains an internal `Map` where service methods are stored as `'serviceName.methodName'` keys, bound to their respective service class functions.
    *   The `call` method of `LocalBroker` retrieves the actual bound function based on the provided method string.

5.  **Bound ServiceClass method**
    *   Finally, the `LocalBroker` executes the actual service method (e.g., `RoomService.createRoom()`) with the provided data and options. Services extend `ServiceClassInternal` (for the monolith) or `ServiceClass` to integrate with this broker pattern.

This pattern ensures services remain decoupled, communicating through a defined interface rather than direct imports, which simplifies refactoring and promotes a microservices-like architecture within the larger application.

## Tool Calls (8 calls, 38,058 tokens)

**Step 1:** `search({"query":"proxify","layer":"packages"})` → 181 tokens
**Step 2:** `graph({"direction":"down","layer":"packages","query":"proxify"})` → 1107 tokens
**Step 3:** `implement({"symbolName":"proxify","filename":"packages/core-services/src/lib/proxify.ts"})` → 76 tokens
**Step 4:** `implement({"symbolName":"proxify","filename":"packages/core-services/src/lib/proxify.ts"})` → 76 tokens
**Step 5:** `search({"query":"api.call","layer":"packages"})` → 75 tokens
**Step 6:** `search({"layer":"packages","query":"LocalBroker.call"})` → 15 tokens
**Step 7:** `search({"layer":"packages","query":"LocalBroker"})` → 165 tokens
**Step 8:** `implement({"filename":"packages/core-services/src/LocalBroker.ts","symbolName":"LocalBroker"})` → 462 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 38,058 |
| Pass | NO |
