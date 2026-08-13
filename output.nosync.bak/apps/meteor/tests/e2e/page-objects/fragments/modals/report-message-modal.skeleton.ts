## File: apps/meteor/tests/e2e/page-objects/fragments/modals/report-message-modal.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Modal } from './modal';
import { expect } from '../../../utils/test';
import { ToastMessages } from '../toast-messages';

export class ReportMessageModal extends Modal {
	readonly toastMessage: ToastMessages;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputReportDescription(): Locator {
		return this.root.getByRole('textbox', { name: 'Report reason' });
	}

	private get btnSubmitReport(): Locator {
		return this.root.getByRole('button', { name: 'Report' });
	}

	private get btnCancelReport(): Locator {
		return this.root.getByRole('button', { name: 'Cancel' });
	}

	private get alertInputDescription(): Locator {
		return this.root.getByRole('alert');
	}

	async cancelReport(): Promise<void> {
        /* Implementation Hidden */
    }

	async submitReport(description?: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```