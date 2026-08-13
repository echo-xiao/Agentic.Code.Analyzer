## File: apps/meteor/app/livechat/server/lib/contacts/disableContact.ts

```typescript
import type { ILivechatContact } from '@rocket.chat/core-typings';
import { LivechatContacts, LivechatRooms } from '@rocket.chat/models';

import { settings } from '../../../../settings/server';
import { removeGuest } from '../guests';

export async function disableContactById(contactId: string): Promise<void> {
    /* Implementation Hidden */
}

```