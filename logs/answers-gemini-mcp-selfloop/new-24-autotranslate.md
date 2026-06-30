# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat works by registering a callback function that is triggered after a message is saved. This callback then utilizes a `TranslationProviderRegistry` to handle the translation process.

Here's a breakdown of the call chain and key components:

**Call Chain:**

1.  **`TranslationProviderRegistry.registerCallbacks()`** (entry point, not explicitly shown in `graph` output but implied by the architecture description)
2.  **`TranslationProviderRegistry.translateMessage(message, room, targetLanguage)`** in `apps/meteor/app/autotranslate/server/autotranslate.ts`
3.  **`provider.translateMessage(message, { room, targetLanguage })`** (called within `TranslationProviderRegistry.translateMessage`)

**Key Files and Their Roles:**

*   **`apps/meteor/app/autotranslate/server/autotranslate.ts`**: This file contains the `TranslationProviderRegistry` class, which is central to the auto-translate feature.
    *   `TranslationProviderRegistry` manages different translation providers (e.g., GoogleAutoTranslate, MSTranslate, DeepLTranslate).
    *   It registers itself as an `afterSaveMessage` callback, ensuring messages are processed for translation after being saved.
    *   The `translateMessage` method in this class is responsible for determining if translation is enabled and then delegating the actual translation to the active provider.
*   **`apps/meteor/app/autotranslate/server/googleTranslate.ts`**: This file (and similar files for other providers like `msTranslate.ts` and `deeplTranslate.ts`) implements a specific translation provider.
    *   The `GoogleAutoTranslate` class (and its counterparts) will have its own `translateMessage` method that interfaces with the respective external translation service (e.g., Google Translate API). This method receives the message, room information, and target language to perform the translation.

In summary, when a message is saved, the `TranslationProviderRegistry` intercepts it. If auto-translation is enabled for the room, it selects the active translation provider (e.g., GoogleAutoTranslate) and calls its `translateMessage` method to get the translated text, which is then stored in the `message.translations` field.

## Tool Calls (8 calls, 44,146 tokens)

**Step 1:** `search({"query":"auto-translate message"})` → 17 tokens
**Step 2:** `search({"query":"translate","layer":"client"})` → 599 tokens
**Step 3:** `graph({"direction":"down","file":"apps/meteor/app/autotranslate/server/autotranslate.ts","query":"translat)` → 1651 tokens
**Step 4:** `implement({"symbolName":"getActiveProvider","filename":"apps/meteor/app/autotranslate/server/autotranslate.ts")` → 61 tokens
**Step 5:** `search({"query":"TranslationProviderRegistry","layer":"server"})` → 174 tokens
**Step 6:** `implement({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"TranslationProvide)` → 324 tokens
**Step 7:** `implement({"symbolName":"TranslationProviderRegistry.translateMessage","filename":"apps/meteor/app/autotransla)` → 151 tokens
**Step 8:** `search({"query":"GoogleAutoTranslate","layer":"server"})` → 208 tokens
