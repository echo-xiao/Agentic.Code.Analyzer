## File: apps/meteor/tests/e2e/page-objects/fragments/modals/omnichannel-close-chat-modal.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Modal } from './modal';
import { ToastMessages } from '../toast-messages';

export class OmnichannelCloseChatModal extends Modal {
	private readonly toastMessages: ToastMessages;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get inputComment(): Locator {
		return this.root.locator('input[name="comment"]');
	}

	private get btnConfirm(): Locator {
		return this.root.locator('role=button[name="Confirm"]');
	}

	private get labelPDF(): Locator {
		return this.root.locator('label[for="transcript-pdf"]');
	}

	async confirm(comment: string, downloadPDF: boolean): Promise<void> {
        /* Implementation Hidden */
    }
}

```