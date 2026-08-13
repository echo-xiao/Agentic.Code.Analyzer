## File: apps/meteor/app/lib/server/methods/executeSlashCommandPreview.ts

```typescript
import type { IMessage, RequiredField, SlashCommandPreviewItem } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Meteor } from 'meteor/meteor';

import { slashCommands } from '../../../utils/server/slashCommand';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		executeSlashCommandPreview(
			command: {
				cmd: string;
				params: string;
				msg: RequiredField<Partial<IMessage>, 'rid'>;
				triggerId?: string;
			},
			preview: SlashCommandPreviewItem,
		): void;
	}
}

export const executeSlashCommandPreview = async (
	command: {
		cmd: string;
		params: string;
		msg: RequiredField<Partial<IMessage>, 'rid'>;
		triggerId?: string;
	},
	preview: SlashCommandPreviewItem,
	userId: string,
): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	executeSlashCommandPreview(command, preview) {
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'getSlashCommandPreview',
			});
		}

		return executeSlashCommandPreview(command, preview, userId);
	},
});

```