## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/threads-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from './flextab';

export class ThreadsFlexTab extends FlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get listThreadMessages(): Locator {
		return this.root.getByRole('list', { name: 'Thread message list' });
	}

	get lastThreadMessage(): Locator {
		return this.listThreadMessages.locator('[data-qa-type="message"]').last().locator('[data-qa-type="message-body"]');
	}
}

```