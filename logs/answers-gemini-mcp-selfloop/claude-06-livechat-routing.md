# How are Livechat requests routed to the server-side in Rocket.Chat?

## Plan

intent: routing

## Gemini Answer

Livechat requests in Rocket.Chat are routed to the server-side through a multi-step process involving several key components.

**1. Entry Points:**
Livechat requests can originate from various sources:
*   **Livechat Widget/API:** While the exact `GET /livechat/room` endpoint was not found in the search, the wiki indicates that the Livechat widget and direct API calls are primary entry points. These requests are responsible for finding existing rooms or creating new ones.
*   **SMS Integration:** Incoming SMS messages are handled by the `POST /api/v1/livechat.sms.incoming` endpoint.
*   **Rocket.Chat Apps:** Custom applications can create livechat rooms using the `AppLivechatBridge`.

**2. Visitor Registration and Room Preparation:**
*   The `registerGuest()` function is called to identify or create a visitor.
*   If no room exists, `createRoom()` is called, which uses `prepareLivechatRoom()` to construct the `IOmnichannelRoom` object.

**3. Queue Management:**
*   The `QueueManager.requestRoom()` method, found in `apps/meteor/app/livechat/server/lib/rooms.ts`, is central to initiating the routing process.
*   It performs checks for agent availability and then calls `startConversation()` to atomically create the livechat room and an inquiry record in MongoDB.
*   `processNewInquiry()` is then called to determine the inquiry's status (e.g., `READY`, `QUEUED`).

**4. Agent Assignment and Delegation:**
*   If the inquiry status is `READY`, `RoutingManager.delegateInquiry()` is called to assign the chat to an agent. This method was found in `apps/meteor/app/livechat/server/lib/QueueManager.ts`, `apps/meteor/app/livechat/server/lib/Helper.ts`, and `apps/meteor/server/services/omnichannel/queue.ts`.
*   The `RoutingManager` uses configured routing strategies (e.g., `Load_Rotation`) to find the next available agent.
*   If no agent is immediately available, the inquiry can be moved to a `QUEUED` status.

**Core Files:**
*   `apps/meteor/app/livechat/server/lib/rooms.ts`: Contains the call to `QueueManager.requestRoom()`.
*   `apps/meteor/app/livechat/server/lib/QueueManager.ts`: Contains calls to `RoutingManager.delegateInquiry()`.
*   `apps/meteor/app/livechat/server/lib/Helper.ts`: Contains calls to `RoutingManager.delegateInquiry()`.
*   `apps/meteor/server/services/omnichannel/queue.ts`: Contains calls to `RoutingManager.delegateInquiry()`.

**Flow:**
Entry Point (e.g., Livechat Widget/API, SMS) → `registerGuest()` → `createRoom()` (if needed) → `QueueManager.requestRoom()` → `startConversation()` → `processNewInquiry()` → `RoutingManager.delegateInquiry()` → Agent Assignment.

## Tool Calls (8 calls, 24,536 tokens)

**Step 1:** `wiki({"question":"How are Livechat requests routed to the server-side in Rocket.Chat?"})` → 1037 tokens
**Step 2:** `plan({"question":"How are Livechat requests routed to the server-side in Rocket.Chat?","intent":"routing"})` → 1102 tokens
**Step 3:** `search({"query":"GET /livechat/room"})` → 27 tokens
**Step 4:** `search({"query":"addRoute 'livechat/room'"})` → 28 tokens
**Step 5:** `search({"query":"QueueManager.requestRoom"})` → 88 tokens
**Step 6:** `search({"query":"RoutingManager.delegateInquiry"})` → 173 tokens
**Step 7:** `graph({"file":"rooms.ts","query":"QueueManager.requestRoom","depth":3,"move":"down"})` → 16 tokens
**Step 8:** `graph({"file":"rooms.ts","depth":3,"move":"down","query":"QueueManager.requestRoom"})` → 16 tokens

## Files Seen In Tool Results (4)

- `apps/meteor/app/livechat/server/lib/rooms.ts`
- `apps/meteor/app/livechat/server/lib/QueueManager.ts`
- `apps/meteor/app/livechat/server/lib/Helper.ts`
- `apps/meteor/server/services/omnichannel/queue.ts`
