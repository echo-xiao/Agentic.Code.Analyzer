# How do you create a new database model in Rocket.Chat?

## Plan

intent: pattern

## Gemini Answer

To create a new database model in Rocket.Chat, follow this pattern:

**Flow:** Define Document Interface → Define Model Interface → Implement Model Class → Register Model

**Core Files and Their Roles:**

1.  **Document Interface:**
    *   **File:** `packages/core-typings/src/IRocketChatRecord.ts` (or a similar path for your specific document)
    *   **Role:** Define the structure of your MongoDB document. This interface should extend `IRocketChatRecord`.

2.  **Model Interface:**
    *   **File:** `packages/model-typings/src/models/IBaseModel.ts` (or a similar path for your specific model)
    *   **Role:** Define the interface for your model, extending `IBaseModel<T>`, where `T` is your document interface.

3.  **Model Implementation:**
    *   **File:** `packages/models/src/models/BaseRaw.ts`
    *   **Role:** Implement your model class by extending `BaseRaw`. This class provides methods for interacting with your MongoDB collection (e.g., `find`, `findOne`, `insertOne`, `updateOne`, `deleteOne`). You can override the `modelIndexes()` method to define MongoDB indexes for your collection.

4.  **Model Registration:**
    *   **File:** `packages/models/src/proxify.ts`
    *   **Role:** Register your model using the `registerModel` function. This function takes the model's name and an instance (or a function returning an instance) of your model class. This registration typically occurs during server startup.

## Tool Calls (5 calls, 11,117 tokens)

**Step 1:** `plan({"intent":"pattern","question":"How do you create a new database model in Rocket.Chat?"})` → 253 tokens
**Step 2:** `search({"query":"IBaseModel"})` → 68 tokens
**Step 3:** `graph({"file":"IBaseModel.ts","query":"IBaseModel","move":"expand"})` → 211 tokens
**Step 4:** `details({"symbolName":"BaseRaw","filename":"BaseRaw.ts"})` → 1134 tokens
**Step 5:** `details({"filename":"proxify.ts","symbolName":"registerModel"})` → 130 tokens

## Files Seen In Tool Results (9)

- `packages/model-typings/src/models/IBaseModel.ts`
- `packages/model-typings/src/models/IBaseUploadsModel.ts`
- `packages/models/src/models/BaseUploadModel.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/models/src/dummy/BaseDummy.ts`
- `packages/models/src/models/Integrations.ts`
- `ee/packages/federation-matrix/src/FederationMatrix.ts`
- `packages/models/src/proxify.ts`
- `ee/apps/ddp-streamer/src/Client.ts`
