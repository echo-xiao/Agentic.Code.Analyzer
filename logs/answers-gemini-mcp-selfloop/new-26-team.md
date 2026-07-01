# How does the Team feature work in Rocket.Chat?

## Gemini Answer

The Team feature in Rocket.Chat allows users to organize multiple channels into a single entity. This provides a layer of organization above individual rooms.

Here's how it works:

**1. Core Service:**
*   The central logic for managing teams resides in the `TeamService` located at `apps/meteor/server/services/team/service.ts`.
*   This service extends `ServiceClassInternal` and provides methods for various team operations, including:
    *   `create`: To create a new team.
    *   `update`: To modify an existing team.
    *   `addMembers`: To add users to a team.
    *   `removeMembers`: To remove users from a team.
    *   `addRooms`: To associate channels with a team.
    *   `removeRoom`: To disassociate a channel from a team.
    *   `listRooms`: To retrieve the channels belonging to a team.
    *   `members`: To list the members of a team.
    *   `deleteById`, `deleteByName`: To delete a team.

**2. Data Models:**
*   Team data is stored using the `Team` and `TeamMember` models, which are defined in `packages/models/src/models/Team.ts` and `packages/models/src/models/TeamMember.ts` respectively.

**3. API Endpoints:**
*   The `teams` API endpoint, defined in `apps/meteor/app/api/server/v1/teams.ts`, exposes functionalities for interacting with the Team feature via REST API calls. This endpoint handles requests for creating, updating, and managing teams and their members.

**Call Chain Example (Creating a Team via API):**
`API Request (e.g., POST to /api/v1/teams.create) → apps/meteor/app/api/server/v1/teams.ts (teams.create) → apps/meteor/server/services/team/service.ts (TeamService.create)`

The `TeamService` then interacts with the `Team` and `TeamMember` models to persist the data.

## Tool Calls (8 calls, 60,829 tokens)

**Step 1:** `search({"query":"Team"})` → 733 tokens
**Step 2:** `graph({"direction":"down","query":"TeamService","layer":"server"})` → 111 tokens
**Step 3:** `graph({"layer":"server","file":"apps/meteor/app/api/server/v1/teams.ts","direction":"down","query":"teams")` → 1844 tokens
**Step 4:** `implement({"symbolName":"TeamService","filename":"apps/meteor/server/services/team/service.ts"})` → 1664 tokens
**Step 5:** `graph({"query":"TeamService.create","layer":"server","file":"apps/meteor/server/services/team/service.ts",)` → 14 tokens
**Step 6:** `search({"query":"TeamService.create","layer":"server"})` → 16 tokens
**Step 7:** `implement({"symbolName":"teams","filename":"apps/meteor/app/api/server/v1/teams.ts"})` → 72 tokens
**Step 8:** `search({"layer":"server","query":"teams.create"})` → 64 tokens

## Files Seen In Tool Results (30)

- `packages/models/src/index.ts`
- `packages/core-services/src/index.ts`
- `apps/meteor/client/views/directory/tabs/teams/TeamsTab.tsx`
- `packages/models/src/models/Team.ts`
- `apps/meteor/server/methods/browseChannels.ts`
- `packages/core-typings/src/ITeam.ts`
- `apps/meteor/client/views/teams/contextualBar/info/TeamsInfo.tsx`
- `apps/meteor/app/api/server/v1/teams.ts`
- `packages/rest-typings/src/v1/teams/index.ts`
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
