## File: apps/meteor/tests/e2e/page-objects/fragments/modals/delete-account-modal.ts

```typescript
import type { Locator, Page } from 'playwright-core';

import { Modal } from './modal';

export class DeleteAccountModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnDeleteAccount(): Locator {
		return this.root.getByRole('button', { name: 'Delete Account' });
	}

	get btnCancel(): Locator {
		return this.root.getByRole('button', { name: 'Cancel' });
	}

	async confirmDelete({ waitForDismissal = true } = {}): Promise<void> {
        /* Implementation Hidden */
    }

	get deleteAccountDialogMessageWithPassword(): Locator {
		return this.root.getByText('Enter your password to delete your account. This cannot be undone.');
	}

	get inputPassword(): Locator {
		return this.root.getByRole('textbox', { name: 'Enter your password to delete your account. This cannot be undone.' });
	}

	get inputErrorMessage(): Locator {
		return this.root.locator('[role="alert"]', { hasText: 'Invalid password' });
	}
}

```