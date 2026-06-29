# How does the Omnichannel queue process and close a livechat conversation?

## Baseline Answer (no tools)

The Omnichannel system in Rocket.Chat handles the lifecycle of a livechat conversation, from its initiation by a visitor to its assignment to an agent, and finally its closure. Let's break down how this process works.

## 1. Omnichannel Queue Processing and Agent Assignment

The core of processing a livechat conversation involves creating a room, routing it, and assigning an available agent.

### 1.1. Conversation Initiation

1.  **Visitor Starts Chat:** A visitor interacts with the livechat widget on a website.
2.  **`startLivechat` Method Call:** The client-side widget calls the server-side method `livechat:startLivechat` (or similar, depending on the SDK/API used).
    *   **File:** `app/livechat/server/methods/startLivechat.js`
3.  **Visitor and Room Creation:**
    *   A `livechat_visitors` entry is created or updated for the visitor.
    *   A new `rooms` collection entry is created with `t: 'l'` (type livechat), `open: true`, and associated with the `visitorId`.
    *   **File:** `app/livechat/server/lib/Livechat.js` contains the core logic for creating rooms and visitors.

### 1.2. Department Routing (Optional)

1.  **Department Assignment:** If the livechat widget is configured for a specific department, or if the routing algorithm dictates, the `departmentId` is set on the `LivechatRoom` object.
    *   **File:** Configuration is primarily in the admin UI, but the logic for setting it is in `Livechat.js` during room creation.

### 1.3. Queueing Logic

1.  **Agent Availability Check:** Rocket.Chat checks for available agents based on their status (`status: 'available'`), department (if assigned), and current chat capacity.
2.  **`Livechat.getNextAgent`:** This is the central function responsible for finding an agent.
    *   **File:** `app/livechat/server/lib/Livechat.js`
    *   It takes into account:
        *   **Agent Status:** Only 'available' agents are considered.
        *   **Department:** If the room has a `departmentId`, only agents in that department are considered.
        *   **Capacity:** Each agent has a configured `livechat:maxNumberSimultaneousChat` (or similar enterprise setting). The system checks if the agent is below this limit.
        *   **Routing Algorithms:**
            *   **`none` (Manual):** Requires an agent to pick up the chat.
            *   **`Round Robin`:** Distributes chats sequentially among available agents.
            *   **`Least Amount of Ongoing Chats`:** Assigns to the agent with the fewest active chats.
            *   **`Longest Idle`:** Assigns to the agent who has been idle the longest (enterprise feature).
            *   **`Custom`:** Via Apps-Engine (enterprise feature).
    *   **File:** `app/livechat/server/lib/QueueManager.js` often contains helper functions and the logic for the different routing algorithms that `getNextAgent` will leverage.
3.  **Queue State:** If no agent is immediately available, the room might enter a "queued" state. The `LivechatRoom` will remain `open: true`, but `servedBy` will be null. The system will periodically re-evaluate the queue.

### 1.4. Agent Assignment

1.  **`Livechat.assignAgent`:** Once an agent is found by `getNextAgent`, this function assigns the room to them.
    *   **File:** `app/livechat/server/lib/Livechat.js`
    *   It updates the `LivechatRoom` document:
        *   Sets `servedBy: { _id: agentId, username: agentUsername }`.
        *   Increments the agent's active chat count.
    *   **Notifications:** The assigned agent receives a real-time notification (e.g., via `Stream-LivechatRoom`).

## 2. Closing a Livechat Conversation

A livechat conversation can be closed by an agent, automatically due to inactivity, or via an API call.

### 2.1. Triggers for Closure

1.  **Agent Initiated:** The most common way. An agent clicks an "End Chat" button in the Rocket.Chat UI.
2.  **Auto-Closure (Timeout):** If there's no activity (messages from visitor or agent) for a configured period, the system can automatically close the chat.
3.  **API/Programmatic:** An external system or Rocket.Chat App could programmatically close a room.

### 2.2. Core Mechanism: `Livechat.closeRoom`

Regardless of the trigger, the core operation is handled by the `Livechat.closeRoom` function.

1.  **Server Method Call:**
    *   **Agent Initiated:** The client UI calls `livechat:closeRoom`.
        *   **File:** `app/livechat/server/methods/closeRoom.js`
    *   **Auto-Closure:** A cron job or a periodic check triggers the call.
        *   **File:** `app/livechat/server/lib/Helper.js` contains functions like `closeOpenChats` which would call `Livechat.closeRoom`. A cron job (often managed by `SyncedCron` in older versions or a similar scheduling mechanism) in `app/livechat/server/startup/cron.js` might trigger this.

2.  **`Livechat.closeRoom` Logic:**
    *   **File:** `app/livechat/server/lib/Livechat.js`
    *   **Room Update:** The `LivechatRoom` document is updated:
        *   `open: false`
        *   `closedAt: <timestamp>`
        *   `closedBy: { _id: userId, username: username }` (the agent who closed it, or a system user for auto-closure).
        *   `status: 'closed'`
    *   **Agent Capacity:** The agent's active chat count is decremented. If enterprise features like "wrap-up time" are enabled, the agent might enter a temporary unavailable state.
        *   **File:** `app/livechat/server/lib/QueueManager.js`
    *   **Transcript (Optional):** If configured, a chat transcript can be sent to the visitor or a designated email address.
        *   **File:** `app/livechat/server/lib/transcript.js`
    *   **Survey (Optional):** If a satisfaction survey is configured, it might be triggered for the visitor.
        *   **File:** `app/livechat/server/lib/LivechatEnterprise.js` (for CSAT functions).
    *   **Hooks:** Various server hooks (e.g., `livechat.roomClosed`) are triggered, allowing Rocket.Chat Apps or custom integrations to react to the chat closure.
    *   **Real-time Updates:** The visitor's widget and the agent's UI are updated in real-time to reflect the chat's closure.

### 2.3. Visitor Experience

After closure, the visitor's livechat widget typically updates to show "Chat Ended," allow them to rate the conversation, or start a new one.

In summary, Rocket.Chat's Omnichannel system leverages a combination of server-side methods, core library functions (`Livechat.js`, `QueueManager.js`), and database updates to manage the complex lifecycle of livechat conversations efficiently.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,538 |
| Model | gemini-2.5-flash |
| Tools | NONE |
