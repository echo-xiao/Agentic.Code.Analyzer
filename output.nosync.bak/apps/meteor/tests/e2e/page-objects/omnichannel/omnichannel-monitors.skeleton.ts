## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-monitors.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { Listbox } from '../fragments/listbox';
import { Table } from '../fragments/table';

class OmnichannelMonitorsTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelMonitors extends OmnichannelAdmin {
	readonly table: OmnichannelMonitorsTable;

	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnAddMonitor(): Locator {
		return this.page.getByRole('button', { name: 'Add monitor' });
	}

	get inputMonitor(): Locator {
		return this.page.locator('input[name="monitor"]');
	}

	private btnRemoveByName(name: string): Locator {
        /* Implementation Hidden */
    }

	private async selectMonitor(name: string) {
        /* Implementation Hidden */
    }

	async removeMonitor(name: string) {
        /* Implementation Hidden */
    }

	async addMonitor(name: string) {
        /* Implementation Hidden */
    }
}

```