## File: apps/meteor/server/lib/dataExport/sendViaEmail.ts

```typescript
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import { Messages, Users } from '@rocket.chat/models';
import { escapeHTML } from '@rocket.chat/string-helpers';
import moment from 'moment';

import * as Mailer from '../../../app/mailer/server/api';
import { settings } from '../../../app/settings/server';
import { Message } from '../../../app/ui-utils/server';
import { getMomentLocale } from '../getMomentLocale';

export async function sendViaEmail(
	data: {
		rid: string;
		toUsers: string[];
		toEmails: string[];
		subject: string;
		messages: string[];
		language: string;
	},
	user: IUser,
): Promise<{
	missing: string[];
}> {
    /* Implementation Hidden */
}

```