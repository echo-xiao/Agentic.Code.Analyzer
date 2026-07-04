# How do you create a new database model in Rocket.Chat?

## Plan

intent: unknown

## Gemini Answer

To create a new database model in Rocket.Chat, follow these steps:

1.  **Define the Model Interface:**
    *   Create a TypeScript interface for your model in the `@rocket.chat/model-typings` package.
    *   This interface must extend `IBaseModel<T>`, where `T` is the type of your document.
    *   Example file: `packages/model-typings/src/models/IBaseModel.ts`

2.  **Implement the Raw Model Class:**
    *   Create a new class that extends `BaseRaw` in the `packages/models/src/models` directory (or an EE-specific `raw` directory like `apps/meteor/ee/server/models/raw`).
    *   This class will handle direct MongoDB collection interactions.
    *   The constructor typically takes the MongoDB `db` instance and optionally a `trashCollection` for soft deletes.
    *   Example file: `packages/models/src/models/BaseRaw.ts`

3.  **Register the Model:**
    *   Register your new model using the `registerModel` function.
    *   This is usually done in `apps/meteor/server/models.ts` for core models or in specific service startup files for microservices.
    *   The `registerModel` function takes two arguments: the string name of your model interface (e.g., `'IAuditLogModel'`) and an instance of your `Raw` model class.
    *   Example file: `packages/models/src/proxify.ts` (where `registerModel` is defined).

This process ensures that your new model is properly integrated and available throughout the Rocket.Chat application.

## Tool Calls (8 calls, 34,302 tokens)

**Step 1:** `wiki({"question":"How do you create a new database model in Rocket.Chat?"})` → 836 tokens
**Step 2:** `search({"query":"IBaseModel","layer":"packages"})` → 68 tokens
**Step 3:** `search({"layer":"packages","query":"BaseRaw"})` → 64 tokens
**Step 4:** `search({"query":"registerModel"})` → 65 tokens
**Step 5:** `details({"symbolName":"IBaseModel","filename":"IBaseModel.ts"})` → 1027 tokens
**Step 6:** `details({"filename":"BaseRaw.ts","symbolName":"BaseRaw"})` → 1134 tokens
**Step 7:** `details({"filename":"proxify.ts","symbolName":"registerModel"})` → 130 tokens
**Step 8:** `search({"layer":"server","file":"models.ts","query":"registerModel"})` → 65 tokens

## Files Seen In Tool Results (7)

- `apps/meteor/ee/server/models/raw/AuditLog.ts`
- `packages/models/src/modelClasses.ts`
- `apps/meteor/server/models.ts`
- `packages/models/src/index.ts`
- `packages/model-typings/src/models/IBaseModel.ts`
- `packages/models/src/models/BaseRaw.ts`
- `packages/models/src/proxify.ts`
