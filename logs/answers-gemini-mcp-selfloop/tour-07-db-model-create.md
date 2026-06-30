# How do you create a new database model in Rocket.Chat?

## Gemini Answer

To create a new database model in Rocket.Chat, follow these steps:

1.  **Define the document interface**: Create a TypeScript interface for your document in `packages/core-typings`. This interface should extend `IRocketChatRecord`.
2.  **Define the model interface**: Create another TypeScript interface for your model in `packages/model-typings`. This interface should extend `IBaseModel<T>`, where `T` is your document interface.
3.  **Implement the model class**: In the `packages/models/src/models` directory, create a new class that extends `BaseRaw<T>`, where `T` is your document interface. This class will wrap MongoDB collection operations like `find`, `findOne`, `insertOne`, `updateOne`, and `deleteOne`. You can also override the `modelIndexes()` method to define MongoDB indexes.
4.  **Register the model**: Register your new model in the server startup process using `registerModel`, which is found in `packages/models/src/proxify.ts`. This allows the model to be accessed via proxified imports, for example, `import { MyNewModel } from '@rocket.chat/models'`.

**Call Chain:**

The core process involves:
`packages/core-typings` (document interface) → `packages/model-typings` (model interface) → `packages/models/src/models/BaseRaw.ts` (base model implementation) → `packages/models/src/proxify.ts` (model registration).

## Tool Calls (8 calls, 29,986 tokens)

**Step 1:** `search({"layer":"packages","query":"model"})` → 520 tokens
**Step 2:** `implement({"filename":"packages/models/src/models/Users.ts","symbolName":"Users"})` → 53 tokens
**Step 3:** `implement({"filename":"packages/models/src/models/Users.ts","symbolName":"Users"})` → 53 tokens
**Step 4:** `search({"query":"BaseRaw","layer":"packages"})` → 211 tokens
**Step 5:** `graph({"direction":"up","query":"BaseRaw","layer":"packages","depth":2})` → 537 tokens
**Step 6:** `implement({"filename":"packages/models/src/models/Subscriptions.ts","symbolName":"Subscriptions"})` → 63 tokens
**Step 7:** `implement({"filename":"packages/models/src/models/Subscriptions.ts","symbolName":""})` → 8 tokens
**Step 8:** `search({"query":"registerModel","layer":"server"})` → 214 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 2/3 |
| Tool calls | 8 |
| Total tokens | 29,986 |
| Pass | NO |
