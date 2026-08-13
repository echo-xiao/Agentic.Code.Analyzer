## File: apps/meteor/tests/e2e/page-objects/fragments/modals/file-upload-modal.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Modal } from './modal';

export class FileUploadModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get inputFileName() {
		return this.root.getByRole('textbox', { name: 'File name' });
	}

	private get updateButton() {
		return this.root.getByRole('button', { name: 'Update' });
	}

	setName(fileName: string) {
        /* Implementation Hidden */
    }

	async update() {
        /* Implementation Hidden */
    }
}

export class FileUploadWarningModal extends Modal {
	constructor(root: Locator) {
        /* Implementation Hidden */
    }

	get btnOk() {
		return this.root.getByRole('button', { name: 'Ok' });
	}

	get btnSendAnyway() {
		return this.root.getByRole('button', { name: 'Send anyway' });
	}

	getContent(text: string) {
        /* Implementation Hidden */
    }

	private get btnCancel() {
		return this.root.getByRole('button', { name: 'Cancel' });
	}

	async cancel() {
        /* Implementation Hidden */
    }

	async confirmSend() {
        /* Implementation Hidden */
    }
}

```