# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat works by registering a callback that intercepts messages after they are saved. If auto-translation is enabled for a specific room, a designated translation provider is invoked to translate the message, and the translations are then stored within the message object.

Here's the detailed call chain:

**Call Chain:** `afterSaveMessage (callback) → translateMessage → provider._translateMessage()`

1.  **Entry Point: `registerCallbacks`**
    *   The core of the auto-translate feature is initialized in `apps/meteor/app/autotranslate/server/autotranslate.ts` through the `registerCallbacks` function.
    *   This function registers an `afterSaveMessage` callback with `MEDIUM` priority. This means that every message saved on the server will trigger this callback.

2.  **`translateMessage` (Orchestrator)**
    *   When the `afterSaveMessage` callback is triggered, it calls the `translateMessage` function, defined in `apps/meteor/app/autotranslate/server/autotranslate.ts`.
    *   This `translateMessage` function acts as an orchestrator. It checks if auto-translation is enabled for the specific room where the message was sent.
    *   It utilizes the `TranslationProviderRegistry` to manage different translation services such as `GoogleAutoTranslate`, `MSTranslate`, and `DeepLTranslate`.

3.  **Provider-Specific Translation: `provider._translateMessage()`**
    *   If auto-translation is active for the room, `translateMessage` dispatches the message to the configured translation provider.
    *   Each provider (e.g., `MSTranslate` in `apps/meteor/app/autotranslate/server/msTranslate.ts`) implements an `AutoTranslate` base class, which includes the `_translateMessage()` method. This method handles the actual interaction with the external translation API.

4.  **Storing Translations**
    *   The translated content is then stored in the `message.translations` field of the message object. This allows the client to display the translated version to users who have enabled auto-translation.

**Key Files:**

*   `apps/meteor/app/autotranslate/server/autotranslate.ts`: Contains `translateMessage` and `registerCallbacks`, which are central to initiating the translation process and registering the `afterSaveMessage` hook.
*   `apps/meteor/app/autotranslate/server/msTranslate.ts`: An example of a translation provider, containing the `_translateMessage` implementation for Microsoft Translate.
*   `packages/core-typings/src/IMessage/IMessage.ts`: Defines the `ITranslatedMessage` interface and `isTranslatedMessage` helper, indicating how translated messages are structured and identified.

## Tool Calls (8 calls, 33,647 tokens)

**Step 1:** `search({"layer":"server","query":"auto-translate message"})` → 17 tokens
**Step 2:** `search({"query":"translate message"})` → 244 tokens
**Step 3:** `graph({"query":"translateMessage","file":"apps/meteor/app/autotranslate/server/autotranslate.ts","directio)` → 809 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"translateMessage"})` → 116 tokens
**Step 5:** `implement({"symbolName":"translateMessage","filename":"apps/meteor/app/autotranslate/server/autotranslate.ts"})` → 116 tokens
**Step 6:** `search({"query":"autotranslate.ts","layer":"server"})` → 226 tokens
**Step 7:** `graph({"file":"apps/meteor/app/autotranslate/server/msTranslate.ts","query":"_translateMessage","direction)` → 181 tokens
**Step 8:** `implement({"symbolName":"translateMessage","filename":"apps/meteor/app/autotranslate/server/autotranslate.ts"})` → 116 tokens
