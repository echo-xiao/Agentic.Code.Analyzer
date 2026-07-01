# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

Federation messages in Rocket.Chat are sent across different servers primarily through the **FederationMatrix** service, which leverages the Matrix protocol.

Here's the breakdown of the process:

**Outgoing Messages:**

1.  **`FederationMatrix.sendMessage()`**: This is the entry point for sending messages. It's a proxified service defined in `packages/core-services/src/index.ts`.
2.  **`federationSDK.sendMessage()`**: The `FederationMatrix` service, implemented in `ee/packages/federation-matrix/src/FederationMatrix.ts`, internally calls `federationSDK.sendMessage()`.
3.  **Matrix Protocol HTTP API**: The `federationSDK` then uses the Matrix protocol's HTTP API to send the message to the remote server.

**Incoming Messages:**

1.  **`PUT /_matrix/federation/v1/send/:txnId`**: Incoming federation messages are received via a PUT request to this endpoint.
2.  **`federationSDK.processIncomingTransaction()`**: This function processes the incoming transaction.
3.  **Event Emitter**: The `federationSDK` dispatches events based on the message type.
4.  **Event Listeners**: Specific event listeners (e.g., for `'homeserver.matrix.message'`) process these events and persist the messages to the local database.

**Key Files and Their Roles:**

*   `packages/core-services/src/index.ts`: Defines the `FederationMatrix` service as a proxified service.
*   `packages/core-services/src/types/IFederationMatrixService.ts`: Defines the interface for the `FederationMatrix` service.
*   `ee/packages/federation-matrix/src/FederationMatrix.ts`: Contains the actual implementation of the `FederationMatrix` service, including the logic for sending and processing federation messages using the `federationSDK`.
*   `apps/meteor/ee/server/api/federation.ts`: Likely contains the API endpoints for federation, including the incoming message endpoint.

**Call Chain:**

`FederationMatrix.sendMessage()` (packages/core-services/src/index.ts) → `federationSDK.sendMessage()` (ee/packages/federation-matrix/src/FederationMatrix.ts) → Matrix protocol HTTP API.

## Tool Calls (8 calls, 35,039 tokens)

**Step 1:** `search({"query":"federation message send","layer":"server"})` → 326 tokens
**Step 2:** `graph({"direction":"down","layer":"server","file":"packages/models/src/models/Messages.ts","query":"findLa)` → 324 tokens
**Step 3:** `graph({"layer":"server","direction":"down","query":"notifyOnMessageChange","file":"apps/meteor/app/lib/ser)` → 371 tokens
**Step 4:** `search({"query":"federation","layer":"server"})` → 671 tokens
**Step 5:** `graph({"file":"packages/core-services/src/index.ts","query":"FederationMatrix.sendMessage","direction":"do)` → 17 tokens
**Step 6:** `search({"layer":"ee","query":"federationSDK.sendMessage"})` → 17 tokens
**Step 7:** `implement({"filename":"packages/core-services/src/index.ts","symbolName":"FederationMatrix"})` → 68 tokens
**Step 8:** `search({"layer":"ee","query":"IFederationMatrixService"})` → 273 tokens

## Files Seen In Tool Results (36)

- `packages/models/src/models/Messages.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/ee/server/models/raw/LivechatUnit.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/app/lib/server/functions/deleteMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/mentions/server/Mentions.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/setPredictedVisitorAbandonmentTime.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
- `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts`
- `apps/meteor/ee/server/api/federation.ts`
- `packages/apps-engine/src/server/managers/AppSignatureManager.ts`
- `packages/core-services/src/index.ts`
- `packages/core-typings/src/federation/v1/FederationKey.ts`
- `packages/models/src/index.ts`
- `apps/meteor/ee/server/startup/federation.ts`
- `apps/meteor/tests/e2e/federation/page-objects/channel.ts`
- `apps/meteor/tests/e2e/federation/page-objects/fragments/home-sidenav.ts`
- `apps/meteor/server/services/federation/utils.ts`
- `apps/meteor/server/lib/ldap/Manager.ts`
- `packages/apps-engine/src/server/bridges/IInternalFederationBridge.ts`
- `apps/meteor/tests/unit/server/services/room/hooks/FederationActions.tests.ts`
- `apps/meteor/server/settings/federation.ts`
- `apps/meteor/server/settings/federation-service.ts`
- `apps/meteor/server/services/room/hooks/BeforeFederationActions.ts`
- `apps/meteor/server/services/messages/hooks/BeforeFederationActions.ts`
- `apps/meteor/server/services/federation/Settings.ts`
- `apps/meteor/server/services/federation/infrastructure/rocket-chat/adapters/Statistics.ts`
- `apps/meteor/ee/server/hooks/federation/index.ts`
- `apps/meteor/app/lib/server/methods/checkFederationConfiguration.ts`
- `apps/meteor/app/apps/server/bridges/internalFederation.ts`
- `packages/core-services/src/types/IFederationMatrixService.ts`
- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `packages/core-services/src/types/ServiceClass.ts`
