## File: apps/meteor/tests/e2e/page-objects/fragments/toast-messages.ts

```typescript
import type { Page } from '@playwright/test';

import { expect } from '../../utils/test';

export class ToastMessages {
	constructor(private readonly page: Page) {
        /* Implementation Hidden */
    }

	private readonly toastByType = {
		success: this.page.locator('.rcx-toastbar--success'),
		error: this.page.locator('.rcx-toastbar--error'),
	};

	async dismissToast(type: 'success' | 'error' = 'success') {
        /* Implementation Hidden */
    }

	waitForDisplay({ type, message }: { type: 'success' | 'error'; message?: string } = { type: 'success' }) {
        /* Implementation Hidden */
    }
}

```