## File: apps/meteor/server/database/readSecondaryPreferred.ts

```typescript
import type { Db, ReadPreferenceLike } from 'mongodb';
import { ReadPreference } from 'mongodb';

export function readSecondaryPreferred(db?: Db, tags: any[] = []): ReadPreferenceLike {
    /* Implementation Hidden */
}

```