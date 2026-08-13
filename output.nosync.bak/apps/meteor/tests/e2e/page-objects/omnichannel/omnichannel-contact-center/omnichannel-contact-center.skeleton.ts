## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-contact-center/omnichannel-contact-center.ts

```typescript
import type { Locator } from '@playwright/test';

import { OmnichannelAdmin } from '../omnichannel-admin';

export abstract class OmnichannelContactCenter extends OmnichannelAdmin {
	get tabContacts(): Locator {
		return this.page.getByRole('tab', { name: 'Contacts' });
	}

	get tabChats(): Locator {
		return this.page.getByRole('tab', { name: 'Chats' });
	}
}

```