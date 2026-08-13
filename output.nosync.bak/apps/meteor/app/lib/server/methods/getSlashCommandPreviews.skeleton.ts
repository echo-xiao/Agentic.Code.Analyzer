## File: apps/meteor/app/lib/server/methods/getSlashCommandPreviews.ts

```typescript
import type { IMessage, RequiredField, SlashCommandPreviews } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Meteor } from 'meteor/meteor';

import { slashCommands } from '../../../utils/server/slashCommand';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		getSlashCommandPreviews(command: {
			cmd: string;
			params: string;
			msg: RequiredField<Partial<IMessage>, 'rid'>;
		}): SlashCommandPreviews | undefined;
	}
}

export const getSlashCommandPreviews = async (command: {
	cmd: string;
	params: string;
	msg: RequiredField<Partial<IMessage>, 'rid'>;
	userId: string;
}): Promise<SlashCommandPreviews | undefined> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async getSlashCommandPreviews(command) {
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'getSlashCommandPreview',
			});
		}

		return getSlashCommandPreviews({ ...command, userId });
	},
});

```