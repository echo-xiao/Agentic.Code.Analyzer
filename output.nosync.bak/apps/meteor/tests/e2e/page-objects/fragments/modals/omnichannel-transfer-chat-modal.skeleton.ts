## File: apps/meteor/tests/e2e/page-objects/fragments/modals/omnichannel-transfer-chat-modal.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Modal } from './modal';
import { Listbox } from '../listbox';

export class OmnichannelTransferChatModal extends Modal {
	private readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputComment(): Locator {
		return this.root.locator('textarea[name="comment"]');
	}

	get inputForwardDepartment(): Locator {
		return this.root.getByLabel('Forward to department').getByRole('textbox');
	}

	get inputForwardUser(): Locator {
		return this.root.getByLabel('Forward to user').getByRole('textbox');
	}

	get btnForward(): Locator {
		return this.root.locator('role=button[name="Forward"]');
	}

	async selectDepartment(name: string) {
        /* Implementation Hidden */
    }

	async selectUser(name: string, id?: string) {
        /* Implementation Hidden */
    }
}

```