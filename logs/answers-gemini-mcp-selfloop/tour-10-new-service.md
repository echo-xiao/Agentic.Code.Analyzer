# How do you add a new service in Rocket.Chat?

## Gemini Answer

To add a new service in Rocket.Chat, you generally follow this pattern:

1.  **Extend `ServiceClass`**: Your new service class should extend `ServiceClass` from `packages/core-services/src/types/ServiceClass.ts`. This provides the basic structure and methods for a Rocket.Chat service, including event handling and settings management.

2.  **Define Service Name**: Within your service class, you'll define a `protected name: string;` property to identify your service.

3.  **Implement Lifecycle Methods**: You can override the `created()`, `started()`, and `stopped()` methods to handle initialization, startup logic, and shutdown procedures for your service.

4.  **Register Events and Settings**: Use `onEvent()` to subscribe to events from other services and `onSettingChanged()` to react to changes in Rocket.Chat settings. You can also `emit()` your own events.

**Example:**

While a full example of adding a new service wasn't directly provided by the tools, the `UserService` in `apps/meteor/server/services/user/service.ts` serves as a good reference for how a service is structured and implemented. It would extend `ServiceClass` and implement its specific logic for user-related operations.

**Key Files:**

*   **`packages/core-services/src/types/ServiceClass.ts`**: This file defines the base `ServiceClass` that all new services should extend. It provides the core functionality and lifecycle methods for a service.
*   **`apps/meteor/server/services/user/service.ts`**: This file contains the `UserService`, which is a concrete example of a service implementation within the Rocket.Chat codebase. You can refer to this file to understand how to structure your new service.

## Tool Calls (8 calls, 26,298 tokens)

**Step 1:** `plan({"question":"How do you add a new service in Rocket.Chat?","intent":"pattern"})` → 80 tokens
**Step 2:** `search({"query":"service"})` → 692 tokens
**Step 3:** `graph({"depth":1,"move":"expand","file":"ee/apps/account-service/src/service.ts","query":"service"})` → 396 tokens
**Step 4:** `details({"filename":"packages/core-services/src/types/ServiceClass.ts","symbolName":"ServiceClass"})` → 395 tokens
**Step 5:** `details({"filename":"ee/apps/account-service/src/service.ts","symbolName":"service"})` → 181 tokens
**Step 6:** `search({"query":"AccountService"})` → 26 tokens
**Step 7:** `details({"filename":"ee/apps/account-service/src/service.ts","symbolName":""})` → 8 tokens
**Step 8:** `search({"query":"UserService"})` → 93 tokens

## Files Seen In Tool Results (35)

- `ee/apps/queue-worker/src/service.ts`
- `ee/apps/presence-service/src/service.ts`
- `ee/apps/omnichannel-transcript/src/service.ts`
- `ee/apps/ddp-streamer/src/service.ts`
- `ee/apps/authorization-service/src/service.ts`
- `ee/apps/account-service/src/service.ts`
- `apps/meteor/server/services/meteor/service.ts`
- `packages/web-ui-registration/src/LoginServicesButton.tsx`
- `packages/web-ui-registration/src/LoginServices.tsx`
- `packages/ui-contexts/src/hooks/useLoginWithService.ts`
- `packages/ui-contexts/src/hooks/useLoginServices.ts`
- `packages/models/src/models/LoginServiceConfiguration.ts`
- `packages/model-typings/src/models/IOmnichannelServiceLevelAgreementsModel.ts`
- `packages/model-typings/src/models/ILoginServiceConfigurationModel.ts`
- `packages/media-signaling/src/lib/services/states.ts`
- `packages/media-signaling/src/lib/services/webrtc/index.ts`
- `packages/media-signaling/src/lib/services/webrtc/Processor.ts`
- `packages/media-signaling/src/lib/services/webrtc/Negotiation.ts`
- `packages/media-signaling/src/definition/services/negotiation.ts`
- `packages/media-signaling/src/definition/services/index.ts`
- `packages/media-signaling/src/definition/services/MediaStreamFactory.ts`
- `packages/media-signaling/src/definition/services/IServiceProcessorFactoryList.ts`
- `apps/meteor/client/lib/loginServices.ts`
- `apps/meteor/server/services/user/service.ts`
- `ee/packages/abac/src/index.ts`
- `apps/meteor/server/services/room/service.ts`
- `apps/meteor/server/services/push/service.ts`
- `packages/core-typings/src/omnichannel/sms.ts`
- `packages/media-signaling/src/lib/Call.ts`
- `apps/meteor/server/services/omnichannel-integrations/service.ts`
- `apps/meteor/ee/app/license/server/license.internalService.ts`
- `packages/core-services/src/types/ServiceClass.ts`
- `packages/core-typings/src/IUser.ts`
- `packages/media-signaling/src/definition/call/IClientMediaCall.ts`
- `packages/core-services/src/types/IUserService.ts`
