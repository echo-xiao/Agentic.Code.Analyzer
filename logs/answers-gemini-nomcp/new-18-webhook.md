# How does an incoming webhook get processed in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat processes incoming webhooks through a well-defined pipeline that handles the HTTP request, identifies the webhook, executes any custom scripts, and ultimately creates a message in the specified channel.

Here's a detailed breakdown of the process:

### 1. HTTP Request Reception

*   **Endpoint:** Incoming webhooks typically hit the `/hooks/:_id` endpoint. The `_id` in the URL corresponds to the unique ID of the incoming integration configured in Rocket.Chat.
*   **Handler Registration:** This endpoint is registered during Rocket.Chat's server startup.
    *   **File:** `app/webhooks/server/startup.js`
    *   **Code Snippet:**
        ```javascript
        import { WebApp } from 'meteor/webapp';
        import { WebHook } from './lib/WebHook';

        WebApp.connectHandlers.use('/hooks/', (req, res, next) => {
            if (req.url.includes('/hooks/')) {
                return WebHook.processIncomingRequest(req, res, next);
            }
            next();
        });
        ```
*   The `WebHook.processIncomingRequest` method is the entry point for all incoming webhook requests.

### 2. Webhook Identification & Configuration Retrieval

*   **Extracting ID:** The `_id` is extracted from the request URL (e.g., `/hooks/yourWebhookId`).
*   **Fetching Configuration:** Rocket.Chat then queries its database to find the corresponding incoming integration configuration.
    *   **Collection:** `rocketchat_integrations` (managed by the `Integrations` model).
    *   **File:** `app/webhooks/server/lib/WebHook.js` (within `processIncomingRequest` and `runIncoming` methods).
    *   It checks if the integration exists, is enabled, and is of type `incoming-webhook`.

### 3. Payload Parsing

*   The incoming request body is parsed based on its `Content-Type` header. Rocket.Chat supports:
    *   `application/json`: Parses as JSON.
    *   `application/x-www-form-urlencoded`: Parses as form data.
    *   Other types might be treated as plain text or raw data, depending on the custom script's needs.
*   **File:** `app/webhooks/server/lib/WebHook.js` (within `processIncomingRequest`).

### 4. Custom Script Execution (Optional)

This is where the power and flexibility of Rocket.Chat's webhooks shine.

*   **Script Check:** If the retrieved webhook configuration has `scriptEnabled: true` and a `script` field containing JavaScript code, this script will be executed.
*   **Sandbox Environment:** The script runs within a Node.js `vm` (Virtual Machine) sandbox. This isolates the script from the main Rocket.Chat process, providing security and preventing direct access to sensitive server resources.
*   **Provided Objects:** The sandbox exposes a limited set of objects and functions to the script, primarily:
    *   `_`: Lodash utility library.
    *   `console`: For logging within the script.
    *   `request`: The parsed incoming request data (body, query, headers).
    *   `script`: An object with `send(message)` and `error(message)` methods, which the script uses to communicate its output back to the webhook processor.
*   **`process_incoming_request` Function:** The custom script is expected to define a function named `process_incoming_request(request)`. This function receives the parsed request data and should return an object representing the message to be sent to Rocket.Chat.
    *   **Example Script Structure:**
        ```javascript
        class Script {
            process_incoming_request({ request }) {
                // 'request' contains body, query, headers
                const data = request.body;

                return {
                    content: {
                        text: `New message from webhook: ${data.text}`,
                        channel: '#general', // Or data.channel
                        alias: 'Webhook Bot',
                        attachments: data.attachments,
                        // ... other message properties
                    }
                };
            }
        }
        ```
*   **Output:** The return value of `process_incoming_request` (or an error if the script fails) is then passed to the next stage.
*   **File:** `app/webhooks/server/lib/WebHook.js` (within the `runIncoming` method, specifically the `vm.runInNewContext` part).

### 5. Message Object Construction

*   **From Script:** If a custom script was executed, its return value (the message object) is used.
*   **Default Mapping:** If no custom script is enabled, Rocket.Chat attempts to map the incoming payload directly to a standard message object. This usually involves looking for fields like `text`, `channel`, `alias`, `attachments`, `emoji`, etc., in the root of the incoming JSON or form data.
*   The resulting message object typically includes:
    *   `msg`: The main message text.
    *   `rid`: The room ID (or channel name) where the message should be sent.
    *   `alias`: The sender's alias (bot name).
    *   `avatar`: Custom avatar URL.
    *   `emoji`: Custom emoji for the avatar.
    *   `attachments`: An array of attachment objects.
    *   `blocks`: An array of UI Kit blocks.

### 6. Message Sending

*   **`WebHook.sendMessage`:** The constructed message object is passed to `WebHook.sendMessage`. This method handles the final steps of sending the message.
*   **`RocketChat.sendMessage`:** Internally, `WebHook.sendMessage` calls the core `RocketChat.sendMessage` function (or `api.v1.sendMessage` which wraps it). This is a critical server-side function responsible for:
    *   **User Context:** Determining the user context for sending the message (usually the user who created the webhook).
    *   **Room Resolution:** Resolving the target room/channel (`rid`) from its name or ID.
    *   **Permissions:** Checking if the webhook's user has permission to post in the target room.
    *   **Message Validation:** Ensuring the message structure is valid.
    *   **Database Insertion:** Storing the message in the `rocketchat_message` collection.
    *   **Real-time Updates:** Notifying connected clients about the new message via DDP (Distributed Data Protocol) streams (e.g., `stream-room-messages`, `stream-notify-room`).
    *   **Post-Message Hooks:** Triggering any `afterSaveMessage` or other server hooks.
*   **File:** `app/lib/server/functions/sendMessage.js` (the core message sending logic).

### 7. Response to Originator

*   After processing, Rocket.Chat sends an HTTP response back to the system that initiated the webhook.
    *   Typically, a `200 OK` status with a success message if the message was sent successfully.
    *   An appropriate error status (e.g., `400 Bad Request`, `401 Unauthorized`, `500 Internal Server Error`) if any part of the process failed.

### Key Files and Modules Involved:

*   **`app/webhooks/server/startup.js`**: Registers the `/hooks/` endpoint.
*   **`app/webhooks/server/lib/WebHook.js`**: Contains the core logic for processing incoming requests, running scripts, and sending messages.
*   **`app/models/server/Integrations.js`**: Interacts with the `rocketchat_integrations` collection to fetch webhook configurations.
*   **`app/lib/server/functions/sendMessage.js`**: The central function for creating and persisting messages in Rocket.Chat.
*   **`vm` (Node.js module)**: Used for sandboxed execution of custom webhook scripts.

This architecture allows for highly customizable and powerful integrations, enabling external systems to seamlessly post messages and interact with Rocket.Chat channels.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,622 |
| Model | gemini-2.5-flash |
| Tools | NONE |
