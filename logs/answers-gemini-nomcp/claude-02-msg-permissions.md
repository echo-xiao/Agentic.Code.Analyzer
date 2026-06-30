# Where is the logic for message permission validation located?

## Baseline Answer (no tools)

The core logic for message permission validation in Rocket.Chat is distributed across several key areas, primarily on the server-side:

1.  **Invocation Points (Meteor Methods):**
    When a user attempts to perform a message-related action (send, edit, delete, react, etc.), the corresponding Meteor method on the server is invoked. These methods are the first place where permission checks are initiated.

    *   **Sending Messages:**
        *   `server/methods/sendMessage.js`
        *   Inside this method, you'll find calls to `RocketChat.authz.hasPermission(userId, 'sendMessage', rid)` to check if the user can send messages in the given room (`rid`).
    *   **Editing Messages:**
        *   `server/methods/editMessage.js`
        *   This method checks permissions like `'edit-message'` or `'edit-other-message'` depending on whether the user is editing their own message or someone else's, and also considers the `Message_AllowEditing` and `Message_AllowEditing_BlockDuration` settings.
    *   **Deleting Messages:**
        *   `server/methods/deleteMessage.js`
        *   Checks for `'delete-message'` or `'delete-other-message'` permissions, along with `Message_AllowDeleting` and `Message_AllowDeleting_BlockDuration` settings.
    *   **Reacting to Messages:**
        *   `server/methods/setReaction.js`
        *   Checks for `'react-to-message'` permission.
    *   **Pinning/Unpinning Messages:**
        *   `server/methods/pinMessage.js`
        *   Checks for `'pin-message'` permission.
    *   **Starring/Unstarring Messages:**
        *   `server/methods/starMessage.js`
        *   Checks for `'star-message'` permission.

2.  **Core Permission Checking Function:**
    The actual logic for determining if a user has a specific permission resides in a central authorization function.

    *   **`app/authorization/server/functions/hasPermission.js`**: This is the primary server-side function that takes a `userId`, a `permission` name (e.g., `'sendMessage'`, `'edit-message'`), and an optional `scope` (like a `roomId`). It queries the `rocketchat_permissions` and `rocketchat_roles` collections to determine if the user's assigned roles grant them the requested permission within the given scope.

3.  **Permission Definitions:**
    The available permissions themselves are defined in a configuration file.

    *   **`app/authorization/lib/permissions.js`**: This file lists all the default permissions available in Rocket.Chat, including those related to messages (e.g., `'sendMessage'`, `'edit-message'`, `'delete-message'`, `'react-to-message'`, `'pin-message'`, `'star-message'`). These permissions are then assigned to various roles (e.g., `admin`, `moderator`, `user`, `guest`).

In summary, when a message action occurs, a Meteor method calls `RocketChat.authz.hasPermission` with the specific message-related permission, and that function then performs the lookup against the user's roles and the defined permissions.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 1,886 |
| Model | gemini-2.5-flash |
| Tools | NONE |
