# How does an incoming webhook get processed in Rocket.Chat?

## Baseline Answer (no tools)

Processing an incoming webhook in Rocket.Chat involves several steps, from receiving the HTTP request to transforming the payload and finally inserting the message into a room.

Here's a detailed breakdown of the process:

1.  **HTTP Endpoint Reception:**
    *   All incoming webhook requests hit a specific API endpoint. This endpoint is typically handled by the `integrations` module.
    *   The core route is defined in `server/api/v1/integrations.js`.
    *   Specifically, the `POST /api/v1/integrations.incoming/:_id` route is responsible for receiving the webhook payload. The `_id` in the URL identifies the specific incoming integration configured by the user.
    *   The `authRequired: false` setting for this route means that no user authentication is required, as the `_id` (token) itself serves as the authentication mechanism.

    ```javascript
    // server/api/v1/integrations.js
    API.v1.addRoute('integrations.incoming/:_id', { authRequired: false }, {
        post() {
            const { _id } = this.urlParams;
            const data = this.request.body;
            const query = this.request.query; // Query parameters might be used by some integrations

            // ... further processing ...
            const integration = Integrations.model.findOne({ _id, type: 'webhook-incoming', enabled: true });
            if (!integration) {
                return API.v1.failure('Integration not found or disabled.');
            }

            // Calls the Integrations service to process the webhook
            const result = Integrations.processWebhook({ integration, data, query, request: this.request });

            if (result.error) {
                return API.v1.failure(result.error);
            }

            return API.v1.success(result.data);
        },
    });
    ```

2.  **Integration Lookup and Validation:**
    *   Upon receiving a request, the system uses the `_id` from the URL to look up the corresponding incoming integration record in the `integrations` collection (`rocketchat_integrations` in MongoDB).
    *   It verifies that the integration exists, is of type `webhook-incoming`, and is `enabled`. If not, an error is returned.

    ```javascript
    // app/integrations/server/lib/Integrations.js (Simplified)
    Integrations.processWebhook = function ({ integration, data, query, request }) {
        // ... (fetches integration record as seen above in API route)
        return Integrations.processIncomingWebhook({ integration, request: { body: data, query, headers: request.headers } });
    };
    ```

3.  **Script Identification and Loading:**
    *   The `Integrations.processIncomingWebhook` function (located in `app/integrations/server/lib/Integrations.js`) is central.
    *   It determines *how* to parse and transform the incoming payload. There are two main approaches:
        *   **Custom Script:** If the integration has a `scriptEnabled` flag set to `true` and a `script` defined, Rocket.Chat will use this custom JavaScript code provided by the user.
        *   **Predefined Script:** If no custom script is enabled, Rocket.Chat tries to infer the webhook type (e.g., `github`, `gitlab`, `slack`, `zapier`) based on the integration's `triggerWords`, URL parameters, or by examining the payload structure. It then loads a corresponding predefined script from `app/integrations/server/lib/incoming/`. For example:
            *   `app/integrations/server/lib/incoming/slack.js`
            *   `app/integrations/server/lib/incoming/github.js`
            *   `app/integrations/server/lib/incoming/gitlab.js`
            *   `app/integrations/server/lib/incoming/zapier.js`

4.  **Script Execution (Payload Transformation):**
    *   The identified (custom or predefined) script is executed in a secure sandboxed environment using Node.js's `vm` module. This prevents malicious scripts from accessing sensitive server resources.
    *   The script receives the incoming `request` object (containing `body`, `headers`, `query`) and is expected to return an object (or an array of objects) conforming to Rocket.Chat's internal message format.
    *   Helper functions and modules are made available to the script, such as `console.log`, `_` (lodash), `s` (underscore.string), `CryptoJS`, `HTTP` (for making outgoing requests), and the `Integrations` object itself (for more advanced operations like finding a user or room).

    ```javascript
    // app/integrations/server/lib/Integrations.js
    Integrations.runIncomingWebhookScript = function ({ script, request, integration }) {
        // ... sets up vm sandbox context with request, console, _, s, CryptoJS, HTTP, etc.
        const sandbox = {
            _, s, CryptoJS, HTTP, console,
            request: deepClone(request), // Deep clone to prevent script from modifying original request
            integration: deepClone(integration),
            // ... other helpers
            // A special 'send' function is exposed if the script wants to manually send messages
            // rather than returning them.
            send(message) { /* ... calls Integrations.processMessage ... */ },
        };

        const vmContext = vm.createContext(sandbox);
        // Executes the script within the sandbox
        const scriptResult = vm.runInContext(script, vmContext, {
            timeout: process.env.NODE_ENV === 'development' ? 0 : 10000, // 10s timeout
            filename: `${ integration._id }.js`,
            displayErrors: true,
        });

        // The scriptResult is expected to be a message object or an array of message objects
        // or undefined if the script handled sending messages itself via 'send'
        return scriptResult;
    };
    ```

5.  **Message Object Creation and Normalization:**
    *   The `Integrations.runIncomingWebhookScript` returns a message object (or an array of messages) that the `Integrations.processIncomingWebhook` function then processes.
    *   This resulting object is passed to `Integrations.processMessage` (also in `app/integrations/server/lib/Integrations.js`).
    *   `Integrations.processMessage` performs several crucial steps:
        *   **User Resolution:** It identifies the `bot` user associated with the integration. If `integration.username` is set, it uses that; otherwise, it defaults to `rocket.cat` or another configured bot user. It ensures the message is sent by an existing, valid user.
        *   **Room Resolution:** It determines the target room(s) based on the script's output (`channel` property), `integration.channel` settings, or default room configurations. It can handle multiple target rooms.
        *   **Message Formatting:** It ensures the message conforms to Rocket.Chat's internal message schema, populating fields like `msg`, `alias`, `emoji`, `attachments`, `parseUrls`, `mentions`, `groupable`, `ts`, `_updatedAt`, etc.
        *   **Mentions/Channel Linking:** It processes any `@mentions` or `#channel` links within the message text.
        *   **Persistence:** It prepares the message to be saved to the `rocketchat_message` collection.

6.  **Message Saving and Real-time Delivery:**
    *   Finally, `Integrations.processMessage` calls `RocketChat.sendMessage` (defined in `server/lib/sendMessages.js`).
    *   `RocketChat.sendMessage` is the standard method for sending messages in Rocket.Chat. It handles:
        *   Saving the message to the `rocketchat_message` MongoDB collection.
        *   Triggering relevant hooks (`beforeSaveMessage`, `afterSaveMessage`, `afterSaveMessagePopulate`).
        *   Publishing the new message via DDP (Distributed Data Protocol) to all connected clients that are subscribed to the target room. This ensures that the message appears in real-time in web, desktop, and mobile applications.

In essence, an incoming webhook is a highly configurable mechanism that allows external services to inject data into Rocket.Chat rooms by hitting a specific, token-authenticated endpoint. The core logic revolves around dynamically executing a JavaScript script (either user-defined or predefined) to transform the external service's payload into Rocket.Chat's native message format, which is then processed and delivered like any other message.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,693 |
| Model | gemini-2.5-flash |
| Tools | NONE |
