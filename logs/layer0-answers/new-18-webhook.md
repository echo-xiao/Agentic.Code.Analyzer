# How does an incoming webhook get processed in Rocket.Chat?

## Baseline Answer (no tools)

Processing an incoming webhook in Rocket.Chat involves several steps, from the initial HTTP request to the final message delivery. The core logic for handling incoming webhooks resides primarily in the `server/lib/webhooks.js` file, with the route definition in `server/startup/integrations.js`.

Here's a detailed breakdown of how an incoming webhook is processed:

### 1. HTTP Request Arrival and Route Matching

*   **Endpoint:** The webhook request targets a specific URL pattern, typically `/api/v1/webhooks/:webhookId`. The `:webhookId` is a unique token generated when the incoming webhook is created in Rocket.Chat.
*   **Method:** Most incoming webhooks are `POST` requests, but some integrations might also use `GET`.
*   **Route Definition:** The HTTP route handler is set up during Rocket.Chat's startup phase.
    *   **File:** `server/startup/integrations.js`
    *   **Code Snippet (Conceptual):**
        ```javascript
        import { WebApp } from 'meteor/webapp';
        import { processWebhook } from '../lib/webhooks'; // Simplified import path

        WebApp.connectHandlers.use('/api/v1/webhooks/', async (req, res, next) => {
            if (req.url.indexOf('/api/v1/webhooks/') === 0) {
                // Extract webhookId from the URL (e.g., /api/v1/webhooks/your-secret-id)
                const webhookId = req.url.split('/api/v1/webhooks/')[1]?.split('?')[0];

                if (webhookId) {
                    try {
                        await processWebhook(webhookId, req, res);
                    } catch (e) {
                        // Handle errors
                        res.writeHead(500);
                        res.end(JSON.stringify({ success: false, error: e.message }));
                    }
                    return;
                }
            }
            next(); // Pass to the next handler if not a webhook
        });
        ```
    *   The `WebApp.connectHandlers.use` middleware intercepts requests to `/api/v1/webhooks/`.

### 2. Webhook ID Extraction and Configuration Retrieval

*   The `webhookId` is extracted from the URL path.
*   **Database Lookup:** Using this `webhookId`, Rocket.Chat fetches the corresponding incoming webhook configuration from the database.
    *   **Collection:** `rocketchat_integration` (accessible via `RocketChat.models.Integrations`).
    *   **File:** This lookup happens within the `processWebhook` function (or similar) in `server/lib/webhooks.js`.
    *   **Data Retrieved:** This includes the webhook's `username`, default `channel`, `script` (if any), `enabled` status, `token`, etc.

### 3. Validation and Request Parsing

*   **Validation:**
    *   Checks if the webhook exists and is enabled.
    *   Validates the request method if necessary.
*   **Request Body Parsing:** The incoming HTTP request body is parsed. Rocket.Chat's webhook handler attempts to parse it based on the `Content-Type` header:
    *   `application/json`: Parses as JSON.
    *   `application/x-www-form-urlencoded`: Parses as form data.
    *   Plain text: Treated as a string.
*   **File:** `server/lib/webhooks.js`

### 4. Custom Script Execution (If Defined)

This is the most powerful part of incoming webhooks.

*   **Sandbox Environment:** If the retrieved webhook configuration includes a `script`, Rocket.Chat executes this script within a secure Node.js `vm` (Virtual Machine) sandbox. This isolates the script from the main application process for security.
*   **Context for the Script:** The script is provided with an execution context that includes:
    *   `request`: An object containing `url`, `method`, `headers`, `query` parameters, and the parsed `body` of the incoming HTTP request.
    *   `settings`: An object containing relevant Rocket.Chat server settings.
    *   `_`: The Lodash utility library.
    *   `IncomingWebhook`: An object providing helper functions for the script, such as `IncomingWebhook.generateMessage(messagePayload)` to easily format messages.
*   **Script's Role:** The custom script's responsibility is to process the incoming `request.body` and return an object (or an array of objects) that conforms to Rocket.Chat's internal message structure (similar to the Slack-compatible webhook payload).
    *   The script can modify the `username`, `channel`, `text`, `attachments`, `emoji`, etc., based on the incoming data.
    *   If the script returns `null` or `undefined`, no message will be sent.
*   **File:** `server/lib/webhooks.js` contains the logic for creating the sandbox and executing the script.

### 5. Default Payload Processing (If No Script)

*   If no custom `script` is defined for the webhook, Rocket.Chat attempts to interpret the incoming payload directly. It expects a payload that is compatible with common webhook formats (e.g., Slack-compatible webhooks).
*   It looks for fields like `text`, `attachments`, `username`, `icon_emoji`, `avatar_url`, `channel`, etc., in the parsed `request.body`.
*   **File:** `server/lib/webhooks.js` contains this default mapping logic.

### 6. Message Construction

*   Based on either the output of the custom script or the default payload processing, Rocket.Chat constructs one or more internal message objects.
*   The `username` and `channel` (or direct message recipient) specified in the webhook configuration act as defaults, which can be overridden by the script's output or the payload itself.
*   The actual sender of the message in Rocket.Chat's system will be an internal "integration" user associated with the webhook, but the message will appear to come from the configured `username`.

### 7. Message Sending

*   The constructed message object(s) are then passed to Rocket.Chat's core message sending function.
*   **File:** `app/lib/server/functions/sendMessage.js`
*   **Function:** `RocketChat.sendMessage(user, message, room)`
*   This function handles:
    *   Storing the message in the `rocketchat_message` collection.
    *   Broadcasting the message via DDP to all connected clients in the target room/channel.
    *   Triggering server-side hooks (e.g., `afterSendMessage`, `beforeSaveMessage`).
    *   Processing mentions, link previews, and other message enrichments.

### 8. Response to Sender

*   After processing the webhook and sending the message(s), Rocket.Chat sends an HTTP response back to the client that initiated the webhook.
*   Typically, a `200 OK` status with a success message is returned. If an error occurs during processing (e.g., webhook not found, script error), an appropriate `4xx` or `5xx` status with an error message is returned.
*   **File:** `server/lib/webhooks.js` handles sending the `res.writeHead()` and `res.end()`.

---

**Key Files Involved:**

*   `server/startup/integrations.js`: Sets up the HTTP route for incoming webhooks.
*   `server/lib/webhooks.js`: Contains the core logic for parsing requests, retrieving webhook configurations, executing custom scripts, and constructing/sending messages.
*   `app/lib/server/functions/sendMessage.js`: The central function for persisting and broadcasting messages within Rocket.Chat.
*   `app/models/server/raw/Integrations.js`: The model for interacting with the `rocketchat_integration` collection to fetch webhook configurations.

This architecture allows for both simple, configuration-driven webhooks and highly customized, script-driven integrations, providing great flexibility for connecting Rocket.Chat with external services.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,795 |
| Model | gemini-2.5-flash |
| Tools | NONE |
