## File: apps/meteor/app/apps/server/converters/contacts.ts

```typescript
import type { IAppContactsConverter, IAppsLivechatContact } from '@rocket.chat/apps';
import type { ILivechatContact } from '@rocket.chat/core-typings';
import { LivechatContacts } from '@rocket.chat/models';

import { transformMappedData } from './transformMappedData';

export class AppContactsConverter implements IAppContactsConverter {
	async convertById(contactId: ILivechatContact['_id']): Promise<IAppsLivechatContact | undefined> {
        /* Implementation Hidden */
    }

	async convertContact(contact: undefined | null): Promise<undefined>;

	async convertContact(contact: ILivechatContact): Promise<IAppsLivechatContact>;

	async convertContact(contact: ILivechatContact | undefined | null): Promise<IAppsLivechatContact | undefined> {
        /* Implementation Hidden */
    }

	convertAppContact(contact: undefined | null): Promise<undefined>;

	convertAppContact(contact: IAppsLivechatContact): Promise<ILivechatContact>;

	async convertAppContact(contact: IAppsLivechatContact | undefined | null): Promise<ILivechatContact | undefined> {
        /* Implementation Hidden */
    }
}

```