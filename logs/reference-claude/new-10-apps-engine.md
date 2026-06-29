# How does Apps Engine hook into events?

## Answer

The Apps Engine is Rocket.Chat's extensibility framework that allows third-party apps to hook into core events through a listener-based architecture. Apps declare which events they implement, the `AppListenerManager` registers and dispatches events, and a Bridge layer adapts between the core application and app sandboxes.

**App Declaration:**

Apps declare their capabilities in `app.json` (manifest) and by implementing specific interfaces in their main class. Each hookable event corresponds to an `AppInterface` enum value defined in `packages/apps-engine/src/definition/metadata/AppInterface.ts` (line 1). The enum includes entries like:
- `IPreMessageSentPrevent` — can prevent a message from being sent
- `IPreMessageSentExtend` — can extend a message before sending
- `IPreMessageSentModify` — can modify a message before sending
- `IPostMessageSent` — called after a message is sent
- `IPreMessageDeletePrevent` — can prevent message deletion
- `IPostMessageDeleted` — called after message deletion
- And many more for rooms, users, livechat, file uploads, etc.

**AppManager — App Lifecycle:**

`AppManager` in `packages/apps-engine/src/server/AppManager.ts` (line 71) manages the full app lifecycle: loading, enabling, disabling, updating, and uninstalling apps. When an app is loaded, it creates a `ProxiedApp` instance that wraps the app in a sandbox. The manager coordinates with multiple sub-managers including `AppListenerManager`, `AppSlashCommandManager`, `AppSettingsManager`, `AppSchedulerManager`, etc.

**AppListenerManager — Event Registration and Dispatch:**

`AppListenerManager` in `packages/apps-engine/src/server/managers/AppListenerManager.ts` is the core event dispatch system.

`registerListeners(app)` (line 273) is called when an app is loaded/enabled. It calls `app.getImplementationList()` which returns a map of `AppInterface` → `boolean`, indicating which events the app implements. For each implemented event, the listener manager registers the app as a handler.

`executeListener(event, ...args)` (line 343) dispatches an event to all registered apps. It uses a switch statement to determine the execution pattern based on event type:
- **Prevent** events (e.g., `IPreMessageSentPrevent`): Returns `boolean`. If any app returns `true`, the action is prevented.
- **Extend** events (e.g., `IPreMessageSentExtend`): Returns modified object. Each app receives the previous app's output.
- **Modify** events (e.g., `IPreMessageSentModify`): Similar to extend but with different semantics.
- **Post** events (e.g., `IPostMessageSent`): Fire-and-forget, no return value affects the pipeline.

The `IListenerExecutor` interface (line 35) defines the type mapping between each `AppInterface` event, its arguments, and its return type.

**Bridge Layer — Core-to-App Adaptation:**

The Bridge layer connects the Rocket.Chat core to the Apps Engine:

- `RealAppBridges` in `apps/meteor/app/apps/server/bridges/bridges.js` aggregates all individual bridges
- `AppListenerBridge` in `apps/meteor/app/apps/server/bridges/listeners.ts` adapts core events to `AppListenerManager.executeListener()` calls

When a core event occurs (e.g., message sent), the corresponding bridge method is called, which transforms core data types into Apps Engine types and invokes `executeListener()`. The orchestrator (`apps/meteor/ee/server/apps/orchestrator.js`) manages the `AppManager` instance and connects it to the core application.

Apps run in isolated sandboxes (Deno runtime via `AppsEngineDenoRuntime` in `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts`), and bridge calls are the only way apps interact with core functionality.

### Call Chain
```
Core event (e.g., message sent)
→ AppListenerBridge (bridges/listeners.ts)
  → transforms core types to Apps Engine types
→ AppListenerManager.executeListener(AppInterface.IPostMessageSent, message)
  → iterates registered apps for this event
  → for each app: calls app handler in sandbox
  → Prevent events: returns boolean (true = prevent)
  → Extend/Modify events: returns modified object
  → Post events: fire-and-forget

App registration:
AppManager.load(app) → ProxiedApp
→ AppListenerManager.registerListeners(app) (line 273)
  → app.getImplementationList() → { IPostMessageSent: true, ... }
  → registers app for each implemented event
```

### Key Files
| File | Role |
|------|------|
| `packages/apps-engine/src/server/AppManager.ts` | `AppManager` — app lifecycle management (load, enable, disable) |
| `packages/apps-engine/src/server/managers/AppListenerManager.ts` | `AppListenerManager` — `registerListeners()`, `executeListener()` |
| `packages/apps-engine/src/definition/metadata/AppInterface.ts` | `AppInterface` enum — all hookable event types |
| `apps/meteor/app/apps/server/bridges/bridges.js` | `RealAppBridges` — aggregates all bridge implementations |
| `apps/meteor/app/apps/server/bridges/listeners.ts` | `AppListenerBridge` — adapts core events to executeListener() |
| `apps/meteor/app/apps/server/bridges/index.ts` | Bridge exports |
| `apps/meteor/ee/server/apps/orchestrator.js` | App orchestrator — manages AppManager, connects to core |
| `packages/apps-engine/src/server/ProxiedApp.ts` | `ProxiedApp` — sandboxed app wrapper |
| `packages/apps-engine/src/server/runtime/deno/AppsEngineDenoRuntime.ts` | Deno sandbox runtime for apps |

### Key Symbols
AppManager, AppListenerManager, registerListeners, unregisterListeners, executeListener, AppInterface, IPreMessageSentPrevent, IPreMessageSentExtend, IPreMessageSentModify, IPostMessageSent, IPreMessageDeletePrevent, IPostMessageDeleted, getImplementationList, IListenerExecutor, ProxiedApp, RealAppBridges, AppListenerBridge, AppsEngineDenoRuntime, AppMethod
