# How does an incoming webhook get processed in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

An incoming webhook in Rocket.Chat is processed through a series of steps, starting with an API endpoint and culminating in message delivery.

Here's the processing flow:

1.  **API Endpoint Reception**: Incoming webhook requests are initially handled by the `integrations.create` API endpoint.
2.  **Integration Execution**: For `webhook-incoming` types, the `executeIntegrationRest` function in `apps/meteor/app/integrations/server/api/api.ts` is called.
    *   **Permission Check**: It verifies if the integration is enabled and if the assigned user has the `message-impersonate` permission.
    *   **Script Execution**: If a script is enabled for the integration, the incoming request's content is processed by `scriptEngine.processIncomingRequest`. This allows for custom transformations of the incoming payload. The `scriptEngine` is defined in `apps/meteor/app/integrations/server/lib/ScriptEngine.ts`.
    *   **Payload Preparation**: Default values for channel, alias, avatar, and emoji are set, and the body parameters are extracted.
3.  **Message Processing**: The prepared payload is then passed to `processWebhookMessage`.
    *   **Channel Resolution**: `processWebhookMessage` identifies the target channels from the payload (or default values). For each channel, it attempts to retrieve the corresponding room using `getRoomWithOptionToJoin`.
    *   **Message Construction**: A message object is constructed using `buildMessage`, incorporating data from the webhook payload and default integration settings.
    *   **Permissions and Validation**: Before sending, the system validates if the integration's user has permission to send messages to the resolved room using `validateRoomMessagePermissionsAsync` and validates the message content itself using `validateWebhookMessage`.
    *   **Message Sending**: Finally, the message is sent to each target channel using `sendMessage`.
4.  **Response Handling**: The `executeIntegrationRest` function then returns a success or failure response, potentially including separate responses for each channel if `separateResponse` is enabled in the payload.

**Key files:**

*   `apps/meteor/app/integrations/server/api/api.ts`: Contains the `executeIntegrationRest` function, which is the entry point for processing incoming webhooks.
*   `apps/meteor/app/integrations/server/lib/ScriptEngine.ts`: Defines the `scriptEngine` responsible for processing incoming request scripts.

## Tool Calls (8 calls, 48,769 tokens)

**Step 1:** `plan({"question":"How does an incoming webhook get processed in Rocket.Chat?","intent":"call-chain"})` → 1104 tokens
**Step 2:** `search({"query":"executeIntegrationRest"})` → 74 tokens
**Step 3:** `graph({"move":"down","depth":5,"query":"executeIntegrationRest","file":"api.ts"})` → 2415 tokens
**Step 4:** `search({"query":"scriptEngine.processIncomingRequest"})` → 98 tokens
**Step 5:** `graph({"file":"api.ts","move":"down","depth":3,"query":"scriptEngine.processIncomingRequest"})` → 19 tokens
**Step 6:** `search({"query":"scriptEngine"})` → 93 tokens
**Step 7:** `details({"filename":"ScriptEngine.ts","symbolName":"ScriptEngine"})` → 16 tokens
**Step 8:** `details({"filename":"ScriptEngine.ts","symbolName":"processIncomingRequest"})` → 63 tokens

## Files Seen In Tool Results (5)

- `apps/meteor/app/integrations/server/api/api.ts`
- `apps/meteor/server/lib/messages/processWebhookMessage.ts`
- `apps/meteor/tests/end-to-end/api/incoming-integrations.ts`
- `apps/meteor/app/integrations/server/lib/validateScriptEngine.ts`
- `apps/meteor/app/integrations/server/lib/ScriptEngine.ts`
