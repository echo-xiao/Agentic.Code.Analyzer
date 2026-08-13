## File: apps/meteor/app/emoji-custom/server/methods/deleteEmojiCustom.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { ICustomEmojiDescriptor } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { EmojiCustom } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { RocketChatFileEmojiCustomInstance } from '../startup/emoji-custom';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		deleteEmojiCustom(emojiID: ICustomEmojiDescriptor['_id']): boolean;
	}
}

export const deleteEmojiCustom = async (userId: string, emojiID: ICustomEmojiDescriptor['_id']): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async deleteEmojiCustom(emojiID) {
		methodDeprecationLogger.method('deleteEmojiCustom', '9.0.0', '/v1/emoji-custom.delete');
		if (!this.userId) {
			throw new Meteor.Error('not_authorized');
		}

		return deleteEmojiCustom(this.userId, emojiID);
	},
});

```