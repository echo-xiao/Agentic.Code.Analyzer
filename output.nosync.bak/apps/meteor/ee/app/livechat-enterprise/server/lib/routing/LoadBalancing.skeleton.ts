## File: apps/meteor/ee/app/livechat-enterprise/server/lib/routing/LoadBalancing.ts

```typescript
import { Users } from '@rocket.chat/models';

import { RoutingManager } from '../../../../../../app/livechat/server/lib/RoutingManager';
import { settings } from '../../../../../../app/settings/server';
import type { IRoutingManagerConfig } from '../../../../../../definition/IRoutingManagerConfig';
import { getChatLimitsQuery } from '../../hooks/applySimultaneousChatsRestrictions';
import { logger } from '../logger';

/* Load Balancing Queuing method:
 *
 * default method where the agent with the least number
 * of open chats is paired with the incoming livechat
 */
class LoadBalancing {
	private _config: IRoutingManagerConfig;

	constructor() {
        /* Implementation Hidden */
    }

	get config(): IRoutingManagerConfig {
		return this._config;
	}

	async getNextAgent(department?: string, ignoreAgentId?: string) {
        /* Implementation Hidden */
    }
}

RoutingManager.registerMethod('Load_Balancing', LoadBalancing);

```