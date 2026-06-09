# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

Sending a federated message in Rocket.Chat involves a sequence of function calls that process the message and transmit it to a remote server using the Matrix protocol. The process begins after a message is saved in a federated room, triggering a series of hooks.

The call chain for sending a federated message is as follows:

`afterSaveMessage` hook → `FederationMatrix.sendMessage` → `FederationMatrix.handleTextMessage` → `federationSDK.sendMessage` → Matrix Protocol HTTP API

1.  **Entry Point: Message Hook**
    The process starts with an `afterSaveMessage` hook that executes when a new message is posted. In a federated context, this hook calls into the federation logic. The main logic is orchestrated in `apps/meteor/ee/server/hooks/federation/index.ts`.

2.  **`FederationMatrix.sendMessage`**
    *   **File**: `ee/packages/federation-matrix/src/FederationMatrix.ts`
    This function is the primary handler for sending the message. It determines whether the message contains text or files and calls the appropriate handler (`handleTextMessage` or `handleFileMessage`). It also retrieves the user and room federation identifiers (Matrix User ID and Room ID).

3.  **`FederationMatrix.handleTextMessage`**
    *   **File**: `ee/packages/federation-matrix/src/FederationMatrix.ts`
    For standard text messages, this private method prepares the payload. It transforms the message into the external Matrix format, handles threading (replies), and processes quotes. Once the message is prepared, it makes the final call to the federation SDK.

4.  **`federationSDK.sendMessage`**
    This function, part of the low-level federation SDK, is responsible for the final step: sending the message payload to the remote homeserver via the Matrix federation HTTP API. It constructs and executes the `PUT /_matrix/federation/v1/send/:txnId` request to the destination server.

## Tool Calls (8 calls, 26,655 tokens)

**Step 1:** `search({"layer":"server","query":"federation"})` → 544 tokens
**Step 2:** `graph({"direction":"down","query":"FederationMatrix.sendMessage"})` → 17 tokens
**Step 3:** `search({"layer":"ee","query":"FederationMatrix.sendMessage"})` → 192 tokens
**Step 4:** `graph({"query":"FederationMatrix.sendMessage","direction":"down"})` → 17 tokens
**Step 5:** `search({"query":"federationSDK.sendMessage","layer":"ee"})` → 17 tokens
**Step 6:** `implement({"symbolName":"FederationMatrix.sendMessage","filename":"apps/meteor/ee/server/hooks/federation/inde)` → 274 tokens
**Step 7:** `graph({"direction":"down","query":"FederationMatrix.handleTextMessage"})` → 18 tokens
**Step 8:** `implement({"filename":"ee/packages/federation-matrix/src/FederationMatrix.ts","symbolName":"FederationMatrix.h)` → 240 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 3/5 |
| Tool calls | 8 |
| Total tokens | 26,655 |
| Pass | NO |
