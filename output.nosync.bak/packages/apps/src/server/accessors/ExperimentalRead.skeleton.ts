## File: packages/apps/src/server/accessors/ExperimentalRead.ts

```typescript
import type { IExperimentalRead } from '@rocket.chat/apps-engine/definition/accessors';

import type { ExperimentalBridge } from '../bridges';

export class ExperimentalRead implements IExperimentalRead {
	constructor(
		protected readonly experimentalBridge: ExperimentalBridge,
		protected readonly appId: string,
	) {
        /* Implementation Hidden */
    }
}

```