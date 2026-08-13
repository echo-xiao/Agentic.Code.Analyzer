## File: apps/meteor/tests/e2e/page-objects/admin-integrations.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Admin } from './admin';

export class AdminIntegrations extends Admin {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnInstructions(): Locator {
		return this.page.getByRole('button', { name: 'Instructions', exact: true });
	}

	codeExamplePayload(text: string): Locator {
        /* Implementation Hidden */
    }

	get inputName(): Locator {
		return this.page.getByRole('textbox', { name: 'Name' });
	}

	get inputPostToChannel(): Locator {
		return this.page.getByRole('textbox', { name: 'Post to Channel' });
	}

	get inputPostAs(): Locator {
		return this.page.getByRole('textbox', { name: 'Post as' });
	}

	getIntegrationByName(name: string): Locator {
        /* Implementation Hidden */
    }

	get inputWebhookUrl(): Locator {
		return this.page.getByRole('textbox', { name: 'Webhook URL' });
	}

	async deleteIntegrationByName(name: string) {
        /* Implementation Hidden */
    }
}

```