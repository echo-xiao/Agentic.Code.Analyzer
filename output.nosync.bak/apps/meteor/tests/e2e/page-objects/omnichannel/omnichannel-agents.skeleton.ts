## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-agents.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { FlexTab } from '../fragments/flextabs/flextab';
import { Listbox } from '../fragments/listbox';
import { Table } from '../fragments/table';

class OmnichannelEditAgentFlexTab extends FlexTab {
	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputMaxChats(): Locator {
		return this.root.locator('input[name="maxNumberSimultaneousChat"]');
	}

	get inputDepartment(): Locator {
		return this.root.getByLabel('Departments').getByRole('textbox');
	}

	getDepartmentOption(name: string) {
        /* Implementation Hidden */
    }

	async selectDepartment(name: string) {
        /* Implementation Hidden */
    }

	findSelectedDepartment(name: string) {
        /* Implementation Hidden */
    }

	private get inputStatus(): Locator {
		return this.root.getByText('Status', { exact: true });
	}

	async selectStatus(status: string) {
        /* Implementation Hidden */
    }
}

class OmnichannelAgentInfoFlexTab extends FlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnEdit(): Locator {
		return this.root.getByRole('button', { name: 'Edit', exact: true });
	}

	get btnRemove(): Locator {
		return this.root.getByRole('button', { name: 'Remove', exact: true });
	}
}

class OmnichannelAgentsTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelAgents extends OmnichannelAdmin {
	readonly editAgent: OmnichannelEditAgentFlexTab;

	readonly agentInfo: OmnichannelAgentInfoFlexTab;

	readonly table: OmnichannelAgentsTable;

	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputUsername(): Locator {
		return this.page.getByRole('textbox', { name: 'Username' });
	}

	get btnAddAgent(): Locator {
		return this.page.getByRole('button', { name: 'Add agent', exact: true });
	}

	async deleteAgent(name: string) {
        /* Implementation Hidden */
    }

	get scrollContainer(): Locator {
		return this.page.locator('#position-container').getByTestId('virtuoso-scroller');
	}

	scrollToListBottom() {
        /* Implementation Hidden */
    }

	async selectUsername(username: string) {
        /* Implementation Hidden */
    }
}

```