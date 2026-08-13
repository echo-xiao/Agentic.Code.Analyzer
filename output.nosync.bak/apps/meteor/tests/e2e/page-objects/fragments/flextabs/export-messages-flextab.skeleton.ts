## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/export-messages-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from './flextab';

export class ExportMessagesFlexTab extends FlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async exposeMethods() {
        /* Implementation Hidden */
    }

	async setMethod(optionName: string) {
        /* Implementation Hidden */
    }

	async exposeOutputFormats() {
        /* Implementation Hidden */
    }

	async setOutputFormat(optionName: string) {
        /* Implementation Hidden */
    }

	getMethodOptionByName(name: string) {
        /* Implementation Hidden */
    }

	getOutputFormatOptionByName(name: string) {
        /* Implementation Hidden */
    }

	async selectAllMessages() {
        /* Implementation Hidden */
    }

	async downloadMessages() {
        /* Implementation Hidden */
    }

	async send() {
        /* Implementation Hidden */
    }

	async setAdditionalEmail(email: string) {
        /* Implementation Hidden */
    }

	getMessageCheckbox(messageText: string): Locator {
        /* Implementation Hidden */
    }

	get inputUsers() {
		return this.root.getByRole('combobox', { name: 'To users' });
	}

	get inputAdditionalEmails() {
		return this.root.getByRole('textbox', { name: 'To additional emails' });
	}

	get method() {
		return this.root.getByTestId('export-messages-method');
	}

	get outputFormat() {
		return this.root.page().getByTestId('export-messages-output-format');
	}

	get downloadButton() {
		return this.root.getByRole('button', { name: 'Download', exact: true });
	}

	get sendButton() {
		return this.root.getByRole('button', { name: 'Send', exact: true });
	}

	get clearSelectionButton() {
		return this.root.page().getByRole('button', { name: 'Clear selection' });
	}
}

```