## File: apps/meteor/app/livechat/server/lib/contacts/migrateVisitorIfMissingContact.ts

```typescript
import type { ILivechatVisitor, IOmnichannelSource, ILivechatContact } from '@rocket.chat/core-typings';
import { LivechatVisitors } from '@rocket.chat/models';

import { livechatContactsLogger as logger } from '../logger';
import { getContactIdByVisitor } from './getContactIdByVisitor';
import { migrateVisitorToContactId } from './migrateVisitorToContactId';

export async function migrateVisitorIfMissingContact(
	visitorId: ILivechatVisitor['_id'],
	source: IOmnichannelSource,
): Promise<ILivechatContact['_id'] | null> {
    /* Implementation Hidden */
}

```