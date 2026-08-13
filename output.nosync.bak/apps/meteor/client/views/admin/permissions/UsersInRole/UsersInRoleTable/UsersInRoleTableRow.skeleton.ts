## File: apps/meteor/client/views/admin/permissions/UsersInRole/UsersInRoleTable/UsersInRoleTableRow.tsx

```typescript
import type { IUserInRole, Serialized } from '@rocket.chat/core-typings';
import { Box, IconButton } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { getUserEmailAddress } from '../../../../../../lib/getUserEmailAddress';

export type UsersInRoleTableRowProps = {
	user: Serialized<IUserInRole>;
	onRemove: (username: IUserInRole['username']) => void;
};

const UsersInRoleTableRow = ({ user, onRemove }: UsersInRoleTableRowProps) => {
    /* Implementation Hidden */
};

export default memo(UsersInRoleTableRow);

```