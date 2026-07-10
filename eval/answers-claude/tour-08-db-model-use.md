# How do you use a database model to query data?

## Answer

Database models in Rocket.Chat are used by importing them from `@rocket.chat/models` and calling their specialized query methods. A representative example is the `loadHistory` Meteor method, which loads paginated message history for a room by calling methods on the `Messages` model.

The entry point is `apps/meteor/server/methods/loadHistory.ts`, which registers a Meteor method named `loadHistory`. This method receives parameters for room ID (`rid`), end timestamp, limit, and last-seen timestamp (`ls`). After validating the user and checking room access permissions, it delegates to `loadMessageHistory()` in `apps/meteor/app/lib/server/functions/loadMessageHistory.ts`.

The `loadMessageHistory()` function (line 9) performs the actual database query. It first fetches the room to determine hidden system message types via `Rooms.findOneById(rid, { projection: { sysMes: 1 } })`. It then computes which message types to hide using `getHiddenSystemMessages()`.

The core query uses `Messages.findVisibleByRoomIdBeforeTimestampNotContainingTypes()` (line 46), a specialized method on `MessagesRaw` that builds a MongoDB filter combining: room ID match (`rid`), timestamp before the `end` parameter (`ts: { $lt: end }`), excluding hidden message types (`t: { $nin: hiddenMessageTypes }`), and optionally filtering thread messages based on the `showThreadMessages` flag. The query uses `FindOptions` with `sort: { ts: -1 }` for reverse chronological order, `limit` for pagination, and `skip: offset` for page offset.

The results are passed through `normalizeMessagesForUser(records, userId)` which processes messages for the specific user (handling things like attachment visibility).

For unread message detection, the function checks if there are messages between the user's last-seen timestamp (`ls`) and the oldest loaded message. It uses `Messages.findVisibleByRoomIdBetweenTimestampsNotContainingTypes()` to find the `firstUnread` message and `Messages.countVisibleByRoomIdBetweenTimestampsNotContainingTypes()` to calculate `unreadNotLoaded` count — the number of unread messages not included in the current page.

The function returns `{ messages, firstUnread, unreadNotLoaded }`, giving the client everything needed to render the message list with proper unread indicators.

### Call Chain
```
Client → Meteor.call('loadHistory', rid, end, limit, ls)
→ server/methods/loadHistory.ts — validates user, checks room access
→ loadMessageHistory({ userId, rid, end, limit, ls, showThreadMessages, offset })
  → Rooms.findOneById(rid) — get room for hidden message types
  → getHiddenSystemMessages(room, hiddenSystemMessages)
  → Messages.findVisibleByRoomIdBeforeTimestampNotContainingTypes(rid, end, hiddenTypes, options, showThreadMessages)
  → normalizeMessagesForUser(records, userId)
  → Messages.findVisibleByRoomIdBetweenTimestampsNotContainingTypes() — firstUnread
  → Messages.countVisibleByRoomIdBetweenTimestampsNotContainingTypes() — unreadNotLoaded
→ returns { messages, firstUnread, unreadNotLoaded }
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/server/methods/loadHistory.ts` | Meteor method `loadHistory` — entry point |
| `apps/meteor/app/lib/server/functions/loadMessageHistory.ts` | `loadMessageHistory()` — core query logic |
| `packages/models/src/models/Messages.ts` | `MessagesRaw` — `findVisibleByRoomIdBeforeTimestampNotContainingTypes()` and other query methods |
| `packages/models/src/models/BaseRaw.ts` | `BaseRaw<T>` — underlying `find()`, cursor operations |
| `apps/meteor/app/utils/server/lib/normalizeMessagesForUser.ts` | `normalizeMessagesForUser()` — post-processing |
| `apps/meteor/app/lib/server/lib/getHiddenSystemMessages.ts` | `getHiddenSystemMessages()` — filters system message types |

### Key Symbols
loadMessageHistory, findVisibleByRoomIdBeforeTimestampNotContainingTypes, findVisibleByRoomIdBetweenTimestampsNotContainingTypes, countVisibleByRoomIdBetweenTimestampsNotContainingTypes, normalizeMessagesForUser, getHiddenSystemMessages, firstUnread, unreadNotLoaded, FindOptions, Messages, Rooms
