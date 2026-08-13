## File: apps/meteor/server/lib/roles/createOrUpdateProtectedRole.ts

```typescript
import type { IRole, AtLeast } from '@rocket.chat/core-typings';
import { Roles } from '@rocket.chat/models';

export const createOrUpdateProtectedRoleAsync = async (
	roleId: string,
	roleData: AtLeast<Omit<IRole, '_id' | 'protected'>, 'name'>,
): Promise<void> => {
    /* Implementation Hidden */
};

```