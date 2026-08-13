## File: apps/meteor/app/livechat/server/lib/routing/ManualSelection.ts

```typescript
import type { IRoutingMethod, RoutingMethodConfig, SelectedAgent } from '@rocket.chat/core-typings';

import { RoutingManager } from '../RoutingManager';

/* Manual Selection Queuing Method:
 *
 * An incoming livechat is created as an Inquiry
 * which is picked up from an agent.
 * An Inquiry is visible to all agents
 *
 * A room is still created with the initial message, but it is occupied by
 * only the client until paired with an agent
 */
class ManualSelection implements IRoutingMethod {
	config: RoutingMethodConfig;

	constructor() {
        /* Implementation Hidden */
    }

	getNextAgent(_department?: string, _excludeAgent?: string): Promise<SelectedAgent | null | undefined> {
        /* Implementation Hidden */
    }
}

RoutingManager.registerMethod('Manual_Selection', ManualSelection);

```