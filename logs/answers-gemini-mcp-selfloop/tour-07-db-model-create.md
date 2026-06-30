# How do you create a new database model in Rocket.Chat?

## Gemini Answer

To create a new database model in Rocket.Chat, follow this architectural pattern:

1.  **Define the Document Interface:** Create an interface for your document in `packages/core-typings` that extends `IRocketChatRecord`. This defines the structure of the data stored in the database.
2.  **Define the Model Interface:** Create an interface for your model in `packages/model-typings` that extends `IBaseModel<T>`, where `T` is your document interface. This defines the methods and properties available for interacting with your collection.
3.  **Implement the Model Class:** In the `packages/models` directory, create a new class that extends `BaseRaw<T>`. This class will implement the methods defined in your model interface and provide the actual database operations (e.g., `find`, `findOne`, `insertOne`, `updateOne`, `deleteOne`). You can also override the `modelIndexes()` method to define MongoDB indexes for your collection.
    *   **Example:** `packages/models/src/models/UsersSessions.ts` extends `BaseRaw`.
4.  **Register the Model:** Register your new model via `registerModel` during server startup.
5.  **Access the Model:** Models are accessed through proxified imports, for example: `import { Messages } from '@rocket.chat/models'`. These imports are routed through `LocalBroker`.

**Call Chain Example (from `BaseRaw` upstream):**

`apps/meteor/server/main.ts` → `ee/apps/ddp-streamer/src/configureServer.ts` → `ee/packages/presence/src/Presence.ts` → `packages/models/src/models/UsersSessions.ts` → `packages/models/src/models/BaseRaw.ts`

This chain shows how `BaseRaw` is extended by `UsersSessions`, which is then used by the `Presence` service, configured in `ddp-streamer`, and ultimately part of the server's main startup.

## Tool Calls (8 calls, 29,471 tokens)

**Step 1:** `search({"query":"BaseDb.model","layer":"packages"})` → 14 tokens
**Step 2:** `search({"layer":"packages","query":"collection"})` → 245 tokens
**Step 3:** `graph({"direction":"down","file":"packages/models/src/models/BaseRaw.ts","query":"BaseRaw"})` → 191 tokens
**Step 4:** `implement({"filename":"packages/models/src/models/Sessions.ts","symbolName":"Sessions"})` → 57 tokens
**Step 5:** `search({"query":"class Sessions","layer":"packages"})` → 302 tokens
**Step 6:** `implement({"filename":"packages/models/src/models/Sessions.ts","symbolName":"Sessions"})` → 57 tokens
**Step 7:** `graph({"direction":"up","file":"packages/models/src/models/BaseRaw.ts","query":"BaseRaw"})` → 1337 tokens
**Step 8:** `implement({"symbolName":"UsersSessions","filename":"packages/models/src/models/UsersSessions.ts"})` → 63 tokens

## Files Seen In Tool Results (55)

- `packages/ddp-client/src/MinimalDDPClient.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/core-services/src/lib/mongo.ts`
- `packages/agenda/src/Agenda.ts`
- `packages/models/src/models/Sessions.ts`
- `apps/meteor/app/crowd/server/crowd.ts`
- `apps/meteor/client/meteor/minimongo/LocalCollection.ts`
- `apps/meteor/server/database/trash.ts`
- `apps/meteor/client/meteor/minimongo/MinimongoCollection.ts`
- `apps/meteor/packages/meteor-run-as-user/lib/collection.overwrites.js`
- `packages/models/src/index.ts`
- `packages/models/src/models/Users.ts`
- `packages/rest-typings/src/v1/users/UsersSendConfirmationEmailParamsPOST.ts`
- `apps/meteor/app/livechat/server/hooks/processRoomAbandonment.ts`
- `packages/rest-typings/src/v1/channels/ChannelsGetAllUserMentionsByChannelProps.ts`
- `packages/rest-typings/src/v1/omnichannel.ts`
- `apps/meteor/client/views/mediaCallHistory/useMediaCallInternalHistoryActions.ts`
- `packages/mongo-adapter/src/common.ts`
- `packages/core-typings/src/ILivechatDepartment.ts`
- `packages/core-typings/src/IRoom.ts`
- `packages/models/src/models/UsersSessions.ts`
- `ee/packages/presence/src/Presence.ts`
- `ee/apps/ddp-streamer/src/configureServer.ts`
- `apps/meteor/server/main.ts`
- `apps/meteor/server/methods/userPresence.ts`
- `packages/mock-providers/src/MockedAppRootBuilder.tsx`
- `packages/core-services/src/LocalBroker.ts`
- `apps/meteor/ee/server/startup/presence.ts`
- `ee/apps/ddp-streamer/src/DDPStreamer.ts`
- `packages/models/src/models/Subscriptions.ts`
- `apps/meteor/server/lib/readMessages.ts`
- `apps/meteor/server/services/room/service.ts`
- `ee/packages/federation-matrix/src/events/edu.ts`
- `apps/meteor/client/views/room/body/hooks/useUnreadMessages.ts`
- `apps/meteor/client/lib/chats/readStateManager.ts`
- `apps/meteor/server/methods/readMessages.ts`
- `apps/meteor/app/api/server/v1/subscriptions.ts`
- `apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts`
- `apps/meteor/server/services/messages/service.ts`
- `packages/models/src/models/Reports.ts`
- `apps/meteor/server/lib/moderation/reportMessage.ts`
- `apps/meteor/app/apps/server/bridges/moderation.ts`
- `packages/apps-engine/src/server/bridges/ModerationBridge.ts`
- `apps/meteor/client/views/admin/moderation/ModerationConsoleTableRow.tsx`
- `apps/meteor/client/views/admin/moderation/ModerationConsoleTable.tsx`
- `apps/meteor/client/views/admin/moderation/UserReports/ModConsoleUsersTable.tsx`
- `apps/meteor/client/views/admin/moderation/UserReports/ModConsoleUserTableRow.tsx`
- `apps/meteor/app/api/server/v1/chat.ts`
- `packages/models/src/models/ModerationReports.ts`
- `apps/meteor/app/api/server/v1/moderation.ts`
- `packages/models/src/models/IntegrationHistory.ts`
- `apps/meteor/app/integrations/server/methods/clearIntegrationHistory.ts`
- `apps/meteor/app/integrations/server/methods/outgoing/deleteOutgoingIntegration.ts`
- `apps/meteor/app/integrations/server/api/api.ts`
- `apps/meteor/app/api/server/v1/integrations.ts`
