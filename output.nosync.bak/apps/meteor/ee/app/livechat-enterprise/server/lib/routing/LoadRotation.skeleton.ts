## File: apps/meteor/ee/app/livechat-enterprise/server/lib/routing/LoadRotation.ts

```typescript
import type { IOmnichannelCustomAgent } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { RoutingManager } from '../../../../../../app/livechat/server/lib/RoutingManager';
import { settings } from '../../../../../../app/settings/server';
import type { IRoutingManagerConfig } from '../../../../../../definition/IRoutingManagerConfig';
import { getChatLimitsQuery } from '../../hooks/applySimultaneousChatsRestrictions';
import { logger } from '../logger';

/* Load Rotation Queuing method:
 * Routing method where the agent with the oldest routing time is the next agent to serve incoming chats
 */
class LoadRotation {
	private _config: IRoutingManagerConfig;

	constructor() {
        /* Implementation Hidden */
    }

	get config(): IRoutingManagerConfig {
		return this._config;
	}

	public async getNextAgent(department?: string, ignoreAgentId?: string): Promise<IOmnichannelCustomAgent | undefined> {
        /* Implementation Hidden */
    }
}

RoutingManager.registerMethod('Load_Rotation', LoadRotation);

```