# How does the video conference system work in Rocket.Chat?

## Gemini Answer

The video conference system in Rocket.Chat appears to be built around a `VideoConference` model, likely defined in `packages/models/src/index.ts`. This model is responsible for managing video conference data.

From the initial searches, it's clear that there are REST API endpoints related to video conferencing, indicated by files like:
* `packages/rest-typings/src/v1/videoConference/index.ts`
* `packages/rest-typings/src/v1/videoConference/VideoConfStartProps.ts`
* `apps/meteor/app/api/server/v1/videoConference.ts`

The `apps/meteor/app/api/server/v1/videoConference.ts` file likely defines the server-side logic for handling video conference requests, including starting, listing, joining, and canceling conferences, based on the corresponding `VideoConfStartProps`, `VideoConfListProps`, `VideoConfJoinProps`, and `VideoConfCancelProps` typings.

There are also server-side bridges and accessors for video conferencing, as shown in:
* `packages/apps-engine/src/server/bridges/VideoConferenceBridge.ts`
* `packages/apps-engine/src/server/accessors/VideoConferenceRead.ts`
* `packages/apps-engine/src/server/accessors/VideoConferenceExtend.ts`
* `packages/apps-engine/src/server/accessors/VideoConferenceBuilder.ts`
* `apps/meteor/app/apps/server/bridges/videoConferences.ts`

These bridges and accessors suggest an integration with Rocket.Chat's Apps Engine, allowing custom applications to interact with the video conferencing functionality.

Furthermore, there are UI components related to video conferencing:
* `packages/ui-kit/src/blocks/layout/VideoConferenceBlock.ts`
* `packages/fuselage-ui-kit/src/blocks/VideoConferenceBlock/index.ts`
* `packages/fuselage-ui-kit/src/blocks/VideoConferenceBlock/VideoConferenceBlock.tsx`
* `packages/fuselage-ui-kit/src/blocks/VideoConferenceBlock/hooks/useVideoConfDataStream.ts`
* `packages/fuselage-ui-kit/src/blocks/VideoConferenceBlock/hooks/useVideoConfData.ts`

These files indicate that there's a client-side representation and interaction mechanism for video conferences, likely using React components and hooks to manage real-time data streams.

The call chain, based on the available information, starts with client-side actions that trigger calls to the REST API endpoints defined in `apps/meteor/app/api/server/v1/videoConference.ts`. These API endpoints then interact with the `VideoConference` model and potentially other server-side services or apps through the `VideoConferenceBridge` and related accessors to manage the video conference lifecycle. Client-side UI components (`VideoConferenceBlock.tsx`) consume data streams (`useVideoConfDataStream.ts`) to display the conference information.

**Call Chain (Inferred):**
Client UI Action (e.g., "Start Video Call") → `VideoConferenceBlock.tsx` (client) → REST API Endpoint (`apps/meteor/app/api/server/v1/videoConference.ts`) → Server-side logic utilizing `VideoConference` model and potentially `VideoConferenceBridge` → Data persistence/external video conference service → Real-time updates to client via `useVideoConfDataStream.ts`

## Tool Calls (8 calls, 28,536 tokens)

**Step 1:** `search({"query":"conference"})` → 460 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"VideoConference"})` → 35 tokens
**Step 3:** `search({"query":"videoConference","layer":"server"})` → 295 tokens
**Step 4:** `graph({"direction":"down","layer":"server","query":"apps/meteor/app/api/server/v1/videoConference.ts"})` → 22 tokens
**Step 5:** `implement({"symbolName":"videoConference","filename":"apps/meteor/app/api/server/v1/videoConference.ts"})` → 17 tokens
**Step 6:** `search({"layer":"server","query":"addRoute"})` → 215 tokens
**Step 7:** `implement({"symbolName":"VideoConference","filename":"apps/meteor/app/api/server/v1/videoConference.ts"})` → 65 tokens
**Step 8:** `search({"layer":"server","query":"videoConference.start"})` → 16 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 0/6 |
| Symbols hit | 0/2 |
| Tool calls | 8 |
| Total tokens | 28,536 |
| Pass | NO |
