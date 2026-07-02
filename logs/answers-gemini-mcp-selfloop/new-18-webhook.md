# How does an incoming webhook get processed in Rocket.Chat?

## Gemini Answer

The processing of an incoming webhook in Rocket.Chat follows this chain:

**Entry Point → Message Construction & Validation → Message Sending**

1.  **Entry Point: Webhook Reception & Initial Processing**
    *   An incoming webhook request (e.g., `POST /hooks/:integrationId/:token`) is received.
    *   This request is handled by `executeIntegrationRest()` located in `apps/meteor/app/integrations/server/api/api.ts`. This function is responsible for authenticating the request and executing the associated integration script within an isolated environment.

2.  **Message Construction & Validation**
    *   The integration script, or a subsequent call, then invokes `processWebhookMessage()` located in `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`.
    *   `processWebhookMessage` receives the webhook payload, the user associated with the integration, and any default values.
    *   It constructs the core message object using `buildMessage`.
    *   It identifies the target channels or rooms from the payload and retrieves the corresponding room information using `getRoomWithOptionToJoin`.
    *   Crucially, it performs permission checks to ensure the message can be sent to the identified rooms, utilizing `validateRoomMessagePermissionsAsync` and `validateWebhookMessage`.

3.  **Message Sending**
    *   For each valid room, `processWebhookMessage` calls `sendMessage()` located in `apps/meteor/app/lib/server/functions/sendMessage.ts`.
    *   `sendMessage` performs further validation of the message object using `validateMessage` and prepares it with `prepareMessageObject`.
    *   **App Integration:** A significant part of `sendMessage` involves interaction with Rocket.Chat Apps. It triggers events like `IPreMessageSentPrevent` (allowing apps to stop the message), `IPreMessageSentExtend`, and `IPreMessageSentModify` (allowing apps to modify the message content).
    *   The message then goes through `Message.beforeSave` for additional processing.
    *   The message is persisted in the database by either inserting a new record or updating an existing one in the `Messages` collection.
    *   After the message is saved, `sendMessage` triggers post-send events for apps (`IPostSystemMessageSent` for system messages or `IPostMessageSent` for regular messages) and executes `afterSaveMessage` for any final actions.
    *   Finally, it notifies relevant listeners about changes in the room using `notifyOnRoomChangedById`.

## Tool Calls (6 calls, 32,856 tokens)

**Step 1:** `plan({"question":"How does an incoming webhook get processed in Rocket.Chat?","intent":"call-chain"})` → 81 tokens
**Step 2:** `search({"query":"incoming webhook"})` → 217 tokens
**Step 3:** `graph({"query":"executeIntegrationRest","depth":5,"move":"down"})` → 3414 tokens
**Step 4:** `graph({"move":"down","depth":5,"query":"processWebhookMessage"})` → 2876 tokens
**Step 5:** `details({"filename":"apps/meteor/app/lib/server/functions/processWebhookMessage.ts","symbolName":"processWeb)` → 590 tokens
**Step 6:** `details({"filename":"apps/meteor/app/lib/server/functions/sendMessage.ts","symbolName":"sendMessage"})` → 617 tokens

## Files Seen In Tool Results (4)

- `apps/meteor/server/startup/migrations/v298.ts`
- `apps/meteor/app/integrations/server/api/api.ts`
- `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
