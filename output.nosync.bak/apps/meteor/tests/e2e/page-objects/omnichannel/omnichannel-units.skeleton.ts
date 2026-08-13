## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-units.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { FlexTab } from '../fragments/flextabs/flextab';
import { Listbox } from '../fragments/listbox';
import { Table } from '../fragments/table';

export class OmnichannelUnitFlexTab extends FlexTab {
	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get fieldDepartments() {
		return this.root.getByLabel('Departments');
	}

	get inputDepartments() {
		return this.fieldDepartments.getByRole('textbox');
	}

	private get fieldMonitors() {
		return this.root.getByLabel('Monitors');
	}

	get inputMonitors() {
		return this.fieldMonitors.getByRole('textbox');
	}

	get inputVisibility(): Locator {
		return this.root.getByText('Visibility');
	}

	findDepartmentsChipOption(name: string) {
        /* Implementation Hidden */
    }

	findMonitorChipOption(name: string) {
        /* Implementation Hidden */
    }

	async selectDepartment(name: string) {
        /* Implementation Hidden */
    }

	async selectMonitor(option: string) {
        /* Implementation Hidden */
    }

	async removeMonitor(option: string) {
        /* Implementation Hidden */
    }

	async selectVisibility(option: string) {
        /* Implementation Hidden */
    }
}

class OmnichannelUnitsTable extends Table {
	constructor(page: Locator) {
        /* Implementation Hidden */
    }

	deleteUnitByName(name: string) {
        /* Implementation Hidden */
    }
}

export class OmnichannelUnits extends OmnichannelAdmin {
	readonly manageUnit: OmnichannelUnitFlexTab;

	readonly table: OmnichannelUnitsTable;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async createNew() {
        /* Implementation Hidden */
    }

	async deleteUnit(name: string) {
        /* Implementation Hidden */
    }
}

```