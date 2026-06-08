# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat works by leveraging a `TranslationProviderRegistry` on the server-side.

Here's the breakdown of the process:

1.  **Entry Point:** The `translateMessage` function, located at `apps/meteor/app/autotranslate/server/functions/translateMessage.ts`, is responsible for initiating the translation.
2.  **Provider Check:** It first verifies if auto-translation is enabled via `TranslationProviderRegistry.enabled`. If not, it returns.
3.  **Room and Message Validation:** It checks for a valid message and room ID.
4.  **Translation Invocation:** If all checks pass, it calls `TranslationProviderRegistry.translateMessage(message, room, targetLanguage)`. This static method within the `TranslationProviderRegistry` handles the actual translation.

The `TranslationProviderRegistry` (located at `apps/meteor/app/autotranslate/server/autotranslate.ts`) is a central component that manages different translation providers (e.g., GoogleAutoTranslate, MSTranslate, DeepLTranslate). It offers several methods, including `translateMessage` which is the one utilized in this flow. The architecture indicates that `translateMessage` within this registry is responsible for receiving the message and room information and dispatching it to the active translation provider. The translated content is then stored in the `message.translations` field.

The overall call chain is:

`apps/meteor/app/autotranslate/server/functions/translateMessage.ts` (translateMessage) → `apps/meteor/app/autotranslate/server/autotranslate.ts` (TranslationProviderRegistry.translateMessage) → (Active Translation Provider's `_translateMessage` method)

## Tool Calls (8 calls, 30,533 tokens)

**Step 1:** `search({"query":"auto-translate"})` → 15 tokens
**Step 2:** `search({"layer":"server","query":"translate message"})` → 249 tokens
**Step 3:** `graph({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","query":"translateMessage","laye)` → 745 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"translateMessage"})` → 89 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/autotranslate/server/functions/translateMessage.ts","symbolName":"trans)` → 170 tokens
**Step 6:** `graph({"direction":"down","query":"TranslationProviderRegistry.translateMessage","layer":"server"})` → 21 tokens
**Step 7:** `search({"layer":"server","query":"TranslationProviderRegistry"})` → 174 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"TranslationProvide)` → 324 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 2/2 |
| Tool calls | 8 |
| Total tokens | 30,533 |
| Pass | NO |
