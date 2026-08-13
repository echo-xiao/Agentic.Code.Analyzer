## File: apps/meteor/server/lib/users/saveUser/sendUserEmail.ts

```typescript
import { MeteorError } from '@rocket.chat/core-services';
import { Meteor } from 'meteor/meteor';

import type { SaveUserData } from './saveUser';
import * as Mailer from '../../../../app/mailer/server/api';
import { settings } from '../../../../app/settings/server';

let html = '';
let passwordChangedHtml = '';
Meteor.startup(() => {
	Mailer.getTemplate('Accounts_UserAddedEmail_Email', (template) => {
		html = template;
	});

	Mailer.getTemplate('Password_Changed_Email', (template) => {
		passwordChangedHtml = template;
	});
});

export async function sendUserEmail(subject: string, html: string, userData: SaveUserData): Promise<void> {
    /* Implementation Hidden */
}

export async function sendWelcomeEmail(userData: Pick<SaveUserData, 'email' | 'name' | 'password'>) {
    /* Implementation Hidden */
}

export async function sendPasswordEmail(userData: Pick<SaveUserData, 'email' | 'name' | 'password'>) {
    /* Implementation Hidden */
}

```