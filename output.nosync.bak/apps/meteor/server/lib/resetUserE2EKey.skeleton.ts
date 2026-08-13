## File: apps/meteor/server/lib/resetUserE2EKey.ts

```typescript
import { api } from '@rocket.chat/core-services';
import { Subscriptions, Users, Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { i18n } from './i18n';
import { isUserIdFederated } from './isUserIdFederated';
import { notifyOnUserChange, notifyOnSubscriptionChangedByUserId } from '../../app/lib/server/lib/notifyListener';
import * as Mailer from '../../app/mailer/server/api';
import { settings } from '../../app/settings/server';

const sendResetNotification = async function (uid: string): Promise<void> {
    /* Implementation Hidden */
};

export async function resetUserE2EEncriptionKey(uid: string, notifyUser: boolean): Promise<boolean> {
    /* Implementation Hidden */
}

```