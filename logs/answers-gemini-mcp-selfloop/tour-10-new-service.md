# How do you add a new service in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

To add a new service in Rocket.Chat, you generally follow these steps:

**1. Define the Service:**
Create a new service as a class. This class will encapsulate the logic and functionalities of your service. These service files often include setup for database connections, tracing, and broker initialization.

*   **Example File Structure:** A typical service file, such as `ee/apps/account-service/src/service.ts`, includes imports for core functionalities like `api`, `getConnection`, `getTrashCollection` from `@rocket.chat/core-services`, `registerServiceModels` from `@rocket.chat/models`, `startBroker` from `@rocket.chat/network-broker`, and `startTracing` from `@rocket.chat/tracing`. It also contains asynchronous initialization logic to establish database connections, register models, set up the network broker, and register the service itself, along with a health check endpoint.

**2. Register the Service:**
Once defined, the service needs to be registered with the `api` object, which is part of `@rocket.chat/core-services`. This is done using the `api.registerService()` method.

*   **Core Registration File:** The `registerServices` function within `apps/meteor/server/services/startup.ts` is where many services are registered. You would add an instance of your new service class to this function using `api.registerService(new YourNewService());`.

**3. Service Deployment and Configuration (Optional, for Microservices Mode):**
Services can run in two main deployment modes:

*   **Monolithic Mode (TCP/Local Transport):** All services run within the same Node.js process as the main Meteor application and communicate via the `LocalBroker`. This is configured by setting the `TRANSPORTER` environment variable to `TCP`.
*   **Distributed Mode (NATS Transport):** Services operate as independent containers and communicate using NATS. This requires setting the `TRANSPORTER` environment variable to a NATS connection string (e.g., `nats://nats:4222`). For services running in distributed mode, their `package.json` also defines a `ms` script for running the service.

**Key Files and Flow:**

*   **Entry Point for Registration:** `apps/meteor/server/services/startup.ts`
*   **Core Service API:** `@rocket.chat/core-services` (where `api.registerService()` is defined)
*   **Example Service Definition:** `ee/apps/account-service/src/service.ts` (for structure)

**Flow:**
Define Service (e.g., `YourNewService` class) → Instantiate Service (`new YourNewService()`) → Register Service (`api.registerService(new YourNewService())` in `apps/meteor/server/services/startup.ts`)

## Tool Calls (1 calls, 3,859 tokens)

**Step 1:** `wiki({"question":"How do you add a new service in Rocket.Chat?"})` → 1244 tokens

## Files Seen In Tool Results (3)

- `apps/meteor/server/services/startup.ts`
- `ee/apps/account-service/src/service.ts`
- `apps/meteor/app/integrations/server/methods/incoming/addIncomingIntegration.ts`
