## File: apps/meteor/server/services/push/service.ts

```typescript
import type { IPushService } from '@rocket.chat/core-services';
import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { IPushToken, Optional } from '@rocket.chat/core-typings';
import { PushToken } from '@rocket.chat/models';

import { logger } from './logger';
import { registerPushToken } from './tokenManagement/registerPushToken';

export class PushService extends ServiceClassInternal implements IPushService {
	protected name = 'push';

	constructor() {
        /* Implementation Hidden */
    }

	async registerPushToken(
		data: Optional<Pick<IPushToken, '_id' | 'token' | 'authToken' | 'appName' | 'userId' | 'metadata'>, '_id' | 'metadata'>,
	): Promise<Omit<IPushToken, 'authToken'>> {
        /* Implementation Hidden */
    }
}

```