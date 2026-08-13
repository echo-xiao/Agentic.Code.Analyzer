## File: apps/meteor/app/apps/server/bridges/experimental.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { ExperimentalBridge } from '@rocket.chat/apps/dist/server/bridges/ExperimentalBridge';

export class AppExperimentalBridge extends ExperimentalBridge {
	constructor(protected readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }
}

```