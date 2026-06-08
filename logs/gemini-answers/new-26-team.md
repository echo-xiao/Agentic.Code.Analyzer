# How does the Team feature work in Rocket.Chat?

## Gemini Answer

The Team feature in Rocket.Chat allows users to group multiple channels (rooms) together, providing a hierarchical structure for organizing conversations and members. The core logic for managing teams resides in the `TeamService`, which handles operations like creating, updating, and deleting teams, as well as managing members and associated rooms.

Here's a breakdown of how the Team feature works, focusing on the team creation process as an example:

**Architecture:**

1.  **`TeamService`** (apps/meteor/server/services/team/service.ts): This is the central service that extends `ServiceClassInternal` and exposes methods for all team-related operations (e.g., `create`, `addMembers`, `removeMembers`, `listRooms`).
2.  **`Team` Model** (packages/models/src/models/Team.ts - inferred from `Team.insertOne`): Stores information about the team itself.
3.  **`TeamMember` Model** (packages/models/src/models/TeamMember.ts): Stores the relationship between users and teams, including roles within the team.
4.  **`Rooms` Model** (inferred from `Rooms.findOneByName`, `Room.create`, `Rooms.setTeamMainById`): Manages the channels/rooms associated with a team.
5.  **`Users` Model** (inferred from `Users.findOneById`, `Users.findActiveByIdsOrUsernames`): Manages user information.
6.  **`Message` Model** (inferred from `Message.saveSystemMessage`): Used for saving system messages related to team operations.

**Call Chain for Team Creation:**

1.  **Entry Point:** `TeamService.create` (apps/meteor/server/services/team/service.ts)
    *   **File:** `apps/meteor/server/services/team/service.ts`
    *   **Role:** Initiates the team creation process.
    *   **Logic:**
        *   **Validation:** Checks if the requested team name is available using `checkUsernameAvailability(team.name)` and `Rooms.findOneByName(team.name)`.
        *   **User Retrieval:** Fetches the creator's (`uid`) username using `Users.findOneById`.
        *   **Member Processing:** If `members` are provided, it retrieves their user IDs and usernames using `Users.findActiveByIdsOrUsernames`.
        *   **Main Room Creation:**
            *   If no existing `room.id` is provided, a new room is created using `Room.create`.
            *   The room's type (`p` for private, `c` for public) is determined by the `team.type`.
            *   The `members` are added to this initial room.
        *   **Team Data Insertion:** The team's metadata (name, creation date, created by user) is inserted into the `Team` model using `Team.insertOne`.
        *   **Team Member Insertion:**
            *   A list of `ITeamMember` objects is constructed, including the team owner/creator and any additional members.
            *   These team members are then inserted into the `TeamMember` model using `TeamMember.insertMany`.
        *   **Linking Room and Team:**
            *   The newly created room (or the existing one if converting) is marked as the main room for the team using `Rooms.setTeamMainById`.
            *   The `roomId` is updated in the `Team` record using `Team.updateMainRoomForTeam`.
        *   **System Message (optional):** If an existing room was converted into a team, a system message (`user-converted-to-team`) is saved using `Message.saveSystemMessage`.
        *   **Notification:** A `notifyOnRoomChangedById` event is triggered for the new room.
        *   The newly created `ITeam` object is returned.

In summary, the Team feature leverages the `TeamService` as its primary interface, interacting with several underlying data models (`Team`, `TeamMember`, `Rooms`, `Users`, `Message`) to manage the creation, membership, and organization of channels within a team.

## Tool Calls (6 calls, 23,890 tokens)

**Step 1:** `search({"query":"Team"})` → 518 tokens
**Step 2:** `graph({"query":"TeamService","direction":"down"})` → 111 tokens
**Step 3:** `search({"query":"TeamMember","layer":"packages"})` → 126 tokens
**Step 4:** `graph({"direction":"up","query":"TeamMember"})` → 42 tokens
**Step 5:** `implement({"symbolName":"TeamService","filename":"apps/meteor/server/services/team/service.ts"})` → 1664 tokens
**Step 6:** `implement({"symbolName":"TeamService.create","filename":"apps/meteor/server/services/team/service.ts"})` → 751 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 2/2 |
| Tool calls | 6 |
| Total tokens | 23,890 |
| Pass | NO |
