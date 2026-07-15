# How are Livechat requests routed to the server-side in Rocket.Chat?

## Plan

intent: routing

## Gemini Answer

Livechat requests are routed to the server-side in Rocket.Chat primarily through the `RoutingManager` located at `apps/meteor/app/livechat/server/lib/RoutingManager.ts`. This component acts as the central dispatch engine for livechat, handling incoming inquiries and delegating them to available agents based on configured routing methods.

The routing process involves several key steps and components:

1.  **Incoming Request**: Livechat requests originate from the client-side, often through the embedded widget (`packages/livechat/src/widget.ts`). These requests are then handled by various REST API endpoints on the server.
2.  **REST API Endpoints**: Several server-side REST API endpoints are responsible for processing different aspects of livechat requests. Examples include:
    *   `apps/meteor/app/livechat/imports/server/rest/inquiries.ts`: Handles operations related to the livechat inquiry queue.
    *   `apps/meteor/app/livechat/imports/server/rest/rooms.ts`: Manages livechat room queries and filters.
    *   `apps/meteor/app/livechat/server/api/v1/room.ts`: Routes for livechat room management.
    *   `apps/meteor/app/livechat/server/api/v1/message.ts`: Handles livechat message CRUD operations.
    *   `apps/meteor/app/livechat/imports/server/rest/visitors.ts`: Manages livechat visitor information and messaging.
3.  **RoutingManager**: Once an inquiry reaches the server via a REST API endpoint, the `RoutingManager` (`apps/meteor/app/livechat/server/lib/RoutingManager.ts`) takes over. It orchestrates the routing process, which may involve:
    *   **Agent Selection Logic**: The `RoutingManager` interacts with components that determine agent availability and apply routing rules.
    *   **Hooks**: The system utilizes hooks, such as `beforeDelegateAgent` (`apps/meteor/app/livechat/server/lib/hooks.ts`), to allow for custom logic before an agent is delegated.
    *   **Notifications**: Changes in livechat inquiries can trigger notifications, for example, via `notifyOnLivechatInquiryChangedById` (`apps/meteor/app/lib/server/lib/notifyListener.ts`).
4.  **Enterprise Extensions**: For Rocket.Chat Enterprise, additional routing capabilities are provided by `LivechatEnterprise` (`apps/meteor/ee/app/livechat-enterprise/server/lib/LivechatEnterprise.ts`), which extends monitor, business unit, tag, and SLA management. The `Helper.ts` file (`apps/meteor/ee/app/livechat-enterprise/server/lib/Helper.ts`) also provides enterprise-specific queue and inquiry management, including SLA tracking.

In summary, the flow is:

Client-side (e.g., `packages/livechat/src/widget.ts`) → REST API Endpoints (e.g., `apps/meteor/app/livechat/imports/server/rest/inquiries.ts`) → `RoutingManager` (`apps/meteor/app/livechat/server/lib/RoutingManager.ts`) → Agent Assignment and further processing.

## Tool Calls (8 calls, 49,963 tokens)

**Step 1:** `plan({"question":"How are Livechat requests routed to the server-side in Rocket.Chat?","intent":"routing"})` → 3682 tokens
**Step 2:** `search({"query":"RoutingManager"})` → 97 tokens
**Step 3:** `graph({"file":"RoutingManager.ts","query":"RoutingManager","depth":2,"move":"expand"})` → 257 tokens
**Step 4:** `details({"filename":"inquiries.ts","symbolName":"inquiries.ts"})` → 55 tokens
**Step 5:** `details({"filename":"inquiries.ts","symbolName":"inquiries"})` → 88 tokens
**Step 6:** `search({"layer":"server","query":"addRoute"})` → 65 tokens
**Step 7:** `details({"symbolName":"ApiClass.addRoute","filename":"ApiClass.ts"})` → 46 tokens
**Step 8:** `details({"symbolName":"ApiClass","filename":"ApiClass.ts"})` → 15 tokens

## Files Seen In Tool Results (38)

- `packages/livechat/src/lib/api.ts`
- `packages/livechat/src/lib/email.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/lib/LivechatEnterprise.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/hooks/beforeNewRoom.ts`
- `ee/packages/omni-core-ee/src/isDepartmentCreationAvailable.ts`
- `apps/meteor/app/livechat/server/lib/RoutingManager.ts`
- `apps/meteor/client/views/omnichannel/sidebarItems.tsx`
- `packages/livechat/src/widget.ts`
- `apps/meteor/app/livechat/server/hooks/offlineMessageToChannel.ts`
- `apps/meteor/app/livechat/imports/server/rest/rooms.ts`
- `packages/apps-engine/src/server/accessors/Http.ts`
- `apps/meteor/app/livechat/server/api/v1/transcript.ts`
- `apps/meteor/app/apps/server/bridges/http.ts`
- `apps/meteor/app/livechat/server/api/v1/room.ts`
- `apps/meteor/app/livechat/imports/server/rest/inquiries.ts`
- `packages/apps-engine/deno-runtime/handlers/api-handler.ts`
- `packages/livechat/src/lib/triggers.js`
- `packages/models/src/models/LivechatRooms.ts`
- `packages/livechat/src/entry.ts`
- `packages/rest-typings/src/helpers/PaginatedRequest.ts`
- `apps/meteor/app/livechat/server/livechat.ts`
- `apps/meteor/app/livechat/server/api/v1/message.ts`
- `packages/models/src/models/LivechatVisitors.ts`
- `apps/meteor/app/api/server/v1/instances.ts`
- `apps/meteor/app/livechat/imports/server/rest/integrations.ts`
- `packages/model-typings/src/models/IMessagesModel.ts`
- `packages/livechat/src/lib/triggerActions.ts`
- `apps/meteor/ee/server/models/raw/LivechatUnit.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/lib/Helper.ts`
- `apps/meteor/app/api/server/ApiClass.ts`
- `apps/meteor/app/livechat/imports/server/rest/visitors.ts`
- `apps/meteor/definition/IRoutingManagerConfig.ts`
- `apps/meteor/ee/server/apps/orchestrator.js`
- `apps/meteor/app/lib/server/lib/notifyListener.ts`
- `apps/meteor/app/livechat/server/lib/Helper.ts`
- `apps/meteor/app/lib/server/functions/sendMessage.ts`
- `apps/meteor/app/livechat/server/lib/hooks.ts`
- `apps/meteor/ee/app/livechat-enterprise/server/api/inquiries.ts`
