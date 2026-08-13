## File: apps/meteor/app/invites/server/functions/sendInvitationEmail.ts

```typescript
import { Settings } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { notifyOnSettingChanged } from '../../../lib/server/lib/notifyListener';
import * as Mailer from '../../../mailer/server/api';
import { settings } from '../../../settings/server';

let html = '';
Meteor.startup(() => {
	Mailer.getTemplate('Invitation_Email', (value) => {
		html = value;
	});
});

export const sendInvitationEmail = async (userId: string, emails: string[]) => {
    /* Implementation Hidden */
};

```