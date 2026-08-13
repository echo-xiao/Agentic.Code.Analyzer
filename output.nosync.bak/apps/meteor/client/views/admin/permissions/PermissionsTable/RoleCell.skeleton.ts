## File: apps/meteor/client/views/admin/permissions/PermissionsTable/RoleCell.tsx

```typescript
import type { IRole } from '@rocket.chat/core-typings';
import { Margins, Box, CheckBox, Throbber } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal, GenericTableCell } from '@rocket.chat/ui-client';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthorizationUtils, confirmationRequiredPermissions } from '../../../../../app/authorization/lib';

export type RoleCellProps = {
	_id: IRole['_id'];
	name: IRole['name'];
	description: IRole['description'];
	onChange: (roleId: IRole['_id'], granted: boolean) => Promise<boolean>;
	permissionId: string;
	permissionName: string;
	grantedRoles: IRole['_id'][];
};

const RoleCell = ({ _id, name, description, onChange, permissionId, permissionName, grantedRoles = [] }: RoleCellProps) => {
    /* Implementation Hidden */
};

export default memo(RoleCell);

```