# How do you add a new service in Rocket.Chat?

## Gemini Answer

To add a new service in Rocket.Chat, you need to create a new class that extends either `ServiceClassInternal` or `ServiceClass`.

Here's a breakdown of the key components and their roles:

*   **`ServiceClass`** (defined in `packages/core-services/src/types/ServiceClass.ts`): This is the base class for all services. It provides fundamental functionalities like event handling (`onEvent`, `emit`), setting listeners (`onSettingChanged`), and lifecycle methods (`created`, `started`, `stopped`).
*   **`ServiceClassInternal`** (defined in `packages/core-services/src/types/ServiceClass.ts`): This class extends `ServiceClass` and is used for internal services within the Rocket.Chat monolith. It sets the `internal` property to `true`. Most services in `apps/meteor/server/services` extend this class (e.g., `UserService` in `apps/meteor/server/services/user/service.ts`).
*   **`LocalBroker`**: Services communicate with each other through a `LocalBroker` (as indicated by the "core-services Bus" pattern). Services do not directly import and call methods from other services. Instead, they use a proxy mechanism (`proxify('IServiceName')`) which then calls `api.call('namespace.method')`. The `LocalBroker` stores methods as `'serviceName.methodName'` and binds them to the respective `ServiceClass` methods.

**Call Chain for Service Implementation:**

1.  **`ServiceClass`** (`packages/core-services/src/types/ServiceClass.ts`): Provides the core structure and methods for a service.
2.  **`ServiceClassInternal`** (`packages/core-services/src/types/ServiceClass.ts`): Extends `ServiceClass` for internal services.
3.  **`UserService`** (example: `apps/meteor/server/services/user/service.ts`): An example of a service that extends `ServiceClassInternal` and implements specific service logic (e.g., `ensureLoginTokensLimit`).

**Steps to add a new service:**

1.  **Create a new service file:** In `apps/meteor/server/services/`, create a new directory and a TypeScript file for your service (e.g., `apps/meteor/server/services/my-new-service/service.ts`).
2.  **Define your service class:** Create a class that extends `ServiceClassInternal` (for internal services) or `ServiceClass` (for standalone services).
    
```typescript
    import { ServiceClassInternal } from '@rocket.chat/core-services';
    import type { IMyNewService } from './IMyNewService'; // Define your service interface

    class MyNewService extends ServiceClassInternal implements IMyNewService {
      protected name = 'my-new-service';

      async myNewMethod(param1: string): Promise<string> {
        // Implement your service logic here
        return `Hello from MyNewService: ${param1}`;
      }
    }
    ```

3.  **Define an interface for your service:** Create an interface (e.g., `IMyNewService.ts`) that defines the methods your service will expose. This is crucial for type safety and for the `proxify` mechanism.
4.  **Register your service:** The service needs to be registered with the `LocalBroker` so it can be discovered and called by other services. This typically happens during the server startup. You can observe how existing services are registered in files like `apps/meteor/ee/server/startup/services.ts` (though the `services` symbol itself is defined in `packages/core-services/src/LocalBroker.ts`).

By following these steps, you can integrate a new service into the Rocket.Chat architecture, leveraging the existing service bus for inter-service communication.

## Tool Calls (8 calls, 71,291 tokens)

**Step 1:** `search({"query":"service","layer":"server"})` → 798 tokens
**Step 2:** `graph({"layer":"server","query":"service","direction":"down","file":"apps/meteor/server/services/meteor/se)` → 2900 tokens
**Step 3:** `implement({"filename":"apps/meteor/ee/server/startup/services.ts","symbolName":"services"})` → 139 tokens
**Step 4:** `implement({"filename":"apps/meteor/server/services/user/service.ts","symbolName":"UserService"})` → 128 tokens
**Step 5:** `search({"layer":"server","query":"ServiceClassInternal"})` → 429 tokens
**Step 6:** `implement({"filename":"packages/core-services/src/types/ServiceClass.ts","symbolName":"ServiceClassInternal"})` → 74 tokens
**Step 7:** `search({"layer":"packages","query":"ServiceClass"})` → 267 tokens
**Step 8:** `implement({"filename":"packages/core-services/src/types/ServiceClass.ts","symbolName":"ServiceClass"})` → 399 tokens

## Files Seen In Tool Results (42)

- `apps/meteor/server/services/meteor/service.ts`
- `apps/meteor/server/services/user/service.ts`
- `apps/meteor/ee/server/startup/services.ts`
- `apps/meteor/server/services/room/service.ts`
- `apps/meteor/server/services/push/service.ts`
- `apps/meteor/server/services/omnichannel-integrations/service.ts`
- `apps/meteor/client/lib/loginServices.ts`
- `ee/packages/abac/src/index.ts`
- `packages/core-typings/src/omnichannel/sms.ts`
- `packages/media-signaling/src/lib/Call.ts`
- `apps/meteor/ee/app/license/server/license.internalService.ts`
- `apps/meteor/tests/unit/server/services/utils.ts`
- `apps/meteor/tests/unit/server/services/user/service.tests.ts`
- `apps/meteor/tests/unit/server/services/team/service.tests.ts`
- `apps/meteor/tests/unit/server/services/room/hooks/FederationActions.tests.ts`
- `apps/meteor/tests/unit/server/services/omnichannel-analytics/mockData.ts`
- `apps/meteor/tests/unit/server/services/omnichannel-analytics/OverviewData.tests.ts`
- `apps/meteor/tests/unit/server/services/omnichannel-analytics/ChartData.tests.ts`
- `apps/meteor/tests/unit/server/services/omnichannel-analytics/AgentData.tests.ts`
- `apps/meteor/tests/unit/server/services/omnichannel/queue.tests.ts`
- `apps/meteor/tests/unit/server/services/nps/spec.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveSpotify.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSavePreventMention.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveMarkdownParser.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveJumpToMessage.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveCheckMAC.tests.ts`
- `packages/core-services/src/LocalBroker.ts`
- `packages/core-services/src/lib/Api.ts`
- `apps/meteor/tests/mocks/server/BrokerMocked.ts`
- `packages/core-services/src/types/ServiceClass.ts`
- `apps/meteor/server/services/apps-engine/service.ts`
- `apps/meteor/server/services/nps/service.ts`
- `apps/meteor/server/services/calendar/service.ts`
- `apps/meteor/server/services/banner/service.ts`
- `apps/meteor/ee/server/local-services/instance/service.ts`
- `apps/meteor/server/services/uikit-core-app/service.ts`
- `apps/meteor/ee/server/local-services/ldap/service.ts`
- `apps/meteor/ee/app/settings/server/settings.internalService.ts`
- `apps/meteor/app/livechat/server/roomAccessValidator.internalService.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `packages/core-services/src/index.ts`
- `packages/ddp-client/src/types/Account.ts`
