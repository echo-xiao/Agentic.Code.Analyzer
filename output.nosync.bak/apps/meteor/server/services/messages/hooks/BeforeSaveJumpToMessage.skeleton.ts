## File: apps/meteor/server/services/messages/hooks/BeforeSaveJumpToMessage.ts

```typescript
import QueryString from 'node:querystring';
import URL from 'node:url';

import type { MessageAttachment, IMessage, IUser, IOmnichannelRoom, IRoom } from '@rocket.chat/core-typings';
import { isOmnichannelRoom, isQuoteAttachment } from '@rocket.chat/core-typings';

import { createQuoteAttachment } from '../../../../lib/createQuoteAttachment';

const recursiveRemoveAttachments = (attachments: MessageAttachment, deep = 1, quoteChainLimit: number): MessageAttachment => {
    /* Implementation Hidden */
};

const validateAttachmentDeepness = (message: IMessage, quoteChainLimit: number): IMessage => {
    /* Implementation Hidden */
};

const removeQuoteAttachments = (message: IMessage) => {
    /* Implementation Hidden */
};

type JumpToMessageInit = {
	getMessages(messageIds: IMessage['_id'][]): Promise<IMessage[]>;
	getRooms(roomIds: IRoom['_id'][]): Promise<IRoom[] | IOmnichannelRoom[] | null>;
	canAccessRoom(room: IRoom, user: Pick<IUser, '_id' | 'username' | 'name' | 'language'>): Promise<boolean>;
	getUserAvatarURL(user?: string): string;
};

/**
 * Transform URLs in messages into quote attachments
 */
export class BeforeSaveJumpToMessage {
	private getMessages: JumpToMessageInit['getMessages'];

	private getRooms: JumpToMessageInit['getRooms'];

	private canAccessRoom: JumpToMessageInit['canAccessRoom'];

	private getUserAvatarURL: JumpToMessageInit['getUserAvatarURL'];

	constructor(options: JumpToMessageInit) {
        /* Implementation Hidden */
    }

	async createAttachmentForMessageURLs({
		message,
		user: currentUser,
		config,
	}: {
		message: IMessage;
		user: Pick<IUser, '_id' | 'username' | 'name' | 'language'>;
		config: {
			chainLimit: number;
			siteUrl: string;
			useRealName: boolean;
		};
	}): Promise<IMessage> {
        /* Implementation Hidden */
    }
}

```