# How does the auto-translate feature work for messages in Rocket.Chat?

## Baseline Answer (no tools)

The auto-translate feature in Rocket.Chat allows users to translate messages into their preferred language, either manually or automatically. This functionality is not built directly into Rocket.Chat's core translation engine but rather relies on **external translation services integrated via the Rocket.Chat Apps-Engine**.

The most common implementation uses the **Google Translate App**. Here's a breakdown of how it works:

### 1. Configuration & Setup

1.  **Enable Auto-translate Globally**: A workspace administrator must enable the `AutoTranslate_Enabled` setting in `Admin > Workspace > Settings > Auto-translate`.
2.  **Select Translation Service**: The admin chooses a translation service, e.g., `Google Translate`, from `AutoTranslate_Service`.
3.  **Provide API Credentials**: The necessary API key for the chosen service (e.g., `AutoTranslate_GoogleAPIKey`) must be provided.
4.  **Install the Translation App**: The specific translation app (e.g., "Google Translate" from the Marketplace) must be installed and enabled in `Admin > Apps`. This app registers itself with Rocket.Chat's Apps-Engine to handle translation requests.

### 2. User & Room Preferences

Users and rooms can define specific auto-translate settings:

*   **User's Preferred Language**: Each user can set their `My Language` (target language) in `User Menu > My Account > Preferences > Auto-translate`.
*   **User's Auto-translate Toggle**: Users can choose to `Auto-translate messages` in their preferences, which applies to messages in other languages.
*   **Room-Specific Auto-translate**: Users can enable/disable auto-translate for specific rooms via `Room Info > Auto-translate`.

### 3. Message Flow & Translation Process

When a message needs to be translated, the following steps generally occur:

1.  **Language Detection (Optional but Recommended)**:
    *   When a message is sent, the system (often the client or the translation app itself) might attempt to detect the original language of the message. This information (`msg.autoTranslate.originalLanguage`) can be stored with the message.

2.  **Translation Trigger**:
    *   **Manual Translation**: A user hovers over a message and clicks the "Translate" action button.
    *   **Automatic Translation**: If a user has `Auto-translate messages` enabled in their preferences, the room's auto-translate is enabled, and the message's detected original language is different from the user's `My Language` (target language), the translation is triggered automatically.

3.  **Client-Server Request**:
    *   The client-side UI, upon a manual or automatic trigger, sends a request to the Rocket.Chat server. This typically involves a `Meteor.call('autoTranslate.translateMessage', messageId, targetLanguage)`.

4.  **Server-Side Processing (Apps-Engine & Translation App)**:
    *   The server-side method (`autoTranslate.translateMessage`) receives the request.
    *   It then leverages the **Apps-Engine** to delegate the actual translation task to the installed and configured translation App (e.g., the Google Translate App).
    *   The Translation App receives the message text and the `targetLanguage`.
    *   Using its internal logic and configured API key, the App makes an HTTP request to the external translation service (e.g., Google Translate API).

5.  **External Translation Service**:
    *   The external service performs the translation and returns the translated text to the Translation App.

6.  **Response Handling & Message Update**:
    *   The Translation App sends the translated text back to the Rocket.Chat server.
    *   The server updates the message object in the database (e.g., `Messages` collection) by adding the translated text under `msg.autoTranslate.translated[targetLanguage] = translatedText`. This stores the translated version, so it doesn't need to be re-translated repeatedly.
    *   The updated message (or just the translated text) is then sent back to the requesting client.

7.  **Client-Side Display**:
    *   The client receives the updated message with the translated text.
    *   The message rendering component detects the presence of `msg.autoTranslate.translated` and displays the translated version.
    *   Depending on the `AutoTranslate_ShowOriginal` setting, the UI might show both the original and the translated text, or provide an option to toggle between them.

### Key File Paths and Components

*   **Server-Side Logic (Rocket.Chat Core)**:
    *   `app/autotranslate/server/methods/translateMessage.js`: Contains the core server methods (`autoTranslate.translateMessage`, `autoTranslate.saveTranslation`) that initiate and save translations. This is where the integration with the Apps-Engine usually happens for translation.
    *   `app/autotranslate/server/lib/autotranslate.js`: Server-side utilities and functions related to auto-translation.
    *   `app/autotranslate/server/settings.js`: Defines all the Auto-translate related settings visible in the Admin panel.

*   **Apps-Engine (Server)**:
    *   `app/apps/server/lib/AppServer.ts`: The main server-side component for managing and running Apps.
    *   `app/apps/server/bridges/IMessageBridge.ts`: An interface apps use to interact with Rocket.Chat messages. Translation apps often use a specific bridge or a method provided by the Apps-Engine to handle translation requests.

*   **Translation App (e.g., Google Translate App)**:
    *   This lives in its own repository (e.g., `https://github.com/RocketChat/Apps.GoogleTranslate`).
    *   It contains the logic to connect to the external API and respond to translation requests routed by the Apps-Engine.

*   **Client-Side Logic (Rocket.Chat Core)**:
    *   `client/components/message/Message/Message.tsx`: This React component (or its equivalent in older UI) is responsible for rendering individual messages. It includes logic to check for `msg.autoTranslate` and display the translated text, along with toggle options.
    *   `client/components/message/MessageActions/MessageActionMenu.tsx`: Where the "Translate" button is added to the message action menu.
    *   `client/views/room/MessageList/lib/autoTranslate.ts`: Client-side helper functions to determine if a message should be auto-translated, get the target language, etc.
    *   `client/lib/preferences/autoTranslate.ts`: Client-side management of user auto-translate preferences.
    *   `client/hooks/useAutoTranslate.ts`: Modern UI might use a hook to manage translation state for messages.

In summary, Rocket.Chat offloads the heavy lifting of translation to external services, acting as an intermediary via its flexible Apps-Engine to provide a seamless user experience.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,967 |
| Model | gemini-2.5-flash |
| Tools | NONE |
