# How does the video conference system work in Rocket.Chat?

## Gemini Answer

I apologize, but I was unable to fully determine how the video conference system works in Rocket.Chat. My attempts to use `graph` and `implement` on the `video-conference/service.ts` file were unsuccessful, as the specific symbols or methods I tried to query were not found or correctly identified.

Here's what I was able to gather:

*   **Entry Points:** The initial search revealed several potential entry points related to video conferencing, including:
    *   `packages/apps-engine/src/server/accessors/VideoConferenceExtend.ts` (`getVideoConference`)
    *   `packages/apps-engine/src/definition/videoConferences/AppVideoConference.ts` (`AppVideoConference`)
    *   `apps/meteor/server/cron/videoConferences.ts` (`runVideoConferences`)
    *   `packages/models/src/models/VideoConference.ts` (`VideoConferenceRaw`)
    *   `apps/meteor/server/services/video-conference/service.ts` (mentioned in text matches)
    *   `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts` (`onNewVideoConference`)

*   **`onNewVideoConference` Call Chain:** I was able to graph the downstream calls from `onNewVideoConference` in `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`. This showed interactions with:
    *   `getLogStorage` (utilities.ts)
    *   `retrieveProviderInfo` (AppVideoConfProviderManager.ts) which involves `StepsLinkedList.ts`, `BaseRaw.ts`, and `Users.ts`.
    *   `VideoConfProviderNotRegisteredError` (VideoConfProviderNotRegisteredError.ts)
    *   `runOnNewVideoConference` (AppVideoConfProvider.ts) which further calls `log` and `error` in `MediaCallLogger.ts`, `getRuntimeController` in `ProxiedApp.ts`, and `sendRequest` in `EmptyRuntime.ts`.

It appears that the system involves an `AppVideoConfProviderManager` which handles new video conference events and interacts with various logging, data retrieval, and runtime components. However, without successfully implementing the core service file or a clear "create" function, I cannot provide a complete picture of the video conference system's architecture and call flow.

## Tool Calls (8 calls, 33,891 tokens)

**Step 1:** `search({"query":"video conference"})` → 693 tokens
**Step 2:** `graph({"file":"apps/meteor/server/services/video-conference/service.ts","direction":"down","layer":"server)` → 15 tokens
**Step 3:** `implement({"filename":"apps/meteor/server/services/video-conference/service.ts","symbolName":"video-conference)` → 62 tokens
**Step 4:** `graph({"file":"packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts","direction":"down")` → 842 tokens
**Step 5:** `implement({"filename":"apps/meteor/server/services/video-conference/service.ts","symbolName":"VideoConferenceS)` → 19 tokens
**Step 6:** `search({"layer":"server","query":"video conference service.ts"})` → 18 tokens
**Step 7:** `search({"query":"VideoConferenceService","layer":"server"})` → 17 tokens
**Step 8:** `search({"query":"apps/meteor/server/services/video-conference/service.ts"})` → 79 tokens

## Files Seen In Tool Results (18)

- `packages/apps-engine/src/server/accessors/VideoConferenceExtend.ts`
- `packages/apps-engine/src/definition/videoConferences/AppVideoConference.ts`
- `apps/meteor/server/cron/videoConferences.ts`
- `packages/models/src/index.ts`
- `packages/models/src/models/VideoConference.ts`
- `apps/meteor/ee/server/configuration/videoConference.ts`
- `packages/apps-engine/src/server/accessors/VideoConferenceRead.ts`
- `packages/core-typings/src/IVideoConference.ts`
- `apps/meteor/tests/end-to-end/apps/video-conferences.ts`
- `packages/apps-engine/src/server/managers/AppVideoConfProviderManager.ts`
- `packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts`
- `apps/meteor/app/apps/server/bridges/videoConferences.ts`
- `packages/apps-engine/src/definition/accessors/IVideoConferenceRead.ts`
- `packages/apps-engine/src/server/accessors/ModifyCreator.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `apps/meteor/client/lib/VideoConfManager.ts`
- `packages/apps-engine/src/server/errors/VideoConfProviderNotRegisteredError.ts`
