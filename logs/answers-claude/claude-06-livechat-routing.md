# Livechat request routing?

## Answer

Livechat request routing in Rocket.Chat manages how incoming visitor chat requests are assigned to agents. It spans from the Livechat widget's initial connection through room creation, inquiry queuing, and agent assignment via pluggable routing strategies.

**Widget and Initial Connection:**

The Livechat widget (`packages/livechat/src/widget.ts`) embeds on external websites and communicates with the Rocket.Chat server. It uses `LivechatClientImpl` API (`packages/livechat/src/api.ts`) for REST calls. When a visitor initiates a chat, the widget calls the server's `livechat/room` endpoint.

**Server Room Creation:**

The endpoint in `apps/meteor/app/livechat/server/api/v1/room.ts` handles room creation/retrieval. For new conversations, it calls `QueueManager.requestRoom()` (in `apps/meteor/app/livechat/server/lib/QueueManager.ts`, line 289). This method:
1. Creates or retrieves an existing Livechat room for the visitor
2. Creates an inquiry record (stored in `LivechatInquiry` collection) with status `queued`
3. Determines the default agent based on department settings, previous conversations, or availability
4. Calls `RoutingManager.delegateInquiry()` to assign the inquiry to an agent

**QueueManager Details:**

`QueueManager` (static class) orchestrates the queuing pipeline. `requestRoom()` checks for existing open rooms for the visitor, creates rooms via `rooms.ts` functions, and creates inquiry records. It also runs `beforeRoutingChat` hooks that can modify the routing behavior. At line 120 and 191, it calls `RoutingManager.delegateInquiry(inquiry, agent, undefined, room)` to begin agent assignment.

**RoutingManager and Strategies:**

`RoutingManager` in `apps/meteor/app/livechat/server/lib/RoutingManager.ts` provides `delegateInquiry()` and `takeInquiry()` methods. `delegateInquiry()` selects the routing strategy and calls its `delegateAgent()` method. `takeInquiry()` is called when an agent manually takes a queued inquiry.

The routing strategy is pluggable, configured via the `Livechat_Routing_Method` setting. Available strategies:

1. **AutoSelection** (`apps/meteor/app/livechat/server/lib/routing/AutoSelection.ts`) — Automatically assigns to the next available agent based on load. Default strategy.
2. **ManualSelection** (`apps/meteor/app/livechat/server/lib/routing/ManualSelection.ts`) — Places inquiry in queue for agents to manually pick up.
3. **External** (`apps/meteor/app/livechat/server/lib/routing/External.ts`) — Delegates to an external service via webhook for agent selection.

Enterprise Edition adds additional strategies:
4. **LoadBalancing** — Distributes based on agent workload metrics
5. **LoadRotation** — Round-robin distribution with load awareness

**Concurrency Control:**

`conditionalLockAgent()` prevents concurrent assignment of the same agent to multiple inquiries simultaneously, using a locking mechanism to ensure an agent isn't double-booked.

**Helper Functions:**

`apps/meteor/app/livechat/server/lib/Helper.ts` provides utility functions for agent availability checking, department agent listing, and transfer operations. `apps/meteor/app/livechat/server/lib/transfer.ts` handles transferring conversations between agents/departments. `apps/meteor/app/livechat/server/lib/takeInquiry.ts` contains the logic for agents accepting queued inquiries.

### Call Chain
```
Widget (packages/livechat/src/widget.ts)
→ LivechatClientImpl API (api.ts) → REST call
→ livechat/server/api/v1/room.ts — room endpoint
→ QueueManager.requestRoom() (QueueManager.ts:289)
  → create/retrieve room
  → create inquiry record (status: queued)
  → determine default agent
  → beforeRoutingChat hooks
  → RoutingManager.delegateInquiry(inquiry, agent, undefined, room)
→ RoutingManager (RoutingManager.ts)
  → strategy.delegateAgent() based on Livechat_Routing_Method
    → AutoSelection — auto-assign next available
    → ManualSelection — queue for manual pickup
    → External — webhook to external service
    → EE: LoadBalancing, LoadRotation
  → conditionalLockAgent() — prevent concurrent assignment
  → takeInquiry() — agent accepts inquiry
```

### Key Files
| File | Role |
|------|------|
| `packages/livechat/src/widget.ts` | Livechat widget — embeds on external sites |
| `packages/livechat/src/api.ts` | `LivechatClientImpl` — widget API client |
| `apps/meteor/app/livechat/server/api/v1/room.ts` | Room creation/retrieval endpoint |
| `apps/meteor/app/livechat/server/lib/QueueManager.ts` | `QueueManager.requestRoom()` — queuing pipeline |
| `apps/meteor/app/livechat/server/lib/RoutingManager.ts` | `RoutingManager` — `delegateInquiry()`, `takeInquiry()`, strategy management |
| `apps/meteor/app/livechat/server/lib/routing/AutoSelection.ts` | Auto-assign routing strategy |
| `apps/meteor/app/livechat/server/lib/routing/ManualSelection.ts` | Manual queue routing strategy |
| `apps/meteor/app/livechat/server/lib/routing/External.ts` | External webhook routing strategy |
| `apps/meteor/app/livechat/server/lib/Helper.ts` | Helper functions — agent availability, department agents |
| `apps/meteor/app/livechat/server/lib/takeInquiry.ts` | `takeInquiry()` — agent accepts queued inquiry |
| `apps/meteor/app/livechat/server/lib/transfer.ts` | Transfer operations between agents/departments |

### Key Symbols
QueueManager, requestRoom, RoutingManager, delegateInquiry, takeInquiry, AutoSelection, ManualSelection, External, LoadBalancing, LoadRotation, conditionalLockAgent, beforeRoutingChat, LivechatClientImpl, LivechatInquiry, Livechat_Routing_Method, delegateAgent
