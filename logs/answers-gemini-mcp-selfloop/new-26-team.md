# How does the Team feature work in Rocket.Chat?

## Gemini Answer

The Team feature in Rocket.Chat provides a layer above individual rooms, allowing users to organize multiple channels into a single team. This facilitates better collaboration and management of related discussions.

Here's how it works:

**1. Core Server-Side Logic: `TeamService`**
The central component for managing teams on the server is the `TeamService`. This service extends `ServiceClassInternal` and encapsulates all business logic related to teams.

*   **File:** `apps/meteor/server/services/team/service.ts`
*   **Role:** Provides methods for creating, updating, deleting teams, adding/removing members, managing rooms within teams, listing teams, and handling team-related permissions.

**2. Data Models**
Team data is persisted using dedicated models:

*   `Team` model: Stores information about the team itself.
    *   **File:** `packages/models/src/models/Team.ts`
*   `TeamMember` model: Stores information about members belonging to a team.
    *   **File:** `packages/models/src/models/TeamMember.ts`

**3. API Endpoints**
The `TeamService` functionality is exposed through a REST API, allowing client applications and integrations to interact with the team feature.

*   **File:** `apps/meteor/app/api/server/v1/teams.ts`
*   **Role:** Defines various API endpoints (e.g., `/api/v1/teams.create`, `/api/v1/teams.addMembers`) that receive requests, perform permission checks, and then delegate the actual operations to the `TeamService`.

**4. Client-Side Interaction**
On the client-side, users interact with the Team feature through various UI components.

*   **Example UI Component:** `TeamsTab`
    *   **File:** `apps/meteor/client/views/directory/tabs/teams/TeamsTab.tsx`
    *   **Role:** Displays a list of teams and provides an interface for team management.

**Call Chain Example (Creating a Team via API):**

1.  **Client Request:** A client (e.g., web UI, mobile app) sends a request to create a new team.
2.  **REST API Endpoint:** The request is received by the `teams` API endpoint.
    *   **File:** `apps/meteor/app/api/server/v1/teams.ts`
3.  **Permission Check:** The API endpoint performs necessary permission checks using functions like `hasAtLeastOnePermissionAsync` or `hasPermissionAsync`.
    *   **File:** `apps/meteor/app/lib/server/functions/hasPermission.ts`
4.  **Service Call:** If permissions are granted, the API endpoint calls the appropriate method on the `TeamService` (e.g., `TeamService.create`).
    *   **File:** `apps/meteor/server/services/team/service.ts`
5.  **Database Interaction:** The `TeamService` method then interacts with the `Team` and `TeamMember` models to persist the new team and its members in the database.
    *   **Files:** `packages/models/src/models/Team.ts`, `packages/models/src/models/TeamMember.ts`
6.  **Response:** The `TeamService` returns the result to the API endpoint, which then sends a response back to the client.

In summary, the Team feature is implemented with a clear separation of concerns: client-side UI for user interaction, REST API for external access, and a dedicated `TeamService` on the server to handle all core business logic and interact with the `Team` and `TeamMember` data models.

## Tool Calls (8 calls, 58,289 tokens)

**Step 1:** `search({"query":"Team"})` → 733 tokens
**Step 2:** `graph({"direction":"down","query":"TeamService","layer":"server"})` → 111 tokens
**Step 3:** `graph({"file":"apps/meteor/app/api/server/v1/teams.ts","query":"teams","direction":"down","layer":"server")` → 1885 tokens
**Step 4:** `implement({"filename":"apps/meteor/app/api/server/v1/teams.ts","symbolName":"teams"})` → 72 tokens
**Step 5:** `search({"layer":"server","query":"TeamService.create"})` → 16 tokens
**Step 6:** `implement({"filename":"apps/meteor/server/services/team/service.ts","symbolName":"TeamService"})` → 1664 tokens
**Step 7:** `search({"layer":"server","query":"TeamService.create"})` → 16 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/api/server/v1/teams.ts","symbolName":"teams"})` → 72 tokens

## Files Seen In Tool Results (30)

- `packages/models/src/index.ts`
- `packages/core-services/src/index.ts`
- `apps/meteor/client/views/directory/tabs/teams/TeamsTab.tsx`
- `apps/meteor/server/methods/browseChannels.ts`
- `packages/core-typings/src/ITeam.ts`
- `apps/meteor/client/views/teams/contextualBar/info/TeamsInfo.tsx`
- `apps/meteor/app/api/server/v1/teams.ts`
- `packages/rest-typings/src/v1/teams/index.ts`
- `packages/models/src/models/Team.ts`
- `apps/meteor/server/lib/spotlight.js`
- `apps/meteor/tests/e2e/page-objects/home-team.ts`
- `apps/meteor/app/api/server/lib/eraseTeam.ts`
- `apps/meteor/client/views/directory/tabs/teams/TeamsTable/TeamsTable.tsx`
- `packages/rest-typings/src/v1/users/UsersListTeamsParamsGET.ts`
- `packages/rest-typings/src/v1/teams/TeamsUpdateProps.ts`
- `packages/rest-typings/src/v1/teams/TeamsUpdateMemberProps.ts`
- `packages/rest-typings/src/v1/teams/TeamsRemoveRoomProps.ts`
- `packages/rest-typings/src/v1/teams/TeamsRemoveMemberProps.ts`
- `packages/rest-typings/src/v1/teams/TeamsListChildren.ts`
- `packages/rest-typings/src/v1/teams/TeamsLeaveProps.ts`
- `packages/rest-typings/src/v1/teams/TeamsDeleteProps.ts`
- `packages/rest-typings/src/v1/teams/TeamsConvertToChannelProps.ts`
- `packages/rest-typings/src/v1/teams/TeamsAddMembersProps.ts`
- `packages/rest-typings/src/v1/teams/ITeamMemberParams.ts`
- `packages/rest-typings/src/v1/groups/GroupsConvertToTeamProps.ts`
- `packages/rest-typings/src/v1/channels/ChannelsConvertToTeamProps.ts`
- `packages/models/src/models/TeamMember.ts`
- `packages/model-typings/src/models/ITeamModel.ts`
- `apps/meteor/server/services/team/service.ts`
- `apps/meteor/tests/end-to-end/api/teams.ts`
