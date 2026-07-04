# How does the Team feature work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The Team feature in Rocket.Chat enables users to organize communication by grouping multiple channels into a single entity. This facilitates structured collaboration and management of related conversations.

The core of the Team feature is managed by the `TeamService`, primarily implemented in the file `apps/meteor/server/services/team/service.ts`.

Here's a breakdown of how the Team feature works:

**1. Core Component:**
*   **`TeamService`** (`apps/meteor/server/services/team/service.ts`): This is the central service responsible for all team-related operations, including creation, updates, member management, and room associations.

**2. Key Operations:**

*   **Team Creation:**
    *   The `create` method within `TeamService` handles the creation of a new team. When a team is created, a "Main Room" (either a public channel or a private group) is also generated and associated with the team. This method validates the team name and sets up initial members and roles.

*   **Team Management:**
    *   **Updating:** The `update` method allows modifications to a team's name and type, which also updates the associated main room.
    *   **Deletion:** Teams can be deleted using methods like `deleteById` or `deleteByName`, which also removes all associated chat content and configuration.
    *   **Adding/Removing Rooms:** Channels can be added to a team using `addRooms`, which updates the `teamId` property on the `Room` document. Conversely, `removeRoom` detaches a channel from a team.
    *   **Conversion:** A team can be converted back into a standard channel by unsetting the `teamId` on its associated rooms, handled by `unsetTeamIdOfRooms`.

*   **Member Management:**
    *   **Adding Members:** The `addMembers` and `addMember` methods are used to add users to a team. This process involves adding the user to the team's main room and assigning roles if specified.
    *   **Removing Members:** `removeMember` and `removeMembers` facilitate the removal of users from a team.
    *   **Updating Members:** `updateMember` allows for changes to a team member's information.
    *   **Listing Members:** The `members` method retrieves a list of users belonging to a specific team.

**3. Permissions:**
*   Permissions play a vital role in controlling access to team functionalities. For instance, specific permissions like `create-p` (for private teams) and `create-c` (for public teams) are required to create a team. Similarly, `move-room-to-team` is necessary to move a room into a team. These permissions are checked within the `TeamService` methods.

**4. LDAP Integration (Enterprise Edition):**
*   In the Enterprise Edition, teams can be synchronized with LDAP groups. The `syncUserTeams` method in `LDAPManager` handles this synchronization, automatically adding or removing users from teams based on their LDAP group memberships.

**Example Flow for Team Creation:**
1.  A user initiates the team creation process (e.g., through the Rocket.Chat UI).
2.  A call is made to the `TeamService.create()` method in `apps/meteor/server/services/team/service.ts`.
3.  The `create` method validates the provided team details, checks the user's permissions (e.g., `create-c` or `create-p`), creates a new team record in the database, and generates a corresponding main room (channel or private group) for the team.
4.  Initial members and owners are associated with the newly created team and its main room.

## Tool Calls (3 calls, 10,917 tokens)

**Step 1:** `wiki({"question":"How does the Team feature work in Rocket.Chat?"})` → 1024 tokens
**Step 2:** `search({"query":"TeamService","layer":"server"})` → 93 tokens
**Step 3:** `details({"symbolName":"TeamService","filename":"service.ts"})` → 1670 tokens

## Files Seen In Tool Results (2)

- `apps/meteor/server/services/team/service.ts`
- `packages/core-services/src/types/ITeamService.ts`
