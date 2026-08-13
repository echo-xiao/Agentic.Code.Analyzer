## File: apps/meteor/tests/e2e/page-objects/fragments/modals/enable-room-encryption-modal.ts

```typescript
import type { Page } from 'playwright-core';

import { Modal } from './modal';
import { ToastMessages } from '../toast-messages';

export class EnableRoomEncryptionModal extends Modal {
	private readonly toastMessages: ToastMessages;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get enableButton() {
		return this.root.getByRole('button', { name: 'Enable encryption' });
	}

	async enable() {
        /* Implementation Hidden */
    }
}

```