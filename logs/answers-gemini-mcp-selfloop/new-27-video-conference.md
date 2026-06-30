# How does the video conference system work in Rocket.Chat?

## Gemini Answer

The Rocket.Chat video conference system is managed on the client-side by `VideoConfManager` in `apps/meteor/client/lib/VideoConfManager.ts`, which handles the call lifecycle (ringing, accepting, rejecting). On the server-side, `VideoConfService` in `apps/meteor/server/services/video-conference/service.ts` is the core service responsible for creating, starting, and managing video conferences.

The call flow for initiating a video conference generally follows this path:

`VideoConfManager` (client-side) -> `VideoConfService.create` (server-side) -> `VideoConfService.startDirect`, `VideoConfService.startLivechat`, or `VideoConfService.startGroup` (server-side).

1.  **`VideoConfService.create`** (`apps/meteor/server/services/video-conference/service.ts`):
    *   This is the entry point for creating a new video conference.
    *   It first validates the `rid` (room ID) and `createdBy` (user ID) to ensure the room and user exist.
    *   It then checks the `type` of the video conference (direct, livechat, or group) and calls the appropriate `start` method.
    *   For `direct` calls, it verifies room compatibility for ringing.

2.  **`VideoConfService.startGroup`** (`apps/meteor/server/services/video-conference/service.ts`):
    *   This private method is responsible for initiating group video conferences.
    *   It creates a new video conference entry in the `VideoConferenceModel` (which is likely backed by `packages/models/src/models/VideoConference.ts`).
    *   It then triggers a `runNewVideoConferenceEvent` and potentially creates a discussion (`maybeCreateDiscussion`).
    *   A critical step is generating the conference URL using `this.generateNewUrl(call)` and updating the `VideoConferenceModel` with this URL.
    *   Finally, it creates a message in the chat to announce the start of the conference and sends push notifications to users in the room if ringing is enabled.

The system supports pluggable video conference providers via the `videoConfProviders` registry, and default providers integrate with services like Jitsi, often leveraging the Apps Engine. The server-side methods handle the persistence of call data, URL generation, message creation, and notifications, while the client-side manager handles the user interface and interaction with the video conference.

## Tool Calls (8 calls, 56,593 tokens)

**Step 1:** `search({"query":"video conference"})` → 693 tokens
**Step 2:** `graph({"direction":"down","file":"apps/meteor/server/services/video-conference/service.ts","query":"VideoC)` → 15 tokens
**Step 3:** `graph({"layer":"client","depth":3,"direction":"down","query":"VideoConfManager"})` → 1152 tokens
**Step 4:** `search({"layer":"server","query":"VideoConfService"})` → 406 tokens
**Step 5:** `graph({"depth":3,"query":"VideoConfService","direction":"down","layer":"server","file":"apps/meteor/server)` → 137 tokens
**Step 6:** `implement({"filename":"apps/meteor/server/services/video-conference/service.ts","symbolName":"VideoConfService)` → 2243 tokens
**Step 7:** `implement({"filename":"apps/meteor/server/services/video-conference/service.ts","symbolName":"VideoConfService)` → 368 tokens
**Step 8:** `implement({"filename":"apps/meteor/server/services/video-conference/service.ts","symbolName":"VideoConfService)` → 353 tokens
