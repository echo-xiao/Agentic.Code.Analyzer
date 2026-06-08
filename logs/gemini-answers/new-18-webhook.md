# How does an incoming webhook get processed in Rocket.Chat?

## Gemini Answer

An incoming webhook in Rocket.Chat is processed through the following steps:

**Call Chain:** `POST /hooks/:integrationId/:token` → `executeIntegrationRest` → `processWebhookMessage` → `sendMessage`

1.  **Incoming Request:** The process begins with a `POST` request to the `/hooks/:integrationId/:token` endpoint.
2.  **`executeIntegrationRest()`:** This function, located in `apps/meteor/app/integrations/server/api/api.ts`, authenticates the incoming request and runs the integration script within an isolated-vm sandbox for security.
3.  **`processWebhookMessage()`:** After the integration script is executed, `processWebhookMessage()`, found in `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`, takes over. This function performs the following actions:
    *   It constructs the message object using `buildMessage()` based on the webhook payload.
    *   It determines the target room(s) by calling `getRoomWithOptionToJoin()`.
    *   It validates user permissions for the room(s) using `validateRoomMessagePermissionsAsync()`.
    *   It further validates the webhook message with `validateWebhookMessage()`.
    *   Finally, for each intended channel, it calls `sendMessage()`.
4.  **`sendMessage()`:** This function, located in `apps/meteor/app/lib/server/functions/sendMessage.ts`, is responsible for sending the message to the specified room(s).

## Tool Calls (5 calls, 22,958 tokens)

**Step 1:** `search({"query":"incoming webhook","layer":"server"})` → 370 tokens
**Step 2:** `graph({"direction":"down","query":"executeIntegrationRest","layer":"server"})` → 850 tokens
**Step 3:** `graph({"query":"processWebhookMessage","direction":"down","layer":"server"})` → 800 tokens
**Step 4:** `implement({"symbolName":"processWebhookMessage","filename":"apps/meteor/app/lib/server/functions/processWebhoo)` → 596 tokens
**Step 5:** `search({"query":"sendMessage","layer":"server"})` → 411 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 3/3 |
| Tool calls | 5 |
| Total tokens | 22,958 |
| Pass | NO |
