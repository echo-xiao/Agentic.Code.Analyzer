## File: apps/meteor/tests/e2e/page-objects/fragments/modals/omnichannel-on-hold-modal.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Modal } from './modal';

export class OmnichannelOnHoldModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnPlaceChatOnHold(): Locator {
		return this.root.getByRole('button', { name: 'Place chat On-Hold' });
	}

	async confirm(): Promise<void> {
        /* Implementation Hidden */
    }
}

```