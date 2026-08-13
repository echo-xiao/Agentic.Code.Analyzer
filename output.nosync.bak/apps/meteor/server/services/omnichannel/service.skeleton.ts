## File: apps/meteor/server/services/omnichannel/service.ts

```typescript
import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { IOmnichannelService } from '@rocket.chat/core-services';
import type { AtLeast, IOmnichannelQueue, IOmnichannelRoom } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import moment from 'moment';

import { OmnichannelQueue } from './queue';
import { RoutingManager } from '../../../app/livechat/server/lib/RoutingManager';
import { notifyAgentStatusChanged } from '../../../app/livechat/server/lib/omni-users';
import { settings } from '../../../app/settings/server';

export class OmnichannelService extends ServiceClassInternal implements IOmnichannelService {
	protected name = 'omnichannel';

	private queueWorker: IOmnichannelQueue;

	constructor() {
        /* Implementation Hidden */
    }

	override async created() {
        /* Implementation Hidden */
    }

	override async started() {
        /* Implementation Hidden */
    }

	async isWithinMACLimit(room: AtLeast<IOmnichannelRoom, 'v'>): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```