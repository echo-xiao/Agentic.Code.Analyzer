## File: apps/meteor/tests/e2e/page-objects/account.manage-devices.ts

```typescript
import type { Locator, Page } from 'playwright-core';

import { Account } from './account';
import { ConfirmLogoutModal, DevicesTable } from './fragments';

export class AccountManageDevices extends Account {
	readonly logoutModal: ConfirmLogoutModal;

	readonly table: DevicesTable;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get devicesPageContent(): Locator {
		return this.page.getByRole('main').filter({ has: this.page.getByRole('heading', { name: 'Manage Devices' }) });
	}

	async getNthDeviceId(nth: number): Promise<string> {
        /* Implementation Hidden */
    }

	async logoutDeviceById(deviceId: string) {
        /* Implementation Hidden */
    }
}

```