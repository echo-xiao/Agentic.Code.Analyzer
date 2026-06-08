# How is a message sent on the client side in Rocket.Chat?

## Gemini Answer

The client-side message sending process in Rocket.Chat follows this call chain:

**Entry** → **Step 1** → **Step 2** → **Final DDP Call**

1.  **`sendMessage`** (`apps/meteor/client/lib/chats/flows/sendMessage.ts`): This function acts as the primary entry point for sending messages on the client. It handles preliminary logic such as checking room subscriptions, joining rooms if necessary, and composing the message object (including text, quoted messages, and attachments).

2.  **`process`** (within `apps/meteor/client/lib/chats/flows/sendMessage.ts`): After composing the message, the `sendMessage` function calls an internal `process` function. This `process` function further prepares the message for transmission and eventually triggers the DDP (Distributed Data Protocol) call to the server.

3.  **`callMethod`** (`apps/meteor/client/providers/ServerProvider.tsx`): The `process` function (or a function called by it) eventually invokes `callMethod`. This `callMethod` serves as a wrapper that directly calls the Meteor framework's asynchronous method invocation.

4.  **`Meteor.callAsync`**: This is the underlying Meteor DDP function that transmits the message data from the client to the Rocket.Chat server via a WebSocket connection. It handles the network communication and method dispatch to the server-side Meteor method.

## Tool Calls (7 calls, 34,703 tokens)

**Step 1:** `search({"layer":"client","query":"sendMessage"})` → 243 tokens
**Step 2:** `graph({"layer":"client","direction":"down","query":"sendMessage"})` → 680 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/lib/client/methods/sendMessage.ts","symbolName":"sendMessage"})` → 352 tokens
**Step 4:** `implement({"filename":"apps/meteor/client/lib/chats/flows/sendMessage.ts","symbolName":"sendMessage"})` → 625 tokens
**Step 5:** `graph({"query":"process","layer":"client","depth":3,"direction":"down"})` → 1191 tokens
**Step 6:** `search({"query":"callMethod","layer":"client"})` → 59 tokens
**Step 7:** `implement({"filename":"apps/meteor/client/providers/ServerProvider.tsx","symbolName":"callMethod"})` → 99 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 2/5 |
| Tool calls | 7 |
| Total tokens | 34,703 |
| Pass | NO |
