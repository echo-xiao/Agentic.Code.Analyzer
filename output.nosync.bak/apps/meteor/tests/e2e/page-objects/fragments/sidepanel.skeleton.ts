## File: apps/meteor/tests/e2e/page-objects/fragments/sidepanel.ts

```typescript
import type { Locator, Page } from '@playwright/test';

export class Sidepanel {
	private readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get sidepanel(): Locator {
		return this.page.getByRole('tabpanel', { name: 'Side panel' });
	}

	get sidepanelList(): Locator {
		return this.sidepanel.getByRole('list', { name: 'Channels' });
	}

	get firstChannelFromList(): Locator {
		return this.sidepanelList.getByRole('listitem').first();
	}

	get unreadCheckbox(): Locator {
		return this.sidepanel.getByRole('heading').getByRole('checkbox', { name: 'Unread' });
	}

	get unreadToggleLabel(): Locator {
		return this.sidepanel.getByRole('heading').locator('label', { hasText: 'Unread' });
	}

	get sidepanelBackButton(): Locator {
		return this.sidepanel.getByRole('button', { name: 'Back' });
	}

	getSidepanelHeader(name: string): Locator {
        /* Implementation Hidden */
    }

	getTeamItemByName(name: string): Locator {
        /* Implementation Hidden */
    }

	getMainRoomByName(name: string): Locator {
        /* Implementation Hidden */
    }

	getItemByName(name: string): Locator {
        /* Implementation Hidden */
    }

	getSidepanelItem(name: string, subtitle?: string): Locator {
        /* Implementation Hidden */
    }

	getItemUnreadBadge(item: Locator): Locator {
        /* Implementation Hidden */
    }
}

```