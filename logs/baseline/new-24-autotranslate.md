# How does the auto-translate feature work for messages in Rocket.Chat?

## Baseline Answer (no tools)

The auto-translate feature in Rocket.Chat allows users to translate messages into their preferred language using various third-party translation services. Here's a breakdown of how it works:

### 1. Configuration (Server-Side)

*   **Admin Settings**: Administrators enable and configure the auto-translate feature via the Rocket.Chat admin panel. They select the desired translation engine (e.g., Google Translate, DeepL, Yandex, LibreTranslate, AWS Translate, Microsoft Translator), provide necessary API keys or endpoints, and set other options.
*   **Settings Persistence**: These configurations are stored in the `Rocket.Chat.settings` collection in the database.
*   **Code Paths**:
    *   `app/autotranslate/server/settings.js`: Defines all the administrative settings related to auto-translate, including options for different providers (API keys, regions, etc.).

### 2. Client-Side Interaction & Triggering Translation

*   **UI Indicator**: When a user views a message that might be in a different language, a "Translate" button or option appears in the message's action menu or toolbar.
*   **User Action**: When the user clicks the "Translate" button, the Rocket.Chat client prepares a request.
*   **Meteor Method Call**: The client then makes a Meteor method call to the server, passing the `_id` of the message to be translated and the target language (usually the user's preferred language).
*   **Code Paths**:
    *   `client/components/message/MessageToolbar/MessageToolbar.js` or similar components: Render the "Translate" button in the message actions.
    *   `client/views/room/MessageList/Message/MessageActions.js`: Handles the click event for the translate action and invokes the server method.
    *   The actual Meteor call happens implicitly through the actions, typically invoking `Meteor.call('autoTranslate.translateMessage', messageId, targetLanguage)`.

### 3. Server-Side Translation Logic

Upon receiving the `autoTranslate.translateMessage` Meteor method call:

1.  **Message Retrieval**: The server fetches the original message document from the `rocketchat_message` collection using the provided `messageId`.
2.  **Cached Translation Check**: It first checks if a translation for the requested `targetLanguage` already exists within the message document (stored in `message.autoTranslate.translations`). If found, it returns the cached translation, avoiding redundant API calls.
3.  **Source Language Detection**: If no cached translation exists, the server attempts to determine the source language of the message text (`message.msg`). This can be done by passing the text to the translation service's language detection feature or using an internal language detection library if available.
4.  **Provider Selection**: Based on the admin settings, the server selects the active translation provider (e.g., Google, DeepL).
5.  **External API Call**: The server constructs an HTTP request to the chosen external translation service's API, sending the original message text, the detected source language, and the target language.
6.  **Response Handling**: It waits for the response from the external service, which contains the translated text.
7.  **Error Handling**: Handles potential errors from the translation service (e.g., API key invalid, rate limits, network issues).
8.  **Code Paths**:
    *   `app/autotranslate/server/autotranslate.js`: Contains the main server-side logic, including the `AutoTranslate` class and its `translateMessage` method, which orchestrates the entire process. This file also registers the Meteor method `autoTranslate.translateMessage`.
    *   `app/autotranslate/server/providers/`: This directory contains individual files for each supported translation provider, implementing the specific API calls and request/response parsing for that service:
        *   `google.js`
        *   `deepl.js`
        *   `libre.js`
        *   `yandex.js`
        *   `microsoft.js`
        *   `aws.js`

### 4. Storing and Delivering Translation

1.  **Persistence**: Once the translation is successfully received from the external service, the Rocket.Chat server updates the original message document in the `rocketchat_message` collection. The translated text is stored in a specific field, typically under `message.autoTranslate.translations[targetLanguage]`. This caching mechanism prevents re-translation of the same message for the same user/language, reducing API costs and improving performance.
2.  **Real-time Update**: Since messages are often subscribed to in real-time, the client's subscription for the message document is updated automatically via DDP (Distributed Data Protocol).
3.  **Code Paths**:
    *   `app/autotranslate/server/autotranslate.js`: Responsible for updating the `rocketchat_message` collection.
    *   `app/models/server/models/Messages.js`: Defines the `Messages` collection model.

### 5. Displaying Translated Message (Client-Side)

1.  **UI Re-render**: Upon receiving the updated message document from the server (which now includes the translation), the client-side message rendering component re-renders.
2.  **Conditional Display**: The component checks if a translation for the user's preferred language exists in `message.autoTranslate.translations`. If it does, it displays the translated text instead of the original message content.
3.  **Toggle Option**: Users often have an option to "Show Original" or "Hide Translation" to switch between the original and translated versions of the message.
4.  **Code Paths**:
    *   `client/views/room/MessageList/Message/MessageContent.js` (or similar components): This is where the logic to display either the original or translated text resides, checking `message.autoTranslate?.translations?.[currentLanguage]`.
    *   `client/lib/autotranslate.js`: Contains client-side helper functions and reactive variables to manage the display state (e.g., whether to show translated or original).

In essence, the feature acts as a proxy: the Rocket.Chat server sits between the client and the chosen third-party translation service, caching results and providing a unified API for the client.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,793 |
| Model | gemini-2.5-flash |
| Tools | NONE |
