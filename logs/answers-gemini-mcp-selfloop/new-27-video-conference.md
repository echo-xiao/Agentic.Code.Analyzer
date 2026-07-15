# How does the video conference system work in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

The video conference system in Rocket.Chat works as follows:

**Flow:**

1.  **Entry Point**: The `ConferenceRoute` component (as indicated by the wiki) serves as the initial entry point, ensuring user authentication before rendering the conference page.
2.  **Conference Page Rendering**: The `ConferencePage` component (`apps/meteor/client/views/conference/ConferencePage.tsx`) is rendered.
3.  **URL Parameter Extraction**: `ConferencePage` extracts the `callUrlParam` from the browser's query parameters.
4.  **User Context**: It then appends the current user's display name to the `callUrlParam` to form the complete `callUrl`.
5.  **Call Initiation**: `ConferencePage` invokes the `handleOpenCall` function, which is returned by the `useVideoConfOpenCall` hook.
6.  **Call Handling (Desktop Application)**: The `handleOpenCall` function (defined within `apps/meteor/client/views/room/contextualBar/VideoConference/hooks/useVideoConfOpenCall.tsx`) first checks if a desktop application integration is available (`window.RocketChatDesktop.openInternalVideoChatWindow`). If it exists, the call is opened using `desktopApp.openInternalVideoChatWindow(callUrl, { providerName })`.
7.  **Call Handling (Browser)**: If no desktop application integration is detected, `handleOpenCall` attempts to open the `callUrl` in a new browser window using `window.open(callUrl)`. If the popup is blocked by the browser, a `VideoConfBlockModal` is displayed to the user.
8.  **Redirection**: After the call is initiated (either in the desktop app or a new browser window), `ConferencePage` redirects the user to the 'home' route.
9.  **Error Handling**: If no `callUrl` is found in the query parameters, `ConferencePage` renders the `ConferencePageError` component (`apps/meteor/client/views/conference/ConferencePageError.tsx`) to inform the user that the call was not found.

**Key Files:**

*   `apps/meteor/client/views/conference/ConferencePage.tsx`: This React component is responsible for processing the video conference URL, initiating the call, and handling redirection or errors.
*   `apps/meteor/client/views/room/contextualBar/VideoConference/hooks/useVideoConfOpenCall.tsx`: This hook provides the `handleOpenCall` function, which contains the logic for opening the video call either in a desktop application or a new browser window.
*   `apps/meteor/client/views/conference/ConferencePageError.tsx`: This component is displayed when a video conference URL is not found.

## Tool Calls (6 calls, 21,192 tokens)

**Step 1:** `plan({"question":"How does the video conference system work in Rocket.Chat?","intent":"architecture"})` → 2280 tokens
**Step 2:** `search({"query":"ConferencePage"})` → 100 tokens
**Step 3:** `graph({"query":"ConferencePage","file":"ConferencePage.tsx","move":"expand","depth":2})` → 357 tokens
**Step 4:** `details({"symbolName":"ConferencePage","filename":"ConferencePage.tsx"})` → 220 tokens
**Step 5:** `details({"filename":"useVideoConfOpenCall.tsx","symbolName":"handleOpenCall"})` → 89 tokens
**Step 6:** `details({"filename":"useVideoConfOpenCall.tsx","symbolName":"useVideoConfOpenCall"})` → 211 tokens

## Files Seen In Tool Results (18)

- `apps/meteor/client/views/conference/ConferenceRoute.tsx`
- `apps/meteor/client/views/conference/ConferencePage.tsx`
- `apps/meteor/client/views/conference/ConferencePageError.tsx`
- `packages/ui-video-conf/src/VideoConfPopup/VideoConfPopup.tsx`
- `packages/ui-video-conf/src/VideoConfPopup/VideoConfPopupContent.tsx`
- `packages/ui-video-conf/src/VideoConfPopup/VideoConfPopupSkeleton.tsx`
- `packages/ui-video-conf/src/VideoConfMessage/VideoConfMessageRow.tsx`
- `packages/message-types/src/registrations/videoconf.ts`
- `apps/meteor/client/views/room/contextualBar/VideoConference/hooks/useVideoConfOpenCall.tsx`
- `apps/meteor/app/cloud/server/functions/syncWorkspace/index.ts`
- `packages/apps-engine/src/client/AppsEngineUIHost.ts`
- `apps/meteor/app/importer/server/classes/converters/RoomConverter.ts`
- `apps/meteor/ee/server/local-services/instance/service.ts`
- `apps/meteor/client/views/account/preferences/AccountPreferencesPage.tsx`
- `apps/meteor/client/views/root/PageLoading.tsx`
- `apps/meteor/app/ui-utils/client/lib/LegacyRoomManager.ts`
- `apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfPopups/VideoConfPopup/StartCallPopup.tsx`
- `apps/meteor/client/views/account/preferences/useAccountPreferencesValues.ts`
