## File: apps/meteor/app/livechat/server/lib/contacts/mapVisitorToContact.ts

```typescript
import type { ILivechatVisitor, IOmnichannelSource } from '@rocket.chat/core-typings';

import type { CreateContactParams } from './createContact';
import { getAllowedCustomFields } from './getAllowedCustomFields';
import { getContactManagerIdByUsername } from './getContactManagerIdByUsername';
import { validateCustomFields } from './validateCustomFields';

export async function mapVisitorToContact(visitor: ILivechatVisitor, source: IOmnichannelSource): Promise<CreateContactParams> {
    /* Implementation Hidden */
}

```