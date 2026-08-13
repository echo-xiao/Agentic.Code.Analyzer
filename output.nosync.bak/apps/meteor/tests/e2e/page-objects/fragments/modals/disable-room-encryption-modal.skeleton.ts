## File: apps/meteor/tests/e2e/page-objects/fragments/modals/disable-room-encryption-modal.ts

```typescript
import type { Page } from 'playwright-core';

import { Modal } from './modal';
import { ToastMessages } from '../toast-messages';

export class DisableRoomEncryptionModal extends Modal {
	private readonly toastMessages: ToastMessages;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get disableButton() {
		return this.root.getByRole('button', { name: 'Disable encryption' });
	}

	async disable() {
        /* Implementation Hidden */
    }
}

```