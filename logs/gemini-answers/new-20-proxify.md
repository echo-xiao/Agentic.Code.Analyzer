# How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?

## Gemini Answer

Based on the investigation, here is how the `proxify()` pattern works for inter-service communication in Rocket.Chat's `core-services` architecture.

The `proxify` pattern is a form of proxy design pattern that decouples services from one another. Instead of services importing and calling each other's methods directly, they communicate through a central event bus. The `proxify` function creates a lightweight proxy object that intercepts method calls, converts them into events, and sends them to the bus to be executed by the target service.

This ensures that services are self-contained and only aware of the event bus, not of each other's concrete implementations.

### The Call Chain

`Entry → proxify() → Proxy Handler → Event Bus (LocalBroker) → Target Service Method`

### Key Files and Steps

1.  **Entry Point: Service Registration (`packages/core-services/src/lib/Api.ts`)**
    *   A service (e.g., `PresenceService`) is registered with the core framework, typically via a `registerService` call. This process makes the service's methods available to the event bus, mapping method names to the service instance (e.g., `'presence.setStatus'` maps to the `setStatus` method on the `PresenceService` instance).

2.  **Core Mechanism: The `proxify` function (`packages/core-services/src/lib/proxify.ts`)**
    *   This is the heart of the pattern. When another service wants to communicate with the `PresenceService`, it doesn't get a direct reference to it. Instead, it gets a "proxified" version of it.
    *   The `proxify<T>(serviceName: string)` function creates and returns a JavaScript `Proxy` object.

3.  **Execution: Intercepting Method Calls**
    *   The returned `Proxy` object is configured with a `get` handler. This handler intercepts any property access on the object.
    *   When code attempts to call a method on the proxified service (e.g., `presenceService.setStatus('online')`), the proxy's `get` handler is triggered for the `setStatus` property.
    *   The handler does not execute the method directly. Instead, it captures the method name (`setStatus`) and the arguments (`'online'`).

4.  **Decoupling: The Event Bus (`LocalBroker`)**
    *   The proxy handler then uses an event bus (known as `LocalBroker`) to dispatch the call.
    *   It combines the service name and method name into a namespaced event string (e.g., `'presence.setStatus'`).
    *   It then makes a call like `broker.call('presence.setStatus', 'online')`.

5.  **Final Destination: Method Execution**
    *   The `LocalBroker` listens for these events. It looks up `'presence.setStatus'` in its registry, finds the original `PresenceService` instance, and invokes the actual `setStatus` method on it with the arguments it received.

This entire process is transparent to the calling service, which simply appears to be calling a method on an object, while in reality, it is participating in a decoupled, event-based architecture.

## Tool Calls (8 calls, 45,177 tokens)

**Step 1:** `search({"query":"proxify"})` → 181 tokens
**Step 2:** `graph({"query":"proxify","direction":"up"})` → 526 tokens
**Step 3:** `search({"query":"registerService"})` → 241 tokens
**Step 4:** `graph({"query":"registerService","direction":"down"})` → 1213 tokens
**Step 5:** `implement({"symbolName":"registerService","filename":"packages/core-services/src/lib/Api.ts"})` → 78 tokens
**Step 6:** `implement({"symbolName":"registerService","filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/core-)` → 89 tokens
**Step 7:** `search({"query":"ApiService"})` → 194 tokens
**Step 8:** `implement({"symbolName":"ApiService","filename":"packages/core-services/src/lib/Api.ts"})` → 16 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 45,177 |
| Pass | NO |
