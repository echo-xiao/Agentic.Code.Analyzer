## File: apps/meteor/ee/server/lib/roles/updateRole.ts

```typescript
import { api, MeteorError } from '@rocket.chat/core-services';
import type { IRole } from '@rocket.chat/core-typings';
import { Roles } from '@rocket.chat/models';

import { notifyOnRoleChangedById } from '../../../../app/lib/server/lib/notifyListener';
import { isValidRoleScope } from '../../../../lib/roles/isValidRoleScope';

type UpdateRoleOptions = {
	broadcastUpdate?: boolean;
};

export const updateRole = async (
	roleId: IRole['_id'],
	roleData: Omit<IRole, '_id' | '_updatedAt'>,
	options: UpdateRoleOptions = {},
): Promise<IRole> => {
    /* Implementation Hidden */
};

```