## File: apps/meteor/server/api/lib/addUserToFileObj.ts

```typescript
import type { IUpload, IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

const isString = (value: unknown): value is string => typeof value === 'string';

export async function addUserToFileObj(files: IUpload[]): Promise<(IUpload & { user?: Pick<IUser, '_id' | 'name' | 'username'> })[]> {
    /* Implementation Hidden */
}

```