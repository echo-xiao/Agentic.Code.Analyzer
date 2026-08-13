## File: apps/meteor/tests/e2e/page-objects/fragments/modals/omnichannel-return-to-queue-modal.ts

```typescript
import type { Page } from '@playwright/test';

import { Modal } from './modal';

export class OmnichannelReturnToQueueModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnReturnToQueueConfirm() {
		return this.root.getByRole('button', { name: 'Confirm' });
	}

	async confirm() {
        /* Implementation Hidden */
    }
}

```