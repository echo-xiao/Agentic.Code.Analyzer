# What would be impacted if the afterSaveMessage callback system were changed?

## Gemini Answer

If the `afterSaveMessage` callback system were changed, the following areas would be impacted:

**Call Chain:**

1.  **Entry Point: Definition/Reference of `afterSaveMessage`**
    *   `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
    *   `apps/meteor/app/search/server/events/index.ts`
    *   `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
    *   `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`

2.  **Impacted Functional Areas (Listeners):**
    The `afterSaveMessage` callback is a common event used by various modules. Changes to this system would directly affect the functionality of features that listen to this event. These include:
    *   **Notifications**
    *   **Autotranslate**
    *   **Slackbridge**
    *   **Apps Engine**

## Tool Calls (4 calls, 11,654 tokens)

**Step 1:** `search({"query":"afterSaveMessage"})` → 262 tokens
**Step 2:** `graph({"direction":"down","file":"/Users/echoooooo/Desktop/code/Rocket.Chat/apps/meteor/ee/app/message-rea)` → 180 tokens
**Step 3:** `graph({"edgeTypes":["event_listen"],"query":"afterSaveMessage","direction":"down"})` → 175 tokens
**Step 4:** `search({"query":"callbacks.run('afterSaveMessage')"})` → 19 tokens
