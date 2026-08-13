## File: apps/meteor/tests/e2e/page-objects/fragments/modals/save-e2ee-password-modal.ts

```typescript
import type { Page } from 'playwright-core';

import { Modal } from './modal';
import { ToastMessages } from '../toast-messages';

export class SaveE2EEPasswordModal extends Modal {
	private readonly toastMessages: ToastMessages;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get password() {
		return this.root.getByLabel('Your E2EE password is:').getByRole('code');
	}

	private get savedPasswordButton() {
		return this.root.getByRole('button', { name: 'I saved my password' });
	}

	async getPassword() {
        /* Implementation Hidden */
    }

	async confirm() {
        /* Implementation Hidden */
    }
}

```