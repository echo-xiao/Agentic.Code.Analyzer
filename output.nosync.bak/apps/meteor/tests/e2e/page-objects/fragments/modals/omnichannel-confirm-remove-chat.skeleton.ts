## File: apps/meteor/tests/e2e/page-objects/fragments/modals/omnichannel-confirm-remove-chat.ts

```typescript
import type { Locator, Page } from 'playwright-core';

import { Modal } from './modal';

export class OmnichannelConfirmRemoveChat extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnConfirmRemove(): Locator {
		return this.root.getByRole('button', { name: 'Delete' });
	}

	async confirm() {
        /* Implementation Hidden */
    }
}

```