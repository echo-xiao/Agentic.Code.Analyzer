# How does an incoming webhook get processed in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

Incoming webhooks in Rocket.Chat are processed through a dedicated API endpoint that handles the incoming payload, validates it, and then dispatches the message to the appropriate channels. The core logic for this processing resides in the `processWebhookMessage` function.

Here's a breakdown of the processing flow:

1.  **Webhook Creation**: An incoming webhook is initially set up via the `addIncomingIntegration` method, found in `apps/meteor/app/integrations/server/methods/incoming/addIncomingIntegration.ts`. This method validates the integration's properties and compiles any associated script.

2.  **API Endpoint**: Incoming webhook requests are sent to a specific URL, typically `/hooks/{integrationId}/{token}`.

3.  **Payload Handling**: The system automatically detects `application/x-www-form-urlencoded` payloads containing a `payload` JSON string and unwraps Slack/GitHub style payloads.

4.  **Message Construction**: The `processWebhookMessage` function, located at `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`, receives the incoming payload and constructs a message object. It extracts fields like `text` or `msg`, `username` or `alias`, `icon_emoji` or `emoji`, `icon_url` or `avatar`, and `attachments`. Default values for channel, alias, avatar, and emoji can also be provided. This function calls `buildMessage` (within the same file) to construct the message.

5.  **Channel Resolution and Permissions**: For each specified channel in the payload, the system determines the target room using `getRoomWithOptionToJoin` (also within `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`). This function, in turn, calls `getRoomByNameOrIdWithOptionToJoin` from `apps/meteor/app/lib/server/functions/getRoomByNameOrIdWithOptionToJoin.ts`. It then validates if the user associated with the webhook has the necessary permissions to send messages to that room using `validateRoomMessagePermissionsAsync` from `apps/meteor/app/lib/server/functions/canSendMessage.ts`.

6.  **Message Validation**: The constructed message undergoes validation via `validateWebhookMessage` (within `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`), which checks for message size limits and other constraints. This function calls `validateMessage` from `apps/meteor/app/lib/server/functions/leadCapture.ts`.

7.  **Message Sending**: Finally, the validated message is sent to the resolved room(s) using the `sendMessage` function, which is part of `LivechatClientImpl.ts`. If `separateResponse` is enabled in the payload, messages will be sent to other channels even if some fail.

## Tool Calls (8 calls, 70,548 tokens)

**Step 1:** `plan({"question":"How does an incoming webhook get processed in Rocket.Chat?","intent":"call-chain"})` → 81 tokens
**Step 2:** `wiki({"question":"How are incoming webhooks processed in Rocket.Chat?"})` → 763 tokens
**Step 3:** `search({"query":"processWebhookMessage"})` → 77 tokens
**Step 4:** `graph({"move":"down","depth":5,"query":"processWebhookMessage","file":"processWebhookMessage.ts"})` → 5607 tokens
**Step 5:** `search({"query":"hooks","layer":"server"})` → 479 tokens
**Step 6:** `search({"layer":"server","query":"API endpoint webhook"})` → 27 tokens
**Step 7:** `search({"query":"addIncomingIntegration"})` → 82 tokens
**Step 8:** `search({"layer":"server","query":"/hooks/"})` → 479 tokens

## Files Seen In Tool Results (19)

- `apps/meteor/tests/end-to-end/api/livechat/06-integrations.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/app/lib/server/functions/processWebhookMessage.ts`
- `apps/meteor/tests/unit/server/services/room/hooks/FederationActions.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveSpotify.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSavePreventMention.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveMarkdownParser.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveJumpToMessage.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveCheckMAC.tests.ts`
- `apps/meteor/tests/unit/server/services/messages/hooks/BeforeSaveBadWords.tests.ts`
- `apps/meteor/tests/unit/app/livechat/server/hooks/sendToCRM.tests.ts`
- `apps/meteor/server/services/room/hooks/BeforeFederationActions.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveSpotify.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSavePreventMention.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveMentions.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveMarkdownParser.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveJumpToMessage.ts`
- `apps/meteor/server/services/messages/hooks/BeforeSaveCheckMAC.ts`
- `apps/meteor/app/integrations/server/methods/incoming/addIncomingIntegration.ts`
