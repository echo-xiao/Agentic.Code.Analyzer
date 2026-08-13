## File: apps/meteor/tests/e2e/page-objects/fragments/modals/omnichannel-reset-priorities-modal.ts

```typescript
import type { Page } from '@playwright/test';

import { Modal } from './modal';

export class OmnichannelResetPrioritiesModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnResetConfirm() {
		return this.root.getByRole('button', { name: 'Reset' });
	}

	async reset() {
        /* Implementation Hidden */
    }
}

```