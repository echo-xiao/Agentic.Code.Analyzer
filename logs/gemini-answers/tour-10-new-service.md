# How do you add a new service in Rocket.Chat?

## Gemini Answer

To add a new service in Rocket.Chat, you need to define a new class that extends the `ServiceClass` and then register it with the application's API during startup.

Here's the step-by-step process:

1.  **Define your Service Class**:
    *   Create a new TypeScript class that extends `ServiceClass` from `packages/core-services/src/types/ServiceClass.ts`.
    *   Your class must define a `protected name: string;` property, which is the unique identifier for your service.
    *   You can override the `created()`, `started()`, and `stopped()` lifecycle methods to execute code when the service is initialized, started, or stopped, respectively.
    *   Add any custom methods and properties to your service class to implement its functionality.

2.  **Register your Service**:
    *   Locate the `registerServices` function in `apps/meteor/server/services/startup.ts`.
    *   Inside this function, create an instance of your new service class.
    *   Call `api.registerService()` with your service instance. If your service has dependencies on other services, you can pass an array of their names as the second argument.

**Example Structure:**


```typescript
// services/MyNewService/service.ts (example path)
import { ServiceClass } from '@rocket.chat/core-services';

class MyNewService extends ServiceClass {
    protected name = 'MyNewService';

    async created(): Promise<void> {
        console.log('MyNewService: created!');
    }

    async started(): Promise<void> {
        console.log('MyNewService: started!');
        // Your service's startup logic here
    }

    async stopped(): Promise<void> {
        console.log('MyNewService: stopped!');
        // Your service's cleanup logic here
    }

    public myCustomMethod(message: string): string {
        return `MyNewService received: ${message}`;
    }
}

// In apps/meteor/server/services/startup.ts
import { MyNewService } from './MyNewService/service'; // Adjust import path

export const registerServices = async (): Promise<void> => {
    // ... other service registrations
    api.registerService(new MyNewService());
    // ...
};
```


**Call Chain:**

1.  **`apps/meteor/server/services/startup.ts`** (`registerServices`): This function is responsible for instantiating and registering all server-side services.
2.  **`packages/core-services/src/lib/Api.ts`** (`api.registerService`): The `api` object (an instance of `Api`) provides the `registerService` method, which acts as an intermediary.
3.  **`packages/core-services/src/LocalBroker.ts`** (`broker.createService`): The `Api` then delegates the actual service creation and registration to the `LocalBroker`, which manages the lifecycle and method exposure of all services.
4.  **Your new `ServiceClass` instance**: The `LocalBroker` then interacts with your service instance, calling its lifecycle methods and making its public methods available for inter-service communication via the broker.

## Tool Calls (7 calls, 45,164 tokens)

**Step 1:** `search({"query":"ServiceClass","layer":"server"})` → 99 tokens
**Step 2:** `implement({"symbolName":"ServiceClass","filename":"packages/core-services/src/types/ServiceClass.ts"})` → 582 tokens
**Step 3:** `search({"query":"LocalBroker","layer":"packages"})` → 97 tokens
**Step 4:** `implement({"symbolName":"LocalBroker","filename":"packages/core-services/src/LocalBroker.ts"})` → 1674 tokens
**Step 5:** `graph({"depth":2,"query":"createService","filename":"packages/core-services/src/LocalBroker.ts","direction)` → 263 tokens
**Step 6:** `implement({"filename":"apps/meteor/server/services/startup.ts","symbolName":"registerServices"})` → 499 tokens
**Step 7:** `implement({"filename":"packages/core-services/src/lib/Api.ts","symbolName":"Api"})` → 498 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 1/4 |
| Tool calls | 7 |
| Total tokens | 45,164 |
