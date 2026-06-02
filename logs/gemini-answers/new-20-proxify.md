# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Gemini Answer

The `core-services proxify()` pattern in Rocket.Chat facilitates inter-service communication by creating a proxy object that intercepts method calls. Instead of services directly calling each other, these calls are routed through a `LocalBroker`.

Here's how it works:

1.  **`proxify(namespace)`**: This function, found in `packages/core-services/src/lib/proxify.ts`, takes a `namespace` (which corresponds to the service's name) as an argument.
2.  **Proxy Creation**: It returns a `Proxy` object.
3.  **`handler(namespace)`**: The `Proxy` object uses a `handler` function (also defined within `packages/core-services/src/lib/proxify.ts`, though its implementation details weren't directly available in the tool output) that is responsible for intercepting method calls made on the proxy.
4.  **LocalBroker**: When a method is called on the proxified service object, the `handler` does not execute the method directly. Instead, it dispatches the call (along with its arguments and the service `namespace`) to the `LocalBroker`.
5.  **Service Instance**: The `LocalBroker` then routes this call to the actual implementation of the service, which is a `ServiceClass` instance.

This pattern acts as a central message bus for service-to-service communication, decoupling services and allowing for more flexible and maintainable architecture. If a service implementation isn't found through a direct `graph` traversal, it's recommended to search for the `ServiceClass` with the corresponding service name, as the `proxify` mechanism abstracts the direct call chain.

**Call Chain:**

`ServiceName.method(args)` (on the proxified object) → `proxify('ServiceName')` (defined in `packages/core-services/src/lib/proxify.ts`) → `LocalBroker` (defined in `packages/core-services/src/LocalBroker.ts`) → `ServiceClass` instance (the actual service implementation).

## Tool Calls (8 calls, 41,191 tokens)

**Step 1:** `search({"query":"proxify"})` → 115 tokens
**Step 2:** `implement({"symbolName":"proxify","filename":"packages/core-services/src/lib/proxify.ts"})` → 51 tokens
**Step 3:** `search({"query":"handler","layer":"packages"})` → 511 tokens
**Step 4:** `implement({"filename":"packages/core-services/src/lib/proxify.ts","symbolName":"proxify"})` → 51 tokens
**Step 5:** `search({"query":"handler.ts","layer":"packages"})` → 331 tokens
**Step 6:** `implement({"symbolName":"proxify","filename":"packages/core-services/src/lib/proxify.ts"})` → 51 tokens
**Step 7:** `implement({"filename":"packages/core-services/src/lib/proxify.ts"})` → 8 tokens
**Step 8:** `search({"query":"handler","layer":"packages"})` → 511 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 3/4 |
| Tool calls | 8 |
| Total tokens | 41,191 |
