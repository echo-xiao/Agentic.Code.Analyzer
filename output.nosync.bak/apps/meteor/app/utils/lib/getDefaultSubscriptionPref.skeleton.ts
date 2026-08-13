## File: apps/meteor/app/utils/lib/getDefaultSubscriptionPref.ts

```typescript
import type { AtLeast, ISubscription, IUser } from '@rocket.chat/core-typings';

/**
 * @type {(userPref: Pick<import('@rocket.chat/core-typings').IUser, 'settings'>) => {
 * 	desktopPrefOrigin: 'user';
 * 	mobilePrefOrigin: 'user';
 * 	emailPrefOrigin: 'user';
 * }}
 */
export const getDefaultSubscriptionPref = (userPref: AtLeast<IUser, 'settings'>) => {
    /* Implementation Hidden */
};

```