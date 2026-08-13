## File: apps/meteor/ee/server/lib/deviceManagement/session.ts

```typescript
import type { ISocketConnection } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { UAParser } from 'ua-parser-js';

import * as Mailer from '../../../../app/mailer/server/api';
import { settings } from '../../../../app/settings/server';
import { UAParserDesktop, UAParserMobile } from '../../../../app/statistics/server/lib/UAParserCustom';
import { t } from '../../../../app/utils/lib/i18n';
import { getUserPreference } from '../../../../app/utils/server/lib/getUserPreference';
import { deviceManagementEvents } from '../../../../server/services/device-management/events';

let mailTemplates: string;

Meteor.startup(() => {
	Mailer.getTemplate('Device_Management_Email_Body', (template) => {
		mailTemplates = template;
	});
});

const uaParser = async (
	uaString: ISocketConnection['httpHeaders']['user-agent'],
): Promise<UAParser.IResult & { app?: { name: string; version: string; bundle: string } }> => {
    /* Implementation Hidden */
};

export const listenSessionLogin = () => {
    /* Implementation Hidden */
};

```