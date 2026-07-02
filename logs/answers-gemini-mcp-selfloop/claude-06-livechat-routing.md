# How are Livechat requests routed to the server-side in Rocket.Chat?

## Gemini Answer

The routing of Livechat requests to the server-side in Rocket.Chat begins with `QueueManager.requestRoom()`. This function is responsible for creating a new room and an inquiry within a transaction.

Here's the flow:

1.  **`QueueManager.requestRoom()`** (apps/meteor/app/livechat/server/lib/rooms.ts): This function initiates the Livechat request by creating a room and an inquiry.
2.  **`processNewInquiry()`**: After the room and inquiry are created, this function checks the status of the inquiry.
3.  **`RoutingManager.delegateInquiry()`**:
    *   If the inquiry status is `READY`, `RoutingManager.delegateInquiry()` is called immediately.
    *   If the inquiry status is `QUEUED`, the inquiry is saved to the queue.
4.  **Routing Strategy**: `RoutingManager.delegateInquiry()` then applies a routing strategy (e.g., AutoSelection, Manual) to determine how the inquiry should be handled.
5.  **`takeInquiry()`**: This function assigns an agent to the inquiry.
6.  **`assignAgent()`**: This function updates the room with the assigned agent.

Additionally, there's a background process:

*   **`OmnichannelService`**: This service starts an `OmnichannelQueue` worker.
*   **`execute()` loop**: This loop processes queued inquiries, which also calls `RoutingManager.delegateInquiry()`.

The `Livechat` symbol in `packages/livechat/src/api.ts` appears to be a client-side implementation (`LivechatClientImpl.create`) that connects to the host via websockets, suggesting it's the client-side component that initiates these requests.

## Tool Calls (8 calls, 20,437 tokens)

**Step 1:** `plan({"question":"How are Livechat requests routed to the server-side in Rocket.Chat?","intent":"routing")` → 89 tokens
**Step 2:** `search({"query":"Livechat request","layer":"server"})` → 26 tokens
**Step 3:** `search({"query":"Livechat.API","layer":"server"})` → 25 tokens
**Step 4:** `search({"layer":"server","query":"Livechat"})` → 621 tokens
**Step 5:** `graph({"query":"Livechat","file":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/livechat/src/api.ts",)` → 489 tokens
**Step 6:** `details({"symbolName":"Livechat","filename":"/Users/echoooooo/Desktop/code/Rocket.Chat/packages/livechat/src)` → 57 tokens
**Step 7:** `search({"query":"QueueManager.requestRoom","layer":"server"})` → 272 tokens
**Step 8:** `graph({"depth":4,"query":"QueueManager.requestRoom","move":"down","file":"apps/meteor/app/livechat/server/)` → 16 tokens

## Files Seen In Tool Results (28)

- `packages/livechat/src/api.ts`
- `packages/apps-engine/src/server/bridges/LivechatBridge.ts`
- `packages/apps-engine/src/server/accessors/LivechatUpdater.ts`
- `packages/apps-engine/src/server/accessors/LivechatRead.ts`
- `packages/apps-engine/src/server/accessors/LivechatMessageBuilder.ts`
- `packages/apps-engine/src/server/accessors/LivechatCreator.ts`
- `apps/meteor/tests/unit/app/livechat/server/hooks/sendToCRM.tests.ts`
- `apps/meteor/tests/unit/app/lib/server/functions/closeLivechatRoom.tests.ts`
- `apps/meteor/server/services/authorization/canAccessRoomLivechat.ts`
- `apps/meteor/server/lib/rooms/roomTypes/livechat.ts`
- `apps/meteor/ee/server/models/LivechatUnitMonitors.ts`
- `apps/meteor/ee/server/models/LivechatUnit.ts`
- `apps/meteor/ee/server/models/LivechatTag.ts`
- `apps/meteor/ee/server/models/LivechatRooms.ts`
- `apps/meteor/ee/server/models/LivechatInquiry.ts`
- `apps/meteor/ee/server/models/LivechatDepartmentAgents.ts`
- `apps/meteor/server/services/video-conference/service.ts`
- `packages/models/src/index.ts`
- `apps/meteor/app/apps/server/bridges/listeners.ts`
- `packages/message-types/src/registrations/livechat.ts`
- `apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-livechat.ts`
- `apps/meteor/tests/end-to-end/api/livechat/11-livechat.ts`
- `apps/meteor/client/lib/rooms/roomCoordinator.tsx`
- `packages/models/src/models/VideoConference.ts`
- `apps/meteor/ee/server/models/raw/LivechatTag.ts`
- `apps/meteor/ee/server/models/raw/LivechatUnit.ts`
- `packages/apps-engine/src/server/bridges/AppBridges.ts`
- `apps/meteor/app/livechat/server/lib/rooms.ts`
