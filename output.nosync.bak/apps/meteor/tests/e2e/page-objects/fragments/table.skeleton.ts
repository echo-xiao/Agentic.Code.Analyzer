## File: apps/meteor/tests/e2e/page-objects/fragments/table.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { expect } from '../../utils/test';

export abstract class Table {
	constructor(protected root: Locator) {
        /* Implementation Hidden */
    }

	waitForDisplay() {
        /* Implementation Hidden */
    }

	findRowByName(name: string): Locator {
        /* Implementation Hidden */
    }
}

export class DevicesTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async countRowsForUsername(username: string): Promise<number> {
        /* Implementation Hidden */
    }

	getDeviceRowById(deviceId: string): Locator {
        /* Implementation Hidden */
    }

	getColumnHeaderByName(name: string): Locator {
        /* Implementation Hidden */
    }

	async orderByLastLogin() {
        /* Implementation Hidden */
    }
}

```