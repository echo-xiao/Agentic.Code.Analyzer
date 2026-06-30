# How do you create a new database model in Rocket.Chat?

## Gemini Answer

To create a new database model in Rocket.Chat, follow these steps:

1.  **Define the document interface**: Create an interface for your document in `packages/core-typings/`, extending `IRocketChatRecord`. For example, `IUser` in `packages/core-typings/src/IUser.ts` defines the structure for a user document.

2.  **Define the model interface**: Create an interface for your model in `packages/model-typings/src/models/`, extending `IBaseModel<T>`, where `T` is your document interface. This interface will define the custom methods available for your model. An example is `IUsersModel` in `packages/model-typings/src/models/IUsersModel.ts`.

3.  **Implement the model class**: Create a class in the `packages/models/src/models/` directory that extends `BaseRaw<T, DefaultFields<T>>` and implements your model interface. This class will contain the actual database operations and custom methods. An example is `UsersRaw` in `packages/models/src/models/Users.ts`. This class also provides an `override modelIndexes()` method for defining MongoDB indexes.

4.  **Register the model**: Register your new model using the `registerModel` function. This function, found in `packages/models/src/proxify.ts`, is used during server startup to make the model accessible throughout the application.

After these steps, your new model will be accessible via proxified imports like `import { YourModel } from '@rocket.chat/models'`.

**Call Chain:**
`search("Model")` → `graph("registerModel", "down", file="packages/models/src/proxify.ts")` → `implement("IUser", "packages/core-typings/src/IUser.ts")` → `implement("IUsersModel", "packages/model-typings/src/models/IUsersModel.ts")` → `implement("UsersRaw", "packages/models/src/models/Users.ts")` → `implement("registerModel", "packages/models/src/proxify.ts")`

## Tool Calls (8 calls, 97,601 tokens)

**Step 1:** `search({"query":"Model"})` → 742 tokens
**Step 2:** `graph({"file":"packages/models/src/proxify.ts","query":"registerModel","direction":"down"})` → 1401 tokens
**Step 3:** `search({"layer":"packages","query":"IUser"})` → 642 tokens
**Step 4:** `search({"layer":"packages","query":"IUsersModel"})` → 271 tokens
**Step 5:** `search({"layer":"packages","query":"Users"})` → 809 tokens
**Step 6:** `implement({"symbolName":"IUser","filename":"packages/core-typings/src/IUser.ts"})` → 444 tokens
**Step 7:** `implement({"symbolName":"IUsersModel","filename":"packages/model-typings/src/models/IUsersModel.ts"})` → 5596 tokens
**Step 8:** `implement({"filename":"packages/models/src/models/Users.ts","symbolName":"UsersRaw"})` → 6775 tokens
