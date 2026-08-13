## File: apps/meteor/tests/e2e/page-objects/fragments/modals/confirm-remove-modal.ts

```typescript
import type { Locator } from '@playwright/test';

import { Modal } from './modal';

export class ConfirmRemoveModal extends Modal {
	constructor(root: Locator) {
        /* Implementation Hidden */
    }

	get btnRemove() {
		return this.root.getByRole('button', { name: 'Remove' });
	}

	async confirmRemove() {
        /* Implementation Hidden */
    }
}

```