## File: apps/meteor/client/views/marketplace/helpers/warnStatusChange.ts

```typescript
import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';

import { appErroredStatuses } from './appErroredStatuses';
import { t } from '../../../../app/utils/lib/i18n';
import { dispatchToastMessage } from '../../../lib/toast';

export const warnStatusChange = (appName: string, status: AppStatus): void => {
    /* Implementation Hidden */
};

```