# How does the auto-translate feature work for messages in Rocket.Chat?

## Baseline Answer (no tools)

Rocket.Chat's auto-translate feature allows users to translate messages in real-time using external translation services. It's not an in-built translation engine but rather an integration layer that connects Rocket.Chat to various third-party providers.

Here's a breakdown of how it works:

### High-Level Overview

1.  **Configuration:** An administrator enables and configures a translation service (e.g., Google Translate, DeepL) in the workspace settings, providing necessary API keys.
2.  **User Preference:** Individual users can then enable auto-translation in their personal preferences and set their preferred language.
3.  **Trigger:** When a message is displayed, if auto-translate is enabled for the user and the message's detected language differs from the user's preferred language, or if the user manually triggers translation, a request is sent.
4.  **Server-Side Proxy:** The Rocket.Chat server acts as a proxy, forwarding the translation request to the configured external translation service.
5.  **Translation & Display:** The external service returns the translated text, which the Rocket.Chat server then sends back to the client for display alongside or replacing the original message.

### Detailed Workflow

1.  **Admin Configuration (`app/autotranslate/server/settings.js`):**
    *   An administrator navigates to `Administration > Workspace > Settings > Message > Translation`.
    *   They enable the feature, select a preferred translation service (e.g., Google Translate, DeepL, Yandex, LibreTranslate), and provide the necessary API keys or credentials for that service.
    *   These settings are stored in the `rocketchat_settings` MongoDB collection.

2.  **User Preferences (`app/autotranslate/server/lib/settings.js`):**
    *   A user goes to `My Account > Preferences > Language`.
    *   They set their `Preferred Language` and can toggle `Auto-translate messages` on or off.
    *   These preferences are stored in the `users` MongoDB collection for that specific user.

3.  **Message Reception & Display (Client-side - `client/components/message/MessageContent.js`, `client/views/room/MessageList/Message/Message.js`):**
    *   When a message is received by the client and rendered in the chat, the client-side logic checks the user's auto-translate preference.
    *   It also attempts to detect the language of the incoming message. If the message's language is different from the user's preferred language (and auto-translate is enabled), or if the user clicks a "Translate" button on a specific message, the translation process is initiated.

4.  **Client-to-Server Request (Meteor Method - `app/autotranslate/server/methods.js`):**
    *   The client makes a Meteor method call (e.g., `autoTranslate.translateMessage`) to the Rocket.Chat server.
    *   This call includes the `messageId`, the `targetLanguage` (from the user's preferences), and potentially the `sourceLanguage` (if already detected).

5.  **Server-Side Translation Logic (`app/autotranslate/server/autotranslate.js`):**
    *   The server receives the request.
    *   It retrieves the original message text from the `rocketchat_messages` collection using the `messageId`.
    *   It checks the workspace's translation settings to determine which external service to use and retrieves its API key.
    *   It then calls the appropriate provider-specific translation function.

6.  **External Translation Service Integration (`app/autotranslate/server/providers/*.js`):**
    *   Within the `app/autotranslate/server/providers/` directory, there are separate files for each supported translation service (e.g., `google.js`, `deepl.js`).
    *   These files contain the logic to construct and send an HTTP request to the respective external translation service's API (e.g., Google Cloud Translation API, DeepL API).
    *   The request includes the message text, source language, and target language.
    *   The external service processes the request and returns the translated text.

7.  **Server Response & Client Update:**
    *   The Rocket.Chat server receives the translated text from the external service.
    *   It then sends this translated text back to the client.
    *   The client updates the specific message component in the UI to display the translated text, often below the original message, with an option to toggle between the original and translated versions. The translated text is usually cached client-side for that session to avoid repeated API calls for the same message.

### Key File Paths and Components

*   **Server-side Translation Module:** `app/autotranslate/server/`
    *   `app/autotranslate/server/autotranslate.js`: Core logic for handling translation requests, selecting providers.
    *   `app/autotranslate/server/methods.js`: Meteor methods exposed to the client for triggering translation.
    *   `app/autotranslate/server/settings.js`: Registers admin settings for translation.
    *   `app/autotranslate/server/lib/settings.js`: Helper functions for retrieving translation settings.
    *   `app/autotranslate/server/providers/`: Directory containing specific implementations for each translation service.
        *   `app/autotranslate/server/providers/google.js`: Google Translate integration.
        *   `app/autotranslate/server/providers/deepl.js`: DeepL integration.
        *   `app/autotranslate/server/providers/yandex.js`: Yandex Translate integration.
        *   `app/autotranslate/server/providers/libretranslate.js`: LibreTranslate integration.

*   **Client-side UI & Logic:**
    *   `client/components/message/MessageContent.js`: Renders the message content and handles displaying translated text.
    *   `client/views/room/MessageList/Message/Message.js`: The main message component that might initiate translation or display the translated state.
    *   `client/lib/message-actions/translate.js`: Logic for the "Translate" message action button.
    *   `client/lib/autotranslate.js`: Client-side helper for auto-translate features.

*   **Database Collections:**
    *   `rocketchat_settings`: Stores global translation settings (enabled, service, API keys).
    *   `users`: Stores individual user preferences (preferred language, auto-translate toggle).
    *   `rocketchat_messages`: Stores the original message content.

In essence, Rocket.Chat provides the user interface and the server-side proxy to seamlessly integrate with powerful, external translation APIs, offering a real-time translation experience without building its own complex language processing engine.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,110 |
| Model | gemini-2.5-flash |
| Tools | NONE |
