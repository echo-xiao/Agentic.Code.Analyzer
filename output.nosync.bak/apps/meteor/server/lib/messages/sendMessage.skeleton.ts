## File: apps/meteor/server/lib/messages/sendMessage.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import { Message } from '@rocket.chat/core-services';
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { Messages } from '@rocket.chat/models';
import { isAbsoluteURL } from '@rocket.chat/tools';
import { Match, check } from 'meteor/check';

import { FileUpload } from '../../../app/file-upload/server';
import { afterSaveMessage } from '../../../app/lib/server/lib/afterSaveMessage';
import { notifyOnRoomChangedById } from '../../../app/lib/server/lib/notifyListener';
import { validateCustomMessageFields } from '../../../app/lib/server/lib/validateCustomMessageFields';
import { settings } from '../../../app/settings/server';
import { isRelativeURL } from '../../../lib/utils/isRelativeURL';
import { hasPermissionAsync } from '../authorization/hasPermission';

export type SendMessageOptions = {
	upsert?: boolean;
	previewUrls?: string[];
	skipNotifications?: boolean;
};

// TODO: most of the types here are wrong, but I don't want to change them now

/**
 * IMPORTANT
 *
 * This validator prevents malicious href values
 * intending to run arbitrary js code in anchor tags.
 * You should use it whenever the value you're checking
 * is going to be rendered in the href attribute of a
 * link.
 */
const validFullURLParam = Match.Where((value) => {
	check(value, String);

	if (!isAbsoluteURL(value) && !value.startsWith(FileUpload.getPath())) {
		throw new Error('Invalid href value provided');
	}

	if (/^javascript:/i.test(value)) {
		throw new Error('Invalid href value provided');
	}

	return true;
});

const validPartialURLParam = Match.Where((value) => {
	check(value, String);

	if (!isRelativeURL(value) && !isAbsoluteURL(value) && !value.startsWith(FileUpload.getPath())) {
		throw new Error('Invalid href value provided');
	}

	if (/^javascript:/i.test(value)) {
		throw new Error('Invalid href value provided');
	}

	return true;
});

const objectMaybeIncluding = (types: any) =>
	Match.Where((value: any) => {
		Object.keys(types).forEach((field) => {
			if (value[field] != null) {
				try {
					check(value[field], types[field]);
				} catch (error: any) {
					error.path = field;
					throw error;
				}
			}
		});

		return true;
	});

const validateAttachmentsFields = (attachmentField: any) => {
    /* Implementation Hidden */
};

const validateAttachmentsActions = (attachmentActions: any) => {
    /* Implementation Hidden */
};

const validateAttachment = (attachment: any) => {
    /* Implementation Hidden */
};

const validateBodyAttachments = (attachments: any[]) => attachments.map(validateAttachment);

export const validateMessage = async (message: any, room: any, user: any) => {
    /* Implementation Hidden */
};

export function prepareMessageObject(
	message: Partial<IMessage>,
	rid: IRoom['_id'],
	user: { _id: string; username?: string; name?: string },
): asserts message is IMessage {
    /* Implementation Hidden */
}

/**
 * Validates and sends the message object. This function does not verify the Message_MaxAllowedSize settings.
 * Caller of the function should verify the Message_MaxAllowedSize if needed.
 * There might be same use cases which needs to override this setting. Example - sending error logs.
 */
export const sendMessage = async function (user: any, message: any, room: any, options: SendMessageOptions = {}) {
    /* Implementation Hidden */
};

```