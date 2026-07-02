# How does the auto-translate feature work for messages in Rocket.Chat?

## Gemini Answer

The auto-translate feature in Rocket.Chat works by registering an `afterSaveMessage` callback with a medium priority. This means that after a message is saved, the auto-translate logic is triggered.

Here's a breakdown of the process:

1.  **Event Trigger**: When a message is saved, the `afterSaveMessage` event is fired.
2.  **Translation Provider Registry**: The `TranslationProviderRegistry` manages different translation services, such as `GoogleAutoTranslate`, `MSTranslate`, and `DeepLTranslate`.
3.  **Conditional Translation**: If auto-translate is enabled for a specific room, the `afterSaveMessage` callback will invoke the `provider.translateMessage()` method of the configured translation provider.
4.  **Translation Storage**: The translated message is then stored in the `message.translations` field.
5.  **Provider Implementation**: Each translation provider (e.g., `GoogleAutoTranslate`, `MSTranslate`, `DeepLTranslate`) implements a base `AutoTranslate` class, which includes the `_translateMessage()` method responsible for the actual translation logic.

Key files involved in this process include:

*   **`apps/meteor/app/autotranslate/server/autotranslate.ts`**: This file likely contains the core server-side logic for auto-translation, including the registration of the `afterSaveMessage` callback.
*   **`apps/meteor/app/autotranslate/server/googleTranslate.ts`**: This file would contain the implementation for Google's auto-translation service.
*   **`apps/meteor/app/autotranslate/server/msTranslate.ts`**: This file would contain the implementation for Microsoft's auto-translation service.
*   **`apps/meteor/app/autotranslate/server/deeplTranslate.ts`**: This file would contain the implementation for DeepL's auto-translation service.
*   **`apps/meteor/app/lib/server/lib/afterSaveMessage.ts`**: This file is where the `afterSaveMessage` event is defined and potentially where the auto-translate callback is added.

The flow can be summarized as:

**Entry** (`afterSaveMessage` event in `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`) → **Conditional Translation Check** (within `apps/meteor/app/autotranslate/server/autotranslate.ts`) → **Provider Selection** (via `TranslationProviderRegistry`) → **Message Translation** (e.g., `GoogleAutoTranslate` in `apps/meteor/app/autotranslate/server/googleTranslate.ts`) → **Translation Storage** (in `message.translations` field).

## Tool Calls (8 calls, 26,013 tokens)

**Step 1:** `plan({"intent":"architecture","question":"How does the auto-translate feature work for messages in Rocket)` → 85 tokens
**Step 2:** `search({"query":"autoTranslate"})` → 550 tokens
**Step 3:** `graph({"move":"expand","query":"autoTranslate","depth":2})` → 481 tokens
**Step 4:** `details({"filename":"apps/meteor/app/autotranslate/server/autotranslate.ts","symbolName":"autotranslate"})` → 135 tokens
**Step 5:** `search({"query":"afterSaveMessage autoTranslate","layer":"server"})` → 30 tokens
**Step 6:** `search({"layer":"server","query":"afterSaveMessage"})` → 270 tokens
**Step 7:** `graph({"move":"down","query":"afterSaveMessage","depth":3,"layer":"server"})` → 499 tokens
**Step 8:** `graph({"move":"down","depth":3,"query":"afterSaveMessage","edgeTypes":["event_listen"],"layer":"server"})` → 175 tokens

## Files Seen In Tool Results (26)

- `packages/rest-typings/src/v1/autoTranslate.ts`
- `packages/rest-typings/src/v1/autotranslate/AutotranslateSaveSettingsParamsPOST.ts`
- `packages/rest-typings/src/v1/autotranslate/AutotranslateGetSupportedLanguagesParamsGET.ts`
- `packages/core-typings/src/autoTranslate.ts`
- `apps/meteor/tests/end-to-end/api/autotranslate.ts`
- `apps/meteor/server/lib/getSubscriptionAutotranslateDefaultConfig.ts`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/index.ts`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslateWithData.tsx`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.stories.tsx`
- `apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.tsx`
- `apps/meteor/client/views/room/MessageList/lib/autoTranslate.ts`
- `apps/meteor/client/views/room/MessageList/hooks/useAutoTranslate.ts`
- `apps/meteor/client/startup/streamMessage/autotranslate.ts`
- `apps/meteor/client/hooks/roomActions/useAutotranslateRoomAction.ts`
- `apps/meteor/app/autotranslate/server/permissions.ts`
- `apps/meteor/app/autotranslate/server/autotranslate.ts`
- `apps/meteor/app/autotranslate/server/msTranslate.ts`
- `apps/meteor/app/autotranslate/server/deeplTranslate.ts`
- `apps/meteor/app/autotranslate/server/googleTranslate.ts`
- `apps/meteor/app/autotranslate/client/lib/autotranslate.ts`
- `packages/models/src/models/Subscriptions.ts`
- `apps/meteor/app/autotranslate/server/functions/saveSettings.ts`
- `apps/meteor/ee/app/message-read-receipt/server/hooks/afterSaveMessage.ts`
- `apps/meteor/app/search/server/events/index.ts`
- `apps/meteor/app/lib/server/lib/afterSaveMessage.ts`
- `apps/meteor/app/threads/server/hooks/aftersavemessage.ts`
