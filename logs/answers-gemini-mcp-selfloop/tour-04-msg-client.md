# How is a message sent on the client side in Rocket.Chat?

## Plan

intent: call-chain

## Gemini Answer

The client-side message sending process in Rocket.Chat begins with the `ComposerMessage` component in `apps/meteor/client/views/room/composer/ComposerMessage.tsx`. This component captures user input and triggers the `sendMessage` flow.

Here's a breakdown of the message sending flow:

1.  **User Input and Preprocessing**:
    *   The `ComposerMessage` component's `onSend` prop calls `chat?.flows.sendMessage`.
    *   The `sendMessage` function, located in `apps/meteor/client/lib/chats/flows/sendMessage.ts`, is invoked.
    *   The message text is trimmed and unclosed code blocks are handled by `closeUnclosedCodeBlock`.
    *   Various processors are applied, including `processSetReaction`, `processTooLongMessage`, `processSlashCommand`, and `processMessageUploads`.
    *   The `onClientBeforeSendMessage` callback is executed, allowing for modifications to the message before it's sent.

2.  **Optimistic UI Update**:
    *   Although not directly shown in the `sendMessage` call chain, the `wiki` tool indicates that `runOptimisticSendMessage` (found in `apps/meteor/app/lib/client/methods/sendMessage.ts`) is called to immediately add the message to the local `Messages` store with a `temp: true` flag. This provides an optimistic update to the user interface.

3.  **Server Communication**:
    *   The `process` function within `apps/meteor/client/lib/chats/flows/sendMessage.ts` ultimately makes the call to the server using `sdk.call('sendMessage', message, previewUrls)`. This sends the message to the server-side `sendMessage` Meteor method for persistence.

4.  **Finalization**:
    *   After the server responds, the `Messages.state.update` function is called to remove the `temp` flag from the local message record, indicating successful server processing.

**Key Files:**

*   **`apps/meteor/client/views/room/composer/ComposerMessage.tsx`**: This React component is the entry point for user message input.
*   **`apps/meteor/client/lib/chats/flows/sendMessage.ts`**: This file contains the core client-side logic for processing and sending messages, including preprocessing and calling the server.
*   **`apps/meteor/app/lib/client/methods/sendMessage.ts`**: This file contains `runOptimisticSendMessage`, which handles the optimistic UI update.

## Tool Calls (8 calls, 82,064 tokens)

**Step 1:** `plan({"intent":"call-chain","question":"How is a message sent on the client side in Rocket.Chat?"})` → 81 tokens
**Step 2:** `search({"query":"sendMessage","layer":"client"})` → 150 tokens
**Step 3:** `graph({"file":"sendMessage.ts","query":"sendMessage","depth":5,"move":"down"})` → 2706 tokens
**Step 4:** `graph({"query":"sendMessage","file":"sendMessage.ts","move":"down","depth":5})` → 2706 tokens
**Step 5:** `wiki({"question":"client-side message sending architecture"})` → 1273 tokens
**Step 6:** `details({"filename":"ComposerMessage.tsx","symbolName":"ComposerMessage"})` → 519 tokens
**Step 7:** `details({"filename":"sendMessage.ts","symbolName":"sendMessage"})` → 621 tokens
**Step 8:** `details({"filename":"sendMessage.ts","symbolName":"process"})` → 317 tokens

## Files Seen In Tool Results (9)

- `apps/meteor/client/lib/chats/flows/sendMessage.ts`
- `apps/meteor/app/lib/client/methods/sendMessage.ts`
- `apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx`
- `apps/meteor/client/lib/onClientBeforeSendMessage.ts`
- `apps/meteor/client/views/room/composer/ComposerMessage.tsx`
- `apps/meteor/app/ui/client/lib/ChatMessages.ts`
- `apps/meteor/app/lib/server/methods/sendMessage.ts`
- `apps/meteor/app/api/server/v1/chat.ts`
- `ee/apps/ddp-streamer/src/Streamer.ts`
