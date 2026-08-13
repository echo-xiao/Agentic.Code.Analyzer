## File: apps/meteor/app/autotranslate/server/functions/saveSettings.ts

```typescript
import { Subscriptions, Rooms } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { notifyOnSubscriptionChangedById } from '../../../lib/server/lib/notifyListener';

export const saveAutoTranslateSettings = async (
	userId: string,
	rid: string,
	field: string,
	value: string,
	options: { defaultLanguage: string },
) => {
    /* Implementation Hidden */
};

```