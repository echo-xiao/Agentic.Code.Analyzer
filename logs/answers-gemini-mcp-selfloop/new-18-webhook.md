# How does an incoming webhook get processed in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

An incoming webhook in Rocket.Chat is processed through the following chain of functions:

**Entry Point → Script Execution → Message Processing → Message Sending**

1.  **Entry Point: `executeIntegrationRest`** (apps/meteor/app/integrations/server/api/api.ts)
    *   This function is responsible for handling the initial incoming webhook request.
    *   It first checks if the integration is enabled.
    *   It then retrieves a script engine (likely an `IsolatedVMScriptEngine` for security) to execute the integration's custom script.

2.  **Script Execution: `scriptEngine.processIncomingRequest`** (within `executeIntegrationRest` in apps/meteor/app/integrations/server/api/api.ts)
    *   The `executeIntegrationRest` function calls `scriptEngine.processIncomingRequest`.
    *   This is where the custom JavaScript code defined for the incoming webhook integration is executed in an isolated environment. The script processes the incoming payload and transforms it into a format suitable for Rocket.Chat.

3.  **Message Processing: `processWebhookMessage`** (apps/meteor/app/lib/server/functions/processWebhookMessage.ts)
    *   After the integration script has processed the payload, `executeIntegrationRest` calls `processWebhookMessage`.
    *   This function takes the processed webhook data, the user context, and default values to construct a message object.
    *   It also performs permission checks (`validateRoomMessagePermissionsAsync`) to ensure the message can be sent to the specified channel or room.

4.  **Message Sending: `sendMessage`** (called by `processWebhookMessage`, located in LivechatClientImpl.ts, but the core logic is in apps/meteor/app/lib/server/functions/sendMessage.ts)
    *   Finally, `processWebhookMessage` calls `sendMessage` to persist the message in the database and notify relevant clients. This is the ultimate step where the webhook's content becomes a visible message within Rocket.Chat.

## Tool Calls (5 calls, 22,327 tokens)

**Step 1:** `plan({"question":"How does an incoming webhook get processed in Rocket.Chat?","intent":"call-chain"})` → 223 tokens
**Step 2:** `search({"query":"processWebhookMessage"})` → 77 tokens
**Step 3:** `graph({"query":"processWebhookMessage","file":"processWebhookMessage.ts"})` → 2754 tokens
**Step 4:** `graph({"move":"up","query":"processWebhookMessage","file":"processWebhookMessage.ts"})` → 498 tokens
**Step 5:** `details({"symbolName":"executeIntegrationRest","filename":"api.ts"})` → 1166 tokens

## Files Seen In Tool Results (13)

- `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`
- `apps/meteor/server/modules/core-apps/mention.module.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/app/integrations/server/api/api.ts`
- `apps/meteor/app/api/server/v1/chat.ts`
- `apps/meteor/ee/server/apps/communication/uikit.ts`
- `apps/meteor/server/services/uikit-core-app/service.ts`
- `apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoChannels/useBlockChannel.tsx`
- `apps/meteor/client/views/room/composer/ComposerOmnichannel/ComposerOmnichannelCallout.tsx`
- `apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoChannels/ContactInfoChannelsItem.tsx`
- `apps/meteor/client/views/room/composer/ComposerOmnichannel/ComposerOmnichannel.tsx`
- `apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoChannels/ContactInfoChannels.tsx`
- `apps/meteor/app/integrations/server/methods/outgoing/replayOutgoingIntegration.ts`
