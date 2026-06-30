# How does the Team feature work in Rocket.Chat?

## Gemini Answer

The Team feature in Rocket.Chat is managed by the `TeamService`, which handles operations such as creating, updating, adding members, and listing rooms associated with a team. Teams act as a layer above rooms, allowing a single team to contain multiple channels.

Here's the detailed call chain and an explanation of how the team creation process works:

**Call Chain:**

1.  **Entry Point:** `search("Team")`
    *   Identifies `TeamService` as a key component for team management, located in `apps/meteor/server/services/team/service.ts`.
    *   Notes that `Team` and `TeamMember` models are found in `packages/models/src/index.ts` and `packages/models/src/models/TeamMember.ts`.

2.  **Service Overview:** `graph("TeamService", "down", layer="server")`
    *   Confirms `TeamService` as the central service, extending `ServiceClassInternal`, but no direct callees are immediately found in the graph index, indicating that its methods likely interact with models and other internal utilities.

3.  **Service Implementation:** `implement("TeamService", "apps/meteor/server/services/team/service.ts")`
    *   Provides the class definition of `TeamService`, listing methods like `create`, `update`, `addMembers`, `removeMembers`, `listRooms`, etc.

4.  **Creation Process Details:** `implement("TeamService.create", "apps/meteor/server/services/team/service.ts")`
    *   Reveals the step-by-step logic for creating a new team.

**How the Team Feature Works (Team Creation Flow):**

The `TeamService.create` method (located in `apps/meteor/server/services/team/service.ts`) orchestrates the following:

1.  **Name Validation:**
    *   It first checks if the proposed `team.name` is available using `checkUsernameAvailability` (likely in `apps/meteor/app/lib/server/functions/checkUsernameAvailability.ts`).
    *   It also verifies that no existing room has the same name by querying `Rooms.findOneByName` (inferred from `apps/meteor/app/models/server/raw/Rooms.ts`).

2.  **User and Member Preparation:**
    *   The `createdBy` user (the one initiating the team creation) is retrieved using `Users.findOneById` (inferred from `apps/meteor/app/models/server/raw/Users.ts`).
    *   Any provided `members` are resolved to their user IDs and usernames using `Users.findActiveByIdsOrUsernames`.

3.  **Main Room Creation:**
    *   A new main room is created for the team. This room's type ('c' for channel or 'p' for private group) is determined by the `team.type`.
    *   The initial `members` are added to this room during its creation via `Room.create` (inferred from `apps/meteor/app/lib/server/lib/Room.ts`).

4.  **Team Data Persistence:**
    *   The team's core information (e.g., name, creation date, creator, type) is inserted into the `Team` collection using `Team.insertOne` (inferred from `packages/models/src/models/Team.ts`).

5.  **Team Member Persistence:**
    *   The members, including the team owner, are added to the `TeamMember` collection using `TeamMember.insertMany` (inferred from `packages/models/src/models/TeamMember.ts`). The owner is assigned the 'owner' role.

6.  **Linking Room and Team:**
    *   The created main room is linked to the team using `Rooms.setTeamMainById` (inferred from `apps/meteor/app/models/server/raw/Rooms.ts`).
    *   The team's record is updated to store the `roomId` of its main room using `Team.updateMainRoomForTeam` (inferred from `packages/models/src/models/Team.ts`).

7.  **System Message and Notification:**
    *   If an existing room was converted to a team, a system message (`user-converted-to-team`) is saved via `Message.saveSystemMessage` (inferred from `apps/meteor/app/lib/server/functions/Message.ts`).
    *   A notification is sent about the room change using `notifyOnRoomChangedById` (inferred from `apps/meteor/app/lib/server/functions/notifyRoomChanged.ts`).

In summary, the Team feature centralizes team management in the `TeamService`, which interacts with `Team` and `TeamMember` models to store data, and integrates with room management functionalities to create and link a main room to each team, along with handling member assignments and system notifications.

## Tool Calls (4 calls, 18,896 tokens)

**Step 1:** `search({"query":"Team"})` → 518 tokens
**Step 2:** `graph({"query":"TeamService","direction":"down","layer":"server"})` → 111 tokens
**Step 3:** `implement({"symbolName":"TeamService","filename":"apps/meteor/server/services/team/service.ts"})` → 1664 tokens
**Step 4:** `implement({"filename":"apps/meteor/server/services/team/service.ts","symbolName":"TeamService.create"})` → 751 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 2/2 |
| Tool calls | 4 |
| Total tokens | 18,896 |
| Pass | YES |
