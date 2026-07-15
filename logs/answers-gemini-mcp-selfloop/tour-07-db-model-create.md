# How do you create a new database model in Rocket.Chat?

## Plan

intent: architecture

## Gemini Answer

To create a new database model in Rocket.Chat, you typically extend the `BaseRaw` class, which provides fundamental CRUD (Create, Read, Update, Delete) operations and integrates with MongoDB.

Here's the general process:

1.  **Define the Document Interface:**
    First, define a TypeScript interface that represents the structure of the documents your new model will manage. This interface should extend `ITimestampModel` (or a similar base interface if your documents require `_id`, `_createdAt`, and `_updatedAt` fields).

2.  **Create the Model Class:**
    Create a new class for your model that extends `BaseRaw<T>`, where `T` is the document interface you defined in the previous step.

    *   **File:** `packages/models/src/models/YourNewModel.ts` (replace `YourNewModel` with your model's name).

3.  **Implement the Constructor:**
    In your model's constructor, you'll call the `super()` constructor of `BaseRaw`. This requires passing:
    *   A MongoDB `Db` instance.
    *   The name of the MongoDB collection for your model.
    *   Optionally, a `trash` collection for soft-deleting documents.

    **Example (from `packages/models/src/models/Apps.ts`):**
    
```typescript
    class AppsModel extends BaseRaw<any> implements IAppsModel {
      constructor(db: Db) {
        super(db, 'apps'); // 'apps' is the collection name
      }
      // ...
    }
    ```


4.  **Define `modelIndexes()` (Optional but Recommended):**
    Override the `modelIndexes()` method to define MongoDB indexes for your collection. This is crucial for query performance. This method should return an array of `IndexDescription` objects.

    **Example (conceptual):**
    
```typescript
    class YourNewModel extends BaseRaw<IYourNewModel> {
      // ...
      protected modelIndexes(): IndexDescription[] {
        return [
          { key: { name: 1 }, name: 'name_1', unique: true },
          { key: { status: 1, createdAt: -1 }, name: 'status_createdAt_-1' },
        ];
      }
    }
    ```


5.  **Instantiate and Export the Model:**
    In a central location (e.g., `packages/models/src/index.ts` or a service file), you would instantiate your new model and export it. Rocket.Chat often uses a `proxify` helper for this, as seen with the `Apps` model.

    **Core Base Class:**
    *   `packages/models/src/models/BaseRaw.ts`: Provides the foundational methods for database interaction.

    **Example Model Implementation:**
    *   `packages/models/src/models/Apps.ts`: Demonstrates how `AppsModel` extends `BaseRaw` and is instantiated.

## Tool Calls (8 calls, 50,774 tokens)

**Step 1:** `plan({"question":"How do you create a new database model in Rocket.Chat?","intent":"architecture"})` → 3883 tokens
**Step 2:** `search({"query":"RawCollection","layer":"packages"})` → 25 tokens
**Step 3:** `search({"layer":"packages","query":"Base","file":"models"})` → 376 tokens
**Step 4:** `details({"filename":"BaseRaw.ts","symbolName":"BaseRaw"})` → 1134 tokens
**Step 5:** `details({"filename":"Apps.ts","symbolName":"Apps"})` → 49 tokens
**Step 6:** `search({"layer":"packages","query":"AppsRaw","file":"models"})` → 24 tokens
**Step 7:** `search({"query":"AppsModel","file":"models","layer":"packages"})` → 113 tokens
**Step 8:** `details({"filename":"Apps.ts","symbolName":"AppsModel"})` → 63 tokens

## Files Seen In Tool Results (47)

- `apps/meteor/app/livechat/server/lib/RoutingManager.ts`
- `ee/packages/presence/src/lib/PresenceReaper.ts`
- `ee/apps/queue-worker/src/service.ts`
- `apps/meteor/client/views/room/index.ts`
- `packages/models/src/models/Apps.ts`
- `packages/models/src/models/AppsPersistence.ts`
- `packages/models/src/models/Invites.ts`
- `packages/models/src/models/InstanceStatus.ts`
- `apps/meteor/client/lib/chats/data.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/modify/ModifyCreator.ts`
- `packages/apps-engine/src/server/accessors/ModifyExtender.ts`
- `packages/agenda/src/createJob.ts`
- `apps/meteor/ee/server/apps/storage/AppRealStorage.ts`
- `apps/meteor/app/apps/server/converters/settings.js`
- `apps/meteor/app/utils/client/lib/SDKClient.ts`
- `apps/meteor/app/apps/server/bridges/messages.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/extenders/MessageExtender.ts`
- `apps/meteor/app/apps/server/converters/users.js`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/beforeNewRoom.ts`
- `apps/meteor/app/apps/server/converters/uploads.js`
- `apps/meteor/ee/server/local-services/instance/service.ts`
- `apps/meteor/app/apps/server/converters/rooms.js`
- `packages/models/src/models/FederationRoomEvents.ts`
- `packages/models/src/models/Messages.ts`
- `apps/meteor/app/apps/server/converters/messages.js`
- `apps/meteor/app/apps/server/bridges/rooms.ts`
- `packages/models/src/models/EmailMessageHistory.ts`
- `apps/meteor/client/meteor/minimongo/MinimongoError.ts`
- `packages/apps-engine/src/definition/accessors/IModify.ts`
- `packages/ui-client/src/helpers/getBaseURI.ts`
- `packages/ui-client/src/components/CustomScrollbars/BaseScrollbars.tsx`
- `packages/ui-avatar/src/components/BaseAvatar.tsx`
- `packages/tracing/src/traceDatabaseCalls.ts`
- `packages/rest-typings/src/v1/groups/BaseProps.ts`
- `packages/models/src/models/BaseUploadModel.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/models/src/dummy/BaseDummy.ts`
- `packages/model-typings/src/models/IBaseUploadsModel.ts`
- `packages/model-typings/src/models/IBaseModel.ts`
- `packages/livechat/src/helpers/baseUrl.ts`
- `packages/core-typings/src/IMessage/MessageAttachment/MessageAttachmentBase.ts`
- `packages/base64/jest.config.ts`
- `packages/base64/src/base64.ts`
- `packages/apps-engine/src/server/bridges/BaseBridge.ts`
- `packages/models/src/index.ts`
- `packages/model-typings/src/models/IOAuthAppsModel.ts`
- `packages/model-typings/src/models/IAppsModel.ts`
