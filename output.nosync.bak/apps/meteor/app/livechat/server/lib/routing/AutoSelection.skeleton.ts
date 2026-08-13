## File: apps/meteor/app/livechat/server/lib/routing/AutoSelection.ts

```typescript
import type { IRoutingMethod, RoutingMethodConfig, SelectedAgent } from '@rocket.chat/core-typings';
import { LivechatDepartmentAgents, Users } from '@rocket.chat/models';

import { callbacks } from '../../../../../server/lib/callbacks';
import { settings } from '../../../../settings/server';
import { RoutingManager } from '../RoutingManager';

/* Auto Selection Queuing method:
 *
 * default method where the agent with the least number
 * of open chats is paired with the incoming livechat
 */
class AutoSelection implements IRoutingMethod {
	config: RoutingMethodConfig;

	constructor() {
        /* Implementation Hidden */
    }

	async getNextAgent(department?: string, ignoreAgentId?: string): Promise<SelectedAgent | null | undefined> {
        /* Implementation Hidden */
    }
}

RoutingManager.registerMethod('Auto_Selection', AutoSelection);

```