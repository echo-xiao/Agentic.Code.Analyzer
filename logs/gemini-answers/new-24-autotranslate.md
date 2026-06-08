# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat works by intercepting messages after they are saved and then translating them using a configured translation provider.

Here's a breakdown of the process:

**Entry Point:** The `AutoTranslate` component in `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.tsx` likely handles the client-side UI for enabling and configuring auto-translate.

**Server-Side Translation Logic:**

1.  **`TranslationProviderRegistry`:** This class, found in `apps/meteor/app/autotranslate/server/autotranslate.ts`, is the central hub for managing translation providers. It keeps track of available providers (like GoogleAutoTranslate, MSTranslate, and DeepLTranslate) and the currently active one.
2.  **`registerCallbacks`:** The `TranslationProviderRegistry.registerCallbacks()` method in `apps/meteor/app/autotranslate/server/autotranslate.ts` plays a crucial role. When auto-translate is enabled, it registers a callback function with the `afterSaveMessage` event.
3.  **`afterSaveMessage` Callback:** This callback is executed every time a message is saved. It has a `MEDIUM` priority and is identified by the tag `'autotranslate'`. The callback's logic is `(message, { room }) => provider.translateMessage(message, { room })`.
4.  **`translateMessage`:** The `TranslationProviderRegistry.translateMessage()` method (also in `apps/meteor/app/autotranslate/server/autotranslate.ts`) is then called. This method, in turn, delegates the actual translation task to the currently active translation provider.
5.  **Translation Providers:** Each translation provider (e.g., `MsAutoTranslate` in `apps/meteor/app/autotranslate/server/msTranslate.ts` or `DeeplAutoTranslate` in `apps/meteor/app/autotranslate/server/deeplTranslate.ts`) implements a base `AutoTranslate` class and provides its own `_translateMessage()` method to interact with the respective translation API.
6.  **Storing Translations:** After a message is translated, the translations are stored in the `message.translations` field.

**Call Chain:**

`AutoTranslate` (client-side UI) → `TranslationProviderRegistry.setEnable()` (implicitly called by UI) → `TranslationProviderRegistry.registerCallbacks()` → `callbacks.add('afterSaveMessage', ...)` → (When a message is saved) `callbacks.run('afterSaveMessage')` → `TranslationProviderRegistry.getActiveProvider().translateMessage()` → Specific translation provider's `_translateMessage()` (e.g., `MsAutoTranslate._translateMessage()`).

## Tool Calls (8 calls, 35,449 tokens)

**Step 1:** `search({"query":"auto translate"})` → 339 tokens
**Step 2:** `graph({"query":"AutoTranslate","direction":"down","filename":"apps/meteor/client/views/room/contextualBar/)` → 700 tokens
**Step 3:** `search({"query":"TranslationProviderRegistry","layer":"server"})` → 174 tokens
**Step 4:** `graph({"query":"TranslationProviderRegistry","direction":"down","depth":3,"filename":"apps/meteor/app/auto)` → 149 tokens
**Step 5:** `search({"layer":"server","query":"afterSaveMessage"})` → 261 tokens
**Step 6:** `graph({"edgeTypes":["event_listen"],"query":"afterSaveMessage","direction":"down"})` → 158 tokens
**Step 7:** `implement({"symbolName":"TranslationProviderRegistry","filename":"apps/meteor/app/autotranslate/server/autotra)` → 324 tokens
**Step 8:** `implement({"symbolName":"TranslationProviderRegistry.registerCallbacks","filename":"apps/meteor/app/autotransl)` → 168 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 2/2 |
| Tool calls | 8 |
| Total tokens | 35,449 |
| Pass | NO |
