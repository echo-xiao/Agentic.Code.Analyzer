## File: apps/meteor/server/lib/messages/processWebhookMessage.ts

```typescript
import type { IMessage, IUser, RequiredField, MessageAttachment, IRoom } from '@rocket.chat/core-typings';
import { removeEmpty } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import { sendMessage, validateMessage } from './sendMessage';
import { settings } from '../../../app/settings/server';
import { ensureArray } from '../../../lib/utils/arrayUtils';
import { trim } from '../../../lib/utils/stringUtils';
import { validateRoomMessagePermissionsAsync } from '../authorization/canSendMessage';
import { SystemLogger } from '../logger/system';
import { getRoomByNameOrIdWithOptionToJoin } from '../rooms/getRoomByNameOrIdWithOptionToJoin';

type Payload = {
	channel?: string | string[];
	roomId?: string | string[];
	text?: IMessage['msg'];
	msg?: IMessage['msg']; // overridden if text is present
	username?: IMessage['alias'];
	alias?: IMessage['alias']; // overridden if username is present
	icon_emoji?: IMessage['emoji'];
	emoji?: IMessage['emoji']; // overridden if icon_emoji is present
	icon_url?: IMessage['avatar'];
	avatar?: IMessage['avatar']; // overridden if icon_url is present
	attachments?: IMessage['attachments'];
	parseUrls?: boolean;
	bot?: IMessage['bot'];
	groupable?: IMessage['groupable'];
	tmid?: IMessage['tmid'];
	customFields?: IMessage['customFields'];
};

type DefaultValues = {
	channel: string | string[];
	alias: string;
	avatar: string;
	emoji: string;
};

export type WebhookSuccessItem = { channel: string; error?: undefined; message: IMessage };
export type WebhookFailureItem = { channel: string; error: string; message?: undefined };
export type WebhookResponseItem = WebhookFailureItem | WebhookSuccessItem;

export const validateWebhookMessage = async (message: Partial<IMessage>, room: IRoom | null, user: IUser) => {
    /* Implementation Hidden */
};

const getRoomWithOptionToJoin = async (channelType: string, channelValue: string, user: IUser) => {
    /* Implementation Hidden */
};

const buildMessage = (messageObj: Payload, defaultValues: DefaultValues) => {
    /* Implementation Hidden */
};

export function processWebhookMessage(
	messageObj: Payload & { separateResponse: true },
	user: RequiredField<IUser, 'username'>,
	defaultValues?: DefaultValues,
): Promise<WebhookResponseItem[]>;

export function processWebhookMessage(
	messageObj: Payload & { separateResponse?: false | undefined },
	user: RequiredField<IUser, 'username'>,
	defaultValues?: DefaultValues,
): Promise<WebhookSuccessItem[]>;

export async function processWebhookMessage(
	messageObj: Payload & {
		/**
		 * If true, the response will be sent separately for each channel. Messages will be sent to other channels even if one or more fails. If false or not provided, messages would not be sent to any channel if one or more fails.
		 */
		separateResponse?: boolean;
	},
	user: RequiredField<IUser, 'username'>,
	defaultValues: DefaultValues = { channel: '', alias: '', avatar: '', emoji: '' },
) {
    /* Implementation Hidden */
}

```