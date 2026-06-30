# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Gemini Answer

The `Streamer` module, particularly the one defined in `apps/meteor/server/modules/streamer/streamer.module.ts`, has the following blast radius:

**Call Chain:**
*   **Entry Point:** `Streamer` (apps/meteor/server/modules/streamer/streamer.module.ts)
    *   **Direct Callers:**
        *   `instances` (apps/meteor/server/modules/streamer/streamer.module.ts)
    *   **Indirect Dependents (2-hop):**
        *   `WorkspacePage` (apps/meteor/client/views/admin/workspace/WorkspacePage.tsx)
        *   `handleInstancesModal` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx)
        *   `DeploymentCard` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx)
    *   **3-hop Dependents:**
        *   `WorkspaceRoute` (apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx)
        *   `Template` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx)

Changes to the `Streamer` module in `apps/meteor/server/modules/streamer/streamer.module.ts` would primarily impact the internal `instances` within the same module, and a series of client-side components related to the administration workspace, specifically the `WorkspacePage`, `DeploymentCard`, and their associated functionalities.

## Tool Calls (2 calls, 7,291 tokens)

**Step 1:** `search({"query":"Streamer"})` → 623 tokens
**Step 2:** `graph({"mode":"impact","file":"apps/meteor/server/modules/streamer/streamer.module.ts","query":"Streamer",)` → 320 tokens
