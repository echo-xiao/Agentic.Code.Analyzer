# Blast radius of changing Streamer module?

## Answer

The Streamer module is the backbone of all real-time communication in Rocket.Chat. It provides the DDP (Distributed Data Protocol) streaming infrastructure that powers live messages, typing indicators, presence updates, room changes, and virtually every real-time feature. Changing it affects the entire real-time experience.

### 1. Streamer Base Class

**`apps/meteor/server/modules/streamer/streamer.module.ts`, line 18:**
```ts
export abstract class Streamer<N extends keyof StreamerEvents> extends EventEmitter implements IStreamer<N> {
    public subscriptions = new Set<DDPSubscription>();
    protected subscriptionsByEventName = new Map<string, Set<DDPSubscription>>();
    public retransmit = true;
    public retransmitToSelf = false;
    public serverOnly = false;
    private _allowRead: IRules = {};
    private _allowWrite: IRules = {};
    private _allowEmit: IRules = {};
```

The constructor (line 35):
1. Registers the instance in `StreamerCentral.instances[name]` (singleton per name)
2. Calls `this.iniPublication()` to set up the DDP publication
3. Calls `this.initMethod()` to set up the DDP method
4. Sets default permissions: `allowRead('none')`, `allowEmit('all')`, `allowWrite('none')`

The subscription name is `stream-${this.name}` (line 60).

### 2. StreamerCentral

**Same file, line 8:**
```ts
class StreamerCentralClass<N extends keyof StreamerEvents> extends EventEmitter {
    public instances: Record<string, Streamer<N>> = {};
}
export const StreamerCentral = new StreamerCentralClass();
```

A global singleton that holds references to all Streamer instances. Used for cross-streamer coordination.

### 3. NotificationsModule (All Stream Instances)

**`apps/meteor/server/modules/notifications/notifications.module.ts`, line 11:**
```ts
export class NotificationsModule {
```

This class creates ALL the streamer instances used throughout the application:

| Property | Stream Name | Purpose |
|----------|-------------|---------|
| `streamAll` | `notify-all` | Broadcast to all connected clients |
| `streamLogged` | `notify-logged` | Broadcast to logged-in users |
| `streamRoom` | `notify-room` | Room-specific events (typing, deleteMessage) |
| `streamRoomUsers` | `notify-room-users` | Per-room user events |
| `streamRoomMessage` | `room-messages` | Live message streaming per room |
| `streamUser` | `notify-user` | Per-user notifications (DMs, alerts) |
| `streamImporters` | `importers` | Importer progress (no retransmit) |
| `streamRoles` | `roles` | Role changes |
| `streamApps` | `apps` | App marketplace events (no retransmit) |
| `streamAppsEngine` | `apps-engine` | Apps engine events (no retransmit) |
| `streamCannedResponses` | `canned-responses` | Omnichannel canned responses |
| `streamIntegrationHistory` | `integrationHistory` | Integration execution history |
| `streamLivechatRoom` | `livechat-room` | Livechat room events |
| `streamLivechatQueueData` | `livechat-inquiry-queue-observer` | Livechat queue updates |
| `streamRoomData` | `room-data` | Room metadata changes |
| `streamPresence` | `user-presence` | User online/offline/away status |
| `streamLocal` | `local` | Local instance events |

That is **17 distinct streamer instances**, each handling different categories of real-time data.

The `streamRoomMessage` streamer (line 63) has a special `_afterPublish` handler that manages user subscription lifecycle -- when a user is removed from a room, their message stream subscription is cleaned up.

### 4. ListenersModule (Event Bridge)

**`apps/meteor/server/modules/listeners/listeners.module.ts`, line 30:**
```ts
export class ListenersModule {
    constructor(service: IServiceClass, notifications: NotificationsModule) {
```

This module bridges **internal service events** (from `core-services` event system) to **Streamer broadcasts**. Examples:

- `service.onEvent('emoji.deleteCustom', ...)` -> `notifications.notifyLoggedInThisInstance('deleteEmojiCustom', ...)`
- `service.onEvent('user.forceLogout', ...)` -> `notifications.notifyUserInThisInstance(uid, 'force_logout', ...)`
- `service.onEvent('notify.ephemeralMessage', ...)` -> `notifications.notifyUserInThisInstance(uid, 'message', ...)`
- `service.onEvent('license.sync', ...)` -> `notifications.notifyAllInThisInstance('license')`

It also handles message parsing for ephemeral messages, using `parse()` from `@rocket.chat/message-parser` (line 62) for markdown rendering before streaming.

### 5. Impact Analysis

Changing the Streamer module affects:

| Feature | Impact |
|---------|--------|
| Live messages | Messages stop appearing in real-time |
| Typing indicators | "User is typing..." disappears |
| Presence | Online/offline/away status stops updating |
| Room updates | Room name changes, topic changes not reflected live |
| Notifications | Desktop/browser notifications may break |
| Livechat | Agent queue updates, room assignments stop |
| Apps Engine | App-triggered real-time events fail |
| Role changes | Admin role assignments not reflected live |
| Import progress | Importer progress bars freeze |
| Video conferencing | Call notifications may not reach users |
| Emoji updates | Custom emoji changes not propagated |
| Canned responses | Omnichannel canned response sync breaks |

### 6. Client-Side Streamer

The client-side counterpart subscribes to these streams via DDP subscriptions. Any change to the server streamer's protocol, event names, or subscription handling will break all connected clients.

### Key Files
| File | Role |
|------|------|
| `apps/meteor/server/modules/streamer/streamer.module.ts` | `Streamer` abstract class, `StreamerCentral` singleton |
| `apps/meteor/server/modules/streamer/types.ts` | Streamer type definitions (IStreamer, DDPSubscription, Rule, etc.) |
| `apps/meteor/server/modules/notifications/notifications.module.ts` | Creates all 17 streamer instances, manages subscriptions |
| `apps/meteor/server/modules/listeners/listeners.module.ts` | Bridges service events to streamer broadcasts |
| `apps/meteor/app/notifications/server/lib/Presence.ts` | Presence-specific streaming |

### Key Symbols
- `Streamer<N>` -- abstract base class for all real-time streams
- `StreamerCentral` -- singleton holding all streamer instances
- `NotificationsModule` -- creates and configures all 17 stream instances
- `ListenersModule` -- bridges `IServiceClass` events to streamer notifications
- `DDPSubscription` -- represents a client's subscription to a stream
- `allowRead()` / `allowWrite()` / `allowEmit()` -- permission rules per stream
- `retransmit` -- whether to retransmit events to other connected clients
