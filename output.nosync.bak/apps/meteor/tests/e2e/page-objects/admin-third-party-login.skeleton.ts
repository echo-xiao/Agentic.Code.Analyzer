## File: apps/meteor/tests/e2e/page-objects/admin-third-party-login.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Admin } from './admin';

export class AdminThirdPartyLogin extends Admin {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnNewApplication(): Locator {
		return this.page.getByRole('button', { name: 'New Application', exact: true });
	}

	get inputRedirectURI(): Locator {
		return this.page.getByRole('textbox', { name: 'Redirect URI' });
	}

	get inputApplicationName(): Locator {
		return this.page.getByRole('textbox', { name: 'Application Name' });
	}

	get inputClientId(): Locator {
		return this.page.getByRole('textbox', { name: 'Client ID' });
	}

	get inputClientSecret(): Locator {
		return this.page.getByRole('textbox', { name: 'Client Secret' });
	}

	get inputAuthUrl(): Locator {
		return this.page.getByRole('textbox', { name: 'Authorization URL' });
	}

	get inputTokenUrl(): Locator {
		return this.page.getByRole('textbox', { name: 'Access Token URL' });
	}

	getThirdPartyAppByName(name: string): Locator {
        /* Implementation Hidden */
    }

	async deleteThirdPartyAppByName(name: string) {
        /* Implementation Hidden */
    }
}

```