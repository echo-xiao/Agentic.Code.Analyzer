# How do you add a new service in Rocket.Chat?

## Gemini Answer

To add a new service in Rocket.Chat, you generally follow these steps, inspired by existing service implementations like `RoomService`:

1.  **Define the Service Interface:** Create an interface for your service in `packages/core-services/src/types/` that extends `IServiceClass`. This interface will define the methods your service will expose.

2.  **Implement the Service Class:** Create a new file for your service implementation, typically in `apps/meteor/server/services/your-service-name/service.ts`. This class should extend `ServiceClassInternal` (for monolith services) or `ServiceClass` (for microservices) from `packages/core-services/src/types/ServiceClass.ts`. You will then implement the methods defined in your service interface within this class.

    *   **Example:** `RoomService` in `apps/meteor/server/services/room/service.ts` extends `ServiceClassInternal` and implements `IRoomService`.

3.  **Register the Service:** Services are registered during the application startup. The `registerServices` function in `apps/meteor/server/services/startup.ts` is responsible for this. You would add an instance of your new service to the services registered here.

    *   **Call Chain:** `apps/meteor/server/main.ts` → `apps/meteor/server/services/startup.ts` → `registerServices`.

4.  **Utilize the Service:** Services in Rocket.Chat communicate via a bus using `proxify('IServiceName')` to get a proxy, and then `api.call('namespace.method')` to invoke methods on other services. This ensures loose coupling.

**Key Files and Call Chain:**

*   **`packages/core-services/src/types/ServiceClass.ts`**: Defines the base `ServiceClass` and `IServiceClass` that all services extend.
*   **`apps/meteor/server/services/room/service.ts`**: An example of a service implementation (`RoomService`) extending `ServiceClassInternal`.
*   **`apps/meteor/server/services/startup.ts`**: Contains the `registerServices` function, which is the entry point for registering new services.
*   **`apps/meteor/server/main.ts`**: The main server entry point that calls `registerServices`.

**Call Chain:**
`apps/meteor/server/main.ts` → `apps/meteor/server/services/startup.ts` (`registerServices`) → Your new `ServiceClass` (e.g., `RoomService` in `apps/meteor/server/services/room/service.ts`).

## Tool Calls (8 calls, 37,620 tokens)

**Step 1:** `search({"query":"service"})` → 682 tokens
**Step 2:** `implement({"symbolName":"service","filename":"apps/meteor/server/services/meteor/service.ts"})` → 182 tokens
**Step 3:** `search({"query":"ServiceClass"})` → 167 tokens
**Step 4:** `implement({"symbolName":"ServiceClass","filename":"packages/core-services/src/types/ServiceClass.ts"})` → 399 tokens
**Step 5:** `graph({"file":"packages/core-services/src/types/ServiceClass.ts","query":"ServiceClass","direction":"up"})` → 248 tokens
**Step 6:** `search({"query":"RoomService"})` → 84 tokens
**Step 7:** `implement({"filename":"apps/meteor/server/services/room/service.ts","symbolName":"RoomService"})` → 1000 tokens
**Step 8:** `graph({"direction":"up","file":"apps/meteor/server/services/room/service.ts","query":"RoomService"})` → 88 tokens
