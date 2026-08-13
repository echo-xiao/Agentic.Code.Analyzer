## File: apps/meteor/server/services/device-management/service.ts

```typescript
import type { IDeviceManagementService } from '@rocket.chat/core-services';
import { ServiceClassInternal } from '@rocket.chat/core-services';
import { getHeader } from '@rocket.chat/tools';

import { deviceManagementEvents } from './events';

export class DeviceManagementService extends ServiceClassInternal implements IDeviceManagementService {
	protected name = 'device-management';

	constructor() {
        /* Implementation Hidden */
    }
}

```