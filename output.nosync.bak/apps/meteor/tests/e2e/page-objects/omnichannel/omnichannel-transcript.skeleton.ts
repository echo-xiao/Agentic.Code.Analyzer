## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-transcript.ts

```typescript
import type { Locator } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';

export class OmnichannelTranscript extends OmnichannelAdmin {
	get contactCenterChats(): Locator {
		return this.page.locator('//button[contains(.,"Chats")]');
	}

	get contactCenterSearch(): Locator {
		return this.page.locator('[placeholder="Search"]');
	}

	get firstRow(): Locator {
		return this.page.locator('//tr[1]//td[1]');
	}

	get btnOpenChat(): Locator {
		return this.page.getByRole('dialog').getByRole('button', { name: 'Open chat', exact: true });
	}
}

```