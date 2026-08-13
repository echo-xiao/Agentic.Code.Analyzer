## File: apps/meteor/tests/e2e/page-objects/account.ts

```typescript
import type { Page } from '@playwright/test';

import { AccountSidebar, ToastMessages } from './fragments';

export abstract class Account {
	readonly toastMessage: ToastMessages;

	readonly sidebar: AccountSidebar;

	constructor(protected page: Page) {
        /* Implementation Hidden */
    }

	protected get saveChangesButton() {
		return this.page.getByRole('button', { name: 'Save changes' });
	}
}

```