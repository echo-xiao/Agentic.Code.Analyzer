## File: apps/meteor/tests/e2e/page-objects/fragments/listbox.ts

```typescript
import type { Locator, Page } from 'playwright-core';

export class Listbox {
	readonly root: Locator;

	constructor(page: Page, name?: string) {
        /* Implementation Hidden */
    }

	async selectOption(name: string, exact?: boolean) {
        /* Implementation Hidden */
    }

	public getOption(name: string): Locator {
        /* Implementation Hidden */
    }
}

```