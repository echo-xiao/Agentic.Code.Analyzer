## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/search-messages-flextab.ts

```typescript
import type { Page } from '@playwright/test';

import { FlexTab } from './flextab';

export class SearchMessagesFlexTab extends FlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async search(text: string, { global = false }: { global?: boolean } = {}) {
        /* Implementation Hidden */
    }

	async getResultItem(messageText: string) {
        /* Implementation Hidden */
    }
}

```