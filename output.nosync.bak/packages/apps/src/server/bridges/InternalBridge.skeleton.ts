## File: packages/apps/src/server/bridges/InternalBridge.ts

```typescript
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import { BaseBridge } from './BaseBridge';

export abstract class InternalBridge extends BaseBridge {
	public doGetUsernamesOfRoomById(roomId: string): Promise<Array<string>> {
        /* Implementation Hidden */
    }

	public doGetUsernamesOfRoomByIdSync(roomId: string): Array<string> {
        /* Implementation Hidden */
    }

	public async doGetWorkspacePublicKey(): Promise<ISetting> {
        /* Implementation Hidden */
    }

	protected abstract getUsernamesOfRoomById(roomId: string): Promise<Array<string>>;

	protected abstract getUsernamesOfRoomByIdSync(roomId: string): Array<string>;

	protected abstract getWorkspacePublicKey(): Promise<ISetting>;
}

```