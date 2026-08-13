## File: apps/meteor/app/livechat/server/lib/contacts/resolveContactConflicts.ts

```typescript
import type { ILivechatContact, ILivechatContactConflictingField } from '@rocket.chat/core-typings';
import { LivechatContacts, Settings } from '@rocket.chat/models';

import { patchContact } from './patchContact';
import { validateContactManager } from './validateContactManager';
import { notifyOnSettingChanged } from '../../../../lib/server/lib/notifyListener';

export type ResolveContactConflictsParams = {
	contactId: string;
	name?: string;
	customFields?: Record<string, unknown>;
	contactManager?: string;
	wipeConflicts?: boolean;
};

export async function resolveContactConflicts(params: ResolveContactConflictsParams): Promise<ILivechatContact> {
    /* Implementation Hidden */
}

```