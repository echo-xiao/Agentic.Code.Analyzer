## File: apps/meteor/ee/server/lib/roles/insertRole.ts

```typescript
import { api, MeteorError } from '@rocket.chat/core-services';
import type { IRole } from '@rocket.chat/core-typings';
import { Roles } from '@rocket.chat/models';

import { notifyOnRoleChanged } from '../../../../app/lib/server/lib/notifyListener';
import { isValidRoleScope } from '../../../../lib/roles/isValidRoleScope';

type InsertRoleOptions = {
	broadcastUpdate?: boolean;
};

export const insertRoleAsync = async (roleData: Omit<IRole, '_id' | '_updatedAt'>, options: InsertRoleOptions = {}): Promise<IRole> => {
    /* Implementation Hidden */
};

```