## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-tags.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { FlexTab } from '../fragments/flextabs/flextab';
import { Listbox } from '../fragments/listbox';
import { Table } from '../fragments/table';

class OmnichannelEditTagFlexTab extends FlexTab {
	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputDepartments(): Locator {
		return this.root.getByLabel('Departments').getByRole('textbox');
	}

	async selectDepartment(name: string) {
        /* Implementation Hidden */
    }
}

class OmnichannelTagsTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelTags extends OmnichannelAdmin {
	readonly editTag: OmnichannelEditTagFlexTab;

	readonly table: OmnichannelTagsTable;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async createNew() {
        /* Implementation Hidden */
    }

	async deleteTag(name: string) {
        /* Implementation Hidden */
    }
}

```