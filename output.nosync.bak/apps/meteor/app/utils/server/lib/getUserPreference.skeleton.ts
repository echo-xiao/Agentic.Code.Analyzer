## File: apps/meteor/app/utils/server/lib/getUserPreference.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { settings } from '../../../settings/server';

/**
 * @summary Get a user preference
 * @param {String} userId The user ID
 * @param {String} preference The preference name
 * @param {unknown?} defaultValue The default value
 * @returns {unknown} The preference value
 */
export const getUserPreference = async (user: IUser | string, key: string, defaultValue: any = undefined) => {
    /* Implementation Hidden */
};

```