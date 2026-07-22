# How do you add a new service?

## Answer

Adding a new service in Rocket.Chat involves extending `ServiceClassInternal` from `@rocket.chat/core-services`, implementing a typed service interface, and registering it with the service broker via `proxify()`. Services encapsulate domain logic and are accessed throughout the codebase through proxied interfaces, enabling a microservice-like architecture even within the monolith.

The primary example is `RoomService` in `apps/meteor/server/services/room/service.ts` (line 41), which extends `ServiceClassInternal` and implements `IRoomService`. The class declares `protected name = 'room'` to identify itself in the service broker. It provides methods like `updateDirectMessageRoomName()`, and delegates to domain functions like `createRoom()`, `createDirectMessage()`, `addUserToRoom()`, `removeUserFromRoom()`, and `performUserBan()`.

`ServiceClassInternal` (from `@rocket.chat/core-services`) provides the base infrastructure: lifecycle hooks (`created()`, `started()`, `stopped()`), event subscription (`onEvent()`), event broadcasting (`api.broadcast()`), and setting change listeners (`onSettingChanged()`). Unlike `ServiceClass` (used for external/separate microservices), `ServiceClassInternal` runs in-process and communicates through the internal event bus.

For access control, services use `Authorization.hasPermission()` and `Authorization.canAccessRoom()` from `@rocket.chat/core-services`. These are themselves proxied service calls to the Authorization service. The `RoomService` imports `Authorization` directly and uses it for permission checks before performing operations.

Service registration happens through the `proxify()` pattern. In the core-services package, each service interface is proxied so that calling code can import e.g. `Room` from `@rocket.chat/core-services` and call methods on it. The proxy forwards method calls to the registered service instance through the broker. Services are instantiated and started during server startup in `apps/meteor/startRocketChat.ts` or related bootstrap files.

To create a new service, you would:
1. Define the service interface in `packages/core-services/src/types/` (e.g., `IMyService`)
2. Export it and a proxy from `packages/core-services/src/index.ts`
3. Create the implementation in `apps/meteor/server/services/my-service/service.ts` extending `ServiceClassInternal`
4. Register and start it during server bootstrap

### Call Chain
```
packages/core-services/src/types/IRoomService.ts — interface definition
→ packages/core-services/src/index.ts — proxify('room') creates Room proxy
→ server/services/room/service.ts — RoomService extends ServiceClassInternal
  → createRoom(), createDirectMessage(), addUserToRoom(), etc.
  → Authorization.hasPermission() for access control
→ startRocketChat.ts — instantiates and starts services
→ Consumer: import { Room } from '@rocket.chat/core-services'; Room.create(...)
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/server/services/room/service.ts` | `RoomService extends ServiceClassInternal` — example service |
| `packages/core-services/src/types/IRoomService.ts` | `IRoomService` — service interface definition |
| `packages/core-services/src/index.ts` | Exports proxied service instances via `proxify()` |
| `packages/core-services/src/lib/ServiceClassInternal.ts` | `ServiceClassInternal` — base class for in-process services |
| `apps/meteor/startRocketChat.ts` | Service instantiation and startup |
| `apps/meteor/app/lib/server/functions/createRoom.ts` | `createRoom()` — domain function called by RoomService |
| `apps/meteor/server/methods/createDirectMessage.ts` | `createDirectMessage()` — DM creation logic |
| `apps/meteor/app/lib/server/functions/addUserToRoom.ts` | `addUserToRoom()` — room membership |

### Key Symbols
ServiceClassInternal, ServiceClass, IRoomService, RoomService, proxify, Authorization, hasPermission, canAccessRoom, createRoom, createDirectMessage, addUserToRoom, removeUserFromRoom, performUserBan, onEvent, api.broadcast, onSettingChanged
