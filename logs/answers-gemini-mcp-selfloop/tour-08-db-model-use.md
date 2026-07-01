# How do you use a database model to query data in Rocket.Chat?

## Gemini Answer

To query data using a database model in Rocket.Chat, you follow a specific pattern that leverages `BaseRaw<T>` and the `@rocket.chat/models` package.

Here's the general process:

1.  **Model Definition:**
    *   Document interfaces are defined in `packages/core-typings/src/IRocketChatRecord.ts` (e.g., `IMessage`).
    *   Model interfaces extend `IBaseModel<T>` in `packages/model-typings/src/models/IBaseModel.ts` (e.g., `IMessagesModel`).
    *   The actual model class is implemented in the `packages/models` directory, extending `BaseRaw<T>`. For example, `AppsModel` in `packages/models/src/models/Apps.ts` extends `BaseRaw<any>`. `BaseRaw<T>` provides methods for MongoDB collection operations like `find`, `findOne`, `insertOne`, `updateOne`, and `deleteOne`.

2.  **Model Registration:**
    *   Models are registered during server startup via `registerModel` in `packages/models/src/proxify.ts`.
    *   This registration happens in `apps/meteor/server/models.ts`, where various models (like `AppsModel`, `MessagesRaw`) are instantiated and made available.

3.  **Accessing Models for Queries:**
    *   Models are accessed through proxified imports, typically from `@rocket.chat/models`. For instance, `import { Messages } from '@rocket.chat/models'` would give you access to the `Messages` model.
    *   These models, being extensions of `BaseRaw`, expose methods like `find()` and `findOne()` to query data.

**Call Chain Example (Conceptual for `Messages` model):**

`packages/models/src/models/Messages.ts` (`MessagesRaw` class) → `packages/models/src/index.ts` (`registerServiceModels`) → `apps/meteor/server/models.ts` (instantiation and registration of `MessagesRaw` as `Messages`) → Any server-side code importing `{ Messages } from '@rocket.chat/models'` and using its query methods.

**Key Files:**

*   `packages/models/src/models/BaseRaw.ts`: The base class for all database models, providing core MongoDB operations.
*   `packages/models/src/models/Apps.ts`: An example of a model extending `BaseRaw`.
*   `packages/models/src/models/Messages.ts`: The implementation of the `MessagesRaw` model.
*   `packages/models/src/proxify.ts`: Contains `registerModel` for model registration.
*   `apps/meteor/server/models.ts`: Where models are instantiated and registered for use in the server.
*   `packages/model-typings/src/models/IBaseModel.ts`: Defines the interface for base models.
*   `packages/core-typings/src/IRocketChatRecord.ts`: Defines the base interface for document records.

## Tool Calls (8 calls, 35,861 tokens)

**Step 1:** `search({"query":"Model","layer":"server"})` → 785 tokens
**Step 2:** `graph({"direction":"down","layer":"packages","query":"BaseRaw"})` → 194 tokens
**Step 3:** `implement({"filename":"packages/models/src/models/Apps.ts","symbolName":"AppsModel"})` → 67 tokens
**Step 4:** `graph({"query":"AppsModel","layer":"packages","direction":"up"})` → 38 tokens
**Step 5:** `implement({"filename":"apps/meteor/server/models.ts","symbolName":"models"})` → 46 tokens
**Step 6:** `search({"layer":"packages","query":"Messages"})` → 798 tokens
**Step 7:** `graph({"query":"MessagesRaw","file":"packages/models/src/models/Messages.ts","direction":"up"})` → 293 tokens
**Step 8:** `implement({"filename":"ee/apps/omnichannel-transcript/src/service.ts","symbolName":"service"})` → 182 tokens

## Files Seen In Tool Results (60)

- `apps/meteor/server/oauth2-server/model.ts`
- `apps/meteor/server/models.ts`
- `apps/meteor/app/settings/server/SettingsRegistry.ts`
- `packages/models/src/models/Apps.ts`
- `apps/meteor/ee/server/apps/orchestrator.js`
- `packages/model-typings/src/models/INpsModel.ts`
- `packages/model-typings/src/models/IAppsModel.ts`
- `packages/model-typings/src/models/ITeamModel.ts`
- `apps/meteor/tests/unit/server/services/user/service.tests.ts`
- `apps/meteor/tests/unit/server/services/banner/service.tests.ts`
- `packages/models/src/models/Imports.ts`
- `packages/models/src/proxify.ts`
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
- `packages/models/src/index.ts`
- `packages/models/src/models/Messages.ts`
- `packages/apps-engine/src/server/bridges/RoomBridge.ts`
- `ee/packages/omnichannel-services/src/OmnichannelTranscript.fixtures.ts`
- `apps/meteor/client/views/admin/engagementDashboard/messages/MessagesTab.tsx`
- `apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/MessageStep.tsx`
- `apps/meteor/client/views/room/MessageList/hooks/useMessages.ts`
- `apps/meteor/app/ui/client/lib/ChatMessages.ts`
- `apps/meteor/tests/end-to-end/api/livechat/20-messages.ts`
- `packages/livechat/src/components/Messages/MessageSeparator/index.tsx`
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
- `ee/apps/queue-worker/src/service.ts`
- `ee/apps/presence-service/src/service.ts`
- `ee/apps/omnichannel-transcript/src/service.ts`
- `ee/apps/ddp-streamer/src/service.ts`
- `ee/apps/authorization-service/src/service.ts`
- `ee/apps/account-service/src/service.ts`
- `apps/meteor/server/services/meteor/service.ts`
