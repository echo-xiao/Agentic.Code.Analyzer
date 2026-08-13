## File: apps/meteor/client/hooks/useTimeAgo.ts

```typescript
import { useUserPreference, useSetting } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import { t } from '../../app/utils/lib/i18n';
import { formatTimeAgo } from '../lib/utils/dateFormat';

const dayFormat = ['h:mm A', 'H:mm'] as const;

export const useTimeAgo = () => {
    /* Implementation Hidden */
};

export const useShortTimeAgo = () => {
    /* Implementation Hidden */
};

```