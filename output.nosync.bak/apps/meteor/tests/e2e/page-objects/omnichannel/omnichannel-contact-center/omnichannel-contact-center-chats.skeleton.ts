## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-contact-center/omnichannel-contact-center-chats.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelContactCenter } from './omnichannel-contact-center';
import { FlexTab } from '../../fragments/flextabs/flextab';
import { Listbox } from '../../fragments/listbox';
import { OmnichannelConfirmRemoveChat } from '../../fragments/modals';
import { Table } from '../../fragments/table';

class OmnichannelConversationFlexTab extends FlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnOpenChat(): Locator {
		return this.root.getByRole('button', { name: 'Open chat' });
	}

	async openChat() {
        /* Implementation Hidden */
    }
}

export class OmnichannelChatsFilters extends FlexTab {
	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputFrom(): Locator {
		return this.root.locator('input[name="from"]');
	}

	get inputTo(): Locator {
		return this.root.locator('input[name="to"]');
	}

	get btnApply(): Locator {
		return this.root.getByRole('button', { name: 'Apply' });
	}

	get inputServedBy(): Locator {
		return this.root.getByLabel('Served By').locator('input');
	}

	get inputDepartment(): Locator {
		return this.root.getByLabel('Department').locator('input');
	}

	get selectStatusContainer(): Locator {
		return this.root.getByRole('button', { name: 'Status' });
	}

	get inputTags(): Locator {
		return this.root.getByLabel('Tags').locator('input');
	}

	get inputUnits(): Locator {
		return this.root.getByLabel('Units').locator('input');
	}

	get btnClearFilters(): Locator {
		return this.root.getByRole('button', { name: 'Clear filters' });
	}

	async selectServedBy(option: string) {
        /* Implementation Hidden */
    }

	async selectStatus(option: string) {
        /* Implementation Hidden */
    }

	async selectDepartment(option: string) {
        /* Implementation Hidden */
    }

	async selectTag(option: string) {
        /* Implementation Hidden */
    }

	async removeTag(option: string) {
        /* Implementation Hidden */
    }

	async selectUnit(unitName: string) {
        /* Implementation Hidden */
    }

	async addTag(option: string) {
        /* Implementation Hidden */
    }
}

class OmnichannelContactCenterChatsTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	btnRemoveByName(name: string): Locator {
        /* Implementation Hidden */
    }
}

export class OmnichannelContactCenterChats extends OmnichannelContactCenter {
	readonly filters: OmnichannelChatsFilters;

	readonly confirmRemoveChatModal: OmnichannelConfirmRemoveChat;

	readonly conversation: OmnichannelConversationFlexTab;

	readonly table: OmnichannelContactCenterChatsTable;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async removeChatByName(name: string) {
        /* Implementation Hidden */
    }

	async openChat(name: string) {
        /* Implementation Hidden */
    }

	get btnFilters(): Locator {
		return this.page.getByRole('button', { name: 'Filters' });
	}

	btnStatusChip(name: string): Locator {
        /* Implementation Hidden */
    }

	btnServedByChip(name: string): Locator {
        /* Implementation Hidden */
    }

	btnDepartmentChip(name: string): Locator {
        /* Implementation Hidden */
    }

	btnSearchChip(name: string): Locator {
        /* Implementation Hidden */
    }

	btnUnitsChip(name: string): Locator {
        /* Implementation Hidden */
    }
}

```