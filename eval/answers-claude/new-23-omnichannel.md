# How does Omnichannel queue process and close conversations?

## Answer

The Omnichannel system uses `OmnichannelService` as the service layer and `OmnichannelQueue` for inquiry processing. Queue processing polls for queued inquiries and routes them to available agents. Room closure is handled by `closeRoom()` which uses MongoDB transactions to ensure atomicity.

### 1. OmnichannelService (Service Layer)

**`apps/meteor/server/services/omnichannel/service.ts`, line 12:**
```ts
export class OmnichannelService extends ServiceClassInternal implements IOmnichannelService {
    protected name = 'omnichannel';
    private queueWorker: IOmnichannelQueue;

    constructor() {
        super();
        this.queueWorker = new OmnichannelQueue();
    }
```

**Lifecycle hooks:**

`created()` (line 22): Subscribes to `'presence.status'` events. When a user with livechat roles (livechat-manager, livechat-monitor, livechat-agent) changes status, calls `notifyAgentStatusChanged()`.

`started()` (line 35):
- Watches `['Livechat_enabled', 'Livechat_Routing_Method']` settings to trigger `queueWorker.shouldStart()` (line 36-38).
- `License.onLimitReached('monthlyActiveContacts', ...)` -- stops queue when MAC limit reached (line 40).
- `License.onValidateLicense(...)` -- restarts queue when license validates (line 44).
- `License.onInvalidateLicense(...)` -- CE fallback, restarts queue (no MAC limits in CE) (line 50).

`isWithinMACLimit(room)` (line 55): Checks if a room's visitor is within the monthly active contacts limit.

### 2. OmnichannelQueue (Queue Processing)

**`apps/meteor/server/services/omnichannel/queue.ts`, line 18:**
```ts
export class OmnichannelQueue implements IOmnichannelQueue {
    private serviceStarter: ServiceStarter;
    private timeoutHandler: ReturnType<typeof setTimeout> | null = null;
    private running = false;
    private errorDelay = 10 * 1000;
```

Uses `ServiceStarter` for controlled start/stop lifecycle.

**`shouldStart()` (line 168):**
```ts
async shouldStart() {
    if (!settings.get('Livechat_enabled')) {
        void this.stop();
        return;
    }
    const routingSupportsAutoAssign = RoutingManager.getConfig()?.autoAssignAgent;
    // starts if routing supports auto-assignment, stops otherwise
}
```

**`_start()` (line 43):**
1. Gets active queues (distinct departments with queued inquiries) via `LivechatInquiry.getDistinctQueuedDepartments()`
2. Sets `this.running = true`
3. Calls `this.execute()` to begin processing

**`execute()` (line 85):**
```ts
private async execute() {
    if (!this.running) { return; }
    if (await License.shouldPreventAction('monthlyActiveContacts', 1)) {
        this.running = false;  // MAC limit reached
        return;
    }
    const queues = await this.getActiveQueues();
    for await (const queue of queues) {
        await tracerSpan('omnichannel.queue', { ... }, () => this.checkQueue(queue));
    }
    this.scheduleExecution();
}
```

Iterates through all active department queues. Each queue is processed within a tracer span for observability.

**`checkQueue(queue)` (line 120):**
```ts
private async checkQueue(queue: string | null) {
    const nextInquiry = await LivechatInquiry.findNextAndLock(
        getOmniChatSortQuery(getInquirySortMechanismSetting()), queue
    );
    if (!nextInquiry) { return; }
    const result = await this.processWaitingQueue(queue, nextInquiry);
    if (!result) {
        return await LivechatInquiry.unlock(nextInquiry._id);
    }
    await LivechatInquiry.unlock(nextInquiry._id);
}
```

1. Finds and **locks** the next inquiry using `findNextAndLock()` with sort query from settings
2. Processes via `processWaitingQueue()` which delegates to `RoutingManager` to find an available agent
3. Unlocks the inquiry after processing (whether successful or not)

**`scheduleExecution()` (line 154):**
Schedules the next `execute()` call using `setTimeout` with delay from `Omnichannel_queue_delay_timeout` setting (default 5 seconds, minimum 1 second). On errors, adds an `errorDelay` of 10 seconds.

**`delay()` (line 34):**
```ts
private delay() {
    const timeout = settings.get<number>('Omnichannel_queue_delay_timeout') ?? 5;
    return timeout < 1 ? DEFAULT_RACE_TIMEOUT : timeout * 1000;
}
```

### 3. Room Closure: closeRoom()

**`apps/meteor/app/livechat/server/lib/closeRoom.ts`, line 29:**
```ts
export async function closeRoom(params: CloseRoomParams, attempts = 2): Promise<void> {
    let newRoom: IOmnichannelRoom;
    let chatCloser: ChatCloser;
    let removedInquiryObj: ILivechatInquiryRecord | null;

    const session = client.startSession();
    try {
        session.startTransaction();
        const { room, closedBy, removedInquiry } = await doCloseRoom(params, session);
        await session.commitTransaction();
        newRoom = room;
        chatCloser = closedBy;
        removedInquiryObj = removedInquiry;
    } catch (e) {
        if (session.inTransaction()) { await session.abortTransaction(); }
        if (shouldRetryTransaction(e)) {
            if (attempts > 0) {
                return closeRoom(params, attempts - 1);  // retry
            }
            throw new Error('error-room-cannot-be-closed-try-again');
        }
        throw e;
    } finally {
        await session.endSession();
    }
    return afterRoomClosed(newRoom, chatCloser, removedInquiryObj, params);
}
```

Key aspects:
1. **Transactional**: Uses MongoDB sessions with `startTransaction()` / `commitTransaction()`
2. **Retry logic**: On transient transaction errors, retries up to 2 times (line 50-53)
3. **Two-phase**: `doCloseRoom()` runs inside the transaction; `afterRoomClosed()` runs after commit

The `CloseRoomParams` supports two variants:
- `CloseRoomParamsByUser` -- closed by agent/admin
- `CloseRoomParamsByVisitor` -- closed by visitor

**`doCloseRoom()` (within transaction):**
- Updates room status to closed
- Removes the inquiry from the queue
- Updates subscriptions
- Frees agent capacity

**`afterRoomClosed()` (line 67):**
Post-transaction side effects:
- Sends system close messages
- Processes transcript requests (if configured)
- Fires `callbacks.run()` for post-close hooks
- Notifies via `notifyOnRoomChanged()`, `notifyOnLivechatInquiryChanged()`, `notifyOnSubscriptionChanged()`
- Triggers Apps Engine `AppEvents`

### 4. Routing Manager

**`apps/meteor/app/livechat/server/lib/RoutingManager.ts`:**

The `RoutingManager` coordinates agent assignment:
- `transferRoom()` -- saves transfer history, calls `transferRoom()` on the active routing method
- `getConfig()` -- returns current routing configuration
- `isMethodSet()` -- checks if a routing method is configured

### Key Files
| File | Role |
|------|------|
| `apps/meteor/server/services/omnichannel/service.ts` | `OmnichannelService` -- service layer, license/settings integration |
| `apps/meteor/server/services/omnichannel/queue.ts` | `OmnichannelQueue` -- polling-based inquiry processing |
| `apps/meteor/app/livechat/server/lib/closeRoom.ts` | `closeRoom()` -- transactional room closure |
| `apps/meteor/app/livechat/server/lib/RoutingManager.ts` | Agent routing and transfer management |
| `apps/meteor/app/livechat/server/lib/Helper.ts` | Helper functions including `dispatchAgentDelegated()` |
| `apps/meteor/app/livechat/lib/inquiries.ts` | `getOmniChatSortQuery()` for inquiry sorting |
| `apps/meteor/app/livechat/server/lib/settings.ts` | `getInquirySortMechanismSetting()` |
| `apps/meteor/app/livechat/server/lib/omni-users.ts` | `notifyAgentStatusChanged()` |
| `apps/meteor/server/services/omnichannel/logger.ts` | Queue-specific logging |

### Key Symbols
- `OmnichannelService` -- `ServiceClassInternal`, name = `'omnichannel'`, manages queue lifecycle
- `OmnichannelQueue` -- implements `IOmnichannelQueue`, polling-based inquiry processor
- `OmnichannelQueue.execute()` -- main loop iterating through department queues
- `OmnichannelQueue.checkQueue(queue)` -- processes single queue: lock, route, unlock
- `OmnichannelQueue.shouldStart()` -- decides whether to start/stop based on settings
- `closeRoom(params, attempts)` -- transactional room closure with retry logic
- `doCloseRoom(params, session)` -- in-transaction room state updates
- `afterRoomClosed()` -- post-commit side effects (messages, notifications, callbacks)
- `RoutingManager` -- agent assignment and transfer coordination
- `LivechatInquiry.findNextAndLock()` -- atomic fetch-and-lock for queue processing
