## File: apps/meteor/lib/getUserDisplayNames.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';

import { normalizeUsername } from './utils/normalizeUsername';

/*
    In contrary to getUserDisplayName, this function returns an array of strings, containing name & username in the order they're supposed to be displayed.
*/
export const getUserDisplayNames = (
	name: IUser['name'],
	username: IUser['username'],
	useRealName: boolean,
): [nameOrUsername: string, username?: string] => {
    /* Implementation Hidden */
};

```