## File: packages/apps/src/server/accessors/ServerSettingRead.ts

```typescript
import type { IServerSettingRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import type { ServerSettingBridge } from '../bridges/ServerSettingBridge';

export class ServerSettingRead implements IServerSettingRead {
	constructor(
		private readonly settingBridge: ServerSettingBridge,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public getOneById(id: string): Promise<ISetting> {
        /* Implementation Hidden */
    }

	public async getValueById(id: string): Promise<any> {
        /* Implementation Hidden */
    }

	public getAll(): Promise<IterableIterator<ISetting>> {
        /* Implementation Hidden */
    }

	public isReadableById(id: string): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```