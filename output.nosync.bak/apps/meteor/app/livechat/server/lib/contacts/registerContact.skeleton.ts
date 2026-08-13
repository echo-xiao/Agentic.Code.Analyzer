## File: apps/meteor/app/livechat/server/lib/contacts/registerContact.ts

```typescript
import { MeteorError } from '@rocket.chat/core-services';
import type { ILivechatVisitor, IOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatVisitors, Users, LivechatRooms, LivechatInquiry, Rooms, Subscriptions } from '@rocket.chat/models';
import type { MatchKeysAndValues, OnlyFieldsOfType } from 'mongodb';

import { getAllowedCustomFields } from './getAllowedCustomFields';
import { validateCustomFields } from './validateCustomFields';
import { callbacks } from '../../../../../server/lib/callbacks';
import {
	notifyOnRoomChangedById,
	notifyOnSubscriptionChangedByRoomId,
	notifyOnLivechatInquiryChangedByRoom,
} from '../../../../lib/server/lib/notifyListener';

type RegisterContactProps = {
	_id?: string;
	token: string;
	name: string;
	username?: string;
	email?: string;
	phone?: string;
	customFields?: Record<string, unknown | string>;
	contactManager?: {
		username: string;
	};
};

export async function registerContact(
	{ token, name, email = '', phone, username, customFields = {}, contactManager }: RegisterContactProps,
	userId: string,
): Promise<string> {
    /* Implementation Hidden */
}

```