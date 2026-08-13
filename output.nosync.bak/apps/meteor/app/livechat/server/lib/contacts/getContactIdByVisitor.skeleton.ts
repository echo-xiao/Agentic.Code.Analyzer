## File: apps/meteor/app/livechat/server/lib/contacts/getContactIdByVisitor.ts

```typescript
import type { ILivechatContact, ILivechatContactVisitorAssociation } from '@rocket.chat/core-typings';
import { LivechatContacts } from '@rocket.chat/models';

export async function getContactIdByVisitor(visitor: ILivechatContactVisitorAssociation): Promise<ILivechatContact['_id'] | undefined> {
    /* Implementation Hidden */
}

```