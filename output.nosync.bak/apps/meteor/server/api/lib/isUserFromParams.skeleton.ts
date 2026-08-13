## File: apps/meteor/server/api/lib/isUserFromParams.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';

export function isUserFromParams(
	params: { userId?: string; username?: string; user?: string },
	loggedInUserId?: string,
	loggedInUser?: IUser,
): boolean {
    /* Implementation Hidden */
}

```