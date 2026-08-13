## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-custom-fields.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { FlexTab } from '../fragments/flextabs/flextab';
import { Table } from '../fragments/table';

class OmnichannelManageCustomFieldsFlexTab extends FlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputField(): Locator {
		return this.root.getByRole('textbox', { name: 'Field', exact: true });
	}

	get inputLabel(): Locator {
		return this.root.getByRole('textbox', { name: 'Label', exact: true });
	}

	get labelVisible(): Locator {
		return this.root.getByText('Visible');
	}
}

class OmnichannelCustomFieldsTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelCustomFields extends OmnichannelAdmin {
	readonly manageCustomFields: OmnichannelManageCustomFieldsFlexTab;

	readonly table: OmnichannelCustomFieldsTable;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async createNew() {
        /* Implementation Hidden */
    }

	async deleteCustomField(fieldName: string) {
        /* Implementation Hidden */
    }
}

```