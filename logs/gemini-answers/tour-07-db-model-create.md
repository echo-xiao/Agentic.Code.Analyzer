# How do you create a new database model in Rocket.Chat?

## Gemini Answer

To create a new database model in Rocket.Chat, follow these steps:

**Call Chain:**

1.  **Define Document Interface:** Start by defining the document interface in `core-typings`. This interface should extend `IRocketChatRecord`.
2.  **Define Model Interface:** Next, define the model interface in `model-typings`. This interface should extend `IBaseModel<T>`.
3.  **Implement Model Class:** Implement a new class in the `packages/models` directory. This class must extend `BaseRaw<T>`, which is found in `packages/models/src/models/BaseRaw.ts`. The `BaseRaw` class provides methods for MongoDB collection operations like `find`, `findOne`, `insertOne`, `updateOne`, and `deleteOne`, and an override for `modelIndexes()` to define MongoDB indexes.
4.  **Register Model:** Finally, register the new model during server startup using `registerModel`, which is part of the `proxify` mechanism located in `packages/models/src/proxify.ts`. The `registerModel` function is called by `registerServiceModels` in `packages/models/src/index.ts`.

**Key Files and Symbols:**

*   `packages/models/src/models/BaseRaw.ts`: The base class for all database models, providing core MongoDB operations.
*   `packages/models/src/proxify.ts`: Contains the `registerModel` function used for registering new models.
*   `packages/models/src/index.ts`: The entry point for registering service models via `registerServiceModels`.

**Example Model Usage (from existing models):**

Models like `Users` and `WorkspaceCredentials` are accessed via proxified imports, for instance:
`import { Users } from '@rocket.chat/models'`. These are defined in `packages/models/src/index.ts` as `export const Users = proxify<IUsersModel>('IUsersModel');` and `export const WorkspaceCredentials = proxify<IWorkspaceCredentialsModel>('IWorkspaceCredentialsModel');`.

## Tool Calls (8 calls, 35,932 tokens)

**Step 1:** `search({"query":"model"})` → 520 tokens
**Step 2:** `implement({"symbolName":"Users","filename":"packages/models/src/models/Users.ts"})` → 53 tokens
**Step 3:** `search({"query":"BaseRaw"})` → 211 tokens
**Step 4:** `implement({"symbolName":"BaseRaw","filename":"packages/models/src/models/BaseRaw.ts"})` → 1137 tokens
**Step 5:** `implement({"filename":"packages/models/src/models/WorkspaceCredentials.ts","symbolName":"WorkspaceCredentials")` → 72 tokens
**Step 6:** `search({"query":"registerModel","layer":"server"})` → 214 tokens
**Step 7:** `graph({"query":"registerModel","layer":"server","direction":"up"})` → 199 tokens
**Step 8:** `graph({"layer":"server","direction":"up","query":"registerServiceModels"})` → 48 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 2/3 |
| Tool calls | 8 |
| Total tokens | 35,932 |
| Pass | NO |
