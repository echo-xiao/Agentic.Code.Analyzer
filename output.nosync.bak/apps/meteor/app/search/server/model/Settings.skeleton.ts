## File: apps/meteor/app/search/server/model/Settings.ts

```typescript
import type { SettingValue } from '@rocket.chat/core-typings';

import { Setting } from './Setting';

/**
 * Settings Object allows to manage Setting Objects
 */
export class Settings {
	private settings: Record<string, Setting>;

	constructor(public basekey: string) {
        /* Implementation Hidden */
    }

	add(key: string, type: string, defaultValue: SettingValue, options: Record<string, unknown>) {
        /* Implementation Hidden */
    }

	list() {
        /* Implementation Hidden */
    }

	map() {
        /* Implementation Hidden */
    }

	/**
	 * return the value for key
	 */
	get<TValue>(key: string) {
        /* Implementation Hidden */
    }

	/**
	 * load currently stored values of all settings
	 */
	load() {
        /* Implementation Hidden */
    }
}

```