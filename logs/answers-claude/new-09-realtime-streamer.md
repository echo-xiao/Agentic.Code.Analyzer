# How does real-time message delivery work?

## Answer

Real-time message delivery in Rocket.Chat uses a pipeline that starts from database writes, flows through an internal event bus, and reaches connected clients via DDP (Distributed Data Protocol) over WebSocket connections. The system is built on the Streamer abstraction, which manages named event channels with subscription-based access control.

**Post-Write Broadcast:**

After a message is inserted into MongoDB via `Messages.insertOne()`, the `notifyOnMessageChange()` function in `apps/meteor/app/lib/server/lib/notifyListener.ts` (line 475) is called. This function broadcasts the message change via `api.broadcast('watch.messages', { message })`, which sends the event through the internal service event bus to all listeners.

**ListenersModule — Event Processing:**

The `ListenersModule` class in `apps/meteor/server/modules/listeners/listeners.module.ts` (line 30) subscribes to service events in its constructor. At line 194, it listens for `'watch.messages'` events:

```
service.onEvent('watch.messages', async ({ message }) => {
    notifications.streamRoomMessage._emit('__my_messages__', [message], ...);
    notifications.streamRoomMessage.emitWithoutBroadcast(message.rid, message);
});
```

The `_emit('__my_messages__', ...)` call sends the message to subscribers of the special `__my_messages__` channel with a custom filter callback that checks if each subscriber has access to the message's room. The `emitWithoutBroadcast(message.rid, message)` call sends the message to subscribers of the specific room channel.

**NotificationsModule — Streamer Instances:**

`NotificationsModule` in `apps/meteor/server/modules/notifications/notifications.module.ts` (line 11) instantiates all Streamer channels. Key streamers include:
- `streamRoomMessage` (type `'room-messages'`) — per-room message delivery
- `streamRoom` (type `'notify-room'`) — room-level events (typing, delete, etc.)
- `streamUser` (type `'notify-user'`) — per-user events (notifications, subscriptions)
- `streamAll` (type `'notify-all'`) — broadcast to all connected users
- `streamLogged` (type `'notify-logged'`) — broadcast to all logged-in users

Each streamer is created via `new this.Streamer(name, options)` with optional settings like `retransmit: false`.

**Streamer Class — DDP Serialization:**

The `Streamer` abstract class in `apps/meteor/server/modules/streamer/streamer.module.ts` (line 18) extends `EventEmitter` and implements the `IStreamer` interface. When `_emit()` or `emitWithoutBroadcast()` is called, the Streamer serializes the data into DDP CHANGED message format and sends it over the WebSocket connection to subscribed clients.

`StreamerCentralClass` (line 8) is a singleton (`StreamerCentral`) that manages all Streamer instances, providing centralized event routing and instance lookup.

**Client-Side Reception:**

On the client, the Streamer class in `apps/meteor/client/lib/streamer/streamer.ts` receives DDP messages via `parseDDPMessage()`. When a `CHANGED` message arrives for a subscribed collection/event, the client Streamer emits the event locally, triggering React component updates or other UI handlers. The client subscribes to room messages when entering a room, and the subscription is managed by the `LegacyRoomManager` and room body hooks.

### Call Chain
```
Messages.insertOne(message) — database write
→ notifyOnMessageChange({ id, data: message }) (notifyListener.ts:475)
  → api.broadcast('watch.messages', { message })
→ ListenersModule (listeners.module.ts:194)
  → service.onEvent('watch.messages', ...)
  → notifications.streamRoomMessage._emit('__my_messages__', [message])
    → filter callback checks per-subscriber room access
  → notifications.streamRoomMessage.emitWithoutBroadcast(message.rid, message)
→ Streamer (streamer.module.ts)
  → serialize to DDP CHANGED format
  → send via WebSocket to subscribed clients
→ Client Streamer (client/lib/streamer/streamer.ts)
  → parseDDPMessage() → local emit → UI update
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/lib/server/lib/notifyListener.ts` | `notifyOnMessageChange()` — triggers `api.broadcast('watch.messages')` |
| `apps/meteor/server/modules/listeners/listeners.module.ts` | `ListenersModule` — catches `watch.messages`, calls `streamRoomMessage._emit()` |
| `apps/meteor/server/modules/notifications/notifications.module.ts` | `NotificationsModule` — instantiates all Streamer channels |
| `apps/meteor/server/modules/streamer/streamer.module.ts` | `Streamer` class, `StreamerCentralClass` — DDP serialization and delivery |
| `apps/meteor/client/lib/streamer/streamer.ts` | Client `Streamer` — receives DDP messages, local event emission |

### Key Symbols
notifyOnMessageChange, api.broadcast, watch.messages, ListenersModule, NotificationsModule, Streamer, StreamerCentralClass, StreamerCentral, streamRoomMessage, streamRoom, streamUser, streamAll, streamLogged, _emit, emitWithoutBroadcast, parseDDPMessage, IStreamer, IStreamerConstructor, DDP CHANGED
