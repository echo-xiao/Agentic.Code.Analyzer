## File: apps/meteor/tests/e2e/page-objects/admin-rooms.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Admin } from './admin';
import { EditAdminRoomFlexTab } from './fragments/flextabs';

export class AdminRooms extends Admin {
	readonly editRoom: EditAdminRoomFlexTab;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get adminPageContent(): Locator {
		return this.page.getByRole('main').filter({ has: this.page.getByRole('heading', { name: 'Rooms' }) });
	}

	get inputSearchRooms(): Locator {
		return this.adminPageContent.getByPlaceholder('Search rooms');
	}

	getRoomRow(name?: string): Locator {
        /* Implementation Hidden */
    }

	get btnEdit(): Locator {
		return this.adminPageContent.getByRole('button', { name: 'Edit' });
	}

	dropdownFilterRoomType(text = 'All rooms'): Locator {
        /* Implementation Hidden */
    }
}

```