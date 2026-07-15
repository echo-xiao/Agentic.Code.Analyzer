# How do you add a new service in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

To add a new service in Rocket.Chat, you generally follow a pattern of defining a service class that extends `ServiceClassInternal`, implementing its functionality, and integrating it with other Rocket.Chat components like settings, data models, and cron jobs.

Here's a step-by-step guide:

1.  **Define the Service Interface (Optional but Recommended):**
    *   Create an interface for your service in `packages/core-services/src/types/INewService.ts` (replace `INewService` with your service's name). This interface should define the public methods your service will expose.
    *   *Example:* `packages/core-services/src/types/INPSService.ts` defines the interface for the NPS service.

2.  **Create the Service Class:**
    *   Create a new directory and file for your service: `apps/meteor/server/services/<your-service-name>/service.ts`.
    *   Define a class that extends `ServiceClassInternal` and implements your service interface (if you created one).
    *   Set the `protected name` property to a unique identifier for your service.
    *   *Example:* The `NPSService` is defined in `apps/meteor/server/services/nps/service.ts` as:
        
```typescript
        class NPSService extends ServiceClassInternal implements INPSService {
          protected name = 'nps';
          // ... service methods
        }
        ```

    *   The base class for internal services is `ServiceClassInternal`, located at `packages/core-services/src/types/ServiceClass.ts`.

3.  **Implement Service Methods:**
    *   Implement the methods defined in your service interface within your service class. These methods will contain the core business logic of your service.
    *   Common interactions within service methods include:
        *   **Settings:** Accessing Rocket.Chat settings to enable/disable features or configure behavior.
        *   **Data Models:** Interacting with MongoDB collections through Rocket.Chat's data models (e.g., `packages/models/src/models/Nps.ts`, `packages/models/src/models/NpsVote.ts`) to persist and retrieve data. You may need to define new models for your service.
        *   **Cron Jobs:** If your service requires scheduled tasks, define cron jobs (e.g., `apps/meteor/server/cron/nps.ts` for the NPS service) that call methods on your service class.
        *   **Notifications/Banners:** Sending notifications or creating administrative banners to inform users or administrators about service-related events.

4.  **Register the Service:**
    *   While the explicit registration mechanism isn't directly visible in the `NPSService` file, services extending `ServiceClassInternal` are typically instantiated and registered within the Rocket.Chat application's startup process, making them available for use throughout the server.

## Tool Calls (5 calls, 19,636 tokens)

**Step 1:** `plan({"question":"How do you add a new service in Rocket.Chat?","intent":"architecture"})` → 2250 tokens
**Step 2:** `search({"query":"NPSService","layer":"server"})` → 92 tokens
**Step 3:** `details({"filename":"service.ts","symbolName":"NPSService"})` → 178 tokens
**Step 4:** `search({"query":"ServiceClassInternal"})` → 73 tokens
**Step 5:** `details({"filename":"ServiceClass.ts","symbolName":"ServiceClassInternal"})` → 67 tokens

## Files Seen In Tool Results (19)

- `apps/meteor/server/services/nps/service.ts`
- `packages/models/src/models/Nps.ts`
- `apps/meteor/server/services/nps/notification.ts`
- `apps/meteor/server/services/nps/getAndCreateNpsSurvey.ts`
- `packages/models/src/models/NpsVote.ts`
- `apps/meteor/server/cron/nps.ts`
- `apps/meteor/app/livechat/server/lib/logger.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/lib/logger.ts`
- `apps/meteor/app/livechat/server/lib/RoutingManager.ts`
- `apps/meteor/app/version-check/server/functions/checkVersionUpdate.ts`
- `apps/meteor/app/version-check/server/index.ts`
- `apps/meteor/app/version-check/server/functions/getNewUpdates.ts`
- `apps/meteor/app/version-check/server/functions/buildVersionUpdateMessage.ts`
- `apps/meteor/client/views/room/index.ts`
- `apps/meteor/app/livechat/server/lib/hooks.ts`
- `apps/meteor/client/views/room/MessageList/lib/isMessageNewDay.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/beforeNewRoom.ts`
- `packages/core-services/src/types/INPSService.ts`
- `packages/core-services/src/types/ServiceClass.ts`
