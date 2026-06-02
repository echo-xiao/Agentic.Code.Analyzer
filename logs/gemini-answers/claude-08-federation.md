# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

Federation messages in Rocket.Chat are sent across different servers via the `FederationMatrix` service, which acts as an intermediary to the Matrix federation protocol.

Here's the call chain:

**Entry** → `FederationMatrix` (defined in `ee/packages/federation-matrix/src/FederationMatrix.ts`)
The `FederationMatrix` class is a core-service responsible for handling all federation-related operations, including sending messages, presence updates, and room actions to other federated servers (Matrix homeservers).

**Step 1** → `FederationMatrix.sendMessage` (in `ee/packages/federation-matrix/src/FederationMatrix.ts`)
When a message needs to be federated, this method is invoked. It determines the type of message (text or file) and delegates to the appropriate handler.

**Step 2** → `FederationMatrix.handleTextMessage` or `FederationMatrix.handleFileMessage` (in `ee/packages/federation-matrix/src/FederationMatrix.ts`)
These private methods prepare the message content (text or file) into the format expected by the Matrix protocol. They also handle aspects like threading and quoting.

**Final** → `federationSDK.sendMessage` or `federationSDK.sendFileMessage` (implicitly within `ee/packages/federation-matrix/src/FederationMatrix.ts`)
The `federationSDK` is the crucial component that abstracts the actual communication with the Matrix homeserver. It makes the necessary API calls to send the prepared message (as a text event or file event) to the target federated server using the Matrix federation protocol. This `federationSDK` handles the HTTP requests and the underlying network communication to transmit the message data. Other methods like `federationSDK.sendReaction`, `federationSDK.updateMessage`, and `federationSDK.sendTypingNotification` are also used by `FederationMatrix` for various federated actions.

## Tool Calls (5 calls, 48,392 tokens)

**Step 1:** `search({"query":"FederationMatrix"})` → 81 tokens
**Step 2:** `graph({"depth":4,"query":"FederationMatrix","direction":"down"})` → 47 tokens
**Step 3:** `graph({"filename":"ee/packages/federation-matrix/src/FederationMatrix.ts","direction":"down","query":"Fede)` → 47 tokens
**Step 4:** `implement({"filename":"ee/packages/federation-matrix/src/FederationMatrix.ts","symbolName":"FederationMatrix"})` → 8274 tokens
**Step 5:** `search({"query":"federationSDK"})` → 14 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 1/5 |
| Tool calls | 5 |
| Total tokens | 48,392 |
