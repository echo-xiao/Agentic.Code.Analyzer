## File: apps/meteor/tests/e2e/page-objects/fragments/modals/enter-password-modal.ts

```typescript
import type { Page } from 'playwright-core';

import { Modal } from './modal';
import { ToastMessages } from '../toast-messages';

export class EnterPasswordModal extends Modal {
	readonly toastMessages: ToastMessages;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get inputPassword() {
		return this.root.getByRole('textbox', { name: 'For your security, you must enter your current password to continue' });
	}

	private get btnVerify() {
		return this.root.getByRole('button', { name: 'Verify' });
	}

	async enterPassword(password: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```