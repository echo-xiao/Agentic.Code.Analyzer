## File: apps/meteor/client/views/admin/permissions/hooks/usePermissionsAndRoles.ts

```typescript
import type { IRole, IPermission } from '@rocket.chat/core-typings';
import { useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

import { useFilteredPermissions } from './useFilteredPermissions';
import { CONSTANTS } from '../../../../../app/authorization/lib';
import { pipe } from '../../../../lib/cachedStores/pipe';
import { Permissions, Roles } from '../../../../stores';

export const usePermissionsAndRoles = (
	type = 'permissions',
	filter = '',
	limit = 25,
	skip = 0,
): { permissions: IPermission[]; total: number; roleList: IRole[] } => {
    /* Implementation Hidden */
};

```