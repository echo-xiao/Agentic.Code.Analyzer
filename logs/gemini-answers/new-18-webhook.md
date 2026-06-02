# How does an incoming webhook get processed in Rocket.Chat?

## Gemini Answer

An incoming webhook in Rocket.Chat is processed through the following chain of functions:

**Call Chain:** `POST /hooks/:integrationId/:token` → `executeIntegrationRest` → `processWebhookMessage` → `sendMessage` → `Messages.insertOne` → `afterSaveMessage` callbacks

1.  **`POST /hooks/:integrationId/:token`** (Entry Point): An external service sends a POST request to this endpoint with the webhook payload.
2.  **`executeIntegrationRest`** (`apps/meteor/app/integrations/server/api/api.ts`):
    *   This function is the initial handler for the incoming webhook.
    *   It retrieves integration details, processes the request body, and handles potential scripts associated with the integration.
    *   It then calls `processWebhookMessage` to continue the message processing.
3.  **`processWebhookMessage`** (`apps/meteor/app/lib/server/functions/processWebhookMessage.ts`):
    *   This function is responsible for preparing the message and determining the target channels/rooms.
    *   It iterates through the specified channels (or rooms) in the webhook payload.
    *   For each channel, it calls `getRoomWithOptionToJoin` to resolve the room and performs permission validation using `validateRoomMessagePermissionsAsync` and `validateWebhookMessage`.
    *   Finally, for each valid room, it calls the `sendMessage` function to actually send the message.
4.  **`sendMessage`** (likely `apps/meteor/app/lib/server/functions/sendMessage.ts` based on common message flow):
    *   This function takes the user, message, and room as arguments.
    *   It handles the core logic of saving the message to the database. This typically involves:
        *   Inserting the message into the `Messages` collection (e.g., `Messages.insertOne`).
        *   Triggering various `afterSaveMessage` callbacks, which can include functionalities like push notifications, Mentions, Apps Engine hooks, etc.

## Tool Calls (6 calls, 38,687 tokens)

**Step 1:** `search({"query":"executeIntegrationRest"})` → 32 tokens
**Step 2:** `graph({"query":"executeIntegrationRest","direction":"down"})` → 951 tokens
**Step 3:** `implement({"symbolName":"executeIntegrationRest","filename":"apps/meteor/app/integrations/server/api/api.ts"})` → 1140 tokens
**Step 4:** `search({"query":"processWebhookMessage"})` → 36 tokens
**Step 5:** `graph({"query":"processWebhookMessage","direction":"down"})` → 778 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/lib/server/functions/processWebhookMessage.ts","symbolName":"processWeb)` → 564 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 2/3 |
| Tool calls | 6 |
| Total tokens | 38,687 |
