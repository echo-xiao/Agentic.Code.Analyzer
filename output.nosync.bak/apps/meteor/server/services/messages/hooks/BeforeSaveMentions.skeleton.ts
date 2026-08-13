## File: apps/meteor/server/services/messages/hooks/BeforeSaveMentions.ts

```typescript
import { api, Team, MeteorError } from '@rocket.chat/core-services';
import type { IMessage, IUser, IRoom } from '@rocket.chat/core-typings';
import { Subscriptions, Users, Rooms } from '@rocket.chat/models';

import { MentionsServer } from '../../../../app/mentions/server/Mentions';
import { settings } from '../../../../app/settings/server';
import { i18n } from '../../../lib/i18n';

class MentionQueries {
	async getUsers(usernames: string[]): Promise<{ type: 'team' | 'user'; _id: string; username?: string; name?: string }[]> {
        /* Implementation Hidden */
    }

	async getUser(userId: string): Promise<IUser | null> {
        /* Implementation Hidden */
    }

	getTotalChannelMembers(rid: string): Promise<number> {
        /* Implementation Hidden */
    }

	getChannels(channels: string[]): Promise<Pick<IRoom, '_id' | 'name' | 'fname' | 'federated'>[]> {
        /* Implementation Hidden */
    }
}

const queries = new MentionQueries();

export const mentionServer = new MentionsServer({
	pattern: () => settings.get<string>('UTF8_User_Names_Validation'),
	messageMaxAll: () => settings.get<number>('Message_MaxAll'),
	getUsers: async (usernames: string[]) => queries.getUsers(usernames),
	getUser: async (userId: string) => queries.getUser(userId),
	getTotalChannelMembers: (rid: string) => queries.getTotalChannelMembers(rid),
	getChannels: (channels: string[]) => queries.getChannels(channels),
	async onMaxRoomMembersExceeded({ sender, rid }: { sender: IMessage['u']; rid: string }): Promise<void> {
		// Get the language of the user for the error notification.
		const { language } = (await this.getUser(sender._id)) || {};
		const msg = i18n.t('Group_mentions_disabled_x_members', { total: this.messageMaxAll(), lng: language });

		void api.broadcast('notify.ephemeralMessage', sender._id, rid, {
			msg,
		});

		// Also throw to stop propagation of 'sendMessage'.
		throw new MeteorError('error-action-not-allowed', msg, {
			method: 'filterATAllTag',
			action: msg,
		});
	},
});

```