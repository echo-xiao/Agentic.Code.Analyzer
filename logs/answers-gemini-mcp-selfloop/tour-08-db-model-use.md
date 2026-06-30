# How do you use a database model to query data in Rocket.Chat?

## Gemini Answer

In Rocket.Chat, database models are used to query data by extending the `BaseRaw` class, which provides a wrapper around MongoDB collection operations.

Here's how you use a database model to query data:

1.  **Model Definition**: All database models in Rocket.Chat extend `BaseRaw<T>`, where `T` is the document interface (e.g., `IMessage` for the `Messages` model). This `BaseRaw` class provides the fundamental methods for interacting with the MongoDB collection.
    *   **File**: `packages/models/src/models/BaseRaw.ts`

2.  **Accessing Models**: Models are typically accessed via proxified imports from `@rocket.chat/models`. For example, to access the `Messages` model, you would use:
    
```typescript
    import { Messages } from '@rocket.chat/models';
    ```

    The concrete implementation of the `Messages` model is `MessagesRaw`.
    *   **File**: `packages/models/src/models/Messages.ts`

3.  **Querying Data**: Once you have imported a model, you can use its methods (inherited from `BaseRaw`) to query the database. Some of the common query methods include:
    *   `find(query: Filter<T>, options?: FindOptions)`: Retrieves multiple documents matching the provided query.
    *   `findOne(query: Filter<T> | T['_id'], options?: any)`: Retrieves a single document matching the query or by its `_id`.
    *   `findOneById(_id: T['_id'], options?: any)`: Retrieves a single document by its `_id`.
    *   `countDocuments(query: Filter<T>, options?: CountDocumentsOptions)`: Counts the number of documents matching the query.
    *   `findPaginated(query: Filter<T>, options?: any)`: Retrieves documents with pagination support.

**Example (Conceptual):**


```typescript
import { Messages } from '@rocket.chat/models';

async function getRecentMessages(roomId: string) {
  const query = { rid: roomId };
  const options = { sort: { ts: -1 }, limit: 10 }; // Sort by timestamp descending, limit to 10
  const recentMessages = await Messages.find(query, options).toArray();
  return recentMessages;
}

async function getMessageById(messageId: string) {
  const message = await Messages.findOneById(messageId);
  return message;
}
```


**Call Chain:**
`search("model", layer="server")` → `search("BaseRaw", layer="packages")` → `implement("BaseRaw", filename="packages/models/src/models/BaseRaw.ts")` → `search("Messages", layer="packages")`

## Tool Calls (5 calls, 20,969 tokens)

**Step 1:** `search({"query":"model","layer":"server"})` → 789 tokens
**Step 2:** `graph({"direction":"down","query":"AppsModel","depth":2,"file":"packages/models/src/models/Apps.ts"})` → 34 tokens
**Step 3:** `search({"query":"BaseRaw","layer":"packages"})` → 360 tokens
**Step 4:** `implement({"symbolName":"BaseRaw","filename":"packages/models/src/models/BaseRaw.ts"})` → 1137 tokens
**Step 5:** `search({"query":"Messages","layer":"packages"})` → 796 tokens

## Files Seen In Tool Results (60)

- `apps/meteor/app/settings/server/SettingsRegistry.ts`
- `apps/meteor/server/models.ts`
- `apps/meteor/server/oauth2-server/model.ts`
- `apps/meteor/ee/server/apps/orchestrator.js`
- `packages/models/src/models/Apps.ts`
- `packages/model-typings/src/models/INpsModel.ts`
- `packages/model-typings/src/models/IAppsModel.ts`
- `packages/model-typings/src/models/ITeamModel.ts`
- `apps/meteor/tests/unit/server/services/user/service.tests.ts`
- `apps/meteor/tests/unit/server/services/banner/service.tests.ts`
- `packages/models/src/proxify.ts`
- `packages/model-typings/src/models/ISettingsModel.ts`
- `apps/meteor/tests/unit/app/apps/server/mocks/models/index.js`
- `apps/meteor/tests/unit/app/apps/server/mocks/models/Users.mock.js`
- `apps/meteor/tests/unit/app/apps/server/mocks/models/Rooms.mock.js`
- `apps/meteor/tests/unit/app/apps/server/mocks/models/Messages.mock.js`
- `apps/meteor/tests/unit/app/apps/server/mocks/models/BaseModel.mock.js`
- `apps/meteor/ee/server/models/startup.ts`
- `apps/meteor/ee/server/models/Users.ts`
- `apps/meteor/ee/server/models/ReadReceipts.ts`
- `apps/meteor/ee/server/models/OmnichannelServiceLevelAgreements.ts`
- `apps/meteor/ee/server/models/LivechatUnitMonitors.ts`
- `apps/meteor/ee/server/models/LivechatUnit.ts`
- `apps/meteor/ee/server/models/LivechatTag.ts`
- `apps/meteor/ee/server/models/LivechatRooms.ts`
- `apps/meteor/ee/server/models/LivechatInquiry.ts`
- `apps/meteor/ee/server/models/LivechatDepartmentAgents.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/models/src/models/BaseUploadModel.ts`
- `packages/models/src/models/UsersSessions.ts`
- `packages/models/src/models/IntegrationHistory.ts`
- `packages/models/src/models/ModerationReports.ts`
- `packages/models/src/models/Reports.ts`
- `packages/models/src/models/Subscriptions.ts`
- `packages/models/src/index.ts`
- `packages/apps-engine/src/server/bridges/RoomBridge.ts`
- `ee/packages/omnichannel-services/src/OmnichannelTranscript.fixtures.ts`
- `packages/models/src/models/Messages.ts`
- `apps/meteor/client/views/admin/engagementDashboard/messages/MessagesTab.tsx`
- `apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/MessageStep.tsx`
- `apps/meteor/client/views/room/MessageList/hooks/useMessages.ts`
- `apps/meteor/app/ui/client/lib/ChatMessages.ts`
- `apps/meteor/tests/end-to-end/api/livechat/20-messages.ts`
- `packages/livechat/src/components/Messages/MessageSeparator/index.tsx`
- `ee/packages/pdf-worker/src/strategies/ChatTranscript.ts`
- `packages/ui-video-conf/src/VideoConfMessage/VideoConfMessageSkeleton.tsx`
- `packages/ui-contexts/src/ToastMessagesContext.ts`
- `packages/rest-typings/src/v1/groups/GroupsMessagesProps.ts`
- `packages/rest-typings/src/v1/dm/DmMessagesProps.ts`
- `packages/rest-typings/src/v1/channels/ChannelsMessagesProps.ts`
- `packages/model-typings/src/models/IMessagesModel.ts`
- `packages/livechat/src/hooks/useRoomMessagesSubscription.ts`
- `packages/livechat/src/hooks/useDeleteMessageSubscription.ts`
- `packages/livechat/src/components/Messages/index.ts`
- `packages/livechat/src/components/Messages/constants.ts`
- `packages/livechat/src/components/Messages/VideoAttachment/stories.tsx`
- `packages/livechat/src/components/Messages/VideoAttachment/index.tsx`
- `packages/livechat/src/components/Messages/TypingIndicator/stories.tsx`
- `packages/livechat/src/components/Messages/TypingIndicator/index.tsx`
- `packages/livechat/src/components/Messages/TypingDots/stories.tsx`
