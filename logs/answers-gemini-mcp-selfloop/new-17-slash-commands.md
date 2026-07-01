# How do slash commands work in Rocket.Chat — from registration to execution?

## Gemini Answer

Slash commands in Rocket.Chat are registered and executed through the Apps-Engine, which provides a bridge between Rocket.Chat's core and individual applications.

Here's the breakdown of the process:

**1. Registration:**

*   **`AppSlashCommandManager.ts`** (`packages/apps-engine/src/server/managers/AppSlashCommandManager.ts`): This manager is responsible for handling the registration of slash commands. When an app wants to register a command, it calls the `registerCommand` method on this manager.
*   **`CommandBridge.ts`** (`packages/apps-engine/src/server/bridges/CommandBridge.ts`): The `AppSlashCommandManager` delegates the actual registration to the `CommandBridge`. Specifically, the `doRegisterCommand` method in `CommandBridge` is called. This method performs a permission check using `hasDefaultPermission` and then calls the abstract `registerCommand` method.
*   The `CommandBridge.registerCommand` method is an abstract method, meaning its implementation is provided by a concrete bridge that connects to the Rocket.Chat core.

**2. Execution:**

The information gathered primarily focuses on the registration aspect. To fully understand execution, further investigation would be needed to trace how the registered commands are invoked and processed within the Rocket.Chat core. However, based on the `graph` output, we can infer that the `CommandBridge` plays a crucial role in mediating between the app's command definition and the core system's command handling.

**Call Chain (Registration):**

`AppSlashCommandManager.registerCommand` → `CommandBridge.doRegisterCommand` → `CommandBridge.registerCommand` (abstract)

The `CommandBridge` itself is accessed via `AppBridges.getCommandBridge` (`packages/apps-engine/src/server/bridges/AppBridges.ts`), which is then used by `AppAccessorManager` (`packages/apps-engine/src/server/managers/AppAccessorManager.ts`) to provide the bridge to apps.

## Tool Calls (8 calls, 40,971 tokens)

**Step 1:** `search({"query":"registerCommand"})` → 258 tokens
**Step 2:** `graph({"query":"registerCommand","layer":"server","direction":"down","file":"packages/apps-engine/src/serv)` → 1364 tokens
**Step 3:** `implement({"filename":"packages/apps-engine/src/server/bridges/CommandBridge.ts","symbolName":"doRegisterComma)` → 62 tokens
**Step 4:** `implement({"filename":"packages/apps-engine/src/server/bridges/CommandBridge.ts","symbolName":"CommandBridge.d)` → 104 tokens
**Step 5:** `implement({"symbolName":"CommandBridge.registerCommand","filename":"packages/apps-engine/src/server/bridges/Co)` → 139 tokens
**Step 6:** `graph({"query":"CommandBridge","layer":"server","direction":"up","mode":"impact"})` → 99 tokens
**Step 7:** `implement({"filename":"packages/apps-engine/src/server/bridges/AppBridges.ts","symbolName":"AppBridges.getComm)` → 69 tokens
**Step 8:** `graph({"query":"AppBridges","layer":"server","direction":"up","mode":"impact"})` → 204 tokens

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
