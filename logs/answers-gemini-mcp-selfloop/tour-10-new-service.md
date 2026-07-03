# How do you add a new service in Rocket.Chat?

## Plan

intent: pattern

## Gemini Answer

Adding a new service in Rocket.Chat involves creating a class that extends `ServiceClassInternal` (for monolith services) or `ServiceClass` (for general services) and then registering it.

Here's a breakdown of the process and key components:

**1. Service Class Definition:**

*   **`ServiceClass`** (packages/core-services/src/types/ServiceClass.ts): This is the base class for all services.
*   **`ServiceClassInternal`** (packages/core-services/src/types/ServiceClass.ts): This extends `ServiceClass` and is used for internal services within the Rocket.Chat monolith. It sets an `internal` flag to `true`.

**Example:**

The `LDAPEEService` (apps/meteor/ee/server/local-services/ldap/service.ts) provides a concrete example of how to define a new service. It extends `ServiceClassInternal` and defines its methods:


```typescript
class LDAPEEService extends ServiceClassInternal implements ILDAPEEService {
  protected name = 'ldap-enterprise';
  async sync(): Promise<void> { /* ... */ }
  // ... other methods
}
```


**2. Service Registration:**

Services are registered using the `registerService` function, which is found in `packages/core-services/src/lib/Api.ts`. This function is responsible for making the service's methods available through the `LocalBroker`.

**Flow for adding a new service:**

1.  **Define your service class:** Create a new class that extends either `ServiceClass` or `ServiceClassInternal`, depending on whether it's an internal monolith service or a more general service.
2.  **Implement your service methods:** Add the desired functionality as methods within your service class.
3.  **Register your service:** Use the `registerService` function to make your service available to the Rocket.Chat system.

**Key Files:**

*   **`packages/core-services/src/types/ServiceClass.ts`**: Defines the base `ServiceClass` and `ServiceClassInternal`.
*   **`packages/core-services/src/lib/Api.ts`**: Contains the `registerService` function, which is crucial for making services available.
*   **`apps/meteor/ee/server/local-services/ldap/service.ts`**: A concrete example of a service implementation (`LDAPEEService`).

## Tool Calls (8 calls, 18,309 tokens)

**Step 1:** `plan({"intent":"pattern","question":"How do you add a new service in Rocket.Chat?"})` → 199 tokens
**Step 2:** `search({"query":"ServiceClass"})` → 69 tokens
**Step 3:** `graph({"file":"ServiceClass.ts","query":"ServiceClass","move":"expand","depth":1})` → 315 tokens
**Step 4:** `details({"filename":"Api.ts","symbolName":"registerService"})` → 78 tokens
**Step 5:** `details({"symbolName":"ExtendedServiceClass","filename":"LocalBroker.ts"})` → 68 tokens
**Step 6:** `details({"filename":"service.ts","symbolName":"LDAPEEService"})` → 200 tokens
**Step 7:** `details({"filename":"ServiceClass.ts","symbolName":"ServiceClassInternal"})` → 67 tokens
**Step 8:** `search({"query":"registerService","layer":"packages"})` → 96 tokens

## Files Seen In Tool Results (15)

- `packages/core-services/src/types/ServiceClass.ts`
- `packages/core-services/src/LocalBroker.ts`
- `apps/meteor/client/lib/loginServices.ts`
- `packages/core-services/src/lib/Api.ts`
- `apps/meteor/ee/server/local-services/ldap/service.ts`
- `apps/meteor/ee/app/settings/server/settings.internalService.ts`
- `apps/meteor/ee/server/local-services/message-reads/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/services/omnichannel.internalService.ts`
- `apps/meteor/ee/app/license/server/license.internalService.ts`
- `packages/models/src/models/BaseRaw.ts`
- `apps/meteor/ee/server/local-services/instance/service.ts`
- `packages/ddp-client/src/types/Account.ts`
- `ee/packages/abac/src/index.ts`
- `apps/meteor/app/custom-oauth/server/custom_oauth_server.js`
- `apps/meteor/app/apple/server/appleOauthRegisterService.ts`
