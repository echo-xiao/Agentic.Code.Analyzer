# How is a message sent on the client side in Rocket.Chat?

## Gemini Answer

A message is sent on the client side in Rocket.Chat through the following call chain, leveraging DDP (Distributed Data Protocol) to communicate with the server:

**Call Chain:** `apps/meteor/client/lib/chats/flows/sendMessage.ts` → `process` (within the same file) → `MinimalDDPClient.ts` or `Client.ts` (for the DDP method call).

1.  **Entry Point (`sendMessage`):** The process begins with the `sendMessage` function located in `apps/meteor/client/lib/chats/flows/sendMessage.ts`. This function is responsible for client-side orchestration, including:
    *   Checking if the user is subscribed to the room and joining if necessary.
    *   Clearing unread marks.
    *   Composing the message, handling uploads, and checking for existing message edits.

2.  **Message Processing (`process`):** After initial preparation, the `sendMessage` function calls an internal `process` function (also within `apps/meteor/client/lib/chats/flows/sendMessage.ts`). This `process` function is where the actual transmission logic is initiated.

3.  **DDP Method Dispatch:** The `process` function ultimately triggers a DDP method call. This is handled by:
    *   `call` in `MinimalDDPClient.ts`
    *   `callMethod` in `Client.ts`
    These components are responsible for sending the prepared message data over the DDP WebSocket connection to the Rocket.Chat server, which then processes the message.

## Tool Calls (4 calls, 17,077 tokens)

**Step 1:** `search({"query":"sendMessage","layer":"client"})` → 243 tokens
**Step 2:** `graph({"direction":"down","query":"sendMessage","layer":"client"})` → 680 tokens
**Step 3:** `implement({"filename":"apps/meteor/client/lib/chats/flows/sendMessage.ts","symbolName":"sendMessage"})` → 625 tokens
**Step 4:** `graph({"direction":"down","layer":"client","query":"process"})` → 1561 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 2/5 |
| Tool calls | 4 |
| Total tokens | 17,077 |
| Pass | NO |
