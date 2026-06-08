# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

Federation messages in Rocket.Chat are sent across different servers primarily through the `FederationMatrix` service within the `ee/packages/federation-matrix/src/FederationMatrix.ts` file.

Here's the call chain for sending a federation message:

`apps/meteor/ee/server/hooks/federation/index.ts` → `FederationMatrix.sendMessage` → `FederationMatrix.handleTextMessage` → `federationSDK.sendMessage`

1.  **Entry Point:** The process starts when a message is ready to be sent to a federated server. This is handled by a hook in `apps/meteor/ee/server/hooks/federation/index.ts` which calls `FederationMatrix.sendMessage`.
2.  **`FederationMatrix.sendMessage`**: Located in `ee/packages/federation-matrix/src/FederationMatrix.ts`, this method acts as the main entry for sending messages. It determines if the message contains files or is a simple text message.
3.  **`FederationMatrix.handleTextMessage`**: For text messages, `FederationMatrix.sendMessage` delegates to `FederationMatrix.handleTextMessage` (also in `ee/packages/federation-matrix/src/FederationMatrix.ts`). This method prepares the message for the external Matrix format and handles threaded or quoted messages.
4.  **`federationSDK.sendMessage`**: Finally, `FederationMatrix.handleTextMessage` calls `federationSDK.sendMessage`. This `federationSDK` is responsible for the actual communication with the Matrix protocol HTTP API on the remote server to send the message.

After the message is sent, `FederationMatrix.sendMessage` updates the message's `federationEventId` in the local database using `Messages.setFederationEventIdById` from `packages/models/src/models/Messages.ts`.

## Tool Calls (8 calls, 28,985 tokens)

**Step 1:** `search({"query":"federation message send","layer":"server"})` → 73 tokens
**Step 2:** `search({"layer":"server","query":"federation send"})` → 222 tokens
**Step 3:** `search({"layer":"server","query":"federation message"})` → 183 tokens
**Step 4:** `search({"layer":"server","query":"federation"})` → 544 tokens
**Step 5:** `search({"query":"FederationMatrix.sendMessage","layer":"ee"})` → 192 tokens
**Step 6:** `graph({"layer":"ee","query":"FederationMatrix.sendMessage","direction":"down"})` → 17 tokens
**Step 7:** `implement({"symbolName":"FederationMatrix.sendMessage","filename":"apps/meteor/ee/server/hooks/federation/inde)` → 274 tokens
**Step 8:** `implement({"filename":"ee/packages/federation-matrix/src/FederationMatrix.ts","symbolName":"FederationMatrix.h)` → 240 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 4/5 |
| Tool calls | 8 |
| Total tokens | 28,985 |
| Pass | NO |
