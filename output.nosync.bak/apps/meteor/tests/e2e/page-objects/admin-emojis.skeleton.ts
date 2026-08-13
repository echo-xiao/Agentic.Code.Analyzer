## File: apps/meteor/tests/e2e/page-objects/admin-emojis.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Admin } from './admin';
import { AddEmojiFlexTab, EditEmojiFlexTab } from './fragments/flextabs';

export class AdminEmoji extends Admin {
	readonly addEmojiFlexTab: AddEmojiFlexTab;

	readonly editEmojiFlexTab: EditEmojiFlexTab;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get inputSearch(): Locator {
		return this.page.getByRole('textbox', { name: 'Search' });
	}

	private get emojiTable() {
		return this.page.getByRole('table', { name: 'Emoji' });
	}

	async findEmojiByName(emojiName: string) {
        /* Implementation Hidden */
    }

	async deleteEmoji(emojiName: string) {
        /* Implementation Hidden */
    }
}

```