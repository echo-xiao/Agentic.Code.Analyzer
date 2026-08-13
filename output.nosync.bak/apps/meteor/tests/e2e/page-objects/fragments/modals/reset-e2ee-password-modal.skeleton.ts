## File: apps/meteor/tests/e2e/page-objects/fragments/modals/reset-e2ee-password-modal.ts

```typescript
import type { Page } from 'playwright-core';

import { Modal } from './modal';
import { LoginPage } from '../../login';

export class ResetE2EEPasswordModal extends Modal {
	private readonly login: LoginPage;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get resetE2EEPasswordButton() {
		return this.root.getByRole('button', { name: 'Reset E2EE password' });
	}

	async confirmReset() {
        /* Implementation Hidden */
    }
}

```