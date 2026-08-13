## File: apps/meteor/tests/e2e/page-objects/admin-device-management.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Admin } from './admin';
import { MenuOptions, DevicesTable } from './fragments';
import { DeviceInfoFlexTab } from './fragments/flextabs';
import { ConfirmLogoutModal } from './fragments/modals';

export class AdminDeviceManagement extends Admin {
	readonly deviceInfo: DeviceInfoFlexTab;

	readonly deviceRowMenu: MenuOptions;

	readonly table: DevicesTable;

	readonly logoutModal: ConfirmLogoutModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get adminPageContent(): Locator {
		return this.page.getByRole('main').filter({ has: this.page.getByRole('heading', { name: 'Device management' }) });
	}

	get notAuthorizedMessage(): Locator {
		return this.page.getByRole('main').getByText('You are not authorized to view this page');
	}

	get emptyState(): Locator {
		return this.adminPageContent.getByRole('heading', { name: 'No results found', exact: true });
	}

	async searchUserDevice(user: string): Promise<void> {
        /* Implementation Hidden */
    }

	async getUsersDeviceId(username: string): Promise<string> {
        /* Implementation Hidden */
    }

	async openDeviceOptionsById(deviceId: string) {
        /* Implementation Hidden */
    }

	async logoutDeviceById(deviceId: string) {
        /* Implementation Hidden */
    }
}

```