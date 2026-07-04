# What is the complete call chain for sendMessage?

## Plan

intent: call-chain

## Gemini Answer

The `sendMessage` function has multiple entry points and implementations across the Rocket.Chat codebase. Based on the search results, the most relevant server-side implementation for a complete call chain appears to be in `apps/meteor/app/lib/server/functions/sendMessage.ts`.

Here's a breakdown of the call chain for `sendMessage` from `apps/meteor/app/lib/server/functions/sendMessage.ts`:

**Entry Point:** `sendMessage` at `apps/meteor/app/lib/server/functions/sendMessage.ts`

**Call Chain:**

1.  **`sendMessage`** (`apps/meteor/app/lib/server/functions/sendMessage.ts`)
    *   Calls `validateMessage` (`apps/meteor/app/lib/server/functions/sendMessage.ts`)
        *   `validateMessage` performs checks on the message object, including permissions for impersonation and validation of attachments and custom fields.
    *   Calls `prepareMessageObject` (symbol not detailed, but likely a helper function to format the message).
    *   Triggers `AppEvents.IPreMessageSentPrevent`, `AppEvents.IPreMessageSentExtend`, and `AppEvents.IPreMessageSentModify` if Rocket.Chat Apps are loaded.
    *   Calls `Message.beforeSave` (likely a hook for message processing before saving).
    *   Performs database operations:
        *   `Messages.updateOne` (if `upsert` is true and `_id` exists)
        *   `Messages.insertOne` (if `_id` does not exist or `upsert` is false)
    *   Triggers `AppEvents.IPostSystemMessageSent` or `AppEvents.IPostMessageSent` if Rocket.Chat Apps are loaded.
    *   Calls `afterSaveMessage` (symbol not detailed, but likely a hook for post-save message processing).
    *   Calls `notifyOnRoomChangedById` (likely a function to notify clients about changes in the room).

**Key Files:**

*   **`sendMessage` function:** `apps/meteor/app/lib/server/functions/sendMessage.ts` - This is the core server-side function responsible for validating, processing, and saving messages.
*   **`validateMessage` function:** `apps/meteor/app/lib/server/functions/sendMessage.ts` - This function is crucial for ensuring the integrity and permissions of the message before it's saved.

## Tool Calls (8 calls, 96,623 tokens)

**Step 1:** `plan({"question":"What is the complete call chain for sendMessage?","intent":"call-chain"})` → 81 tokens
**Step 2:** `search({"query":"sendMessage"})` → 728 tokens
**Step 3:** `graph({"query":"sendMessage","file":"sendMessage.ts","move":"down","depth":5})` → 2706 tokens
**Step 4:** `graph({"file":"service.ts","move":"down","depth":5,"query":"sendMessage"})` → 2706 tokens
**Step 5:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 617 tokens
**Step 6:** `graph({"file":"sendMessage.ts","depth":5,"query":"sendMessage","move":"down"})` → 2707 tokens
**Step 7:** `search({"query":"validateMessage"})` → 96 tokens
**Step 8:** `details({"filename":"sendMessage.ts","symbolName":"validateMessage"})` → 298 tokens

## Files Seen In Tool Results (28)

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
- `apps/meteor/server/services/messages/service.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/lib/outbound.ts`
- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/slackbridge/server/SlackAPI.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/app/integrations/server/lib/triggerHandler.ts`
- `ee/packages/omni-core-ee/src/outbound-communication/validators/canSendMessage.ts`
- `apps/meteor/tests/e2e/utils/sendMessage.ts`
- `apps/meteor/server/lib/sendMessagesToAdmins.ts`
- `apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `apps/meteor/app/livechat/server/sendMessageBySMS.ts`
- `apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts`
- `apps/meteor/app/authorization/server/functions/canSendMessage.ts`
- `apps/meteor/app/livechat/server/hooks/leadCapture.ts`
