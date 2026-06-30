# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Gemini Answer

The blast radius of changing the `Streamer` module, specifically `ee/apps/ddp-streamer/src/Streamer.ts`, is as follows:

**Entry Point:** `ee/apps/ddp-streamer/src/Streamer.ts`

**Call Chain (Impact Analysis - upwards dependencies):**

1.  **Direct callers** of `Streamer` (`ee/apps/ddp-streamer/src/Streamer.ts`):
    *   `Streamer.instances` in `apps/meteor/server/modules/streamer/streamer.module.ts`
    *   `Streamer.instances` in `apps/meteor/client/lib/streamer/streamer.ts`
    *   `getStreamer` in `apps/meteor/client/lib/streamer/streamer.ts`

2.  **Indirect dependents** (2-hop) of `Streamer`:
    *   `WorkspacePage` in `apps/meteor/client/views/admin/workspace/WorkspacePage.tsx`
    *   `handleInstancesModal` in `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx`
    *   `DeploymentCard` in `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx`
    *   `Presence` in `apps/meteor/app/notifications/client/lib/Presence.ts`

3.  **3-hop dependents** of `Streamer`:
    *   `WorkspaceRoute` in `apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx`
    *   `Template` in `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx`
    *   `service` in `ee/apps/presence-service/src/service.ts`
    *   `registerServices` in `apps/meteor/server/services/startup.ts`

4.  **4-hop dependents** of `Streamer`:
    *   `main` in `apps/meteor/server/main.ts`

Changing the `Streamer` module in `ee/apps/ddp-streamer/src/Streamer.ts` could therefore impact the server-side streamer module (`apps/meteor/server/modules/streamer/streamer.module.ts`), the client-side streamer library (`apps/meteor/client/lib/streamer/streamer.ts`), various UI components related to workspace administration (`apps/meteor/client/views/admin/workspace/`), client-side presence logic (`apps/meteor/app/notifications/client/lib/Presence.ts`), the presence service (`ee/apps/presence-service/src/service.ts`), server startup procedures (`apps/meteor/server/services/startup.ts`), and ultimately the main server entry point (`apps/meteor/server/main.ts`).

## Tool Calls (2 calls, 7,322 tokens)

**Step 1:** `search({"query":"Streamer"})` → 529 tokens
**Step 2:** `graph({"direction":"up","mode":"impact","query":"Streamer","file":"ee/apps/ddp-streamer/src/Streamer.ts"})` → 429 tokens
