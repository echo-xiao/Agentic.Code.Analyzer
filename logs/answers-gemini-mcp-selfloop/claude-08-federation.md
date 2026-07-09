# How are federation messages sent across different servers in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

Federation messages are sent across different Rocket.Chat servers primarily through the **Matrix protocol**, facilitated by the `FederationMatrix` service.

Here's the call chain for sending a message:

1.  **`afterSaveMessage` callback** (located in `apps/meteor/ee/server/hooks/federation/index.ts`): This callback is triggered when a message is saved in Rocket.Chat. It checks if the room is federated and if the message is not an incoming federated message (to prevent loops).
2.  **`FederationMatrix.sendMessage`** (located in `ee/packages/federation-matrix/src/FederationMatrix.ts`): If the conditions in the `afterSaveMessage` callback are met, this method is called. It determines if the message contains files or is a plain text message.
3.  **`FederationMatrix.handleFileMessage`** or **`FederationMatrix.handleTextMessage`** (both in `ee/packages/federation-matrix/src/FederationMatrix.ts`):
    *   If the message has files, `handleFileMessage` is called.
    *   If it's a text message, `handleTextMessage` is called. This method prepares the message for the Matrix protocol, including handling threaded messages and quotes.
4.  **`federationSDK.sendMessage`**: Within `handleTextMessage` (and presumably `handleFileMessage`), the `federationSDK.sendMessage` function is ultimately called. This SDK is responsible for formatting and sending the message to the remote Matrix Homeserver via HTTPS.

After the message is successfully sent to Matrix, the `FederationMatrix.sendMessage` method updates the local Rocket.Chat message with the `eventId` received from the Matrix network.

## Tool Calls (8 calls, 37,719 tokens)

**Step 1:** `wiki({"question":"How does federation work in Rocket.Chat?"})` → 1285 tokens
**Step 2:** `plan({"question":"How are federation messages sent across different servers in Rocket.Chat?","intent":"call-chain"})` → 940 tokens
**Step 3:** `search({"query":"FederationMatrix.sendMessage","layer":"ee"})` → 94 tokens
**Step 4:** `search({"query":"FederationMatrix","layer":"packages"})` → 121 tokens
**Step 5:** `details({"symbolName":"FederationMatrix.sendMessage","filename":"FederationMatrix.ts"})` → 270 tokens
**Step 6:** `details({"filename":"FederationMatrix.ts","symbolName":"FederationMatrix.handleTextMessage"})` → 235 tokens
**Step 7:** `details({"filename":"FederationMatrix.ts","symbolName":"federationSDK"})` → 17 tokens
**Step 8:** `details({"filename":"FederationMatrix.ts","symbolName":"FederationMatrix"})` → 1182 tokens

## Files Seen In Tool Results (7)

- `apps/meteor/server/settings/federation.ts`
- `apps/meteor/ee/server/startup/federation.ts`
- `apps/meteor/ee/server/hooks/federation/index.ts`
- `packages/i18n/src/locales/en.i18n.js`
- `packages/core-services/src/index.ts`
- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `packages/core-services/src/types/IFederationMatrixService.ts`
