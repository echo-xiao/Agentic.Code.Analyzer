## File: apps/meteor/server/lib/dataExport/exportRoomMessagesToFile.ts

```typescript
import { mkdir, writeFile } from 'node:fs/promises';

import type { IMessage, IRoom, IUser, MessageAttachment, FileProp, RoomType, IExportOperation } from '@rocket.chat/core-typings';
import { Messages } from '@rocket.chat/models';
import { escapeHTML } from '@rocket.chat/string-helpers';

import { settings } from '../../../app/settings/server';
import { readSecondaryPreferred } from '../../database/readSecondaryPreferred';
import { joinPath } from '../fileUtils';
import { i18n } from '../i18n';

const hideUserName = (username: string, userData: Pick<IUser, 'username'> | undefined, usersMap: Record<string, string>) => {
    /* Implementation Hidden */
};

const getAttachmentData = (attachment: MessageAttachment, message: IMessage) => {
    /* Implementation Hidden */
};

export type MessageData = Pick<IMessage, 'msg' | 'ts'> & {
	username?: IUser['username'] | IUser['name'];
	attachments?: ReturnType<typeof getAttachmentData>[];
	type?: IMessage['t'];
};

export const getMessageData = (
	msg: IMessage,
	hideUsers: boolean,
	userData: Pick<IUser, 'username'> | undefined,
	usersMap: IExportOperation['userNameTable'],
): MessageData => {
    /* Implementation Hidden */
};

export const exportMessageObject = (type: 'json' | 'html', messageObject: MessageData, messageFiles: FileProp[] = []): string => {
    /* Implementation Hidden */
};

export const exportRoomMessages = async (
	rid: IRoom['_id'],
	exportType: 'json' | 'html',
	skip: number,
	limit: number,
	userData: any,
	filter: any = {},
	usersMap: IExportOperation['userNameTable'] = {},
	hideUsers = true,
) => {
    /* Implementation Hidden */
};

export const exportRoomMessagesToFile = async function (
	exportPath: string,
	assetsPath: string,
	exportType: 'json' | 'html',
	roomList: (
		| {
				roomId: string;
				roomName: string;
				userId: string | undefined;
				exportedCount: number;
				status: string;
				type: RoomType;
				targetFile: string;
		  }
		| Record<string, never>
	)[],
	userData: IUser,
	messagesFilter = {},
	usersMap: IExportOperation['userNameTable'] = {},
	hideUsers = true,
) {
    /* Implementation Hidden */
};

```