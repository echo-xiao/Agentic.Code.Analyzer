## File: apps/meteor/server/lib/users/setEmail.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { Users } from '@rocket.chat/models';
import { escapeHTML } from '@rocket.chat/string-helpers';
import { Meteor } from 'meteor/meteor';
import type { ClientSession } from 'mongodb';

import { checkEmailAvailability } from './checkEmailAvailability';
import { validateEmailDomain } from '../../../app/lib/server/lib';
import * as Mailer from '../../../app/mailer/server/api';
import { settings } from '../../../app/settings/server';
import { onceTransactionCommitedSuccessfully } from '../../database/utils';
import { sendConfirmationEmail } from '../../methods/sendConfirmationEmail';

let html = '';
Meteor.startup(() => {
	Mailer.getTemplate('Email_Changed_Email', (template) => {
		html = template;
	});
});

const _sendEmailChangeNotification = async function (to: string, newEmail: string) {
    /* Implementation Hidden */
};

export const setEmail = async function (
	userId: string,
	email: string,
	shouldSendVerificationEmail = true,
	verified = false,
	updater?: Updater<IUser>,
	session?: ClientSession,
) {
    /* Implementation Hidden */
};

```