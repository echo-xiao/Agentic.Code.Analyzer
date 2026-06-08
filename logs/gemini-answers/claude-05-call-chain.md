# What is the complete call chain for sendMessage?

## Gemini Answer

The complete call chain for `sendMessage` starts with a client-side DDP method call, which is then handled on the server by `executeSendMessage`, leading to the core `sendMessage` function, which in turn orchestrates various validation, persistence, and event-triggering steps.

Here is the call chain:

**Entry → Step 1 → Step 2 → Step 3 → Final**

1.  **Client-side DDP Method Dispatch:**
    *   Client calls a DDP method named `sendMessage` (e.g., `sdk.call('sendMessage')`)
    *   **File:** (Client-side, not directly available in server tools, but implied by DDP pattern)
2.  **Server DDP Method Handler:**
    *   The DDP method is handled on the server by `executeSendMessage`.
    *   **File:** `apps/meteor/app/lib/server/methods/sendMessage.ts`
3.  **Core Message Sending Function:**
    *   `executeSendMessage` calls the main `sendMessage` function.
    *   **Symbol:** `sendMessage`
    *   **File:** `apps/meteor/app/lib/server/functions/sendMessage.ts`
4.  **Internal Steps within `sendMessage` (apps/meteor/app/lib/server/functions/sendMessage.ts):**
    *   `validateMessage`
        *   **File:** Likely `apps/meteor/app/livechat/server/hooks/leadCapture.ts` (based on graph context for `validateMessage`)
        *   Calls various helper functions like `get`, `isArray`, `check` (from `ufs-filter.ts`), `hasPermissionAsync` (from `hasPermission.ts`), `validateCustomMessageFields` (from `validateCustomMessageFields.ts`), and `objectMaybeIncluding`.
    *   `prepareMessageObject` (function)
    *   `Apps.self?.triggerEvent(AppEvents.IPreMessageSentPrevent, message)` (Rocket.Chat Apps Engine pre-message sent prevention hook)
    *   `Apps.self?.triggerEvent(AppEvents.IPreMessageSentExtend, message)` (Rocket.Chat Apps Engine pre-message sent extend hook)
    *   `Apps.self?.triggerEvent(AppEvents.IPreMessageSentModify, result)` (Rocket.Chat Apps Engine pre-message sent modification hook)
    *   `Message.beforeSave({ message, room, user, previewUrls, parseUrls: message.parseUrls })` (Message pre-save hook)
    *   `Messages.updateOne` or `Messages.insertOne` (MongoDB operations for message persistence)
    *   `Apps.self?.triggerEvent(messageEvent, message)` (Rocket.Chat Apps Engine post-message sent hook: `AppEvents.IPostSystemMessageSent` or `AppEvents.IPostMessageSent`)
    *   `afterSaveMessage` (function)
    *   `notifyOnRoomChangedById(message.rid)` (notification mechanism)

## Tool Calls (8 calls, 70,981 tokens)

**Step 1:** `search({"query":"sendMessage"})` → 820 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"sendMessage"})` → 637 tokens
**Step 3:** `implement({"symbolName":"sendMessage","filename":"apps/meteor/app/lib/server/functions/sendMessage.ts"})` → 621 tokens
**Step 4:** `graph({"layer":"server","direction":"down","query":"sendMessage"})` → 637 tokens
**Step 5:** `graph({"direction":"down","query":"sendMessage","filename":"apps/meteor/app/lib/server/functions/sendMessa)` → 1084 tokens
**Step 6:** `graph({"query":"sendMessage","direction":"down","filename":"apps/meteor/server/services/messages/service.t)` → 1084 tokens
**Step 7:** `graph({"query":"validateMessage","layer":"server","direction":"down"})` → 1333 tokens
**Step 8:** `search({"layer":"server","query":"executeSendMessage"})` → 168 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 6/8 |
| Tool calls | 8 |
| Total tokens | 70,981 |
| Pass | NO |
