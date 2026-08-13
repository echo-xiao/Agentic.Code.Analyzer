## File: apps/meteor/tests/e2e/page-objects/fragments/modals/omnichannel-delete-contact-modal.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Modal } from './modal';

export class OmnichannelDeleteContactModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputConfirmation(): Locator {
		return this.root.getByRole('textbox', { name: 'Confirm Contact Removal' });
	}

	get btnDelete(): Locator {
		return this.root.getByRole('button', { name: 'Delete' });
	}

	async delete() {
        /* Implementation Hidden */
    }
}

```