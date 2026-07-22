# What happens when a user creates a new channel?

## Answer

Channel creation flows through a Meteor method, permission checks, room document creation, member subscription setup, and post-creation callbacks/events. The primary entry point is the `createChannel` Meteor method.

### 1. Meteor Method: `createChannel`

**`apps/meteor/app/lib/server/methods/createChannel.ts`, line 61:**
```ts
Meteor.methods<ServerMethods>({
    async createChannel(name, members, readOnly = false, customFields = {}, extraData = {}) {
        const uid = Meteor.userId();
        // ...
        return createChannelMethod(uid, name, members, readOnly, customFields, extraData);
    },
});
```

### 2. `createChannelMethod()` (Validation Layer)

**Same file, line 23:**
```ts
export const createChannelMethod = async (
    userId, name, members, readOnly = false, customFields?, extraData = {}, excludeSelf = false
) => {
```

This function:
1. Validates `name` (String) and `members` (optional array of strings) via `check()` (lines 32-33).
2. Looks up the calling user via `Users.findOneById(userId)` (line 38).
3. If `extraData.teamId` is provided, checks `create-team-channel` permission on the team's room (line 48).
4. Otherwise checks `create-c` permission (line 51).
5. Delegates to `createRoom('c', name, user, members, excludeSelf, readOnly, {...})` (line 55).

### 3. `createRoom()` (Core Room Creation)

**`apps/meteor/app/lib/server/functions/createRoom.ts`, line 142:**
```ts
export const createRoom = async <T extends RoomType>(
    type: T, name, owner, members = [], excludeSelf?, readOnly?, roomExtraData?, options?
): Promise<ICreatedRoom & { rid: string }> => {
```

The detailed flow:

**a) Federation check** (lines 159-171): If any members are federated (`@user:server`), the room must have `federated: true` in extraData.

**b) Pre-create callbacks** (line 173): `prepareCreateRoomCallback.run()` fires before anything else.

**c) Direct message shortcut** (line 191): If `type === 'd'`, delegates to `createDirectRoom()` instead.

**d) Member list preparation** (lines 195-224): Validates members are strings, validates room name, validates owner, adds owner to member list if not excluded.

**e) Room name validation** (line 240): `getValidRoomName(name.trim())` ensures uniqueness and valid characters.

**f) Room document construction** (lines 236-251):
```ts
const roomProps = {
    fname: name,
    name: isDiscussion ? name : await getValidRoomName(name.trim()),
    t: type,  // 'c' for channels
    msgs: 0,
    usersCount: 0,
    u: { _id: owner._id, username: owner.username, name: owner.name },
    ts: now,
    ro: readOnly === true,
    ...extraData,
};
```

**g) Apps Engine hooks** (lines 265-284):
- `AppEvents.IPreRoomCreatePrevent` -- can block creation
- `AppEvents.IPreRoomCreateExtend` -- can extend room data
- `AppEvents.IPreRoomCreateModify` -- can modify room data

**h) Before-create callbacks** (lines 286-293):
- `beforeCreateRoomCallback.run({ owner, room: roomProps })` -- general
- `callbacks.run('beforeCreateChannel', owner, roomProps)` -- channel-specific

**i) DB insertion** (line 295):
```ts
const room = await Rooms.createWithFullRoomData(roomProps);
```

**j) Real-time notification** (line 297):
```ts
void notifyOnRoomChanged(room, 'inserted');
```

**k) Subscription creation** (line 306):
```ts
await createUsersSubscriptions({ room, members: memberList, now, owner, options, shouldBeHandledByFederation });
```

The `createUsersSubscriptions()` function (line 27) iterates over members, calls `beforeAddUserToRoom.run()` for each, constructs subscription objects with roles (owner gets `['owner']`), auto-translate config, and default preferences, then batch-inserts via `Subscriptions.createWithRoomAndManyUsers()`.

**l) Post-create callbacks** (lines 308-319):
- `callbacks.runAsync('afterCreateChannel', owner, room)` -- for channels
- `callbacks.runAsync('afterCreateRoom', owner, room)` -- for all rooms
- `Apps.self?.triggerEvent(AppEvents.IPostRoomCreate, room)` -- Apps Engine

### 4. RoomService (Service Layer)

**`apps/meteor/server/services/room/service.ts`, line 41:**
```ts
export class RoomService extends ServiceClassInternal implements IRoomService {
    protected name = 'room';
    async create(uid: string, params: ICreateRoomParams): Promise<IRoom> { ... }
```

Provides a service-layer wrapper with permission checking, used by the REST API and other services.

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/lib/server/methods/createChannel.ts` | Meteor method entry point, permission check, delegates to createRoom |
| `apps/meteor/app/lib/server/functions/createRoom.ts` | Core room creation: validation, DB insert, subscriptions, callbacks |
| `apps/meteor/app/lib/server/functions/createDirectRoom.ts` | Direct message room creation (branched from createRoom for type 'd') |
| `apps/meteor/server/services/room/service.ts` | Service layer for room operations |
| `apps/meteor/server/lib/callbacks/beforeCreateRoomCallback.ts` | Before-create callback hooks |
| `apps/meteor/server/lib/callbacks/beforeAddUserToRoom.ts` | Per-member validation before adding to room |
| `apps/meteor/app/utils/server/lib/getValidRoomName.ts` | Room name validation and uniqueness |
| `apps/meteor/app/lib/server/lib/notifyListener.ts` | Real-time notifications via `notifyOnRoomChanged` |

### Key Symbols
- `createChannelMethod()` -- validates user/permissions, delegates to `createRoom()`
- `createRoom(type, name, owner, members, ...)` -- core function handling all room types
- `createUsersSubscriptions()` -- bulk-creates subscriptions for room members
- `RoomService.create()` -- service-layer wrapper with authorization
- `beforeCreateRoomCallback` -- hook running before room is created
- `prepareCreateRoomCallback` -- earliest hook in creation pipeline
- `notifyOnRoomChanged(room, 'inserted')` -- real-time propagation
- `Rooms.createWithFullRoomData(roomProps)` -- MongoDB insert
