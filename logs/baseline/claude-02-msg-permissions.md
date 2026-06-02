# Where is the logic for message permission validation located?

## Baseline Answer (no tools)

The core logic for message permission validation in Rocket.Chat is primarily located within the **server-side methods that handle specific message operations**, leveraging a central authorization function.

Here's a breakdown:

1.  **Central Authorization Function:**
    The fundamental function used across the server to check if a user has a specific permission is `RocketChat.authz.hasPermission`. This function determines if the user (identified by ID) has a given permission in a particular scope (e.g., a room or globally).
    *   **Implementation:** `app/authorization/server/functions/hasPermission.ts`

2.  **Server-Side Methods for Message Actions:**
    Each action related to messages (sending, editing, deleting, reacting, etc.) has a dedicated server-side method. These methods are responsible for performing all necessary validations, including permission checks, before executing the action. They call `RocketChat.authz.hasPermission` with the appropriate permission constants.

    You'll find these methods mainly in:
    *   `app/lib/server/methods/`
    *   `ee/app/lib/server/methods/` (for Enterprise Edition specific features)

    Here are specific examples for common message operations:

    *   **Sending Messages:**
        *   `app/lib/server/methods/sendMessage.js`: This method orchestrates the sending of messages. It includes checks for various conditions, such as the user's permission to `sendMessage` in the room, if the room is read-only, if the user is muted, etc. The actual permission check might be encapsulated in functions like `canPostMessage` which further uses `hasPermission`.

    *   **Editing Messages:**
        *   `app/lib/server/methods/editMessage.js`: This method checks if the user has the `edit-message` permission (for their own messages) or `edit-other-message` permission (for others' messages). It also validates if the message is within the configurable editing time limit and if the user is the message owner (for `edit-message`).

    *   **Deleting Messages:**
        *   `app/lib/server/methods/deleteMessage.js`: This method verifies if the user has the `delete-message` permission (for their own messages) or `delete-other-message` permission (for others' messages).

    *   **Reacting to Messages:**
        *   `app/lib/server/methods/setReaction.js`: This method checks for the `set-reaction` permission to allow users to add or remove reactions from messages.

    *   **Pinning/Starring Messages:**
        *   `app/lib/server/methods/pinMessage.js`: Checks for `pin-message` permission.
        *   `app/lib/server/methods/starMessage.js`: Checks for `star-message` permission.

In summary, the specific permissions for message actions are validated within the relevant server-side methods by invoking the `RocketChat.authz.hasPermission` function with the appropriate permission constants and context.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 2,481 |
| Model | gemini-2.5-flash |
| Tools | NONE |
