## File: apps/meteor/server/services/upload/service.ts

```typescript
import fs from 'node:fs';
import type Stream from 'node:stream';

import type { IUploadDetails } from '@rocket.chat/apps-engine/definition/uploads/IUploadDetails';
import { api, ServiceClassInternal } from '@rocket.chat/core-services';
import type { ISendFileLivechatMessageParams, ISendFileMessageParams, IUploadFileParams, IUploadService } from '@rocket.chat/core-services';
import type { IUpload, IUser, FilesAndAttachments, IMessage, AtLeast } from '@rocket.chat/core-typings';
import { isFileAttachment } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { Uploads, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import sharp from 'sharp';

import { FileUpload } from '../../../app/file-upload/server';
import { parseFileIntoMessageAttachments, sendFileMessage } from '../../../app/file-upload/server/methods/sendFileMessage';
import { sendFileLivechatMessage } from '../../../app/livechat/server/methods/sendFileLivechatMessage';
import { NOTIFICATION_ATTACHMENT_COLOR } from '../../../lib/constants';
import { canAccessRoomIdAsync } from '../../lib/authorization/canAccessRoom';
import { canDeleteMessageAsync } from '../../lib/authorization/canDeleteMessage';
import { i18n } from '../../lib/i18n';
import { updateMessage } from '../../lib/messages/updateMessage';
import { setUserAvatar } from '../../lib/users/setUserAvatar';
import { UploadFS } from '../../ufs';

const logger = new Logger('UploadService');

export class UploadService extends ServiceClassInternal implements IUploadService {
	protected name = 'upload';

	async uploadFile({ buffer, details }: IUploadFileParams): Promise<IUpload> {
        /* Implementation Hidden */
    }

	async sendFileMessage({ roomId, file, userId, message }: ISendFileMessageParams): Promise<boolean | undefined> {
        /* Implementation Hidden */
    }

	async sendFileLivechatMessage({ roomId, visitorToken, file, message }: ISendFileLivechatMessageParams): Promise<boolean> {
        /* Implementation Hidden */
    }

	async getFileBuffer({ file }: { file: IUpload }): Promise<Buffer> {
        /* Implementation Hidden */
    }

	async extractMetadata(file: IUpload): Promise<{ height?: number; width?: number; format?: string }> {
        /* Implementation Hidden */
    }

	async parseFileIntoMessageAttachments(file: Partial<IUpload>, roomId: string, user: IUser): Promise<FilesAndAttachments> {
        /* Implementation Hidden */
    }

	async canDeleteFile(user: IUser, file: IUpload, msg: IMessage | null): Promise<boolean> {
        /* Implementation Hidden */
    }

	async deleteFile(user: IUser, fileId: IUpload['_id'], msg: IMessage | null): Promise<{ deletedFiles: IUpload['_id'][] }> {
        /* Implementation Hidden */
    }

	private async removeFileAndDerivates(
		fileId: IUpload['_id'],
		additionalFiles: IUpload['_id'][],
	): Promise<{ deletedFiles: IUpload['_id'][] }> {
        /* Implementation Hidden */
    }

	private async updateMessageRemovingFiles(msg: IMessage, filesToRemove: IUpload['_id'][], user: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async streamUploadedFile({
		file,
		imageResizeOpts,
	}: {
		file: IUpload;
		imageResizeOpts?: { width: number; height: number };
	}): Promise<Stream.Readable> {
        /* Implementation Hidden */
    }

	async uploadFileFromStream({
		streamParam,
		details,
	}: {
		streamParam: Stream.Readable;
		details: Omit<IUploadDetails, 'size'>;
	}): Promise<IUpload> {
        /* Implementation Hidden */
    }

	async setUserAvatar(user: Pick<IUser, '_id' | 'username'>, buffer: Buffer, contentType: string, service: 'rest'): Promise<void> {
        /* Implementation Hidden */
    }

	async resetUserAvatar(user: AtLeast<IUser, '_id' | 'username'>): Promise<void> {
        /* Implementation Hidden */
    }
}

```