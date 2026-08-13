## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-admin.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { expect } from '../../utils/test';
import { OmnichannelSidebar, ToastMessages } from '../fragments';
import { ConfirmDeleteModal } from '../fragments/modals';

export abstract class OmnichannelAdmin {
	protected readonly page: Page;

	protected readonly toastMessage: ToastMessages;

	readonly sidebar: OmnichannelSidebar;

	readonly deleteModal: ConfirmDeleteModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputSearch() {
		return this.page.getByRole('main').getByRole('textbox', { name: 'Search' });
	}

	get btnSaveChanges(): Locator {
		return this.page.getByRole('button', { name: 'Save changes' });
	}

	getButtonByType(type: 'unit' | 'SLA policy' | 'tag' | 'trigger' | 'department' | 'custom field'): Locator {
        /* Implementation Hidden */
    }

	async search(text: string) {
        /* Implementation Hidden */
    }

	async clearSearch() {
        /* Implementation Hidden */
    }

	waitForEmptyState() {
        /* Implementation Hidden */
    }
}

```