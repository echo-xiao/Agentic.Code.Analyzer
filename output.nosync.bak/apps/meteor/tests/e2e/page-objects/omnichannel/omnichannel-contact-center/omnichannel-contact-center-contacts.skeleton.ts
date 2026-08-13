## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-contact-center/omnichannel-contact-center-contacts.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelContactInfo } from '../omnichannel-info';
import { OmnichannelContactCenter } from './omnichannel-contact-center';
import { MenuMoreActions } from '../../fragments';
import { OmnichannelEditContactFlexTab } from '../../fragments/flextabs';
import { OmnichannelDeleteContactModal } from '../../fragments/modals';
import { Table } from '../../fragments/table';

class OmnichannelContactCenterContactsTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelContactCenterContacts extends OmnichannelContactCenter {
	readonly contactInfo: OmnichannelContactInfo;

	readonly editContact: OmnichannelEditContactFlexTab;

	readonly table: OmnichannelContactCenterContactsTable;

	readonly deleteContactModal: OmnichannelDeleteContactModal;

	readonly menu: MenuMoreActions;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnNewContact(): Locator {
		return this.page.getByRole('button', { name: 'New contact' });
	}

	async deleteContact(contactName: string) {
        /* Implementation Hidden */
    }
}

```