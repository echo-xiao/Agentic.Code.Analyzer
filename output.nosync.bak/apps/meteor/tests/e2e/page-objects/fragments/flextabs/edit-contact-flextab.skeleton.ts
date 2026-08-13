## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/edit-contact-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from './flextab';

export class OmnichannelEditContactFlexTab extends FlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputEmail(): Locator {
		return this.root.locator('input[name="emails.0.address"]');
	}

	get inputPhone(): Locator {
		return this.root.locator('input[name="phones.0.phoneNumber"]');
	}

	get inputContactManager(): Locator {
		return this.root.locator('input[name=contactManager]');
	}

	get btnAddEmail(): Locator {
		return this.root.locator('role=button[name="Add email"]');
	}

	get btnAddPhone(): Locator {
		return this.root.locator('role=button[name="Add phone"]');
	}

	getErrorMessage(message: string): Locator {
        /* Implementation Hidden */
    }
}

```