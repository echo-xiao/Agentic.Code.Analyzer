## File: apps/meteor/client/views/admin/permissions/UsersInRole/hooks/useRemoveUserFromRole.tsx

```typescript
import type { IRole, IRoom, IUserInRole } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useRemoveUserFromRole = ({
	rid,
	roleId,
	roleName,
	roleDescription,
}: {
	rid?: IRoom['_id'];
	roleId: IRole['_id'];
	roleName: IRole['name'];
	roleDescription: IRole['description'];
}) => {
    /* Implementation Hidden */
};

```