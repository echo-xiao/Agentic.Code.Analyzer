## File: apps/meteor/app/settings/server/functions/settings.mocks.ts

```typescript
import type { ISetting } from '@rocket.chat/core-typings';

import type { ICachedSettings } from '../CachedSettings';

type Dictionary = {
	[index: string]: any;
};

class SettingsClass {
	settings: ICachedSettings;

	private delay = 0;

	setDelay(delay: number): void {
        /* Implementation Hidden */
    }

	find(): any[] {
        /* Implementation Hidden */
    }

	public data = new Map<string, Dictionary>();

	public upsertCalls = 0;

	public insertCalls = 0;

	private checkQueryMatch(key: string, data: Dictionary, queryValue: any): boolean {
        /* Implementation Hidden */
    }

	findOne(query: Dictionary): any {
        /* Implementation Hidden */
    }

	insertOne(doc: any): void {
        /* Implementation Hidden */
    }

	updateOne(query: any, update: any, options?: any): void {
        /* Implementation Hidden */
    }

	findOneAndUpdate({ _id }: { _id: string }, value: any, options?: any) {
        /* Implementation Hidden */
    }

	updateValueById(id: string, value: any): void {
        /* Implementation Hidden */
    }
}

export const Settings = new SettingsClass();

```