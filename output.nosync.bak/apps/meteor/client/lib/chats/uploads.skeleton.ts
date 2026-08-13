## File: apps/meteor/client/lib/chats/uploads.ts

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import { Random } from '@rocket.chat/random';
import fileSize from 'filesize';

import { getErrorMessage } from '../errorHandling';
import type { UploadsAPI, EncryptedFileUploadContent } from './ChatAPI';
import { isEncryptedUpload, type Upload } from './Upload';
import { USER_ACTIVITIES, UserAction } from '../../../app/ui/client/lib/UserAction';
import { fileUploadIsValidContentType } from '../../../app/utils/client';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { i18n } from '../../../app/utils/lib/i18n';
import { settings } from '../settings';

class UploadsStore extends Emitter<{ update: void; [x: `cancelling-${Upload['id']}`]: void }> implements UploadsAPI {
	private rid: string;

	private tmid?: string;

	constructor({ rid, tmid }: { rid: IRoom['_id']; tmid?: IMessage['_id'] }) {
        /* Implementation Hidden */
    }

	private uploads: readonly Upload[] = [];

	private processingUploads: boolean = false;

	set = (uploads: Upload[]): void => {
		this.uploads = uploads;
		this.emit('update');
	};

	get = (): readonly Upload[] => this.uploads;

	subscribe = (callback: () => void): (() => void) => this.on('update', callback);

	setProcessingUploads = (processing: boolean): void => {
		this.processingUploads = processing;
		this.emit('update');
	};

	getProcessingUploads = (): boolean => this.processingUploads;

	cancel = (id: Upload['id']): void => {
		this.emit(`cancelling-${id}`);
	};

	wipeFailedOnes = (): void => {
		this.set(this.uploads.filter((upload) => !upload.error));
	};

	private updateUpload(id: Upload['id'], patch: Partial<Upload>): void {
        /* Implementation Hidden */
    }

	removeUpload = (id: Upload['id']): void => {
		this.set(this.uploads.filter((upload) => upload.id !== id));

		if (this.uploads.length === 0) {
			UserAction.stop(this.rid, USER_ACTIVITIES.USER_UPLOADING, { tmid: this.tmid });
		}
	};

	editUploadAltText = (uploadId: Upload['id'], altText: string) => {
		this.set(
			this.uploads.map((upload) => {
				if (upload.id !== uploadId) {
					return upload;
				}

				return {
					...upload,
					altText,
					...(isEncryptedUpload(upload) && {
						metadataForEncryption: { ...upload.metadataForEncryption, altText },
					}),
				};
			}),
		);
	};

	editUploadFileName = (uploadId: Upload['id'], fileName: Upload['file']['name']) => {
		try {
			this.set(
				this.uploads.map((upload) => {
					if (upload.id !== uploadId) {
						return upload;
					}

					return {
						...upload,
						file: new File([upload.file], fileName, upload.file),
						...(isEncryptedUpload(upload) && {
							metadataForEncryption: { ...upload.metadataForEncryption, name: fileName },
						}),
					};
				}),
			);
		} catch (error) {
			this.set(
				this.uploads.map((upload) => {
					if (upload.id !== uploadId) {
						return upload;
					}

					return {
						...upload,
						percentage: 0,
						error: new Error(i18n.t('FileUpload_Update_Failed')),
					};
				}),
			);
		}
	};

	clear = () => {
		this.set([]);
		UserAction.stop(this.rid, USER_ACTIVITIES.USER_UPLOADING, { tmid: this.tmid });
	};

	async send(file: File, encrypted?: EncryptedFileUploadContent): Promise<void> {
        /* Implementation Hidden */
    }
}

export const createUploadsAPI = ({ rid, tmid }: { rid: IRoom['_id']; tmid?: IMessage['_id'] }): UploadsAPI =>
	new UploadsStore({ rid, tmid });

```