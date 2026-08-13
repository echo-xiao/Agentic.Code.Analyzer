## File: apps/meteor/tests/e2e/federation/page-objects/fragments/home-flextab-notificationPreferences.ts

```typescript
import type { Locator, Page } from '@playwright/test';

export class FederationHomeFlextabNotificationPreferences {
	private readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnSave(): Locator {
		return this.page.locator('role=button[name="Save"]');
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