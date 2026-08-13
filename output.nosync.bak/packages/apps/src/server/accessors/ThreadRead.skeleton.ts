## File: packages/apps/src/server/accessors/ThreadRead.ts

```typescript
import type { IThreadRead } from '@rocket.chat/apps-engine/definition/accessors/IThreadRead';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import type { ThreadBridge } from '../bridges/ThreadBridge';

export class ThreadRead implements IThreadRead {
	constructor(
		private threadBridge: ThreadBridge,
		private appId: string,
	) {
        /* Implementation Hidden */
    }

	public getThreadById(id: string): Promise<Array<IMessage>> {
        /* Implementation Hidden */
    }
}

```