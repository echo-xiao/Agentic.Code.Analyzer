## File: apps/meteor/tests/e2e/page-objects/admin-users.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Admin } from './admin';
import { MenuMoreActions, UserInfoFlexTab, EditUserFlexTab } from './fragments';
import { expect } from '../utils/test';

type UserActions = 'Make Admin' | 'Remove Admin' | 'Activate' | 'Deactivate';

export class AdminUsers extends Admin {
	readonly editUser: EditUserFlexTab;

	readonly userInfo: UserInfoFlexTab;

	readonly userRowMenu: MenuMoreActions;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnNewUser(): Locator {
		return this.page.getByRole('button', { name: 'New user', exact: true });
	}

	get btnInvite(): Locator {
		return this.page.getByRole('button', { name: 'Invite', exact: true });
	}

	private get inputSearchUsers(): Locator {
		return this.page.getByRole('textbox', { name: 'Search Users' });
	}

	get btnMoreActionsMenu(): Locator {
		return this.page.getByRole('button', { name: 'More actions' });
	}

	getUserRowByUsername(username: string): Locator {
        /* Implementation Hidden */
    }

	getTabByName(name: 'All' | 'Pending' | 'Active' | 'Deactivated' = 'All'): Locator {
        /* Implementation Hidden */
    }

	private async openUserActionMenu(username: string): Promise<void> {
        /* Implementation Hidden */
    }

	async dispatchUserAction(username: string, action: UserActions) {
        /* Implementation Hidden */
    }

	async activatePendingUser(username: string): Promise<void> {
        /* Implementation Hidden */
    }

	async deleteUser(username: string): Promise<void> {
        /* Implementation Hidden */
    }

	async searchUser(username: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```