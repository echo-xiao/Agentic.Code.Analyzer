## File: packages/apps/src/server/managers/AppSettingsManager.ts

```typescript
import { AppMethod } from '@rocket.chat/apps-engine/definition/metadata';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';
import type { ISettingUpdateContext } from '@rocket.chat/apps-engine/definition/settings/ISettingUpdateContext';

import type { AppManager } from '../AppManager';
import { Utilities } from '../misc/Utilities';

export class AppSettingsManager {
	constructor(private manager: AppManager) {
        /* Implementation Hidden */
    }

	public getAppSettings(appId: string): { [key: string]: ISetting } {
        /* Implementation Hidden */
    }

	public getAppSetting(appId: string, settingId: string): ISetting {
        /* Implementation Hidden */
    }

	public async updateAppSetting(appId: string, setting: ISetting): Promise<void> {
        /* Implementation Hidden */
    }
}

```