## File: apps/meteor/tests/e2e/page-objects/fragments/modals/enter-e2ee-password-modal.ts

```typescript
import type { Page } from '@playwright/test';

import { Modal } from './modal';

export class EnterE2EEPasswordModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get passwordInput() {
		return this.root.getByPlaceholder('Please enter your E2EE password');
	}

	private get forgotPasswordLink() {
		return this.root.getByRole('link', { name: 'Forgot E2EE password?' });
	}

	private get enterE2EEPasswordButton() {
		return this.root.getByRole('button', { name: 'Enable encryption' });
	}

	async enterPassword(password: string) {
        /* Implementation Hidden */
    }

	async forgotPassword() {
        /* Implementation Hidden */
    }
}

```