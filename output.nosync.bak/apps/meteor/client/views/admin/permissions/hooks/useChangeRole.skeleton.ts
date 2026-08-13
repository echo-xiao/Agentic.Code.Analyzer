## File: apps/meteor/client/views/admin/permissions/hooks/useChangeRole.ts

```typescript
import type { IRole, IPermission } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';

export const useChangeRole = ({
	onGrant,
	onRemove,
	permissionId,
}: {
	onGrant: (permissionId: IPermission['_id'], roleId: IRole['_id']) => Promise<void>;
	onRemove: (permissionId: IPermission['_id'], roleId: IRole['_id']) => Promise<void>;
	permissionId: IPermission['_id'];
}): ((roleId: IRole['_id'], granted: boolean) => Promise<boolean>) => {
    /* Implementation Hidden */
};

```