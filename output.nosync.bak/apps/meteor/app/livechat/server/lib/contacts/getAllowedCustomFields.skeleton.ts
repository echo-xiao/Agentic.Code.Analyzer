## File: apps/meteor/app/livechat/server/lib/contacts/getAllowedCustomFields.ts

```typescript
import type { ILivechatCustomField } from '@rocket.chat/core-typings';
import { LivechatCustomField } from '@rocket.chat/models';

export async function getAllowedCustomFields(): Promise<Pick<ILivechatCustomField, '_id' | 'label' | 'regexp' | 'required'>[]> {
    /* Implementation Hidden */
}

```