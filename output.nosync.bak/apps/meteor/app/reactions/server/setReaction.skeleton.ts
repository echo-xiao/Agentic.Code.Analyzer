## File: apps/meteor/app/reactions/server/setReaction.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { Message } from '@rocket.chat/core-services';
import type { IMessage, IRoom, IUser } from '@rocket.chat/core-typings';
import { Messages, EmojiCustom, Rooms, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../server/lib/authorization/hasPermission';
import { callbacks } from '../../../server/lib/callbacks';
import { i18n } from '../../../server/lib/i18n';
import { isTheLastMessage } from '../../../server/lib/messages/isTheLastMessage';
import { canAccessRoomAsync } from '../../authorization/server';
import { emoji } from '../../emoji/server';
import { notifyOnMessageChange } from '../../lib/server/lib/notifyListener';

export const removeUserReaction = (message: IMessage, reaction: string, username: string) => {
    /* Implementation Hidden */
};

export async function setReaction(room: IRoom, user: IUser, message: IMessage, reaction: string, userAlreadyReacted?: boolean) {
    /* Implementation Hidden */
}

export async function executeSetReaction(
	userId: string,
	reaction: string,
	messageParam: IMessage['_id'] | IMessage,
	shouldReact?: boolean,
) {
    /* Implementation Hidden */
}

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		setReaction(reaction: string, messageId: IMessage['_id'], shouldReact?: boolean): boolean | undefined;
	}
}

```