# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat automatically translates messages for users based on their individual language settings. The process begins on the server right after a message is saved and involves multiple services to detect the language, translate the content, and store the translations.

### Server-Side: Message Translation

The translation process is initiated by a server-side callback that listens for new messages.

**Call Chain:** `sendMessage` → `callbacks.run('afterSaveMessage')` → `AutoTranslate.translateMessage` → `Messages.addTranslations`

1.  **Entry Point (`afterSaveMessage`):** When a message is sent, the `sendMessage` function eventually triggers the `afterSaveMessage` callback. The auto-translate service registers a handler for this event. This registration occurs in `apps/meteor/app/autotranslate/server/index.ts`, which sets up the integration.

2.  **Translation Handler:** The core logic resides in the `AutoTranslate` abstract class, defined in `apps/meteor/app/autotranslate/server/autotranslate.ts`. This class provides the framework for different translation providers.

3.  **Translation Providers:** Rocket.Chat supports multiple translation providers, each with its own implementation that extends the base `AutoTranslate` class:
    *   **Google Translate:** `apps/meteor/app/autotranslate/server/googleTranslate.ts`
    *   **Microsoft Translate:** `apps/meteor/app/autotranslate/server/msTranslate.ts`
    *   **DeepL Translate:** `apps/meteor/app/autotranslate/server/deeplTranslate.ts`

4.  **Translation Execution:** The handler checks the room and user settings to see if auto-translation is enabled. If it is, it calls the `translateMessage` function located in `apps/meteor/app/autotranslate/server/functions/translateMessage.ts`. This function identifies the active translation provider, sends the message content to its API, and receives the translations for the languages configured for the users in the room.

5.  **Storing Translations:** The returned translations are stored in the message object itself, within the `translations` field. This is done via an update to the message document in the database.

### Client-Side: Displaying Translations

The client is responsible for detecting when to show a translated message instead of the original.

**Call Chain:** `messageStream` → `useAutoTranslate` → `displayTranslatedMessage`

1.  **Receiving Messages:** The client receives new and updated messages through a real-time data stream. A client-side listener for this stream is configured in `apps/meteor/client/startup/streamMessage/autotranslate.ts`.

2.  **UI Logic (`useAutoTranslate`):** The React component responsible for rendering messages uses the `useAutoTranslate` hook, defined in `apps/meteor/client/views/room/MessageList/hooks/useAutoTranslate.ts`.

3.  **Rendering:** This hook checks if a message object contains a `translations` field and if the user's current language preference matches one of the available translations. If so, it replaces the original message text with the translated version before it is rendered in the message list. The user is also typically shown an indicator that the message has been translated.

## Tool Calls (8 calls, 35,664 tokens)

**Step 1:** `search({"query":"autoTranslate"})` → 584 tokens
**Step 2:** `search({"query":"autoTranslate","layer":"server"})` → 559 tokens
**Step 3:** `graph({"query":"AutoTranslate.translateMessage"})` → 17 tokens
**Step 4:** `search({"query":"class AutoTranslate","layer":"server"})` → 222 tokens
**Step 5:** `graph({"query":"autotranslate.AutoTranslate","direction":"down"})` → 17 tokens
**Step 6:** `search({"query":"afterSaveMessage","layer":"server"})` → 261 tokens
**Step 7:** `graph({"direction":"down","edgeTypes":["event_listen"],"query":"afterSaveMessage"})` → 158 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/autotranslate/server/index.ts","symbolName":"Meteor.startup"})` → 49 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 6/6 |
| Symbols hit | 2/2 |
| Tool calls | 8 |
| Total tokens | 35,664 |
| Pass | YES |
