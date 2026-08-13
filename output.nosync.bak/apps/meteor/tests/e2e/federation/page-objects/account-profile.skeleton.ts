## File: apps/meteor/tests/e2e/federation/page-objects/account-profile.ts

```typescript
import type { Locator, Page } from '@playwright/test';

export class FederationAccountProfile {
	private readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputName(): Locator {
		return this.page.locator('//label[contains(text(), "Name")]/..//input');
	}

	get btnSubmit(): Locator {
		return this.page.getByRole('button', { name: 'Save changes', exact: true });
	}
}

```