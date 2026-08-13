## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-departments.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { MenuOptions } from '../fragments';
import { Listbox } from '../fragments/listbox';
import { OmnichannelUpsellDepartmentsModal, ConfirmDeleteDepartmentModal } from '../fragments/modals';
import { Table } from '../fragments/table';

class OmnichannelDepartmentsTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

class OmnichannelDepartmentAgentsTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelDepartments extends OmnichannelAdmin {
	readonly departmentsTable: OmnichannelDepartmentsTable;

	readonly agentsTable: OmnichannelDepartmentAgentsTable;

	readonly upsellDepartmentsModal: OmnichannelUpsellDepartmentsModal;

	readonly listbox: Listbox;

	readonly menOptions: MenuOptions;

	override readonly deleteModal: ConfirmDeleteDepartmentModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async createNew() {
        /* Implementation Hidden */
    }

	get labelEnabled() {
		return this.page.locator('label', { hasText: 'Enabled' });
	}

	get inputName() {
		return this.page.getByRole('textbox', { name: 'Name', exact: true });
	}

	get inputEmail() {
		return this.page.getByRole('textbox', { name: 'Email', exact: true });
	}

	get inputConversationClosingTags() {
		return this.page.getByRole('textbox', { name: 'Conversation closing tags', exact: true });
	}

	get btnAddTags() {
		return this.page.getByText('Conversation closing tags', { exact: true }).locator('..').getByRole('button', { name: 'Add' });
	}

	get btnSave() {
		return this.page.getByRole('button', { name: 'Save', exact: true });
	}

	get tabArchivedDepartments() {
		return this.page.getByRole('tab', { name: 'Archived' });
	}

	getDepartmentMenuByName(name: string) {
        /* Implementation Hidden */
    }

	get menuEditOption() {
		return this.menOptions.getMenuItem('Edit');
	}

	get menuDeleteOption() {
		return this.menOptions.getMenuItem('Delete');
	}

	get menuArchiveOption() {
		return this.menOptions.getMenuItem('Archive');
	}

	get menuUnarchiveOption() {
		return this.menOptions.getMenuItem('Unarchive');
	}

	async archiveDepartmentByName(name: string) {
        /* Implementation Hidden */
    }

	get inputUnit(): Locator {
		return this.page.getByLabel('Unit').getByRole('textbox', { name: 'Select an option' });
	}

	btnTag(tagName: string) {
        /* Implementation Hidden */
    }

	errorMessage(message: string): Locator {
        /* Implementation Hidden */
    }

	findOption(optionText: string) {
        /* Implementation Hidden */
    }

	async selectUnit(unitName: string) {
        /* Implementation Hidden */
    }

	get inputAgents() {
		return this.page.getByRole('group', { name: 'Agents' }).getByRole('textbox');
	}

	get btnAddAgent() {
		return this.page.getByRole('group', { name: 'Agents' }).getByRole('button', { name: 'Add', exact: true });
	}

	async createDepartment(departmentName: string, email: string) {
        /* Implementation Hidden */
    }
}

```