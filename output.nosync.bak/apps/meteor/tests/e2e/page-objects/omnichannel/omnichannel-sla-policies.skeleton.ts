## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-sla-policies.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { FlexTab } from '../fragments/flextabs/flextab';
import { Table } from '../fragments/table';

class OmnichannelManageSlaPolicyFlexTab extends FlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputDescription(): Locator {
		return this.root.getByRole('textbox', { name: 'Description' });
	}

	get inputEstimatedWaitTime(): Locator {
		return this.root.getByRole('spinbutton', { name: 'Estimated wait time (time in minutes)', exact: true });
	}
}

class OmnichannelSlaPoliciesTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelSlaPolicies extends OmnichannelAdmin {
	readonly manageSlaPolicy: OmnichannelManageSlaPolicyFlexTab;

	readonly table: OmnichannelSlaPoliciesTable;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	btnRemove(name: string) {
        /* Implementation Hidden */
    }

	async removeSLA(name: string) {
        /* Implementation Hidden */
    }

	async createNew() {
        /* Implementation Hidden */
    }

	get txtEmptyState() {
		return this.page.locator('div >> text="No results found"');
	}
}

```