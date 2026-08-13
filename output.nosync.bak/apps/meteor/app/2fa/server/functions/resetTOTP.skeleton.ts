## File: apps/meteor/app/2fa/server/functions/resetTOTP.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { i18n } from '../../../../server/lib/i18n';
import { isUserIdFederated } from '../../../../server/lib/isUserIdFederated';
import { notifyOnUserChange } from '../../../lib/server/lib/notifyListener';
import * as Mailer from '../../../mailer/server/api';
import { settings } from '../../../settings/server';

const sendResetNotification = async function (uid: string): Promise<void> {
    /* Implementation Hidden */
};

export async function resetTOTP(userId: string, notifyUser = false): Promise<boolean> {
    /* Implementation Hidden */
}

```