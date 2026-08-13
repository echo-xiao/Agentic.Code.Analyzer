## File: apps/meteor/ee/server/api/v1/omnichannel/lib/contacts.ts

```typescript
import type { IUser, ILivechatContactVisitorAssociation } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { LivechatContacts, LivechatRooms, LivechatVisitors } from '@rocket.chat/models';

import { closeRoom } from '../../../../../../app/livechat/server/lib/closeRoom';
import { i18n } from '../../../../../../server/lib/i18n';

export async function changeContactBlockStatus({ block, visitor }: { visitor: ILivechatContactVisitorAssociation; block: boolean }) {
    /* Implementation Hidden */
}

export function ensureSingleContactLicense() {
    /* Implementation Hidden */
}

export async function closeBlockedRoom(association: ILivechatContactVisitorAssociation, user: IUser) {
    /* Implementation Hidden */
}

```