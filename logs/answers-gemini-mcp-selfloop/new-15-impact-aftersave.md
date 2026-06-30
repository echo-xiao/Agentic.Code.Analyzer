# What would be impacted if the afterSaveMessage callback system were changed?

## Gemini Answer

The `afterSaveMessage` callback system is a core event within Rocket.Chat. Changing it would primarily impact the following areas:

**Call Chain:**
`Entry (afterSaveMessage event)` → `Event Listeners/Handlers`

**Key Files and Their Roles:**

*   **`apps/meteor/app/lib/server/lib/afterSaveMessage.ts`**: This file contains the primary implementation of the `afterSaveMessage` function, which explicitly calls `callbacks.run('afterSaveMessage')`. Any modifications here would directly alter how the `afterSaveMessage` event is triggered and processed.
*   **`apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`**: This file is likely involved in the enterprise edition's message read receipt feature and probably registers a listener for the `afterSaveMessage` event.
*   **`apps/meteor/app/search/server/events/index.ts`**: This file likely handles search-related events and may register a listener for `afterSaveMessage` to index messages.

**Impacted Systems/Features (Event Listeners):**

Based on the common events hint from the `search` tool, the following systems and features are known to listen to the `afterSaveMessage` event and would therefore be impacted by changes to its callback system:

*   **Notifications system**: This includes real-time notifications, push notifications, and email notifications related to new messages.
*   **Autotranslate feature**: Any automated translation of messages would be affected.
*   **Slackbridge integration**: Messages being relayed to or from Slack via the bridge would be impacted.
*   **Apps Engine**: Custom applications built using the Rocket.Chat Apps Engine often rely on message-related events, including `afterSaveMessage`, for their functionality.

## Tool Calls (3 calls, 9,913 tokens)

**Step 1:** `search({"query":"afterSaveMessage"})` → 449 tokens
**Step 2:** `graph({"query":"afterSaveMessage","edgeTypes":["event_listen"],"direction":"down","mode":"impact"})` → 175 tokens
**Step 3:** `implement({"symbolName":"afterSaveMessage","filename":"apps/meteor/app/lib/server/lib/afterSaveMessage.ts"})` → 189 tokens
