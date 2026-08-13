## File: apps/meteor/tests/e2e/page-objects/admin.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { AdminSidebar, ToastMessages } from './fragments';
import { ConfirmDeleteModal } from './fragments/modals';

export enum AdminSectionsHref {
	Workspace = '/admin/info',
	Subscription = '/admin/subscription',
	Engagement = '/admin/engagement/users',
	Moderation = '/admin/moderation',
	Rooms = '/admin/rooms',
	Users = '/admin/users',
	Invites = '/admin/invites',
	User_Status = '/admin/user-status',
	Permissions = '/admin/permissions',
	Device_Management = '/admin/device-management',
	Email_Inboxes = '/admin/email-inboxes',
	Mailer = '/admin/mailer',
	Third_party_login = '/admin/third-party-login',
	Integrations = '/admin/integrations',
	Import = '/admin/import',
	Reports = '/admin/analytic-reports',
	Sounds = '/admin/sounds',
	Emoji = '/admin/emoji',
	Settings = '/admin/settings',
}
export abstract class Admin {
	readonly sidebar: AdminSidebar;

	readonly deleteModal: ConfirmDeleteModal;

	readonly toastMessage: ToastMessages;

	constructor(protected page: Page) {
        /* Implementation Hidden */
    }

	get btnAdd(): Locator {
		return this.page.getByRole('button', { name: 'Add', exact: true });
	}

	get btnBack(): Locator {
		return this.page.getByRole('button', { name: 'Back', exact: true });
	}

	get btnSave(): Locator {
		return this.page.getByRole('button', { name: 'Save', exact: true });
	}

	get btnNew(): Locator {
		return this.page.getByRole('button', { name: 'New', exact: true });
	}

	get btnDelete(): Locator {
		return this.page.getByRole('button', { name: 'Delete', exact: true });
	}

	getAccordionBtnByName(name: string): Locator {
        /* Implementation Hidden */
    }

	async adminSectionButton(href: AdminSectionsHref): Promise<Locator> {
        /* Implementation Hidden */
    }

	findFileRowByUsername(username: string) {
        /* Implementation Hidden */
    }

	findFileCheckboxByUsername(username: string) {
        /* Implementation Hidden */
    }
}

```