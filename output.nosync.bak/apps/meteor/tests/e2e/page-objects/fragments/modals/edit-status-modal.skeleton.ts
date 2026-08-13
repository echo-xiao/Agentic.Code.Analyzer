## File: apps/meteor/tests/e2e/page-objects/fragments/modals/edit-status-modal.ts

```typescript
import type { Page } from 'playwright-core';

import { Modal } from './modal';
import { ToastMessages } from '../toast-messages';

export class EditStatusModal extends Modal {
	readonly toastMessages: ToastMessages;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get statusMessageInput() {
		return this.root.getByRole('textbox', { name: 'Status' });
	}

	private get statusTypeButton() {
		return this.root.getByRole('button', { name: 'User status menu' });
	}

	private get durationSelect() {
		return this.root.getByLabel('Clear status after');
	}

	get customDateInput() {
		return this.root.getByLabel('Expiration date');
	}

	get customTimeInput() {
		return this.root.getByLabel('Expiration time');
	}

	get btnSubmit() {
		return this.root.getByRole('button', { name: 'Save' });
	}

	get durationError() {
		return this.root.getByRole('alert').filter({ hasText: 'Expiration must be in the future' });
	}

	get durationMissingError() {
		return this.root.getByRole('alert').filter({ hasText: 'Choose date and time' });
	}

	async selectStatusType(status: string): Promise<void> {
        /* Implementation Hidden */
    }

	async setStatusMessage(message: string): Promise<void> {
        /* Implementation Hidden */
    }

	async selectDuration(duration: string): Promise<void> {
        /* Implementation Hidden */
    }

	async changeStatusMessage(statusMessage?: string): Promise<void> {
        /* Implementation Hidden */
    }

	async setStatusWithExpiration({
		message,
		statusType,
		duration,
		customDate,
		customTime,
	}: {
		message?: string;
		statusType?: string;
		duration: string;
		customDate?: string;
		customTime?: string;
	}): Promise<void> {
        /* Implementation Hidden */
    }
}

```