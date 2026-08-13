## File: apps/meteor/app/lib/server/functions/notifications/email.js

```typescript
import { escapeHTML } from '@rocket.chat/string-helpers';
import { Meteor } from 'meteor/meteor';

import { ltrim } from '../../../../../lib/utils/stringUtils';
import { callbacks } from '../../../../../server/lib/callbacks';
import { i18n } from '../../../../../server/lib/i18n';
import { roomCoordinator } from '../../../../../server/lib/rooms/roomCoordinator';
import * as Mailer from '../../../../mailer/server/api';
import { metrics } from '../../../../metrics/server';
import { settings } from '../../../../settings/server';
import { getURL } from '../../../../utils/server/getURL';

let advice = '';
let goToMessage = '';
Meteor.startup(() => {
	settings.watch('email_style', () => {
		goToMessage = Mailer.inlinecss('<p><a class=\'btn\' href="[room_path]">{Offline_Link_Message}</a></p>');
	});
	Mailer.getTemplate('Email_Footer_Direct_Reply', (value) => {
		advice = value;
	});
});

export async function getEmailContent({ message, user, room }) {
    /* Implementation Hidden */
}

const getButtonUrl = (room, subscription, message) => {
    /* Implementation Hidden */
};

function generateNameEmail(name, email) {
    /* Implementation Hidden */
}

export async function getEmailData({ message, receiver, sender, subscription, room, emailAddress, hasMentionToUser }) {
    /* Implementation Hidden */
}

export function sendEmailFromData(data) {
    /* Implementation Hidden */
}

export function shouldNotifyEmail({
	disableAllMessageNotifications,
	statusConnection,
	emailNotifications,
	isHighlighted,
	hasMentionToUser,
	hasMentionToAll,
	hasReplyToThread,
	roomType,
	isThread,
}) {
    /* Implementation Hidden */
}

```