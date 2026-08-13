## File: apps/meteor/tests/e2e/federation/page-objects/fragments/home-flextab-members.ts

```typescript
import type { Locator, Page } from '@playwright/test';

export class FederationHomeFlextabMembers {
	private readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	getUserInList(username: string): Locator {
        /* Implementation Hidden */
    }

	get addUsersButton(): Locator {
		return this.page.locator('role=button[name="Add"]');
	}

	get btnRemoveUserFromRoom(): Locator {
		return this.page.locator('[value="removeUser"]');
	}

	get btnMenuUserInfo(): Locator {
		return this.page.getByRole('dialog', { name: 'User Info', exact: true }).getByRole('button', { name: 'More', exact: true });
	}

	getKebabMenuForUser(username: string): Locator {
        /* Implementation Hidden */
    }

	async getOptionFromKebabMenuForUser(optionName: string): Promise<Locator> {
        /* Implementation Hidden */
    }

	async removeUserFromRoom(username: string): Promise<void> {
        /* Implementation Hidden */
    }

	async addMultipleUsers(usernames: string[]) {
        /* Implementation Hidden */
    }

	async showAllUsers() {
        /* Implementation Hidden */
    }
}

```