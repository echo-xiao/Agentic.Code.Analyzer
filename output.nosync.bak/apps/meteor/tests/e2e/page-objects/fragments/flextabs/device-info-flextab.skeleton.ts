## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/device-info-flextab.ts

```typescript
import type { Locator } from '@playwright/test';

import { FlexTab } from './flextab';

export class DeviceInfoFlexTab extends FlexTab {
	constructor(locator: Locator) {
        /* Implementation Hidden */
    }

	get btnLogoutDevice(): Locator {
		return this.root.getByRole('button', { name: 'Log out device' });
	}

	getDeviceInfoId(deviceId: string): Locator {
        /* Implementation Hidden */
    }
}

```