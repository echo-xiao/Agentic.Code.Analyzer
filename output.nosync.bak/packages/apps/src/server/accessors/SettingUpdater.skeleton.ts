## File: packages/apps/src/server/accessors/SettingUpdater.ts

```typescript
import type { ISettingUpdater } from '@rocket.chat/apps-engine/definition/accessors/ISettingUpdater';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import type { ProxiedApp } from '../ProxiedApp';
import type { AppSettingsManager } from '../managers';

/**
 * Implementation of ISettingUpdater that provides methods to update app settings.
 */
export class SettingUpdater implements ISettingUpdater {
	constructor(
		private readonly app: ProxiedApp,
		private readonly manager: AppSettingsManager,
	) {
        /* Implementation Hidden */
    }

	/**
	 * Updates a single setting value
	 * @param id The setting ID to update
	 * @param value The new value to set
	 * @returns Promise that resolves when the update is complete
	 * @throws Error if the setting doesn't exist
	 */
	public async updateValue(id: ISetting['id'], value: ISetting['value']): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Updates the values for a multi-value setting by overwriting them
	 * @param id The setting ID to update
	 * @param values The new values to set
	 * @returns Promise that resolves when the update is complete
	 * @throws Error if the setting doesn't exist
	 */
	public async updateSelectOptions(id: ISetting['id'], values: ISetting['values']): Promise<void> {
        /* Implementation Hidden */
    }
}

```