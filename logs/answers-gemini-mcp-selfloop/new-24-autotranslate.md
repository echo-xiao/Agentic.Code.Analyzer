# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat works by integrating with various translation providers (GoogleAutoTranslate, MSTranslate, DeepLTranslate).

Here's a breakdown of the process:

1.  **Event Trigger**: When a message is saved, the `afterSaveMessage` callback is triggered.
2.  **Callback Registration**: The `apps/meteor/app/autotranslate/server/autotranslate.ts` file registers a callback with `afterSaveMessage` at a `MEDIUM` priority. This callback is responsible for initiating the translation process.
3.  **Translation Logic**: If auto-translate is enabled for a specific room, the registered callback calls `provider.translateMessage()`. The `TranslationProviderRegistry` manages the different translation providers. Each provider implements an `AutoTranslate` base class, which includes a `_translateMessage()` method.
4.  **Storing Translations**: The translated message is then stored in the `message.translations` field.

**Call Chain:**

Entry Point: `afterSaveMessage` (callback event)
→ `registerCallbacks` (in `apps/meteor/app/autotranslate/server/autotranslate.ts`)
→ `translateMessage` (in `apps/meteor/app/autotranslate/server/functions/translateMessage.ts`)
→ `provider.translateMessage()` (from an implemented translation provider like Google, Microsoft, or DeepL)

## Tool Calls (8 calls, 32,517 tokens)

**Step 1:** `search({"query":"auto-translate","layer":"server"})` → 15 tokens
**Step 2:** `search({"layer":"server","query":"translate message"})` → 249 tokens
**Step 3:** `graph({"direction":"down","filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","query":"tran)` → 745 tokens
**Step 4:** `implement({"symbolName":"translateMessage","filename":"apps/meteor/app/autotranslate/server/autotranslate.ts"})` → 89 tokens
**Step 5:** `search({"layer":"server","query":"afterSaveMessage"})` → 261 tokens
**Step 6:** `graph({"layer":"server","query":"afterSaveMessage","edgeTypes":["event_listen"]})` → 238 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"registerCallbacks")` → 61 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"autotranslate.ts"})` → 55 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 2/2 |
| Tool calls | 8 |
| Total tokens | 32,517 |
| Pass | NO |
