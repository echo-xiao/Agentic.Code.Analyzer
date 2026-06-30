# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

Slash commands in Rocket.Chat are registered and managed through the `AppSlashCommandManager` in the `packages/apps-engine` package.

Here's the call chain from registration to execution:

**Registration:**

1.  **`AppSlashCommandManager.constructor`** (packages/apps-engine/src/server/managers/AppSlashCommandManager.ts): The constructor of `AppSlashCommandManager` initializes the command bridge.
2.  **`AppBridges.getCommandBridge`** (packages/apps-engine/src/server/bridges/AppBridges.ts): This abstract method is implemented to provide an instance of `CommandBridge`.
3.  **`CommandBridge.doRegisterCommand`** (packages/apps-engine/src/server/bridges/CommandBridge.ts): This method is responsible for registering the slash command. It first checks for default permissions using `hasDefaultPermission` and then calls the abstract `registerCommand` method.
4.  **`AppSlashCommandManager.registerCommand`** (packages/apps-engine/src/server/managers/AppSlashCommandManager.ts): This method handles the actual registration of the command, likely storing it in a collection for later retrieval.

**Execution (based on the `graph` output, the execution flow is not fully detailed but implies a lookup and then execution):**

When a user types a slash command, the system would:

1.  Look up the command using methods like `has` or `findOne` (as seen in the `graph` output for `registerCommand` which also shows these methods being called).
2.  Once the command is identified, its associated action would be triggered. The `graph` output for `registerCommand` also shows calls to `set` and `getNotifier`, suggesting that command registration might involve setting up listeners or notifications for when the command is invoked.

**Key Files:**

*   `packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`: Manages the registration and lifecycle of slash commands.
*   `packages/apps-engine/src/server/bridges/CommandBridge.ts`: Provides the interface for apps to interact with slash commands.
*   `packages/apps-engine/src/server/bridges/AppBridges.ts`: An abstract class that provides access to various bridges, including the `CommandBridge`.

## Tool Calls (8 calls, 43,403 tokens)

**Step 1:** `search({"query":"registerCommand"})` → 258 tokens
**Step 2:** `graph({"query":"registerCommand","file":"packages/apps-engine/src/server/managers/AppSlashCommandManager.t)` → 1406 tokens
**Step 3:** `implement({"symbolName":"doRegisterCommand","filename":"packages/apps-engine/src/server/bridges/CommandBridge.)` → 62 tokens
**Step 4:** `implement({"symbolName":"CommandBridge","filename":"packages/apps-engine/src/server/bridges/CommandBridge.ts"})` → 469 tokens
**Step 5:** `implement({"filename":"packages/apps-engine/src/server/bridges/CommandBridge.ts","symbolName":"CommandBridge.d)` → 104 tokens
**Step 6:** `graph({"layer":"server","query":"CommandBridge","direction":"up"})` → 77 tokens
**Step 7:** `implement({"filename":"packages/apps-engine/src/server/bridges/AppBridges.ts","symbolName":"AppBridges.getComm)` → 69 tokens
**Step 8:** `graph({"layer":"server","direction":"up","query":"AppBridges"})` → 199 tokens

## Files Seen In Tool Results (13)

- `packages/apps-engine/tests/test-data/bridges/commandBridge.ts`
- `packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`
- `packages/apps-engine/src/server/bridges/CommandBridge.ts`
- `apps/meteor/app/apps/server/bridges/commands.ts`
- `packages/apps-engine/src/server/AppManager.ts`
- `apps/meteor/ee/lib/misc/Utilities.ts`
- `packages/apps-engine/deno-runtime/lib/accessors/mod.ts`
- `packages/rest-typings/src/v1/statistics.ts`
- `packages/apps-engine/src/server/managers/AppSlashCommand.ts`
- `packages/apps-engine/src/server/bridges/AppBridges.ts`
- `packages/apps-engine/src/server/managers/AppAccessorManager.ts`
- `packages/apps-engine/src/server/accessors/ModifyExtender.ts`
- `packages/apps-engine/src/server/accessors/Http.ts`
