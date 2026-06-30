# How do you add a new service in Rocket.Chat?

## Gemini Answer

To add a new service in Rocket.Chat, follow these architectural steps:

**Call Chain:** `search("service")` → `search("ServiceClass")` → `search("RoomService")` → `implement("RoomService", "apps/meteor/server/services/room/service.ts")`

1.  **Define Your Service Interface (Optional but Recommended):**
    Create a TypeScript interface for your service in `packages/core-services/src/types/IYourService.ts`. This defines the public API of your service. For example, `IRoomService` is found in `packages/core-services/src/types/IRoomService.ts`.

2.  **Create Your Service Implementation File:**
    Create a new file for your service implementation, typically located under `apps/meteor/server/services/<your-service-name>/service.ts`.

3.  **Implement Your Service Class:**
    Within this file, define a class that extends `ServiceClassInternal` and implements your service's interface (if you created one).

    *   **Extend `ServiceClassInternal`**: This base class provides the necessary infrastructure for your service to be integrated into Rocket.Chat's service bus.
    *   **Set the `protected name` property**: Assign a unique string identifier to your service (e.g., `protected name = 'your-service-name';`). This name is crucial for other parts of the system to call your service.
    *   **Implement your service methods**: Define your service's asynchronous methods (`async functionName() { /* ... */ }`) as per your interface definition.

    **Example (from `RoomService`):**
    
```typescript
    // apps/meteor/server/services/room/service.ts
    class RoomService extends ServiceClassInternal implements IRoomService {
      protected name = 'room';
      async updateDirectMessageRoomName(room: IRoom, ignoreStatusFromSubs?: string[], updatedNames?: AtLeast<IUser, '_id' | 'name' | 'username'>[]): Promise<boolean> { /* ... */ }
      async create(uid: string, params: ICreateRoomParams): Promise<IRoom> { /* ... */ }
      // ... other methods
    }
    ```


After these steps, your service will be recognized and usable by the Rocket.Chat service bus, allowing other services and parts of the application to interact with it using the `api.call('your-service-name.methodName')` pattern, often via `proxify('IYourService')`.

## Tool Calls (4 calls, 13,563 tokens)

**Step 1:** `search({"query":"service","layer":"server"})` → 600 tokens
**Step 2:** `search({"query":"ServiceClass","layer":"server"})` → 167 tokens
**Step 3:** `search({"layer":"server","query":"RoomService"})` → 84 tokens
**Step 4:** `implement({"symbolName":"RoomService","filename":"/apps/meteor/server/services/room/service.ts"})` → 1000 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 4/4 |
| Tool calls | 4 |
| Total tokens | 13,563 |
| Pass | YES |
