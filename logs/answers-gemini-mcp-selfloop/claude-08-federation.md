# How are federation messages sent across different servers in Rocket.Chat?

## Gemini Answer

Federation messages in Rocket.Chat are sent across different servers through the `FederationMatrix.sendMessage()` method, which is part of the `FederationMatrix` service.

Here's the call chain and key files involved:

**Call Chain:**

`FederationMatrix.sendMessage()` → `federationSDK.sendMessage()` → Matrix protocol HTTP API to remote server.

**Key Files:**

*   **`ee/packages/federation-matrix/src/FederationMatrix.ts`**: This file contains the `FederationMatrix` class, which is responsible for handling federation-related operations, including sending messages. The `sendMessage` method within this class is the entry point for sending messages.
*   **`ee/server/hooks/federation/index.ts`**: This file likely contains the logic that triggers the `FederationMatrix.sendMessage()` method when a message needs to be federated.

When a message is sent from Rocket.Chat to a federated server, the `FederationMatrix.sendMessage()` method is invoked. This method then uses the `federationSDK.sendMessage()` to interact with the Matrix protocol HTTP API, which ultimately sends the message to the remote Matrix server.

## Tool Calls (8 calls, 30,722 tokens)

**Step 1:** `search({"layer":"server","query":"federation sendMessage"})` → 176 tokens
**Step 2:** `search({"layer":"server","query":"Federation send"})` → 222 tokens
**Step 3:** `search({"layer":"server","query":"federation"})` → 510 tokens
**Step 4:** `graph({"direction":"down","query":"FederationMatrix.sendMessage","file":"ee/packages/federation-matrix/src)` → 17 tokens
**Step 5:** `search({"query":"FederationMatrix.sendMessage","layer":"ee"})` → 192 tokens
**Step 6:** `search({"layer":"ee","query":"FederationMatrix"})` → 213 tokens
**Step 7:** `graph({"direction":"down","query":"FederationMatrix.sendMessage","file":"/Users/echoooooo/Desktop/code/Roc)` → 17 tokens
**Step 8:** `implement({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/ee/packages/federation-matrix/src/FederationM)` → 1199 tokens
