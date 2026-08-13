## File: apps/meteor/app/discussion/server/methods/createDiscussion.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IMessage, IRoom, IUser, MessageAttachmentDefault } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages, Rooms, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { canSendMessageAsync } from '../../../../server/lib/authorization/canSendMessage';
import { hasAtLeastOnePermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { i18n } from '../../../../server/lib/i18n';
import { attachMessage } from '../../../../server/lib/messages/attachMessage';
import { sendMessage } from '../../../../server/lib/messages/sendMessage';
import { addUserToRoom } from '../../../../server/lib/rooms/addUserToRoom';
import { createRoom } from '../../../../server/lib/rooms/createRoom';
import { roomCoordinator } from '../../../../server/lib/rooms/roomCoordinator';
import { afterSaveMessageAsync } from '../../../lib/server/lib/afterSaveMessage';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { settings } from '../../../settings/server';

const getParentRoom = async (rid: IRoom['_id']) => {
    /* Implementation Hidden */
};

async function createDiscussionMessage(
	rid: IRoom['_id'],
	user: IUser,
	drid: IRoom['_id'],
	msg: IMessage['msg'],
	messageEmbedded?: MessageAttachmentDefault,
): Promise<IMessage> {
    /* Implementation Hidden */
}

async function mentionMessage(
	rid: IRoom['_id'],
	{ _id, username, name }: Pick<IUser, '_id' | 'username' | 'name'>,
	messageEmbedded?: MessageAttachmentDefault,
) {
    /* Implementation Hidden */
}

type CreateDiscussionProperties = {
	prid: IRoom['_id'];
	pmid?: IMessage['_id'];
	t_name: string;
	reply?: string;
	users: Array<Exclude<IUser['username'], undefined>>;
	user: IUser;
	encrypted?: boolean;
	topic?: string;
};

const create = async ({
	prid,
	pmid,
	t_name: discussionName,
	reply,
	users,
	user,
	encrypted,
	topic,
}: CreateDiscussionProperties): Promise<IRoom & { rid: string }> => {
    /* Implementation Hidden */
};

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		createDiscussion: typeof create;
	}
}

export const createDiscussion = async (
	userId: string,
	{ prid, pmid, t_name: discussionName, reply, users, encrypted, topic }: Omit<CreateDiscussionProperties, 'user'>,
): Promise<
	IRoom & {
		rid: string;
	}
> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	/**
	 * Create discussion by room or message
	 * @constructor
	 * @param {string} prid - Parent Room Id - The room id, optional if you send pmid.
	 * @param {string} pmid - Parent Message Id - Create the discussion by a message, optional.
	 * @param {string} reply - The reply, optional
	 * @param {string} t_name - discussion name
	 * @param {string[]} users - users to be added
	 * @param {boolean} encrypted - if the discussion's e2e encryption should be enabled.
	 */
	async createDiscussion({ prid, pmid, t_name: discussionName, reply, users, encrypted }: CreateDiscussionProperties) {
		methodDeprecationLogger.method('createDiscussion', '9.0.0', '/v1/rooms.createDiscussion');
		check(prid, Match.Maybe(String));
		check(pmid, Match.Maybe(String));
		check(reply, Match.Maybe(String));
		check(discussionName, String);
		check(users, [String]);
		check(encrypted, Match.Maybe(Boolean));

		const uid = Meteor.userId();
		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'DiscussionCreation',
			});
		}

		return createDiscussion(uid, { prid, pmid, t_name: discussionName, reply, users, encrypted });
	},
});

```