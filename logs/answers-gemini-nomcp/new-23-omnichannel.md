# How does the Omnichannel queue process and close a livechat conversation?

## Baseline Answer (no tools)

Rocket.Chat's Omnichannel livechat processing involves several steps for queueing, assigning, and eventually closing a conversation. Let's break down each part.

## 1. Omnichannel Queue Processing and Agent Assignment

When a new livechat conversation is initiated by a visitor, it first enters a "queued" state if immediate assignment isn't possible or if the routing method dictates it. The core logic for this resides within the `app/livechat/server/lib/` directory, particularly `QueueManager.ts` and `Livechat.ts`.

### A. Initial Conversation Setup & Queuing

1.  **Visitor Initiates Chat:** A visitor accesses the livechat widget and starts a conversation.
    *   **File:** The client-side logic for initiating a chat typically interacts with server methods like `livechat:getInitialData` and `livechat:startLivechatRoom`.
    *   **Core Function:** `Livechat.newRoom` in `app/livechat/server/lib/Livechat.ts` is called to create the new room.
2.  **Room Creation:** A new `rocketchat_room` document is created in the database with `t: 'l'` (type livechat) and an initial `status: 'open'`. It will also store visitor details (`v`).
3.  **Department Association:** If the visitor chose a department, or if there's a default department, the room is associated with it. This is crucial for routing.

### B. Agent Routing and Assignment

The system then attempts to assign an agent based on the configured **Routing Method** for the associated department (or the global setting). The `QueueManager.ts` orchestrates this process.

*   **File:** `app/livechat/server/lib/QueueManager.ts` contains the core logic for finding and assigning agents.
*   **Core Function:** `QueueManager.requestLivechatFromVisitor` is often the entry point, which then calls `QueueManager.attemptRoomService` or similar functions based on the routing method.

Here are the main routing methods:

1.  **Auto Assign (Auto):**
    *   **Description:** The system automatically assigns the chat to the first available agent. It prioritizes agents within the department, then checks global availability.
    *   **Process:**
        *   The system searches for an agent with `status: 'available'` and `livechat: { open: true }` who is not at their capacity limit.
        *   If multiple agents are available, it might assign based on who has been idle longest or has the least concurrent chats, depending on exact implementation details within the `findFreeAgent` or `findAvailableAgentsForDepartment` functions.
    *   **Files:**
        *   `app/livechat/server/lib/QueueManager.ts`: Implements `LivechatEnterprise.get</li>` or `QueueManager.get</code> to retrieve the routing algorithm.
        *   `app/livechat/server/lib/Agent.ts`: Manages agent status and capacity.
        *   `app/livechat/server/lib/Livechat.ts`: Contains `Livechat.assignAgent` which actually updates the room.

2.  **Round Robin by Most Agents (RRM):**
    *   **Description:** Distributes chats evenly among all available agents in a department. It aims to ensure each agent gets an equal share of new chats.
    *   **Process:**
        *   It keeps track of the last assigned agent.
        *   When a new chat arrives, it finds the next available agent in the sequence.
        *   It considers agent availability, capacity, and department association.
    *   **Files:**
        *   `app/livechat/server/lib/QueueManager.ts`: Contains specific logic for round-robin assignment, likely within functions like `findAgentRoundRobin`.

3.  **Least Amount of Open Chats (LMC):**
    *   **Description:** Assigns the new chat to the available agent with the fewest currently active livechat conversations.
    *   **Process:**
        *   The system queries for available agents within the department.
        *   It then counts the number of `open` livechat rooms each agent is `servedBy`.
        *   The chat is assigned to the agent with the lowest count, respecting capacity limits.
    *   **Files:**
        *   `app/livechat/server/lib/QueueManager.ts`: Likely uses `findAgentLeastOpenChats` or similar logic.

4.  **Manual Assignment:**
    *   **Description:** Chats are placed in a queue, and an agent (usually a manager or a specific agent) must manually pick up or assign the chat.
    *   **Process:**
        *   The room's `status` remains `open` but `servedBy` is `null`.
        *   Agents see these queued chats in their dashboard.
        *   An agent or manager uses a client-side action (e.g., "Take Chat" or "Forward to Agent") which calls a server method like `livechat:takeInquiry` or `livechat:transfer`.
    *   **Files:**
        *   `app/livechat/server/methods/takeInquiry.ts`
        *   `app/livechat/server/methods/transferLivechatChat.ts`
        *   `app/livechat/server/lib/Livechat.ts`: `Livechat.assignAgent` is used internally.

5.  **External Routing:**
    *   **Description:** The responsibility for routing is delegated to an external service or API. Rocket.Chat sends the chat details to the external service, which then tells Rocket.Chat which agent to assign.
    *   **Process:**
        *   A webhook or API call is triggered when a new chat needs assignment.
        *   The external service responds with an agent ID.
        *   Rocket.Chat then uses `Livechat.assignAgent` to assign the room.
    *   **Files:**
        *   `app/livechat/server/lib/LivechatEnterprise.ts`: May contain specific hooks or integration points for external routing systems.

### C. Post-Assignment

Once an agent is assigned:
*   The `rocketchat_room` document's `servedBy` field is populated with the agent's details (`servedBy.username`, `servedBy.id`).
*   The `status` might remain `open` or could be updated to reflect that it's now actively being served.
*   The agent receives a notification (browser, desktop app, mobile app) about the new chat.
*   The chat appears in the agent's active conversations list.

## 2. Closing a Livechat Conversation

Closing a livechat conversation signifies its completion and archives it for historical purposes.

*   **Core Function:** `Livechat.closeRoom` in `app/livechat/server/lib/Livechat.ts` is the central server-side function for this operation.
*   **Core Method:** `livechat:closeRoom` is the Meteor method typically called from the client.

### A. Triggers for Closing a Conversation

1.  **Agent Closes Chat:** The most common scenario. The agent clicks a "End Chat" or "Close Conversation" button in the Livechat UI.
    *   **Files:** Client-side components like `app/livechat/client/tabs/contextualBar/LivechatRoom.tsx` or `app/livechat/client/views/Livechat.tsx` would trigger the `livechat:closeRoom` Meteor method.
2.  **Visitor Ends Chat:** The visitor clicks an "End Chat" button in the livechat widget.
    *   **Files:** The livechat widget's client-side code (`packages/rocketchat-livechat/client/lib/external/livechat.js`) would call the appropriate server method.
3.  **Auto-close (Inactivity):** If the visitor (or agent, depending on settings) remains inactive for a configured period, the system can automatically close the chat.
    *   **File:** `app/livechat/server/lib/AutoClose.ts` handles this. It schedules a job or uses timeouts (`Meteor.setTimeout`) to periodically check for inactive rooms and call `Livechat.closeRoom`.
4.  **System Action / API:** In some cases, an admin or an external system might close a chat via the API or a direct method call.

### B. Closing Process (via `Livechat.closeRoom`)

When `Livechat.closeRoom` is invoked, the following actions typically occur:

1.  **Room Status Update:**
    *   The `rocketchat_room` document's `status` field is changed from `open` to `closed`.
    *   The `closedAt` field is set to the current timestamp.
    *   The `closer` field is populated with the details of who closed the chat (agent, visitor, or system).
    *   `lastMessage` and `v.lastMovementAt` (visitor's last movement) are also updated.
2.  **Agent Unassignment:**
    *   The `servedBy` field in the `rocketchat_room` document is cleared or marked as no longer serving this room.
    *   The agent's capacity count for active chats is decremented, making them available for new assignments.
3.  **Post-Chat Survey (if enabled):** If a post-chat survey is configured for the department, the system will trigger it, often by sending a message with a link to the survey to the visitor.
    *   **File:** `app/livechat/server/lib/Livechat.ts` (within `closeRoom`) or associated helper functions.
4.  **Transcript Generation (if enabled):** The system can generate and send a chat transcript to the visitor's email.
    *   **File:** `app/livechat/server/lib/Livechat.ts` (within `closeRoom` it might call `Livechat.sendTranscript`).
5.  **Room Hooks and Events:**
    *   Various server-side hooks (e.g., `Livechat.onRoomClosed`) are triggered, allowing custom integrations or modules to react to the chat closure.
    *   This is important for analytics, CRM integrations, or custom post-chat processes.
6.  **Cleanup:** Any pending timeouts or scheduled tasks related to that specific room (like inactivity checks) are cleared.

After closure, the room is no longer active in agents' queues and becomes part of the chat history, accessible via the Omnichannel -> Past Conversations dashboard.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,218 |
| Model | gemini-2.5-flash |
| Tools | NONE |
