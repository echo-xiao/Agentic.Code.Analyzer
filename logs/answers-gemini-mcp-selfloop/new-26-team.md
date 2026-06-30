# How does the Team feature work in Rocket.Chat?

## Gemini Answer

The Team feature in Rocket.Chat allows for the creation and management of teams, which act as a layer above individual rooms (channels). A team can contain multiple channels, and users can be members of a team with specific roles. The core logic for managing teams resides within the `TeamService`.

Here's how the Team feature works, exemplified by the team creation process:

**Overall Team Feature:**

The `TeamService` is responsible for handling various team operations such as creating, adding and removing members, listing rooms within a team, and converting existing channels/groups into teams. Team data and member information are persisted using the `Team` and `TeamMember` models.

**Team Creation Flow:**

The creation of a new team primarily occurs through the `TeamService.create` method.

**Call Chain:**

`Entry (User Action/API Call) → TeamService.create → [Internal Logic and Database Operations] → Final`

**Detailed Steps for Team Creation:**

1.  **Validation:**
    *   The system first verifies if the proposed team name is unique and available using `checkUsernameAvailability`.
    *   It also checks if a room with the same name already exists to prevent conflicts.

2.  **User and Member Retrieval:**
    *   The details of the user initiating the team creation are fetched.
    *   For any initial members provided, their user information is retrieved.

3.  **Team Data Preparation:**
    *   A `teamData` object is constructed, including the team's name, type (private or public), creation timestamp, and the user who created it.

4.  **Room Creation (Main Channel):**
    *   A main channel (room) is created for the team. If an existing `roomId` is provided, that room is used; otherwise, a new room is created using `Room.create`. The type of this main room (`p` for private, `c` for public) is derived from the team's type.
    *   The `roomId` is then associated with the `teamData`.

5.  **Team and TeamMember Insertion:**
    *   The `teamData` is inserted into the `Team` collection, and the resulting `teamId` is obtained.
    *   Team members, including the owner, are prepared with their `teamId`, `userId`, roles, creation timestamp, and creator, and then inserted into the `TeamMember` collection. The owner is assigned the `'owner'` role.

6.  **Room and Team Relationship Updates:**
    *   The newly created or specified room is designated as the main room for the team using `Rooms.setTeamMainById`.
    *   The `Team` document is updated to link it with its main `roomId` using `Team.updateMainRoomForTeam`.

7.  **System Message and Notifications:**
    *   If an existing room was converted into a team, a system message (`user-converted-to-team`) is saved.
    *   A notification (`notifyOnRoomChangedById`) is triggered to inform clients about the room change.

8.  **Return:**
    *   The newly created team object, including its ID and data, is returned.

**Key Files Involved:**

*   `apps/meteor/server/services/team/service.ts`: Contains the `TeamService` and its methods, such as `create`.
*   `packages/models/src/models/Team.ts`: Defines the schema and provides methods for interacting with the Team collection in the database.
*   `packages/models/src/models/TeamMember.ts`: Defines the schema and provides methods for interacting with the TeamMember collection.
*   `apps/meteor/app/lib/server/lib/checkUsernameAvailability.ts`: Used for validating team names.
*   `packages/models/src/models/Rooms.ts`: Provides methods for interacting with the Rooms collection, including finding rooms by name and setting a main room for a team.
*   `packages/models/src/models/Users.ts`: Provides methods for interacting with the Users collection, used to fetch user and member details.
*   `apps/meteor/app/lib/server/functions/createRoom.ts`: Contains the `Room.create` function for creating new rooms.
*   `packages/models/src/models/Messages.ts`: Used for saving system messages.
*   `apps/meteor/server/lib/notifyUsersOnRoomChanged.ts`: Handles notifications for room changes.

## Tool Calls (3 calls, 12,007 tokens)

**Step 1:** `search({"query":"Team"})` → 518 tokens
**Step 2:** `graph({"direction":"down","layer":"server","query":"TeamService"})` → 111 tokens
**Step 3:** `implement({"symbolName":"TeamService.create","filename":"apps/meteor/server/services/team/service.ts"})` → 751 tokens
