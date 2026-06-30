# How does an incoming webhook get processed in Rocket.Chat?

## Gemini Answer

An incoming webhook in Rocket.Chat is processed through the following chain:

**Call Chain:** `POST /hooks/:integrationId/:token` → `executeIntegrationRest` → `scriptEngine.processIncomingRequest` → `processWebhookMessage`

Here's a detailed breakdown of the process:

1.  **Entry Point: `POST /hooks/:integrationId/:token`**
    *   An incoming HTTP POST request to the `/hooks/:integrationId/:token` endpoint initiates the webhook processing. This endpoint is handled on the server side.

2.  **`executeIntegrationRest` (`apps/meteor/app/integrations/server/api/api.ts`)**
    *   This function serves as the primary handler for incoming webhook requests.
    *   It first performs checks to ensure the integration is enabled (`this.request.integration.enabled`).
    *   It initializes a `scriptEngine` using `getEngine(this.request.integration)` to handle the execution of any custom integration scripts.
    *   It parses the request body to extract `bodyParams`.

3.  **`scriptEngine.processIncomingRequest` (within `executeIntegrationRest`)**
    *   If the integration has a valid script enabled (`scriptEngine.integrationHasValidScript(this.request.integration)`), the raw request content and `bodyParams` are passed to `scriptEngine.processIncomingRequest`.
    *   This is where the user-defined integration script runs within an isolated environment (isolated-vm sandbox), allowing for custom logic to transform the incoming payload.
    *   The script's output can modify the `bodyParams` or return a `scriptResponse`.

4.  **`processWebhookMessage` (`apps/meteor/app/lib/server/functions/processWebhookMessage.ts`)**
    *   After the integration script (if any) has been executed, `executeIntegrationRest` explicitly calls `processWebhookMessage(bodyParams, this.user, defaultValues)`.
    *   This function is responsible for taking the processed `bodyParams` (which represent the webhook payload) and creating actual Rocket.Chat messages based on the content, the associated user (`this.user`), and default values (like channel, alias, avatar, emoji) configured for the integration.

Finally, `executeIntegrationRest` handles the response, returning success or failure based on the outcome of `processWebhookMessage` and any `scriptResponse`.

## Tool Calls (5 calls, 21,849 tokens)

**Step 1:** `search({"layer":"server","query":"incoming webhook"})` → 370 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"executeIntegrationRest"})` → 976 tokens
**Step 3:** `search({"query":"processWebhookMessage","layer":"server"})` → 193 tokens
**Step 4:** `graph({"direction":"up","query":"processWebhookMessage","layer":"server","file":"apps/meteor/app/lib/serve)` → 436 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/integrations/server/api/api.ts","symbolName":"executeIntegrationRest"})` → 1172 tokens
