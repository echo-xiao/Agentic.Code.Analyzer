## File: apps/meteor/server/api/v1/omnichannel/lib/visitors.ts

```typescript
import type { ILivechatVisitor, IMessage, IOmnichannelRoom, IRoom, IUser, IVisitor } from '@rocket.chat/core-typings';
import { LivechatVisitors, Messages, LivechatRooms, LivechatCustomField } from '@rocket.chat/models';
import type { FindOptions } from 'mongodb';

import { canAccessRoomAsync } from '../../../../lib/authorization/canAccessRoom';
import { callbacks } from '../../../../lib/callbacks';

export async function findVisitorInfo({ visitorId }: { visitorId: IVisitor['_id'] }) {
    /* Implementation Hidden */
}

export async function findVisitedPages({
	roomId,
	pagination: { offset, count, sort },
}: {
	roomId: IRoom['_id'];
	pagination: { offset: number; count: number; sort: FindOptions<IMessage>['sort'] };
}) {
    /* Implementation Hidden */
}

export async function findChatHistory({
	userId,
	roomId,
	visitorId,
	pagination: { offset, count, sort },
}: {
	userId: IUser['_id'];
	roomId: IRoom['_id'];
	visitorId: IVisitor['_id'];
	pagination: { offset: number; count: number; sort: FindOptions<IOmnichannelRoom>['sort'] };
}) {
    /* Implementation Hidden */
}

export async function searchChats({
	userId,
	roomId,
	visitorId,
	searchText,
	closedChatsOnly,
	servedChatsOnly: served,
	source,
	pagination: { offset, count, sort },
}: {
	userId: IUser['_id'];
	roomId: IRoom['_id'];
	visitorId: IVisitor['_id'];
	searchText?: string;
	closedChatsOnly?: string;
	servedChatsOnly?: string;
	source?: string;
	pagination: { offset: number; count: number; sort: FindOptions<IOmnichannelRoom>['sort'] };
}) {
    /* Implementation Hidden */
}

export async function findVisitorsToAutocomplete({
	selector,
}: {
	selector: {
		exceptions?: ILivechatVisitor['_id'][];
		conditions?: Record<string, unknown>;
		term: string;
	};
}) {
    /* Implementation Hidden */
}

export async function findVisitorsByEmailOrPhoneOrNameOrUsernameOrCustomField({
	emailOrPhone,
	nameOrUsername,
	pagination: { offset, count, sort },
}: {
	emailOrPhone?: string;
	nameOrUsername?: RegExp;
	pagination: { offset: number; count: number; sort: FindOptions<IVisitor>['sort'] };
}) {
    /* Implementation Hidden */
}

```