## File: apps/meteor/app/livechat/server/lib/messages.ts

```typescript
import dns from 'node:dns';
import * as util from 'node:util';

import type { ILivechatVisitor, AtLeast, IMessage, IUser, IOmnichannelRoomInfo, SelectedAgent } from '@rocket.chat/core-typings';
import { LivechatDepartment, Messages } from '@rocket.chat/models';

import type { ILivechatMessage } from './localTypes';
import { getRoom } from './rooms';
import { showConnecting } from './utils';
import { callbacks } from '../../../../server/lib/callbacks';
import { deleteMessage as deleteMessageFunc } from '../../../../server/lib/messages/deleteMessage';
import { sendMessage as sendMessageFunc } from '../../../../server/lib/messages/sendMessage';
import { updateMessage as updateMessageFunc } from '../../../../server/lib/messages/updateMessage';
import * as Mailer from '../../../mailer/server/api';
import { settings } from '../../../settings/server';

const dnsResolveMx = util.promisify(dns.resolveMx);

type OfflineMessageData = {
	message: string;
	name: string;
	email: string;
	department?: string;
	host?: string;
};

export async function sendOfflineMessage(data: OfflineMessageData) {
    /* Implementation Hidden */
}

export async function updateMessage({ guest, message }: { guest: ILivechatVisitor; message: AtLeast<IMessage, '_id' | 'msg' | 'rid'> }) {
    /* Implementation Hidden */
}

export async function deleteMessage({ guest, message }: { guest: ILivechatVisitor; message: IMessage }) {
    /* Implementation Hidden */
}

export async function sendMessage({
	guest,
	message,
	roomInfo,
	agent,
}: {
	guest: ILivechatVisitor;
	message: ILivechatMessage;
	roomInfo: IOmnichannelRoomInfo;
	agent?: SelectedAgent;
}) {
    /* Implementation Hidden */
}

```