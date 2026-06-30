# How does the Team feature work in Rocket.Chat?

## Gemini Answer

The Team feature in Rocket.Chat is built around the `TeamService` which acts as the central hub for all team-related operations. Teams are a layer above channels, allowing multiple channels to be grouped together.

Here's how it works:

**Call Chain:**

1.  **Entry Point (Server Startup):** The `TeamService` is initialized during the server startup process.
    `apps/meteor/server/main.ts` → `apps/meteor/server/services/startup.ts` → `TeamService`
2.  **Core Logic:** The core functionality for managing teams resides within the `TeamService`.
    `TeamService` (`apps/meteor/server/services/team/service.ts`)
    *   Handles operations such as `create`, `update`, `addMembers`, `removeMembers`, `listRooms`, and `deleteById`.
    *   The service interacts with `Team` and `TeamMember` models to persist data.
3.  **Data Models:**
    `packages/models/src/models/Team.ts`
    `packages/models/src/models/TeamMember.ts`
4.  **Client-side Interaction:** User interfaces, like the Teams tab in the directory, interact with these services to display and manage teams.
    `apps/meteor/client/views/directory/tabs/teams/TeamsTab.tsx`
    *   This component uses `TeamsTable` (`apps/meteor/client/views/directory/tabs/teams/TeamsTable/TeamsTable.tsx`) to render the list of teams.
    *   It uses the `usePermission` hook (`apps/meteor/client/contexts/AuthorizationContext/hooks/usePermission.ts`) to check user permissions for team actions.
5.  **Server-side Data Retrieval:** Methods like `getTeams` are used to fetch team data for display.
    `apps/meteor/server/methods/browseChannels.ts` → `getTeams`
    *   This method queries `Subscriptions` and `Rooms` collections to find teams based on user subscriptions and search terms.
6.  **REST API:** There are also REST API endpoints available for team management.
    `apps/meteor/app/api/server/v1/teams.ts` (This file contains the REST API definitions for teams).

**In summary:** The `TeamService` (`apps/meteor/server/services/team/service.ts`) is the primary service managing team creation, membership, and room association. Data is stored in `Team` and `TeamMember` models (`packages/models`). Client-side components like `TeamsTab` (`apps/meteor/client/views/directory/tabs/teams/TeamsTab.tsx`) provide the UI, interacting with server-side methods such as `getTeams` (`apps/meteor/server/methods/browseChannels.ts`) and potentially REST API endpoints (`apps/meteor/app/api/server/v1/teams.ts`). The `TeamService` itself is registered during the application's server startup (`apps/meteor/server/services/startup.ts`).

## Tool Calls (8 calls, 52,478 tokens)

**Step 1:** `search({"query":"Team"})` → 733 tokens
**Step 2:** `graph({"query":"TeamService","direction":"down"})` → 111 tokens
**Step 3:** `implement({"symbolName":"TeamService","filename":"apps/meteor/server/services/team/service.ts"})` → 1664 tokens
**Step 4:** `graph({"query":"TeamService.create","file":"apps/meteor/server/services/team/service.ts","direction":"up"})` → 14 tokens
**Step 5:** `graph({"file":"apps/meteor/client/views/directory/tabs/teams/TeamsTab.tsx","query":"TeamsTab","direction":)` → 686 tokens
**Step 6:** `implement({"symbolName":"teams","filename":"apps/meteor/app/api/server/v1/teams.ts"})` → 72 tokens
**Step 7:** `implement({"filename":"apps/meteor/server/methods/browseChannels.ts","symbolName":"getTeams"})` → 297 tokens
**Step 8:** `graph({"query":"TeamService","file":"apps/meteor/server/services/team/service.ts","direction":"up"})` → 161 tokens
