## File: packages/apps/tests/test-data/bridges/threadBridge.ts

```typescript
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import { ThreadBridge } from '../../../src/server/bridges/ThreadBridge';

export class TestsThreadBridge extends ThreadBridge {
	public getById(messageId: string, appId: string): Promise<Array<IMessage>> {
        /* Implementation Hidden */
    }
}

```