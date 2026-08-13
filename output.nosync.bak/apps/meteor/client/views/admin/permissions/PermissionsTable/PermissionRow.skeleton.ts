## File: apps/meteor/client/views/admin/permissions/PermissionsTable/PermissionRow.tsx

```typescript
import type { IRole, IPermission } from '@rocket.chat/core-typings';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import type { TFunction } from 'i18next';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import RoleCell from './RoleCell';
import { CONSTANTS } from '../../../../../app/authorization/lib';
import { useChangeRole } from '../hooks/useChangeRole';

const getName = (t: TFunction, permission: IPermission): string => {
    /* Implementation Hidden */
};

export type PermissionRowProps = {
	permission: IPermission;
	roleList: IRole[];
	onGrant: (permissionId: IPermission['_id'], roleId: IRole['_id']) => Promise<void>;
	onRemove: (permissionId: IPermission['_id'], roleId: IRole['_id']) => Promise<void>;
};

const PermissionRow = ({ permission, roleList, onGrant, onRemove }: PermissionRowProps) => {
    /* Implementation Hidden */
};

export default memo(PermissionRow);

```