## File: apps/meteor/app/livechat/server/lib/contacts/createContactFromVisitor.ts

```typescript
import type { ILivechatVisitor, IOmnichannelSource } from '@rocket.chat/core-typings';
import { LivechatRooms } from '@rocket.chat/models';

import { createContact } from './createContact';
import { mapVisitorToContact } from './mapVisitorToContact';

export async function createContactFromVisitor(visitor: ILivechatVisitor, source: IOmnichannelSource): Promise<string> {
    /* Implementation Hidden */
}

```