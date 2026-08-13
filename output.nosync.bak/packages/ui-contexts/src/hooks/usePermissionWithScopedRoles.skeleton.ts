## File: packages/ui-contexts/src/hooks/usePermissionWithScopedRoles.ts

```typescript
import type { IRole } from '@rocket.chat/core-typings';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { AuthorizationContext } from '../AuthorizationContext';

/**
 * Check if the user has the permission considering the user have the scoped roles
 * @param permission The permission to check
 * @param scopedRoles The roles to be also considered
 * @returns boolean
 */

export const usePermissionWithScopedRoles = (permission: string, scopedRoles: IRole['_id'][]): boolean => {
    /* Implementation Hidden */
};

```