# How does the Team feature work in Rocket.Chat?

## Gemini Answer

Based on the investigation, here is an overview of how the Team feature works in Rocket.Chat, focusing on the server-side architecture.

### High-Level Architecture

The Team feature provides a way to group multiple channels under a single entity. A "Team" acts as a container or a directory for a set of related channels, simplifying user navigation and management of permissions for a collection of rooms.

The implementation follows a standard three-tier architecture: an API layer for handling requests, a service layer for business logic, and a model layer for data persistence.

### Key Files and Components

1.  **REST API Entry Point**: `apps/meteor/app/api/server/v1/teams.ts`
    *   This file defines the REST endpoints for interacting with Teams, such as `teams.create`, `teams.addMembers`, and `teams.listRooms`. It serves as the primary entry point for client applications and external integrations.

2.  **Core Business Logic**: `apps/meteor/server/services/team/service.ts`
    *   This file contains the `TeamService` class, which encapsulates the core business logic for managing teams. This service is responsible for orchestrating operations like creating a team, managing its members, and handling the relationship between the team and its associated channels.

3.  **Data Models**: (Located in `packages/models`)
    *   The system uses `Team` and `TeamMember` models to represent the data stored in the database. These models define the schema for what constitutes a team and its membership.

4.  **Deletion Logic**: `apps/meteor/app/api/server/lib/eraseTeam.ts`
    *   This dedicated file handles the logic for deleting a team, which likely includes complex operations like removing all associated rooms, memberships, and messages.

### Inferred Call Chain for Creating a Team

While the call graph tools failed to trace the exact sequence, the architectural pattern is clear. The process for creating a team would follow this path:

`REST API → Service → Model`

1.  **Entry**: A client sends an HTTP request to the `teams.create` endpoint.
2.  **API Layer**: The route defined in `apps/meteor/app/api/server/v1/teams.ts` receives the request. It validates the request parameters (e.g., team name, privacy settings) and user permissions.
3.  **Service Layer**: The API handler then calls the appropriate method within `TeamService` (e.g., `TeamService.create`).
4.  **Core Logic**: `TeamService` in `apps/meteor/server/services/team/service.ts` executes the core logic. It creates the main room for the team and then uses the `Team` and `TeamMember` models to insert the new records into the database. It may also perform other related tasks, like adding the creator as the first member.
5.  **Final**: The result of the operation is returned up the chain to the client.

This structure separates concerns effectively, making the feature robust and maintainable. The API layer handles communication, the service layer handles the "how," and the model layer handles the data structure.

## Tool Calls (8 calls, 25,703 tokens)

**Step 1:** `search({"layer":"server","query":"team"})` → 247 tokens
**Step 2:** `graph({"query":"TeamService","direction":"down"})` → 111 tokens
**Step 3:** `graph({"direction":"down","query":"TeamService.create"})` → 14 tokens
**Step 4:** `search({"query":"TeamService.create"})` → 16 tokens
**Step 5:** `search({"query":"teams.create"})` → 314 tokens
**Step 6:** `graph({"query":"teams.create","direction":"down"})` → 13 tokens
**Step 7:** `implement({"filename":"apps/meteor/app/api/server/v1/teams.ts","symbolName":"undefined"})` → 16 tokens
**Step 8:** `search({"query":"apps/meteor/app/api/server/v1/teams.ts"})` → 66 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 1/2 |
| Tool calls | 8 |
| Total tokens | 25,703 |
| Pass | NO |
