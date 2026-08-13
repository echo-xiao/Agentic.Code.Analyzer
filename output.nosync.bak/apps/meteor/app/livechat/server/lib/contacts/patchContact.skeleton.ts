## File: apps/meteor/app/livechat/server/lib/contacts/patchContact.ts

```typescript
import type { ILivechatContact } from '@rocket.chat/core-typings';
import { LivechatContacts } from '@rocket.chat/models';

export const patchContact = async (
	contactId: ILivechatContact['_id'],
	data: { set?: Partial<ILivechatContact>; unset?: Partial<Record<keyof ILivechatContact, '' | 1>> },
): Promise<ILivechatContact | null> => {
    /* Implementation Hidden */
};

```