## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/user-info-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from './flextab';
import { MenuMore } from '../menu';

export class UserInfoFlexTab extends FlexTab {
	readonly menu: MenuMore;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnEdit(): Locator {
		return this.root.getByRole('button', { name: 'Edit' });
	}

	get btnMoreActions(): Locator {
		return this.root.getByRole('button', { name: 'More' });
	}

	get menuItemDeleteUser(): Locator {
		return this.menu.root.getByRole('menuitem', { name: 'Delete' });
	}

	get username(): Locator {
		return this.root.getByLabel('Username');
	}

	async openMoreActions() {
        /* Implementation Hidden */
    }
}

```