## File: apps/meteor/tests/e2e/page-objects/fragments/modals/modal.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { expect } from '../../../utils/test';

export abstract class Modal {
	constructor(
		protected root: Locator,
		protected page?: Page,
	) {
        /* Implementation Hidden */
    }

	waitForDisplay() {
        /* Implementation Hidden */
    }

	waitForDismissal() {
        /* Implementation Hidden */
    }

	private get btnClose() {
		return this.root.getByRole('button', { name: 'Close' });
	}

	async close() {
        /* Implementation Hidden */
    }

	private get btnSave() {
		return this.root.getByRole('button', { name: 'Save' });
	}

	async save() {
        /* Implementation Hidden */
    }
}

```