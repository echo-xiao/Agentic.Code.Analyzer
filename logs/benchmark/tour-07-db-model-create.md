# How do you create a new database model in Rocket.Chat?

## Answer

Creating a new database model in Rocket.Chat follows a three-layer architecture: a TypeScript interface defining the document shape (in `core-typings`), a model interface defining query methods (in `model-typings`), and a concrete implementation class extending `BaseRaw<T>` (in `packages/models`). The model is then registered with the model registry so it can be imported and used throughout the codebase.

The base class `BaseRaw<T>` (in `packages/models/src/models/BaseRaw.ts`) wraps the MongoDB native driver's `Collection<T>` and provides standard CRUD operations: `findOne()`, `find()`, `insertOne()`, `insertMany()`, `updateOne()`, `updateMany()`, `deleteOne()`, `deleteMany()`, plus pagination helpers like `findPaginated()`. It accepts a `Db` instance, a collection name string, and an optional trash collection for soft-delete support. Subclasses override `modelIndexes()` to declare their MongoDB indexes.

For example, `MessagesRaw` in `packages/models/src/models/Messages.ts` (line 41) extends `BaseRaw<IMessage>` and implements `IMessagesModel`. The constructor calls `super(db, 'message', trash)`, binding the class to the `message` MongoDB collection. `MessagesRaw` defines 80+ specialized query methods like `findVisibleByRoomIdBeforeTimestampNotContainingTypes()`, `findByRoomIdAndType()`, `setReactions()`, `removeByRoomId()`, etc. Each method builds MongoDB filter/update objects and delegates to the base class CRUD operations.

The `IMessage` interface (from `@rocket.chat/core-typings`) defines the document schema with fields like `_id`, `rid`, `msg`, `ts`, `u` (sender), `attachments`, `reactions`, etc. The `IMessagesModel` interface (from `@rocket.chat/model-typings`) declares all the query method signatures that `MessagesRaw` must implement.

Model registration happens in `apps/meteor/server/models.ts`. At line 131, `registerModel('IMessagesModel', new MessagesRaw(db, trashCollection))` binds the model instance to a string key. This uses the `registerModel()` function from `@rocket.chat/models` which stores models in a global registry. Consumer code imports models via `import { Messages } from '@rocket.chat/models'`, which returns a proxied instance that delegates to the registered implementation.

To create a new model, you would:
1. Define the document interface in `packages/core-typings` (e.g., `IMyDocument`)
2. Define the model interface in `packages/model-typings` (e.g., `IMyDocumentModel extends IBaseModel<IMyDocument>`)
3. Create the implementation class in `packages/models/src/models/` (e.g., `MyDocumentRaw extends BaseRaw<IMyDocument> implements IMyDocumentModel`)
4. Register it in `apps/meteor/server/models.ts` with `registerModel('IMyDocumentModel', new MyDocumentRaw(db, trashCollection))`
5. Export it from `packages/models/src/index.ts`

### Call Chain
```
IMyDocument (core-typings) — document shape
→ IMyDocumentModel (model-typings) — query method interface
→ MyDocumentRaw extends BaseRaw<IMyDocument> (packages/models/src/models/)
→ registerModel('IMyDocumentModel', new MyDocumentRaw(db, trash)) in server/models.ts
→ import { MyDocument } from '@rocket.chat/models' — proxied access
```

### Key Files
| File | Role |
|------|------|
| `packages/models/src/models/Messages.ts` | `MessagesRaw extends BaseRaw<IMessage>` — example model with 80+ query methods |
| `packages/models/src/models/BaseRaw.ts` | `BaseRaw<T>` — base class with find/insert/update/delete |
| `apps/meteor/server/models.ts` | Model registration via `registerModel()` (line 131 for Messages) |
| `packages/core-typings/src/IMessage/IMessage.ts` | `IMessage` document interface |
| `packages/model-typings/src/models/IMessagesModel.ts` | `IMessagesModel` — model interface with query method signatures |
| `packages/models/src/index.ts` | Exports all model proxies (Messages, Rooms, Users, etc.) |
| `packages/models/src/proxify.ts` | `proxify()` creates lazy proxy for model access |

### Key Symbols
BaseRaw, MessagesRaw, IMessage, IMessagesModel, registerModel, proxify, findOne, find, insertOne, updateOne, deleteOne, findPaginated, modelIndexes, trashCollection, findVisibleByRoomIdBeforeTimestampNotContainingTypes
