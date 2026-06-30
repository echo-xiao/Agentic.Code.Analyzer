# How does the Omnichannel queue process and close a livechat conversation?

## Baseline Answer (no tools)

The Omnichannel queue process and the closing of a livechat conversation in Rocket.Chat involve several interconnected components and steps, primarily managed by the `rocketchat:livechat` package.

Here's a breakdown of the process:

### 1. Livechat Initiation and Queueing

1.  **Visitor Starts Chat:**
    *   When a visitor initiates a chat from the widget, a client-side method (e.g., `Livechat.startChat`) is invoked, which calls the server-side method `livechat:startLivechat`.
    *   **File:** `app/livechat/server/methods/startLivechat.js`
    *   This method first registers or identifies the guest (`Livechat.registerGuest`) and then creates a new livechat room (type `l`) in the `Rooms` collection.

2.  **Inquiry Creation:**
    *   A new document is created in the `LivechatInquiry` collection with a `status` of `'queued'`. This inquiry represents the pending chat request.
    *   **File:** `app/models/server/raw/LivechatInquiry.js`

3.  **Routing and Queue Management:**
    *   The `Livechat.startChat` method then delegates the inquiry to the `RoutingManager`.
    *   **File:** `app/livechat/server/lib/RoutingManager.js`
    *   The `RoutingManager` determines the appropriate routing method based on the Omnichannel settings (e.g., `Auto_Selection`, `Manual_Selection`, `Load_Balancing`, `Longest_Idle`).
    *   It attempts to find an available agent or department.
    *   If an agent is immediately available and the routing method allows for automatic assignment, the inquiry proceeds to assignment.
    *   If no agent is immediately available or the routing method requires manual selection, the inquiry remains in the queue (`LivechatInquiry.status: 'queued'`).
    *   The `QueueManager` handles the actual queueing logic, making the inquiry visible to agents in the Omnichannel queue panel.
    *   **File:** `app/livechat/server/lib/QueueManager.js`
    *   **Routing Methods:** `app/livechat/server/lib/routingMethods/` (e.g., `Auto_Selection.js`, `Manual_Selection.js`)

### 2. Agent Assignment

1.  **Delegation:**
    *   The `RoutingManager.delegateInquiry()` method is central here. It iterates through available agents (considering department, capacity, and routing method) to find the best match.
    *   **File:** `app/livechat/server/lib/RoutingManager.js`

2.  **Assignment:**
    *   Once an agent is selected (either automatically by the system or manually by an agent taking an inquiry from the queue via `livechat:takeInquiry`), the `Livechat.assignAgent()` method is called.
    *   **File:** `app/livechat/server/lib/Livechat.js`
    *   This method updates the `room` document in the `Rooms` collection, setting the `servedBy` field to the assigned agent's details.
    *   It also updates the `LivechatInquiry` document, changing its `status` from `'queued'` to `'taken'`.
    *   **File:** `app/models/server/raw/Rooms.js`

3.  **Conversation:**
    *   With an agent assigned, the livechat conversation begins, and messages are exchanged between the visitor and the agent within the designated livechat room.

### 3. Closing a Livechat Conversation

A livechat conversation can be closed in a few ways:

#### A. Agent or Visitor Initiated Closure

1.  **Action Triggered:**
    *   **Agent:** Clicks "End Chat" or "Close Conversation" in the agent panel. This triggers a client-side call to a server method like `livechat:closeLivechat` or `livechat:closeRoom`.
    *   **Visitor:** Clicks "End Chat" in the livechat widget. This also triggers a client-side call to a server method like `livechat:closeLivechat`.
    *   **File:** `app/livechat/server/methods/closeLivechat.js` (or `app/livechat/server/methods/closeRoom.js`)

2.  **Server-Side Processing:**
    *   The server method invokes `Livechat.closeRoom()`.
    *   **File:** `app/livechat/server/lib/Livechat.js`
    *   This method performs the following critical updates:
        *   **Rooms Collection:** The `room` document's `open` field is set to `false`, and `closedAt`, `closedBy`, and `closer` fields are populated with the relevant information (timestamp, user ID, and user type, respectively).
        *   **File:** `app/models/server/raw/Rooms.js`
        *   **LivechatInquiry Collection:** The corresponding `LivechatInquiry` document's `status` is updated to `'closed'`.
        *   **File:** `app/models/server/raw/LivechatInquiry.js`

3.  **Post-Chat Actions:**
    *   After closing the room, `Livechat.closeRoom()` can trigger several post-chat actions based on system settings:
        *   **Analytics:** Saves analytics data related to the chat duration, agent, etc.
            *   **File:** `app/livechat/server/lib/analytics.js`
        *   **Transcript:** Sends the chat transcript to the visitor's email if configured.
            *   **File:** `app/livechat/server/lib/transcript.js`
        *   **Survey:** Presents a post-chat survey to the visitor.
            *   **File:** `app/livechat/server/lib/survey.js`

#### B. Auto-Close Due to Inactivity

1.  **Scheduled Job:**
    *   Rocket.Chat has a background job that periodically checks for inactive livechat rooms if the `Livechat_enable_autoclose_room` setting is enabled and `Livechat_autoclose_room_timeout` is configured.
    *   **File:** `app/livechat/server/lib/autocloseOpenRooms.js`

2.  **Inactivity Check:**
    *   This job queries the `Rooms` collection for livechat rooms that are still `open` and whose `lastMessage.ts` (timestamp of the last message) or `ts` (room creation timestamp if no messages) exceeds the configured inactivity timeout.

3.  **Automatic Closure:**
    *   For each identified inactive room, the job invokes `Livechat.closeRoom()` (similar to agent/visitor initiated closure), but with `closer` set to `'system'`.
    *   This updates the room and inquiry statuses and triggers post-chat actions as described above.

In summary, the process flows from inquiry creation and intelligent routing to agent assignment, and finally to a structured closure that can be initiated by either party or automatically by the system, with robust post-chat functionalities.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,708 |
| Model | gemini-2.5-flash |
| Tools | NONE |
