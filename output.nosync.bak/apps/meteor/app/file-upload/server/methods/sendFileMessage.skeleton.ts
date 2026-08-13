## File: apps/meteor/app/file-upload/server/methods/sendFileMessage.ts

```typescript
import type {
	MessageAttachment,
	FileAttachmentProps,
	IUser,
	IUpload,
	AtLeast,
	FilesAndAttachments,
	IMessage,
	FileProp,
} from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Rooms, Uploads, Users } from '@rocket.chat/models';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { isImagePreviewSupported } from './isImagePreviewSupported';
import { getFileExtension } from '../../../../lib/utils/getFileExtension';
import { canAccessRoomAsync } from '../../../../server/lib/authorization/canAccessRoom';
import { callbacks } from '../../../../server/lib/callbacks';
import { SystemLogger } from '../../../../server/lib/logger/system';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { executeSendMessage } from '../../../lib/server/methods/sendMessage';
import { FileUpload } from '../lib/FileUpload';

function validateFileRequiredFields(file: Partial<IUpload>): asserts file is AtLeast<IUpload, '_id' | 'name' | 'type' | 'size'> {
    /* Implementation Hidden */
}

export const parseFileIntoMessageAttachments = async (
	file: Partial<IUpload>,
	roomId: string,
	user: IUser,
): Promise<FilesAndAttachments> => {
    /* Implementation Hidden */
};

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		sendFileMessage: (roomId: string, _store: string, file: Partial<IUpload>, msgData?: Record<string, any>) => boolean;
	}
}

export const sendFileMessage = async (
	userId: string,
	{
		roomId,
		file,
		msgData,
	}: {
		roomId: string;
		file: Partial<IUpload>;
		msgData?: Record<string, any>;
	},
): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async sendFileMessage(roomId, _store, file, msgData = {}) {
		methodDeprecationLogger.method('sendFileMessage', '9.0.0', '/v1/rooms.mediaConfirm/:rid/:fileId');
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'sendFileMessage',
			} as any);
		}

		return sendFileMessage(userId, { roomId, file, msgData });
	},
});

```