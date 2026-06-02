# How does the video conference system work in Rocket.Chat?

## Gemini Answer

The video conference system in Rocket.Chat is designed to integrate with various video conference providers. The core functionality involves:

**1. Client-side Management:**
   - The `VideoConfManager` in `apps/meteor/client/lib/VideoConfManager.ts` appears to be the central client-side component for handling video conference capabilities, including logging errors and managing conference states.

**2. Data Model:**
   - The `IVideoConference.ts` file in `packages/core-typings/src/IVideoConference.ts` and `packages/apps-engine/src/definition/videoConferences/IVideoConference.ts` defines the structure for video conference data, including types for direct calls, group conferences, and livechat conferences. It also specifies the `VideoConferenceStatus` (CALLING, STARTED, EXPIRED, ENDED, DECLINED) and details about users, messages, and the conference provider.
   - The `VideoConference` symbol in `packages/models/src/index.ts` is a proxified model for interacting with video conference data.

**3. Server-side API and Bridges:**
   - The REST API endpoint for video conferences is handled by `videoConferenceRoutes` in `apps/meteor/app/api/server/v1/videoConference.ts`. This suggests that external systems or the Rocket.Chat client can interact with video conference functionality through this API.
   - The `VideoConferenceBridge` in `packages/apps-engine/src/server/bridges/VideoConferenceBridge.ts` acts as a bridge for the Apps Engine, allowing Rocket.Chat Apps to interact with video conference functionalities.
   - `apps/meteor/app/apps/server/bridges/videoConferences.ts` is another bridge for Apps to interact with video conferences, likely related to core Rocket.Chat functionality.

**4. App Integration:**
   - The system is designed to allow different video conference providers to be integrated, as indicated by `AppVideoConference` in `packages/apps-engine/src/definition/videoConferences/AppVideoConference.ts` and `IVideoConfProvider` in `packages/apps-engine/src/definition/videoConfProviders/IVideoConfProvider.ts`. This suggests a pluggable architecture where various video conferencing services can be used.

**5. Creation and Management:**
   - While a direct "create video conference" function wasn't explicitly found in a single server-side service, the `VideoConferenceCreateData` types in `packages/core-typings/src/IVideoConference.ts` indicate the data required to initiate a video conference. It's likely that the actual creation is orchestrated through the DDP methods or REST API, which then interacts with the configured video conference provider via the Apps Engine bridges.

**Call Chain (Inferred):**

1.  **Client-side initiation:** A user initiates a video conference through the Rocket.Chat client, which likely triggers actions managed by `VideoConfManager` (apps/meteor/client/lib/VideoConfManager.ts).
2.  **API/DDP call:** The client-side action sends a request to the server, possibly via a DDP method or a REST API endpoint like those handled by `videoConferenceRoutes` (apps/meteor/app/api/server/v1/videoConference.ts).
3.  **Server-side processing:** The server receives the request and, based on the `VideoConferenceCreateData`, interacts with the appropriate video conference provider. This interaction likely happens through the Apps Engine bridges (e.g., `VideoConferenceBridge` in `packages/apps-engine/src/server/bridges/VideoConferenceBridge.ts` or `apps/meteor/app/apps/server/bridges/videoConferences.ts`) to communicate with the specific video conference provider's API.
4.  **Database operations:** The `VideoConference` model (packages/models/src/index.ts) is used to persist information about the video conference in the database, based on the `IVideoConference` structure (packages/core-typings/src/IVideoConference.ts).
5.  **Real-time updates:** Changes in the video conference status are likely pushed back to clients via DDP subscriptions or real-time updates.

## Tool Calls (8 calls, 63,873 tokens)

**Step 1:** `search({"query":"video conference"})` → 853 tokens
**Step 2:** `graph({"layer":"client","direction":"down","query":"VideoConfManager"})` → 786 tokens
**Step 3:** `search({"query":"create video conference","layer":"server"})` → 171 tokens
**Step 4:** `implement({"symbolName":"VideoConference","filename":"apps/meteor/server/services/video-conference/service.ts")` → 1395 tokens
**Step 5:** `search({"layer":"server","query":"VideoConferenceService"})` → 17 tokens
**Step 6:** `implement({"filename":"apps/meteor/server/services/video-conference/service.ts","symbolName":""})` → 8 tokens
**Step 7:** `search({"layer":"server","query":"service.ts startVideoConference"})` → 19 tokens
**Step 8:** `search({"query":"VideoConference","layer":"server"})` → 307 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 0/2 |
| Tool calls | 8 |
| Total tokens | 63,873 |
