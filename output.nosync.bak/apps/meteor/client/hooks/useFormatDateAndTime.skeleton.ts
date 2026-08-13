## File: apps/meteor/client/hooks/useFormatDateAndTime.ts

```typescript
import { useUserPreference, useSetting } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import { formatDate } from '../lib/utils/dateFormat';

type UseFormatDateAndTimeParams = {
	withSeconds?: boolean;
};

export const useFormatDateAndTime = ({ withSeconds }: UseFormatDateAndTimeParams = {}) => {
    /* Implementation Hidden */
};

```