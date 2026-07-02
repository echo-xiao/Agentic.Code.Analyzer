# How is a message sent on the client side in Rocket.Chat?

## Gemini Answer

The client-side message sending flow in Rocket.Chat starts with the `sendMessage` function located in `apps/meteor/client/lib/chats/flows/sendMessage.ts`.

Here's the call chain:

1.  **Entry Point:** `sendMessage` (apps/meteor/client/lib/chats/flows/sendMessage.ts)
    *   This function handles initial checks like room subscription and message content validation.
    *   It then calls the `process` function.

2.  **Processing Message:** `process` (apps/meteor/client/lib/chats/flows/sendMessage.ts)
    *   This function performs various pre-processing steps, such as handling reactions, long messages, slash commands, and file uploads.
    *   It also applies the `onClientBeforeSendMessage` hook.
    *   Crucially, it then makes a DDP (Distributed Data Protocol) call to the server using `sdk.call('sendMessage', message, previewUrls)`. This is the point where the client communicates with the server to actually send the message.

The `sdk.call` method is part of the DDP client, which handles the communication over WebSockets. While the `details` tool could not directly show the implementation of `call` within `MinimalDDPClient.ts` (due to symbol collision), the pattern indicates that `sdk.call('sendMessage')` dispatches a DDP method to the server. The server then has a corresponding `Meteor.methods({ sendMessage })` handler to process the message on the server-side.

## Tool Calls (8 calls, 46,540 tokens)

**Step 1:** `plan({"question":"How is a message sent on the client side in Rocket.Chat?","intent":"call-chain"})` → 81 tokens
**Step 2:** `search({"query":"sendMessage","layer":"client"})` → 253 tokens
**Step 3:** `graph({"file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/client/lib/chats/flows/sendMessage.ts)` → 3279 tokens
**Step 4:** `details({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/client/lib/chats/flows/sendMessag)` → 621 tokens
**Step 5:** `details({"symbolName":"call","filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/client/lib/Mi)` → 444 tokens
**Step 6:** `details({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/client/lib/chats/flows/sendMessag)` → 317 tokens
**Step 7:** `details({"filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/ddp-client/src/MinimalDDPClient.ts",)` → 445 tokens
**Step 8:** `details({"symbolName":"call","filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/ddp-client/src/M)` → 445 tokens

## Files Seen In Tool Results (22)

- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `apps/meteor/client/lib/MinimalDDPClient.ts`
- `packages/ddp-client/src/MinimalDDPClient.ts`
- `packages/ddp-client/src/DDPSDK.ts`
- `packages/ddp-client/src/ClientStream.ts`
- `packages/core-services/src/LocalBroker.ts`
- `packages/core-services/src/lib/ServiceStarter.ts`
- `packages/core-services/src/lib/Api.ts`
- `packages/apps-engine/tests/test-data/bridges/httpBridge.ts`
- `packages/apps-engine/src/server/ProxiedApp.ts`
- `packages/apps-engine/src/server/bridges/HttpBridge.ts`
- `packages/apps-engine/src/server/accessors/VideoConferenceBuilder.ts`
- `packages/apps-engine/src/client/AppsEngineUIClient.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/builders/VideoConferenceBuilder.ts`
- `ee/packages/network-broker/src/NetworkBroker.ts`
- `ee/apps/ddp-streamer/src/Server.ts`
- `apps/meteor/tests/mocks/server/BrokerMocked.ts`
- `apps/meteor/app/statistics/server/lib/telemetryEvents.ts`
- `apps/meteor/app/apps/server/bridges/http.ts`
