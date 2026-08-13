## File: apps/meteor/app/livechat/server/lib/guests.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import type { ILivechatVisitor, IOmnichannelRoom, IUser, UserStatus } from '@rocket.chat/core-typings';
import {
	LivechatVisitors,
	LivechatCustomField,
	LivechatInquiry,
	LivechatRooms,
	Messages,
	ReadReceipts,
	ReadReceiptsArchive,
	Subscriptions,
	LivechatContacts,
	Users,
} from '@rocket.chat/models';
import UAParser from 'ua-parser-js';

import { parseAgentCustomFields } from './Helper';
import type { ICRMData } from './localTypes';
import { livechatLogger } from './logger';
import { trim } from '../../../../lib/utils/stringUtils';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { i18n } from '../../../../server/lib/i18n';
import { FileUpload } from '../../../file-upload/server';
import {
	notifyOnSubscriptionChanged,
	notifyOnLivechatInquiryChanged,
	notifyOnLivechatInquiryChangedByToken,
} from '../../../lib/server/lib/notifyListener';

export async function saveGuest(
	guestData: Pick<ILivechatVisitor, '_id' | 'name' | 'livechatData'> & { email?: string; phone?: string },
	userId: string,
) {
    /* Implementation Hidden */
}

export async function removeGuest({ _id }: { _id: string }) {
    /* Implementation Hidden */
}

export async function removeContactsByVisitorId({ _id }: { _id: string }) {
    /* Implementation Hidden */
}

async function cleanGuestHistory(_id: string) {
    /* Implementation Hidden */
}

export async function getLivechatRoomGuestInfo(room: IOmnichannelRoom) {
    /* Implementation Hidden */
}

export async function notifyGuestStatusChanged(token: string, status: UserStatus) {
    /* Implementation Hidden */
}

```