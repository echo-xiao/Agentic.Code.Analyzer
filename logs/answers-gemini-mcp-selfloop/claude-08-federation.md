# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

Federation messages are sent across different servers in Rocket.Chat through the following flow:

**Outgoing Messages:**

1.  **`FederationMatrix.sendMessage()`**: This is the initial call for sending a message. (File: `ee/packages/federation-matrix/src/FederationMatrix.ts`)
2.  **`federationSDK.sendMessage()`**: The message is then passed to the federation SDK.
3.  **Matrix protocol HTTP API**: Finally, the federation SDK uses the Matrix protocol HTTP API to send the message to the remote server.

**Incoming Messages:**

1.  **`PUT /_matrix/federation/v1/send/:txnId`**: Incoming federation messages are received via this HTTP endpoint.
2.  **`federationSDK.processIncomingTransaction()`**: The federation SDK processes the incoming transaction.
3.  **Event Emitter**: The SDK dispatches events by type using an event emitter.
4.  **Event Listeners**: Event listeners (e.g., `'homeserver.matrix.message'`) process the events and persist the data to the local database.

The federation functionality is primarily located in the `ee/packages/federation-matrix/` directory and utilizes an event-driven architecture internally.

## Tool Calls (8 calls, 15,459 tokens)

**Step 1:** `plan({"intent":"call-chain","question":"How are federation messages sent across different servers in Rock)` → 81 tokens
**Step 2:** `search({"query":"sendFederationMessage"})` → 27 tokens
**Step 3:** `search({"query":"federation message"})` → 27 tokens
**Step 4:** `search({"query":"federation outbound"})` → 27 tokens
**Step 5:** `search({"query":"Federation"})` → 564 tokens
**Step 6:** `graph({"layer":"ee","move":"down","depth":5,"query":"FederationMatrix.sendMessage"})` → 17 tokens
**Step 7:** `search({"layer":"ee","query":"FederationMatrix"})` → 221 tokens
**Step 8:** `graph({"depth":5,"move":"down","query":"FederationMatrix.sendMessage","file":"/Users/echoooooo/Desktop/cod)` → 17 tokens

## Files Seen In Tool Results (18)

- `packages/core-services/src/index.ts`
- `packages/rest-typings/src/v1/federation/rooms.ts`
- `packages/rest-typings/src/v1/federation/index.ts`
- `packages/rest-typings/src/v1/federation/FederationVerifyMatrixIdProps.ts`
- `packages/rest-typings/src/v1/federation/FederationRemoveServerProps.ts`
- `packages/rest-typings/src/v1/federation/FederationPublicRoomsProps.ts`
- `packages/rest-typings/src/v1/federation/FederationJoinExternalPublicRoomProps.ts`
- `packages/rest-typings/src/v1/federation/FederationAddServerProps.ts`
- `packages/models/src/models/FederationRoomEvents.ts`
- `packages/models/src/models/FederationKeys.ts`
- `packages/models/src/models/FederationEvents.ts`
- `packages/model-typings/src/models/IFederationRoomEventsModel.ts`
- `packages/model-typings/src/models/IFederationKeysModel.ts`
- `packages/core-typings/src/IMatrixFederationStatistics.ts`
- `packages/core-typings/src/federation/index.ts`
- `packages/core-typings/src/federation/v1/index.ts`
- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `packages/core-services/src/types/IFederationMatrixService.ts`
