## File: apps/meteor/app/search/server/model/Setting.ts

```typescript
import type { SettingValue } from '@rocket.chat/core-typings';

import { settings } from '../../../settings/server';

/**
 * Setting Object in order to manage settings loading for providers and admin ui display
 */
export class Setting {
	private readonly _basekey: string;

	public readonly key: string;

	public readonly type: string;

	public readonly defaultValue: SettingValue;

	public readonly options: Record<string, unknown>;

	private _value: SettingValue;

	constructor(basekey: string, key: string, type: string, defaultValue: SettingValue, options = {}) {
        /* Implementation Hidden */
    }

	get value() {
		return this._value;
	}

	/**
	 * Id is generated based on baseKey and key
	 */
	get id() {
		return `Search.${this._basekey}.${this.key}`;
	}

	load() {
        /* Implementation Hidden */
    }
}

```