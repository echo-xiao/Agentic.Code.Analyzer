## File: apps/meteor/server/modules/streamer/publication-user-cache.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import type { IPublication } from './types';

type CachedUser = IUser; // Pick<IUser, '_id' | 'roles'>;

type CacheEntry = {
	user: Promise<CachedUser | null>;
	timeout: NodeJS.Timeout;
};

const CACHE_PROJECTION = { _id: 1, roles: 1 } as const;
const CACHE_TIMEOUT = 1000 * 60;
const cacheByUserId = new Map<string, CacheEntry>();

export function getCachedUserForPublication(publication: IPublication): Promise<CachedUser | null> {
    /* Implementation Hidden */
}

export function invalidate(userId: string): void {
    /* Implementation Hidden */
}

```