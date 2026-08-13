## File: apps/meteor/app/livechat/server/methods/sendMessageLivechat.ts

```typescript
import { OmnichannelSourceType } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { LivechatVisitors } from '@rocket.chat/models';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { settings } from '../../../settings/server';
import type { ILivechatMessage } from '../lib/localTypes';
import { sendMessage } from '../lib/messages';

interface ILivechatMessageAgent {
	agentId: string;
	username: string;
}

interface ISendMessageLivechat {
	message: ILivechatMessage;
	agent?: ILivechatMessageAgent;
}

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		sendMessageLivechat(message: ILivechatMessage, agent: ILivechatMessageAgent): boolean;
	}
}

export const sendMessageLivechat = async ({
	message: { token, _id, rid, msg, file, files, attachments },
	agent,
}: ISendMessageLivechat): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async sendMessageLivechat({ token, _id, rid, msg, file, files, attachments }: ILivechatMessage, agent: ILivechatMessageAgent) {
		methodDeprecationLogger.method('sendMessageLivechat', '9.0.0', '/v1/livechat/message');
		return sendMessageLivechat({ message: { token, _id, rid, msg, file, files, attachments }, agent });
	},
});

```