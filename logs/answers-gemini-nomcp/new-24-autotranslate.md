# How does the auto-translate feature work for messages in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's auto-translate feature provides a seamless way for users to understand messages in different languages. It's primarily a **server-side process** that leverages external translation APIs, with client-side logic for display and user configuration.

Here's a breakdown of how it works:

### 1. User Configuration (Client-Side & Database)

1.  **Enabling Auto-Translate:** A user enables auto-translate in their preferences:
    *   `User Menu -> My Account -> Preferences -> Messages`
    *   They toggle "Enable Auto-Translate" and select their "Target Language."
2.  **Database Storage:** These preferences are stored in the `users` collection for that specific user:
    *   `users.settings.autoTranslate: true`
    *   `users.settings.autoTranslateLanguage: 'es'` (or any chosen language code)

### 2. Server-Side Processing (The Core Logic)

The heavy lifting of language detection and translation happens on the Rocket.Chat server.

1.  **Triggering Translation:**
    *   **New Messages:** The primary trigger is when a new message is sent (`sendMessage` method). Rocket.Chat uses a system of hooks (`callbacks`) that run before/after certain actions. A hook is registered to process messages for auto-translation.
    *   **Existing Messages (On-Demand):** While the "auto" feature focuses on new messages, the underlying translation mechanism can also be invoked on demand for existing messages via a context menu option.

2.  **Language Detection:**
    *   When a message is received, the server first attempts to detect its original language.
    *   This is done using a language detection library or service integrated into Rocket.Chat.
    *   The detected language is stored directly on the message object in the `messages` collection:
        *   `msg.lang: 'en'` (e.g., for English)

3.  **Translation Service Integration:**
    *   Rocket.Chat doesn't perform the translation itself. It acts as an intermediary, integrating with various external translation providers.
    *   **Configured Providers:** Administrators can configure which translation services to use (e.g., Google Translate, DeepL, Microsoft Translator) via `Administration -> Workspace -> Settings -> AutoTranslate`.
    *   **API Calls:** If a message's detected language (`msg.lang`) is different from a user's `autoTranslateLanguage` preference, and auto-translate is enabled for that user, Rocket.Chat makes an API call to the configured external translation service.
    *   **Abstraction Layer:** Rocket.Chat provides an abstraction layer (`app/autotranslate/server/autotranslate.js`) that allows it to switch between different providers without changing the core logic. Each provider has its own implementation (e.g., `app/autotranslate/server/providers/Google.js`).

4.  **Storing Translations:**
    *   Once a translation is received from the external service, Rocket.Chat stores it directly within the `messages` collection, nested under a `translations` field.
    *   This prevents redundant API calls for the same message and language.
    *   Example:
        ```json
        {
          "_id": "messageId123",
          "rid": "roomId123",
          "msg": "Hello world",
          "lang": "en",
          "u": { /* user info */ },
          "ts": { /* timestamp */ },
          "translations": {
            "es": "Hola mundo",
            "fr": "Bonjour le monde"
          }
        }
        ```

### 3. Client-Side Display (Rendering the Translation)

1.  **Message Reception:** The client receives the message object from the server, which now includes the `lang` field and potentially the `translations` object.
2.  **Conditional Rendering:**
    *   The client-side message rendering components (`client/components/message/Message/MessageContent.js`) check the current user's `autoTranslate` settings and `autoTranslateLanguage`.
    *   It compares the message's `msg.lang` with the user's `autoTranslateLanguage`.
    *   If auto-translate is enabled, the message's original language is different from the user's target language, and a translation for the target language exists in `msg.translations`, the client will display the translated version.
3.  **UI Elements:**
    *   Typically, the translated message is shown, often with an option to "Show Original" or "Hide Translation" to toggle between the two.
    *   Context menus on messages also provide an explicit "Translate" option, which can trigger the server-side translation process for a specific language if it hasn't been translated yet.

### Key Files and Code Paths:

*   **`app/autotranslate/server/autotranslate.js`**: The core server-side logic for orchestrating language detection and translation. It acts as the main entry point for the auto-translate feature on the server.
*   **`app/autotranslate/server/providers/`**: This directory contains the implementations for different translation service providers (e.g., `Google.js`, `DeepL.js`, `Microsoft.js`).
*   **`app/autotranslate/server/settings.js`**: Defines the administration settings for auto-translate (enabling/disabling, choosing providers, API keys).
*   **`app/autotranslate/server/methods/`**: Contains server methods related to auto-translate, such as `autotranslate.translateMessage` which can be called by the client for on-demand translation.
*   **`app/lib/server/methods/sendMessage.js`**: The server method responsible for sending messages. It likely includes hooks or calls to the auto-translate logic to process new messages.
*   **`app/models/server/models/Messages.js`**: The server-side model for interacting with the `messages` collection, where translations are stored.
*   **`client/lib/autotranslate.js`**: Client-side helper functions and logic related to auto-translate.
*   **`client/components/message/Message/MessageContent.js`**: The React component responsible for rendering the actual text content of a message, including the logic to display translated versions based on user preferences.
*   **`client/views/room/MessageList/MessageList.js`**: The component that renders the list of messages in a room, which will pass message data down to individual `Message` components.

In essence, Rocket.Chat's auto-translate is a robust system that offloads the complex linguistic processing to specialized external services while managing the detection, storage, and display of translations efficiently within its own architecture.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,107 |
| Model | gemini-2.5-flash |
| Tools | NONE |
