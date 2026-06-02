# How is a message sent on the client side in Rocket.Chat?

## Answer

Client-side message sending follows a React component chain through four layers: UI composition, event handling, flow orchestration, and DDP transport.

### 1. Component Chain

**RoomBody** (`apps/meteor/client/views/room/body/RoomBody.tsx`) is the top-level room view. It renders **ComposerContainer** (line 260-268) with props for subscription, resize, and message navigation callbacks.

**ComposerContainer** (`apps/meteor/client/views/room/composer/ComposerContainer.tsx`) is a conditional renderer that evaluates room state (archived, read-only, omnichannel, federated, anonymous, blocked) and renders the appropriate composer variant. For normal rooms, it renders **ComposerMessage**.

**ComposerMessage** (`apps/meteor/client/views/room/composer/ComposerMessage.tsx`) accepts an `onSend` callback prop. It creates a `composerProps` object with an async `onSend` handler that:
1. Stops the typing indicator via `chat.action.stop('typing')`
2. Calls `chat.flows.sendMessage({ text, tshow, previewUrls, isSlashCommandAllowed, tmid })`
3. If the message was sent successfully, calls the parent's `onSend?.()` callback

ComposerMessage renders **MessageBox** with these props spread.

**MessageBox** (`apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx`) is the actual input UI. Its `handleSendMessage()` function (line 164-178):
1. Checks if uploads are in progress (returns early if so)
2. Gets text from `chat.composer?.text`
3. Clears the autocomplete popup
4. Invokes `onSend({ value: text, tshow, previewUrls, isSlashCommandAllowed })`

MessageBox also handles keyboard events (Enter to send, Escape to cancel edit, Ctrl+B/I/U for formatting), paste events (image upload from clipboard), and renders the toolbar, emoji picker, file upload display, and autocomplete popup.

### 2. Flow Orchestration

**ChatAPI** (`apps/meteor/client/lib/chats/ChatAPI.ts`) defines the `ChatAPI` interface — the contract for all chat operations. Key interfaces:
- `ComposerAPI`: text manipulation, quoting, editing state, recording state
- `DataAPI`: message CRUD, room/subscription access, drafts
- `UploadsAPI`: file upload management
- `flows`: orchestration methods including `sendMessage`, `uploadFiles`, `processSlashCommand`

**sendMessage flow** (`apps/meteor/client/lib/chats/flows/sendMessage.ts`):

1. **Join check** (line 65-72): If user is not subscribed to the room, attempts `chat.data.joinRoom()`
2. **Clear unread** (line 74): Calls `chat.readStateManager.clearUnreadMark()`
3. **Text preprocessing** (line 76-79): Trims whitespace, closes unclosed code blocks
4. **Message composition** (line 88-104): Calls `chat.data.composeMessage(text, { sendToChannel, quotedMessages, originalMessage })`
5. **Process pipeline** via `process()` helper (line 16-54):
   - `processSetReaction()` — check if message is an emoji reaction
   - `processTooLongMessage()` — handle messages exceeding size limit
   - `processSlashCommand()` — if allowed, parse and execute slash commands via `processSlashCommand()` in `apps/meteor/client/lib/chats/flows/processSlashCommand.ts`
   - `processMessageUploads()` — handle file attachments
   - `onClientBeforeSendMessage()` hook — pre-send client hook
   - `processMessageEditing()` — if editing an existing message
6. **Send** (line 46-47): Clears composer, then calls `sdk.call('sendMessage', message, previewUrls)` — this is the DDP boundary crossing to the server

### 3. Key Files

| File | Role |
|------|------|
| `apps/meteor/client/views/room/body/RoomBody.tsx` | Top-level room view, renders ComposerContainer |
| `apps/meteor/client/views/room/composer/ComposerContainer.tsx` | Conditional composer renderer based on room state |
| `apps/meteor/client/views/room/composer/ComposerMessage.tsx` | Wires onSend callback to chat.flows.sendMessage |
| `apps/meteor/client/views/room/composer/messageBox/MessageBox.tsx` | Input UI, handleSendMessage, keyboard handling |
| `apps/meteor/client/lib/chats/ChatAPI.ts` | Interface contract for all chat operations |
| `apps/meteor/client/lib/chats/flows/sendMessage.ts` | Orchestrates send flow: join, validate, process, sdk.call |

### 4. Key Symbols

`RoomBody`, `ComposerContainer`, `ComposerMessage`, `MessageBox`, `handleSendMessage`, `onSend`, `ChatAPI`, `sendMessage`, `processSlashCommand`
