## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/prune-messages-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from './flextab';
import { Modal } from '../modals/modal';

class ConfirmPruneMessageModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async pruneConfirm(): Promise<void> {
        /* Implementation Hidden */
    }
}

export class PruneMessagesFlexTab extends FlexTab {
	readonly confirmPruneModal: ConfirmPruneMessageModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get labelDoNotPrunePinned(): Locator {
		return this.root.locator('label', { hasText: 'Do not prune pinned messages' });
	}

	get labelFilesOnly(): Locator {
		return this.root.locator('label', { hasText: 'Only remove the attached files, keep messages' });
	}

	async prune(): Promise<void> {
        /* Implementation Hidden */
    }
}

```