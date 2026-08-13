## File: packages/apps/src/server/accessors/ServerSettingUpdater.ts

```typescript
import type { IServerSettingUpdater } from '@rocket.chat/apps-engine/definition/accessors';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import type { AppBridges } from '../bridges';

export class ServerSettingUpdater implements IServerSettingUpdater {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async updateOne(setting: ISetting): Promise<void> {
        /* Implementation Hidden */
    }

	public async incrementValue(id: ISetting['id'], value = 1): Promise<void> {
        /* Implementation Hidden */
    }
}

```