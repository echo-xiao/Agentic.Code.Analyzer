# How does the Team feature work in Rocket.Chat?

## Gemini Answer

The Rocket.Chat Team feature is a server-side implemented functionality that groups users and rooms, providing a structured collaboration environment.

**Architecture Overview:**

The core of the Team feature resides in the `TeamService` on the server, which handles all business logic and interactions with the database models. Client-side actions trigger DDP (Distributed Data Protocol) calls that are routed to this service.

**Call Chain:**

1.  **Client-side UI Action:** A user interacts with the Rocket.Chat client (e.g., clicks "Create Team," "Add Member").
2.  **`sdk.call('methodName')`:** The client-side application makes a DDP call to the server, targeting a method associated with team operations.
3.  **`packages/core-services/src/index.ts` (Team Service Proxy):** The call is intercepted by the `Team` service proxy, defined as `export const Team = proxify<ITeamService>('team');`. This proxy directs the request to the actual `TeamService` instance.
4.  **`apps/meteor/server/services/team/service.ts` (TeamService Implementation):** The relevant method within the `TeamService` is executed. This is where the primary logic for team management, member handling, and room association resides.
5.  **Database Interaction:** The `TeamService` interacts with several database models (`Team`, `TeamMember`, `Rooms`, `Users`, `Subscriptions`) to perform CRUD (Create, Read, Update, Delete) operations.
6.  **Event Broadcasts:** After successful operations, events are often broadcast (`notifyOnRoomChangedById`, `api.broadcast('user.roleUpdate')`) to update connected clients in real-time.

**Key Functionalities:**

The `TeamService` provides a comprehensive set of functionalities for managing teams:

*   **Team Creation:**
    *   The `create` method allows creating a new team, along with its designated "main room" (which can be a public channel or private group).
    *   It handles checks for name availability and adds initial members with appropriate roles.

*   **Team Information & Management:**
    *   Methods like `update`, `deleteById`, and `deleteByName` handle modifications and removal of teams.
    *   Various retrieval methods (`list`, `listAll`, `findBySubscribedUserIds`, `search`, `getOneById`, etc.) allow fetching team data based on different criteria.

*   **Room Association:**
    *   **Adding Rooms (`addRooms`):** Existing Rocket.Chat rooms can be added to a team. The `teamId` field on the room document is updated to establish the association.
    *   **Removing Rooms (`removeRoom`):** Rooms can be detached from a team.
    *   **Default Rooms (`updateRoom`):** Rooms within a team can be marked as "default," meaning new members joining the team will automatically be added to these rooms.
    *   **Listing Rooms (`listRooms`, `listRoomsOfUser`):** Provides ways to list rooms belonging to a team, considering user permissions and filters.

*   **Member Management:**
    *   **Adding Members (`addMembers`, `addMember`):** Users can be added to teams, and this process also enrolls them in the team's main room and any default rooms. Roles can be assigned during this process.
    *   **Updating Members (`updateMember`):** Member roles within a team can be changed.
    *   **Removing Members (`removeMember`, `removeMembers`, `removeAllMembersFromTeam`):** Users can be removed from teams, with checks in place to prevent accidental removal of the last team owner.
    *   **Listing Members (`members`):** Retrieves details of members within a team, including their roles.

*   **Role Management:**
    *   Methods like `addRolesToMember` and `removeRolesFromMember` manage roles at the team level (stored in the `TeamMember` collection).
    *   `addRolesToSubscription` manages roles specifically for a user's subscription to a room, especially relevant for the team's main room.

*   **Statistics & Autocomplete:**
    *   `getStatistics` provides aggregate data about teams.
    *   `autocomplete` assists users in finding teams by name, taking into account user access.

**Data Storage:**

The Team feature leverages several MongoDB collections:

*   **`Team` collection:** Stores core team information (e.g., `_id`, `name`, `type`, the `roomId` of its main room).
*   **`TeamMember` collection:** Defines the relationship between users and teams, including the `userId`, `teamId`, and assigned `roles`.
*   **`Rooms` collection:** Each room document can have a `teamId` field linking it to its parent team and a `teamDefault` boolean to indicate if it's a default room.
*   **`Subscriptions` collection:** Stores user subscriptions to rooms, which also reflects team-related roles for the main room.
*   **`Users` collection:** Stores general user information.

**Permissions:**

The `Authorization` service is deeply integrated to enforce permissions. For example, `Authorization.canAccessRoom` and `Authorization.hasPermission` are used to control who can view, add, or remove rooms and manage members within a team.

**File Paths:**

*   `apps/meteor/server/services/team/service.ts`: The primary implementation of the `TeamService`.
*   `packages/core-services/src/index.ts`: Defines the `Team` service proxy.
*   `packages/models/src/models/Team.ts`: Defines the `Team` database model.
*   `packages/models/src/models/TeamMember.ts`: Defines the `TeamMember` database model.
*   `packages/models/src/models/Rooms.ts`: Defines the `Rooms` database model, including `teamId` and `teamDefault` fields.

## Tool Calls (4 calls, 35,541 tokens)

**Step 1:** `search({"query":"Team"})` → 419 tokens
**Step 2:** `implement({"filename":"packages/core-services/src/index.ts","symbolName":"Team"})` → 29 tokens
**Step 3:** `search({"query":"TeamService"})` → 54 tokens
**Step 4:** `implement({"symbolName":"TeamService","filename":"apps/meteor/server/services/team/service.ts"})` → 7756 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 4/6 |
| Symbols hit | 2/2 |
| Tool calls | 4 |
| Total tokens | 35,541 |
