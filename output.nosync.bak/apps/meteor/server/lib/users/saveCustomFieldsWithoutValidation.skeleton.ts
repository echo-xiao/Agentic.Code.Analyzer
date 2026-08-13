## File: apps/meteor/server/lib/users/saveCustomFieldsWithoutValidation.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { Subscriptions, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import type { ClientSession } from 'mongodb';

import { notifyOnSubscriptionChangedByUserIdAndRoomType } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { trim } from '../../../lib/utils/stringUtils';
import { onceTransactionCommitedSuccessfully } from '../../database/utils';

const getCustomFieldsMeta = function (customFieldsMeta: string) {
    /* Implementation Hidden */
};
export const saveCustomFieldsWithoutValidation = async function (
	userId: string,
	formData: Record<string, any>,
	options?: {
		_updater?: Updater<IUser>;
		session?: ClientSession;
	},
): Promise<void> {
    /* Implementation Hidden */
};

```