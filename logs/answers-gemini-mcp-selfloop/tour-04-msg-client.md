# How is a message sent on the client side in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

The client-side message sending process in Rocket.Chat is orchestrated by the `ChatMessages` class, which implements the `ChatAPI` interface.

Here's the flow:

1.  **`ChatMessages`** (`apps/meteor/app/ui/client/lib/ChatMessages.ts`): This class acts as the central hub for chat message operations. It manages the composer state, message editing, and various message flows. It holds a reference to a `ComposerAPI` instance.
2.  **`ComposerAPI`** (`apps/meteor/client/lib/chats/ChatAPI.ts`): This interface defines the methods for interacting with the message input composer, such as setting and getting text, handling selections, inserting text, and managing quoted messages and editing/recording modes.
3.  **`sendMessage`** (`apps/meteor/client/lib/chats/flows/sendMessage.ts`): This function is responsible for the actual sending of the message. It takes the `ChatAPI` instance and message details (text, thread show, preview URLs, slash command allowance) as arguments.
    *   It first checks if the user is subscribed to the room and attempts to join if not.
    *   It clears any unread marks.
    *   It retrieves any files from the composer's uploads store.
    *   It trims and processes the message text (e.g., closing unclosed code blocks).
    *   If there's text or files, it composes the message object using `chat.data.composeMessage`, including quoted messages and original message details if editing.
    *   For encrypted messages being edited with files, it preserves the original attachments.
    *   Finally, it calls the `process` function (within the same file) to handle the message and dismisses any quoted messages from the composer.
    *   If only a message ID (`mid`) is present (indicating an attempt to delete an empty edited message), it processes message editing or requests message deletion.

## Tool Calls (8 calls, 61,212 tokens)

**Step 1:** `plan({"question":"How is a message sent on the client side in Rocket.Chat?","intent":"call-chain"})` → 3694 tokens
**Step 2:** `search({"query":"ChatMessages","layer":"client"})` → 100 tokens
**Step 3:** `graph({"file":"ChatMessages.ts","move":"down","depth":3,"query":"ChatMessages"})` → 39 tokens
**Step 4:** `details({"filename":"ChatMessages.ts","symbolName":"ChatMessages"})` → 988 tokens
**Step 5:** `search({"query":"ComposerAPI","layer":"client"})` → 96 tokens
**Step 6:** `details({"filename":"ChatAPI.ts","symbolName":"ComposerAPI"})` → 426 tokens
**Step 7:** `search({"layer":"client","query":"sendMessage"})` → 150 tokens
**Step 8:** `details({"symbolName":"sendMessage","filename":"sendMessage.ts"})` → 621 tokens

## Files Seen In Tool Results (39)

- `apps/meteor/app/message-pin/server/pinMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterReadMessages.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterDeleteRoom.ts`
- `apps/meteor/ee/server/api/chat.ts`
- `packages/ui-composer/src/MessageComposer/MessageComposer.tsx`
- `packages/ui-composer/src/MessageComposer/MessageComposerIcon.tsx`
- `packages/ui-composer/src/MessageFooterCallout/MessageFooterCalloutContent.tsx`
- `apps/meteor/server/services/messages/service.ts`
- `packages/apps-engine/src/definition/messages/IMessage.ts`
- `apps/meteor/app/message-star/server/starMessage.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/app/apps/server/converters/messages.js`
- `packages/apps-engine/src/server/accessors/MessageRead.ts`
- `apps/meteor/app/irc/server/irc-bridge/peerHandlers/sentMessage.js`
- `apps/meteor/app/ui/client/lib/ChatMessages.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/notifier.ts`
- `apps/meteor/client/lib/rooms/roomTypes/direct.ts`
- `apps/meteor/app/lib/server/functions/isTheLastMessage.ts`
- `apps/meteor/app/ui/client/lib/CurrentEditingMessage.ts`
- `packages/models/src/models/Messages.ts`
- `apps/meteor/app/apps/server/converters/convertMessageFiles.ts`
- `ee/packages/federation-matrix/src/helpers/message.parsers.ts`
- `apps/meteor/client/views/room/contextualBar/MessageListTab.tsx`
- `apps/meteor/app/ui-utils/client/lib/messageBox.ts`
- `apps/meteor/app/api/server/v1/chat.ts`
- `packages/apps-engine/src/server/accessors/Http.ts`
- `packages/apps-engine/src/server/managers/AppOutboundCommunicationProvider.ts`
- `ee/packages/federation-matrix/src/events/message.ts`
- `apps/meteor/client/views/room/MessageList/MessageListItem.tsx`
- `apps/meteor/client/lib/chats/flows/processTooLongMessage.ts`
- `apps/meteor/client/views/room/providers/hooks/useChatMessagesInstance.ts`
- `apps/meteor/client/lib/chats/ChatAPI.ts`
- `apps/meteor/app/ui-message/client/messageBox/createComposerAPI.ts`
- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
