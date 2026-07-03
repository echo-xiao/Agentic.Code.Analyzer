# How does the auto-translate feature work for messages in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

The auto-translate feature in Rocket.Chat works by intercepting messages on the server-side after they are saved and then translating them using a configured translation provider. On the client-side, a hook is used to display these translated messages.

Here's a breakdown of the flow:

**Server-Side Translation Flow:**

1.  **`TranslationProviderRegistry` (apps/meteor/app/autotranslate/server/autotranslate.ts):** This class manages the different translation providers (Google, Microsoft, DeepL) and orchestrates the translation process.
2.  **`TranslationProviderRegistry.registerCallbacks()` (apps/meteor/app/autotranslate/server/autotranslate.ts):** When auto-translate is enabled and an active provider is configured, this method registers an `afterSaveMessage` callback.
3.  **`afterSaveMessage` Callback:** This callback is triggered every time a message is saved. It receives the `message` and `room` objects.
4.  **`provider.translateMessage()`:** Inside the callback, the active translation provider's `translateMessage` method is called. This method handles the actual translation of the message content. The translated text is then stored within the message object, typically in a `message.translations` field.

**Translation Providers:**

Rocket.Chat supports multiple translation providers, each implemented as a separate module:

*   **`GoogleAutoTranslate` (apps/meteor/app/autotranslate/server/googleTranslate.ts):** Handles translations using Google Translate.
*   **`MsAutoTranslate` (apps/meteor/app/autotranslate/server/msTranslate.ts):** Handles translations using Microsoft Translator.
*   **`DeeplAutoTranslate` (apps/meteor/app/autotranslate/server/deeplTranslate.ts):** Handles translations using DeepL.

**Client-Side Display:**

*   **`useAutoTranslate` (apps/meteor/client/views/room/MessageList/hooks/useAutoTranslate.ts):** This React hook is responsible for consuming the translated messages from the server and displaying them in the message list. It likely checks for the presence of the `message.translations` field and renders the appropriate translated content to the user.
*   **`createAutoTranslateMessageStreamHandler` (apps/meteor/app/autotranslate/client/lib/autotranslate.ts):** This client-side library likely handles real-time updates for translated messages, ensuring that new translations are reflected in the UI.

**Configuration and Settings:**

*   **`Subscriptions.findByAutoTranslateAndUserId` (packages/models/src/models/Subscriptions.ts):** This model is used to retrieve and manage auto-translate settings on a per-user and per-subscription basis.
*   **`saveAutoTranslateSettings` (apps/meteor/app/autotranslate/server/functions/saveSettings.ts):** This server-side function handles saving the auto-translate settings configured by the user.

In summary, the auto-translate feature leverages server-side message hooks to perform translations using pluggable providers, and then client-side components display these translations to the user.

## Tool Calls (7 calls, 18,872 tokens)

**Step 1:** `plan({"question":"How does the auto-translate feature work for messages in Rocket.Chat?","intent":"architecture"})` → 205 tokens
**Step 2:** `search({"query":"AutoTranslate"})` → 531 tokens
**Step 3:** `graph({"file":"autotranslate.ts","query":"AutoTranslate","depth":2,"move":"expand"})` → 380 tokens
**Step 4:** `details({"filename":"autotranslate.ts","symbolName":"autotranslate"})` → 146 tokens
**Step 5:** `search({"query":"TranslationProviderRegistry","layer":"server"})` → 78 tokens
**Step 6:** `details({"filename":"autotranslate.ts","symbolName":"TranslationProviderRegistry"})` → 326 tokens
**Step 7:** `details({"filename":"autotranslate.ts","symbolName":"TranslationProviderRegistry.registerCallbacks"})` → 163 tokens

## Files Seen In Tool Results (22)

- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.tsx`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/app/autotranslate/client/lib/autotranslate.ts`
- `packages/rest-typings/src/v1/autoTranslate.ts`
- `packages/rest-typings/src/v1/autotranslate/AutotranslateSaveSettingsParamsPOST.ts`
- `packages/rest-typings/src/v1/autotranslate/AutotranslateGetSupportedLanguagesParamsGET.ts`
- `packages/core-typings/src/autoTranslate.ts`
- `apps/meteor/tests/end-to-end/api/autotranslate.ts`
- `apps/meteor/server/lib/getSubscriptionAutotranslateDefaultConfig.ts`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/index.ts`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslateWithData.tsx`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.stories.tsx`
- `apps/meteor/client/views/room/MessageList/lib/autoTranslate.ts`
- `apps/meteor/client/views/room/MessageList/hooks/useAutoTranslate.ts`
- `apps/meteor/client/startup/streamMessage/autotranslate.ts`
- `apps/meteor/client/hooks/roomActions/useAutotranslateRoomAction.ts`
- `apps/meteor/app/autotranslate/server/permissions.ts`
- `apps/meteor/app/autotranslate/server/msTranslate.ts`
- `apps/meteor/app/autotranslate/server/deeplTranslate.ts`
- `apps/meteor/app/autotranslate/server/googleTranslate.ts`
- `packages/models/src/models/Subscriptions.ts`
- `apps/meteor/app/autotranslate/server/functions/saveSettings.ts`
