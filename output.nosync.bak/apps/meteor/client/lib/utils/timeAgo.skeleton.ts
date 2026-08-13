## File: apps/meteor/client/lib/utils/timeAgo.ts

```typescript
import { getUserPreference } from '../../../app/utils/client';
import { t } from '../../../app/utils/lib/i18n';
import { settings } from '../settings';
import { getUserId } from '../user';
import { formatTimeAgo } from './dateFormat';

const dayFormat = ['h:mm A', 'H:mm'];

export const timeAgo = (date: string | Date | number) => {
    /* Implementation Hidden */
};

```