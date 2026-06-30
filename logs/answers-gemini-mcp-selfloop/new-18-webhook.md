# How does an incoming webhook get processed in Rocket.Chat?

## Gemini Answer

An incoming webhook in Rocket.Chat is processed through the following steps:

1.  **Incoming Request:** A `POST` request is made to the `/hooks/:integrationId/:token` endpoint. This is handled by the API routing, which directs the request to the integration processing logic.

2.  **Integration Execution:** The `executeIntegrationRest` function in `apps/meteor/app/integrations/server/api/api.ts` is invoked. This function is responsible for authenticating the request and running the integration script within an `isolated-vm` sandbox for security.

3.  **Message Processing:** After the integration script is executed, the `processWebhookMessage` function located in `apps/meteor/app/lib/server/functions/processWebhookMessage.ts` is called. This function takes the payload from the webhook and constructs a message object that can be handled by Rocket.Chat's messaging system.

**Call Chain:**

`POST /hooks/:integrationId/:token` (handled by API routing)
→ `executeIntegrationRest` (`apps/meteor/app/integrations/server/api/api.ts`)
→ `processWebhookMessage` (`apps/meteor/app/lib/server/functions/processWebhookMessage.ts`)

## Tool Calls (4 calls, 13,950 tokens)

**Step 1:** `search({"query":"incoming webhook","layer":"server"})` → 370 tokens
**Step 2:** `graph({"layer":"server","query":"executeIntegrationRest","direction":"down"})` → 850 tokens
**Step 3:** `search({"layer":"server","query":"processWebhookMessage"})` → 193 tokens
**Step 4:** `graph({"layer":"server","query":"processWebhookMessage","direction":"up"})` → 368 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 3/3 |
| Tool calls | 4 |
| Total tokens | 13,950 |
| Pass | NO |
