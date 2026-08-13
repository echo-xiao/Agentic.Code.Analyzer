## File: packages/apps/src/server/accessors/ApiExtend.ts

```typescript
import type { IApiExtend } from '@rocket.chat/apps-engine/definition/accessors';
import type { IApi } from '@rocket.chat/apps-engine/definition/api';

import type { AppApiManager } from '../managers/AppApiManager';

export class ApiExtend implements IApiExtend {
	constructor(
		private readonly manager: AppApiManager,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public provideApi(api: IApi): Promise<void> {
        /* Implementation Hidden */
    }
}

```