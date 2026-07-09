# How does the auto-translate feature work for messages in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The auto-translate feature in Rocket.Chat works by integrating server-side translation providers with client-side display and user preference management.

**Server-Side Translation Process:**

1.  **Provider Registration and Activation:** The `TranslationProviderRegistry` (app/autotranslate/server/lib/TranslationProviderRegistry.ts) registers various translation providers (e.g., `GoogleTranslateAutoTranslate` in app/autotranslate/server/providers/GoogleTranslate.ts, `LibreTranslateAutoTranslate` in app/autotranslate/server/providers/LibreTranslate.ts). The active provider is determined by the `AutoTranslate_ServiceProvider` setting.
2.  **Message Save Callback:** When `AutoTranslate_Enabled` is true, the `TranslationProviderRegistry` registers an `afterSaveMessage` callback.
3.  **Message Translation Flow:** When a message is saved, the `afterSaveMessage` callback triggers the `translateMessage` method of the active translation provider.
    *   **Tokenization:** The message is tokenized to protect non-translatable parts (emojis, code, URLs).
    *   **Target Languages:** Target languages are determined from the `autoTranslateLanguage` setting of subscriptions in the room, excluding the sender's language.
    *   **External API Call:** The provider makes an asynchronous call to its respective translation API.
    *   **Detokenization:** The translated text is detokenized, reinserting the original non-translatable parts.
    *   **Persistence:** The translated messages are stored in the `Messages` collection.
    *   **Attachment Translation:** If attachments have descriptions or text, they are also translated using `_translateAttachmentDescriptions` (app/autotranslate/server/lib/TranslationProviderRegistry.ts) and stored.

**Client-Side Display and User Interaction:**

1.  **Initialization and Language Detection:** The `AutoTranslate.init()` method (app/autotranslate/client/lib/autotranslate.ts) loads available translation providers and supported languages from the server. It also determines the user's preferred language or the room's auto-translate language.
2.  **Message Rendering:** When messages are displayed, the `parseMessageTextToAstMarkdown` function checks if auto-translation is enabled for the message and the user's settings. If so, it retrieves the translated text from the message's `translations` field. Attachments are also checked for translations.
3.  **User Settings:** Users can enable or disable auto-translation for a specific room and select their preferred translation language through the `AutoTranslateWithData` component (client/views/room/lib/AutoTranslateWithData.ts). These settings are saved via the `/v1/autotranslate.saveSettings` API endpoint. The `Subscriptions` model provides methods to update and retrieve auto-translate settings for rooms.

**API Endpoints:**

*   `autotranslate.getSupportedLanguages`: Retrieves a list of languages supported by the active translation service.
*   `autotranslate.saveSettings`: Allows users to save their auto-translate preferences for a room.
*   `autotranslate.translateMessage`: Manually triggers the translation of a specific message to a target language.

## Tool Calls (1 calls, 3,612 tokens)

**Step 1:** `wiki({"question":"How does the auto-translate feature work for messages in Rocket.Chat?"})` → 1072 tokens

## Files Seen In Tool Results (0)

_(none)_
