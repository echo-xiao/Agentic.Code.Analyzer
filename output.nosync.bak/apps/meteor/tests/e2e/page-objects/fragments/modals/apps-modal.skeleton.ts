## File: apps/meteor/tests/e2e/page-objects/fragments/modals/apps-modal.ts

```typescript
import type { Locator, Page } from 'playwright-core';

import { Modal } from './modal';

export class AppsModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get textInput(): Locator {
		return this.root.locator('[name="modal_input"]');
	}

	get textInputErrorMessage(): Locator {
		return this.root.getByText('Validation failed');
	}

	get btnSubmit(): Locator {
		return this.root.getByRole('button', { name: 'Submit' });
	}

	async submit(inputText: string) {
        /* Implementation Hidden */
    }
}

```