# How do you create a new database model in Rocket.Chat?

## Gemini Answer

To create a new database model in Rocket.Chat, you should follow this architectural pattern:

1.  **Define the document interface**: Create an interface for your document in `packages/core-typings` that extends `IRocketChatRecord`. This interface will define the structure of the data stored in your collection.
2.  **Define the model interface**: Create an interface for your model in `packages/model-typings` that extends `IBaseModel<T>`, where `T` is your document interface. This interface will define the methods available on your model.
3.  **Implement the model class**: In the `packages/models` directory, implement a class that extends `BaseRaw<T>`, where `T` is your document interface. This class will contain the actual implementation of your model's methods, interacting with the MongoDB collection. An example of such a model is `UsersSessions` (defined in `packages/models/src/models/UsersSessions.ts`), which extends `BaseRaw`.
4.  **Register the model**: Register your new model in the server startup process using `registerModel`.

Models are typically accessed through proxified imports, for example, `import { Messages } from '@rocket.chat/models'`, which routes through a `LocalBroker`. The `BaseRaw` class (located at `packages/models/src/models/BaseRaw.ts`) also provides an override for `modelIndexes()` to define MongoDB indexes.

**Call Chain for `BaseRaw` (upstream example):**

`BaseRaw` (packages/models/src/models/BaseRaw.ts)
  ← `UsersSessions` (packages/models/src/models/UsersSessions.ts)
    ← `setConnectionStatus` (ee/packages/presence/src/Presence.ts)
      ← `configureServer` (ee/apps/ddp-streamer/src/configureServer.ts)
        ← `main` (apps/meteor/server/main.ts)

## Tool Calls (8 calls, 36,867 tokens)

**Step 1:** `search({"query":"model","layer":"server"})` → 569 tokens
**Step 2:** `graph({"direction":"up","query":"BaseRaw","layer":"packages"})` → 1026 tokens
**Step 3:** `implement({"symbolName":"Users","filename":"packages/models/src/models/Users.ts"})` → 53 tokens
**Step 4:** `search({"query":"class Users extends BaseRaw","layer":"packages"})` → 18 tokens
**Step 5:** `implement({"filename":"packages/models/src/models/UsersSessions.ts","symbolName":"UsersSessions"})` → 63 tokens
**Step 6:** `search({"query":"extends BaseRaw","layer":"packages"})` → 15 tokens
**Step 7:** `implement({"symbolName":"Users","filename":"apps/meteor/ee/server/models/Users.ts"})` → 137 tokens
**Step 8:** `search({"query":"BaseRaw","layer":"packages"})` → 211 tokens
