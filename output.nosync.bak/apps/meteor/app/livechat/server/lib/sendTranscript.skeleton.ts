## File: apps/meteor/app/livechat/server/lib/sendTranscript.ts

```typescript
import { Message, Omnichannel } from '@rocket.chat/core-services';
import {
	type IUser,
	type MessageTypesValues,
	type IOmnichannelSystemMessage,
	type ILivechatVisitor,
	type IOmnichannelRoom,
	isFileAttachment,
	isFileImageAttachment,
	type AtLeast,
} from '@rocket.chat/core-typings';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import { Logger } from '@rocket.chat/logger';
import { MessageTypes } from '@rocket.chat/message-types';
import { LivechatRooms, Messages, Uploads, Users } from '@rocket.chat/models';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Meteor } from 'meteor/meteor';
import moment from 'moment-timezone';

import { callbacks } from '../../../../server/lib/callbacks';
import { i18n } from '../../../../server/lib/i18n';
import { FileUpload } from '../../../file-upload/server';
import * as Mailer from '../../../mailer/server/api';
import { settings } from '../../../settings/server';
import { getTimezone } from '../../../utils/server/lib/getTimezone';

const logger = new Logger('Livechat-SendTranscript');

const DOMPurify = createDOMPurify(new JSDOM('').window);

export async function sendTranscript({
	token,
	rid,
	email,
	subject,
	user,
}: {
	token: string;
	rid: string;
	email: string;
	subject?: string;
	user?: Pick<IUser, '_id' | 'name' | 'username' | 'utcOffset'> | null;
}): Promise<boolean> {
    /* Implementation Hidden */
}

export async function requestTranscript({
	rid,
	email,
	subject,
	user,
}: {
	rid: string;
	email: string;
	subject: string;
	user: AtLeast<IUser, '_id' | 'username' | 'utcOffset' | 'name'>;
}) {
    /* Implementation Hidden */
}

```