## File: apps/meteor/tests/e2e/page-objects/fragments/modals/create-new-modal.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Listbox } from '../listbox';
import { Modal } from './modal';

export abstract class CreateNewModal extends Modal {
	readonly listbox: Listbox;

	constructor(root: Locator, page: Page) {
        /* Implementation Hidden */
    }

	get inputName(): Locator {
		return this.root.getByRole('textbox', { name: 'Name' });
	}

	get checkboxPrivate(): Locator {
		return this.root.locator('label', { hasText: 'Private' });
	}

	get checkboxEncrypted(): Locator {
		return this.root.locator('label', { hasText: 'Encrypted' });
	}

	get checkboxReadOnly(): Locator {
		return this.root.locator('label', { hasText: 'Read-only' });
	}

	get checkboxFederated(): Locator {
		return this.root.locator('label', { hasText: 'Federated' });
	}

	get btnCreate(): Locator {
		return this.root.getByRole('button', { name: 'Create' });
	}

	get inputAddMembers(): Locator {
		return this.root.getByRole('combobox', { name: 'Members' });
	}

	async addMember(memberName: string): Promise<void> {
        /* Implementation Hidden */
    }

	async create() {
        /* Implementation Hidden */
    }
}

export class CreateNewChannelModal extends CreateNewModal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get advancedSettingsAccordion(): Locator {
		return this.root.getByRole('button', { name: 'Advanced settings', exact: true });
	}

	async inviteUserToChannel(username: string) {
        /* Implementation Hidden */
    }
}

export class CreateNewDMModal extends CreateNewModal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get autocompleteUser(): Locator {
		return this.root.getByRole('combobox', { name: 'Select one or more people to message', exact: true });
	}

	async inviteUserToDM(username: string) {
        /* Implementation Hidden */
    }
}

export class CreateNewTeamModal extends CreateNewModal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get advancedSettingsAccordion(): Locator {
		return this.root.getByRole('button', { name: 'Advanced settings', exact: true });
	}
}

export class CreateNewDiscussionModal extends CreateNewModal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputParentRoom(): Locator {
		return this.root.getByRole('textbox', { name: 'Parent channel or team' });
	}

	getParentRoomListItem(name: string): Locator {
        /* Implementation Hidden */
    }

	get inputMessage(): Locator {
		return this.root.getByRole('textbox', { name: 'Message', exact: true });
	}
}

```