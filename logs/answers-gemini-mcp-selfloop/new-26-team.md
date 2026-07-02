# How does the Team feature work in Rocket.Chat?

## Gemini Answer

The Team feature in Rocket.Chat allows for the organization of multiple channels under a single team. This functionality is primarily managed by the `TeamService`.

Here's a breakdown of how it works:

*   **Core Logic:** The `TeamService` (located at `apps/meteor/server/services/team/service.ts`) is the central component for managing teams. It extends `ServiceClassInternal` and provides a comprehensive set of methods for team operations.
*   **Team Operations:** The `TeamService` handles various actions related to teams, including:
    *   `create`: Creating new teams.
    *   `update`: Modifying existing teams.
    *   `addMembers`: Adding users to a team.
    *   `removeMembers`: Removing users from a team.
    *   `addRooms`: Associating existing rooms with a team.
    *   `removeRoom`: Disassociating rooms from a team.
    *   `listRooms`: Listing rooms belonging to a team.
    *   `members`: Listing members of a team.
    *   `deleteById`/`deleteByName`: Deleting teams.
*   **Data Models:** Team data is persisted using two key models:
    *   `Team`: This model (defined by the `ITeam` interface in `packages/core-typings/src/ITeam.ts`) represents the team itself. It includes properties like `name`, `type`, `roomId` (likely referring to a main team room), `createdBy`, and `createdAt`.
    *   `TeamMember`: This model (though not fully detailed in the provided output, it's mentioned in the search results as `packages/models/src/models/TeamMember.ts`) would store information about the members belonging to a team.
*   **API and Interfaces:** The `ITeamService` interface (`packages/core-services/src/types/ITeamService.ts`) defines the contract for the `TeamService`, ensuring consistency in how team-related operations are exposed. Additionally, `packages/rest-typings/src/v1/teams/index.ts` and other files within that directory define the REST API typings for interacting with the Team feature.

In essence, the `TeamService` acts as the orchestrator for all team-related functionalities, leveraging the `Team` and `TeamMember` models for data storage and adhering to the `ITeamService` interface for its public API.

## Tool Calls (8 calls, 34,177 tokens)

**Step 1:** `plan({"question":"How does the Team feature work in Rocket.Chat?","intent":"architecture"})` → 85 tokens
**Step 2:** `search({"query":"Team"})` → 529 tokens
**Step 3:** `graph({"depth":2,"query":"TeamService","move":"expand"})` → 374 tokens
**Step 4:** `details({"symbolName":"TeamService","filename":"apps/meteor/server/services/team/service.ts"})` → 1660 tokens
**Step 5:** `details({"filename":"packages/models/src/models/Team.ts","symbolName":"Team"})` → 49 tokens
**Step 6:** `details({"filename":"packages/models/src/models/Team.ts","symbolName":"Team"})` → 49 tokens
**Step 7:** `search({"query":"ITeam"})` → 232 tokens
**Step 8:** `details({"symbolName":"ITeam","filename":"packages/core-typings/src/ITeam.ts"})` → 79 tokens

## Files Seen In Tool Results (31)

- `packages/models/src/index.ts`
- `packages/core-services/src/index.ts`
- `packages/rest-typings/src/v1/users/UsersListTeamsParamsGET.ts`
- `packages/rest-typings/src/v1/teams/index.ts`
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
- `apps/meteor/server/services/team/service.ts`
- `packages/core-services/src/types/ITeamService.ts`
- `packages/rest-typings/src/v1/omnichannel.ts`
- `apps/meteor/server/services/startup.ts`
- `packages/core-services/src/types/ServiceClass.ts`
- `apps/meteor/app/livechat/server/roomAccessValidator.internalService.ts`
- `apps/meteor/server/services/uikit-core-app/service.ts`
- `apps/meteor/server/services/apps-engine/service.ts`
- `apps/meteor/server/services/analytics/service.ts`
- `apps/meteor/server/services/ldap/service.ts`
- `apps/meteor/server/services/image/service.ts`
- `packages/core-typings/src/ITeam.ts`
- `packages/model-typings/src/models/ITeamModel.ts`
- `packages/model-typings/src/models/ITeamMemberModel.ts`
