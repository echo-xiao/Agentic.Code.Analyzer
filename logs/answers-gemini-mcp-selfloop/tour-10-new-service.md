# How do you add a new service in Rocket.Chat?

## Gemini Answer

To add a new service in Rocket.Chat, you need to follow a specific pattern centered around the `ServiceClass` and the `LocalBroker`. Services in Rocket.Chat communicate through a message bus pattern rather than direct imports.

Here's the architectural overview and steps:

**Call Chain & Architecture:**

1.  **Service Definition:** New services extend `ServiceClass` (found in `packages/core-services/src/types/ServiceClass.ts`). This abstract class provides the foundational structure for a service, including lifecycle methods (`created`, `started`, `stopped`), event handling (`onEvent`, `emit`), and settings management (`onSettingChanged`).
2.  **Service Communication:** Services do not directly import and call methods from other services. Instead, they interact via a proxy mechanism:
    *   `proxify('IServiceName')`
    *   `api.call('namespace.method')`
    *   This eventually routes through the `LocalBroker` (located at `packages/core-services/src/LocalBroker.ts`), which stores and dispatches methods bound as `'serviceName.methodName'`.
3.  **Service Registration/Startup:** Services are typically registered during the application's startup phase. The file `apps/meteor/ee/server/startup/services.ts` is an example of where services might be initialized or registered, especially in the enterprise edition.

**Steps to Add a New Service:**

1.  **Define Your Service Class:**
    *   Create a new TypeScript file for your service (e.g., `apps/meteor/server/services/my-new-service/service.ts`).
    *   Define a class that extends `ServiceClass`:
        
```typescript
        // apps/meteor/server/services/my-new-service/service.ts
        import { ServiceClass } from '../../../packages/core-services/src/types/ServiceClass'; // Adjust path as needed
        import { IMyNewService } from './IMyNewService'; // Define your service interface

        class MyNewService extends ServiceClass implements IMyNewService {
            protected name = 'MyNewService';

            // Implement your service methods here
            async created(): Promise<void> {
                await super.created();
                // Initialization logic
            }

            async started(): Promise<void> {
                await super.started();
                // Startup logic
            }

            public async myServiceMethod(param: string): Promise<string> {
                // Your business logic
                return `Hello from MyNewService: ${param}`;
            }
            // ... other methods
        }

        // You might export an instance or the class itself depending on registration
        export const myNewService = new MyNewService();
        ```

    *   Define an interface for your service (e.g., `apps/meteor/server/services/my-new-service/IMyNewService.ts`) to ensure type safety when other services interact with it.

2.  **Implement Service Logic:**
    *   Add your specific business logic as methods within your `MyNewService` class. These methods will be callable by other services via the `LocalBroker`.
    *   Utilize `this.onEvent()` and `this.emit()` for internal service event handling or `this.onSettingChanged()` to react to setting changes.

3.  **Register the Service:**
    *   The service instance needs to be registered with the Rocket.Chat service bus. While the exact registration mechanism can vary, a common pattern involves importing and instantiating your service in a server startup file.
    *   For example, you might add your service to a list of services to be initialized in a file like `apps/meteor/server/startup/services.ts` or a similar startup sequence.
    *   The system initializes and manages these service instances, making their methods available for remote calls.

By following these steps, you define a new service, implement its functionalities, and integrate it into the Rocket.Chat service architecture, allowing it to interact with other components.

## Tool Calls (8 calls, 35,884 tokens)

**Step 1:** `search({"query":"service","layer":"server"})` → 798 tokens
**Step 2:** `graph({"direction":"down","query":"UserService","layer":"server"})` → 37 tokens
**Step 3:** `search({"layer":"server","query":"ServiceClass"})` → 337 tokens
**Step 4:** `implement({"filename":"packages/core-services/src/types/ServiceClass.ts","symbolName":"ServiceClass"})` → 399 tokens
**Step 5:** `search({"query":"LocalBroker","layer":"server"})` → 165 tokens
**Step 6:** `graph({"query":"LocalBroker","direction":"up","layer":"server"})` → 153 tokens
**Step 7:** `search({"query":"services.ts","layer":"ee"})` → 53 tokens
**Step 8:** `implement({"filename":"apps/meteor/ee/server/startup/services.ts","symbolName":"*"})` → 14 tokens
