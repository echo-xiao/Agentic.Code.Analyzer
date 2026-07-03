# How is a message sent on the client side in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

The client-side message sending flow in Rocket.Chat begins in the `ComposerMessage` component, located at `apps/meteor/client/views/room/composer/ComposerMessage.tsx`.

Here's the detailed call chain:

1.  **`ComposerMessage`** (`apps/meteor/client/views/room/composer/ComposerMessage.tsx`): This component handles the UI for composing messages. When a message is sent, its `onSend` prop is triggered.
2.  **`onSend` prop within `ComposerMessage`**: This asynchronous function first stops the typing indicator by calling `chat?.action.stop('typing')`.
3.  **`chat?.flows.sendMessage`**: This is the core function responsible for sending the message. It's called with the message `text`, `tshow`, `previewUrls`, `isSlashCommandAllowed`, and `tmid`. The `chat` object is obtained from the `ChatContext` (`apps/meteor/client/views/room/contexts/ChatContext.ts`).
4.  **`sdk.call('sendMessage')`**: Although not directly visible in the provided `ComposerMessage` details, the `plan` output indicates that the flow ultimately ends with `sdk.call('sendMessage')` crossing the DDP boundary. This implies that `chat?.flows.sendMessage` internally makes a DDP call to the server-side `sendMessage` method.

In summary, the client-side message sending flow is:

`ComposerMessage` (apps/meteor/client/views/room/composer/ComposerMessage.tsx) → `onSend` (within ComposerMessage) → `chat?.flows.sendMessage` → `sdk.call('sendMessage')` (crossing the DDP boundary to the server).

## Tool Calls (8 calls, 53,441 tokens)

**Step 1:** `plan({"question":"How is a message sent on the client side in Rocket.Chat?","intent":"call-chain"})` → 248 tokens
**Step 2:** `search({"query":"ComposerMessage","layer":"client"})` → 73 tokens
**Step 3:** `graph({"depth":5,"file":"ComposerMessage.tsx","query":"ComposerMessage","move":"down"})` → 4577 tokens
**Step 4:** `details({"filename":"ComposerMessage.tsx","symbolName":"ComposerMessage"})` → 519 tokens
**Step 5:** `details({"filename":"LivechatClientImpl.ts","symbolName":"sendMessage"})` → 348 tokens
**Step 6:** `details({"filename":"MinimalDDPClient.ts","symbolName":"call"})` → 435 tokens
**Step 7:** `search({"layer":"client","query":"chat.flows.sendMessage"})` → 101 tokens
**Step 8:** `search({"layer":"client","query":"ChatContext"})` → 70 tokens

## Files Seen In Tool Results (22)

- `apps/meteor/client/views/room/composer/ComposerMessage.tsx`
- `apps/meteor/tests/data/messages.helper.ts`
- `apps/meteor/client/lib/sdk/MinimalDDPClient.ts`
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
- `apps/meteor/client/components/message/content/attachments/default/hooks/usePerformActionMutation.ts`
- `apps/meteor/client/views/room/contexts/ChatContext.ts`
