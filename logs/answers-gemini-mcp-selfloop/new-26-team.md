# How does the Team feature work in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

The Team feature in Rocket.Chat is primarily managed by the `TeamService` located at `apps/meteor/server/services/team/service.ts`. This service provides a comprehensive set of functionalities for team management, including:

*   **Team Creation and Management:**
    *   `create`: Creates a new team, optionally associating it with a room.
    *   `update`: Modifies existing team data.
    *   `deleteById`, `deleteByName`: Removes teams.
    *   `list`, `listAll`, `listByNames`, `listByIds`, `getOneById`, `getOneByName`, `getInfoByName`, `getInfoById`, `getAllPublicTeams`: Various methods for retrieving team information.
    *   `search`, `autocomplete`: Facilitates searching and auto-completing team names.

*   **Room Association:**
    *   `addRooms`: Associates existing rooms with a team.
    *   `removeRoom`: Removes a room from a team.
    *   `unsetTeamIdOfRooms`: Disassociates rooms from a team.
    *   `updateRoom`: Updates room settings within a team (e.g., setting a default room).
    *   `listRooms`, `listRoomsOfUser`, `getMatchingTeamRooms`, `getOneByMainRoomId`, `getOneByRoomId`, `getRoomInfo`, `listChildren`: Methods for managing and retrieving information about rooms associated with teams.

*   **Membership Management:**
    *   `addMembers`, `addMember`: Adds members to a team.
    *   `updateMember`: Updates a team member's information.
    *   `removeMember`, `removeMembers`, `removeAllMembersFromTeam`: Removes members from a team.
    *   `insertMemberOnTeams`, `removeMemberFromTeams`: Manages a user's membership across multiple teams.
    *   `findBySubscribedUserIds`, `members`, `getMembersByTeamIds`, `listTeamsBySubscriberUserId`: Retrieves information about team members.
    *   `addRolesToMember`, `removeRolesFromMember`, `addRolesToSubscription`: Manages roles for team members.
    *   `addMembersToDefaultRooms`: Adds new team members to default rooms.

*   **Statistics:**
    *   `getStatistics`: Provides team-related statistics.

The `TeamService` extends `ServiceClassInternal`, indicating it's a core server-side service. While the wiki results mentioned `apps/meteor/app/api/server/v1/teams.ts` as a REST API endpoint handler for team management, the specific symbol `teams` was not found within that file. However, it's highly probable that this file exposes the `TeamService` functionalities through a RESTful API.

In summary, the Team feature's core logic resides within the `TeamService` at `apps/meteor/server/services/team/service.ts`, which handles all aspects of team, room, and member management. This service is likely exposed to the client-side through a REST API, enabling users to interact with the Team feature.

## Tool Calls (8 calls, 64,767 tokens)

**Step 1:** `wiki({"question":"How does the Team feature work in Rocket.Chat?"})` → 3831 tokens
**Step 2:** `details({"symbolName":"TeamService","filename":"service.ts"})` → 1660 tokens
**Step 3:** `details({"filename":"teams.ts","symbolName":"teams"})` → 72 tokens
**Step 4:** `graph({"depth":2,"move":"down","file":"teams.ts"})` → 6 tokens
**Step 5:** `graph({"query":"API.v1.addRoute","file":"teams.ts","move":"down","depth":2})` → 14 tokens
**Step 6:** `details({"filename":"teams.ts"})` → 8 tokens
**Step 7:** `search({"query":"TeamService","layer":"server"})` → 93 tokens
**Step 8:** `graph({"file":"teams.ts","depth":1,"move":"expand"})` → 6 tokens

## Files Seen In Tool Results (38)

- `apps/meteor/server/features/EmailInbox/EmailInbox.ts`
- `packages/core-typings/src/IEmailInbox.ts`
- `packages/models/src/models/EmailInbox.ts`
- `apps/meteor/server/features/EmailInbox/logger.ts`
- `apps/meteor/app/livechat/server/lib/logger.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/lib/logger.ts`
- `apps/meteor/app/livechat/server/lib/RoutingManager.ts`
- `packages/omni-core/src/hooks/applyDepartmentRestrictions.ts`
- `packages/omni-core/src/isDepartmentCreationAvailable.ts`
- `ee/packages/omni-core-ee/src/isDepartmentCreationAvailable.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/lib/LivechatEnterprise.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/beforeNewRoom.ts`
- `apps/meteor/ee/server/apps/communication/rest.ts`
- `apps/meteor/app/message-star/server/starMessage.ts`
- `apps/meteor/app/apps/server/bridges/api.ts`
- `apps/meteor/app/api/server/api.ts`
- `packages/apps-engine/src/client/AppsEngineUIClient.ts`
- `apps/meteor/app/discussion/server/permissions.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `apps/meteor/app/api/server/v1/teams.ts`
- `apps/meteor/app/cloud/server/methods.ts`
- `apps/meteor/client/views/teams/contextualBar/info/TeamsInfo.stories.tsx`
- `apps/meteor/client/views/teams/contextualBar/channels/TeamsChannels.tsx`
- `packages/core-typings/src/ITeam.ts`
- `apps/meteor/app/apps/server/bridges/rooms.ts`
- `apps/meteor/app/livechat/server/api/lib/inquiries.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/startup.ts`
- `packages/apps-engine/src/server/managers/AppApiManager.ts`
- `apps/meteor/client/views/directory/tabs/teams/TeamsTable/TeamsTable.tsx`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/server/services/team/service.ts`
- `packages/livechat/src/api.ts`
- `apps/meteor/app/ui-utils/client/lib/LegacyRoomManager.ts`
- `packages/core-services/src/types/ServiceClass.ts`
- `packages/tools/src/stream.ts`
- `packages/apps-engine/src/server/bridges/LivechatBridge.ts`
- `apps/meteor/tests/end-to-end/api/teams.ts`
- `packages/core-services/src/types/ITeamService.ts`
