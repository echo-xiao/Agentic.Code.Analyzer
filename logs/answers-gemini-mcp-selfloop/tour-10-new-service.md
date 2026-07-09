# How do you add a new service in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

To add a new service in Rocket.Chat, you generally follow these steps: define a service class that adheres to the `IServiceClass` interface, and then register an instance of this class using the `api.registerService()` method.

Here's a detailed breakdown of the process:

**1. Define the Service Class**

Create a new class that implements the `IServiceClass` interface. This interface, defined in `packages/core-services/src/types/ServiceClass.ts`, outlines the essential methods your service must provide.

*   **`getName(): string`**: This method should return a unique name for your service.
*   **`setApi(api: IApiService): void`**: This method is crucial as it provides your service with an instance of the `IApiService`. Through this `api` object, your service can interact with other services, emit events, and access system settings.
*   **`created(): Promise<void>`**: A lifecycle hook that is called when the service is created. Use this for initial setup.
*   **`started(): Promise<void>`**: Another lifecycle hook, called when the service is started. This is where your service should begin its main operations.
*   **`stopped(): Promise<void>`**: A lifecycle hook called when the service is stopped, allowing for cleanup.

Your service class will contain the core logic and functionality of your new service.

**2. Register the Service Instance**

Once your service class is defined, you need to create an instance of it and register it with the Rocket.Chat system. The registration is handled by the `api.registerService()` method, which is part of the `Api` class defined in `packages/core-services/src/lib/Api.ts`.

The `registerService` method has the following signature:
`registerService(instance: IServiceClass, serviceDependencies?: string[]): void`

*   **`instance: IServiceClass`**: This is the instance of your service class that you want to register.
*   **`serviceDependencies?: string[]`**: An optional array of strings representing other services that your service depends on. This is particularly relevant in a microservices architecture.

**Registration Flow:**

*   The `api.registerService()` method adds your service instance to an internal collection of services.
*   It then calls `instance.setApi(this)` on your service instance, injecting the `IApiService` object.
*   If Rocket.Chat is running in a microservices environment (e.g., Enterprise Edition with Moleculer), the method will also call `this.broker.createService(instance, serviceDependencies)` to integrate your service with the Moleculer broker.

**3. Choose the Registration Location**

The location where you register your service depends on whether you are adding a service to the monolithic Meteor application or as a standalone microservice (typically for Enterprise Edition features).

*   **For Monolithic Deployments:**
    *   **File:** `apps/meteor/server/services/startup.ts`
    *   **Action:** Import your new service class into this file and add a line to register it:
        
```typescript
        import { MyNewService } from './path/to/myNewService'; // Adjust path as needed
        // ... other service registrations
        api.registerService(new MyNewService());
        ```


*   **For Microservices Deployments (Enterprise Edition):**
    *   **File:** You would typically create a new `service.ts` file within your dedicated microservice application (e.g., `ee/apps/my-new-service/src/service.ts`).
    *   **Action:** In this file, you would set up the Moleculer broker (if not already configured) and then register your service:
        
```typescript
        import { api } from '@rocket.chat/core-services';
        import { startBroker } from './broker'; // Assuming you have a broker setup
        import { MyNewService } from './myNewService'; // Adjust path as needed

        api.setBroker(startBroker());
        api.registerService(new MyNewService());
        ```


By following these steps, you can successfully add a new service to the Rocket.Chat ecosystem.

## Tool Calls (8 calls, 23,588 tokens)

**Step 1:** `wiki({"question":"How do you add a new service in Rocket.Chat?"})` → 860 tokens
**Step 2:** `search({"query":"api.registerService"})` → 328 tokens
**Step 3:** `graph({"file":"startup.ts","move":"down","depth":2,"query":"api.registerService"})` → 15 tokens
**Step 4:** `search({"layer":"server","query":"registerService"})` → 101 tokens
**Step 5:** `details({"symbolName":"api","filename":"startup.ts"})` → 54 tokens
**Step 6:** `details({"filename":"api.ts","symbolName":"Api.registerService"})` → 102 tokens
**Step 7:** `search({"query":"IServiceClass"})` → 70 tokens
**Step 8:** `details({"filename":"ServiceClass.ts","symbolName":"IServiceClass"})` → 276 tokens

## Files Seen In Tool Results (15)

- `apps/meteor/server/services/startup.ts`
- `apps/meteor/ee/server/startup/services.ts`
- `ee/apps/authorization-service/src/service.ts`
- `ee/apps/omnichannel-transcript/src/service.ts`
- `ee/apps/account-service/src/service.ts`
- `ee/apps/ddp-streamer/src/service.ts`
- `ee/apps/presence-service/src/service.ts`
- `ee/apps/queue-worker/src/service.ts`
- `apps/meteor/app/search/server/search.internalService.ts`
- `apps/meteor/ee/server/startup/federation.ts`
- `apps/meteor/app/custom-oauth/server/custom_oauth_server.js`
- `apps/meteor/app/apple/server/appleOauthRegisterService.ts`
- `packages/core-services/src/api.ts`
- `packages/core-services/src/lib/Api.ts`
- `packages/core-services/src/types/ServiceClass.ts`
