## File: apps/meteor/ee/server/hooks/messages/BeforeSaveCannedResponse.ts

```typescript
import { isILivechatVisitor, isOmnichannelRoom } from '@rocket.chat/core-typings';
import type { IMessage, IRoom, IUser } from '@rocket.chat/core-typings';
import { LivechatVisitors, Users } from '@rocket.chat/models';
import get from 'lodash.get';
import mem from 'mem';

const placeholderFields = {
	'contact.name': {
		from: 'visitor',
		dataKey: 'name',
	},
	'contact.email': {
		from: 'visitor',
		dataKey: 'visitorEmails[0].address',
	},
	'contact.phone': {
		from: 'visitor',
		dataKey: 'phone[0].phoneNumber',
	},
	'agent.name': {
		from: 'agent',
		dataKey: 'name',
	},
	'agent.email': {
		from: 'agent',
		dataKey: 'emails[0].address',
	},
};

export class BeforeSaveCannedResponse {
	static enabled = false;

	private getUser = mem((userId: string) => Users.findOneById(userId, { projection: { name: 1, _id: 1, emails: 1 } }), {
		maxAge: 1000 * 30,
	});

	private getVisitor = mem((visitorId: string) => LivechatVisitors.findOneEnabledById(visitorId), {
		maxAge: 1000 * 30,
	});

	async replacePlaceholders({
		message,
		room,
		user,
	}: {
		message: IMessage;
		room: IRoom;
		user: Pick<IUser, '_id' | 'username' | 'name' | 'emails' | 'language'>;
	}): Promise<IMessage> {
        /* Implementation Hidden */
    }
}

```