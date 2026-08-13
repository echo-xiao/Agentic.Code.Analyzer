## File: apps/meteor/tests/e2e/page-objects/fragments/modals/omnichannel-contact-review-modal.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Modal } from './modal';
import { expect } from '../../../utils/test';
import { Listbox } from '../listbox';

export class OmnichannelContactReviewModal extends Modal {
	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private getFieldByName(name: string): Locator {
        /* Implementation Hidden */
    }

	async solveConfirmation(field: string, value: string) {
        /* Implementation Hidden */
    }
}

```