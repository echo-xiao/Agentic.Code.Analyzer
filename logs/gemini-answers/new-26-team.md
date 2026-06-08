# How does the Team feature work in Rocket.Chat?

## Gemini Answer

The Team feature in Rocket.Chat is primarily managed by the `TeamService` on the server side, which orchestrates the creation, management, and interaction of teams with rooms and members.

Here's how the Team creation process works:

**Call Chain: `Client/API Request` → `TeamService.create` → `checkUsernameAvailability` & `Rooms.findOneByName` → `Users.findOneById` → `Users.findActiveByIdsOrUsernames` → `Room.create` → `Team.insertOne` → `TeamMember.insertMany` → `Rooms.setTeamMainById` & `Team.updateMainRoomForTeam` → `Message.saveSystemMessage` → `notifyOnRoomChangedById`**

1.  **Request Initiation**: A client-side action or an API request initiates the team creation process, which eventually calls the `create` method of the `TeamService`.

2.  **`TeamService.create` (`apps/meteor/server/services/team/service.ts`)**: This method acts as the central entry point for creating a new team.
    *   **Validation**: It first performs several validation checks:
        *   It verifies the availability of the proposed team name using `checkUsernameAvailability` (likely located in `apps/meteor/app/lib/server/functions/checkUsernameAvailability.ts`).
        *   It checks for existing rooms with the same name using `Rooms.findOneByName` (from `packages/models/src/models/Rooms.ts`).
    *   **User and Member Data Retrieval**:
        *   It retrieves the details of the user creating the team (`createdBy`) using `Users.findOneById` (from `packages/models/src/models/Users.ts`).
        *   It fetches active user details for all specified members using `Users.findActiveByIdsOrUsernames` (from `packages/models/src/models/Users.ts`).
    *   **Main Room Creation**:
        *   If no existing room ID is provided, it creates a new room to serve as the team's main channel by calling `Room.create` (likely in `apps/meteor/server/lib/Room.ts`). The room type is set based on the team's privacy (private 'p' or public 'c'), and the members are associated with this room.
    *   **Team Data Insertion**:
        *   The new team's information is then inserted into the `Team` model using `Team.insertOne` (from `packages/models/src/models/Team.ts`).
    *   **Team Member Data Insertion**:
        *   It prepares a list of team members, including the owner/creator, and inserts them into the `TeamMember` model using `TeamMember.insertMany` (from `packages/models/src/models/TeamMember.ts`).
    *   **Main Room Association**:
        *   The newly created or existing room is marked as the main room for the team using `Rooms.setTeamMainById` (from `packages/models/src/models/Rooms.ts`).
        *   The `Team` model is updated to link the team with its main room ID using `Team.updateMainRoomForTeam` (from `packages/models/src/models/Team.ts`).
    *   **System Messages and Notifications**:
        *   If an existing room was converted into a team, a system message (`user-converted-to-team`) is saved using `Message.saveSystemMessage` (from `packages/models/src/models/Message.ts`).
        *   Finally, clients are notified about the room change using `notifyOnRoomChangedById` (likely from `apps/meteor/app/lib/server/functions/notifyOnRoomChangedById.ts`).

In summary, the `TeamService` acts as the orchestrator, interacting with various models (`Team`, `TeamMember`, `Rooms`, `Users`, `Message`) and helper functions to ensure the proper creation, validation, and linkage of teams, rooms, and members within the Rocket.Chat system.

## Tool Calls (4 calls, 18,479 tokens)

**Step 1:** `search({"query":"Team"})` → 518 tokens
**Step 2:** `graph({"layer":"server","direction":"down","query":"TeamService"})` → 111 tokens
**Step 3:** `implement({"symbolName":"TeamService","filename":"apps/meteor/server/services/team/service.ts"})` → 1664 tokens
**Step 4:** `implement({"symbolName":"TeamService.create","filename":"apps/meteor/server/services/team/service.ts"})` → 751 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/6 |
| Symbols hit | 2/2 |
| Tool calls | 4 |
| Total tokens | 18,479 |
| Pass | NO |
