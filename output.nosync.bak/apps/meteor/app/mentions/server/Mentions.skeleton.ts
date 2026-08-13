## File: apps/meteor/app/mentions/server/Mentions.ts

```typescript
/*
 * Mentions is a named function that will process Mentions
 * @param {Object} message - The message object
 */
import { isE2EEMessage, type IMessage, type IRoom, type IUser } from '@rocket.chat/core-typings';

import { extractMentionsFromMessageAST } from '../../../server/lib/messages/extractMentionsFromMessageAST';
import { type MentionsParserArgs, MentionsParser } from '../lib/MentionsParser';

type MentionsServerArgs = MentionsParserArgs & {
	messageMaxAll: () => number;
	getChannels: (c: string[]) => Promise<Pick<IRoom, '_id' | 'name' | 'fname' | 'federated'>[]>;
	getUsers: (u: string[]) => Promise<{ type: 'team' | 'user'; _id: string; username?: string; name?: string }[]>;
	getUser: (u: string) => Promise<IUser | null>;
	getTotalChannelMembers: (rid: string) => Promise<number>;
	onMaxRoomMembersExceeded: ({ sender, rid }: { sender: IMessage['u']; rid: string }) => Promise<void>;
};

export class MentionsServer extends MentionsParser {
	messageMaxAll: MentionsServerArgs['messageMaxAll'];

	getChannels: MentionsServerArgs['getChannels'];

	getUsers: MentionsServerArgs['getUsers'];

	getUser: MentionsServerArgs['getUser'];

	getTotalChannelMembers: MentionsServerArgs['getTotalChannelMembers'];

	onMaxRoomMembersExceeded: MentionsServerArgs['onMaxRoomMembersExceeded'];

	constructor(args: MentionsServerArgs) {
        /* Implementation Hidden */
    }

	async getUsersByMentions(message: IMessage): Promise<IMessage['mentions']> {
        /* Implementation Hidden */
    }

	async convertMentionsToUsers(mentions: string[], rid: string, sender: IMessage['u']): Promise<IMessage['mentions']> {
        /* Implementation Hidden */
    }

	async getChannelbyMentions(message: IMessage) {
        /* Implementation Hidden */
    }

	async convertMentionsToChannels(channels: string[]): Promise<Pick<IRoom, '_id' | 'name' | 'fname' | 'federated'>[]> {
        /* Implementation Hidden */
    }

	async execute(message: IMessage) {
        /* Implementation Hidden */
    }
}

```