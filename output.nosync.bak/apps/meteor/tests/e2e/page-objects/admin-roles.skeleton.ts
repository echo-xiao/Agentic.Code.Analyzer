## File: apps/meteor/tests/e2e/page-objects/admin-roles.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Admin } from './admin';

export class AdminRoles extends Admin {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnCreateRole(): Locator {
		return this.page.locator('button[name="New role"]');
	}

	openRoleByName(name: string): Locator {
        /* Implementation Hidden */
    }

	get btnUsersInRole(): Locator {
		return this.page.getByRole('dialog').getByRole('button', { name: 'Users in role', exact: true });
	}

	get tableUsersInRole(): Locator {
		return this.page.getByRole('table');
	}

	get inputRoom(): Locator {
		return this.page.locator('input[placeholder="Room"]');
	}

	get inputUsers(): Locator {
		return this.page.locator('input[placeholder="Users"]');
	}

	getUserInRoleRowByUsername(username: string): Locator {
        /* Implementation Hidden */
    }

	removeUserFromRoleByUsername = async (username: string): Promise<void> => {
		await this.getUserInRoleRowByUsername(username).getByRole('button', { name: 'Remove' }).click();
		await this.deleteModal.confirmDelete();
	};
}

```