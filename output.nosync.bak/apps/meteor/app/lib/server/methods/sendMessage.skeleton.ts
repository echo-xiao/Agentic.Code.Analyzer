## File: apps/meteor/app/lib/server/methods/sendMessage.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { AtLeast, IMessage, IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import type { RocketchatI18nKeys } from '@rocket.chat/i18n';
import { MessageTypes } from '@rocket.chat/message-types';
import { Messages, Users } from '@rocket.chat/models';
import type { TOptions } from 'i18next';
import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { canSendMessageAsync } from '../../../../server/lib/authorization/canSendMessage';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { i18n } from '../../../../server/lib/i18n';
import { SystemLogger } from '../../../../server/lib/logger/system';
import { sendMessage } from '../../../../server/lib/messages/sendMessage';
import { applyAirGappedRestrictionsValidation } from '../../../license/server/airGappedRestrictionsWrapper';
import { metrics } from '../../../metrics/server';
import { settings } from '../../../settings/server';
import { RateLimiter } from '../lib';
/**
 *
 * @param uid
 * @param message
 * @param extraInfo
 *   - ts: The timestamp of the message. the message object already has a ts, but this value is validated and only a window of 10 seconds is allowed to be used. this value overrides the message.ts value without validation.
 *
 *
 * @returns
 */
export async function executeSendMessage(
	uid: IUser['_id'] | IUser,
	message: AtLeast<IMessage, 'rid'>,
	extraInfo?: { ts?: Date; previewUrls?: string[] },
) {
    /* Implementation Hidden */
}

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		sendMessage(message: AtLeast<IMessage, '_id' | 'rid' | 'msg'>, previewUrls?: string[]): any;
	}
}

Meteor.methods<ServerMethods>({
	async sendMessage(message, previewUrls) {
		check(message, {
			_id: Match.Maybe(String),
			rid: Match.Maybe(String),
			msg: Match.Maybe(String),
			tmid: Match.Maybe(String),
			tshow: Match.Maybe(Boolean),
			ts: Match.Maybe(Date),
			t: Match.Maybe(String),
			bot: Match.Maybe(Object),
			content: Match.Maybe(Object),
			e2e: Match.Maybe(String),
			e2eMentions: Match.Maybe(Object),
			customFields: Match.Maybe(Object),
			federation: Match.Maybe(Object),
			groupable: Match.Maybe(Boolean),
			sentByEmail: Match.Maybe(Boolean),
		});

		const user = (await Meteor.userAsync()) as IUser;
		if (!user) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'sendMessage',
			});
		}

		if (MessageTypes.isSystemMessage(message)) {
			throw new Error("Cannot send system messages using 'sendMessage'");
		}

		try {
			return await applyAirGappedRestrictionsValidation(() => executeSendMessage(user, message, { previewUrls }));
		} catch (error: any) {
			if (['error-not-allowed', 'restricted-workspace'].includes(error.error || error.message)) {
				throw new Meteor.Error(error.error || error.message, error.reason, {
					method: 'sendMessage',
				});
			}
		}
	},
});
// Limit a user, who does not have the "bot" role, to sending 5 msgs/second
RateLimiter.limitMethod('sendMessage', 5, 1000, {
	async userId(userId: IUser['_id']) {
		return !(await hasPermissionAsync(userId, 'send-many-messages'));
	},
});

```