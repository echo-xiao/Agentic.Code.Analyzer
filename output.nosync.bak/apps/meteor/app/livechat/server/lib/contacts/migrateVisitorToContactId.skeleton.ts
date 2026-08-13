## File: apps/meteor/app/livechat/server/lib/contacts/migrateVisitorToContactId.ts

```typescript
import type { ILivechatVisitor, IOmnichannelSource, ILivechatContact, IOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatContacts, LivechatRooms } from '@rocket.chat/models';

import { livechatContactsLogger as logger } from '../logger';
import { ContactMerger } from './ContactMerger';
import { createContactFromVisitor } from './createContactFromVisitor';

/**
	This function assumes you already ensured that the visitor is not yet linked to any contact
**/
export async function migrateVisitorToContactId({
	visitor,
	source,
	requireRoom = true,
}: {
	visitor: ILivechatVisitor;
	source: IOmnichannelSource;
	requireRoom?: boolean;
}): Promise<ILivechatContact['_id'] | null> {
    /* Implementation Hidden */
}

```