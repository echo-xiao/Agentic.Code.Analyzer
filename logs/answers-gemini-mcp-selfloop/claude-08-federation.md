# How are federation messages sent across different servers in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

Rocket.Chat's Matrix Federation implementation enables cross-server communication. The process for sending federation messages across different servers involves the following steps:

1.  **Federation Service Initialization**: The federation service is started by `startFederationService` located in `apps/meteor/ee/server/startup/federation.ts`. This function is responsible for setting up the necessary components for federation.

2.  **Route Registration**: As part of the federation service startup, `registerFederationRoutes` (defined in `apps/meteor/ee/server/api/federation.ts`) is called. This function registers the Matrix federation API routes with the Rocket.Chat server.

3.  **Matrix Federation Routes**: The `registerFederationRoutes` function utilizes `getFederationRoutes` (from `ee/packages/federation-matrix/src/api/routes.ts`) to define the various Matrix API endpoints. These routes include:
    *   Key server routes (`getKeyServerRoutes`)
    *   Federation versions routes (`getFederationVersionsRoutes`)
    *   Federation domain allowance middleware (`isFederationDomainAllowedMiddleware`)
    *   Matrix invite routes (`getMatrixInviteRoutes`)
    *   Matrix profiles routes (`getMatrixProfilesRoutes`)
    *   Matrix rooms routes (`getMatrixRoomsRoutes`)
    *   Matrix send join routes (`getMatrixSendJoinRoutes`)
    *   Matrix transactions routes (`getMatrixTransactionsRoutes`)
    *   Matrix media routes (`getMatrixMediaRoutes`)
    *   Matrix send leave routes (`getMatrixSendLeaveRoutes`)
    *   Matrix make leave routes (`getMatrixMakeLeaveRoutes`)

4.  **Transaction Handling**: For sending messages, the `getMatrixTransactionsRoutes` function (found in `ee/packages/federation-matrix/src/api/_matrix/transactions.ts`) defines the `PUT /_matrix/federation/v1/send/{txnId}` endpoint. This endpoint is responsible for processing incoming transactions (which include messages) from other Matrix-compatible servers.

5.  **Processing Incoming Transactions**: When a remote server sends a message, it hits the `PUT /_matrix/federation/v1/send/{txnId}` endpoint. The `federationSDK.processIncomingTransaction(body)` method is then called to handle the incoming message data. This SDK is crucial for cryptographic verification and interaction with external Matrix servers.

In summary, the flow is:
`startFederationService` (apps/meteor/ee/server/startup/federation.ts) → `registerFederationRoutes` (apps/meteor/ee/server/api/federation.ts) → `getFederationRoutes` (ee/packages/federation-matrix/src/api/routes.ts) → `getMatrixTransactionsRoutes` (ee/packages/federation-matrix/src/api/_matrix/transactions.ts) → `federationSDK.processIncomingTransaction` (within the transaction route handler).

## Tool Calls (8 calls, 67,172 tokens)

**Step 1:** `plan({"question":"How are federation messages sent across different servers in Rocket.Chat?","intent":"architecture"})` → 3728 tokens
**Step 2:** `search({"query":"startFederationService","layer":"server"})` → 73 tokens
**Step 3:** `graph({"depth":3,"file":"federation.ts","move":"down","query":"startFederationService"})` → 1181 tokens
**Step 4:** `details({"symbolName":"registerFederationRoutes","filename":"federation.ts"})` → 140 tokens
**Step 5:** `search({"query":"getFederationRoutes"})` → 73 tokens
**Step 6:** `details({"filename":"routes.ts","symbolName":"getFederationRoutes"})` → 250 tokens
**Step 7:** `search({"query":"getMatrixTransactionsRoutes"})` → 80 tokens
**Step 8:** `details({"symbolName":"getMatrixTransactionsRoutes","filename":"transactions.ts"})` → 1107 tokens

## Files Seen In Tool Results (32)

- `apps/meteor/app/message-pin/server/pinMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterReadMessages.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterDeleteRoom.ts`
- `apps/meteor/ee/server/api/chat.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveSpotify.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/server/startup/federation.ts`
- `packages/apps-engine/src/definition/messages/IMessage.ts`
- `apps/meteor/ee/server/hooks/federation/index.ts`
- `apps/meteor/app/message-star/server/starMessage.ts`
- `packages/apps-engine/src/server/logging/AppConsole.ts`
- `ee/packages/federation-matrix/src/helpers/message.parsers.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/ee/server/api/federation.ts`
- `apps/meteor/server/services/federation/utils.ts`
- `apps/meteor/client/startup/slashCommands/federation.ts`
- `apps/meteor/app/apps/server/converters/messages.js`
- `ee/packages/federation-matrix/src/helpers/createOrUpdateFederatedUser.ts`
- `apps/meteor/app/irc/server/irc-bridge/peerHandlers/sentMessage.js`
- `apps/meteor/app/ui/client/lib/CurrentEditingMessage.ts`
- `packages/models/src/models/Messages.ts`
- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `ee/packages/federation-matrix/src/events/message.ts`
- `packages/apps-engine/src/server/accessors/MessageRead.ts`
- `apps/meteor/app/ui-utils/client/lib/messageBox.ts`
- `ee/packages/network-broker/src/NetworkBroker.ts`
- `apps/meteor/app/lib/server/functions/isTheLastMessage.ts`
- `apps/meteor/server/settings/irc.ts`
- `packages/models/src/models/FederationRoomEvents.ts`
- `ee/packages/federation-matrix/src/api/routes.ts`
- `ee/packages/federation-matrix/src/api/_matrix/transactions.ts`
