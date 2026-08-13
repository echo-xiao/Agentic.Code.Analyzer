## File: apps/meteor/tests/e2e/page-objects/fragments/user-card.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { expect } from '../../utils/test';

export class UserCard {
	readonly root: Locator;

	constructor(protected page: Page) {
        /* Implementation Hidden */
    }

	waitForDisplay() {
        /* Implementation Hidden */
    }

	waitForDismissal() {
        /* Implementation Hidden */
    }

	get btnSeeFullProfile(): Locator {
		return this.root.getByRole('button', { name: 'See full profile', exact: true });
	}

	get imgUserCard(): Locator {
		return this.root.locator('img');
	}

	async openUserInfo() {
        /* Implementation Hidden */
    }
}

```