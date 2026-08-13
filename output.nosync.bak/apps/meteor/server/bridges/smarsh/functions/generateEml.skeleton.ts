## File: apps/meteor/server/bridges/smarsh/functions/generateEml.ts

```typescript
import { MessageTypes } from '@rocket.chat/message-types';
import { Messages, SmarshHistory, Users, Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import moment from 'moment-timezone';

import { sendEmail } from './sendEmail';
import { settings } from '../../../../app/settings/server';
import { i18n } from '../../../lib/i18n';

const start =
	'<table style="width: 100%; border: 1px solid; border-collapse: collapse; table-layout: fixed; margin-top: 10px; font-size: 12px; word-break: break-word;"><tbody>';
const end = '</tbody></table>';
const opentr = '<tr style="border: 1px solid;">';
const closetr = '</tr>';
const open20td = '<td style="border: 1px solid; text-align: center; width: 20%;">';
const open60td = '<td style="border: 1px solid; text-align: left; width: 60%; padding: 0 5px;">';
const closetd = '</td>';

function _getLink(attachment: { title_link: string }): string {
    /* Implementation Hidden */
}

export const generateEml = async (): Promise<void> => {
    /* Implementation Hidden */
};

```