## File: apps/meteor/app/apps/server/bridges/thread.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { ThreadBridge } from '@rocket.chat/apps/dist/server/bridges/ThreadBridge';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';

export class AppThreadBridge extends ThreadBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async getById(threadID: string, appId: string): Promise<IMessage[]> {
        /* Implementation Hidden */
    }
}

```