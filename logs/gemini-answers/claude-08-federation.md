# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

Federation messages are sent across different servers in Rocket.Chat through the `FederationMatrix` service, which handles the communication with the Matrix protocol.

Here's the call chain:

`FederationMatrix.sendMessage()` in `ee/packages/federation-matrix/src/FederationMatrix.ts` is the entry point for sending messages. This method determines whether the message contains files or is a text message.

1.  **`FederationMatrix.sendMessage`** (`ee/packages/federation-matrix/src/FederationMatrix.ts`)
    *   If the message has files, it calls `this.handleFileMessage()`.
    *   If it's a text message, it calls `this.handleTextMessage()`.
2.  **`FederationMatrix.handleTextMessage`** (`ee/packages/federation-matrix/src/FederationMatrix.ts`)
    *   This method prepares the message for the Matrix protocol by calling `toExternalMessageFormat()`.
    *   It also handles threaded messages and quoted messages by calling `this.handleThreadedMessage()` and `this.handleQuoteMessage()` respectively.
    *   Finally, it calls `federationSDK.sendMessage()` to send the message to the Matrix network.

The `federationSDK` is responsible for interacting with the Matrix protocol's HTTP API to send messages to remote servers. This indicates an event-driven architecture for incoming messages, where the `PUT /_matrix/federation/v1/send/:txnId` endpoint is the entry point, leading to `federationSDK.processIncomingTransaction()` which dispatches events to listeners like `'homeserver.matrix.message'` for persistence in the local database.

## Tool Calls (8 calls, 35,842 tokens)

**Step 1:** `search({"query":"federation send message","layer":"server"})` → 73 tokens
**Step 2:** `search({"layer":"server","query":"federation message"})` → 183 tokens
**Step 3:** `graph({"query":"saveMessageFromFederation","layer":"server","direction":"down"})` → 725 tokens
**Step 4:** `implement({"filename":"ee/packages/federation-matrix/lib/FederationMatrix.ts","symbolName":"FederationMatrix.s)` → 274 tokens
**Step 5:** `graph({"layer":"ee","query":"FederationMatrix.handleTextMessage","direction":"down"})` → 18 tokens
**Step 6:** `implement({"symbolName":"FederationMatrix","filename":"ee/packages/federation-matrix/src/FederationMatrix.ts"})` → 1188 tokens
**Step 7:** `implement({"filename":"ee/packages/federation-matrix/src/FederationMatrix.ts","symbolName":"FederationMatrix.h)` → 240 tokens
**Step 8:** `search({"query":"federationSDK","layer":"ee"})` → 14 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 3/5 |
| Tool calls | 8 |
| Total tokens | 35,842 |
| Pass | NO |
