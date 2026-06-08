# How do you add a new service in Rocket.Chat?

## Gemini Answer

To add a new service in Rocket.Chat, you primarily need to define a service class and then register it. The architecture relies on a service bus pattern for inter-service communication.

Here's the step-by-step process:

1.  **Define Your Service Class:**
    *   Create a new TypeScript file for your service, typically under `apps/meteor/server/services/your-service-name/service.ts`.
    *   Your service class must extend `ServiceClassInternal` (for monolith applications) or `ServiceClass` (for microservices).
    *   Define a `protected name` property within your class. This name will be used for service identification and method calls.
    *   Implement your service methods within this class.

    **Example (based on `RoomService`):**
    `apps/meteor/server/services/room/service.ts`
    
```typescript
    class RoomService extends ServiceClassInternal implements IRoomService {
      protected name = 'room';
      async yourServiceMethod(arg1: string): Promise<any> {
        // ... implementation ...
      }
      // ... other service methods ...
    }
    ```

    This structure is based on the `RoomService` class found in `apps/meteor/server/services/room/service.ts`, which extends `ServiceClassInternal` as defined in `packages/core-services/src/types/ServiceClass.ts`.

2.  **Register Your Service:**
    *   Instantiate your service class.
    *   Call `api.registerService()` with your instantiated service. This registration typically happens in a server startup file.

    **Example (based on `registerServices`):**
    `apps/meteor/server/services/startup.ts`
    
```typescript
    export const registerServices = async (): Promise<void> => {
        // ... other service registrations ...
        api.registerService(new YourNewService()); // Register your service here
        api.registerService(new RoomService()); // Example of existing registration
        // ...
    };
    ```

    The `RoomService` is registered in `apps/meteor/server/services/startup.ts` within the `registerServices` function.

3.  **Calling Your Service (Inter-service Communication):**
    Services do not call each other via direct imports. Instead, they use a proxy mechanism:
    *   `proxify('IServiceName')` creates a proxy for the service.
    *   `api.call('namespace.method')` is then used to invoke methods on the registered service.
    *   The `LocalBroker` (which stores methods as `'serviceName.methodName'`) handles the actual routing to the bound `ServiceClass` method.

**Call Chain:**
`apps/meteor/server/services/startup.ts` (`registerServices` function)
  → `api.registerService()`
    → `apps/meteor/server/services/room/service.ts` (instantiation of `RoomService` or your new service)

## Tool Calls (6 calls, 22,272 tokens)

**Step 1:** `search({"query":"service","layer":"server"})` → 600 tokens
**Step 2:** `search({"query":"ServiceClass","layer":"server"})` → 167 tokens
**Step 3:** `search({"layer":"server","query":"RoomService"})` → 84 tokens
**Step 4:** `implement({"symbolName":"RoomService","filename":"apps/meteor/server/services/room/service.ts"})` → 1000 tokens
**Step 5:** `graph({"direction":"up","layer":"server","query":"RoomService"})` → 47 tokens
**Step 6:** `implement({"symbolName":"registerServices","filename":"apps/meteor/server/services/startup.ts"})` → 529 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 4/4 |
| Tool calls | 6 |
| Total tokens | 22,272 |
| Pass | NO |
