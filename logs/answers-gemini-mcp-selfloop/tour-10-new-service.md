# How do you add a new service in Rocket.Chat?

## Gemini Answer

To add a new service in Rocket.Chat, you generally follow these steps:

1.  **Define your Service Class**: Create a new class for your service that extends `ServiceClassInternal` (for services within the main Rocket.Chat monolith) or `ServiceClass` (for standalone microservices). An example of this can be seen in `apps/meteor/server/services/user/service.ts`, where `UserService` extends `ServiceClassInternal`.

2.  **Register the Service**: The service needs to be registered with the system's service broker. This is typically done by calling `Api.registerService()`.

The call chain for service registration generally looks like this:

`YourServiceFile` (e.g., `ee/apps/queue-worker/src/service.ts`) → `Api.registerService` (in `packages/core-services/src/lib/Api.ts`) → `LocalBroker.createService` (in `packages/core-services/src/LocalBroker.ts`) → `LocalBroker.start` (in `packages/core-services/src/LocalBroker.ts`) → `LocalBroker.startService` (in `packages/core-services/src/LocalBroker.ts`).

Key files involved:

*   `packages/core-services/src/lib/Api.ts`: Contains the `Api` object, which includes the `registerService` method.
*   `packages/core-services/src/LocalBroker.ts`: Manages the lifecycle of services, including `createService`, `start`, and `startService`.
*   `apps/meteor/server/services/user/service.ts`: An example of a service implementation (`UserService`) extending `ServiceClassInternal`.
*   `ee/apps/*/src/service.ts`: Examples of how individual services are defined and likely registered (e.g., `ee/apps/queue-worker/src/service.ts`).

## Tool Calls (8 calls, 43,471 tokens)

**Step 1:** `search({"query":"add service","layer":"server"})` → 274 tokens
**Step 2:** `search({"query":"service","layer":"packages"})` → 897 tokens
**Step 3:** `graph({"direction":"up","query":"startService","file":"packages/core-services/src/LocalBroker.ts"})` → 954 tokens
**Step 4:** `implement({"symbolName":"UserService","filename":"apps/meteor/server/services/user/service.ts"})` → 128 tokens
**Step 5:** `implement({"filename":"apps/meteor/server/services/user/service.ts","symbolName":"service"})` → 182 tokens
**Step 6:** `implement({"filename":"apps/meteor/server/services/meteor/service.ts","symbolName":"service"})` → 182 tokens
**Step 7:** `implement({"filename":"ee/apps/queue-worker/src/service.ts","symbolName":"default"})` → 15 tokens
**Step 8:** `search({"query":"Api.registerService"})` → 16 tokens

## Files Seen In Tool Results (53)

- `apps/meteor/server/lib/oauth/addOAuthService.ts`
- `apps/meteor/app/meteor-accounts-saml/server/lib/settings.ts`
- `apps/meteor/app/lib/server/methods/addOAuthService.ts`
- `apps/meteor/app/importer/server/classes/converters/UserConverter.ts`
- `apps/meteor/app/meteor-accounts-saml/server/lib/ServiceProvider.ts`
- `apps/meteor/server/services/room/hooks/BeforeFederationActions.ts`
- `apps/meteor/app/livechat/server/lib/AnalyticsTyped.ts`
- `packages/models/src/models/Users.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `ee/apps/queue-worker/src/service.ts`
- `ee/apps/presence-service/src/service.ts`
- `ee/apps/omnichannel-transcript/src/service.ts`
- `ee/apps/ddp-streamer/src/service.ts`
- `ee/apps/authorization-service/src/service.ts`
- `ee/apps/account-service/src/service.ts`
- `apps/meteor/server/services/meteor/service.ts`
- `packages/core-services/src/lib/Api.ts`
- `packages/core-typings/src/omnichannel/sms.ts`
- `ee/packages/abac/src/index.ts`
- `packages/media-signaling/src/lib/Call.ts`
- `apps/meteor/client/lib/loginServices.ts`
- `apps/meteor/server/services/user/service.ts`
- `apps/meteor/server/services/omnichannel-integrations/service.ts`
- `apps/meteor/server/services/room/service.ts`
- `apps/meteor/server/services/push/service.ts`
- `packages/media-signaling/src/definition/call/IClientMediaCall.ts`
- `packages/core-services/src/LocalBroker.ts`
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
- `ee/packages/network-broker/src/NetworkBroker.ts`
- `apps/meteor/ee/server/local-services/instance/service.ts`
- `packages/ui-voip/src/hooks/useTonePlayer.ts`
- `packages/tracing/src/index.ts`
- `packages/instance-status/src/index.ts`
- `packages/ddp-client/src/TimeoutControl.ts`
- `packages/apps-engine/src/server/runtime/deno/LivenessManager.ts`
- `ee/packages/federation-matrix/src/events/index.ts`
- `ee/apps/ddp-streamer/src/Client.ts`
- `ee/apps/ddp-streamer/src/DDPStreamer.ts`
- `packages/cron/src/index.ts`
