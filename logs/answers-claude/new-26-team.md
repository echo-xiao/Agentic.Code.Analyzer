# How does the Team feature work?

## Answer

Teams in Rocket.Chat are containers for channels with shared membership and bulk operations. The `TeamService` extends `ServiceClassInternal` and implements `ITeamService`, providing team CRUD, membership management, and channel association. Teams are backed by a dedicated `Team` collection and linked to rooms via `teamId`.

### 1. TeamService (Service Layer)

**`apps/meteor/server/services/team/service.ts`, line 39:**
```ts
export class TeamService extends ServiceClassInternal implements ITeamService {
    protected name = 'team';
```

### 2. Team Creation

**`create()` method (line 42):**
```ts
async create(uid: string, { team, room = { name: team.name, extraData: {} }, members, owner }: ITeamCreateParams): Promise<ITeam> {
```

The creation flow:
1. **Name availability check** (line 43): `checkUsernameAvailability(team.name)` -- team names share the namespace with usernames.
2. **Room conflict check** (line 47): `Rooms.findOneByName(team.name)` -- ensures no room name collision unless reusing an existing room.
3. **Creator lookup** (line 52): Fetches the creating user's username.
4. **Member resolution** (lines 61-68): `Users.findActiveByIdsOrUsernames(members)` to resolve member IDs and usernames.
5. **Team document construction** (lines 70-76):
```ts
const teamData = {
    ...team,
    createdAt: new Date(),
    createdBy,
    _updatedAt: new Date(),
    roomId: '',  // populated after room creation
};
```
6. **Room creation** (lines 79-91): Either reuses an existing room (`room.id`) or creates a new one via `Room.create()`. Room type is `'p'` (private) for `TeamType.PRIVATE` or `'c'` (channel) for public teams.
7. **Team insertion** (line 93): `Team.insertOne(teamData)` inserts the team document.
8. **Member enrollment** (lines 96-115): Creates `TeamMember` entries for each member with roles (`'owner'` for the creator, `'member'` for others). Deduplicates to avoid duplicate owner entries.
9. **Room update** (post-creation): Sets `teamId` and `teamDefault` on the room document.

### 3. Team Membership Management

The `TeamService` provides methods for membership operations:

- **`addMembers(uid, teamId, members)`** -- adds users to team, optionally to all team channels
- **`removeMembers(uid, teamId, members)`** -- removes users from team and associated channels
- **`updateMember(uid, teamId, member)`** -- updates member roles within the team
- **`getMembers(teamId, options)`** -- retrieves paginated member list with `ITeamMemberInfo`
- **`getMembersOfATeam(teamId, options)`** -- alternative member query with different filters

Member documents (`ITeamMember`) track:
- `teamId` -- reference to the team
- `userId` -- the member's user ID
- `roles` -- array of team roles (e.g., `['owner']`, `['member']`)
- `createdAt` / `createdBy`

### 4. Channel Management

Teams manage their associated channels (rooms):

- **`listRooms(uid, teamId, filter, pagination)`** -- lists rooms belonging to the team
- **`listRoomsOfUser(uid, teamId, userId, options)`** -- rooms a specific member has access to
- **`addRooms(uid, rooms, teamId)`** -- adds existing rooms to the team (sets `teamId` on room)
- **`removeRoom(uid, teamId, rid)`** -- removes a room from the team (clears `teamId`)
- **`updateRoom(uid, rid, isDefault)`** -- toggles `teamDefault` flag on a room

When a room is marked as `teamDefault`, new team members are automatically added to it.

### 5. Team Operations

- **`deleteTeam(uid, teamId, roomsToRemove)`** -- deletes team, optionally removes associated rooms
- **`updateTeam(uid, teamId, updateData)`** -- updates team name, type, etc.
- **`getTeamById(teamId)`** -- retrieves team info
- **`getTeamByName(teamName)`** -- finds team by name
- **`getTeamStats(teamId)`** -- returns statistics (member count, room count, default rooms, etc.)
- **`autocomplete(uid, name)`** -- searches teams by name prefix for autocomplete

### 6. Team-Room Relationship

The link between teams and rooms:
- `IRoom.teamId` -- set on rooms that belong to a team
- `IRoom.teamDefault` -- if true, new team members auto-join this room
- `IRoom.teamMain` -- marks the team's primary room
- `ITeam.roomId` -- the team's main room ID

When a team is created, a main room is created with `teamMain: true` and `teamId` set.

### 7. Permission Model

Team operations respect permissions:
- `create-team` -- permission to create teams
- `create-team-channel` -- permission to create channels within a team
- Team role-based checks for membership operations (owner vs member)
- Uses `Authorization.hasPermission()` for permission checks

### 8. Data Models

**`Team` collection** (from `@rocket.chat/models`):
```ts
interface ITeam {
    _id: string;
    name: string;
    type: TeamType;  // PUBLIC (0) or PRIVATE (1)
    roomId: string;
    createdBy: { _id: string; username: string };
    createdAt: Date;
    _updatedAt: Date;
}
```

**`TeamMember` collection**:
```ts
interface ITeamMember {
    teamId: string;
    userId: string;
    roles?: string[];
    createdAt: Date;
    createdBy: { _id: string; username: string };
}
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/server/services/team/service.ts` | `TeamService` -- full team CRUD, membership, channels |
| `packages/core-services/src/types/ITeamService.ts` | `ITeamService` interface definition |
| `packages/core-typings/src/ITeam.ts` | `ITeam`, `ITeamMember`, `TeamType` type definitions |
| `packages/models/src/models/Team.ts` | Team MongoDB model |
| `packages/models/src/models/TeamMember.ts` | TeamMember MongoDB model |
| `apps/meteor/app/channel-settings/server/` | `saveRoomName()`, `saveRoomType()` used in team operations |
| `apps/meteor/app/lib/server/functions/addUserToRoom.ts` | Used when adding members to team rooms |
| `apps/meteor/app/lib/server/functions/removeUserFromRoom.ts` | Used when removing members from team rooms |

### Key Symbols
- `TeamService` -- `ServiceClassInternal`, name = `'team'`, implements `ITeamService`
- `TeamService.create(uid, params)` -- creates team with room and members
- `TeamService.addMembers(uid, teamId, members)` -- adds members to team
- `TeamService.removeMembers(uid, teamId, members)` -- removes members from team
- `TeamService.listRooms(uid, teamId, filter, pagination)` -- lists team channels
- `TeamService.deleteTeam(uid, teamId, roomsToRemove)` -- deletes team
- `TeamService.getTeamStats(teamId)` -- team statistics
- `ITeamCreateParams` -- `{ team, room?, members?, owner? }`
- `TeamType.PUBLIC` / `TeamType.PRIVATE` -- team visibility
- `ITeamMemberInfo` -- extended member info with user data
