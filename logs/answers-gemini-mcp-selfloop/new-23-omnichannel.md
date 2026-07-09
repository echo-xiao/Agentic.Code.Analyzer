# How does the Omnichannel queue process and close a livechat conversation?

## Plan

intent: unknown

## Gemini Answer

The Omnichannel queue processes and closes livechat conversations through a series of steps involving several key components.

**1. Omnichannel Queue Processing:**

The core of queue processing is handled by the `OmnichannelQueue` service, located in `apps/meteor/server/services/omnichannel/queue.ts`.

*   **`OmnichannelQueue.checkQueue`**: This method is responsible for iterating through active queues.
    *   It uses `LivechatInquiry.findNextAndLock` to retrieve the next available inquiry from the queue and lock it to prevent other processes from picking it up.
    *   It then calls `OmnichannelQueue.processWaitingQueue` to attempt to assign the inquiry to an agent.
    *   If the inquiry is successfully assigned, it's unlocked. If not, it's unlocked and re-queued.

*   **`OmnichannelQueue.processWaitingQueue`**: This method attempts to delegate an inquiry to an agent.
    *   It first performs several pre-checks:
        *   Ensures the associated room still exists (`LivechatRooms.findOneById`).
        *   Verifies the room is not already served by an agent.
        *   Confirms the room is not already closed.
    *   It then calls `RoutingManager.delegateInquiry` to assign the inquiry to an available agent based on routing rules.
    *   If delegation is successful, an `agentDelegated` event is dispatched.

**Flow:** `OmnichannelQueue` (apps/meteor/server/services/omnichannel/queue.ts) → `checkQueue` → `LivechatInquiry.findNextAndLock` → `processWaitingQueue` → `RoutingManager.delegateInquiry`

**2. Closing a Livechat Conversation:**

Livechat conversations can be closed by visitors, agents, or automatically due to inactivity. The central function for closing a room is `closeRoom` in `apps/meteor/app/livechat/server/lib/closeRoom.ts`.

*   **`closeRoom`**: This function orchestrates the closure process.
    *   It initiates a MongoDB transaction to ensure atomicity of the closing operations.
    *   It calls `doCloseRoom` to perform the core closing logic within the transaction.
    *   After `doCloseRoom` completes successfully, the transaction is committed.
    *   Finally, it calls `afterRoomClosed` to handle post-closure actions outside the transaction.

*   **`doCloseRoom` (within transaction)**: This function performs the actual database updates to close the room.
    *   It validates the room's state and checks for required comments.
    *   It calculates chat duration and determines who closed the chat (visitor or user).
    *   It removes the associated `LivechatInquiry` record using `LivechatInquiry.removeByRoomId`.
    *   It updates the `LivechatRoom` status to closed using `LivechatRooms.closeRoomById`.
    *   It removes associated `Subscriptions` using `Subscriptions.removeByRoomId`.
    *   It notifies about room and inquiry changes.

*   **`afterRoomClosed` (after transaction)**: This function handles actions that occur after the room has been formally closed in the database.
    *   It sends system messages (e.g., "livechat-close", "promptTranscript").
    *   It triggers Apps-Engine events (`AppEvents.ILivechatRoomClosedHandler`, `AppEvents.IPostLivechatRoomClosed`) for integrations.
    *   It runs `livechat.closeRoom` callbacks, which are used by the Enterprise Edition for tasks like unscheduling auto-close for on-hold chats and dispatching waiting queue status updates.
    *   It sends further notifications about room and inquiry changes.

**Flow:**
Entry (e.g., `livechat/room.close` API endpoint or `OmnichannelQueueInactivityMonitorClass` for auto-closure) → `closeRoom` (apps/meteor/app/livechat/server/lib/closeRoom.ts) → `doCloseRoom` → `LivechatInquiry.removeByRoomId`, `LivechatRooms.closeRoomById`, `Subscriptions.removeByRoomId` → `afterRoomClosed` → `Message.saveSystemMessageAndNotifyUser`, Apps-Engine events, `livechat.closeRoom` callbacks.

## Tool Calls (8 calls, 25,536 tokens)

**Step 1:** `wiki({"question":"Omnichannel queue process and close livechat conversation"})` → 1095 tokens
**Step 2:** `search({"layer":"server","query":"OmnichannelQueue"})` → 136 tokens
**Step 3:** `details({"symbolName":"OmnichannelQueue","filename":"queue.ts"})` → 362 tokens
**Step 4:** `details({"filename":"queue.ts","symbolName":"OmnichannelQueue.checkQueue"})` → 337 tokens
**Step 5:** `details({"filename":"queue.ts","symbolName":"OmnichannelQueue.processWaitingQueue"})` → 553 tokens
**Step 6:** `details({"filename":"closeRoom.ts","symbolName":"closeRoom"})` → 349 tokens
**Step 7:** `details({"filename":"closeRoom.ts","symbolName":"doCloseRoom"})` → 888 tokens
**Step 8:** `details({"filename":"closeRoom.ts","symbolName":"afterRoomClosed"})` → 607 tokens

## Files Seen In Tool Results (5)

- `apps/meteor/app/livechat/server/lib/closeRoom.ts`
- `packages/livechat/src/lib/room.js`
- `apps/meteor/server/services/omnichannel/queue.ts`
- `apps/meteor/client/navbar/NavBarOmnichannelGroup/NavBarItemOmnichannelQueue.tsx`
- `apps/meteor/client/navbar/NavBarOmnichannelGroup/hooks/useOmnichannelQueueAction.ts`
