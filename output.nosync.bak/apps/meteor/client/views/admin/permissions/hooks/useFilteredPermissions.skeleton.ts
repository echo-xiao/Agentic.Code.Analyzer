## File: apps/meteor/client/views/admin/permissions/hooks/useFilteredPermissions.ts

```typescript
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Permissions } from '../../../../stores';
import { filterPermissionKeys, mapPermissionKeys } from '../helpers/mapPermissionKeys';

export const useFilteredPermissions = ({ filter }: { filter: string }) => {
    /* Implementation Hidden */
};

```