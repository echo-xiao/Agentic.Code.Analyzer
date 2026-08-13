## File: apps/meteor/server/lib/rooms/addUserToDefaultChannels.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { Subscriptions } from '@rocket.chat/models';

import { getDefaultChannels } from './getDefaultChannels';
import { notifyOnSubscriptionChangedById } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { getDefaultSubscriptionPref } from '../../../app/utils/lib/getDefaultSubscriptionPref';
import { callbacks } from '../callbacks';
import { getSubscriptionAutotranslateDefaultConfig } from '../getSubscriptionAutotranslateDefaultConfig';

export const addUserToDefaultChannels = async function (user: IUser, silenced?: boolean): Promise<void> {
    /* Implementation Hidden */
};

```