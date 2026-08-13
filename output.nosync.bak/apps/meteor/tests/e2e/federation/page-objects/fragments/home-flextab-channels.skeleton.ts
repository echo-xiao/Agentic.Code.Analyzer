## File: apps/meteor/tests/e2e/federation/page-objects/fragments/home-flextab-channels.ts

```typescript
import type { Locator, Page } from '@playwright/test';

export class FederationHomeFlextabChannels {
	private readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnAddExisting(): Locator {
		return this.page.locator('button >> text="Add Existing"');
	}

	get inputChannels(): Locator {
		return this.page.locator('#modal-root input').first();
	}

	get btnAdd(): Locator {
		return this.page.locator('#modal-root button:has-text("Add")');
	}
}

```