## File: apps/meteor/client/views/admin/permissions/PermissionsTable/RoleHeader.tsx

```typescript
import type { IRole } from '@rocket.chat/core-typings';
import { Button } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericTableHeaderCell } from '@rocket.chat/ui-client';
import { useRoute } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

export type RoleHeaderProps = {
	_id: IRole['_id'];
	name: IRole['name'];
	description: IRole['description'];
};

const RoleHeader = ({ _id, name, description }: RoleHeaderProps) => {
    /* Implementation Hidden */
};

export default memo(RoleHeader);

```