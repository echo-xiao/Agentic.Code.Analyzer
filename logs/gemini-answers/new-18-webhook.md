# How does an incoming webhook get processed in Rocket.Chat?

## Gemini Answer

An incoming webhook in Rocket.Chat is processed through the following chain:

**Call Chain:** `POST /hooks/:integrationId/:token` → `executeIntegrationRest()` → `processWebhookMessage()` → `sendMessage()`

**Detailed Steps:**

1.  **Incoming Request (Entry Point):** An HTTP POST request is received at the endpoint `POST /hooks/:integrationId/:token`.
2.  **`executeIntegrationRest` (apps/meteor/app/integrations/server/api/api.ts):**
    *   This function is the primary handler for incoming webhook requests.
    *   It first verifies if the integration is `enabled`.
    *   It parses the request `bodyParams`, `urlParams`, and `headers`.
    *   If an integration script is defined and valid, it executes this script within an isolated sandbox using `scriptEngine.processIncomingRequest`. This script has the ability to transform the incoming payload (`bodyParams`) or return a custom `scriptResponse`.
    *   Finally, it calls `processWebhookMessage` with the processed `bodyParams`, the associated `user`, and `defaultValues` (channel, alias, avatar, emoji) for the integration.
3.  **`processWebhookMessage` (apps/meteor/app/lib/server/functions/processWebhookMessage.ts):**
    *   This function is responsible for taking the webhook payload and transforming it into a Rocket.Chat message.
    *   It extracts the target `channels` (or `roomId`) from the `messageObj` (which is the `bodyParams` from the webhook).
    *   For each specified channel, it performs the following:
        *   Retrieves the corresponding `IRoom` object using `getRoomWithOptionToJoin`.
        *   Validates user permissions to send messages to that room via `validateRoomMessagePermissionsAsync`.
        *   Validates the message content itself against the room and user context using `validateWebhookMessage`.
    *   After validation, it iterates through the validated rooms and calls `sendMessage(user, removeEmpty(message), roomData.room)` to actually send the message to each designated channel. It can handle errors per channel if `separateResponse` is enabled in the webhook payload.
4.  **`sendMessage`:** This is the ultimate function responsible for creating and dispatching the message within Rocket.Chat.

## Tool Calls (5 calls, 23,150 tokens)

**Step 1:** `search({"query":"incoming webhook","layer":"server"})` → 370 tokens
**Step 2:** `graph({"layer":"server","query":"executeIntegrationRest","direction":"down"})` → 850 tokens
**Step 3:** `graph({"direction":"up","layer":"server","query":"processWebhookMessage"})` → 368 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/integrations/server/api/api.ts","symbolName":"executeIntegrationRest"})` → 1172 tokens
**Step 5:** `implement({"symbolName":"processWebhookMessage","filename":"apps/meteor/app/lib/server/functions/processWebhoo)` → 596 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 3/3 |
| Tool calls | 5 |
| Total tokens | 23,150 |
| Pass | NO |
