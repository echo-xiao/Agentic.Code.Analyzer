## File: apps/meteor/server/features/EmailInbox/EmailInbox_Incoming.ts

```typescript
import type {
	ILivechatVisitor,
	IOmnichannelRoom,
	VideoAttachmentProps,
	ImageAttachmentProps,
	AudioAttachmentProps,
} from '@rocket.chat/core-typings';
import { OmnichannelSourceType } from '@rocket.chat/core-typings';
import { LivechatVisitors, LivechatRooms, Messages } from '@rocket.chat/models';
import { registerGuest } from '@rocket.chat/omni-core';
import { Random } from '@rocket.chat/random';
import type { ParsedMail, Attachment } from 'mailparser';
import { stripHtml } from 'string-strip-html';

import { logger } from './logger';
import { FileUpload } from '../../../app/file-upload/server';
import { notifyOnMessageChange } from '../../../app/lib/server/lib/notifyListener';
import { QueueManager } from '../../../app/livechat/server/lib/QueueManager';
import { setDepartmentForGuest } from '../../../app/livechat/server/lib/departmentsLib';
import { sendMessage } from '../../../app/livechat/server/lib/messages';
import { settings } from '../../../app/settings/server';
import { i18n } from '../../lib/i18n';

type FileAttachment = VideoAttachmentProps & ImageAttachmentProps & AudioAttachmentProps;

const language = settings.get<string>('Language') || 'en';
const t = i18n.getFixedT(language);

async function getGuestByEmail(email: string, name: string, department = ''): Promise<ILivechatVisitor | null> {
    /* Implementation Hidden */
}

async function uploadAttachment(attachmentParam: Attachment, rid: string, visitorToken: string): Promise<Partial<FileAttachment>> {
    /* Implementation Hidden */
}

export async function onEmailReceived(email: ParsedMail, inbox: string, department = ''): Promise<void> {
    /* Implementation Hidden */
}

```