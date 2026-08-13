## File: apps/meteor/client/views/marketplace/helpers/warnEnableDisableApp.ts

```typescript
import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';

import { appErroredStatuses } from './appErroredStatuses';
import { t } from '../../../../app/utils/lib/i18n';
import { dispatchToastMessage } from '../../../lib/toast';

export const warnEnableDisableApp = (appName: string, status: AppStatus, type: string): void => {
    /* Implementation Hidden */
};

```