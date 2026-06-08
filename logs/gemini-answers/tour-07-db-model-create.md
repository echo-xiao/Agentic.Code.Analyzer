# How do you create a new database model in Rocket.Chat?

## Gemini Answer

To create a new database model in Rocket.Chat, follow these steps:

1.  **Define Document Interface**:
    *   Create an interface for your document in `packages/core-typings`, ensuring it extends `IRocketChatRecord`.

2.  **Define Model Interface**:
    *   Create an interface for your model in `packages/model-typings`, extending `IBaseModel<T>`, where `T` is your document interface.

3.  **Implement Model Class**:
    *   In the `packages/models` directory, create a new file for your model.
    *   Implement a class that extends `BaseRaw<T>`, where `T` is your document interface. This `BaseRaw` class (located at `packages/models/src/models/BaseRaw.ts`) provides a wrapper for MongoDB collection operations like `find`, `findOne`, `insertOne`, `updateOne`, `deleteOne`, etc.
    *   Override the `modelIndexes()` method in your new model class to define any necessary MongoDB indexes.

4.  **Register Model**:
    *   Register your new model via `registerModel` during the server startup process.

5.  **Access Model**:
    *   Models are accessed through proxified imports, for example, `import { Messages } from '@rocket.chat/models'`. This routing is handled via `LocalBroker`. You can see examples of this in `packages/models/src/index.ts` where models like `Users`, `WorkspaceCredentials`, and `Reports` are proxified.

**Example File Paths and Call Chain:**

*   **Base Model:** `packages/models/src/models/BaseRaw.ts`
*   **Example Model Implementation (Proxified):**
    *   `packages/models/src/index.ts` (proxifies the model)
    *   `packages/models/src/models/Users.ts` (actual model file)
    *   `packages/models/src/models/WorkspaceCredentials.ts` (actual model file)
    *   `packages/models/src/models/Reports.ts` (actual model file)

**Call Chain (Illustrative for how existing models use BaseRaw):**

`SomeModel` (e.g., `UsersSessions`, `Subscriptions`, `Reports`) → `extends BaseRaw` (in `packages/models/src/models/BaseRaw.ts`)

For instance, `UsersSessions` (defined in `packages/models/src/models/UsersSessions.ts`) extends `BaseRaw`, and its methods like `clearConnectionsFromInstanceId`, `updateConnectionStatusById`, etc., in turn, are called by functions in `ee/packages/presence/src/Presence.ts`. Similarly, `Subscriptions` (in `packages/models/src/models/Subscriptions.ts`) extends `BaseRaw`, and its method `setAsReadByRoomIdAndUserId` is called by `readMessages` in `apps/meteor/server/lib/readMessages.ts`.

## Tool Calls (8 calls, 35,592 tokens)

**Step 1:** `search({"query":"Model","layer":"packages"})` → 518 tokens
**Step 2:** `implement({"filename":"packages/models/src/models/Users.ts","symbolName":"Users"})` → 53 tokens
**Step 3:** `implement({"filename":"packages/models/src/models/WorkspaceCredentials.ts","symbolName":"WorkspaceCredentials")` → 72 tokens
**Step 4:** `search({"layer":"packages","query":"BaseRaw"})` → 211 tokens
**Step 5:** `implement({"filename":"packages/models/src/models/BaseRaw.ts","symbolName":"BaseRaw"})` → 1137 tokens
**Step 6:** `graph({"edgeTypes":["extends"],"query":"BaseRaw","mode":"tree","direction":"up"})` → 201 tokens
**Step 7:** `graph({"depth":2,"mode":"tree","direction":"up","query":"BaseRaw"})` → 537 tokens
**Step 8:** `implement({"filename":"packages/models/src/models/Reports.ts","symbolName":"Reports"})` → 55 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 2/3 |
| Tool calls | 8 |
| Total tokens | 35,592 |
| Pass | NO |
