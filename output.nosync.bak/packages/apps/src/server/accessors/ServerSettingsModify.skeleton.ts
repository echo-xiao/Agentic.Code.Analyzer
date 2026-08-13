## File: packages/apps/src/server/accessors/ServerSettingsModify.ts

```typescript
import type { IServerSettingsModify } from '@rocket.chat/apps-engine/definition/accessors';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import type { ServerSettingBridge } from '../bridges/ServerSettingBridge';

export class ServerSettingsModify implements IServerSettingsModify {
	constructor(
		private readonly bridge: ServerSettingBridge,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async hideGroup(name: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async hideSetting(id: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async modifySetting(setting: ISetting): Promise<void> {
        /* Implementation Hidden */
    }

	public async incrementValue(id: ISetting['id'], value = 1): Promise<void> {
        /* Implementation Hidden */
    }
}

```