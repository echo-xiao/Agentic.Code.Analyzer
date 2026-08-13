## File: apps/meteor/tests/e2e/page-objects/fragments/menu.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { expect } from '../../utils/test';

export abstract class Menu {
	constructor(public root: Locator) {
        /* Implementation Hidden */
    }

	waitForDisplay() {
        /* Implementation Hidden */
    }

	waitForDismissal() {
        /* Implementation Hidden */
    }

	getMenuItem(itemName: string) {
        /* Implementation Hidden */
    }

	selectMenuItem(itemName: string) {
        /* Implementation Hidden */
    }
}

export class MenuMore extends Menu {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class MenuMoreActions extends Menu {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class MenuOptions extends Menu {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

```