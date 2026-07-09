# How does the Team feature work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The Team feature in Rocket.Chat enables users to collaborate and organize multiple channels under a single entity. Teams can be public or private and support various management operations.

**Core Functionality:**

*   **Team Creation and Properties:** Teams are created using the `TeamService.create` method, located in `apps/meteor/server/services/team/service.ts`. When creating a team, its name, type (public or private), and initial members can be specified. Each team is associated with a main room, which can be a public channel (`c`) or a private group (`p`), linked by a `teamId` property.
*   **Team Management Operations:** The `TeamService` class (in `apps/meteor/server/services/team/service.ts`) handles various team-related operations:
    *   **Creation:** The `create` method atomically creates a `Team` record and its corresponding `Room` record.
    *   **Updating:** The `update` method allows modification of a team's name and type.
    *   **Membership:** Members are stored in the `TeamMember` collection. The `ITeamMemberModel` interface, defined in `packages/model-typings/src/models/ITeamMemberModel.ts`, outlines methods for managing team members, such as `findByUserId`, `findOneByUserIdAndTeamId`, `findByTeamId`, `addMembers`, `removeMember`, and `updateMember`. The `ITeamMember` interface, found in `packages/core-typings/src/ITeam.ts`, defines the structure of a team member.
    *   **Channel Management:** Channels can be added to or removed from a team, or converted into teams.
    *   **Deletion:** Teams can be deleted, which also removes associated chat content and configuration.

**Key Files:**

*   `apps/meteor/server/services/team/service.ts`: Contains the `TeamService` class, which is the central point for team creation, updates, and membership management.
*   `packages/model-typings/src/models/ITeamMemberModel.ts`: Defines the `ITeamMemberModel` interface, detailing the methods for interacting with team member data.
*   `packages/core-typings/src/ITeam.ts`: Defines the `ITeamMember` interface, which describes the structure of a team member.

## Tool Calls (8 calls, 41,541 tokens)

**Step 1:** `wiki({"question":"How does the Team feature work in Rocket.Chat?"})` → 854 tokens
**Step 2:** `search({"query":"TeamService"})` → 93 tokens
**Step 3:** `graph({"depth":2,"file":"service.ts","query":"TeamService","move":"expand"})` → 300 tokens
**Step 4:** `details({"filename":"service.ts","symbolName":"TeamService"})` → 1670 tokens
**Step 5:** `search({"query":"TeamMember"})` → 161 tokens
**Step 6:** `details({"filename":"TeamMember.ts","symbolName":"TeamMember"})` → 55 tokens
**Step 7:** `details({"filename":"ITeamMemberModel.ts","symbolName":"ITeamMemberModel"})` → 947 tokens
**Step 8:** `search({"query":"ITeamMember"})` → 117 tokens

## Files Seen In Tool Results (19)

- `apps/meteor/server/api/v1/teams.ts`
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
- `packages/core-services/src/index.ts`
- `packages/models/src/index.ts`
- `packages/rest-typings/src/v1/teams/ITeamMemberParams.ts`
- `packages/models/src/models/TeamMember.ts`
- `packages/model-typings/src/models/ITeamMemberModel.ts`
- `apps/meteor/app/mentions/server/getMentionedTeamMembers.ts`
- `packages/core-typings/src/ITeam.ts`
