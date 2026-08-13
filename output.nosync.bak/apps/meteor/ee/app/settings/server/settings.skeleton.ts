## File: apps/meteor/ee/app/settings/server/settings.ts

```typescript
/* eslint-disable react-hooks/rules-of-hooks */
import type { ISetting, SettingValue, LicenseModule } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { Settings } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { settings, SettingsEvents } from '../../../../app/settings/server';
import { use } from '../../../../app/settings/server/Middleware';

export function changeSettingValue(record: ISetting): SettingValue {
    /* Implementation Hidden */
}

settings.set = use(settings.set, (context, next) => {
	const [record] = context;

	if (!record.enterprise) {
		return next(...context);
	}
	const value = changeSettingValue(record);

	return next({ ...record, value });
});

SettingsEvents.on('fetch-settings', (settings: Array<ISetting>): void => {
	for (const setting of settings) {
		const changedValue = changeSettingValue(setting);
		if (changedValue === undefined) {
			continue;
		}
		setting.value = changedValue;
	}
});

async function updateSettings(): Promise<void> {
    /* Implementation Hidden */
}

Meteor.startup(async () => {
	await updateSettings();

	License.onValidateLicense(updateSettings);
	License.onInvalidateLicense(updateSettings);
	License.onRemoveLicense(updateSettings);
});

```