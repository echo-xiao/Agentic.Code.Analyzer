## File: apps/meteor/client/lib/chats/flows/processMessageUploads.ts

```typescript
import type { AtLeast, FileAttachmentProps, IE2EEMessage, IMessage, IUploadToConfirm } from '@rocket.chat/core-typings';
import { imperativeModal, GenericModal } from '@rocket.chat/ui-client';

import { sdk } from '../../../../app/utils/client/lib/SDKClient';
import { t } from '../../../../app/utils/lib/i18n';
import { getFileExtension } from '../../../../lib/utils/getFileExtension';
import { e2e } from '../../e2ee/rocketchat.e2e';
import type { E2ERoom } from '../../e2ee/rocketchat.e2e.room';
import { dispatchToastMessage } from '../../toast';
import type { ChatAPI, UploadsAPI } from '../ChatAPI';
import { isEncryptedUpload, type EncryptedUpload } from '../Upload';

const getHeightAndWidthFromDataUrl = (dataURL: string): Promise<{ height: number; width: number }> => {
    /* Implementation Hidden */
};

const getAttachmentForFile = async (fileToUpload: EncryptedUpload): Promise<FileAttachmentProps> => {
    /* Implementation Hidden */
};

const getEncryptedContent = async (filesToUpload: readonly EncryptedUpload[], e2eRoom: E2ERoom, msg: string) => {
    /* Implementation Hidden */
};

async function continueSendingMessage(store: UploadsAPI, message: IMessage) {
    /* Implementation Hidden */
}

export const processMessageUploads = async (chat: ChatAPI, message: IMessage): Promise<boolean> => {
    /* Implementation Hidden */
};

```