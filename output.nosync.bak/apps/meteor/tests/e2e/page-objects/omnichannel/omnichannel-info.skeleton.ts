## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-info.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from '../fragments/flextabs/flextab';
import { OmnichannelContactReviewModal } from '../fragments/modals';

export class OmnichannelContactInfo extends FlexTab {
	readonly contactReviewModal: OmnichannelContactReviewModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get infoContactEmail(): Locator {
		return this.root.getByRole('list', { name: 'Email' }).getByRole('listitem').first().locator('p');
	}

	get btnEdit(): Locator {
		return this.root.locator('role=button[name="Edit"]');
	}

	get tabHistory(): Locator {
		return this.root.getByRole('tab', { name: 'History' });
	}

	get historyItem(): Locator {
		return this.root.getByRole('listitem').first();
	}

	get historyMessage(): Locator {
		return this.root.getByRole('listitem').first();
	}

	get btnOpenChat(): Locator {
		return this.root.getByRole('button', { name: 'Open chat' });
	}

	get btnSeeConflicts(): Locator {
		return this.root.getByRole('button', { name: 'See conflicts' });
	}

	private get customFieldsGroup() {
		return this.root.getByRole('group', { name: 'Custom Fields' });
	}

	getInfoByValue(value: string): Locator {
        /* Implementation Hidden */
    }

	getVisitorCustomField(label: string): Locator {
        /* Implementation Hidden */
    }

	async solveConflict(field: string, value: string) {
        /* Implementation Hidden */
    }
}

```