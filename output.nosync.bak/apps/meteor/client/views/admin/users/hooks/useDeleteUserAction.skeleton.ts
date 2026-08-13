## File: apps/meteor/client/views/admin/users/hooks/useDeleteUserAction.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import {
	useSetModal,
	useToastMessageDispatch,
	useRoute,
	useSetting,
	usePermission,
	useEndpoint,
	useTranslation,
} from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import type { AdminUserAction } from './useAdminUserInfoActions';
import { useConfirmOwnerChanges } from './useConfirmOwnerChanges';

export const useDeleteUserAction = (userId: IUser['_id'], onChange: () => void, onReload: () => void): AdminUserAction | undefined => {
    /* Implementation Hidden */
};

```