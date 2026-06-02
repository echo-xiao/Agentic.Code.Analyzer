# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat works by leveraging a `TranslationProviderRegistry` to manage and execute translations through different providers.

Here's a breakdown of the process:

1.  **Initiation**: The translation of a message can be explicitly triggered by the `translateMessage` function located in `apps/meteor/app/autotranslate/server/functions/translateMessage.ts`. This function takes the target language and the message as input.

2.  **Provider Registry**: The `translateMessage` function delegates the actual translation task to the `TranslationProviderRegistry` class, which is defined in `apps/meteor/app/autotranslate/server/autotranslate.ts`. This registry is responsible for:
    *   Registering different translation providers (e.g., Microsoft Translate, Google Translate).
    *   Determining if auto-translation is enabled.
    *   Identifying the currently active translation provider.
    *   Calling the `translateMessage` method of the active provider.

3.  **Active Provider**: The `TranslationProviderRegistry` retrieves the `AutoTranslate` instance of the configured translation service. This `AutoTranslate` instance contains the specific logic and API calls required to communicate with the chosen external translation service (e.g., Google Translate API).

4.  **Automatic Translation Trigger**: The `TranslationProviderRegistry` also registers an `afterSaveMessage` callback. This means that after a message is successfully saved to the database, this callback is invoked. If auto-translation is enabled and an active provider is set, the provider's `translateMessage` method will be called to translate the newly saved message.

**Call Chain:**

`Entry` (e.g., user action, message save) → `apps/meteor/app/autotranslate/server/functions/translateMessage.ts` (or `afterSaveMessage` callback) → `TranslationProviderRegistry` (in `apps/meteor/app/autotranslate/server/autotranslate.ts`) → Active `AutoTranslate` provider (e.g., `_translateMessage` in `apps/meteor/app/autotranslate/server/msTranslate.ts` or `apps/meteor/app/autotranslate/server/googleTranslate.ts` etc.)

## Tool Calls (8 calls, 44,426 tokens)

**Step 1:** `search({"query":"auto-translate"})` → 15 tokens
**Step 2:** `search({"query":"translate message"})` → 207 tokens
**Step 3:** `graph({"layer":"server","direction":"down","query":"translateMessage"})` → 644 tokens
**Step 4:** `implement({"symbolName":"_translateMessage","filename":"apps/meteor/app/autotranslate/server/msTranslate.ts"})` → 135 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"translateMessage"})` → 89 tokens
**Step 6:** `implement({"symbolName":"translateMessage","filename":"apps/meteor/app/autotranslate/server/functions/translat)` → 140 tokens
**Step 7:** `search({"query":"TranslationProviderRegistry","layer":"server"})` → 35 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"TranslationProvide)` → 658 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 5/6 |
| Symbols hit | 2/2 |
| Tool calls | 8 |
| Total tokens | 44,426 |
