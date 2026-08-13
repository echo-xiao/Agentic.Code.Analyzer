## File: apps/meteor/client/views/marketplace/hooks/useMarketplaceActions.ts

```typescript
import type { App, AppPermission } from '@rocket.chat/core-typings';
import { useMutation } from '@tanstack/react-query';

import { useAppsOrchestration } from './useAppsOrchestration';
import { handleAPIError } from '../helpers/handleAPIError';
import { warnAppInstall } from '../helpers/warnAppInstall';
import { warnStatusChange } from '../helpers/warnStatusChange';

type InstallAppParams = App & {
	permissionsGranted?: AppPermission[];
};

type UpdateAppParams = App & {
	permissionsGranted?: AppPermission[];
};

export const useMarketplaceActions = () => {
    /* Implementation Hidden */
};

```