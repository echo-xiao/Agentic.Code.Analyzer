# How are Livechat requests routed to the server-side in Rocket.Chat?

## Plan

intent: routing

## Gemini Answer

Livechat requests are routed to the server-side in Rocket.Chat through a REST API endpoint.

Here's the breakdown of the routing:

1.  **Client-side dispatch:** The `handleTakeInquiry` function in `apps/meteor/client/views/room/composer/ComposerOmnichannel/ComposerOmnichannelInquiry.tsx` is responsible for initiating the request to take an inquiry.
2.  **Server-side routing:** The `takeInquiry` function, located at `apps/meteor/app/livechat/server/lib/takeInquiry.ts`, is the core server-side logic for processing the request.
3.  **API Endpoint:** The `takeInquiry` function is called by an API endpoint defined using `API.v1.addRoute`. This routing is handled by `apps/meteor/app/api/server/ApiClass.ts`, which provides the `addRoute` method for registering API routes. The specific API endpoint for Livechat inquiries is found in `apps/meteor/app/livechat/imports/server/rest/inquiries.ts`.

Therefore, the flow is:

Client (`handleTakeInquiry`) → REST API Endpoint (`API.v1.addRoute` in `apps/meteor/app/livechat/imports/server/rest/inquiries.ts`) → Server (`takeInquiry` in `apps/meteor/app/livechat/server/lib/takeInquiry.ts`).

## Tool Calls (8 calls, 21,025 tokens)

**Step 1:** `plan({"question":"How are Livechat requests routed to the server-side in Rocket.Chat?","intent":"routing"})` → 287 tokens
**Step 2:** `search({"query":"takeInquiry"})` → 176 tokens
**Step 3:** `graph({"query":"takeInquiry","file":"takeInquiry.ts","move":"expand"})` → 349 tokens
**Step 4:** `graph({"file":"takeInquiry.ts","query":"takeInquiry","move":"up"})` → 63 tokens
**Step 5:** `details({"filename":"inquiries.ts","symbolName":"inquiries"})` → 98 tokens
**Step 6:** `details({"filename":"inquiries.ts","symbolName":"API.v1.addRoute"})` → 73 tokens
**Step 7:** `details({"filename":"inquiries.ts","symbolName":"API"})` → 112 tokens
**Step 8:** `search({"layer":"server","query":"addRoute"})` → 65 tokens

## Files Seen In Tool Results (19)

- `packages/models/src/models/LivechatInquiry.ts`
- `apps/meteor/tests/data/livechat/rooms.ts`
- `apps/meteor/app/livechat/server/lib/takeInquiry.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/checkAgentBeforeTakeInquiry.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/afterTakeInquiry.ts`
- `apps/meteor/client/views/room/composer/ComposerOmnichannel/ComposerOmnichannelInquiry.tsx`
- `apps/meteor/app/livechat/server/lib/hooks.ts`
- `apps/meteor/app/livechat/server/lib/contacts/isAgentAvailableToTakeContactInquiry.ts`
- `apps/meteor/ee/server/patches/isAgentAvailableToTakeContactInquiry.ts`
- `apps/meteor/app/settings/server/CachedSettings.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/mailer/server/api.ts`
- `apps/meteor/client/lib/toast.ts`
- `packages/apps-engine/deno-runtime/lib/logger.ts`
- `apps/meteor/client/views/room/contexts/RoomContext.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/lib/QueueInactivityMonitor.ts`
- `apps/meteor/app/livechat/imports/server/rest/inquiries.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/inquiries.ts`
- `apps/meteor/tests/e2e/federation/utils/test.ts`
