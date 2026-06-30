# Where is the logic for message permission validation located?

## Baseline Answer (no tools)

The core logic for message permission validation in Rocket.Chat is centralized in the authorization system and then applied within the specific server-side methods that handle message operations.

Here's a breakdown:

1.  **Core Permission Checking Function:**
    The central function responsible for checking if a user has a specific permission is located at:
    *   `app/authorization/server/functions/hasPermission.js`

    This function takes a permission string (e.g., `'sendMessage'`, `'edit-message'`), a user ID, and often a room ID (`rid`) as context to determine if the user has the required access.

2.  **Integration into Message-Related Methods:**
    This `hasPermission` function is then invoked within the various server-side methods that perform message actions. Each method will call `hasPermission` with the relevant permission string before proceeding with the action.

    Here are some key examples:

    *   **Sending Messages:**
        *   **File:** `app/lib/server/methods/sendMessage.js`
        *   **Logic:** Inside the `sendMessage` method, you'll find checks using `hasPermission('sendMessage', ...)` to ensure the user can send messages in the given room.

    *   **Editing Messages:**
        *   **File:** `app/lib/server/methods/updateMessage.js`
        *   **Logic:** This method checks for permissions like `edit-message-own` (to edit one's own messages) or `edit-message-any` (to edit any message). It also considers the time limit for editing messages defined in settings.

    *   **Deleting Messages:**
        *   **File:** `app/lib/server/methods/deleteMessage.js`
        *   **Logic:** Similar to editing, this method checks for `delete-message-own` or `delete-message-any` permissions, and also considers the time limit for deleting messages.

    *   **Reacting to Messages:**
        *   **File:** `app/lib/server/methods/setReaction.js`
        *   **Logic:** This method typically checks for the `react-to-message` permission.

    *   **Other Message Actions (Pinning, Starring, etc.):**
        Each specific action (like pinning a message, starring a message, converting a message to a discussion) will have its corresponding server-side method that includes a `hasPermission` check with a specific permission string (e.g., `pin-message`, `star-message`, `create-discussion`).

**In summary:** The permission validation logic resides within the specific server-side Meteor methods that handle each message-related operation, and these methods rely on the core `hasPermission` function to evaluate user permissions based on their assigned roles and the context of the room or message.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 1,604 |
| Model | gemini-2.5-flash |
| Tools | NONE |
