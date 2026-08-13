## File: apps/meteor/client/views/marketplace/hooks/useAppTranslation.ts

```typescript
import { useTranslation } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import { Utilities } from '../../../../ee/lib/misc/Utilities';

type AppTranslationFunction = {
	(key: string, ...replaces: unknown[]): string;
	has: (key: string | undefined) => boolean;
};

export const useAppTranslation = (appId: string): AppTranslationFunction => {
    /* Implementation Hidden */
};

```