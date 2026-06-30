# What is the blast radius of changing the Streamer module in Rocket.Chat?

## Gemini Answer

The blast radius of changing the `Streamer` module, specifically `apps/meteor/server/modules/streamer/streamer.module.ts`, primarily affects client-side administration workspace components.

**Call Chain:**
`Streamer` (apps/meteor/server/modules/streamer/streamer.module.ts) → `instances` (apps/meteor/server/modules/streamer/streamer.module.ts) → `WorkspacePage` (apps/meteor/client/views/admin/workspace/WorkspacePage.tsx) / `handleInstancesModal` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx) / `DeploymentCard` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx) → `WorkspaceRoute` (apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx) / `Template` (apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx)

**Affected Files:**

*   **Server-side (Direct Caller):**
    *   `apps/meteor/server/modules/streamer/streamer.module.ts` (specifically the `instances` symbol within this file)

*   **Client-side (Indirect Dependents - JSX):**
    *   `apps/meteor/client/views/admin/workspace/WorkspacePage.tsx`
    *   `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx`
    *   `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx`
    *   `apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx`

## Tool Calls (2 calls, 7,578 tokens)

**Step 1:** `search({"query":"Streamer"})` → 623 tokens
**Step 2:** `graph({"mode":"impact","file":"apps/meteor/server/modules/streamer/streamer.module.ts","direction":"up","q)` → 320 tokens

## Files Seen In Tool Results (26)

- `ee/apps/ddp-streamer/src/Streamer.ts`
- `apps/meteor/server/modules/streamer/streamer.module.ts`
- `apps/meteor/client/lib/streamer/streamer.ts`
- `apps/meteor/app/notifications/server/lib/Presence.ts`
- `apps/meteor/ee/server/apps/communication/websockets.ts`
- `packages/ddp-client/src/types/streams.ts`
- `apps/meteor/client/lib/streamer/index.ts`
- `apps/meteor/server/modules/streamer/types.ts`
- `ee/apps/ddp-streamer/src/service.ts`
- `ee/apps/ddp-streamer/src/proxy.ts`
- `ee/apps/ddp-streamer/src/constants.ts`
- `ee/apps/ddp-streamer/src/configureServer.ts`
- `ee/apps/ddp-streamer/src/Server.ts`
- `ee/apps/ddp-streamer/src/Publication.ts`
- `ee/apps/ddp-streamer/src/DDPStreamer.ts`
- `ee/apps/ddp-streamer/src/Client.ts`
- `ee/apps/ddp-streamer/src/types/IPacket.ts`
- `ee/apps/ddp-streamer/src/lib/utils.ts`
- `ee/apps/ddp-streamer/src/lib/Autoupdate.ts`
- `apps/meteor/client/lib/streamer/emitter.ts`
- `apps/meteor/client/lib/streamer/ddp.ts`
- `apps/meteor/app/authorization/server/streamer/permissions/index.ts`
- `apps/meteor/client/views/admin/workspace/WorkspacePage.tsx`
- `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx`
- `apps/meteor/client/views/admin/workspace/WorkspaceRoute.tsx`
- `apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.stories.tsx`
