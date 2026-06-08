# What would be impacted if the afterSaveMessage callback system were changed?

## Gemini Answer

The `afterSaveMessage` callback system is central to several key functionalities within Rocket.Chat. If this system were changed, the following areas would be impacted:

**Call Chain:**

1.  **Entry Point:** `afterSaveMessage` callback event.
2.  **Listeners (identified via `callbacks.add('afterSaveMessage'`)**:
    *   `apps/meteor/app/slackbridge/server/RocketAdapter.ts`: `RocketAdapter.onMessage` (responsible for Slack Bridge integration).
    *   `apps/meteor/app/search/server/events/index.ts`: `afterSaveMessage` function (part of the search and event processing system).

**Impact on `apps/meteor/app/search/server/events/index.ts`'s `afterSaveMessage` handler:**

*   **Room Data Management:** Interacts with `IRoom` (room data) and uses `getUpdater` and `ModifyUpdater` for updates.
*   **Event Promotion:** Calls `promoteEvent` in `apps/meteor/app/lib/server/lib/EventService.ts`, which handles event processing and error logging.
*   **Post-Save Actions (`afterSave` in `service.ts`):**
    *   **Message Broadcasting:** `notifyOnMessageChange` in `apps/meteor/app/lib/server/lib/notifyListener.ts` which uses `broadcast` from `LocalBroker.ts` to inform clients about message changes.
    *   **URL Parsing/OEmbed:** `rocketUrlParser` in `apps/meteor/app/oembed/server/AfterSaveOEmbed.ts` for processing URLs within messages (e.g., generating rich link previews).

**Summary of Impact:**

Changing the `afterSaveMessage` callback system would directly affect:

*   **Slack Bridge Integration:** Messages handled by the Slack Bridge would cease to function correctly if `RocketAdapter.onMessage` is disrupted.
*   **Search Functionality:** The system for indexing and searching messages, as handled by `apps/meteor/app/search/server/events/index.ts`, would be compromised.
*   **Real-time Notifications:** Users would no longer receive real-time updates for message changes due to issues with `notifyOnMessageChange` and message broadcasting.
*   **OEmbed/URL Previews:** The automatic parsing and display of rich previews for URLs in messages would be impacted.
*   **Core Event Processing:** The general event promotion and error logging mechanisms tied to message saving would be affected.

## Tool Calls (5 calls, 11,603 tokens)

**Step 1:** `search({"query":"afterSaveMessage"})` → 261 tokens
**Step 2:** `graph({"edgeTypes":["event_listen"],"direction":"down","query":"afterSaveMessage"})` → 158 tokens
**Step 3:** `search({"query":"callbacks.add('afterSaveMessage'"})` → 263 tokens
**Step 4:** `graph({"layer":"server","direction":"down","query":"RocketAdapter.onMessage"})` → 16 tokens
**Step 5:** `graph({"layer":"server","direction":"down","filename":"apps/meteor/app/search/server/events/index.ts","que)` → 348 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 2/4 |
| Tool calls | 5 |
| Total tokens | 11,603 |
| Pass | NO |
