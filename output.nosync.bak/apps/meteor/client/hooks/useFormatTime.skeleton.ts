## File: apps/meteor/client/hooks/useFormatTime.ts

```typescript
import { useUserPreference, useSetting } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import { formatDate } from '../lib/utils/dateFormat';

const dayFormat = ['h:mm A', 'H:mm'] as const;

export const useFormatTime = () => {
    /* Implementation Hidden */
};

```