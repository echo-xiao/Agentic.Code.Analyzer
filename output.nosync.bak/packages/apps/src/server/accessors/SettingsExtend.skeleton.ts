## File: packages/apps/src/server/accessors/SettingsExtend.ts

```typescript
import type { ISettingsExtend } from '@rocket.chat/apps-engine/definition/accessors';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import type { ProxiedApp } from '../ProxiedApp';

export class SettingsExtend implements ISettingsExtend {
	constructor(private readonly app: ProxiedApp) {
        /* Implementation Hidden */
    }

	public async provideSetting(setting: ISetting): Promise<void> {
        /* Implementation Hidden */
    }
}

```