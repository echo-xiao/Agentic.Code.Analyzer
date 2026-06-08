# How do you add a new service in Rocket.Chat?

## Gemini Answer

To add a new service in Rocket.Chat, you primarily need to create a new class that extends `ServiceClassInternal` or `ServiceClass`.

The core principles for adding a new service are:

1.  **Service Class Definition**:
    *   New services extend `ServiceClassInternal` (for monolith services) or `ServiceClass`.
    *   You define the service's methods within this class.

2.  **Service Name**:
    *   Each service needs a unique `name` property. For example, `RoomService` has `protected name = 'room';`.

3.  **No Direct Imports Between Services**:
    *   Services should not directly import and call methods from other services. Instead, they interact via a messaging bus using `proxify('IServiceName')` which then uses `api.call('namespace.method')` and `LocalBroker.call()`.
    *   The `LocalBroker` stores methods as `'serviceName.methodName'` and binds them to the corresponding `ServiceClass` method.

**Example Walkthrough: `RoomService`**

1.  **`RoomService` Definition**: The `RoomService` is defined in `apps/meteor/server/services/room/service.ts`.
    
```typescript
    class RoomService extends ServiceClassInternal implements IRoomService {
      protected name = 'room';
      // ... service methods ...
    }
    ```

    This shows that `RoomService` extends `ServiceClassInternal` and implements the `IRoomService` interface (defined in `packages/core-services/src/types/IRoomService.ts`).

2.  **`ServiceClassInternal`**: This class is defined in `packages/core-services/src/types/ServiceClass.ts`.
    
```typescript
    class ServiceClassInternal extends ServiceClass {
      protected override internal = true;
    }
    ```

    It extends `ServiceClass` and sets an `internal` flag to `true`.

3.  **`ServiceClass`**: This is the base class for all services, defined in `packages/core-services/src/types/ServiceClass.ts`. It provides fundamental functionalities for services, such as:
    *   `name`: An abstract property to define the service's name.
    *   `events`: An `EventEmitter` for handling events.
    *   `settings`: An `EventEmitter` for handling setting changes.
    *   `setApi(api: IApiService)`: To set the API interface for inter-service communication.
    *   `onEvent` and `emit`: Methods for event handling.
    *   `onSettingChanged`: For reacting to setting changes.
    *   Lifecycle hooks: `created()`, `started()`, `stopped()`.

Therefore, to add a new service, you would:

*   Create a new TypeScript file (e.g., `apps/meteor/server/services/your-new-service/service.ts`).
*   Define a class in this file that extends `ServiceClassInternal` (or `ServiceClass` if it's not a monolith-specific internal service).
*   Implement your service's logic as methods within this class.
*   Ensure proper naming and follow the inter-service communication pattern (using `proxify` and `api.call`) rather than direct imports.

**Call Chain:**

`YourNewServiceClass` → `ServiceClassInternal` → `ServiceClass`

## Tool Calls (8 calls, 36,307 tokens)

**Step 1:** `search({"layer":"server","query":"service"})` → 600 tokens
**Step 2:** `search({"query":"ServiceClass"})` → 167 tokens
**Step 3:** `graph({"query":"ServiceClass","direction":"up"})` → 226 tokens
**Step 4:** `search({"query":"RoomService"})` → 84 tokens
**Step 5:** `implement({"symbolName":"RoomService","filename":"apps/meteor/server/services/room/service.ts"})` → 1000 tokens
**Step 6:** `search({"query":"ServiceClassInternal"})` → 173 tokens
**Step 7:** `implement({"filename":"packages/core-services/src/types/ServiceClass.ts","symbolName":"ServiceClassInternal"})` → 74 tokens
**Step 8:** `implement({"filename":"packages/core-services/src/types/ServiceClass.ts","symbolName":"ServiceClass"})` → 399 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 4/4 |
| Tool calls | 8 |
| Total tokens | 36,307 |
| Pass | NO |
