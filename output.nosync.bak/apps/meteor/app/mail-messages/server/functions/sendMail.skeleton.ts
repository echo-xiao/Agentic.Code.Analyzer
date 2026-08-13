## File: apps/meteor/app/mail-messages/server/functions/sendMail.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { escapeHTML } from '@rocket.chat/string-helpers';
import EJSON from 'ejson';
import { Meteor } from 'meteor/meteor';
import type { Filter } from 'mongodb';

import { generatePath } from '../../../../lib/utils/generatePath';
import { SystemLogger } from '../../../../server/lib/logger/system';
import * as Mailer from '../../../mailer/server/api';
import { placeholders } from '../../../utils/server/placeholders';

export const sendMail = async function ({
	from,
	subject,
	body,
	dryrun,
	query,
}: {
	from: string;
	subject: string;
	body: string;
	dryrun?: boolean;
	query?: string;
}): Promise<void> {
    /* Implementation Hidden */
};

```