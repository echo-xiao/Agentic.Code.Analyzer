## File: apps/meteor/app/livechat/server/methods/sendFileLivechatMessage.ts

```typescript
import type {
	FileAttachmentProps,
	ImageAttachmentProps,
	AudioAttachmentProps,
	VideoAttachmentProps,
	IUpload,
} from '@rocket.chat/core-typings';
import { LivechatVisitors, LivechatRooms } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { Match, check } from 'meteor/check';

import { sendMessageLivechat } from './sendMessageLivechat';
import { FileUpload } from '../../../file-upload/server';

interface ISendFileLivechatMessage {
	roomId: string;
	visitorToken: string;
	file: IUpload;
	msgData?: { avatar?: string; emoji?: string; alias?: string; groupable?: boolean; msg?: string };
}

export const sendFileLivechatMessage = async ({ roomId, visitorToken, file, msgData = {} }: ISendFileLivechatMessage): Promise<boolean> => {
    /* Implementation Hidden */
};

```