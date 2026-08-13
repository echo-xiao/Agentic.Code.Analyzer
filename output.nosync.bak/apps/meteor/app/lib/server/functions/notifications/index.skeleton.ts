## File: apps/meteor/app/lib/server/functions/notifications/index.ts

```typescript
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import { isFileAttachment, isFileImageAttachment } from '@rocket.chat/core-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';

import { callbacks } from '../../../../../server/lib/callbacks';
import { i18n } from '../../../../../server/lib/i18n';
import { settings } from '../../../../settings/server';

/**
 * This function returns a string ready to be shown in the notification
 *
 * @param {object} message the message to be parsed
 */
export async function parseMessageTextPerUser(
	messageText: string,
	message: Pick<IMessage, 'u' | 'msg' | 't' | 'attachments'>,
	receiver: Pick<IUser, 'language'>,
): Promise<string> {
    /* Implementation Hidden */
}

/**
 * Replaces @username with full name
 *
 * @param {string} message The message to replace
 * @param {object[]} mentions Array of mentions used to make replacements
 *
 * @returns {string}
 */
export function replaceMentionedUsernamesWithFullNames(message: string, mentions: NonNullable<IMessage['mentions']>): string {
    /* Implementation Hidden */
}

```