## File: apps/meteor/app/lib/server/methods/updateMessage.ts

```typescript
import type { IEditedMessage, IMessage, IUser, AtLeast } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages, Users } from '@rocket.chat/models';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { canSendMessageAsync } from '../../../../server/lib/authorization/canSendMessage';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { updateMessage } from '../../../../server/lib/messages/updateMessage';
import { applyAirGappedRestrictionsValidation } from '../../../license/server/airGappedRestrictionsWrapper';
import { settings } from '../../../settings/server';

const allowedEditedFields = ['tshow', 'alias', 'attachments', 'avatar', 'emoji', 'msg', 'customFields', 'content', 'e2eMentions'];

export async function executeUpdateMessage(
	uid: IUser['_id'],
	message: AtLeast<IMessage, '_id' | 'rid' | 'msg' | 'customFields'> | AtLeast<IMessage, '_id' | 'rid' | 'content'>,
	previewUrls?: string[],
) {
    /* Implementation Hidden */
}

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		updateMessage(message: IEditedMessage, previewUrls?: string[]): void;
	}
}

Meteor.methods<ServerMethods>({
	async updateMessage(message: IEditedMessage, previewUrls?: string[]) {
		check(message, Match.ObjectIncluding({ _id: String }));
		check(previewUrls, Match.Maybe([String]));

		const uid = Meteor.userId();

		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'updateMessage' });
		}

		return applyAirGappedRestrictionsValidation(() => executeUpdateMessage(uid, message, previewUrls));
	},
});

```