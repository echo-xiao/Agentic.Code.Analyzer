## File: apps/meteor/app/settings/server/functions/overrideGenerator.ts

```typescript
import type { ISetting, SettingValueMultiSelect, SettingValueRoomPick } from '@rocket.chat/core-typings';

import { convertValue } from './convertValue';

const compareSettingsValue = (a: ISetting['value'], b: ISetting['value'], type?: ISetting['type']): boolean => {
    /* Implementation Hidden */
};

export const overrideGenerator =
	(fn: (key: string) => string | undefined) =>
	(setting: ISetting): ISetting => {
		const overwriteValue = fn(setting._id);
		if (overwriteValue === null || overwriteValue === undefined) {
			return setting;
		}

		try {
			const value = convertValue(overwriteValue, setting.type);

			if (compareSettingsValue(value, setting.value, setting.type)) {
				return setting;
			}

			return {
				...setting,
				value,
				processEnvValue: value,
				valueSource: 'processEnvValue',
			};
		} catch (error) {
			console.error(`Error converting value for setting ${setting._id} expected "${setting.type}" type`);
			return setting;
		}
	};

```