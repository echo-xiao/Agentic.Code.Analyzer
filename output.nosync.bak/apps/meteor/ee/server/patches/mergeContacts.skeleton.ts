## File: apps/meteor/ee/server/patches/mergeContacts.ts

```typescript
import type { ILivechatContact, ILivechatContactChannel, ILivechatContactVisitorAssociation } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { LivechatContacts, LivechatRooms, Settings } from '@rocket.chat/models';
import type { ClientSession } from 'mongodb';

import { notifyOnSettingChanged } from '../../../app/lib/server/lib/notifyListener';
import { isSameChannel } from '../../../app/livechat/lib/isSameChannel';
import { ContactMerger } from '../../../app/livechat/server/lib/contacts/ContactMerger';
import { mergeContacts } from '../../../app/livechat/server/lib/contacts/mergeContacts';
import { contactLogger as logger } from '../../app/livechat-enterprise/server/lib/logger';

export const runMergeContacts = async (
	_next: any,
	contactId: string,
	visitor: ILivechatContactVisitorAssociation,
	session?: ClientSession,
): Promise<ILivechatContact | null> => {
    /* Implementation Hidden */
};

mergeContacts.patch(runMergeContacts, () => License.hasModule('contact-id-verification'));

```