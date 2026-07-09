# What is the complete call chain for sendMessage?

## Plan

intent: call-chain

## Gemini Answer

The `sendMessage` functionality in Rocket.Chat has distinct call chains for client-side and server-side operations.

**Client-side `sendMessage` Call Chain:**

1.  **Entry Point:** `sendMessage` in `apps/meteor/client/lib/chats/flows/sendMessage.ts`
    *   This function first checks if the user is subscribed to the room and attempts to join if not.
    *   It clears the unread mark for the room.
    *   It processes the message text, including closing unclosed code blocks.
    *   It composes the message object using `chat.data.composeMessage`.
    *   It then calls an internal `process` function.
2.  **Processing Message:** `process` in `apps/meteor/client/lib/chats/flows/sendMessage.ts`
    *   This function handles various message-related operations:
        *   `processSetReaction`
        *   `processTooLongMessage`
        *   `processSlashCommand`
        *   `processMessageUploads`
        *   `onClientBeforeSendMessage` hooks
        *   `processMessageEditing`
    *   Finally, it calls `sdk.call('sendMessage', message, previewUrls)` to send the message to the server.

**Server-side `sendMessage` Call Chain (Meteor Method):**

1.  **Entry Point:** The Meteor method `sendMessage` in `apps/meteor/app/lib/server/methods/sendMessage.ts`.
    *   This method performs checks on message parameters and user authentication.
    *   It prevents sending system messages.
    *   It calls `applyAirGappedRestrictionsValidation` which then executes `executeSendMessage`.
2.  **Execute Send Message:** `executeSendMessage` in `apps/meteor/app/lib/server/methods/sendMessage.ts`.
    *   This function validates message timestamps and size.
    *   It retrieves user and room information.
    *   It checks if the user can send messages to the room using `canSendMessageAsync`.
    *   It enforces E2E encryption rules if applicable.
    *   Finally, it calls the core `sendMessage` function.

**Core `sendMessage` Function (Server-side):**

The core `sendMessage` function, which is ultimately responsible for message persistence and post-processing, is located in `apps/meteor/app/lib/server/functions/sendMessage.ts`. This function is called by various server-side components, including the Meteor method and REST API endpoint.

**Note:** The `details` tool was unable to retrieve the source for `executeSendMessage` in `apps/meteor/app/lib/server/methods/sendMessage.ts` and `sendMessage` in `apps/meteor/server/lib/messages/sendMessage.ts` (which the wiki indicated as the core `sendMessage`). However, the wiki provided a detailed description of their roles in the call chain. The `search` tool confirmed the existence of `sendMessage` in `apps/meteor/app/lib/server/functions/sendMessage.ts`, which is likely the core function the wiki was referring to.

## Tool Calls (8 calls, 82,902 tokens)

**Step 1:** `plan({"question":"What is the complete call chain for sendMessage?","intent":"call-chain"})` → 1678 tokens
**Step 2:** `search({"query":"sendMessage","layer":"client"})` → 150 tokens
**Step 3:** `graph({"move":"down","file":"sendMessage.ts","query":"sendMessage","depth":5})` → 2706 tokens
**Step 4:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens
**Step 5:** `details({"filename":"sendMessage.ts","symbolName":"process"})` → 317 tokens
**Step 6:** `search({"query":"sendMessage","layer":"server"})` → 318 tokens
**Step 7:** `graph({"move":"down","query":"sendMessage","depth":5,"file":"sendMessage.ts"})` → 2706 tokens
**Step 8:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 520 tokens

## Files Seen In Tool Results (30)

- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/server/lib/messages/sendMessage.ts`
- `apps/meteor/server/api/v1/chat.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/server/services/media-call/service.ts`
- `apps/meteor/app/lib/server/lib/processDirectEmail.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `packages/core-services/src/types/IMessageService.ts`
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
- `packages/ddp-client/src/livechat/LivechatClientImpl.ts`
- `packages/ddp-client/src/legacy/RocketchatSDKLegacy.ts`
- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat-embedded.ts`
- `apps/meteor/tests/e2e/page-objects/fragments/home-content.ts`
- `apps/meteor/tests/e2e/federation/page-objects/fragments/home-content.ts`
- `apps/meteor/tests/data/messages.helper.ts`
- `apps/meteor/tests/data/chat.helper.ts`
- `apps/meteor/tests/data/livechat/rooms.ts`
