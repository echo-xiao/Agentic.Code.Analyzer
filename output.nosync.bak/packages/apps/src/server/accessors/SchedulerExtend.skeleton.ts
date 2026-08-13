## File: packages/apps/src/server/accessors/SchedulerExtend.ts

```typescript
import type { ISchedulerExtend } from '@rocket.chat/apps-engine/definition/accessors';
import type { IProcessor } from '@rocket.chat/apps-engine/definition/scheduler';

import type { AppSchedulerManager } from '../managers/AppSchedulerManager';

export class SchedulerExtend implements ISchedulerExtend {
	constructor(
		private readonly manager: AppSchedulerManager,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async registerProcessors(processors: Array<IProcessor> = []): Promise<void | Array<string>> {
        /* Implementation Hidden */
    }
}

```