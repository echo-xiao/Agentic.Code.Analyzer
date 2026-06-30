# How does the Team feature work in Rocket.Chat?

## Baseline Answer (no tools)

The Team feature in Rocket.Chat provides a powerful way to organize users and channels into logical groups, simplifying access management and improving collaboration for specific projects, departments, or communities within a larger workspace.

Here's a breakdown of how it works, from architecture to user experience:

## Core Concepts

1.  **Team as a Container:** A Team acts as a container for both users (members) and channels (rooms).
2.  **Team Members:** Users can be members of one or more teams. Within a team, members can have different roles (e.g., Owner, Moderator, Member), which dictate their permissions within that specific team context.
3.  **Team Channels:** Channels (public, private, discussions) can be associated with a team. When a user joins a team, they automatically gain access to all its associated channels, especially those marked as "default."
4.  **Team Types:** Teams can be `public` (anyone can find and join) or `private` (only invited users or those approved by an owner/moderator can join).
5.  **Simplified Onboarding:** New team members automatically join the team's default channels, reducing manual channel joining.

## Architectural Components

### 1. Database Schema

The Team feature introduces several new collections and modifies existing ones to manage team-related data.

*   **`rocketchat_teams` (Collection: `Teams`)**: Stores the core information about each team.
    *   `_id`: Unique team ID.
    *   `name`: Team name.
    *   `type`: `0` for private, `1` for public.
    *   `description`: Team description.
    *   `ownerId`: The ID of the user who created the team.
    *   `createdAt`, `updatedAt`.
    *   `slug`: A URL-friendly identifier for the team.
    *   `roomCount`: Number of channels associated with the team.
    *   `memberCount`: Number of members in the team.
    *   `defaultRoom`: The ID of the default channel for the team (deprecated in favor of `rocketchat_team_channels.isDefault`).

    *File:* `app/models/server/raw/Teams.ts`

*   **`rocketchat_team_members` (Collection: `TeamMembers`)**: Links users to teams and defines their roles.
    *   `_id`: Unique member ID.
    *   `teamId`: The ID of the team.
    *   `userId`: The ID of the user.
    *   `roles`: An array of roles the user has within the team (e.g., `['owner']`, `['moderator']`, `['member']`).
    *   `joinedAt`: Timestamp when the user joined the team.

    *File:* `app/models/server/raw/TeamMembers.ts`

*   **`rocketchat_team_channels` (Collection: `TeamChannels`)**: Links channels to teams and indicates if they are default.
    *   `_id`: Unique channel-team link ID.
    *   `teamId`: The ID of the team.
    *   `roomId`: The ID of the channel.
    *   `isDefault`: Boolean, `true` if this channel is a default channel for new team members.

    *File:* `app/models/server/raw/TeamChannels.ts`

*   **`rocketchat_rooms` (Collection: `Rooms`)**: The existing room collection is updated to include a `teamId` field.
    *   `teamId`: The ID of the team this channel belongs to (if any). A channel can belong to *at most one* team.

    *File:* `app/models/server/raw/Rooms.ts`

### 2. Backend Logic (Services, Methods, Publications)

The backend handles all the business logic, API endpoints, and data synchronization.

*   **`TeamService`**: This is the central service responsible for all team-related operations. It encapsulates the logic for creating, updating, deleting teams, managing members, and managing channels.
    *   *File:* `app/teams/server/lib/Team.ts` (This file defines the `Team` class which acts as the service).
    *   It exposes methods like `create`, `update`, `remove`, `addMember`, `removeMember`, `updateMember`, `addRoom`, `removeRoom`, `updateRoom`.

*   **Meteor Methods**: Many client-side actions trigger Meteor methods on the server, which then call the `TeamService`.
    *   Examples:
        *   `teams.create`: Creates a new team.
        *   `teams.update`: Updates team details.
        *   `teams.remove`: Deletes a team.
        *   `teams.addMember`: Adds a user to a team.
        *   `teams.removeMember`: Removes a user from a team.
        *   `teams.addRoom`: Adds a channel to a team.
        *   `teams.removeRoom`: Removes a channel from a team.
        *   `teams.toggleDefaultRoom`: Toggles a channel's default status within a team.
        *   `teams.list`: Lists teams the current user is a member of.
        *   `teams.listAll`: Lists all teams (admin only).
        *   `teams.listMembers`: Lists members of a specific team.
        *   `teams.listRooms`: Lists channels of a specific team.

    *File:* `app/teams/server/methods/` (various files for different method groups, e.g., `createTeam.ts`, `addMember.ts`).

*   **Publications**: For real-time updates, the server publishes team-related data to subscribed clients using DDP.
    *   `teams`: Publishes teams the user is a member of.
    *   `teamMembers`: Publishes members of a specific team.
    *   `teamRooms`: Publishes channels of a specific team.

    *File:* `app/teams/server/publications/` (e.g., `teams.ts`, `teamMembers.ts`, `teamRooms.ts`).

*   **Permissions**: All team operations are guarded by permission checks using `hasPermission` (e.g., `create-team`, `edit-team`, `view-team-members`, `add-team-member`). These checks are performed within the Meteor methods and `TeamService`.

*   **Hooks/Listeners**: When a user joins a team, the `TeamService` ensures they are automatically added to all default channels associated with that team. This often involves calling existing functions like `addUserToRoom` from `app/lib/server/functions/addUserToRoom.ts`. Similarly, when a user leaves a team, they might be removed from its channels.

### 3. Frontend (UI)

The client-side provides the user interface for interacting with teams.

*   **Routes**:
    *   `/teams`: Lists all teams the user is a member of or can join.
    *   `/team/:teamId`: Displays the details of a specific team (members, channels, settings).
    *   `/team/:teamId/members`: Tab for managing team members.
    *   `/team/:teamId/channels`: Tab for managing team channels.
    *   `/team/:teamId/info`: Tab for team general information and settings.

    *File:* `app/teams/client/routes.ts`

*   **React Components**:
    *   **Team List**: Displays a list of teams, with options to create, join, or view.
        *   *File:* `app/teams/client/views/Teams/TeamsPage.tsx`
    *   **Team Info/Details**: Displays team name, description, type, and provides tabs for members and channels.
        *   *File:* `app/teams/client/views/Teams/TeamInfo/TeamInfo.tsx`
    *   **Team Members List**: Shows all members of a team, with options to add/remove members and change roles.
        *   *File:* `app/teams/client/views/Teams/TeamMembers/TeamMembers.tsx`
    *   **Team Channels List**: Shows all channels associated with a team, with options to add/remove channels and mark as default.
        *   *File:* `app/teams/client/views/Teams/TeamChannels/TeamChannels.tsx`
    *   **Modals**: For creating new teams, adding members, adding channels, etc.
        *   *File:* `app/teams/client/views/Teams/CreateTeam/CreateTeamModal.tsx`
        *   *File:* `app/teams/client/views/Teams/AddExistingModal/AddExistingModal.tsx` (for adding existing users/channels)

*   **State Management**: The frontend uses React's state management (often with context or Redux-like patterns) to manage the data fetched from DDP subscriptions and API calls.

## Key Workflows

1.  **Creating a Team**:
    *   A user with `create-team` permission navigates to the "Teams" section.
    *   Clicks "Create New Team," fills in name, description, and chooses public/private.
    *   The client calls `Meteor.call('teams.create', { name, type, description })`.
    *   The server's `TeamService.create` method creates entries in `rocketchat_teams` and `rocketchat_team_members` (for the creator as owner).

2.  **Adding Members to a Team**:
    *   A team owner/moderator navigates to the team's "Members" tab.
    *   Searches for existing users or invites new ones.
    *   The client calls `Meteor.call('teams.addMember', { teamId, userId, roles })`.
    *   The server's `TeamService.addMember` adds an entry to `rocketchat_team_members`.
    *   Crucially, it then iterates through `rocketchat_team_channels` for that `teamId` and for each `isDefault: true` channel, it calls `addUserToRoom` to automatically add the new member to those channels.

3.  **Adding Channels to a Team**:
    *   A team owner/moderator navigates to the team's "Channels" tab.
    *   Selects existing channels or creates new ones.
    *   The client calls `Meteor.call('teams.addRoom', { teamId, roomId, isDefault })`.
    *   The server's `TeamService.addRoom` adds an entry to `rocketchat_team_channels` and updates the `teamId` field on the `rocketchat_rooms` collection for that channel.
    *   If `isDefault` is true, all *existing* team members are also added to this new default channel.

4.  **Joining/Leaving a Team**:
    *   **Public Team**: A user can find a public team and click "Join." This triggers `Meteor.call('teams.addMember', { teamId, userId: currentUserId, roles: ['member'] })`.
    *   **Private Team**: A user must be invited by an owner/moderator, or request to join (if enabled) and be approved.
    *   **Leaving**: A user can click "Leave Team." This triggers `Meteor.call('teams.removeMember', { teamId, userId: currentUserId })`. The server removes the `rocketchat_team_members` entry and removes the user from all channels associated with that team.

In essence, the Team feature centralizes the management of groups of users and their associated communication spaces, making Rocket.Chat more scalable and organized for larger deployments.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 4,288 |
| Model | gemini-2.5-flash |
| Tools | NONE |
