## File: apps/meteor/tests/e2e/page-objects/fragments/e2ee.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { expect } from '../../utils/test';

abstract class E2EEBanner {
	constructor(protected root: Locator) {
        /* Implementation Hidden */
    }

	click() {
        /* Implementation Hidden */
    }

	async waitForDisappearance() {
        /* Implementation Hidden */
    }
}

export class SaveE2EEPasswordBanner extends E2EEBanner {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class EnterE2EEPasswordBanner extends E2EEBanner {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class E2EEKeyDecodeFailureBanner extends E2EEBanner {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async expectToNotBeVisible() {
        /* Implementation Hidden */
    }
}

```