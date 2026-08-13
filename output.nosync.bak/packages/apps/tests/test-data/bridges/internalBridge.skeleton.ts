## File: packages/apps/tests/test-data/bridges/internalBridge.ts

```typescript
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import type { IInternalBridge } from '../../../src/server/bridges';

export class TestsInternalBridge implements IInternalBridge {
	public doGetUsernamesOfRoomByIdSync(roomId: string): Array<string> {
        /* Implementation Hidden */
    }

	public doGetUsernamesOfRoomById(roomId: string): Promise<Array<string>> {
        /* Implementation Hidden */
    }

	public doGetWorkspacePublicKey(): Promise<ISetting> {
        /* Implementation Hidden */
    }
}

```