# Impact of changing afterSaveMessage?

## Answer

`afterSaveMessage` is one of the most critical callback hooks in Rocket.Chat. It executes after every message is written to the database and serves as the primary extensibility point for notifications, real-time propagation, Apps Engine hooks, auto-translation, and more. Changing it has an extremely wide blast radius.

### 1. The Function Itself

**`apps/meteor/app/lib/server/lib/afterSaveMessage.ts`, lines 8-20:**
```ts
export async function afterSaveMessage(message: IMessage, room: IRoom, user: IUser, roomUpdater?: Updater<IRoom>): Promise<IMessage> {
    const updater = roomUpdater ?? Rooms.getUpdater();
    const data: IMessage = (await callbacks.run('afterSaveMessage', message, { room, user, roomUpdater: updater })) as unknown as IMessage;

    if (!roomUpdater && updater.hasChanges()) {
        await Rooms.updateFromUpdater({ _id: room._id }, updater);
    }

    void Message.afterSave({ message: data });

    return data;
}
```

It does three things:
1. **Runs all `'afterSaveMessage'` callbacks** via `callbacks.run()` -- these are the registered handlers
2. **Applies room updates** if the updater has accumulated changes
3. **Calls `Message.afterSave()`** via the core-services proxy, which triggers service-level post-processing

There is also an async variant (line 22):
```ts
export function afterSaveMessageAsync(message, room, user, roomUpdater): void {
    callbacks.runAsync('afterSaveMessage', message, { room, user, roomUpdater });
    // ...
    void Message.afterSave({ message });
}
```

### 2. Where It Is Called

**`apps/meteor/app/lib/server/functions/sendMessage.ts`, line 292:**
```ts
await afterSaveMessage(message, room, user);
```
Called after every new message is inserted into MongoDB. This is the primary message sending path.

**`apps/meteor/app/lib/server/functions/updateMessage.ts`:**
Called after message edits, ensuring all post-save hooks run on updated messages too.

### 3. Registered Callbacks (Blast Radius)

The `'afterSaveMessage'` callback name is used by multiple critical subsystems:

#### a) Notifications
**`apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts`:**
Registers an `'afterSaveMessage'` callback named `'sendNotificationsOnMessage'` that triggers:
- Desktop notifications
- Mobile push notifications
- Email notifications
- Audio notifications
- Unread count updates

#### b) Auto-Translation
**`apps/meteor/app/autotranslate/server/autotranslate.ts`, lines 115-121:**
```ts
callbacks.add(
    'afterSaveMessage',
    (message, { room }) => provider.translateMessage(message, { room }),
    callbacks.priority.MEDIUM,
    'autotranslate',
);
```
Translates messages when auto-translate is enabled for a room.

#### c) Mention Notifications
**`apps/meteor/app/lib/server/startup/mentionUserNotInChannel.ts`:**
Notifies users who are @mentioned but not in the channel.

#### d) Notify Users on Message
**`apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts`:**
Handles user-specific notifications on message events.

### 4. Message.afterSave() (Service-Level Effects)

The `Message.afterSave({ message })` call goes through the core-services proxy to the Message service, which handles:
- Real-time notification via watch/change streams (`notifyOnMessageChange`)
- Apps Engine `IPostMessageSent` hooks via `AppListenerManager`
- Thread notification updates
- Read receipt processing

### 5. Impact Analysis

Changing `afterSaveMessage` affects:

| System | Impact |
|--------|--------|
| Push notifications | Mobile users stop receiving message alerts |
| Desktop notifications | Browser desktop notifications break |
| Email notifications | Offline email digests fail |
| Real-time streaming | Messages may not appear in real-time for other users |
| Auto-translation | Translated messages stop working |
| Apps Engine | All `IPostMessageSent` app hooks break |
| Mention alerts | @mention notifications fail |
| Read receipts | Read receipt tracking may break |
| Room updates | `lastMessage`, `msgs` count, etc. may not update |
| Thread updates | Thread reply counts and notifications affected |

### 6. Performance Considerations

Since `afterSaveMessage` runs on every message save, any performance regression here multiplies across the entire messaging throughput. The callbacks run sequentially via `callbacks.run()`, so a slow callback blocks the entire post-save pipeline.

### Key Files
| File | Role |
|------|------|
| `apps/meteor/app/lib/server/lib/afterSaveMessage.ts` | The `afterSaveMessage()` function and async variant |
| `apps/meteor/app/lib/server/functions/sendMessage.ts` | Primary caller (new messages) |
| `apps/meteor/app/lib/server/functions/updateMessage.ts` | Caller on message edits |
| `apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts` | Notification callback registration |
| `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts` | User notification callback |
| `apps/meteor/app/lib/server/startup/mentionUserNotInChannel.ts` | Mention notification callback |
| `apps/meteor/app/autotranslate/server/autotranslate.ts` | Auto-translation callback |
| `apps/meteor/app/lib/server/lib/notifyListener.ts` | Real-time notification helpers |

### Key Symbols
- `afterSaveMessage(message, room, user, roomUpdater?)` -- main sync function
- `afterSaveMessageAsync(message, room, user, roomUpdater)` -- fire-and-forget variant
- `callbacks.run('afterSaveMessage', message, { room, user, roomUpdater })` -- callback execution
- `Message.afterSave({ message })` -- service-level post-processing
- `sendNotificationsOnMessage` -- callback name for notifications
- `autotranslate` -- callback name for auto-translation
