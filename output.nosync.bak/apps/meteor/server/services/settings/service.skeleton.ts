## File: apps/meteor/server/services/settings/service.ts

```typescript
import type { ISettingsService } from '@rocket.chat/core-services';
import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { SettingValue } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';

import { notifyOnSettingChangedById } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { verifyFingerPrint } from '../../settings/misc';

export class SettingsService extends ServiceClassInternal implements ISettingsService {
	protected name = 'settings';

	async get<T extends SettingValue>(settingId: string): Promise<T> {
        /* Implementation Hidden */
    }

	async set<T extends SettingValue>(settingId: string, value: T): Promise<void> {
        /* Implementation Hidden */
    }

	override async started() {
        /* Implementation Hidden */
    }
}

```