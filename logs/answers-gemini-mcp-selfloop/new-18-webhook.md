# How does an incoming webhook get processed in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

An incoming webhook in Rocket.Chat is processed through the following chain:

**Entry Point:** The processing begins when an incoming webhook request hits the API endpoint handled by `executeIntegrationRest`.

**Processing Chain:**

1.  **`executeIntegrationRest`** (apps/meteor/app/integrations/server/api/api.ts):
    *   This function serves as the primary handler for incoming webhook requests.
    *   It first logs the incoming request details and verifies if the associated integration is enabled.
    *   An instance of `IntegrationScriptEngine` is initialized to manage the execution of custom webhook scripts.
    *   The request body parameters are parsed.
    *   If the integration has a custom script defined, `scriptEngine.processIncomingRequest` is invoked to execute this script, allowing for custom logic to transform or validate the incoming payload.
    *   The response from the script execution is handled, potentially modifying the message parameters or setting a custom response.
    *   Finally, it calls `processWebhookMessage` to handle the actual message delivery.

2.  **`processWebhookMessage`** (apps/meteor/app/lib/server/functions/processWebhookMessage.ts):
    *   This function is responsible for taking the processed webhook payload and turning it into a message within Rocket.Chat.
    *   It extracts the target channels or room IDs from the message payload.
    *   The raw message data is transformed into a structured message object using `buildMessage`.
    *   For each identified channel or room:
        *   It attempts to retrieve the corresponding room using `getRoomWithOptionToJoin`.
        *   It validates the user's permissions to send messages to that room via `validateRoomMessagePermissionsAsync`.
        *   It performs additional validation on the webhook message content itself using `validateWebhookMessage`.
    *   Once all validations pass, the message is sent to the designated rooms using `sendMessage`.

## Tool Calls (8 calls, 72,209 tokens)

**Step 1:** `plan({"question":"How does an incoming webhook get processed in Rocket.Chat?","intent":"call-chain"})` → 2817 tokens
**Step 2:** `search({"layer":"server","query":"incoming webhook"})` → 94 tokens
**Step 3:** `graph({"file":"api.ts","move":"down","depth":5,"query":"api"})` → 3355 tokens
**Step 4:** `search({"query":"IntegrationScriptEngine","layer":"server"})` → 77 tokens
**Step 5:** `graph({"move":"up","file":"ScriptEngine.ts","depth":3,"query":"IntegrationScriptEngine"})` → 220 tokens
**Step 6:** `details({"symbolName":"executeIntegrationRest","filename":"api.ts"})` → 1166 tokens
**Step 7:** `search({"query":"processWebhookMessage","layer":"server"})` → 77 tokens
**Step 8:** `details({"symbolName":"processWebhookMessage","filename":"processWebhookMessage.ts"})` → 590 tokens

## Files Seen In Tool Results (24)

- `apps/meteor/client/views/omnichannel/triggers/EditTrigger.tsx`
- `apps/meteor/client/views/omnichannel/webhooks/WebhooksPage.tsx`
- `apps/meteor/server/features/EmailInbox/EmailInbox_Incoming.ts`
- `apps/meteor/server/features/EmailInbox/EmailInbox.ts`
- `packages/models/src/models/Integrations.ts`
- `packages/models/src/models/IntegrationHistory.ts`
- `apps/meteor/app/integrations/lib/outgoingEvents.ts`
- `apps/meteor/app/integrations/server/lib/validateOutgoingIntegration.ts`
- `apps/meteor/app/integrations/server/lib/ScriptEngine.ts`
- `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`
- `apps/meteor/app/integrations/server/api/api.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/integrations/server/logger.ts`
- `apps/meteor/app/api/server/api.ts`
- `apps/meteor/app/apps/server/bridges/api.ts`
- `apps/meteor/app/mailer/server/api.ts`
- `packages/livechat/src/api.ts`
- `packages/core-services/src/types/ServiceClass.ts`
- `apps/meteor/ee/server/api/api.ts`
- `packages/core-services/src/api.ts`
- `apps/meteor/server/startup/migrations/v298.ts`
- `apps/meteor/app/integrations/server/lib/isolated-vm/isolated-vm.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`
