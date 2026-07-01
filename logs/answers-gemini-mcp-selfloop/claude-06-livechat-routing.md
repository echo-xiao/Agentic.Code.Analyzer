# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

Livechat requests are routed to the server-side in Rocket.Chat primarily through a REST API endpoint, which then orchestrates the creation and routing of the Livechat room.

Here's the detailed call chain:

1.  **Entry Point (REST API):** Client-side Livechat requests are initially handled by the `room` endpoint defined in `apps/meteor/app/livechat/server/api/v1/room.ts`.
2.  **Room Creation Logic:** This endpoint calls `createRoom` located in `apps/meteor/app/livechat/server/lib/rooms.ts`.
3.  **Queue Management:** The `createRoom` function then invokes `startConversation` (or `requestRoom`) within `apps/meteor/app/livechat/server/lib/QueueManager.ts`.
4.  **Livechat Room Initialization:** `startConversation` in `QueueManager.ts` is responsible for calling `createLivechatRoom` in `apps/meteor/app/livechat/server/lib/Helper.ts`, which sets up the Livechat room and its associated inquiry.
5.  **Inquiry Processing and Routing:** Following the room creation, `QueueManager.requestRoom()` (part of the overall flow) proceeds to `processNewInquiry()` and subsequently `RoutingManager.delegateInquiry()`. This step applies the configured routing strategy (e.g., AutoSelection, Manual) to assign an agent to the new Livechat inquiry.

**Call Chain:**
`Client Request` → `apps/meteor/app/livechat/server/api/v1/room.ts` (`room` endpoint) → `apps/meteor/app/livechat/server/lib/rooms.ts` (`createRoom`) → `apps/meteor/app/livechat/server/lib/QueueManager.ts` (`startConversation` / `requestRoom`) → `apps/meteor/app/livechat/server/lib/Helper.ts` (`createLivechatRoom`) → `RoutingManager.delegateInquiry()` (internal routing logic).

## Tool Calls (8 calls, 25,026 tokens)

**Step 1:** `search({"query":"Livechat request","layer":"server"})` → 255 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"POSTLivechatMonitorCreateRequest"})` → 231 tokens
**Step 3:** `search({"query":"Livechat API route","layer":"server"})` → 256 tokens
**Step 4:** `search({"layer":"server","query":"QueueManager.requestRoom"})` → 266 tokens
**Step 5:** `graph({"query":"QueueManager.requestRoom","direction":"up","file":"apps/meteor/app/livechat/server/lib/roo)` → 16 tokens
**Step 6:** `search({"query":"Livechat new room","layer":"server"})` → 437 tokens
**Step 7:** `graph({"direction":"up","query":"createLivechatRoom","file":"apps/meteor/app/livechat/server/lib/Helper.ts)` → 260 tokens
**Step 8:** `graph({"query":"startConversation","direction":"up","file":"apps/meteor/app/livechat/server/lib/QueueManag)` → 366 tokens

## Files Seen In Tool Results (21)

- `packages/rest-typings/src/v1/omnichannel.ts`
- `apps/meteor/app/livechat/server/lib/rooms.ts`
- `apps/meteor/app/api/server/lib/rooms.ts`
- `packages/models/src/models/LivechatRooms.ts`
- `apps/meteor/tests/data/livechat/rooms.ts`
- `apps/meteor/app/livechat/server/lib/Helper.ts`
- `apps/meteor/app/livechat/server/lib/takeInquiry.ts`
- `packages/apps-engine/src/server/bridges/LivechatBridge.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/contacts.ts`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/livechat/server/lib/QueueManager.ts`
- `apps/meteor/app/livechat/server/lib/messages.ts`
- `apps/meteor/app/livechat/server/api/v1/room.ts`
- `packages/livechat/src/routes/Chat/container.js`
- `packages/livechat/src/routes/Chat/connector.tsx`
- `ee/packages/federation-matrix/src/events/index.ts`
- `apps/meteor/client/views/teams/contextualBar/info/TeamsInfoWithData.tsx`
- `apps/meteor/client/views/teams/contextualBar/info/TeamsInfo.tsx`
- `apps/meteor/app/livechat/imports/server/rest/sms.ts`
- `apps/meteor/app/apps/server/bridges/livechat.ts`
