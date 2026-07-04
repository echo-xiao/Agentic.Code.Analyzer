# How does the auto-translate feature work for messages in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The auto-translate feature in Rocket.Chat works by integrating both client-side and server-side components to manage settings, fetch supported languages, and perform message translations.

Here's a breakdown of the process:

**1. Server-Side Logic (Core Translation)**

*   **API Endpoints:** Rocket.Chat exposes several API endpoints under `/v1/autotranslate` to handle translation-related operations:
    *   `autotranslate.getSupportedLanguages` (GET): Retrieves a list of languages supported by the configured translation provider.
    *   `autotranslate.saveSettings` (POST): Allows users to save their auto-translate preferences for a specific room, such as enabling/disabling the feature or selecting a target language.
    *   `autotranslate.translateMessage` (POST): Initiates the translation of a specific message, identified by its `messageId`, into an optional `targetLanguage`.
*   **Translation Process (in `apps/meteor/app/autotranslate/server/autotranslate.ts`):**
    *   The `translateMessage` function is central to this process.
    *   It first determines the target languages for translation, either from the provided `targetLanguage` or by querying the `Subscriptions` collection for auto-translate languages enabled in the room for other users.
    *   The message content undergoes "tokenization" to identify and protect non-translatable elements like emojis, code snippets, and URLs from being altered by the translation service.
    *   The tokenized message is then sent to the active translation service provider (e.g., Google Translate, DeepL) via an internal `_translateMessage` method.
    *   Upon receiving the translated text, it is "detokenized" to reinsert the original non-translatable parts.
    *   Finally, the translated message and any associated attachments are stored in the `Messages` collection.
*   **Provider Configuration:** The specific translation service provider is determined by the `AutoTranslate_ServiceProvider` setting, and API keys for each provider (e.g., `AutoTranslate_GoogleAPIKey`) are configured in the server settings.

**2. Client-Side Logic (User Interface and Display)**

*   **Initialization:** A client-side `AutoTranslate` singleton is initialized when the user ID is available, auto-translate is enabled, and the user has the `auto-translate` permission. This initialization fetches supported languages and provider metadata from the server.
*   **Message Parsing and Display:** When messages are rendered, the `parseMessageTextToAstMarkdown` function processes the message text and attachments. If auto-translate is enabled for the user and a translation exists for their preferred language, the translated text is displayed instead of the original message.
*   **User Interface (in `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslateWithData.tsx`):**
    *   The auto-translate settings are accessible through a contextual bar within the room view.
    *   Users can easily toggle auto-translate on or off for a specific room.
    *   They can also select their preferred translation language from a dropdown list of supported languages.
    *   These user-initiated changes are saved by calling the `autotranslate.saveSettings` API endpoint.

**3. Data Flow:**

The auto-translation process follows this general flow:

*   **User Interaction:**
    *   A user sends or receives a message.
    *   The client checks if auto-translate is enabled for the user and the room.
    *   If enabled, the client checks for a translation in the user's preferred language.
    *   If a translation is available, the translated message is displayed; otherwise, the original message is shown.
    *   Users can change their auto-translate settings (e.g., enable/disable, change language) via the UI. These changes trigger calls to the `autotranslate.saveSettings` API.
    *   Users can also request a list of supported languages, which calls the `autotranslate.getSupportedLanguages` API.
*   **Server Processing:**
    *   The `autotranslate.saveSettings` API updates the user's subscription settings in the database.
    *   The `autotranslate.getSupportedLanguages` API queries the active translation provider to retrieve the list of supported languages.
    *   When a message needs translation, the `autotranslate.translateMessage` API is invoked.
    *   The server's `translateMessage` function tokenizes, sends to the translation provider, detokenizes, and stores the translated message in the `Messages` collection.
    *   The server then notifies the client of the newly translated message.

**Key Files:**

*   **`apps/meteor/app/autotranslate/server/autotranslate.ts`**: Contains the core server-side logic for message translation, including tokenization, interaction with translation providers, and storing translated messages.
*   **`apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslateWithData.tsx`**: Manages the client-side user interface for auto-translate settings within a room, allowing users to enable/disable the feature and select their preferred language.

## Tool Calls (1 calls, 4,876 tokens)

**Step 1:** `wiki({"question":"How does the auto-translate feature work for messages in Rocket.Chat?"})` → 1545 tokens

## Files Seen In Tool Results (1)

- `apps/meteor/app/autotranslate/server/autotranslate.ts`
