## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-canned-responses.ts

```typescript
import type { Locator } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';

export class OmnichannelCannedResponses extends OmnichannelAdmin {
	get inputShortcut() {
		return this.page.getByRole('textbox', { name: 'Shortcut', exact: true });
	}

	get inputMessage() {
		return this.page.getByRole('textbox', { name: 'Message', exact: true });
	}

	get radioPublic() {
		return this.page.locator('label', { has: this.page.getByRole('radio', { name: 'Public' }) });
	}

	get radioPrivate() {
		return this.page.locator('label', { has: this.page.getByRole('radio', { name: 'Private' }) });
	}

	get inputTags() {
		return this.page.getByRole('textbox', { name: 'Tags', exact: true });
	}

	get btnAddTag() {
		return this.page.getByRole('button', { name: 'Add', exact: true });
	}

	listItem(name: string) {
        /* Implementation Hidden */
    }

	async addTag(tag: string) {
        /* Implementation Hidden */
    }

	get btnEdit() {
		return this.page.getByRole('button', { name: 'Edit', exact: true });
	}

	get btnSave(): Locator {
		return this.page.getByRole('button', { name: 'Save', exact: true });
	}

	get btnNew(): Locator {
		return this.page.locator('role=button[name="Create canned response"]').first();
	}
}

```