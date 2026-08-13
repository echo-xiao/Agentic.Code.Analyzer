## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/flextab.ts

```typescript
import type { Locator } from '@playwright/test';

import { expect } from '../../../utils/test';

export abstract class FlexTab {
	/**
	 * @param root should be protected, but for now there are a lot of tests relying on accessing it directly, * so we need to keep it public until we can refactor those tests
	 */
	constructor(public root: Locator) {
        /* Implementation Hidden */
    }

	waitForDisplay() {
        /* Implementation Hidden */
    }

	waitForDismissal() {
        /* Implementation Hidden */
    }

	private get btnClose() {
		return this.root.getByRole('button', { name: 'Close', exact: true });
	}

	get inputName() {
		return this.root.getByRole('textbox', { name: 'Name', exact: true });
	}

	get btnSave() {
		return this.root.getByRole('button', { name: 'Save', exact: true });
	}

	get btnCancel() {
		return this.root.getByRole('button', { name: 'Cancel', exact: true });
	}

	get btnDelete() {
		return this.root.getByRole('button', { name: 'Delete', exact: true });
	}

	get btnReset() {
		return this.root.getByRole('button', { name: 'Reset', exact: true });
	}

	errorMessage(message: string): Locator {
        /* Implementation Hidden */
    }

	async close() {
        /* Implementation Hidden */
    }

	async save() {
        /* Implementation Hidden */
    }
}

```