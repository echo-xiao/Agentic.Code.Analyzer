# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Gemini Answer

This is the key. The `NotificationsModule` reveals the true usage pattern. It creates and manages a large number of specific streamer instances for different event types.

This discovery confirms that changing the core `Streamer` module would have a massive blast radius. It is not limited to a single admin panel, but instead touches almost every real-time feature in the application.

Here is a summary of the findings:

*   **Core `Streamer` Files**: The primary server-side implementation is the `Streamer` class in `apps/meteor/server/modules/streamer/streamer.module.ts`. Its client-side counterpart for receiving events is in `apps/meteor/client/lib/streamer/streamer.ts`.

*   **Central Instantiation Hub**: The `NotificationsModule`, located in `apps/meteor/server/modules/notifications/notifications.module.ts`, is a central hub that creates and exposes numerous specialized streamer instances.

*   **Affected Streams**: The `NotificationsModule` creates streamers for a wide array of features, including:
    *   `streamRoomMessage`: Core message broadcasting.
    *   `streamRoom` & `streamRoomData`: Room-specific events.
    *   `streamUser` & `streamPresence`: User-specific notifications and presence status (online, away, etc.).
    *   `streamLivechatRoom`: Live Chat events.
    *   `streamRoles`: Role and permission changes.
    *   `streamApps`: Events related to the app marketplace.
    *   And many more, covering importers, canned responses, and general notifications.

### Conclusion

The blast radius of changing the core `Streamer` module is **extremely large**. It is a foundational module for the real-time data flow in Rocket.Chat.

A change to the `Streamer` class in `apps/meteor/server/modules/streamer/streamer.module.ts` would impact virtually all real-time features across the application. This includes core chat functionality, live chat, user presence, and administrative updates. Any modification would require careful testing across all of these areas to avoid regressions.

The call chain for most real-time events follows this pattern:

`Service Event Trigger → NotificationsModule.stream<Name> → Streamer._emit() → DDP WebSocket → Client Streamer.receive()`

## Tool Calls (8 calls, 32,821 tokens)

**Step 1:** `search({"query":"Streamer"})` → 508 tokens
**Step 2:** `graph({"mode":"impact","direction":"up","query":"Streamer"})` → 320 tokens
**Step 3:** `graph({"mode":"impact","direction":"up","query":"StreamerCentral"})` → 164 tokens
**Step 4:** `implement({"symbolName":"StreamerCentral","filename":"apps/meteor/server/modules/streamer/streamer.module.ts"})` → 65 tokens
**Step 5:** `implement({"symbolName":"StreamerCentralClass","filename":"apps/meteor/server/modules/streamer/streamer.module)` → 87 tokens
**Step 6:** `search({"query":"streamRoomMessage"})` → 187 tokens
**Step 7:** `implement({"symbolName":"streamRoomMessage","filename":"apps/meteor/server/modules/notifications/notifications)` → 66 tokens
**Step 8:** `implement({"symbolName":"NotificationsModule","filename":"apps/meteor/server/modules/notifications/notificatio)` → 843 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 3/5 |
| Symbols hit | 5/5 |
| Tool calls | 8 |
| Total tokens | 32,821 |
| Pass | NO |
