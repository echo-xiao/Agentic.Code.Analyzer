## File: apps/meteor/client/lib/settings/settings.ts

```typescript
import type { SettingValue } from '@rocket.chat/core-typings';

import { PublicSettings } from '../../stores';

type SettingCallback = (key: string, value: SettingValue) => void;

class Settings {
	private readonly store = PublicSettings.use;

	/** Get a setting value non-reactively */
	peek<TValue = any>(_id: string): TValue | undefined {
        /* Implementation Hidden */
    }

	init(): void {
        /* Implementation Hidden */
    }

	private callbacks = new Map<string, Set<SettingCallback>>();

	private handleChange(key: string, value: SettingValue): void {
        /* Implementation Hidden */
    }

	observe(key: string, callback: SettingCallback): () => void {
        /* Implementation Hidden */
    }
}

/** @deprecated prefer consuming settings from `SettingsContext` instead */
export const settings = new Settings();

settings.init();

```