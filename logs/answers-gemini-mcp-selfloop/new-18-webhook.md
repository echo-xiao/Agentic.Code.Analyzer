# How does an incoming webhook get processed in Rocket.Chat?

## Gemini Answer

Here's how an incoming webhook is processed in Rocket.Chat:

**Call Chain:**

1.  **`POST /hooks/:integrationId/:token`**: An incoming webhook request is initiated by an HTTP POST request to this endpoint.
2.  **`executeIntegrationRest()`** (in `apps/meteor/app/integrations/server/api/api.ts`): This function is the entry point for processing the webhook. It first authenticates the incoming request.
    *   It checks if the integration is enabled.
    *   It retrieves default values for the message (channel, alias, avatar, emoji) from the integration configuration.
    *   It uses `getEngine()` to obtain a script engine for the integration.
    *   It parses the request body parameters using `getBodyParams()`.
    *   If a script is associated with the integration and a request body is present, the script engine's `processIncomingRequest()` method is called to execute the custom script logic.
    *   The `scriptEngine.processIncomingRequest()` method (from the `IntegrationScriptEngine` class, likely implemented by `IsolatedVMScriptEngine` in `apps/meteor/app/integrations/server/lib/isolated-vm/isolated-vm.ts`) executes the integration script within an isolated-vm sandbox for security.
    *   The `executeIntegrationRest()` function then processes the result of the script execution, handling any errors or modifying the message parameters based on the script's output.
3.  **`processWebhookMessage()`** (in `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`): After the integration script (if any) has been executed, this function is called to construct and send the actual message within Rocket.Chat.
    *   It validates permissions for the target room.
    *   It builds the message object based on the webhook payload and default values.
    *   It uses `getRoomWithOptionToJoin()` to ensure the bot can access and potentially join the destination channel.
4.  **`sendMessage()`** (in `apps/meteor/app/lib/server/functions/sendMessage.ts`): This function handles the final steps of sending the message to the specified channel, including notifying relevant users and updating the room.

**Key Files and Their Roles:**

*   **`apps/meteor/app/integrations/server/api/api.ts`**: Contains the `executeIntegrationRest` function, which is the initial handler for incoming webhook HTTP requests, responsible for authentication, script execution, and initial message parameter processing.
*   **`apps/meteor/app/integrations/server/lib/isolated-vm/isolated-vm.ts`**: Defines the `IsolatedVMScriptEngine` class, which is responsible for safely executing custom integration scripts in a sandboxed environment. The `processIncomingRequest` method, although not directly found in the class definition with the last `implement` call, is part of its superclass `IntegrationScriptEngine` and handles the script's execution.
*   **`apps/meteor/app/lib/server/functions/processWebhookMessage.ts`**: Contains the `processWebhookMessage` function, which takes the processed webhook payload and constructs a Rocket.Chat message, handling room permissions and other message-related logic.
*   **`apps/meteor/app/lib/server/functions/sendMessage.ts`**: Contains the `sendMessage` function, the core Rocket.Chat function responsible for sending messages, including notifying users and updating the chat room.

## Tool Calls (8 calls, 95,704 tokens)

**Step 1:** `search({"query":"incoming webhook"})` → 456 tokens
**Step 2:** `graph({"query":"executeIntegrationRest","direction":"down","layer":"server"})` → 2130 tokens
**Step 3:** `implement({"symbolName":"executeIntegrationRest","filename":"apps/meteor/app/integrations/server/api/api.ts"})` → 1172 tokens
**Step 4:** `graph({"layer":"server","query":"processWebhookMessage","direction":"down"})` → 1855 tokens
**Step 5:** `graph({"query":"sendMessage","layer":"server","direction":"down"})` → 2057 tokens
**Step 6:** `search({"layer":"server","query":"getEngine"})` → 391 tokens
**Step 7:** `implement({"symbolName":"IsolatedVMScriptEngine.processIncomingRequest","filename":"apps/meteor/app/integratio)` → 71 tokens
**Step 8:** `implement({"symbolName":"IsolatedVMScriptEngine","filename":"apps/meteor/app/integrations/server/lib/isolated-)` → 275 tokens
