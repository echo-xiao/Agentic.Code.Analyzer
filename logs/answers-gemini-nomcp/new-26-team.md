# How does the Team feature work in Rocket.Chat?

## Baseline Answer (no tools)

The Team feature in Rocket.Chat provides a way to group related channels, discussions, and users, fostering better organization and collaboration within a larger Rocket.Chat workspace. It allows for a more structured approach to managing communication, especially in larger organizations or projects.

Here's a breakdown of how it works:

### 1. Core Concepts

*   **Grouping Channels:** The primary purpose of a team is to group multiple channels (public, private, discussions) under a single umbrella. This makes it easier for users to discover and navigate related conversations.
*   **Team Membership:** Users can be members of one or more teams. A user's membership in a team often dictates their access to the team's private channels.
*   **Team Roles:** Within a team, users can have specific roles (e.g., owner, member) which grant them different levels of permission to manage the team, its members, and its channels.
*   **Team Type:** Teams can be public or private.
    *   **Public Teams:** Discoverable by all users, and anyone can join. Channels within a public team can still be private.
    *   **Private Teams:** Only discoverable and joinable by invitation.
*   **Main Channel:** Each team has a default "main channel" that's created alongside the team, often serving as a general discussion point for all team members.

### 2. Data Models and Collections

The Team feature relies on several key MongoDB collections:

*   **`teams` Collection:**
    *   Stores information about each team.
    *   **File:** `app/models/server/models/Teams.js`
    *   **Schema (simplified):**
        ```typescript
        interface ITeam {
          _id: string;
          name: string; // Display name of the team
          slug: string; // URL-friendly identifier
          type: TeamType; // 'public' | 'private'
          teamMain: boolean; // Indicates if this team is the main team (legacy concept, less used now)
          // Other fields like createdAt, _updatedAt, userId (creator), etc.
        }
        ```
*   **`team_members` Collection:**
    *   Links users to teams and defines their roles within that team.
    *   **File:** `app/models/server/models/TeamMembers.js`
    *   **Schema (simplified):**
        ```typescript
        interface ITeamMember {
          _id: string;
          teamId: string; // ID of the team
          userId: string; // ID of the user
          roles: string[]; // e.g., ['owner', 'member']
          // Other fields like createdAt, _updatedAt, createdBy, etc.
        }
        ```
*   **`rooms` Collection:**
    *   Channels, private groups, and discussions are stored here.
    *   A crucial addition for the Team feature is the `teamId` field.
    *   **File:** `app/models/server/models/Rooms.js`
    *   **Schema (simplified, relevant part):**
        ```typescript
        interface IRoom {
          _id: string;
          name: string;
          t: RoomType; // 'c' (channel), 'p' (private group), 'd' (direct), 'l' (livechat)
          teamId?: string; // THIS IS THE LINK TO THE TEAM
          // Other fields like usersCount, owner, etc.
        }
        ```
    *   If a room has a `teamId`, it belongs to that team. If `teamId` is `undefined`, it's a standalone room.

### 3. Server-Side Logic and APIs

Most of the team management logic resides on the server:

*   **Methods for Team Management:**
    *   **Creating a Team:** `app/lib/server/functions/createTeam.js` and `app/teams/server/methods/createTeam.js` handle the creation of the `team` entry, the default main channel, and adding the creator as an owner.
    *   **Updating a Team:** Methods in `app/teams/server/methods/` (e.g., `updateTeam`).
    *   **Deleting a Team:** Methods for removing the team, its members, and handling its associated rooms (e.g., converting them to standalone rooms or archiving them). See `app/lib/server/functions/deleteTeam.js`.
*   **Membership Management:**
    *   `app/lib/server/functions/addUserToTeam.js`: Adds a user to a team and manages their roles.
    *   `app/lib/server/functions/removeUserFromTeam.js`: Removes a user from a team.
*   **Room-Team Association:**
    *   `app/lib/server/functions/addRoomToTeam.js`: Assigns a `teamId` to an existing room or creates a new room within a team.
    *   `app/lib/server/functions/removeRoomFromTeam.js`: Removes a room from a team (sets `teamId` to `undefined`).
*   **Publications:**
    *   `app/teams/server/publications/teams.js`: Publishes the teams a user is a member of.
    *   `app/teams/server/publications/teamMembers.js`: Publishes members of a specific team.
    *   `app/teams/server/publications/teamRooms.js`: Publishes rooms associated with a specific team.
    *   `app/teams/server/publications/teamChannelMembers.js`: Publishes members of a team channel.
*   **Permissions:** Team-specific permissions are handled via `app/authorization/lib/permissions.js` definitions and checked by server-side functions (e.g., `app/authorization/server/functions/canAccessRoom.js` or `canAccessTeam.js` which verifies if a user has access to a private team and its rooms).

### 4. Client-Side Implementation (UI)

The client-side integrates with the server methods and publications to provide the user interface for managing and interacting with teams:

*   **Side Navigation:** The left sidebar (`client/views/sideNav/SideNav/TeamSection.tsx`) displays the teams a user is part of, often collapsing them to save space.
*   **Team View:** When a user navigates to a team (e.g., `/team/my-team-slug`), a dedicated view (`client/views/teams/TeamView/TeamView.tsx`) shows the team's main channel, list of channels, members, and settings.
*   **Modals:**
    *   `client/views/teams/CreateTeamModal/`: For creating new teams.
    *   `client/views/teams/AddExistingModal/`: For adding existing channels or users to a team.
*   **Contextual Bar:** When viewing a channel that belongs to a team, the contextual bar might show related team channels (`client/views/room/contextualBar/TeamChannels/`).
*   **Room Creation/Editing:** The room creation and editing modals (`client/views/modals/CreateChannelModal/`) include options to associate a new or existing channel with a team.
*   **Routing:** The client-side router (e.g., `client/router.js` and `client/startup/router.ts`) defines routes for team views (e.g., `/team/:teamId/:roomName?`).

### 5. Workflow Example: Creating a Team

1.  **User Action:** A user clicks "Create New" -> "Team" in the UI.
2.  **Client-side:** The `CreateTeamModal` is displayed. User enters team name, slug, and chooses public/private.
3.  **Method Call:** The client calls the `createTeam` server method.
    *   **File:** `app/teams/server/methods/createTeam.js`
4.  **Server-side:**
    *   A new entry is created in the `teams` collection (`app/models/server/models/Teams.js`).
    *   A new channel (the "main" team channel) is created in the `rooms` collection, with its `teamId` set to the newly created team's ID.
    *   The user who created the team is added to the `team_members` collection as an `owner` of that team.
    *   The user is also added as a member of the team's main channel.
5.  **Client-side Update:** The client-side subscriptions (`app/teams/server/publications/teams.js`) detect the new team, and the UI updates to show the new team in the sidebar. The user is redirected to the new team's main channel.

In essence, the Team feature leverages the existing room and user models by introducing the `teamId` relationship and dedicated `teams` and `team_members` collections, providing a structured layer for organizing Rocket.Chat communication.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 3,424 |
| Model | gemini-2.5-flash |
| Tools | NONE |
