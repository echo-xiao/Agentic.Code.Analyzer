## File: apps/meteor/tests/e2e/page-objects/admin-info.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Admin } from './admin';

export class AdminInfo extends Admin {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get adminPageContent(): Locator {
		return this.page.getByRole('main').filter({ has: this.page.getByRole('heading', { name: 'Workspace' }) });
	}
}

```