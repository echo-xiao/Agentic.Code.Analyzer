## File: packages/apps/src/server/accessors/SettingRead.ts

```typescript
import type { ISettingRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import type { ProxiedApp } from '../ProxiedApp';

export class SettingRead implements ISettingRead {
	constructor(private readonly app: ProxiedApp) {
        /* Implementation Hidden */
    }

	public getById(id: string): Promise<ISetting> {
        /* Implementation Hidden */
    }

	public async getValueById(id: string): Promise<any> {
        /* Implementation Hidden */
    }
}

```