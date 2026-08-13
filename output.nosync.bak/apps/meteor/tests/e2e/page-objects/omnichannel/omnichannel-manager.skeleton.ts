## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-manager.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { Listbox } from '../fragments/listbox';
import { Table } from '../fragments/table';

class OmnichannelManagersTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelManager extends OmnichannelAdmin {
	readonly table: OmnichannelManagersTable;

	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async goto() {
        /* Implementation Hidden */
    }

	get inputUsername(): Locator {
		return this.page.getByRole('main').getByLabel('Username');
	}

	async selectUsername(username: string) {
        /* Implementation Hidden */
    }

	get btnAddManager(): Locator {
		return this.page.getByRole('button', { name: 'Add manager' });
	}

	async removeManager(name: string) {
        /* Implementation Hidden */
    }
}

```