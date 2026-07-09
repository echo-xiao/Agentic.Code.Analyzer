# How do you create a new database model in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

To create a new database model in Rocket.Chat, you follow a three-step process:

1.  **Define the Model Interface**: Define the TypeScript interface for your new model in `@rocket.chat/model-typings`. This interface should extend `IBaseModel<T>` and include methods for database operations. For example, the `ICannedResponseModel` interface is defined in `packages/model-typings/src/models/ICannedResponseModel.ts`.

2.  **Implement the Raw Model Class**: Create a raw MongoDB collection class for your model in `packages/models`. This class will extend `BaseRaw` and implement the methods defined in your model interface. The constructor typically takes a `Db` instance and optionally a `trashCollection`. An example is `CannedResponseRaw` in `apps/meteor/ee/server/models/raw/CannedResponse.ts`.

3.  **Register the Model**: Register your new model in `apps/meteor/server/models.ts` using the `registerModel` function. This function takes the model's interface name (e.g., `'IYourNewModel'`) and an instance of your raw model class, passing the database instance (`db`) to its constructor. The `registerModel` function itself is defined in `packages/models/src/proxify.ts`.

This process ensures type safety and proper integration with the application's data access layer.

## Tool Calls (8 calls, 27,208 tokens)

**Step 1:** `wiki({"question":"How do you create a new database model in Rocket.Chat?"})` → 917 tokens
**Step 2:** `search({"query":"registerModel"})` → 65 tokens
**Step 3:** `details({"filename":"proxify.ts","symbolName":"registerModel"})` → 130 tokens
**Step 4:** `search({"query":"ICannedResponseModel"})` → 76 tokens
**Step 5:** `details({"symbolName":"ICannedResponseModel","filename":"ICannedResponseModel.ts"})` → 384 tokens
**Step 6:** `search({"query":"CannedResponseRaw"})` → 72 tokens
**Step 7:** `details({"filename":"CannedResponse.ts","symbolName":"CannedResponseRaw"})` → 524 tokens
**Step 8:** `search({"query":"CannedResponseRaw","layer":"server"})` → 72 tokens

## Files Seen In Tool Results (4)

- `apps/meteor/server/models.ts`
- `packages/models/src/proxify.ts`
- `packages/model-typings/src/models/ICannedResponseModel.ts`
- `apps/meteor/ee/server/models/raw/CannedResponse.ts`
