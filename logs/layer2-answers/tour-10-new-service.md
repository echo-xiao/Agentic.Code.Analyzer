# How do you add a new service in Rocket.Chat?

## Gemini Answer

Based on the investigation of the Rocket.Chat codebase, adding a new service involves creating a service class, defining its interface, and registering it with the application's service broker. The `RoomService` provides a clear template for this process.

Here is a step-by-step guide to adding a new service:

### 1. Define the Service Interface

Services are defined by an interface to ensure type safety and a consistent API. Create a new interface file for your service within the `packages/core-services` directory. This allows other parts of the system, including other services, to be aware of your service's methods.

*   **File to Create:** `packages/core-services/src/types/I[NewServiceName]Service.ts`
*   **Example (`IRoomService`):** The interface for the room service is located at `packages/core-services/src/types/IRoomService.ts`. Your new interface should follow a similar structure, extending the base `IService` interface.

### 2. Implement the Service Class

Create the main service file in the `apps/meteor/server/services` directory. This file will contain the concrete implementation of the service logic.

*   **Entry → Service Definition → Implementation**
*   **File to Create:** `apps/meteor/server/services/[new-service-name]/service.ts`
*   **Implementation Details:**
    *   The class should extend `ServiceClass` (from `packages/core-services/src/types/ServiceClass.ts`).
    *   It should implement the interface you created in the previous step.
    *   The constructor typically calls `super()` and is where the service name is defined and its methods are registered with the internal broker.
*   **Example (`RoomService`):** The primary example for a service implementation is the `RoomService`, located at `apps/meteor/server/services/room/service.ts`.

### 3. Register the Service

A new service must be instantiated and registered with the service manager upon application startup. This is typically done in a central file that imports and initializes all services. While the exact registration file wasn't identified in the search, you would look for a file like `apps/meteor/server/services/index.ts` or similar to add your new service to the list of services to be loaded.

### Summary of Key Files

To create a new service, you will model it after existing services like `RoomService`. The key files and their roles are:

*   **Service Interface Definition:** `packages/core-services/src/types/I[NewServiceName]Service.ts` (e.g., `IRoomService.ts`)
    *   Defines the methods your service exposes to the rest of the application.
*   **Service Class Implementation:** `apps/meteor/server/services/[new-service-name]/service.ts` (e.g., `apps/meteor/server/services/room/service.ts`)
    *   Contains the business logic for your service. It extends the base `ServiceClass` found at `packages/core-services/src/types/ServiceClass.ts`.
*   **Service Registration (Inferred):** A central file within `apps/meteor/server/services/` where all services are imported and initialized.

By following this pattern, you can create a new, fully-featured service that integrates cleanly with Rocket.Chat's service-oriented architecture.

## Tool Calls (8 calls, 24,085 tokens)

**Step 1:** `search({"query":"authorization service"})` → 88 tokens
**Step 2:** `search({"query":"AuthorizationService"})` → 16 tokens
**Step 3:** `search({"query":"service/authorization.ts"})` → 17 tokens
**Step 4:** `search({"query":"ServiceClass"})` → 167 tokens
**Step 5:** `graph({"direction":"up","query":"ServiceClass"})` → 226 tokens
**Step 6:** `search({"query":"AuthorizationService"})` → 16 tokens
**Step 7:** `search({"query":"RoomService"})` → 84 tokens
**Step 8:** `graph({"query":"RoomService","direction":"down"})` → 37 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 3/4 |
| Tool calls | 8 |
| Total tokens | 24,085 |
| Pass | NO |
