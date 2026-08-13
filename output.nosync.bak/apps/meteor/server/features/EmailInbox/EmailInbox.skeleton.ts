## File: apps/meteor/server/features/EmailInbox/EmailInbox.ts

```typescript
import type { IEmailInbox } from '@rocket.chat/core-typings';
import { EmailInbox, EmailMessageHistory } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

import { onEmailReceived } from './EmailInbox_Incoming';
import { logger } from './logger';
import { settings } from '../../../app/settings/server';
import { IMAPInterceptor } from '../../email/IMAPInterceptor';

export type Inbox = {
	imap: IMAPInterceptor;
	smtp: Mail;
	config: IEmailInbox;
};

export const inboxes = new Map<string, Inbox>();

export async function configureEmailInboxes(): Promise<void> {
    /* Implementation Hidden */
}

Meteor.startup(() => {
	settings.watchOnce('Livechat_Routing_Method', (_) => {
		void configureEmailInboxes();
	});
});

```