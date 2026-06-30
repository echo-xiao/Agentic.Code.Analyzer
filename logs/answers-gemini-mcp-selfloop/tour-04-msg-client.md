# How is a message sent on the client side in Rocket.Chat?

## Gemini Answer

The client-side message sending process in Rocket.Chat follows this call chain:

**Entry → Step 1 → Step 2 → Final DDP Call**

1.  **Entry Point**: The process begins with the `sendMessage` function located in `apps/meteor/client/lib/chats/flows/sendMessage.ts`. This function is responsible for orchestrating the client-side aspects of sending a message.

2.  **Message Composition and Processing**: Inside `sendMessage`, the message content is composed, and then a function named `process` (also defined within `apps/meteor/client/lib/chats/flows/sendMessage.ts`) is invoked. This `process` function further handles the message before it's sent to the server.

3.  **DDP Method Dispatch**: The `process` function eventually leads to a call to the `call` method, which is part of the `MinimalDDPClient` in `packages/ddp-client/src/MinimalDDPClient.ts`. This `call` method is crucial as it dispatches the message to the server via the DDP (Distributed Data Protocol) over a WebSocket connection.

The full call chain is:
`apps/meteor/client/lib/chats/flows/sendMessage.ts::sendMessage` → `apps/meteor/client/lib/chats/flows/sendMessage.ts::process` → `packages/ddp-client/src/MinimalDDPClient.ts::call`

## Tool Calls (8 calls, 54,125 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"client"})` → 244 tokens
**Step 2:** `graph({"file":"apps/meteor/client/lib/chats/flows/sendMessage.ts","layer":"client","query":"sendMessage",")` → 574 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/lib/client/methods/sendMessage.ts","symbolName":"sendMessage"})` → 509 tokens
**Step 4:** `implement({"filename":"packages/ddp-client/src/livechat/LivechatClientImpl.ts","symbolName":"sendMessage"})` → 510 tokens
**Step 5:** `implement({"filename":"packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts","symbolName":"sendMessage"})` → 510 tokens
**Step 6:** `implement({"filename":"apps/meteor/client/lib/chats/flows/sendMessage.ts","symbolName":"sendMessage"})` → 625 tokens
**Step 7:** `graph({"file":"apps/meteor/client/lib/chats/flows/sendMessage.ts","query":"process","direction":"down"})` → 1436 tokens
**Step 8:** `implement({"filename":"packages/ddp-client/src/MinimalDDPClient.ts","symbolName":"call"})` → 434 tokens
