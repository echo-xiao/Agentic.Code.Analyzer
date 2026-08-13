## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/notification-preferences-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from './flextab';
import { Listbox } from '../listbox';

export class NotificationPreferencesFlexTab extends FlexTab {
	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	getPreferenceByDevice(device: string): Locator {
        /* Implementation Hidden */
    }

	async selectDropdownById(text: string): Promise<void> {
        /* Implementation Hidden */
    }

	async selectOptionByLabel(text: string): Promise<void> {
        /* Implementation Hidden */
    }

	async selectDevice(text: string): Promise<void> {
        /* Implementation Hidden */
    }

	async updateDevicePreference(device: string): Promise<void> {
        /* Implementation Hidden */
    }

	async updateAllNotificationPreferences(): Promise<void> {
        /* Implementation Hidden */
    }
}

```