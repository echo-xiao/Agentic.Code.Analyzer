## File: apps/meteor/app/livechat/server/lib/routing/External.ts

```typescript
import type { IRoutingMethod, RoutingMethodConfig, SelectedAgent } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { Meteor } from 'meteor/meteor';

import { SystemLogger } from '../../../../../server/lib/logger/system';
import { settings } from '../../../../settings/server';
import { RoutingManager } from '../RoutingManager';

class ExternalQueue implements IRoutingMethod {
	config: RoutingMethodConfig;

	constructor() {
        /* Implementation Hidden */
    }

	async getNextAgent(department?: string, ignoreAgentId?: string): Promise<SelectedAgent | null | undefined> {
        /* Implementation Hidden */
    }

	private async getAgentFromExternalQueue(department?: string, ignoreAgentId?: string): Promise<SelectedAgent | null | undefined> {
        /* Implementation Hidden */
    }
}

RoutingManager.registerMethod('External', ExternalQueue);

```