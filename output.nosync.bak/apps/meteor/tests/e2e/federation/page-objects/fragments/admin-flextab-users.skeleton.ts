## File: apps/meteor/tests/e2e/federation/page-objects/fragments/admin-flextab-users.ts

```typescript
import type { Locator, Page } from '@playwright/test';

export class FederationAdminFlextabUsers {
	private readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnNew(): Locator {
		return this.page.locator('role=button[name="New"]');
	}

	get btnEdit(): Locator {
		return this.page.locator('role=button[name="Edit"]');
	}

	get btnSave(): Locator {
		return this.page.locator('role=button[name="Save"]');
	}

	get inputName(): Locator {
		return this.page.locator('//label[text()="Name"]/following-sibling::span//input');
	}

	get inputUserName(): Locator {
		return this.page.locator('//label[text()="Username"]/following-sibling::span//input');
	}

	get inputEmail(): Locator {
		return this.page.locator('//label[text()="Email"]/following-sibling::span//input').first();
	}

	get inputPassword(): Locator {
		return this.page.locator('//label[text()="Password"]/following-sibling::span//input');
	}

	get checkboxVerified(): Locator {
		return this.page.locator('//label[text()="Email"]/following-sibling::span//input/following-sibling::i');
	}

	async addRole(role: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```