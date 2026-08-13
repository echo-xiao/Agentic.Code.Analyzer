## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-business-hours.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { Listbox } from '../fragments/listbox';
import { Table } from '../fragments/table';

class OmnichannelBusinessHoursTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelBusinessHours extends OmnichannelAdmin {
	readonly table: OmnichannelBusinessHoursTable;

	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnCreateBusinessHour(): Locator {
		return this.page.locator('header').getByRole('button', { name: 'New', exact: true });
	}

	get btnSave(): Locator {
		return this.page.getByRole('button', { name: 'Save', exact: true });
	}

	get btnBack(): Locator {
		return this.page.locator('header').getByRole('button', { name: 'Back', exact: true });
	}

	get inputName(): Locator {
		return this.page.getByRole('textbox', { name: 'Name', exact: true });
	}

	get fieldDepartment(): Locator {
		return this.page.getByLabel('Departments', { exact: true });
	}

	get inputDepartments(): Locator {
		return this.fieldDepartment.getByRole('textbox');
	}

	async deleteBusinessHour(name: string) {
        /* Implementation Hidden */
    }

	getCheckboxByLabel(name: string): Locator {
        /* Implementation Hidden */
    }

	findDepartmentsChipOption(name: string) {
        /* Implementation Hidden */
    }

	async selectDepartment(name: string) {
        /* Implementation Hidden */
    }
}

```