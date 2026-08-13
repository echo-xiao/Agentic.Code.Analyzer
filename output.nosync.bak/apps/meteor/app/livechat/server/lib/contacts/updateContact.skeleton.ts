## File: apps/meteor/app/livechat/server/lib/contacts/updateContact.ts

```typescript
import type { ILivechatContact, ILivechatContactChannel } from '@rocket.chat/core-typings';
import { LivechatContacts, LivechatInquiry, LivechatRooms, Settings, Subscriptions } from '@rocket.chat/models';

import { getAllowedCustomFields } from './getAllowedCustomFields';
import { patchContact } from './patchContact';
import { validateContactManager } from './validateContactManager';
import { validateCustomFields } from './validateCustomFields';
import {
	notifyOnSubscriptionChangedByVisitorIds,
	notifyOnRoomChangedByContactId,
	notifyOnLivechatInquiryChangedByVisitorIds,
	notifyOnSettingChanged,
} from '../../../../lib/server/lib/notifyListener';

export type UpdateContactParams = {
	contactId: string;
	name?: string;
	emails?: string[];
	phones?: string[];
	customFields?: Record<string, unknown>;
	contactManager?: string;
	channels?: ILivechatContactChannel[];
	wipeConflicts?: boolean;
};

export async function updateContact(params: UpdateContactParams): Promise<ILivechatContact> {
    /* Implementation Hidden */
}

```