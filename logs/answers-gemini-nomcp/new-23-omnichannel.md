# How does the Omnichannel queue process and close a livechat conversation?

## Baseline Answer (no tools)

The Omnichannel queue processing and closing of a livechat conversation in Rocket.Chat involves several key components and steps, primarily managed by the `app/livechat/server/lib/Livechat.js` and `app/livechat/server/lib/QueueManager.js` modules.

Here's a breakdown of how a livechat conversation is processed through the queue and subsequently closed:

---

### 1. Omnichannel Queue Processing

When a visitor initiates a livechat, Rocket.Chat goes through a series of steps to either assign an agent immediately or place the conversation in a queue.

1.  **Visitor Initiates Chat:**
    *   A visitor opens the livechat widget and sends their first message.
    *   On the server, the `Livechat.newRoom` method in `app/livechat/server/lib/Livechat.js` is invoked. This method is responsible for creating the initial chat room.

2.  **Room Creation and Initial Status:**
    *   A new `LivechatRoom` document is created in the `rocketchat_livechat_room` collection.
    *   Its `status` is typically set to `open` or `queued`, and the `servedBy` field is initially `null`.
    *   The visitor's information is also recorded or updated in the `rocketchat_livechat_visitor` collection.

3.  **Department Routing (Optional):**
    *   If departments are configured and the visitor selected one (or was routed automatically), the system first identifies the target department. This helps in finding agents specialized in that area.

4.  **Queue Manager (`app/livechat/server/lib/QueueManager.js`):**
    *   The core logic for assigning agents and managing the queue resides in `app/livechat/server/lib/QueueManager.js`.
    *   `Livechat.newRoom` internally calls methods within `QueueManager` (e.g., `QueueManager.requestRoom` or `QueueManager.assignAgent`) to find an available agent.

    *   **Auto-Assignment:**
        *   If the `Livechat_auto_assign_agent` setting is enabled, the system attempts to find an available agent immediately.
        *   It considers factors like:
            *   **Agent Status:** Only `online` or `busy` agents are considered.
            *   **Max Simultaneous Chats:** Agents are only assigned if they haven't reached their `livechat.maxNumberSimultaneousChats` limit.
            *   **Department:** Agents must be assigned to the relevant department.
            *   **Priority:** Agents can have a priority, influencing assignment order.
            *   **Round Robin / Least Busy:** Rocket.Chat uses algorithms (like round-robin or finding the least busy agent) to distribute chats fairly.
        *   If an agent is found, the `servedBy` field of the `LivechatRoom` is updated with the agent's ID and username. The agent receives a notification, and the chat is now "live."

    *   **Queueing:**
        *   If no agent is immediately available (either because auto-assignment is off, all agents are busy, or no agents are online), the room is placed in the queue.
        *   The `LivechatRoom`'s `status` might remain `open` but with `servedBy: null`, indicating it's waiting.
        *   Visitors in the queue might see a message indicating their position or an estimated wait time.
        *   Agents can manually "Take" chats from the queue using the agent dashboard. This action updates the `servedBy` field and assigns the chat to that agent.
        *   The `Livechat_queue_inactivity_timeout` setting (managed by `app/livechat/server/lib/AutoClose.js`) can automatically close rooms that remain in the queue for too long without an agent.

---

### 2. Closing a Livechat Conversation

The process of closing a livechat conversation involves updating the room status, notifying participants, and triggering various post-chat actions. The central method for closing is `Livechat.closeRoom` in `app/livechat/server/lib/Livechat.js`.

1.  **Initiation of Closure:**
    *   **Agent Closes:** An agent clicks the "End Chat" button in the chat interface. This typically invokes a client-side method that calls `Meteor.call('livechat:closeRoom', roomId, { ... })` on the server.
    *   **Visitor Closes:** A visitor closes the chat widget or explicitly ends the conversation. This also triggers a call to `Meteor.call('livechat:closeRoom', roomId, { ... })`.
    *   **Inactivity Timeout:**
        *   The `app/livechat/server/lib/AutoClose.js` module is responsible for automatically closing inactive chats.
        *   It periodically checks `LivechatRooms` for rooms that have exceeded the configured `Livechat_close_room_timeout` (for agent inactivity) or `Livechat_visitor_inactivity_timeout` (for visitor inactivity) settings.
        *   When a timeout is detected, `Livechat.autoCloseRoom` is called, which in turn calls `Livechat.closeRoom`.
    *   **API Call:** An external system or integration can close a chat via the Rocket.Chat Livechat API (e.g., `POST /api/v1/livechat/room/:rid/close`). This endpoint also calls `Livechat.closeRoom`.
    *   **Transfer (Implicit Closure):** In some transfer scenarios, the original room might be closed (depending on configuration and transfer type) and a new room created or the existing room reassigned.

2.  **`Livechat.closeRoom` Execution (`app/livechat/server/lib/Livechat.js`):**
    *   **Validation:** The method first validates if the room exists and if the user attempting to close it has the necessary permissions (e.g., the assigned agent, the visitor of the room, or an administrator).
    *   **Update Room Status:** The `status` field of the `LivechatRoom` document in the `rocketchat_livechat_room` collection is updated to `closed`.
    *   **Add Closing Message:** A system message (e.g., "Chat ended by agent," "Chat ended by visitor," or "Chat ended due to inactivity") is inserted into the `rocketchat_livechat_message` collection for that room.
    *   **Update Agent Status:** If an agent was serving the room, their `livechat.open` count (number of open chats) is decremented. This makes them available for new chats if their count drops below their maximum.
    *   **Post-Chat Survey (Optional):** If the `Livechat_enable_post_chat_form` setting is enabled, the system might trigger the post-chat survey process, making it available to the visitor.
    *   **Transcript (Optional):** If `Livechat_enable_transcript` is enabled, the system prepares and sends the chat transcript to the visitor's email address (if provided).
    *   **Hooks and Events:**
        *   Crucially, the `livechat:roomClosed` hook is triggered. This is a powerful mechanism that allows other modules, custom integrations, or external systems to react to the chat closure.
        *   Examples of modules that might listen to this hook include:
            *   Analytics modules to record chat duration, agent performance, and other metrics.
            *   CRM integrations to update contact records or create new leads based on the conversation.
            *   Custom integrations for data warehousing or external reporting.
    *   **Visitor Status:** The visitor's `v.status` might be updated (e.g., from `online` to `offline` if they have no other open chats).
    *   **Remove from Queue (if applicable):** If the room was in a queue, it's effectively removed from active consideration for assignment.

By following these steps, Rocket.Chat ensures that livechat conversations are efficiently routed to agents and properly concluded, with all relevant data updated and post-chat actions triggered.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,222 |
| Model | gemini-2.5-flash |
| Tools | NONE |
