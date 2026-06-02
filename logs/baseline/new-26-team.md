# How does the Team feature work in Rocket.Chat?

## Baseline Answer (no tools)

The Team feature in Rocket.Chat is a powerful organizational tool that allows users to group related channels (rooms) and manage access to them more efficiently. Instead of individually inviting users to multiple channels, you can invite them to a team, and they automatically gain access to the channels within that team.

Here's a breakdown of how it works from an architectural and implementation perspective:

## Core Concepts

1.  **Organizational Container:** A Team acts as a container for channels. It's not a chat room itself, but it has a dedicated "Team Discussion" channel.
2.  **Membership Management:** Users are members of a team. Team membership dictates access to channels associated with that team.
3.  **Channel Association:** Channels (public or private) can be associated with a team. When a channel is added to a team, its `teamId` field is populated.
4.  **Implicit Access:** When a user joins a team, they automatically gain access (get subscribed) to all public channels within that team. For private channels, they would still need to be explicitly added to the channel (though adding them to the team might streamline this process depending on settings and workflows).

## Data Model (MongoDB Collections)

The Team feature primarily relies on a few key MongoDB collections:

1.  **`rocketchat_team`**:
    *   This is the main collection for storing Team entities.
    *   **`_id`**: Unique ID of the team.
    *   **`name`**: Display name of the team.
    *   **`type`**: `0` for private, `1` for public (similar to room types).
    *   **`teamLead`**: The `_id` of the user who is the primary owner/creator of the team.
    *   **`roomId`**: The `_id` of the dedicated "Team Discussion" channel associated with this team (more on this below).
    *   **`t`**: Set to `team` to distinguish it from regular rooms.
    *   `createdAt`, `updatedAt`, etc.

    *Relevant file:* `app/teams/server/lib/definition/IRocketChatTeam.ts` (interface definition)

2.  **`rocketchat_room`**:
    *   Existing channels (rooms) are linked to teams via the `teamId` field.
    *   **`teamId`**: If a channel belongs to a team, this field will contain the `_id` of the `rocketchat_team` document.
    *   **`_id`**: For the special "Team Discussion" channel, its `_id` is referenced in the `rocketchat_team.roomId` field. It's a regular `c` (channel) or `p` (private channel) room type, but its association is strong.

    *Relevant file:* `app/definitions/IRoom.ts` (interface definition)

3.  **`rocketchat_team_members`**:
    *   This collection explicitly defines which users are members of which teams and their roles within the team.
    *   **`_id`**: Unique ID for the membership entry.
    *   **`teamId`**: The `_id` of the team.
    *   **`userId`**: The `_id` of the user.
    *   **`roles`**: An array of roles the user has *within this team* (e.g., `["owner", "moderator", "member"]`).
    *   `createdAt`, `updatedAt`, etc.

    *Relevant file:* `app/teams/server/lib/definition/IRocketChatTeamMember.ts` (interface definition)

4.  **`rocketchat_subscription`**:
    *   This collection tracks a user's subscription to individual channels.
    *   When a user joins a team, the backend logic automatically creates/updates subscriptions for them to the channels associated with that team. Conversely, when a user leaves a team, their subscriptions to that team's channels are removed.

    *Relevant file:* `app/definitions/ISubscription.ts` (interface definition)

## Backend Implementation Details

### API Endpoints

The core logic is exposed via dedicated API endpoints under `/api/v1/teams.*`.

*   **`teams.create`**: Creates a new team. This involves:
    *   Creating an entry in `rocketchat_team`.
    *   Creating a new `rocketchat_room` for the default "Team Discussion" channel and linking it to the team via `teamId` and updating `rocketchat_team.roomId`.
    *   Adding the creator as a member in `rocketchat_team_members` with the 'owner' role.
    *   Subscribing the creator to the "Team Discussion" channel.
*   **`teams.addMembers` / `teams.removeMembers`**: Manages team members.
    *   Updates `rocketchat_team_members`.
    *   Crucially, it then iterates through all channels associated with the `teamId` and automatically subscribes/unsubscribes the user from those channels (especially public ones).
*   **`teams.addRoom` / `teams.removeRoom`**: Associates/disassociates a channel with a team.
    *   Updates the `teamId` field in the `rocketchat_room` document.
    *   If a channel is added to a team, existing team members are automatically subscribed to that channel (if it's public). If removed, subscriptions are removed.
*   **`teams.info` / `teams.list` / `teams.listRooms` / `teams.listMembers`**: Retrieval endpoints for team data, members, and channels.

*Relevant files:*
*   `app/api/server/v1/teams/teams.js` (API definitions)
*   `app/teams/server/lib/Team.ts` (main service logic for managing teams)

### Services & Managers

The actual business logic for interacting with the database and managing subscriptions resides in server-side services.

*   **`TeamService`**: This is a central service that encapsulates the methods for creating, updating, deleting teams, adding/removing members, and managing channels within teams. It orchestrates the changes across `rocketchat_team`, `rocketchat_room`, `rocketchat_team_members`, and `rocketchat_subscription`.
    *   For example, when `addMembers` is called, it won't just insert into `rocketchat_team_members` but also call functions that loop through `rocketchat_room` to find team channels and then modify `rocketchat_subscription` accordingly.

*Relevant files:*
*   `app/teams/server/lib/Team.ts` (where the core logic resides)
*   `app/teams/server/functions/addUserToDefaultTeamRoom.ts` (example of a helper function)
*   `app/teams/server/functions/removeUserFromAllTeamRooms.ts` (example of a helper function)

### Permissions

Standard Rocket.Chat permission system applies, with specific permissions for teams:

*   `create-team`: Allows users to create new teams.
*   `edit-team`: Allows editing team details.
*   `view-all-teams`: Allows viewing all teams in the system.
*   `add-team-member`: Allows adding members to a team.
*   `remove-team-member`: Allows removing members from a team.
*   `add-team-channel`: Allows adding channels to a team.
*   `remove-team-channel`: Allows removing channels from a team.

*Relevant file:* `app/authorization/server/startup.js` (where default permissions are defined)

## Frontend Interaction (UI/UX)

1.  **Sidebar:** Teams typically appear in the left-hand sidebar, often as collapsible sections. Clicking on a team usually expands to show its associated channels and the default "Team Discussion" channel.
    *   The client queries the `teams.list` and `teams.listRooms` APIs to populate this view.
2.  **Team View:** When you select a team from the sidebar, the main content area might show a "Team Home" or directly open the "Team Discussion" channel. There are also dedicated tabs/sections for managing team members, channels, and team settings.
3.  **Team Creation/Management Modals:** Users can initiate team creation from the sidebar or a dedicated menu. Modals guide them through naming the team, setting its type (public/private), and inviting initial members/channels.
4.  **Channel Creation/Editing:** When creating a new channel or editing an existing one, there's an option to associate it with an existing team.

*Relevant files (examples, as these vary based on UI framework):*
*   `client/components/sidebar/Sidebar.tsx` (for displaying teams)
*   `client/views/teams/TeamInfo/TeamInfo.tsx` (for team management UI)
*   `client/views/teams/AddExistingModal/index.tsx` (for adding existing channels to a team)
*   `client/views/teams/TeamMembers/index.tsx` (for managing team members)

## Key Workflows

*   **Create Team:** User initiates creation -> Backend creates `rocketchat_team` and the default "Team Discussion" `rocketchat_room` -> Creator is added to `rocketchat_team_members` as owner and subscribed to the discussion room.
*   **Add Member to Team:** User invites -> Backend adds entry to `rocketchat_team_members` -> Backend iterates through `rocketchat_room` documents with `teamId` and creates `rocketchat_subscription` entries for the new member to all public team channels.
*   **Add Channel to Team:** User associates existing channel -> Backend updates `rocketchat_room.teamId` -> Backend iterates through `rocketchat_team_members` and creates `rocketchat_subscription` entries for all existing team members to the newly added channel.
*   **Leave Team:** User leaves -> Backend removes entry from `rocketchat_team_members` -> Backend iterates through `rocketchat_room` documents with `teamId` and removes `rocketchat_subscription` entries for the user from those channels.

By abstracting channel access behind team membership, Rocket.Chat simplifies large-scale collaboration and channel management, making it much easier to onboard new users into relevant sets of discussions.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,342 |
| Model | gemini-2.5-flash |
| Tools | NONE |
