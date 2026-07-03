# How are federation messages sent across different servers in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

Federation messages in Rocket.Chat are sent across different servers through the `FederationMatrix` service, specifically via the `sendMessage` method.

Here's the call chain for sending a message:

1.  **Entry Point:** `FederationMatrix.sendMessage` (ee/packages/federation-matrix/src/FederationMatrix.ts)
    *   This method determines if the message contains files or is a plain text message.
    *   It then calls either `handleFileMessage` or `handleTextMessage`.
2.  **Message Handling:** `FederationMatrix.handleTextMessage` (ee/packages/federation-matrix/src/FederationMatrix.ts)
    *   This method prepares the message for the Matrix protocol by converting it to an external message format using `toExternalMessageFormat`.
    *   It also handles threaded messages and quoted messages by calling `handleThreadedMessage` and `handleQuoteMessage` respectively.
    *   Finally, it uses `federationSDK.sendMessage` to send the message to the Matrix server.

The `federationSDK.sendMessage` is the ultimate step in sending the message, which interacts with the Matrix protocol HTTP API to deliver the message to the remote server.

## Tool Calls (8 calls, 22,403 tokens)

**Step 1:** `plan({"question":"How are federation messages sent across different servers in Rocket.Chat?","intent":"call-chain"})` → 210 tokens
**Step 2:** `search({"query":"FederationMatrix","layer":"ee"})` → 101 tokens
**Step 3:** `graph({"query":"FederationMatrix.sendMessage","file":"FederationMatrix.ts","move":"down","depth":5})` → 17 tokens
**Step 4:** `search({"layer":"ee","query":"federationSDK"})` → 25 tokens
**Step 5:** `details({"filename":"FederationMatrix.ts","symbolName":"FederationMatrix"})` → 1193 tokens
**Step 6:** `graph({"depth":5,"move":"down","file":"FederationMatrix.ts","query":"FederationMatrix.sendMessage"})` → 17 tokens
**Step 7:** `details({"symbolName":"FederationMatrix.sendMessage","filename":"FederationMatrix.ts"})` → 270 tokens
**Step 8:** `details({"symbolName":"FederationMatrix.handleTextMessage","filename":"FederationMatrix.ts"})` → 235 tokens

## Files Seen In Tool Results (2)

- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `packages/core-services/src/types/IFederationMatrixService.ts`
