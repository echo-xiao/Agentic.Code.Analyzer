# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Gemini Answer

The blast radius of changing the `Streamer` module in `apps/meteor/server/modules/streamer/streamer.module.ts` primarily affects its internal instance management and several client-side administration UI components.

Call Chain:

`Streamer` (apps/meteor/server/modules/streamer/streamer.module.ts) is directly called by:
*   `instances` (apps/meteor/server/modules/streamer/streamer.module.ts) - This indicates that changes to the `Streamer` module would impact how `Streamer` instances are internally managed on the server.

Indirectly, the following client-side components have dependencies on `Streamer` (likely for displaying information about Streamer instances or their status in the admin UI):
*   `WorkspacePage` (apps/meteor/client/views/admin/workspace/WorkspacePage.tsx)
*   `handleInstancesModal` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx)
*   `DeploymentCard` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx)

Further down the dependency chain, the following also show a relationship:
*   `WorkspaceRoute` (apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx)
*   `Template` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx)

## Tool Calls (2 calls, 6,693 tokens)

**Step 1:** `search({"query":"Streamer"})` → 508 tokens
**Step 2:** `graph({"query":"Streamer","direction":"up","mode":"impact","filename":"apps/meteor/server/modules/streamer)` → 320 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/5 |
| Symbols hit | 3/5 |
| Tool calls | 2 |
| Total tokens | 6,693 |
| Pass | NO |
